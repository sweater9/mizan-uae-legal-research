// Lightweight UX enhancements. Search ranking and core rendering remain unchanged.
(() => {
  if (typeof render !== "function") return;

  const originalRender = render;
  const originalSearch = search;
  let restoringHistory = false;
  const commonSuggestions = [
    "beneficial owner", "data protection", "corporate tax", "overtime",
    "probation", "gratuity", "non-compete", "VARA licence"
  ];
  const jurisdictionNotes = {
    Federal: "Generally relevant across the UAE where federal law applies; check any statutory exclusions and free-zone-specific regimes.",
    Dubai: "Dubai-specific framework. Check whether the activity is in mainland Dubai, another Dubai free zone, or DIFC before relying on it.",
    DIFC: "Applies within the DIFC legal and regulatory framework rather than the general onshore UAE regime for matters within DIFC jurisdiction.",
    ADGM: "Applies within the ADGM legal and regulatory framework rather than the general onshore UAE regime for matters within ADGM jurisdiction."
  };

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
    count.textContent = `${current.length} relevant instrument${current.length === 1 ? "" : "s"} · best matches first · ${scope}`;
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
      : `No close verified match was found for “${q}”. Try a shorter topic or a related suggestion below.`;
    head.appendChild(context);
  }

  function addJurisdictionCues() {
    document.querySelectorAll("#result-list .card").forEach((card, index) => {
      const law = current[index];
      if (!law || card.querySelector(".scope-cue")) return;
      const note = jurisdictionNotes[law.jurisdiction];
      if (!note) return;
      const body = card.querySelector(".card-body");
      const why = body?.querySelector(".why");
      if (!body || !why) return;
      const cue = document.createElement("p");
      cue.className = "scope-cue";
      cue.innerHTML = `<b>Jurisdiction cue</b> · ${note}`;
      body.insertBefore(cue, why);
    });
  }

  function addLongResultGuidance() {
    document.querySelector(".result-guidance")?.remove();
    if (current.length < 8) return;
    const list = document.querySelector("#result-list");
    if (!list) return;
    const guidance = document.createElement("div");
    guidance.className = "result-guidance";
    guidance.innerHTML = `<b>Review the first results first.</b> Mizan ranks the strongest matches at the top; later results may provide supporting, adjacent or jurisdiction-specific context.`;
    list.prepend(guidance);
  }

  function improveEmptyState() {
    if (current.length) return;
    const empty = document.querySelector("#result-list .empty");
    if (!empty || empty.querySelector(".empty-suggestions")) return;
    const wrap = document.createElement("div");
    wrap.className = "empty-suggestions";
    wrap.innerHTML = `<span>Try a related topic</span>${commonSuggestions.slice(0, 5).map(term => `<button type="button" data-ux-query="${term}">${term}</button>`).join("")}`;
    empty.appendChild(wrap);
    wrap.querySelectorAll("[data-ux-query]").forEach(button => button.addEventListener("click", () => {
      query.value = button.dataset.uxQuery;
      search();
    }));
  }

  function buildSearchUrl() {
    const url = new URL(window.location.href);
    const q = query.value.trim();
    if (q) url.searchParams.set("q", q); else url.searchParams.delete("q");
    if (filter.value && filter.value !== "All") url.searchParams.set("jurisdiction", filter.value);
    else url.searchParams.delete("jurisdiction");
    return url;
  }

  function syncUrl() {
    if (restoringHistory) return;
    const next = buildSearchUrl();
    if (next.href !== window.location.href) history.pushState({ q: query.value.trim(), jurisdiction: filter.value }, "", next);
  }

  function showLandingState() {
    current = [];
    results.hidden = true;
    intro.hidden = false;
    copy.hidden = true;
  }

  function restoreFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const q = (params.get("q") || "").trim();
    const jurisdiction = params.get("jurisdiction") || "All";
    const validJurisdiction = [...filter.options].some(option => option.value === jurisdiction || option.text === jurisdiction);
    query.value = q;
    filter.value = validJurisdiction ? jurisdiction : "All";
    if (!q) {
      showLandingState();
      return;
    }
    restoringHistory = true;
    try { originalSearch({ scroll: false }); } finally { restoringHistory = false; }
  }

  function addCopyLinkAction() {
    const controls = document.querySelector(".controls");
    if (!controls || controls.querySelector("#copy-link")) return;
    const button = document.createElement("button");
    button.id = "copy-link";
    button.type = "button";
    button.textContent = "Copy search link";
    button.addEventListener("click", async () => {
      const url = buildSearchUrl().href;
      try {
        await navigator.clipboard.writeText(url);
        button.textContent = "Link copied";
      } catch (error) {
        button.textContent = "Copy from address bar";
      }
      setTimeout(() => { button.textContent = "Copy search link"; }, 1600);
    });
    controls.appendChild(button);
  }

  render = function enhancedRender(q, shouldScroll = true) {
    originalRender(q, shouldScroll);
    addBestMatch();
    improveCount();
    addSearchContext(q);
    addJurisdictionCues();
    addLongResultGuidance();
    improveEmptyState();
    addCopyLinkAction();
  };

  search = function shareableSearch(options = { scroll: true }) {
    const result = originalSearch(options);
    syncUrl();
    return result;
  };

  query.setAttribute("aria-describedby", "search-help");
  const help = document.createElement("span");
  help.id = "search-help";
  help.className = "search-help";
  help.textContent = "You can search by legal topic, regulator, law number, or a plain-English question.";
  document.querySelector(".search")?.appendChild(help);

  document.addEventListener("keydown", event => {
    if (event.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "")) {
      event.preventDefault();
      query.focus();
    }
    if (event.key === "Escape" && document.activeElement === query && query.value) {
      query.value = "";
      query.focus();
    }
  });

  window.addEventListener("popstate", restoreFromUrl);
  restoreFromUrl();
})();
