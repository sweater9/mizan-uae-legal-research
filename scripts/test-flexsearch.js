const fs = require('fs');
const path = require('path');
const FlexSearch = require('flexsearch');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'data', 'index.json');
if (!fs.existsSync(dataPath)) throw new Error('Missing data/index.json. Run npm run migrate:data first.');

const records = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const index = new FlexSearch.Index({ tokenize: 'forward', cache: true });

records.forEach((record, id) => {
  index.add(id, [
    record.number,
    record.title_en,
    ...(record.topic_tags || []),
    ...(record.search_terms || []),
    record.regulator,
    record.jurisdiction,
    record.plain_summary_en,
    record.relevance_en,
    record.note_en
  ].filter(Boolean).join(' '));
});

const synonyms = {
  overtime: ['overtime', 'working hours', 'employment', 'labour'],
  'beneficial owner': ['beneficial owner', 'ubo', 'ultimate ownership'],
  'corporate tax': ['corporate tax', 'taxation'],
  vara: ['vara', 'virtual assets', 'crypto'],
  'data protection': ['data protection', 'privacy', 'personal data'],
  'labour termination': ['labour termination', 'employment termination', 'dismissal', 'notice']
};

function search(query) {
  const terms = synonyms[query] || [query];
  const ids = new Set();
  terms.forEach(term => {
    (index.search(term, { limit: 50, suggest: true }) || []).forEach(id => ids.add(id));
  });
  return [...ids].map(id => records[id]);
}

const cases = [
  ['overtime', record => /Employment Relationships|Executive Regulation/i.test(record.title_en) || /overtime|working hours/i.test(`${record.plain_summary_en} ${record.relevance_en} ${record.note_en}`)],
  ['beneficial owner', record => /Real Beneficiary|Money Laundering/i.test(record.title_en)],
  ['corporate tax', record => /Corporate Tax/i.test(record.title_en)],
  ['vara', record => record.jurisdiction === 'Dubai' && /VARA|Virtual Asset/i.test(`${record.title_en} ${record.regulator}`)],
  ['data protection', record => /Data Protection/i.test(record.title_en)],
  ['labour termination', record => /Employment|Labour|Domestic Workers/i.test(record.title_en)]
];

let failures = 0;
for (const [query, predicate] of cases) {
  const results = search(query);
  const matched = results.some(predicate);
  console.log(`${matched ? 'PASS' : 'FAIL'} ${query}: ${results.slice(0, 5).map(r => r.title_en).join(' | ')}`);
  if (!matched) failures += 1;
}

if (failures) {
  console.error(`${failures} representative FlexSearch query check(s) failed.`);
  process.exit(1);
}
console.log(`All ${cases.length} representative FlexSearch query checks passed.`);
