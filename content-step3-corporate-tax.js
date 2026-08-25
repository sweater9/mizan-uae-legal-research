// Step 3 — Corporate Tax. Content-only enrichment; no search or presentation logic changes.
const step3Enrich=(number,patch)=>{const item=laws.find(l=>l.number===number);if(item)Object.assign(item,patch)};
const step3Add=(entry)=>{if(!laws.some(l=>l.number===entry.number))laws.push(entry)};

step3Enrich("Federal Decree-Law No. 47 of 2022",{
 title:"Taxation of Corporations and Businesses (Corporate Tax Law)",
 status:"In force — amended",
 summary:"The principal UAE Corporate Tax statute. It determines taxable persons and taxable income, exemptions, rates, free-zone treatment, tax groups, transfer pricing, losses, reliefs and administration. The law applies to tax periods beginning on or after 1 June 2023 and has been amended, including to provide for the UAE Domestic Minimum Top-up Tax framework for large multinational groups.",
 relevance:"Start here for any UAE Corporate Tax question. A standard taxable person is generally taxed at 0% on taxable income up to AED 375,000 and 9% above that threshold. Different rules apply to Qualifying Free Zone Persons and large multinational groups within the Top-up Tax framework. Registration, return and payment deadlines depend on the taxpayer and tax period and should be checked against current FTA decisions and guidance.",
 topics:"corporate tax corporation business taxable income taxable person 9% 0% 375000 free zone qfzp tax group transfer pricing small business relief exemption top-up tax dmtt pillar two",
 source:"https://mof.gov.ae/wp-content/uploads/2025/05/Federal-Decree-Law-No.-47-of-2022-and-its-amendments.pdf",
 note:"Use the consolidated law as amended, not the original 2022 text in isolation. For ordinary rates read with Cabinet Decision No. 116 of 2022. For small-business relief read with Ministerial Decision No. 73 of 2023 as amended by Ministerial Decision No. 131 of 2026. For free-zone treatment read with Cabinet Decision No. 100 of 2023 and Ministerial Decision No. 229 of 2025. ESR reporting was cancelled for financial years ending after 31 December 2022 under Cabinet Decision No. 98 of 2024; Corporate Tax compliance is a separate regime.",
 appliesTo:["UAE resident juridical persons within the statutory scope","Non-resident persons with a UAE permanent establishment, nexus or UAE-sourced income where the law applies","Natural persons conducting UAE business or business activities where the applicable statutory threshold is met","Free Zone Persons, subject to the special Qualifying Free Zone Person rules where conditions are satisfied"],
 notApplyTo:["Persons and income expressly exempted or excluded by the Corporate Tax Law and applicable decisions, to the extent of the exemption or exclusion"],
 readWith:["Cabinet Decision No. 116 of 2022","Ministerial Decision No. 73 of 2023","Ministerial Decision No. 131 of 2026","Cabinet Resolution No. 100 of 2023","Ministerial Decision No. 229 of 2025","Ministerial Decision No. 97 of 2023","Cabinet Decision No. 98 of 2024"]
});

step3Add({
 number:"Cabinet Decision No. 116 of 2022",
 title:"Determination of Annual Taxable Income Subject to Corporate Tax",
 jurisdiction:"Federal",
 authority:"UAE Cabinet / Ministry of Finance",
 status:"In force",
 summary:"Sets the ordinary Corporate Tax taxable-income threshold. For a Taxable Person subject to the standard rates, 0% applies to the portion of taxable income not exceeding AED 375,000 and 9% applies to taxable income above AED 375,000.",
 relevance:"Use this Decision when calculating the standard UAE Corporate Tax rate. The AED 375,000 figure is a taxable-income threshold, not a revenue or turnover threshold. Do not confuse it with the AED 3 million revenue threshold used for Small Business Relief or the AED 1 million gross-revenue threshold relevant to natural persons carrying on business under Cabinet Resolution No. 49 of 2023.",
 topics:"corporate tax rate 9% 0% taxable income threshold 375000 AED business profit",
 source:"https://mof.gov.ae/wp-content/uploads/2023/04/Cabinet-Decision-No-116-of-2022-on-the-annual-Taxable-Income-subject-to-Corporate-Tax.pdf",
 note:"Read with Federal Decree-Law No. 47 of 2022 as amended. Special regimes, including Qualifying Free Zone Persons and the Domestic Minimum Top-up Tax for in-scope multinational groups, should not be analysed solely using this threshold.",
 appliesTo:["Taxable Persons subject to the ordinary Corporate Tax rates under Article 3(1) of the Corporate Tax Law"],
 notApplyTo:["Qualifying Free Zone Persons to the extent the special Article 3(2) rates apply","Cases governed by the Top-up Tax regime"],
 readWith:["Federal Decree-Law No. 47 of 2022"]
});

