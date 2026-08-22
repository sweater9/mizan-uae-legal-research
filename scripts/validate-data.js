const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data', 'legislation');
const indexPath = path.join(root, 'data', 'index.json');
const allowedJurisdictions = new Set(['Federal', 'Dubai', 'DIFC', 'ADGM']);
const allowedStatuses = new Set(['current', 'superseded', 'repealed', 'draft', 'unknown']);
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

function fail(message, errors) {
  errors.push(message);
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function main() {
  const errors = [];
  if (!fs.existsSync(dataDir)) fail('Missing data/legislation directory', errors);
  if (!fs.existsSync(indexPath)) fail('Missing data/index.json', errors);
  if (errors.length) throw new Error(errors.join('\n'));

  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).sort();
  if (!files.length) fail('No legislation JSON files found', errors);

  const records = [];
  const ids = new Set();
  for (const file of files) {
    const fullPath = path.join(dataDir, file);
    let item;
    try {
      item = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    } catch (error) {
      fail(`${file}: invalid JSON (${error.message})`, errors);
      continue;
    }

    const required = ['id','title_en','jurisdiction','regulator','topic_tags','applies_to','status','last_verified','source_url','plain_summary_en','related_ids'];
    for (const key of required) {
      if (item[key] === undefined || item[key] === null || item[key] === '') fail(`${file}: missing ${key}`, errors);
    }

    if (item.id && ids.has(item.id)) fail(`${file}: duplicate id ${item.id}`, errors);
    if (item.id) ids.add(item.id);
    if (item.id && file !== `${item.id}.json`) fail(`${file}: filename must match id (${item.id}.json)`, errors);
    if (item.jurisdiction && !allowedJurisdictions.has(item.jurisdiction)) fail(`${file}: unsupported jurisdiction ${item.jurisdiction}`, errors);
    if (item.status && !allowedStatuses.has(item.status)) fail(`${file}: unsupported status ${item.status}`, errors);
    if (item.last_verified && !isoDate.test(item.last_verified)) fail(`${file}: last_verified must be YYYY-MM-DD`, errors);
    if (item.effective_date && !isoDate.test(item.effective_date)) fail(`${file}: effective_date must be YYYY-MM-DD or null`, errors);
    if (item.source_url && !isHttpUrl(item.source_url)) fail(`${file}: source_url must be http(s)`, errors);
    if (!Array.isArray(item.topic_tags) || item.topic_tags.length === 0) fail(`${file}: topic_tags must be a non-empty array`, errors);
    if (!Array.isArray(item.applies_to) || item.applies_to.length === 0) fail(`${file}: applies_to must be a non-empty array`, errors);
    if (!Array.isArray(item.related_ids)) fail(`${file}: related_ids must be an array`, errors);
    records.push(item);
  }

  for (const item of records) {
    for (const related of item.related_ids || []) {
      if (!ids.has(related)) fail(`${item.id}: related_id not found: ${related}`, errors);
      if (related === item.id) fail(`${item.id}: related_ids cannot contain itself`, errors);
    }
    if (item.superseded_by && !ids.has(item.superseded_by)) fail(`${item.id}: superseded_by not found: ${item.superseded_by}`, errors);
  }

  let index;
  try {
    index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  } catch (error) {
    fail(`data/index.json: invalid JSON (${error.message})`, errors);
  }
  if (Array.isArray(index)) {
    const indexIds = new Set(index.map(x => x.id));
    if (index.length !== records.length) fail(`data/index.json count ${index.length} does not match legislation count ${records.length}`, errors);
    for (const id of ids) if (!indexIds.has(id)) fail(`data/index.json missing ${id}`, errors);
  } else if (index !== undefined) {
    fail('data/index.json must be an array', errors);
  }

  if (errors.length) {
    console.error(`Validation failed with ${errors.length} issue(s):`);
    errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log(`Validated ${records.length} legislation records successfully.`);
}

main();
