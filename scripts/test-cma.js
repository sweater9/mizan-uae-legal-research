const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const nodes = new Map();
const shortcut={dataset:{query:'CMA UAE',jurisdiction:'Federal'},addEventListener(event,fn){this.click=fn;}};
const ctx=vm.createContext({window:{},document:{querySelector(id){if(!nodes.has(id))nodes.set(id,{value:'',addEventListener(){}});return nodes.get(id);},querySelectorAll(){return [shortcut];}},navigator:{},setTimeout(){}});
for(const file of ['app.js','content-2026.js','content-details.js','content-upgrade-aug2026.js','content-step2-ubo-esr.js','content-step3-corporate-tax.js','content-step4-vat.js','content-step5-consumer-digital.js','content-cma.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
vm.runInContext('render=function(){};',ctx);
function check(mode){
  for(const q of ['CMA UAE','SCA','capital markets authority UAE','capital market authority']){
    nodes.get('#query').value=q;nodes.get('#jurisdiction').value='Mainland';
    vm.runInContext('search({scroll:false})',ctx);
    const items=vm.runInContext('current',ctx);
    assert(items.some(l=>l.number==='Federal Decree-Law No. 32 of 2025'),`${mode}: ${q} contains 32`);
    assert(items.some(l=>l.number==='Federal Decree-Law No. 33 of 2025'),`${mode}: ${q} contains 33`);
    assert(items.slice(0,3).some(l=>l.regulator?.startsWith('Capital Market Authority')),`${mode}: ${q} prioritises CMA`);
  }
  nodes.get('#jurisdiction').value='DIFC';shortcut.click();
  assert.equal(nodes.get('#jurisdiction').value,'Federal');
  assert(vm.runInContext('current.some(l=>l.regulator?.startsWith("Capital Market Authority"))',ctx));
}
check('fallback');ctx.window.FlexSearch=require('flexsearch');vm.runInContext(fs.readFileSync('flexsearch-runtime.js','utf8'),ctx);check('FlexSearch');
const generated=JSON.parse(fs.readFileSync('data/index.json','utf8'));
for(const n of [32,33]){const law=generated.find(l=>l.number===`Federal Decree-Law No. ${n} of 2025`);assert(law);assert.equal(law.jurisdiction,'Federal');assert.equal(law.last_verified,'2026-09-02');assert(law.regulator.startsWith('Capital Market Authority'));}
console.log('CMA checks passed: both aliases and names, both search engines, Mainland coverage, shortcut from DIFC and generated records.');
