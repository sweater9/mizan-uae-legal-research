// Phase 1 search runtime. Presentation and rendering remain in app.js.
// If FlexSearch is unavailable, the original search() implementation remains active.
(() => {
  if (!window.FlexSearch || !window.FlexSearch.Index || typeof laws === "undefined") return;

  const fallbackSearch = search;
  const index = new window.FlexSearch.Index({ tokenize: "forward", cache: true });

  laws.forEach((law, id) => {
    index.add(id, [
      law.number,
      law.title,
      law.topics,
      law.authority,
      law.jurisdiction,
      law.summary,
      law.relevance,
      law.note || ""
    ].join(" "));
  });

  function flexIds(rawQuery) {
    const terms = expandTerms(rawQuery);
    const queries = [...new Set([normalise(rawQuery), ...terms])].filter(Boolean);
    const rank = new Map();

    queries.forEach((term, queryIndex) => {
      let hits = [];
      try {
        hits = index.search(term, { limit: 100, suggest: true }) || [];
      } catch (error) {
        hits = [];
      }
      hits.forEach((id, hitIndex) => {
        const boost = Math.max(1, 120 - queryIndex * 4 - hitIndex);
        rank.set(id, (rank.get(id) || 0) + boost);
      });
    });

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
        .sort((a, b) => (b.legacy - a.legacy) || (b.flex - a.flex) || a.l.authority.localeCompare(b.l.authority))
        .map(x => x.l);

      if (!current.length) return fallbackSearch(options);
      render(q, options.scroll);
    } catch (error) {
      fallbackSearch(options);
    }
  };
})();
