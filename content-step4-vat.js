// Step 4 — VAT core framework. Verified against official UAE sources in August 2026.
// Content-only additions/enrichment; no search or presentation logic changes.

enrichLaw("Federal Decree-Law No. 8 of 2017",{
  summary:"The UAE's principal Value Added Tax statute. It imposes VAT on taxable supplies and relevant imports, sets the standard 5% rate, and governs registration, tax groups, place and date of supply, zero-rating, exemptions, reverse charge, input-tax recovery, tax invoices and adjustments.",
  relevance:"Use this law whenever a UAE business needs to determine whether it must register for VAT or how VAT applies to a supply, import, expense or recovery claim. For UAE-resident businesses, mandatory registration generally applies when taxable supplies and imports exceed AED 375,000 over the previous 12 months or are expected to exceed that threshold in the next 30 days; voluntary registration generally starts above AED 187,500, subject to the statutory conditions. Non-resident registration rules differ.",
  appliesTo:["UAE taxable persons and registrants","UAE-resident businesses meeting VAT registration triggers","Non-resident businesses making taxable UAE supplies where no other person is required to account for the VAT","Persons importing or making supplies within the statutory VAT scope"],
  notApplyTo:["Transactions outside the territorial or material scope of UAE VAT","Persons not required or eligible to register solely because they are below the relevant thresholds, unless another registration rule applies"],
  readWith:["Cabinet Resolution No. 52 of 2017","Federal Decree-Law No. 28 of 2022","Federal Decree-Law No. 16 of 2025"],
  note:"Current consolidated VAT law. Standard rate: 5%. The law has been amended repeatedly, including Federal Decree-Law No. 16 of 2024 for e-invoicing and Federal Decree-Law No. 16 of 2025, effective 1 January 2026. Free-zone status does not by itself remove a supply from VAT; designated-zone and place-of-supply rules must be checked. Re-verify registration, invoicing, zero-rating, exemption and reverse-charge conditions against the current Executive Regulation and FTA guidance."
});

addLawIfMissing({
  number:"Cabinet Resolution No. 52 of 2017",
  title:"Executive Regulations of the UAE VAT Law",
  jurisdiction:"Federal",
  authority:"UAE Cabinet",
  status:"In force — amended",
  summary:"The principal Executive Regulation beneath the UAE VAT Law. It supplies the detailed operational rules for registration, supplies, designated zones, zero-rating and exemptions, input-tax recovery, tax invoices and credit notes, records and sector-specific VAT treatment.",
  relevance:"Use this Resolution after identifying the VAT issue under Federal Decree-Law No. 8 of 2017. It contains many of the conditions that determine whether a transaction is zero-rated or exempt, whether input tax can be recovered, and what documentary and invoicing requirements apply.",
  topics:"vat value added tax executive regulation registration designated zone zero rate zero-rated exempt exemption input tax recovery tax invoice credit note records virtual assets investment fund reverse charge",
  source:"https://uaelegislation.gov.ae/en/legislations/1226",
  note:"The Executive Regulation has been amended multiple times, including Cabinet Decision No. 100 of 2024 and Cabinet Decision No. 100 of 2025. The Ministry of Finance consolidated text records those amendments. Always use the latest consolidated version for transaction-level advice.",
  appliesTo:["Persons and transactions governed by Federal Decree-Law No. 8 of 2017"],
  notApplyTo:["Matters outside the scope of the UAE VAT Law"],
  readWith:["Federal Decree-Law No. 8 of 2017","Federal Decree-Law No. 28 of 2022"],
  supersedes:null,
  supersededBy:null
});

addLawIfMissing({
  number:"Federal Decree-Law No. 16 of 2025",
  title:"2025 Amendment to the UAE VAT Law",
  jurisdiction:"Federal",
  authority:"President of the UAE",
  status:"In force",
  summary:"Amends the UAE VAT Law with effect from 1 January 2026. Among the practical changes, taxable persons applying the reverse-charge mechanism are no longer required to issue self-invoices, while supporting documentation for the relevant supplies must be retained in accordance with the Executive Regulation.",
  relevance:"Use this amendment for VAT compliance questions from 1 January 2026 onward, particularly reverse-charge documentation and any analysis relying on pre-2026 wording of the VAT Law.",
  topics:"vat amendment 2025 2026 reverse charge self invoice supporting documents value added tax",
  source:"https://mof.gov.ae/en/news/ministry-of-finance-to-implement-vat-law-amendments-starting-january-2026/",
  note:"Effective 1 January 2026. This is an amending instrument, so use the current consolidated Federal Decree-Law No. 8 of 2017 for the operative VAT text rather than reading the amendment in isolation.",
  appliesTo:["Taxable persons affected by the amended VAT provisions from 1 January 2026"],
  readWith:["Federal Decree-Law No. 8 of 2017","Cabinet Resolution No. 52 of 2017"],
  supersedes:null,
  supersededBy:null
});

