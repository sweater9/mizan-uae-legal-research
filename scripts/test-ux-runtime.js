const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ux = fs.readFileSync(path.join(root, 'ux-runtime.js'), 'utf8');
const flex = fs.readFileSync(path.join(root, 'flexsearch-runtime.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const glossaryPath = path.join(root, 'data', 'glossary.json');

const checks = [
  ['UX runtime is loaded', html.includes('<script src="ux-runtime.js"></script>')],
  ['Dubai jurisdiction filter remains available', html.includes('<option>Dubai</option>')],
  ['Federal jurisdiction cue exists', ux.includes('Federal: "Generally relevant across the UAE')],
  ['Dubai jurisdiction cue exists', ux.includes('Dubai: "Dubai-specific framework')],
  ['DIFC jurisdiction cue exists', ux.includes('DIFC: "Applies within the DIFC')],
  ['ADGM jurisdiction cue exists', ux.includes('ADGM: "Applies within the ADGM')],
  ['Best match behavior remains', ux.includes('Best match')],
  ['Shareable query URL state exists', ux.includes('searchParams.set("q", q)')],
  ['Shareable jurisdiction URL state exists', ux.includes('searchParams.set("jurisdiction", filter.value)')],
  ['Browser history restoration exists', ux.includes('window.addEventListener("popstate",restoreFromUrl)')],
  ['Copy search link action exists', ux.includes('Copy search link')],
  ['250ms input debounce exists', ux.includes('),250);')],
  ['Jurisdiction clustering exists', ux.includes('clusterJurisdictions') && css.includes('.jurisdiction-group')],
  ['Superseded toggle exists', ux.includes('Include superseded') && flex.includes('mizanIncludeSuperseded')],
  ['Historical query exception exists', flex.includes('historyTerms') && flex.includes('wantsHistory')],
  ['Glossary fallback exists', fs.existsSync(glossaryPath) && ux.includes('data/glossary.json') && ux.includes('fuzzySuggestions')],
  ['Mobile controls have touch-friendly minimum height', css.includes('min-height:44px')],
  ['FlexSearch ranking remains outside UX runtime', !/FlexSearch|scoreLaw|directIntentBoost|flexIds/.test(ux)]
];

let failures = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) failures += 1;
}
if (failures) process.exit(1);
console.log(`All ${checks.length} UX runtime checks passed.`);
