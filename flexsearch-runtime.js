// Phase 1/2 search runtime. Presentation and rendering remain in app.js.
// If FlexSearch is unavailable, the original search() implementation remains active.
(() => {
  if (!window.FlexSearch || !window.FlexSearch.Index || typeof laws === "undefined") return;

  const fallbackSearch = search;
  const index = new window.FlexSearch.Index({ tokenize: "forward", cache: true });
  laws.forEach((law, id) => index.add(id, [law.number, law.title, law.topics, law.authority, law.jurisdiction, law.summary, law.relevance, law.note || ""].join(" ")));

  const intentRules = [
    { any: ["extra hours", "work late", "working late", "after hours", "overtime"], add: ["overtime", "working hours", "labour", "employment"] },
    { any: ["probation", "trial period", "probationary"], add: ["probation", "employment", "labour", "notice"] },
    { any: ["gratuity", "end of service", "end-of-service", "severance"], add: ["end of service", "gratuity", "employment", "labour"] },
    { any: ["notice period", "notice before termination", "termination notice", "dismissal notice"], add: ["notice", "termination", "employment", "labour"] },
    { any: ["competitor", "non compete", "non-compete", "restraint of trade"], add: ["non compete", "employment", "labour", "termination"] },
    { any: ["annual leave", "holiday entitlement", "paid leave", "vacation leave"], add: ["annual leave", "leave", "employment", "labour"] },
    { any: ["sick leave", "medical leave"], add: ["sick leave", "leave", "employment", "labour"] },
    { all: ["vat", "register"], add: ["vat", "tax registration", "tax procedures"] },
    { any: ["vat threshold", "vat registration", "register for vat"], add: ["vat", "registration", "threshold", "tax procedures"] },
    { all: ["free zone", "tax"], add: ["corporate tax", "free zone", "qualifying income", "qualifying free zone person"] },
    { any: ["free-zone company", "free zone company"], add: ["corporate tax", "free zone", "qualifying income"] },
    { any: ["crypto licence", "crypto license", "virtual asset licence", "virtual asset license", "vara licence", "vara license"], add: ["vara", "virtual assets", "licensing", "crypto"] },
    { any: ["data leak", "data breach", "personal data leaked", "breach notification"], add: ["data protection", "personal data", "privacy", "breach"] },
    { any: ["beneficial owner", "ultimate owner", "who owns the company", "ubo"], add: ["beneficial owner", "ubo", "ultimate ownership", "real beneficiary"] },
    { any: ["money laundering", "aml", "customer due diligence", "cdd", "kyc"], add: ["aml", "anti money laundering", "customer due diligence", "kyc"] },
    { any: ["sanctions", "asset freeze", "terrorist list", "tfs"], add: ["sanctions", "targeted financial sanctions", "asset freeze", "aml"] }
  ];

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

  function flexIds(rawQuery) {
    const rank = new Map();
    const addHits = (term, base) => {
      let hits = [];
      try { hits = index.search(term, { limit: 100, suggest: true }) || []; } catch (error) { hits = []; }
      hits.forEach((id, hitIndex) => rank.set(id, (rank.get(id) || 0) + Math.max(1, base - hitIndex)));
    };

    const intents = intentTerms(rawQuery);
    const full = normalise(rawQuery);
    if (full) addHits(full, intents.length ? 80 : 160);
    intents.forEach((term, i) => addHits(term, 420 - i * 25));
    [...new Set(expandTerms(rawQuery))].forEach((term, i) => addHits(term, (intents.length ? 25 : 90) - Math.min(i * 2, intents.length ? 15 : 60)));
    return rank;
  }

  search = function flexSearch(options = { scroll: true }) {
    const q = query.value.trim();
    if (!q) return;
    try {
      const rank = flexIds(q);
      if (!rank.size) return fallbackSearch(options);
      current = [...rank.keys()]
        .map(id => ({ l: laws[id], flex: rank.get(id), legacy: scoreLaw(laws[id], q) }))
        .filter(x => x.l && (filter.value === "All" || x.l.jurisdiction === filter.value))
        .sort((a, b) => (b.flex - a.flex) || (b.legacy - a.legacy) || a.l.authority.localeCompare(b.l.authority))
        .map(x => x.l);
      if (!current.length) return fallbackSearch(options);
      render(q, options.scroll);
    } catch (error) {
      fallbackSearch(options);
    }
  };
})();
