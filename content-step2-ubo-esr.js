// Step 2 — Beneficial Ownership & Economic Substance.
// Content-only enrichment verified against official UAE, DIFC, ADGM and MoF sources in August 2026.

// Current federal beneficial-ownership framework.
enrichLaw("Cabinet Resolution No. 109 of 2023", {
  summary: "The current federal framework for identifying and maintaining information on the Real Beneficiary (ultimate beneficial owner) of covered UAE legal persons. It requires a Real Beneficiary Register and a Partners or Shareholders Register, captures nominee/trustee relationships and requires covered legal persons to submit prescribed ownership information to their Registrar.",
  relevance: "Use this Resolution when a UAE legal person outside the Financial Free Zones is incorporated, licensed, changes ownership/control or must update beneficial-owner information. A covered legal person must create and maintain its Real Beneficiary Register and update changes within 15 days of becoming aware of them; the Resolution also requires submission of Real Beneficiary and partners/shareholders data to the Registrar within 60 days of implementation or licensing/registration, as applicable.",
  note: "Current federal UBO instrument. Article 22 repealed Cabinet Resolution No. 58 of 2020. Scope includes covered legal persons licensed or registered in the UAE, including non-financial free zones, but excludes legal persons in Financial Free Zones and specified government-owned/government-partner cases. Practical filing is handled through the relevant Registrar/licensing authority, so a JAFZA, DMCC or other commercial-free-zone entity may use that authority's own portal even though Cabinet Resolution No. 109 of 2023 is the federal substantive framework. Read with Cabinet Resolution No. 132 of 2023 on administrative penalties and the current 2025 AML/CFT framework.",
  appliesTo: ["Covered UAE legal persons licensed or registered in the State", "Companies and other legal persons in non-financial free zones where the Resolution applies", "Registrars and licensing authorities responsible for beneficial-owner information"],
  notApplyTo: ["Legal persons in Financial Free Zones, including DIFC and ADGM, which have separate beneficial-ownership regimes", "Companies wholly owned by the Federal or Local Government, or wholly owned by such companies, where the Resolution's exclusion applies", "Government Partners within the Resolution's definition"],
  readWith: ["Cabinet Resolution No. 132 of 2023", "Federal Decree-Law No. 10 of 2025"],
  supersedes: "Cabinet Decision No. 58 of 2020",
  supersededBy: null,
  source: "https://uaelegislation.gov.ae/en/legislations/2176"
});

addLawIfMissing({
  number: "Cabinet Decision No. 58 of 2020",
  title: "Former Regulation of Real Beneficiary Procedures",
  jurisdiction: "Federal",
  authority: "UAE Cabinet",
  status: "Superseded",
  summary: "The former federal beneficial-ownership procedures framework. It introduced UBO transparency and register requirements but is no longer the current instrument.",
  relevance: "Use this entry only for historical research into the pre-December-2023 federal UBO framework. Current UBO compliance should be assessed under Cabinet Resolution No. 109 of 2023.",
  topics: "beneficial owner ubo real beneficiary ownership control shareholder nominee historical superseded",
  source: "https://uaelegislation.gov.ae/en/legislations/1433",
  note: "Article 22 of Cabinet Resolution No. 109 of 2023 expressly cancelled Cabinet Resolution No. 58 of 2020. Do not treat this as the current UBO filing framework.",
  appliesTo: ["Historical federal UBO compliance before the replacement framework took effect"],
  notApplyTo: ["Current UBO compliance after Cabinet Resolution No. 109 of 2023 took effect"],
  readWith: ["Cabinet Resolution No. 109 of 2023"],
  supersedes: null,
  supersededBy: "Cabinet Resolution No. 109 of 2023"
});

