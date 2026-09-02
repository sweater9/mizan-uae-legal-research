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

  function briefModel(items) {
    // A search match is not a legal applicability decision. Never combine regimes.
    const lead = items[0];
    if (!lead) return null;
    const historical = /superseded|repealed|former|historical/i.test(lead.status || "");
    return {lead, historical, scope: [...new Set(items.map(law => law.jurisdiction))]};
  }

  function renderBrief(items) {
    const model = briefModel(items);
    if (!model) return "";
    const {lead, historical, scope} = model;
    const cite = `<a href="#${entryId(lead.number)}" class="brief-citation">[1] ${escapeHtml(lead.number)}</a>`;
    const bullets = values => values.map(value => `<li>${escapeHtml(value)}</li>`).join("");
    return `<section class="answer-brief" aria-labelledby="answer-heading">
      <div class="brief-masthead"><span class="eyebrow">Mizan research answer</span><span class="brief-status">${historical ? "Historical material" : "Source-based overview"}</span></div>
      <h3 id="answer-heading">What the source says</h3>
      <p class="answer-scope">Starting point · ${escapeHtml(lead.jurisdiction)} · ${escapeHtml(lead.title)}</p>
      <p class="answer-text">${escapeHtml(lead.researchAnswer || lead.summary)}</p>
      <p>${cite}</p>
      ${lead.researchReviewed ? `<p class="brief-limit">Action checklist checked ${escapeHtml(lead.researchReviewed)} · <a href="${escapeHtml(lead.researchSource)}" target="_blank" rel="noreferrer">Official supporting text ↗</a></p>` : ""}
      <p class="brief-limit">This overview follows the top search match. Confirm the entity type, activity and exclusions before treating it as an applicable requirement.</p>
      <div class="brief-grid">
        <section class="brief-section"><span class="section-number">02 / APPLICABILITY</span><h3>Who is covered?</h3>
          <span class="applicability-status">Confirm your circumstances</span>
          <p>Check your entity and activity against the scope of ${escapeHtml(lead.number)}.</p>
          <ul>${bullets(lead.appliesTo || ["The indexed source does not specify the covered entities. Check the official scope provisions."])}</ul>
          <p>${cite}</p>
        </section>
        <section class="brief-section"><span class="section-number">03 / ACTIONS</span><h3>Your next steps</h3>
          ${lead.actionSteps && !historical ? `<ol class="action-checklist">${bullets(lead.actionSteps)}</ol>` : ""}
          <p class="operational-guidance">${escapeHtml(lead.relevance || "Check the official text for operational requirements.")}</p>
          <p>${cite}</p>
          <ol class="research-steps"><li>Confirm the jurisdiction and scope for your situation.</li><li>Check the official text and related instruments below for the applicable procedure and timing.</li><li>Record the provision and evidence supporting your decision.</li></ol>
        </section>
      </div>
      <section class="brief-watch"><span class="section-number">04 / WATCH-OUTS</span><h3>Check before you rely on this</h3>
        ${historical ? '<p><strong>This is historical material. Do not use it as a current compliance instruction.</strong></p>' : ""}
        <ul>${bullets(lead.notApplyTo || ["Exclusions are not specified in this entry; confirm them in the official text."])}</ul>
        ${lead.note ? `<details><summary>Read the source’s status and scope notes</summary><p>${escapeHtml(lead.note)}</p></details>` : ""}
        <p>${cite}</p>
      </section>
      <section class="narrow-panel"><h3>Where is the business established?</h3><p>${scope.length > 1 ? "Your search spans several jurisdictions. Choose one to review its own sources." : "Choose a jurisdiction to refine the research. Entity type and activity still need to be checked against the source."}</p>
        ${filter.value === "Mainland" ? `<p class="mainland-scope"><strong>Mainland research view:</strong> federal and available emirate-specific sources. Local rules apply only within their stated scope; coverage of local laws across all seven emirates is not complete. Some federal rules also cover non-financial free zones.</p>` : ""}
        <div class="scope-options">${["All", "Federal", "Mainland", "DIFC", "ADGM"].map(value => `<button type="button" data-scope="${value}" aria-pressed="${filter.value === value}">${value === "All" ? "All jurisdictions" : value === "Federal" ? "Federal sources" : value}</button>`).join("")}</div>
      </section>
    </section>`;
  }

  render = function expandedRender(q, shouldScroll = true) {
    intro.hidden = true;
    results.hidden = false;
    title.textContent = q;
    count.textContent = current.length
      ? `${current.length} relevant instrument${current.length === 1 ? "" : "s"} across the verified starter index`
      : "No close match in the verified starter index";
    copy.hidden = !current.length;

    document.body.classList.add("has-results");
    document.getElementById("research-answer").innerHTML = renderBrief(current);
    document.getElementById("evidence-heading").hidden = !current.length;
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
            <details class="evidence-detail"><summary>Read summary, applicability and related rules</summary>
            <p>${escapeHtml(law.summary)}</p>
            <div class="why"><b>Why it matters</b><p>${escapeHtml(law.relevance)}</p></div>
            ${renderAppliesTo(law)}
            ${renderChips(law.readWith, "Read together with")}
            ${renderStatusTimeline(law)}
            ${law.note ? `<p class="note">Status note · ${escapeHtml(law.note)}</p>` : ""}
            </details>
            <div class="card-actions">
              <a class="source" href="${escapeHtml(law.source)}" target="_blank" rel="noreferrer">View official source <span>↗</span></a>
              ${law.regulatorSource ? `<a class="source" href="${escapeHtml(law.regulatorSource)}" target="_blank" rel="noreferrer">CMA regulations ↗</a>` : ""}
              <button type="button" class="permalink" data-copy="${escapeHtml(law.number)}">Copy link to this entry</button>
            </div>
          </div>
        </article>`).join("")
      : `<div class="empty"><h3>No verified match</h3><p>This static edition avoids inventing a citation when the curated index has no match. Try a shorter keyword or continue in the official UAE Legislation database.</p><a href="https://uaelegislation.gov.ae/en/legislations" target="_blank">Open UAE Legislation ↗</a></div>`;

    if (shouldScroll) scrollToResults();
  };

  document.getElementById("research-answer").addEventListener("click", event => {
    const button = event.target.closest("[data-scope]");
    if (button) { filter.value = button.dataset.scope === "Dubai" ? "Mainland" : button.dataset.scope; search({scroll:false}); }
  });

  document.addEventListener("click", event => {
    const citation = event.target.closest(".brief-citation");
    if (!citation) return;
    const target = document.getElementById(citation.getAttribute("href").slice(1));
    if (target) { target.querySelector("details").open = true; }
  });

  window.mizanBriefText = () => {
    const brief = document.getElementById("research-answer").innerText;
    return `${query.value.trim()}\n\n${brief}\n\nEVIDENCE\n${current.map((law, i) => `[${i+1}] ${law.number} — ${law.title}\n${law.status} · ${law.jurisdiction}\n${law.summary}\nSource: ${law.source}${law.regulatorSource ? `\nRegulator: ${law.regulatorSource}` : ""}`).join("\n\n")}\n\nConfirm current consolidated text and effective dates before relying on this research.`;
  };

  list.addEventListener("click", async event => {
    const jump = event.target.closest("[data-jump]");
    if (jump) {
      const number = jump.dataset.jump;
      const target = document.getElementById(entryId(number));
      if (target) {
        target.querySelector("details").open = true;
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
