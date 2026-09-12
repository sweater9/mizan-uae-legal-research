// Mizan My Profile + deterministic applicability engine.
// Profile data stays in this browser (localStorage). Legal applicability is not delegated to an LLM.
(function () {
  const KEY = 'mizan-company-profile-v1';
  const DEFAULT = {name:'', jurisdictions:[], regulators:[], entityTypes:[], activities:[], customers:[], domains:[]};
  const byId = (id) => document.getElementById(id);
  const unique = (xs) => [...new Set(xs.filter(Boolean))];

  function load(){ try { return {...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || '{}')}; } catch (_) { return {...DEFAULT}; } }
  function save(p){ localStorage.setItem(KEY, JSON.stringify(p)); window.dispatchEvent(new CustomEvent('mizan:profile',{detail:p})); }
  function selected(name){ return [...document.querySelectorAll(`[name="${name}"]:checked`)].map(x=>x.value); }
  function setSelected(name, values){ document.querySelectorAll(`[name="${name}"]`).forEach(x=>x.checked=(values||[]).includes(x.value)); }

  function initForm(){
    const form=byId('company-profile-form'); if(!form) return;
    const p=load(); byId('company-name').value=p.name||'';
    ['jurisdictions','regulators','entityTypes','activities','customers','domains'].forEach(k=>setSelected(k,p[k]));
    form.addEventListener('submit',(e)=>{e.preventDefault(); const next={name:byId('company-name').value.trim()}; ['jurisdictions','regulators','entityTypes','activities','customers','domains'].forEach(k=>next[k]=selected(k)); save(next); renderProfile(next); location.hash='daily-inbox';});
    byId('clear-profile')?.addEventListener('click',()=>{localStorage.removeItem(KEY); form.reset(); renderProfile(DEFAULT); window.dispatchEvent(new CustomEvent('mizan:profile',{detail:DEFAULT}));});
    renderProfile(p);
  }
  function renderProfile(p){
    const out=byId('profile-summary'); if(!out)return; const tags=unique([...(p.jurisdictions||[]),...(p.regulators||[]),...(p.entityTypes||[]),...(p.activities||[]),...(p.customers||[]),...(p.domains||[])]);
    out.innerHTML=tags.length?`<b>${p.name||'My organisation'}</b><span>${tags.map(x=>`<i>${x}</i>`).join('')}</span>`:'<b>No company profile saved yet.</b><span>Create a profile to filter regulatory changes by relevance.</span>';
  }

  const rules = {
    'dfsa-aml-435-7-3-2-natural-person': {jurisdiction:'DIFC', regulator:'DFSA', domains:['AML / KYC'], customers:['Individuals'], reason:'This is a DFSA AML customer due-diligence change for natural-person customers.'},
    'dfsa-aml-435-7-3-2-body-corporate': {jurisdiction:'DIFC', regulator:'DFSA', domains:['AML / KYC'], customers:['Corporate'], reason:'This is a DFSA AML customer due-diligence change for body-corporate customers.'}
  };
  function evaluate(change,p){
    const r=rules[change.id]; if(!r) return {status:'Needs review',confidence:'Low',reason:'No structured applicability rule has yet been verified for this change.'};
    const profileEmpty=!p.jurisdictions.length&&!p.regulators.length&&!p.domains.length&&!p.customers.length;
    if(profileEmpty) return {status:'Needs profile',confidence:'—',reason:'Complete your company profile to assess this change.'};
    if(p.jurisdictions.length && !p.jurisdictions.includes(r.jurisdiction)) return {status:'Doesn’t appear applicable',confidence:'High',reason:`Your saved jurisdiction does not include ${r.jurisdiction}.`};
    if(p.regulators.length && !p.regulators.includes(r.regulator)) return {status:'Doesn’t appear applicable',confidence:'High',reason:`Your saved regulators do not include ${r.regulator}.`};
    const domainHit=!p.domains.length||r.domains.some(x=>p.domains.includes(x));
    const customerHit=!p.customers.length||r.customers.some(x=>p.customers.includes(x));
    if(domainHit&&customerHit) return {status:'Applies',confidence:'High',reason:r.reason};
    if(!domainHit) return {status:'Doesn’t appear applicable',confidence:'Medium',reason:`Your profile does not currently include ${r.domains.join(' / ')}.`};
    return {status:'Potentially applies',confidence:'Medium',reason:`The rule is in scope for your jurisdiction/regulator, but its customer scope (${r.customers.join(', ')}) is not confirmed by your profile.`};
  }
  window.MizanApplicability={load,evaluate,rules}; initForm();
})();