step3Add({
 number:"Ministerial Decision No. 73 of 2023",
 title:"Small Business Relief",
 jurisdiction:"Federal",
 authority:"Ministry of Finance",
 status:"In force — amended by Ministerial Decision No. 131 of 2026",
 summary:"Creates the Corporate Tax Small Business Relief election for eligible Resident Persons whose revenue does not exceed AED 3 million in the relevant and previous tax periods, subject to the Decision's conditions and exclusions.",
 relevance:"Use this relief for an eligible resident small business with revenue at or below AED 3 million. The original end-date of 31 December 2026 is stale: Ministerial Decision No. 131 of 2026 extended the relief so the AED 3 million threshold continues for relevant tax periods ending on or before 31 December 2029.",
 topics:"corporate tax small business relief sbr 3 million revenue threshold SME startup resident person 2029",
 source:"https://mof.gov.ae/wp-content/uploads/2023/04/Ministerial-Decision-No.-73-of-2023-on-Small-Business-Relief-for-the-Purposes-of-Federal-Decree-Law-No.-47-of-2022.pdf",
 note:"Small Business Relief is an election and is not the same as the AED 375,000 taxable-income rate threshold. It is not available to Qualifying Free Zone Persons or members of MNE Groups within the exclusion stated in the Decision. Always read this entry with the 2026 amendment before relying on the relief period.",
 appliesTo:["Eligible Resident Persons whose revenue satisfies the AED 3 million threshold and the other conditions"],
 notApplyTo:["Qualifying Free Zone Persons","Excluded multinational-enterprise group members specified by the Decision","A Taxable Person once the relevant revenue conditions are not satisfied"],
 readWith:["Federal Decree-Law No. 47 of 2022","Ministerial Decision No. 131 of 2026"],
 supersededBy:null
});

step3Add({
 number:"Ministerial Decision No. 131 of 2026",
 title:"Extension of Small Business Relief",
 jurisdiction:"Federal",
 authority:"Ministry of Finance",
 status:"In force",
 summary:"Amends Ministerial Decision No. 73 of 2023 to extend the period during which eligible Taxable Persons may claim Small Business Relief. The AED 3 million revenue threshold continues to apply to qualifying tax periods commencing on or after 1 June 2023 and ending on or before 31 December 2029.",
 relevance:"Use this amendment whenever a Small Business Relief question concerns a tax period after 2026. It prevents the obsolete 31 December 2026 sunset date in the original Decision from being treated as current law.",
 topics:"corporate tax small business relief extension 2029 ministerial decision 131 2026 3 million SME startup",
 source:"https://mof.gov.ae/en/financial-legislation/",
 note:"Announced by the Ministry of Finance on 7 August 2026. This Decision amends rather than replaces Ministerial Decision No. 73 of 2023, so both must be read together.",
 appliesTo:["Taxable Persons eligible to elect for Small Business Relief under Ministerial Decision No. 73 of 2023"],
 notApplyTo:["Persons excluded from Small Business Relief under Ministerial Decision No. 73 of 2023"],
 readWith:["Ministerial Decision No. 73 of 2023","Federal Decree-Law No. 47 of 2022"]
});

