// CMA UAE: official naming and core legislation located on 2 September 2026.
// High-level research entries only; full article-by-article verification remains necessary.
(() => {
  const regulator = 'Capital Market Authority (CMA), UAE — formerly SCA';
  const common = {
    jurisdiction: 'Federal', authority: regulator, regulator,
    regulatorSource: 'https://www.uaecma.gov.ae/en/regulations/regulations-listing.aspx',
    status: 'In force', lastVerified: '2026-09-02',
    appliesTo: ['Entities and activities within the UAE Capital Market Authority’s statutory remit'],
    notApplyTo: ['Activities outside the instrument’s statutory scope'],
    topics: 'cma sca capital market authority capital markets authority securities commodities authority uae mainland federal regulator'
  };
  addLawIfMissing({
    ...common,
    number: 'Federal Decree-Law No. 32 of 2025',
    title: 'Capital Market Authority',
    summary: 'The UAE Capital Market Authority (CMA) replaces the Securities and Commodities Authority (SCA). This law provides the statutory basis for the regulator; references to SCA in legislation are replaced by the CMA designation.',
    relevance: 'Start here to identify the regulator and its mandate. Read Federal Decree-Law No. 33 of 2025 for the capital-market regulatory framework, then consult the CMA’s official regulations for the relevant activity.',
    note: 'CMA means the UAE Capital Market Authority in this entry. SCA remains a search alias for the former name. Check transition provisions and current implementing decisions before relying on an older SCA rule. This overview does not establish a firm’s licensing or onboarding obligations.',
    source: 'https://uaelegislation.gov.ae/en/legislations/4001',
    readWith: ['Federal Decree-Law No. 33 of 2025']
  });
  addLawIfMissing({
    ...common,
    number: 'Federal Decree-Law No. 33 of 2025',
    title: 'Regulation of the Capital Market',
    summary: 'The federal capital-market framework to read alongside the CMA establishment law. Use it to assess whether a proposed financial activity falls within the UAE Capital Market Authority’s regulatory scope.',
    relevance: 'Define the activity, the entity’s location and the intended market. Check the law’s scope and the relevant CMA regulations before deciding which permissions and ongoing requirements apply.',
    note: 'CMA supervision is not determined solely by a UAE address. Check the statutory treatment of financial free zones and cross-border activity; do not substitute CMA rules for DFSA or FSRA rules without a scope assessment. This is a framework entry, not a verified activity-specific checklist.',
    source: 'https://uaelegislation.gov.ae/en/legislations/4002-111',
    readWith: ['Federal Decree-Law No. 32 of 2025']
  });
})();
