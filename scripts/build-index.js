const fs = require('fs');
const path = require('path');
const FlexSearch = require('flexsearch');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'data', 'index.json');
const outDir = path.join(root, 'data');

if (!fs.existsSync(dataPath)) {
  throw new Error('Missing data/index.json. Run npm run migrate:data first.');
}

const records = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function createIndex(language) {
  return new FlexSearch.Document({
    tokenize: 'forward',
    cache: true,
    document: {
      id: 'id',
      index: language === 'ar'
        ? ['title_ar', 'plain_summary_ar', 'full_text_ar']
        : ['title_en', 'plain_summary_en', 'full_text_en', 'relevance_en', 'note_en', 'search_terms'],
      store: ['id', 'jurisdiction', 'regulator', 'status', 'topic_tags', 'applies_to']
    }
  });
}

async function exportIndex(index, filename) {
  const chunks = {};
  await index.export((key, data) => {
    chunks[key] = data;
  });
  fs.writeFileSync(path.join(outDir, filename), JSON.stringify(chunks) + '\n');
}

(async () => {
  const en = createIndex('en');
  const ar = createIndex('ar');

  for (const record of records) {
    en.add(record);
    if (record.title_ar || record.plain_summary_ar || record.full_text_ar) ar.add(record);
  }

  await exportIndex(en, 'search-index-en.json');
  await exportIndex(ar, 'search-index-ar.json');
  console.log(`Built static search indexes for ${records.length} instruments.`);
})();
