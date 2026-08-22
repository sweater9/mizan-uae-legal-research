const fs = require('fs');
const path = require('path');
const FlexSearch = require('flexsearch');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'data', 'index.json');
if (!fs.existsSync(dataPath)) throw new Error('Missing data/index.json. Run npm run migrate:data first.');

const records = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const index = new FlexSearch.Index({ tokenize: 'forward', cache: true });
records.forEach((record, id) => index.add(id, [record.number, record.title_en, ...(record.topic_tags || []), ...(record.search_terms || []), record.regulator, record.jurisdiction, record.plain_summary_en, record.relevance_en, record.note_en].filter(Boolean).join(' ')));

const synonymGroups = [
  ['ubo','beneficial owner','beneficial ownership','ultimate beneficial owner','ownership control'],
  ['aml','anti money laundering','money laundering','financial crime'],
  ['ctf','counter terrorist financing','terrorist financing'],
  ['kyc','know your customer','customer due diligence','cdd'],
  ['privacy','data protection','personal data'],
  ['labour','labor','employment','employee'],
  ['termination','dismissal','end of service'],
  ['corporate tax','business tax','taxation'],
  ['dfsa','dubai financial services authority','difc regulator'],
  ['fsra','financial services regulatory authority','adgm regulator'],
  ['sanction','sanctions','targeted financial sanctions','tfs'],
  ['virtual asset','virtual assets','crypto','digital asset','token']
];

const intentRules = [
  { any: ['extra hours','work late','working late','after hours','overtime'], add: ['overtime','working hours','labour','employment'] },
  { any: ['probation','trial period','probationary'], add: ['probation','employment','labour','notice'] },
  { any: ['gratuity','end of service','end-of-service','severance'], add: ['end of service','gratuity','employment','labour'] },
  { any: ['notice period','notice before termination','termination notice','dismissal notice'], add: ['notice','termination','employment','labour'] },
  { any: ['competitor','non compete','non-compete','restraint of trade'], add: ['non compete','employment','labour','termination'] },
  { all: ['free zone','tax'], add: ['corporate tax','free zone','qualifying income','qualifying free zone person'] },
  { any: ['crypto licence','crypto license','virtual asset licence','virtual asset license','vara licence','vara license'], add: ['vara','virtual assets','licensing','crypto'] },
  { any: ['data leak','data breach','personal data leaked','breach notification'], add: ['data protection','personal data','privacy','breach'] },
  { any: ['beneficial owner','ultimate owner','who owns the company','ubo'], add: ['beneficial owner','ubo','ultimate ownership','real beneficiary'] }
];

function normalise(value) { return String(value || '').toLowerCase().replace(/[^\p{L}\p{N}%]+/gu, ' ').trim(); }
function expandTerms(value) {
  const clean = normalise(value);
  const stopwords = new Set(['a','an','and','are','for','from','in','is','of','on','or','the','to','with']);
  const expanded = new Set([clean, ...clean.split(' ').filter(Boolean)]);
  synonymGroups.forEach(group => {
    if (group.some(term => clean.includes(normalise(term)))) group.forEach(term => { expanded.add(normalise(term)); normalise(term).split(' ').forEach(word => expanded.add(word)); });
  });
  return [...expanded].filter(term => term.length > 1 && !stopwords.has(term));
}
function intentTerms(rawQuery) {
  const clean = normalise(rawQuery);
  const out = new Set();
  intentRules.forEach(rule => {
    const anyMatch = !rule.any || rule.any.some(term => clean.includes(normalise(term)));
    const allMatch = !rule.all || rule.all.every(term => clean.includes(normalise(term)));
    if (anyMatch && allMatch) rule.add.forEach(term => out.add(normalise(term)));
  });
  return [...out];
}
function directIntentBoost(record, query) {
  const intents = intentTerms(query);
  if (!intents.length) return 0;
  const heading = normalise(`${record.number} ${record.title_en} ${(record.topic_tags || []).join(' ')} ${(record.search_terms || []).join(' ')}`);
  return intents.reduce((score, term) => {
    if (heading.includes(term)) return score + 600;
    const words = term.split(' ').filter(Boolean);
    const matched = words.filter(word => heading.includes(word)).length;
    return score + matched * 80;
  }, 0);
}
function search(query) {
  const rank = new Map();
  const addHits = (term, base) => {
    const hits = index.search(term, { limit: 100, suggest: true }) || [];
    hits.forEach((id, hitIndex) => rank.set(id, (rank.get(id) || 0) + Math.max(1, base - hitIndex)));
  };
  const intents = intentTerms(query);
  const full = normalise(query);
  if (full) addHits(full, intents.length ? 80 : 160);
  intents.forEach((term, i) => addHits(term, 420 - i * 25));
  [...new Set(expandTerms(query))].forEach((term, i) => addHits(term, (intents.length ? 25 : 90) - Math.min(i * 2, intents.length ? 15 : 60)));
  return [...rank.entries()]
    .map(([id, flex]) => ({ record: records[id], intent: directIntentBoost(records[id], query), flex }))
    .sort((a, b) => (b.intent - a.intent) || (b.flex - a.flex))
    .map(x => x.record);
}

const cases = [
  ['overtime', record => /Employment Relationships|Executive Regulation/i.test(record.title_en)],
  ['beneficial owner', record => /Real Beneficiary|Beneficial Ownership/i.test(record.title_en)],
  ['corporate tax', record => /Corporate Tax/i.test(record.title_en)],
  ['vara', record => record.jurisdiction === 'Dubai' && /VARA|Virtual Asset/i.test(`${record.title_en} ${record.regulator}`)],
  ['data protection', record => /Data Protection/i.test(record.title_en)],
  ['labour termination', record => /Employment|Labour/i.test(record.title_en)],
  ['can my employer make me work extra hours', record => /Employment Relationships|Executive Regulation of the UAE Labour Law/i.test(record.title_en)],
  ['how long can probation last', record => /Employment Relationships|Executive Regulation of the UAE Labour Law/i.test(record.title_en)],
  ['am i entitled to gratuity when i leave my job', record => /Employment Relationships|Executive Regulation of the UAE Labour Law/i.test(record.title_en)],
  ['can my employer stop me joining a competitor', record => /Employment Relationships|Executive Regulation of the UAE Labour Law|DIFC Employment|ADGM Employment/i.test(record.title_en)],
  ['does a free zone company pay corporate tax', record => /Corporate Tax|Qualifying Free Zone|Free Zone/i.test(record.title_en)],
  ['do i need a vara licence for crypto', record => record.jurisdiction === 'Dubai' && /VARA|Virtual Asset/i.test(`${record.title_en} ${record.regulator}`)],
  ['what happens if customer data is leaked', record => /Data Protection/i.test(record.title_en)]
];

let failures = 0;
for (const [query, predicate] of cases) {
  const topFive = search(query).slice(0, 5);
  const matched = topFive.some(predicate);
  console.log(`${matched ? 'PASS' : 'FAIL'} ${query}: ${topFive.map(r => r.title_en).join(' | ')}`);
  if (!matched) failures += 1;
}
if (failures) { console.error(`${failures} representative FlexSearch query check(s) failed.`); process.exit(1); }
console.log(`All ${cases.length} representative FlexSearch query checks passed.`);
