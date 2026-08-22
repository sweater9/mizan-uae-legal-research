const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const inputFiles = [
  'app.js',
  'content-2026.js',
  'content-details.js',
  'content-upgrade-aug2026.js'
];
const outDir = path.join(root, 'data', 'legislation');
const indexPath = path.join(root, 'data', 'index.json');

function slug(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

function splitTerms(value = '') {
  return [...new Set(value.toLowerCase().split(/\s+/).map(v => v.trim()).filter(Boolean))];
}

function inferAppliesTo(item) {
  const text = `${item.jurisdiction || ''} ${item.authority || ''} ${item.topics || ''} ${item.summary || ''}`.toLowerCase();
  const out = [];
  if (item.jurisdiction === 'Federal') out.push('uae-federal-scope');
  if (item.jurisdiction === 'Dubai') out.push('dubai-scope');
  if (item.jurisdiction === 'DIFC') out.push('difc-registered-entity');
  if (item.jurisdiction === 'ADGM') out.push('adgm-registered-entity');
  if (text.includes('private sector')) out.push('private-sector-employer', 'private-sector-employee');
  if (text.includes('domestic worker')) out.push('domestic-worker', 'domestic-worker-employer');
  if (text.includes('financial institution') || text.includes('banking')) out.push('regulated-financial-institution');
  if (text.includes('virtual asset') || text.includes('vara') || text.includes('crypto')) out.push('virtual-asset-service-provider');
  return [...new Set(out.length ? out : ['general'])];
}

function normaliseStatus(value = '') {
  const s = value.toLowerCase();
  if (s.includes('repeal')) return 'repealed';
  if (s.includes('supersed')) return 'superseded';
  if (s.includes('draft')) return 'draft';
  if (s.includes('force') || s.includes('active')) return 'current';
  return 'unknown';
}

function regulatorFor(item) {
  return item.authority || (item.jurisdiction === 'DIFC' ? 'DIFC Authority' : item.jurisdiction === 'ADGM' ? 'ADGM' : item.jurisdiction || 'UAE');
}

function buildSandbox() {
  const sandbox = {
    console,
    laws: [],
    document: {
      querySelector: () => ({ addEventListener() {}, value: '', hidden: false, textContent: '', innerHTML: '', getBoundingClientRect: () => ({ top: 0 }) }),
      querySelectorAll: () => []
    },
    navigator: { clipboard: { writeText: async () => {} } },
    requestAnimationFrame: fn => fn(),
    window: { scrollY: 0, scrollTo() {} },
    setTimeout() {},
  };
  vm.createContext(sandbox);
  return sandbox;
}

function executeContent(sandbox, filename) {
  const filePath = path.join(root, filename);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');
  if (filename === 'app.js') {
    const marker = 'const form=';
    const idx = code.indexOf(marker);
    if (idx !== -1) code = code.slice(0, idx);
    code += '\nthis.laws = laws;';
  }
  vm.runInContext(code, sandbox, { filename });
}

const sandbox = buildSandbox();
for (const file of inputFiles) executeContent(sandbox, file);
const laws = sandbox.laws || [];

fs.mkdirSync(outDir, { recursive: true });
for (const file of fs.readdirSync(outDir)) {
  if (file.endsWith('.json')) fs.unlinkSync(path.join(outDir, file));
}

const seenIds = new Set();
const records = laws.map((item, i) => {
  const base = slug(`${item.jurisdiction || 'uae'}-${item.number || item.title || i}`) || `instrument-${i + 1}`;
  let id = base;
  let n = 2;
  while (seenIds.has(id)) id = `${base}-${n++}`;
  seenIds.add(id);

  const topics = splitTerms(item.topics).map(t => t.replace(/[^a-z0-9-]/g, '')).filter(Boolean);
  const record = {
    id,
    title_en: item.title ? `${item.number ? item.number + ' — ' : ''}${item.title}` : item.number || id,
    title_ar: null,
    jurisdiction: ['Federal', 'Dubai', 'DIFC', 'ADGM'].includes(item.jurisdiction) ? item.jurisdiction : 'Federal',
    regulator: regulatorFor(item),
    topic_tags: [...new Set(topics)],
    applies_to: inferAppliesTo(item),
    status: normaliseStatus(item.status),
    superseded_by: null,
    effective_date: null,
    last_verified: '2026-08-22',
    source_url: item.source || 'https://uaelegislation.gov.ae/en/legislations',
    plain_summary_en: item.summary || '',
    plain_summary_ar: null,
    full_text_en: null,
    full_text_ar: null,
    related_ids: [],
    number: item.number || null,
    authority: item.authority || null,
    relevance_en: item.relevance || null,
    note_en: item.note || null,
    search_terms: splitTerms(item.topics)
  };
  fs.writeFileSync(path.join(outDir, `${id}.json`), JSON.stringify(record, null, 2) + '\n');
  return record;
});

fs.mkdirSync(path.dirname(indexPath), { recursive: true });
fs.writeFileSync(indexPath, JSON.stringify(records, null, 2) + '\n');
console.log(`Migrated ${records.length} instruments to data/legislation and data/index.json`);
