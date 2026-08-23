// Lightweight UX enhancements. Search ranking and core rendering remain unchanged.
(() => {
  if (typeof render !== "function") return;

  const originalRender = render;
  const commonSuggestions = [
    "beneficial owner", "data protection", "corporate tax", "overtime",
    "probation", "gratuity", "non-compete", "VARA licence"
  ];

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

  render = function enhancedRender(q, shouldScroll = true) {
    originalRender(q, shouldScroll);
    addBestMatch();
    improveCount();
    addSearchContext(q);
    improveEmptyState();
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
})();
