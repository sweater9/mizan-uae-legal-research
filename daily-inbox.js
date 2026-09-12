// Personalised daily inbox: verified changes are ranked against the saved company profile.
(function(){
 const root=document.getElementById('daily-inbox-list'), summary=document.getElementById('daily-inbox-summary'); if(!root)return;
 const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const rank={'Applies':0,'Potentially applies':1,'Needs review':2,'Needs profile':3,'Doesn’t appear applicable':4};
 function render(){
  const changes=Array.isArray(window.mizanChanges)?window.mizanChanges:[], engine=window.MizanApplicability; if(!engine)return;
  const p=engine.load(), rows=changes.map(c=>({c,a:engine.evaluate(c,p)})).sort((x,y)=>(rank[x.a.status]??9)-(rank[y.a.status]??9));
  const applies=rows.filter(x=>x.a.status==='Applies').length, potential=rows.filter(x=>x.a.status==='Potentially applies').length, filtered=rows.filter(x=>x.a.status==='Doesn’t appear applicable').length;
  summary.innerHTML=`<strong>${applies} change${applies===1?'':'s'} appl${applies===1?'ies':'y'} to your profile</strong><span>${potential} potentially applicable · ${filtered} filtered out</span>`;
  root.innerHTML=rows.map(({c,a})=>`<article class="inbox-card inbox-${a.status.toLowerCase().replace(/[^a-z]+/g,'-')}"><div class="inbox-top"><span class="applicability-badge">${esc(a.status)}</span><span>${esc(a.confidence)} applicability confidence</span><span>${esc(c.jurisdiction)} · ${esc(c.provision)}</span></div><h3>${esc(c.title)}</h3><p class="why-seeing"><b>Why you're seeing this</b> ${esc(a.reason)}</p><div class="inbox-grid"><div><b>Impact</b><p>${esc(c.impact)}</p></div><div><b>Action</b><p>${esc((c.action||[])[0]||'Review the official evidence and assess internal impact.')}</p></div></div><div class="inbox-actions"><a href="#${esc(c.id)}">Show exact change</a><a href="${esc(c.amendmentSource)}" target="_blank" rel="noreferrer">View official evidence ↗</a></div></article>`).join('') || '<div class="empty">No verified change records are available.</div>';
 }
 window.addEventListener('mizan:profile',render); render();
})();