addLawIfMissing({
  number: "Cabinet Resolution No. 57 of 2020",
  title: "Economic Substance Regulations",
  jurisdiction: "Federal",
  authority: "UAE Cabinet / Ministry of Finance / Federal Tax Authority",
  status: "Amended — historical filing periods only",
  summary: "The UAE Economic Substance Regulations established substance and reporting requirements for Licensees carrying on specified Relevant Activities, including banking, insurance, investment fund management, lease-finance, headquarters, shipping, holding-company, intellectual-property and distribution/service-centre activities. The reporting regime has since been materially narrowed by Cabinet Decision No. 98 of 2024.",
  relevance: "Use this Resolution for ESR obligations relating to financial years ending on or before 31 December 2022, including unresolved filings, information requests, assessments, penalties or other legacy compliance matters. For financial years ending after 31 December 2022, companies are no longer required to submit ESR notifications or Economic Substance Reports under the amended regime.",
  topics: "economic substance esr relevant activity banking insurance fund management lease finance headquarters shipping holding company intellectual property distribution service centre substance notification report legacy corporate tax",
  source: "https://mof.gov.ae/en/public-finance/international-relations/economic-substance-regulations-esr/",
  note: "Cabinet Decision No. 98 of 2024 amended Cabinet Resolution No. 57 of 2020 and cancelled ESR notification/reporting requirements for financial years ending after 31 December 2022. Prior-year obligations were not erased: entities remain responsible for compliance for earlier periods, responding to information or amendment requests and paying penalties imposed by the FTA. Ministerial Decision No. 100 of 2020 remains useful as guidance for historical ESR periods. Corporate Tax now carries the principal ongoing federal substance-related tax framework for current periods.",
  appliesTo: ["Licensees that carried on a Relevant Activity during financial years ending on or before 31 December 2022", "Entities with unresolved pre-2023 ESR filings, information requests, assessments or penalties"],
  notApplyTo: ["ESR notification/report filing for financial years ending after 31 December 2022"],
  readWith: ["Cabinet Decision No. 98 of 2024", "Ministerial Decision No. 100 of 2020", "Federal Decree-Law No. 47 of 2022"],
  supersedes: "Cabinet Resolution No. 31 of 2019",
  supersededBy: null
});

addLawIfMissing({
  number: "Cabinet Decision No. 98 of 2024",
  title: "Amendment to the Economic Substance Requirements",
  jurisdiction: "Federal",
  authority: "UAE Cabinet / Ministry of Finance",
  status: "In force",
  summary: "Amends the UAE Economic Substance Regulations and removes the requirement for companies to submit Economic Substance notifications and reports for financial years ending after 31 December 2022.",
  relevance: "Use this Decision to determine whether an ESR filing is still required for a given period. It is the key current instrument explaining why no ESR notification/report is required for financial years ending after 31 December 2022, while legacy obligations for earlier periods remain enforceable.",
  topics: "economic substance esr cabinet decision 98 2024 reporting cancelled corporate tax historical periods notification report",
  source: "https://mof.gov.ae/en/news/ministry-of-finance-announces-amendment-to-cabinet-decision-on-economic-substance-requirements/",
  note: "The Ministry of Finance announced the amendment on 14 October 2024. The relief applies to financial years ending after 31 December 2022. It does not cancel compliance obligations, information requests, amendments or penalties relating to earlier financial years.",
  appliesTo: ["Entities previously within the ESR framework", "Financial years ending after 31 December 2022 for purposes of the filing-relief rule"],
  notApplyTo: ["Outstanding ESR obligations for financial years ending on or before 31 December 2022"],
  readWith: ["Cabinet Resolution No. 57 of 2020", "Federal Decree-Law No. 47 of 2022"]
});

addLawIfMissing({
  number: "Ministerial Decision No. 100 of 2020",
  title: "ESR Guidance and Relevant Activities Guide",
  jurisdiction: "Federal",
  authority: "UAE Ministry of Finance",
  status: "Historical guidance for pre-2023 ESR periods",
  summary: "Provides official guidance on the Economic Substance Regulations and the Relevant Activities covered by the regime, including sector-specific interpretation of the substance tests and reporting framework.",
  relevance: "Use this guidance when analysing a legacy ESR obligation for a financial year ending on or before 31 December 2022. It helps determine whether an entity carried on a Relevant Activity and how the substance requirements applied for those historical periods.",
  topics: "economic substance esr ministerial decision 100 2020 guidance relevant activities legacy historical substance test",
  source: "https://mof.gov.ae/en/public-finance/international-relations/economic-substance-regulations-esr/",
  note: "This guidance should now be read in light of Cabinet Decision No. 98 of 2024, which removed ESR notification/reporting for financial years ending after 31 December 2022. It remains relevant to legacy periods and unresolved historical compliance matters.",
  appliesTo: ["Legacy ESR analysis for financial years ending on or before 31 December 2022"],
  notApplyTo: ["A new ESR filing requirement for financial years ending after 31 December 2022"],
  readWith: ["Cabinet Resolution No. 57 of 2020", "Cabinet Decision No. 98 of 2024"]
});

