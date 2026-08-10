// Content-only enrichment. No search or presentation logic is changed.
const enrichLaw=(number,patch)=>{const item=laws.find(l=>l.number===number);if(item)Object.assign(item,patch)};

enrichLaw("Federal Decree-Law No. 33 of 2021",{
 summary:"The principal UAE law for employment relationships in the general private sector. It covers employment contracts, work patterns, probation, working time and overtime, leave, wages, disciplinary action, termination, notice, non-compete restrictions, end-of-service benefits and labour disputes. It does not automatically govern DIFC or ADGM employment, and domestic workers are subject to a separate statutory regime.",
 relevance:"Use this law when the employee works for a UAE private-sector establishment outside the DIFC and ADGM and is not a domestic worker or otherwise excluded by a special regime. For practical rules on overtime, probation, leave, gratuity, non-compete restrictions, work permits and labour-dispute procedure, read it together with Cabinet Resolution No. 1 of 2022 and current MOHRE decisions.",
 note:"Scope: general UAE private sector as defined by the law. Key distinctions: DIFC employees are governed principally by DIFC Employment Law No. 2 of 2019; ADGM registered entities and employees are governed by ADGM Employment Regulations 2024, effective 1 April 2025; domestic workers are governed by Federal Decree-Law No. 9 of 2022 and Cabinet Resolution No. 106 of 2022. Probation may not exceed 6 months. Employer termination during probation requires at least 14 days' written notice; worker notice rules vary depending on leaving the UAE or moving to another UAE employer. Standard working time is generally 8 hours per day or 48 hours per week, subject to statutory exceptions and implementing rules. Verify the latest consolidated text and MOHRE resolutions before relying on a calculation or deadline."
});

enrichLaw("Cabinet Resolution No. 1 of 2022",{
 summary:"The active Executive Regulation implementing Federal Decree-Law No. 33 of 2021 for the general UAE private sector. It supplies operational rules on work permits and contracts, probation, work models, non-compete clauses, working hours and overtime, part-time leave, wages, workplace safety, disciplinary procedures, end-of-service calculations and labour-dispute procedures.",
 relevance:"Use this regulation when the parent Labour Law states the principle but the practical question is how it operates. It is the main implementing source for questions such as overtime eligibility and calculation, probation-related work-permit changes, part-time annual leave, non-compete conditions, gratuity deductions and individual or collective labour disputes.",
 note:"Effective 2 February 2022 and listed as Active on the official UAE Legislation portal. It applies with Federal Decree-Law No. 33 of 2021 and MOHRE resolutions. It is not the governing employment regulation for DIFC or ADGM employees and does not replace the Domestic Workers Executive Regulations. Common thresholds include a maximum 6-month probation under the parent law and special rules for part-time annual leave; exact overtime premiums, excluded categories, working-hour exceptions and non-compete enforceability depend on the relevant articles and facts. Confirm current MOHRE decisions and any later amendments before relying on a specific entitlement."
});

enrichLaw("Federal Decree-Law No. 9 of 2022",{
 summary:"The separate federal employment regime for domestic workers and related recruitment activity. It regulates eligible domestic-worker occupations, recruitment, contracts, employer and worker duties, rest and leave, wage and accommodation obligations, termination and dispute handling.",
 relevance:"Use this law when the worker is employed in a domestic-service category rather than under the ordinary private-sector Labour Law. Typical examples include domestic helpers, nannies, private drivers and other occupations designated under the domestic-worker framework.",
 note:"This is a separate regime from Federal Decree-Law No. 33 of 2021. Read it with Cabinet Resolution No. 106 of 2022 for implementing procedures and current MOHRE rules. Do not answer a domestic-worker overtime, leave, termination or recruitment question solely from the general private-sector Labour Law."
});

enrichLaw("Cabinet Resolution No. 106 of 2022",{
 summary:"The active Executive Regulations for Federal Decree-Law No. 9 of 2022 on Domestic Workers. They provide operational requirements for recruitment offices, employment contracts, employer and worker obligations, work and rest arrangements, complaints, termination and related procedures.",
 relevance:"Use this regulation for the practical mechanics of domestic-worker employment and recruitment where the parent decree-law is not sufficiently detailed.",
 note:"Effective 30 November 2022 and listed as Active on the official UAE Legislation portal. Applies only within the domestic-worker framework; ordinary private-sector employees remain under Federal Decree-Law No. 33 of 2021 and Cabinet Resolution No. 1 of 2022, while DIFC and ADGM have separate employment regimes."
});

enrichLaw("DIFC Law No. 2 of 2019",{
 summary:"The DIFC's principal employment statute for employment relationships within the Dubai International Financial Centre. It covers minimum employment standards, contracts, leave, termination, discrimination and workplace rights, with DIFC-specific end-of-service arrangements including the DEWS framework where applicable.",
 relevance:"Use this law when the employment relationship falls within DIFC jurisdiction. Do not default to the federal private-sector Labour Law merely because the employee works in Dubai; the DIFC operates a distinct employment-law regime.",
 note:"Current DIFC legal materials list Employment Law No. 2 of 2019 together with amendment laws, including amendments in 2020 and 2021. Use the current consolidated DIFC version and related Employment Regulations/DEWS materials. Federal Labour Law rules on overtime, gratuity, probation or termination should not be transplanted into a DIFC case without checking the DIFC provisions first."
});

