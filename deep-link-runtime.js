// Reads ?entry=<law number> on page load, runs a search for it, and scrolls
// to the matching card once results render. Depends on app.js (query, search,
// laws) and results-runtime.js (card IDs / render) already being loaded.
(() => {
  if (typeof search !== "function" || typeof laws === "undefined") return;

  function entryId(number) {
    return `card-${encodeURIComponent(number)}`;
  }

  function scrollToEntry(number, attempt = 0) {
    const target = document.getElementById(entryId(number));
    if (target) {
      const detail = target.querySelector("details");
      if (detail) detail.open = true;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("flash");
      setTimeout(() => target.classList.remove("flash"), 1200);
      return;
    }
    if (attempt < 10) {
      setTimeout(() => scrollToEntry(number, attempt + 1), 100);
    }
  }

  function loadFromUrl() {
    const params = new URLSearchParams(location.search);
    const entry = params.get("entry");
    if (!entry) return;

    const match = laws.find(law => law.number === entry);
    if (!match) return;

    query.value = match.number;
    search({ scroll: false, history: "replace" });
    scrollToEntry(match.number);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadFromUrl, { once: true });
  } else {
    loadFromUrl();
  }
})();
