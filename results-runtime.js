// Expanded results presentation layer. Search/ranking remains owned by app.js + flexsearch-runtime.js.
(() => {
  if (typeof render !== "function" || typeof laws === "undefined") return;

  function findLaw(number) {
    return laws.find(law => law.number === number);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function entryId(number) {
    return `card-${encodeURIComponent(number)}`;
  }

  function renderChips(numbers, label) {
    if (!numbers || !numbers.length) return "";
    const chips = numbers.map(number => {
      const match = findLaw(number);
      return match
        ? `<button type="button" class="chip" data-jump="${escapeHtml(match.number)}">${escapeHtml(match.number)}</button>`
        : `<span class="chip chip-missing">${escapeHtml(number)}</span>`;
    }).join("");
    return `<div class="chip-row"><b>${escapeHtml(label)}</b>${chips}</div>`;
  }

  function renderAppliesTo(law) {
    if (!law.appliesTo && !law.notApplyTo) return "";
    const applies = (law.appliesTo || []).map(item => `<li>${escapeHtml(item)}</li>`).join("");
    const notApplies = (law.notApplyTo || []).map(item => `<li>${escapeHtml(item)}</li>`).join("");
    return `<div class="applies-block">
      <div><b>Applies to</b><ul>${applies || "<li>Not specified</li>"}</ul></div>
      <div><b>Does not apply to</b><ul>${notApplies || "<li>Not specified</li>"}</ul></div>
    </div>`;
  }

  function renderTimelineNode(number) {
    if (!number) return "";
    const match = findLaw(number);
    return match
      ? `<button type="button" class="chip" data-jump="${escapeHtml(match.number)}">${escapeHtml(match.number)}</button>`
      : `<span class="chip chip-missing">${escapeHtml(number)}</span>`;
  }

  function renderStatusTimeline(law) {
    if (!law.supersedes && !law.supersededBy) return "";
    const prev = law.supersedes ? `${renderTimelineNode(law.supersedes)} <span aria-hidden="true">→</span>` : "";
    const next = law.supersededBy ? `<span aria-hidden="true">→</span> ${renderTimelineNode(law.supersededBy)}` : "";
    return `<div class="timeline">${prev} <b>${escapeHtml(law.number)}</b> ${next}</div>`;
  }

  render = function expandedRender(q, shouldScroll = true) {
    intro.hidden = true;
    results.hidden = false;
    title.textContent = q;
    count.textContent = current.length
      ? `${current.length} relevant instrument${current.length === 1 ? "" : "s"} across the verified starter index`
      : "No close match in the verified starter index";
    copy.hidden = !current.length;

    list.innerHTML = current.length
      ? current.map((law, index) => `
        <article class="card" id="${entryId(law.number)}">
          <div class="card-num">${String(index + 1).padStart(2, "0")}</div>
          <div class="card-body">
            <div class="meta">
              <span class="pill">${escapeHtml(law.jurisdiction)}</span>
              <span class="pill">${escapeHtml(law.status)}</span>
              <span>${escapeHtml(law.authority)}</span>
            </div>
            <h3>${escapeHtml(law.number)}</h3>
            <h4>${escapeHtml(law.title)}</h4>
            <p>${escapeHtml(law.summary)}</p>
            <div class="why"><b>Why it matters</b><p>${escapeHtml(law.relevance)}</p></div>
            ${renderAppliesTo(law)}
            ${renderChips(law.readWith, "Read together with")}
            ${renderStatusTimeline(law)}
            ${law.note ? `<p class="note">Status note · ${escapeHtml(law.note)}</p>` : ""}
            <div class="card-actions">
              <a class="source" href="${escapeHtml(law.source)}" target="_blank" rel="noreferrer">View official source <span>↗</span></a>
              <button type="button" class="permalink" data-copy="${escapeHtml(law.number)}">Copy link to this entry</button>
            </div>
          </div>
        </article>`).join("")
      : `<div class="empty"><h3>No verified match</h3><p>This static edition avoids inventing a citation when the curated index has no match. Try a shorter keyword or continue in the official UAE Legislation database.</p><a href="https://uaelegislation.gov.ae/en/legislations" target="_blank">Open UAE Legislation ↗</a></div>`;

    if (shouldScroll) scrollToResults();
  };

  list.addEventListener("click", async event => {
    const jump = event.target.closest("[data-jump]");
    if (jump) {
      const number = jump.dataset.jump;
      const target = document.getElementById(entryId(number));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        target.classList.add("flash");
        setTimeout(() => target.classList.remove("flash"), 1200);
      } else {
        query.value = number;
        search();
      }
      return;
    }

    const copyButton = event.target.closest("[data-copy]");
    if (!copyButton) return;
    const url = `${location.origin}${location.pathname}?entry=${encodeURIComponent(copyButton.dataset.copy)}`;
    try {
      await navigator.clipboard.writeText(url);
      copyButton.textContent = "Copied";
    } catch (error) {
      copyButton.textContent = "Copy from address bar";
    }
    setTimeout(() => (copyButton.textContent = "Copy link to this entry"), 1500);
  });
})();