addLawIfMissing({
  number:"Cabinet Resolution No. 153 of 2025",
  title:"VAT Reverse Charge for Scrap-Metal Trading",
  jurisdiction:"Federal",
  authority:"UAE Cabinet",
  status:"In force",
  summary:"Applies the VAT reverse-charge mechanism to qualifying supplies of scrap metal between UAE VAT registrants. Where the statutory conditions are met, the registered recipient rather than the supplier accounts for VAT.",
  relevance:"Use this Resolution for B2B scrap-metal transactions from its 2026 effective date. It matters where the recipient is VAT-registered and intends to resell the scrap metal or use it in processing, subject to the Resolution's conditions and evidence requirements.",
  topics:"vat scrap metal reverse charge ferrous non-ferrous recycling processing registrant 153 2025",
  source:"https://uaelegislation.gov.ae/en/legislations/3860",
  note:"The official UAE Legislation portal lists this Resolution as active, with effect in January 2026. Do not generalise this treatment to other goods: separate reverse-charge decisions exist for particular sectors, including precious metals and stones.",
  appliesTo:["Qualifying supplies of scrap metal between UAE VAT registrants where the recipient intends resale or processing"],
  notApplyTo:["Transactions that do not satisfy the Resolution's conditions","Non-scrap goods merely because both parties are VAT-registered"],
  readWith:["Federal Decree-Law No. 8 of 2017","Cabinet Resolution No. 52 of 2017"],
  supersedes:null,
  supersededBy:null
});

enrichLaw("Federal Decree-Law No. 28 of 2022",{
  relevance:"Use this law when the question concerns the administration or enforcement of VAT, Corporate Tax, Excise Tax or another federal tax rather than the tax charge itself—for example registration procedure, records, FTA audit, assessment, voluntary disclosure, credit-balance refund, reconsideration, objection or appeal. Federal Decree-Law No. 17 of 2025 amended the framework with effect from 1 January 2026, including a five-year framework for requesting or using qualifying tax credit balances.",
  readWith:["Cabinet Resolution No. 74 of 2023","Federal Decree-Law No. 8 of 2017","Federal Decree-Law No. 47 of 2022"],
  note:"Current Tax Procedures framework, as amended. Federal Decree-Law No. 17 of 2025 took effect on 1 January 2026. The Executive Regulation under Cabinet Resolution No. 74 of 2023 was also amended with effect from 1 April 2026, including changes concerning voluntary disclosures, refunds, government disclosure and record retention. Procedural deadlines are strict; verify the current consolidated text before calculating any filing, refund, reconsideration, objection or appeal deadline."
});

addLawIfMissing({
  number:"Cabinet Resolution No. 74 of 2023",
  title:"Executive Regulations of the Tax Procedures Law",
  jurisdiction:"Federal",
  authority:"UAE Cabinet",
  status:"In force — amended",
  summary:"The Executive Regulation for the federal Tax Procedures Law, covering records, tax agents, payments, refunds and other administrative procedures used across federal taxes administered by the FTA.",
  relevance:"Use this Resolution with the Tax Procedures Law for the operational mechanics of federal tax compliance. Amendments effective 1 April 2026 clarified voluntary disclosures and credit-balance refunds and updated record-retention and disclosure procedures.",
  topics:"tax procedures executive regulation FTA records refund voluntary disclosure tax agent payment audit VAT corporate tax excise",
  source:"https://uaelegislation.gov.ae/en/legislations/2160",
  note:"Originally effective 1 August 2023, with specified provisions effective later. It replaced Cabinet Resolution No. 36 of 2017. The 2026 amendments should be checked for any live procedural question.",
  appliesTo:["Taxpayers, registrants, tax agents and other persons within the federal Tax Procedures framework"],
  readWith:["Federal Decree-Law No. 28 of 2022"],
  supersedes:null,
  supersededBy:null
});
