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

const stopWords = new Set(['a','an','and','as','at','by','for','from','in','into','is','of','on','or','the','to','under','with']);
const phraseTags = [
  ['beneficial owner', 'beneficial-owner'],
  ['ultimate ownership', 'ultimate-ownership'],
  ['anti money laundering', 'anti-money-laundering'],
  ['anti-money laundering', 'anti-money-laundering'],
  ['customer due diligence', 'customer-due-diligence'],
  ['data protection', 'data-protection'],
  ['personal data', 'personal-data'],
  ['cross border', 'cross-border'],
  ['corporate tax', 'corporate-tax'],
  ['free zone', 'free-zone'],
  ['transfer pricing', 'transfer-pricing'],
  ['value added tax', 'value-added-tax'],
  ['tax procedures', 'tax-procedures'],
  ['commercial companies', 'commercial-companies'],
  ['commercial register', 'commercial-register'],
  ['consumer protection', 'consumer-protection'],
  ['electronic transaction', 'electronic-transactions'],
  ['electronic signature', 'electronic-signature'],
  ['virtual asset', 'virtual-assets'],
  ['virtual assets', 'virtual-assets'],
  ['end of service', 'end-of-service'],
  ['working hours', 'working-hours'],
  ['annual leave', 'annual-leave'],
  ['sick leave', 'sick-leave'],
  ['domestic worker', 'domestic-workers'],
  ['domestic workers', 'domestic-workers'],
  ['work injury', 'work-injury'],
  ['occupational disease', 'occupational-disease'],
  ['unemployment insurance', 'unemployment-insurance'],
  ['financial restructuring', 'financial-restructuring'],
  ['economic concentration', 'economic-concentration'],
  ['commercial agency', 'commercial-agency'],
  ['family business', 'family-business'],
  ['personal status', 'personal-status'],
  ['medical liability', 'medical-liability'],
  ['public health', 'public-health'],
  ['financial services', 'financial-services'],
  ['market conduct', 'market-conduct']
];

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

function buildTopicTags(item) {
  const raw = `${item.title || ''} ${item.topics || ''}`.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
  const tags = new Set();
  for (const [phrase, tag] of phraseTags) {
    if (raw.includes(phrase)) tags.add(tag);
  }
  for (const token of raw.split(/\s+/)) {
    const clean = token.replace(/^-+|-+$/g, '');
    if (clean.length < 3 || stopWords.has(clean) || /^\d+$/.test(clean)) continue;
    tags.add(clean);
  }
  return [...tags];
}

function inferAppliesTo(item) {
  const title = `${item.title || ''}`.toLowerCase();
  const topics = `${item.topics || ''}`.toLowerCase();
  const authority = `${item.authority || ''}`.toLowerCase();
  const signal = `${title} ${topics} ${authority}`;
  const out = [];

  if (item.jurisdiction === 'Federal') out.push('uae-federal-scope');
  if (item.jurisdiction === 'Dubai') out.push('dubai-scope');
  if (item.jurisdiction === 'DIFC') out.push('difc-registered-entity');
  if (item.jurisdiction === 'ADGM') out.push('adgm-registered-entity');

  const domestic = title.includes('domestic worker') || topics.includes('domestic worker');
  const employment = title.includes('employment') || title.includes('labour') || topics.includes('employment') || topics.includes('labour');
  if (domestic) {
    out.push('domestic-worker', 'domestic-worker-employer');
  } else if (employment && item.jurisdiction === 'Federal') {
    out.push('private-sector-employer', 'private-sector-employee');
  }

  if (signal.includes('financial institution') || signal.includes('banking') || signal.includes('central bank')) out.push('regulated-financial-institution');
  if (signal.includes('virtual asset') || signal.includes('vara') || signal.includes('crypto')) out.push('virtual-asset-service-provider');
  if (signal.includes('consumer')) out.push('consumer-facing-business');
  if (signal.includes('company') || signal.includes('companies') || signal.includes('commercial register')) out.push('business-entity');
  if (signal.includes('tax')) out.push('taxable-person');

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
  const signal = `${item.title || ''} ${item.topics || ''} ${item.authority || ''}`.toLowerCase();
  if (signal.includes('vara') || signal.includes('virtual asset')) return 'Virtual Assets Regulatory Authority (VARA)';
  if (signal.includes('dfsa')) return 'Dubai Financial Services Authority (DFSA)';
  if (signal.includes('fsra')) return 'Financial Services Regulatory Authority (FSRA)';
  if (item.jurisdiction === 'DIFC') return item.authority || 'DIFC Authority';
  if (item.jurisdiction === 'ADGM') return item.authority || 'ADGM';
  return item.authority || item.jurisdiction || 'UAE';
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

  return {
    id,
    title_en: item.title ? `${item.number ? item.number + ' — ' : ''}${item.title}` : item.number || id,
    title_ar: null,
    jurisdiction: ['Federal', 'Dubai', 'DIFC', 'ADGM'].includes(item.jurisdiction) ? item.jurisdiction : 'Federal',
    regulator: regulatorFor(item),
    topic_tags: buildTopicTags(item),
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
});

// Build relationships only when an instrument explicitly cites another instrument
// that already exists in the migrated dataset. This avoids speculative links.
const byNumber = new Map(records.filter(r => r.number).map(r => [r.number.toLowerCase(), r.id]));
for (const record of records) {
  const sourceItem = laws.find(item => item.number === record.number && item.title && record.title_en.endsWith(item.title));
  const text = `${sourceItem?.summary || ''} ${sourceItem?.relevance || ''} ${sourceItem?.note || ''}`.toLowerCase();
  const related = new Set();
  for (const [number, id] of byNumber) {
    if (id !== record.id && text.includes(number)) related.add(id);
  }
  record.related_ids = [...related];
}

for (const record of records) {
  fs.writeFileSync(path.join(outDir, `${record.id}.json`), JSON.stringify(record, null, 2) + '\n');
}

fs.mkdirSync(path.dirname(indexPath), { recursive: true });
fs.writeFileSync(indexPath, JSON.stringify(records, null, 2) + '\n');
console.log(`Migrated ${records.length} instruments to data/legislation and data/index.json`);
