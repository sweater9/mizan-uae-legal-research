/**
 * Applies-to helpers for the enriched legislation schema.
 * Supports both the new object form and legacy string values while migration is phased.
 */

function normaliseAppliesTo(entry) {
  return (entry.applies_to || []).map((value) =>
    typeof value === 'string'
      ? { entity_type: value, condition: '' }
      : { entity_type: value.entity_type || '', condition: value.condition || '' }
  ).filter((value) => value.entity_type);
}

function renderAppliesToBadges(entry) {
  const appliesTo = normaliseAppliesTo(entry);
  if (!appliesTo.length) return '';

  const badges = appliesTo.map((a) => {
    const title = a.condition ? ` title="${escapeHtml(a.condition)}"` : '';
    return `<span class="applies-badge"${title}>${escapeHtml(a.entity_type)}</span>`;
  }).join('');

  return `<div class="applies-to-row"><span class="applies-to-label">Applies to:</span>${badges}</div>`;
}

function renderAppliesToDetail(entry) {
  const appliesRows = normaliseAppliesTo(entry).map((a) => `
      <li>
        <strong>${escapeHtml(a.entity_type)}</strong>
        ${a.condition ? `<span class="condition">— ${escapeHtml(a.condition)}</span>` : ''}
      </li>`).join('');

  const notAppliesRows = (entry.does_not_apply_to || [])
    .map((n) => `<li>${escapeHtml(n)}</li>`)
    .join('');

  const trigger = entry.trigger_condition
    ? `<p class="trigger-condition"><strong>Trigger:</strong> ${escapeHtml(entry.trigger_condition)}</p>`
    : '';

  return `
    <section class="impact-block">
      <h3>Who this impacts</h3>
      ${trigger}
      <div class="impact-columns">
        <div class="applies">
          <h4>Applies to</h4>
          <ul>${appliesRows || '<li>Not specified</li>'}</ul>
        </div>
        <div class="not-applies">
          <h4>Does NOT apply to</h4>
          <ul>${notAppliesRows || '<li>Not specified</li>'}</ul>
        </div>
      </div>
    </section>`;
}

function getAppliesToFacetOptions(entries) {
  const set = new Set();
  entries.forEach((entry) => normaliseAppliesTo(entry).forEach((a) => set.add(a.entity_type)));
  return Array.from(set).sort();
}

function filterByAppliesTo(entries, selectedTypes) {
  if (!selectedTypes || selectedTypes.length === 0) return entries;
  return entries.filter((entry) =>
    normaliseAppliesTo(entry).some((a) => selectedTypes.includes(a.entity_type))
  );
}

function escapeHtml(value) {
  const str = String(value ?? '');
  return str.replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);
}

if (typeof window !== 'undefined') {
  window.MizanAppliesTo = {
    renderAppliesToBadges,
    renderAppliesToDetail,
    getAppliesToFacetOptions,
    filterByAppliesTo
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderAppliesToBadges,
    renderAppliesToDetail,
    getAppliesToFacetOptions,
    filterByAppliesTo
  };
}
