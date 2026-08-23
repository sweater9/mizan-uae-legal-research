const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ux = fs.readFileSync(path.join(root, 'ux-runtime.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const checks = [
  ['UX runtime is loaded', html.includes('<script src="ux-runtime.js"></script>')],
  ['Dubai jurisdiction filter remains available', html.includes('<option>Dubai</option>')],
  ['Federal jurisdiction cue exists', ux.includes('Federal: "Generally relevant across the UAE')],
  ['Dubai jurisdiction cue exists', ux.includes('Dubai: "Dubai-specific framework')],
  ['DIFC jurisdiction cue exists', ux.includes('DIFC: "Applies within the DIFC')],
  ['ADGM jurisdiction cue exists', ux.includes('ADGM: "Applies within the ADGM')],
  ['Long result guidance exists', ux.includes('Review the first results first.')],
  ['Best match behavior remains', ux.includes('Best match')],
  ['Mobile controls have touch-friendly minimum height', css.includes('min-height:44px')],
  ['Search ranking is not implemented in UX runtime', !/FlexSearch|scoreLaw|directIntentBoost|flexIds/.test(ux)]
];

let failures = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) failures += 1;
}
if (failures) process.exit(1);
console.log(`All ${checks.length} UX runtime checks passed.`);