enrichLaw("ADGM Employment Regulations",{
 title:"ADGM Employment Regulations 2024",
 summary:"The current employment framework for ADGM registered entities and their employees, covering employment terms, flexible and remote work, employee entitlements, work permits and visas, discrimination, victimisation, termination and other minimum employment standards.",
 relevance:"Use these Regulations when the employer is an ADGM registered entity and the employment relationship falls within ADGM. ADGM is a financial free zone exempt from the UAE Federal Labour Law, so federal private-sector rules should not be assumed to apply.",
 note:"Employment Regulations 2024 became effective on 1 April 2025 and repealed the Employment Regulations 2019. They operate with subordinate rules, including the Employment Regulations (Temporary Work Permit) Rules 2024 and Employment Regulations (Fees) Rules 2024. ADGM expressly states that its registered entities and employees are governed by this framework. Verify current ADGM guidance for work-permit, leave, termination and other entitlement details."
});

enrichLaw("Cabinet Resolution No. 18 of 2022",{
 summary:"Classifies establishments subject to the federal private-sector Labour Law into three categories and links classification to labour-market compliance, including work permits and contracts, Wage Protection System compliance and worker-protection requirements.",
 relevance:"Use this resolution for employer-side compliance questions involving establishment classification, WPS compliance, guarantees or insurance and consequences of serious labour-market violations.",
 note:"Effective 1 June 2022. New establishments are generally placed in the second category unless third-category criteria apply. Article 8 requires a bank guarantee of AED 3,000 per worker or approved insurance, subject to the stated exception for high-risk establishments. The classification framework applies to establishments subject to Federal Decree-Law No. 33 of 2021, not automatically to DIFC or ADGM entities."
});

enrichLaw("Federal Decree-Law No. 8 of 2017",{
 summary:"The federal VAT statute governing taxable supplies, registration, place and date of supply, zero-rating, exemptions, input-tax recovery, tax invoices, imports and related VAT obligations across the UAE, subject to special rules and designated-zone treatment.",
 relevance:"Use this law when determining whether a transaction or person is within UAE VAT, but pair it with the Executive Regulations and current FTA guidance for thresholds, documentary requirements, zero-rating conditions and sector-specific exceptions.",
 note:"The VAT regime has been amended since 2017. Key operational matters such as mandatory and voluntary registration thresholds, tax invoices, input-tax recovery and zero-rating conditions should be checked against the current consolidated law, Cabinet Resolution No. 52 of 2017 as amended and FTA guidance. Free-zone status alone does not automatically remove a transaction from VAT."
});

enrichLaw("Federal Decree-Law No. 28 of 2022",{
 summary:"The common federal tax-procedure framework for VAT, corporate tax, excise tax and other federal taxes administered by the FTA. It governs registration, returns, records, audits, assessments, voluntary disclosures, refunds, reconsideration, objections and tax-dispute procedures.",
 relevance:"Use this law when the issue concerns procedure rather than the underlying tax charge—for example an FTA audit, assessment, penalty, refund, voluntary disclosure, reconsideration request or challenge process.",
 note:"Read with Cabinet Resolution No. 74 of 2023, its current amendments and tax-specific legislation. Procedural deadlines are strict and may differ by remedy; verify the current consolidated text before calculating a filing, reconsideration, objection or appeal deadline."
});

enrichLaw("Federal Decree-Law No. 32 of 2021",{
 summary:"The principal federal company-law framework for commercial companies outside regimes governed by separate free-zone company legislation. It covers incorporation, legal forms, ownership, management, directors and managers, shareholder rights, capital, governance, mergers, transformations, dissolution and liquidation.",
 relevance:"Use this law for onshore UAE company questions and entities within its statutory scope. For an LLC, also check Cabinet Resolution No. 77 of 2022; for penalties, Cabinet Resolution No. 102 of 2022 may apply. DIFC and ADGM companies are governed principally by their own company legislation.",
 note:"Scope and exceptions matter. Free-zone companies may be governed by their own constitutive legislation, although federal provisions can still apply where expressly extended. Always check the entity's licensing jurisdiction, company form, memorandum/articles and later amendments before relying on a federal company-law rule."
});

enrichLaw("Federal Decree-Law No. 45 of 2021",{
 summary:"The UAE federal Personal Data Protection Law governing processing of personal data within its territorial and material scope. It addresses lawful processing, transparency, data-subject rights, controller and processor duties, security, breach-related obligations and cross-border transfers.",
 relevance:"Use this law for organisations and processing activities within the federal PDPL regime. DIFC and ADGM maintain separate data-protection frameworks, so location and legal jurisdiction must be identified before selecting the applicable privacy law.",
 note:"Common exceptions and sector-specific regimes must be checked before applying the PDPL. DIFC Data Protection Law No. 5 of 2020 and ADGM Data Protection Regulations apply within their respective financial free zones. Health, banking and government data may also engage additional rules. Verify current Executive Regulations, Data Office decisions and transfer mechanisms where relevant."
});