addLawIfMissing({
  number: "DIFC Ultimate Beneficial Ownership Regulations 2018",
  title: "DIFC Ultimate Beneficial Ownership Regulations",
  jurisdiction: "DIFC",
  authority: "DIFC Registrar of Companies / DIFC Authority",
  status: "In force — consolidated 8 March 2024",
  summary: "The DIFC's separate beneficial-ownership regime for companies, partnerships, non-profit incorporated organisations, foundations and other covered Registered Persons in the Centre. It requires covered entities to identify and maintain information on their Ultimate Beneficial Owners and to keep the required UBO register.",
  relevance: "Use these Regulations for a DIFC-registered entity rather than Cabinet Resolution No. 109 of 2023. The DIFC framework generally identifies a UBO through ownership, voting, appointment/removal or significant-control tests, with a 25% relevant-percentage threshold used for core ownership/control tests, subject to the Regulations and exemptions.",
  topics: "difc ultimate beneficial owner ubo beneficial ownership register 25% ownership voting control registrar financial free zone",
  source: "https://assets.difc.com/v1/media/edge/images/dubaiintern0078-difcexperie96c5-production-3253/media/project/difcexperiences/difc/difcwebsite/documents/laws--regulations/ultimate_beneficial_owners_regulations_updated_2024.pdf",
  note: "DIFC's legal database lists the Ultimate Beneficial Ownership Regulations 2018; the consolidated version states that it is in force on 8 March 2024. The Regulations contain exemptions, including specified listed, regulated, recognised, government-owned and governmental-function entities. DIFC filings are made through DIFC's own registration/portal processes, not the mainland/non-financial-free-zone registrar route under Cabinet Resolution No. 109 of 2023.",
  appliesTo: ["DIFC companies and partnerships within the Regulations", "DIFC foundations and covered non-profit incorporated organisations", "Other DIFC Registered Persons to whom the Regulations apply"],
  notApplyTo: ["Registered Persons qualifying for an exemption under Regulation 2, to the extent of that exemption", "Mainland and non-financial-free-zone legal persons governed by Cabinet Resolution No. 109 of 2023"],
  readWith: ["Federal Decree-Law No. 10 of 2025"]
});

addLawIfMissing({
  number: "ADGM Beneficial Ownership and Control Regulations 2022",
  title: "Beneficial Ownership and Control Regulations 2022",
  jurisdiction: "ADGM",
  authority: "ADGM Registration Authority",
  status: "In force — consolidated 2024",
  summary: "The ADGM's current beneficial-ownership and control framework. It requires covered ADGM Persons to identify beneficial owners and maintain a record of beneficial owners, with rules tailored to companies, LLPs, partnerships, foundations, trusts and other legal arrangements within ADGM.",
  relevance: "Use these Regulations for an ADGM Person rather than the federal Real Beneficiary Procedures. Beneficial-owner identification and verification is part of ADGM's registration and ongoing compliance process, and ownership/control information must be kept current throughout the entity's lifecycle.",
  topics: "adgm beneficial ownership control ubo register beneficial owner foundation trust company llp registration authority financial free zone",
  source: "https://assets.adgm.com/download/assets/20240725%2BBeneficial%2BOwnership%2Band%2BControl%2BRegulations%2B2022.pdf/c29468365a2d11efb1856e1f83354cf4",
  note: "The Beneficial Ownership and Control Regulations 2022 repealed the 2018 Regulations, with transitional timing specified in section 26A. The consolidated version incorporates later amendments. ADGM is a Financial Free Zone and therefore has its own UBO regime rather than Cabinet Resolution No. 109 of 2023 for the same legal-person registration obligations.",
  appliesTo: ["ADGM Persons within the Regulations, including relevant companies, LLPs, foundations and other covered structures"],
  notApplyTo: ["Persons or ownership chains benefiting from a specific exemption or modified treatment under the Regulations", "Mainland and non-financial-free-zone legal persons governed by Cabinet Resolution No. 109 of 2023"],
  readWith: ["Federal Decree-Law No. 10 of 2025"],
  supersedes: "ADGM Beneficial Ownership and Control Regulations 2018",
  supersededBy: null
});

addLawIfMissing({
  number: "ADGM Beneficial Ownership and Control Regulations 2018",
  title: "Former ADGM Beneficial Ownership and Control Regulations",
  jurisdiction: "ADGM",
  authority: "ADGM Registration Authority",
  status: "Superseded",
  summary: "The former ADGM beneficial-ownership framework, replaced by the Beneficial Ownership and Control Regulations 2022.",
  relevance: "Use only for historical ADGM beneficial-ownership research. Current ADGM UBO compliance should be assessed under the 2022 Regulations as amended.",
  topics: "adgm beneficial ownership control 2018 historical superseded ubo",
  source: "https://www.adgm.com/documents/operating-in-adgm/ongoing-obligation/beneficial-ownership-and-control/beneficial-ownership-and-control-guidance-2021.pdf",
  note: "The 2022 Regulations expressly repeal the 2018 Regulations under their transitional provisions.",
  appliesTo: ["Historical ADGM UBO compliance before transition to the 2022 Regulations"],
  notApplyTo: ["Current ADGM beneficial-ownership compliance"],
  readWith: ["ADGM Beneficial Ownership and Control Regulations 2022"],
  supersedes: null,
  supersededBy: "ADGM Beneficial Ownership and Control Regulations 2022"
});
