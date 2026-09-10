(function () {
  const changes = Array.isArray(window.mizanChanges) ? window.mizanChanges : [];
  const root = document.getElementById('change-monitor-list');
  const count = document.getElementById('change-monitor-count');
  const filter = document.getElementById('change-jurisdiction');
  if (!root) return;

  const esc = (value) => String(value ?? '').replace(/[&<>\"]/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
  const fmt = (iso) => new Intl.DateTimeFormat('en-GB', {day:'numeric', month:'short', year:'numeric'}).format(new Date(`${iso}T00:00:00`));

  function list(items, cls) {
    return `<ul class="${cls || ''}">${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
  }

  function delta(before, after) {
    const beforeSet = new Set(before);
    const afterSet = new Set(after);
    const oldHtml = before.map((x) => `<li>${esc(x)}</li>`).join('');
    const newHtml = after.map((x) => `<li class="${beforeSet.has(x) ? '' : 'delta-added'}">${beforeSet.has(x) ? '' : '<span>Added</span>'}${esc(x)}</li>`).join('');
    const removed = before.filter((x) => !afterSet.has(x));
    return `<div class="delta-grid"><div class="delta-panel delta-before"><p class="delta-label">Before</p><ul>${oldHtml}</ul></div><div class="delta-panel delta-after"><p class="delta-label">Now</p><ul>${newHtml}</ul>${removed.length ? `<p class="delta-removed-label">Removed</p>${list(removed, 'delta-removed')}` : ''}</div></div>`;
  }

  function card(change) {
    return `<article class="change-card" id="${esc(change.id)}">
      <div class="change-card-head">
        <div>
          <div class="change-meta"><span class="verified-badge">✓ ${esc(change.evidenceState)}</span><span>${esc(change.jurisdiction)}</span><span>${esc(change.provision)}</span><span>Effective ${fmt(change.effectiveDate)}</span></div>
          <h3>${esc(change.title)}</h3>
          <p class="change-type">${esc(change.changeType)} · ${esc(change.instrument)}</p>
        </div>
        <div class="confidence"><span>Evidence confidence</span><b>${esc(change.confidence)}</b></div>
      </div>
      <div class="change-flow"><span>Change detected</span><b>→</b><span>Exact provision</span><b>→</b><span>Before / after</span><b>→</b><span>Applicability</span><b>→</b><span>Impact</span><b>→</b><span>Action</span><b>→</b><span>Evidence</span></div>
      <section class="change-section"><p class="section-number">01 / Exact provision change</p>${delta(change.before, change.after)}</section>
      <div class="change-two-col">
        <section class="change-section"><p class="section-number">02 / Who is affected</p>${list(change.appliesTo)}</section>
        <section class="change-section"><p class="section-number">03 / Compliance impact</p><p>${esc(change.impact)}</p></section>
      </div>
      <section class="change-section action-panel"><p class="section-number">04 / Action to review</p>${list(change.action)}</section>
      <section class="change-section evidence-panel"><div><p class="section-number">05 / Official evidence</p><p>${esc(change.sourceNote)}</p><p class="evidence-disclaimer">Mizan only labels a provision-level delta “Verified change” when the official amendment source supports the aligned old/new state. If alignment is uncertain, the record must remain “Review required”.</p></div><div class="evidence-links"><a href="${esc(change.amendmentSource)}" target="_blank" rel="noreferrer">Open amendment appendix ↗</a><a href="${esc(change.noticeSource)}" target="_blank" rel="noreferrer">Open DFSA notice ↗</a></div></section>
    </article>`;
  }

  function render() {
    const selected = filter ? filter.value : 'All';
    const visible = selected === 'All' ? changes : changes.filter((c) => c.jurisdiction === selected);
    if (count) count.textContent = `${visible.length} verified provision-level change${visible.length === 1 ? '' : 's'}`;
    root.innerHTML = visible.length ? visible.map(card).join('') : '<div class="empty">No verified provision-level changes match this filter.</div>';
  }

  if (filter) filter.addEventListener('change', render);
  render();
})();
