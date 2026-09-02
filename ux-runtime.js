// Lightweight UX enhancements around the existing search/runtime.
(() => {
  if (typeof render !== "function") return;

  const originalRender = render;
  const originalSearch = search;
  let restoringHistory = false;
  let debounceTimer = null;
  let glossary = [];
  const commonSuggestions = ["beneficial owner","data protection","corporate tax","overtime","probation","gratuity","non-compete","VARA licence"];
  const jurisdictionNotes = {
    Federal: "Generally relevant across the UAE where federal law applies; check statutory exclusions and free-zone-specific regimes.",
    Dubai: "Dubai-specific framework. Check whether the activity is in mainland Dubai, another Dubai free zone, or DIFC.",
    DIFC: "Applies within the DIFC legal and regulatory framework rather than the general onshore UAE regime for matters within DIFC jurisdiction.",
    ADGM: "Applies within the ADGM legal and regulatory framework rather than the general onshore UAE regime for matters within ADGM jurisdiction."
  };

  fetch("data/glossary.json").then(r => r.ok ? r.json() : []).then(data => { glossary = Array.isArray(data) ? data : []; }).catch(() => {});

  function addBestMatch() {
    const firstMeta = document.querySelector("#result-list .card .meta");
    if (!firstMeta || firstMeta.querySelector(".best-match")) return;
    const badge = document.createElement("span");
    badge.className = "pill best-match";
    badge.textContent = "Best match";
    firstMeta.prepend(badge);
  }

  function improveCount() {
    if (!current.length) return;
    const scope = filter.value === "All" ? "all jurisdictions" : filter.value;
    count.textContent = `${current.length} relevant instrument${current.length === 1 ? "" : "s"} · current instruments prioritised · ${scope}`;
    count.setAttribute("aria-live", "polite");
  }

  function addSearchContext(q) {
    const head = document.querySelector(".results-head > div:first-child");
    if (!head) return;
    head.querySelector(".search-context")?.remove();
    const context = document.createElement("p");
    context.className = "search-context";
    context.textContent = current.length
      ? `Showing verified instruments relevant to “${q}”. Open the official source to confirm the latest consolidated text.`
      : `No close verified match was found for “${q}”. Try one of the suggested legal topics below.`;
    head.appendChild(context);
  }

  function addJurisdictionCues() {
    document.querySelectorAll("#result-list .card").forEach((card, index) => {
      const law = current[index];
      if (!law || card.querySelector(".scope-cue")) return;
      const note = jurisdictionNotes[law.jurisdiction];
      if (!note) return;
      const why = card.querySelector(".why");
      if (!why) return;
      const cue = document.createElement("p");
      cue.className = "scope-cue";
      cue.innerHTML = `<b>Jurisdiction cue</b> · ${note}`;
      why.before(cue);
    });
  }

  function clusterJurisdictions() {
    if (filter.value !== "All" || current.length < 2) return;
    const jurisdictions = [...new Set(current.map(l => l.jurisdiction))];
    if (jurisdictions.length < 2) return;
    const list = document.querySelector("#result-list");
    const cards = [...list.querySelectorAll(":scope > .card")];
    if (!cards.length) return;
    const grouped = new Map();
    current.forEach((law, index) => {
      if (!grouped.has(law.jurisdiction)) grouped.set(law.jurisdiction, []);
      grouped.get(law.jurisdiction).push(cards[index]);
    });
    grouped.forEach((jurisdictionCards, jurisdiction) => {
      const section = document.createElement("section");
      section.className = "jurisdiction-group";
      section.innerHTML = `<div class="jurisdiction-group-head"><h3>${jurisdiction}</h3><span>${jurisdictionCards.length} instrument${jurisdictionCards.length === 1 ? "" : "s"}</span></div>`;
      jurisdictionCards.forEach(card => section.appendChild(card));
      list.appendChild(section);
    });
  }

  function topicCandidates() {
    const topics = new Set();
    laws.forEach(law => String(law.topics || "").split(/\s+/).filter(t => t.length > 2).forEach(t => topics.add(t.replace(/-/g," "))));
    glossary.forEach(item => { topics.add(item.query || item.term); (item.aliases || []).forEach(a => topics.add(a)); });
    return [...topics];
  }

  function distance(a,b) {
    a = normalise(a); b = normalise(b);
    const d = Array.from({length:a.length+1},(_,i)=>[i]);
    for(let j=1;j<=b.length;j++) d[0][j]=j;
    for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    return d[a.length][b.length];
  }

  function fuzzySuggestions(q) {
    const clean = normalise(q);
    return topicCandidates().map(term => ({term, score: distance(clean, normalise(term)) / Math.max(clean.length, normalise(term).length, 1)}))
      .filter(x => x.score <= .6).sort((a,b)=>a.score-b.score).slice(0,5).map(x=>x.term);
  }

  function improveEmptyState(q) {
    if (current.length) return;
    const empty = document.querySelector("#result-list .empty");
    if (!empty) return;
    const suggestions = fuzzySuggestions(q);
    const choices = suggestions.length ? suggestions : commonSuggestions.slice(0,5);
    const wrap = document.createElement("div");
    wrap.className = "empty-suggestions";
    wrap.innerHTML = `<span>${suggestions.length ? "Did you mean" : "Try a related topic"}</span>${choices.map(term => `<button type="button" data-ux-query="${term}">${term}</button>`).join("")}`;
    empty.appendChild(wrap);
    wrap.querySelectorAll("[data-ux-query]").forEach(button => button.addEventListener("click", () => { query.value = button.dataset.uxQuery; search(); }));
  }

  function addSupersededToggle() {
    const controls = document.querySelector(".controls");
    if (!controls || controls.querySelector("#include-superseded")) return;
    const label = document.createElement("label");
    label.className = "superseded-toggle";
    label.innerHTML = `<input id="include-superseded" type="checkbox"> Include superseded`;
    controls.prepend(label);
    label.querySelector("input").addEventListener("change", e => { window.mizanIncludeSuperseded = e.target.checked; if (query.value.trim()) search({scroll:false}); });
  }

  function buildSearchUrl() {
    const url = new URL(window.location.href); const q = query.value.trim();
    if (q) url.searchParams.set("q", q); else url.searchParams.delete("q");
    if (filter.value && filter.value !== "All") url.searchParams.set("jurisdiction", filter.value); else url.searchParams.delete("jurisdiction");
    return url;
  }
  function syncUrl(mode="push") { if (restoringHistory) return; const next=buildSearchUrl(); if(next.href!==location.href) history[mode==="replace"?"replaceState":"pushState"]({},"",next); }
  function showLandingState(){ current=[]; document.body.classList.remove("has-results"); results.hidden=true; intro.hidden=false; copy.hidden=true; }
  function restoreFromUrl(){ const p=new URLSearchParams(location.search),q=(p.get("q")||"").trim(),j=p.get("jurisdiction")==="Dubai"?"Mainland":p.get("jurisdiction")||"All"; query.value=q; filter.value=[...filter.options].some(o=>o.value===j||o.text===j)?j:"All"; if(!q){showLandingState();return;} restoringHistory=true; try{originalSearch({scroll:false});}finally{restoringHistory=false;} }
  function addCopyLinkAction(){ const controls=document.querySelector(".controls"); if(!controls||controls.querySelector("#copy-link"))return; const b=document.createElement("button"); b.id="copy-link";b.type="button";b.textContent="Copy search link";b.onclick=async()=>{try{await navigator.clipboard.writeText(buildSearchUrl().href);b.textContent="Link copied";}catch{b.textContent="Copy from address bar";}setTimeout(()=>b.textContent="Copy search link",1600)};controls.appendChild(b); }

  render = function enhancedRender(q, shouldScroll=true){ originalRender(q,shouldScroll); addBestMatch(); improveCount(); addSearchContext(q); addJurisdictionCues(); clusterJurisdictions(); improveEmptyState(q); addSupersededToggle(); addCopyLinkAction(); };
  search = function enhancedSearch(options={scroll:true}){ const result=originalSearch(options); syncUrl(options.history||"push"); return result; };

  query.setAttribute("aria-describedby","search-help");
  const help=document.createElement("span");help.id="search-help";help.className="search-help";help.textContent="Search by topic, regulator, law number, or plain-English question. Results update as you type.";document.querySelector(".search")?.appendChild(help);
  query.addEventListener("input",()=>{ clearTimeout(debounceTimer); const q=query.value.trim(); if(q.length<2)return; debounceTimer=setTimeout(()=>search({scroll:false,history:"replace"}),250); });
  document.addEventListener("keydown",event=>{ if(event.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||"")){event.preventDefault();query.focus();} if(event.key==="Escape"&&document.activeElement===query&&query.value){query.value="";showLandingState();history.replaceState({},"",location.pathname);} });
  window.addEventListener("popstate",restoreFromUrl); restoreFromUrl();
})();
