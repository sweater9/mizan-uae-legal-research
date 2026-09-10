// Mizan Regulatory Change Intelligence
// Evidence-first records. A record is "verified" only when an official amendment
// instrument identifies the changed provision and Mizan can align the old/new state.

window.mizanChanges = [
  {
    id: "dfsa-aml-435-7-3-2-natural-person",
    detected: "2026-02-26",
    effectiveDate: "2026-03-02",
    jurisdiction: "DIFC",
    authority: "Dubai Financial Services Authority",
    instrument: "AML Rule-making Instrument (No. 435) 2026",
    provision: "AML 7.3.2(2)",
    title: "Natural-person CDD information expanded",
    changeType: "Information requirement expanded",
    evidenceState: "Verified change",
    confidence: "High",
    before: [
      "Full name",
      "Date and place of birth",
      "Nationality",
      "Legal domicile",
      "Current residential address (not a P.O. box)"
    ],
    after: [
      "Full name",
      "Date and place of birth",
      "Nationality",
      "Legal domicile",
      "Current residential address (not a P.O. box)",
      "Employer name and address, where applicable"
    ],
    added: ["Employer name and address, where applicable"],
    removed: [],
    appliesTo: [
      "DFSA Relevant Persons applying customer identification and verification requirements",
      "Natural-person customer onboarding and CDD"
    ],
    impact: "CDD data capture now includes employer information where applicable. Existing onboarding forms, KYC data models and procedures should be checked for this field and its conditional logic.",
    action: [
      "Review natural-person onboarding/KYC forms and data fields",
      "Confirm procedures define when employer information is applicable",
      "Check downstream screening, record-keeping and quality-assurance controls"
    ],
    sourceNote: "The official DFSA amendment appendix marks the additional employer-information limb as new text in AML 7.3.2(2).",
    amendmentSource: "https://dfsaen.thomsonreuters.com/sites/default/files/net_file_store/Appendix_1_Amendments_to_AML_3.pdf",
    noticeSource: "https://www.dfsa.ae/news/notice-amendments-legislation-february-2026"
  },
  {
    id: "dfsa-aml-435-7-3-2-body-corporate",
    detected: "2026-02-26",
    effectiveDate: "2026-03-02",
    jurisdiction: "DIFC",
    authority: "Dubai Financial Services Authority",
    instrument: "AML Rule-making Instrument (No. 435) 2026",
    provision: "AML 7.3.2(3)",
    title: "Body-corporate CDD information expanded",
    changeType: "Information requirement expanded",
    evidenceState: "Verified change",
    confidence: "High",
    before: [
      "Full name and trading name",
      "Registered office and principal place of business",
      "Date and place of incorporation or registration",
      "Certificate of incorporation or registration",
      "Articles or equivalent governing documents",
      "Full names of senior management"
    ],
    after: [
      "Full name and trading name",
      "Registered office and principal place of business",
      "Date and place of incorporation or registration",
      "Certificate of incorporation or registration",
      "Articles or equivalent governing documents",
      "Full names of senior management",
      "Legal form",
      "Tax registration number, if any",
      "Unique reference number, if any",
      "For foreign bodies corporate, UAE legal representative name and address, if any"
    ],
    added: [
      "Legal form",
      "Tax registration number, if any",
      "Unique reference number, if any",
      "UAE legal representative details for foreign bodies corporate, if any"
    ],
    removed: [],
    appliesTo: [
      "DFSA Relevant Persons applying customer identification and verification requirements",
      "Body-corporate customer onboarding and CDD"
    ],
    impact: "Corporate CDD capture is broader. KYC questionnaires, entity data models, evidence checklists and onboarding workflows may need additional fields and conditional requirements for foreign entities.",
    action: [
      "Add the newly required corporate identity fields to onboarding/KYC controls",
      "Introduce conditional capture for foreign entities' UAE legal representatives",
      "Review QA rules and completeness checks for corporate CDD records"
    ],
    sourceNote: "The official DFSA amendment appendix marks four additional corporate-identification limbs as new text in AML 7.3.2(3).",
    amendmentSource: "https://dfsaen.thomsonreuters.com/sites/default/files/net_file_store/Appendix_1_Amendments_to_AML_3.pdf",
    noticeSource: "https://www.dfsa.ae/news/notice-amendments-legislation-february-2026"
  }
];
