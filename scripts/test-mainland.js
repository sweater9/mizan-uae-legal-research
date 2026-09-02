const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const nodes = new Map();
const doc = {querySelector(id) { if(!nodes.has(id)) nodes.set(id,{value:id==='#jurisdiction'?'Mainland':'',addEventListener(){}});return nodes.get(id);},querySelectorAll(){return [];}};
const ctx = vm.createContext({document:doc,window:{},navigator:{},setTimeout(){}});
vm.runInContext(fs.readFileSync('app.js','utf8'),ctx);
for(const path of ['content-2026.js','content-details.js','content-upgrade-aug2026.js','content-step2-ubo-esr.js','content-step3-corporate-tax.js','content-step4-vat.js','content-step5-consumer-digital.js']) vm.runInContext(fs.readFileSync(path,'utf8'),ctx);
vm.runInContext('render = function() {};',ctx);
function verifySearch(label) {
  for(const q of ['beneficial owner','vara']) {
    nodes.get('#query').value=q;
    nodes.get('#jurisdiction').value='Mainland';
    vm.runInContext('search({scroll:false})',ctx);
    const items=vm.runInContext('current',ctx);
    assert(items.length>0,`${label}: ${q} returns results`);
    assert(items.every(l=>['Federal','Dubai'].includes(l.jurisdiction)),`${label}: excludes financial-free-zone records`);
    assert(items.some(l=>l.jurisdiction===(q==='vara'?'Dubai':'Federal')));
    nodes.get('#jurisdiction').value='Dubai';
    vm.runInContext('search({scroll:false})',ctx);
    assert.deepEqual(Array.from(vm.runInContext('current',ctx),l=>l.number),Array.from(items,l=>l.number),`${label}: legacy Dubai returns same sources as Mainland`);
  }
}
verifySearch('fallback');
ctx.window.FlexSearch=require('flexsearch');
vm.runInContext(fs.readFileSync('flexsearch-runtime.js','utf8'),ctx);
verifySearch('FlexSearch');
assert(vm.runInContext('matchesJurisdiction({jurisdiction:"Dubai"},"Dubai")',ctx));
assert(vm.runInContext('matchesJurisdiction({jurisdiction:"Federal"},"Dubai")',ctx),'old Dubai selection includes federal rules');
assert(!vm.runInContext('matchesJurisdiction({jurisdiction:"DIFC"},"Dubai")',ctx));
assert(!vm.runInContext('matchesJurisdiction({jurisdiction:"DIFC"},"Mainland")',ctx));
const ubo=vm.runInContext('laws.find(l=>l.number==="Cabinet Resolution No. 109 of 2023")',ctx);
assert.equal(ubo.actionSteps.length,4);assert(ubo.researchSource.startsWith('https://www.moet.gov.ae/'));
assert(vm.runInContext('laws.some(l=>l.number==="Dubai Law No. 4 of 2022" && l.jurisdiction==="Dubai")',ctx));
console.log('Mainland passed: both search engines, federal/local inclusion, DIFC/ADGM exclusion, preserved legal names and UBO checklist.');