step3Enrich("Cabinet Resolution No. 100 of 2023",{
 status:"In force",
 summary:"Defines Qualifying Income for a Qualifying Free Zone Person and the circumstances in which the 0% free-zone Corporate Tax rate can apply. It covers qualifying transactions and activities, qualifying intellectual-property income, permanent establishments, immovable property and the de minimis framework.",
 relevance:"Use this Decision when a UAE free-zone company asks whether its income can benefit from the 0% Qualifying Free Zone Person rate. Free-zone incorporation alone does not create a 0% entitlement. The entity must satisfy the Corporate Tax Law's Qualifying Free Zone Person conditions, adequate-substance and transfer-pricing requirements and the current qualifying/excluded-activity rules.",
 note:"Cabinet Decision No. 100 of 2023 replaced Cabinet Decision No. 55 of 2023. For qualifying and excluded activities, do not rely on Ministerial Decision No. 265 of 2023: it was repealed and replaced by Ministerial Decision No. 229 of 2025. The de minimis test generally compares non-qualifying revenue with the lower of 5% of total revenue or AED 5 million, subject to the Decision's exclusions and calculation rules.",
 readWith:["Federal Decree-Law No. 47 of 2022","Ministerial Decision No. 229 of 2025","Ministerial Decision No. 97 of 2023"],
 supersedes:"Cabinet Decision No. 55 of 2023"
});

step3Add({
 number:"Ministerial Decision No. 229 of 2025",
 title:"Qualifying Activities and Excluded Activities for Free Zone Corporate Tax",
 jurisdiction:"Federal",
 authority:"Ministry of Finance",
 status:"In force",
 summary:"Sets the current Qualifying Activities and Excluded Activities used in the Qualifying Free Zone Person regime. It includes manufacturing, processing, qualifying-commodity trading, investment holdings, shipping, reinsurance, regulated fund and wealth management, headquarters services, treasury and financing, aircraft financing and leasing, designated-zone distribution, logistics and ancillary activities, subject to the detailed conditions.",
 relevance:"Use this Decision with Cabinet Decision No. 100 of 2023 when testing whether a free-zone business activity can generate Qualifying Income. This is the current activity list; Ministerial Decision No. 265 of 2023 is obsolete.",
 topics:"corporate tax free zone qfzp qualifying activity excluded activity designated zone distribution commodity trading manufacturing logistics treasury fund management wealth management 229 2025",
 source:"https://mof.gov.ae/wp-content/uploads/2025/09/EN-Ministerial-Decision-No.-229-of-2025-Regarding-Qualifying-Activities-and-Excluded-Activities.pdf",
 note:"Ministerial Decision No. 229 of 2025 repealed and replaced Ministerial Decision No. 265 of 2023. Ministerial Decision No. 336 of 2025 subsequently added VARA to the definition of competent authority for specified regulated fund-management and wealth/investment-management activities.",
 appliesTo:["Free Zone Persons assessing the Qualifying Free Zone Person regime","Qualifying Free Zone Persons determining qualifying and excluded activities"],
 notApplyTo:["Ordinary mainland taxpayers that are not applying the Qualifying Free Zone Person regime"],
 readWith:["Federal Decree-Law No. 47 of 2022","Cabinet Resolution No. 100 of 2023"],
 supersedes:"Ministerial Decision No. 265 of 2023"
});

step3Add({
 number:"Ministerial Decision No. 97 of 2023",
 title:"Transfer Pricing Documentation Requirements",
 jurisdiction:"Federal",
 authority:"Ministry of Finance",
 status:"In force",
 summary:"Sets the conditions for maintaining a Corporate Tax master file and local file and specifies which related-party and connected-person transactions must be included or may be excluded from the local file.",
 relevance:"Use this Decision when a Corporate Tax taxpayer has transactions or arrangements with Related Parties or Connected Persons and needs to determine whether formal transfer-pricing documentation is required and which transactions belong in the local file. The arm's-length principle in the Corporate Tax Law can apply even where the master-file/local-file thresholds are not met.",
 topics:"corporate tax transfer pricing related party connected person arm length master file local file documentation 97 2023",
 source:"https://www.mof.gov.ae/wp-content/uploads/2023/05/Ministerial-Decision-No.-97-of-2023-for-the-Purposes-of-Federal-Decree-Law-No.-47-of-2022.pdf",
 note:"Do not equate the absence of a master-file or local-file obligation with an exemption from transfer pricing. The underlying arm's-length requirements and disclosure obligations under the Corporate Tax Law and FTA procedures should be checked separately.",
 appliesTo:["Taxable Persons with Related Party or Connected Person transactions where the Decision's documentation conditions are met"],
 notApplyTo:["Transactions expressly excluded from the local file under the Decision, without removing any separate arm's-length obligation that may apply"],
 readWith:["Federal Decree-Law No. 47 of 2022"]
});
