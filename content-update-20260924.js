// Mizan legal/regulatory database refresh — reviewed 24 September 2026.
// Verified against the Federal Tax Authority legislation portal and the FTA-hosted Decision text.

const update2409Add=(entry)=>{if(!laws.some(l=>l.number===entry.number))laws.push(entry)};

update2409Add({
  number:"FTA Decision No. 15 of 2026",
  title:"Provisions of Exemption from Corporate Tax",
  jurisdiction:"Federal",
  authority:"Federal Tax Authority",
  status:"In force — effective 15 Sep 2026",
  summary:"Sets the current FTA procedure and timelines for Corporate Tax registration and exemption applications for relevant exempt-person categories under Article 4 of the Corporate Tax Law. In-scope exemption applications are generally due no later than 90 Business Days after the end of the Tax Period in which the exemption conditions were met, subject to specified transitional and retrospective rules.",
  relevance:"Use this Decision when determining the registration/application process, deadline or effective date for a Corporate Tax exemption. It includes fixed transitional deadlines of 31 October 2026 and 31 December 2026 for specified cases, and applies to qualifying applications submitted on or after 15 September 2026 in relation to Tax Periods commencing on or after 1 June 2023.",
  topics:"corporate tax exemption exempt person FTA decision 15 2026 registration application 90 business days qualifying investment fund pension fund social security fund subsidiary public benefit entity deadline retrospective exemption",
  source:"https://tax.gov.ae/Datafolder/Files/Legislation/2026/FTADecisionNo15Of2026onProvisionsonExemptionFromCorporateTax.pdf",
  note:"Effective 15 September 2026. Article 4 expressly repeals FTA Decision No. 7 of 2023 from that date. Article 3 contains special transitional deadlines: 31 December 2026 for specified retrospective applications under Cabinet Decision No. 55 of 2025 and specified 2025-period cases under Cabinet Decision No. 34 of 2025; and 31 October 2026 for the historical-period case described in Article 3(5). Check the Decision text for the exact category and conditions before relying on a deadline.",
  appliesTo:["Persons in the Article 4(1) Corporate Tax Law exemption categories addressed by Articles 2 and 3 of this Decision","Relevant Qualifying Investment Funds, pension/social-security funds and qualifying wholly owned/controlled juridical persons where the statutory and Decision conditions are met"],
  notApplyTo:["Persons whose exemption arises under a category or process not governed by this Decision","Persons that do not satisfy the underlying exemption conditions in the Corporate Tax Law and relevant Cabinet or Ministerial Decisions"],
  readWith:["Federal Decree-Law No. 47 of 2022","Cabinet Decision No. 34 of 2025","Cabinet Decision No. 55 of 2025"],
  supersedes:"FTA Decision No. 7 of 2023"
});

update2409Add({
  number:"FTA Decision No. 7 of 2023",
  title:"Former Provisions of Exemption from Corporate Tax",
  jurisdiction:"Federal",
  authority:"Federal Tax Authority",
  status:"Superseded — repealed from 15 Sep 2026",
  summary:"Former FTA procedural decision governing Corporate Tax exemption applications. It is retained only for historical research and must not be used as the current exemption-application procedure.",
  relevance:"Historical only. For exemption applications and procedural deadlines from 15 September 2026, use FTA Decision No. 15 of 2026.",
  topics:"corporate tax exemption former repealed superseded FTA decision 7 2023 historical",
  source:"https://tax.gov.ae/en/legislation/corporate.tax.aspx",
  note:"Expressly repealed by Article 4 of FTA Decision No. 15 of 2026 with effect from 15 September 2026.",
  appliesTo:["Historical research concerning the former exemption procedure before its repeal"],
  notApplyTo:["Current Corporate Tax exemption applications on or after 15 September 2026"],
  readWith:["FTA Decision No. 15 of 2026"],
  supersededBy:"FTA Decision No. 15 of 2026"
});