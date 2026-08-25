// Content-only enrichment. No search or presentation logic is changed.
const enrichLaw=(number,patch)=>{const item=laws.find(l=>l.number===number);if(item)Object.assign(item,patch)};
const addLawIfMissing=(entry)=>{if(!laws.some(l=>l.number===entry.number))laws.push(entry)};

enrichLaw("Federal Decree-Law No. 33 of 2021",{
 summary:"The principal UAE law for employment relationships in the general private sector. It covers employment contracts, work patterns, probation, working time and overtime, leave, wages, disciplinary action, termination, notice, non-compete restrictions, end-of-service benefits and labour disputes. It does not automatically govern DIFC or ADGM employment, and domestic workers are subject to a separate statutory regime.",
 relevance:"Use this law when the employee works for a UAE private-sector establishment outside the DIFC and ADGM and is not a domestic worker or otherwise excluded by a special regime. For practical rules on overtime, probation, leave, gratuity, non-compete restrictions, work permits and labour-dispute procedure, read it together with Cabinet Resolution No. 1 of 2022 and current MOHRE decisions.",
 note:"Scope: general UAE private sector as defined by the law. Key distinctions: DIFC employees are governed principally by DIFC Employment Law No. 2 of 2019; ADGM registered entities and employees are governed by ADGM Employment Regulations 2024, effective 1 April 2025; domestic workers are governed by Federal Decree-Law No. 9 of 2022 and Cabinet Resolution No. 106 of 2022. Probation may not exceed 6 months. Employer termination during probation requires at least 14 days' written notice; worker notice rules vary depending on leaving the UAE or moving to another UAE employer. Standard working time is generally 8 hours per day or 48 hours per week, subject to statutory exceptions and implementing rules. Verify the latest consolidated text and MOHRE resolutions before relying on a calculation or deadline.",
 appliesTo:["Private-sector employers","Private-sector employees outside DIFC and ADGM who are within the federal labour-law scope"],
 notApplyTo:["DIFC employees","ADGM employees","Domestic workers","Other categories expressly excluded by the law"],
 readWith:["Cabinet Resolution No. 1 of 2022"],
 supersedes:null,
 supersededBy:null
});

enrichLaw("Cabinet Resolution No. 1 of 2022",{
 summary:"The active Executive Regulation implementing Federal Decree-Law No. 33 of 2021 for the general UAE private sector. It supplies operational rules on work permits and contracts, probation, work models, non-compete clauses, working hours and overtime, part-time leave, wages, workplace safety, disciplinary procedures, end-of-service calculations and labour-dispute procedures.",
 relevance:"Use this regulation when the parent Labour Law states the principle but the practical question is how it operates. It is the main implementing source for questions such as overtime eligibility and calculation, probation-related work-permit changes, part-time annual leave, non-compete conditions, gratuity deductions and individual or collective labour disputes.",
 note:"Effective 2 February 2022 and listed as Active on the official UAE Legislation portal. It applies with Federal Decree-Law No. 33 of 2021 and MOHRE resolutions. It is not the governing employment regulation for DIFC or ADGM employees and does not replace the Domestic Workers Executive Regulations. Common thresholds include a maximum 6-month probation under the parent law and special rules for part-time annual leave; exact overtime premiums, excluded categories, working-hour exceptions and non-compete enforceability depend on the relevant articles and facts. Confirm current MOHRE decisions and any later amendments before relying on a specific entitlement.",
 appliesTo:["Employers and employees governed by Federal Decree-Law No. 33 of 2021"],
 notApplyTo:["DIFC employment relationships","ADGM employment relationships","Domestic workers governed by the separate domestic-worker regime"],
 readWith:["Federal Decree-Law No. 33 of 2021"]
});

enrichLaw("Federal Decree-Law No. 9 of 2022",{
 summary:"The separate federal employment regime for domestic workers and related recruitment activity. It regulates eligible domestic-worker occupations, recruitment, contracts, employer and worker duties, rest and leave, wage and accommodation obligations, termination and dispute handling.",
 relevance:"Use this law when the worker is employed in a domestic-service category rather than under the ordinary private-sector Labour Law. Typical examples include domestic helpers, nannies, private drivers and other occupations designated under the domestic-worker framework.",
 note:"This is a separate regime from Federal Decree-Law No. 33 of 2021. Read it with Cabinet Resolution No. 106 of 2022 for implementing procedures and current MOHRE rules. Do not answer a domestic-worker overtime, leave, termination or recruitment question solely from the general private-sector Labour Law.",
 appliesTo:["Domestic workers within the statutory occupational categories","Employers of domestic workers","Domestic-worker recruitment offices within scope"],
 notApplyTo:["Ordinary private-sector employees governed by Federal Decree-Law No. 33 of 2021"],
 readWith:["Cabinet Resolution No. 106 of 2022"]
});

enrichLaw("Cabinet Resolution No. 106 of 2022",{
 summary:"The active Executive Regulations for Federal Decree-Law No. 9 of 2022 on Domestic Workers. They provide operational requirements for recruitment offices, employment contracts, employer and worker obligations, work and rest arrangements, complaints, termination and related procedures.",
 relevance:"Use this regulation for the practical mechanics of domestic-worker employment and recruitment where the parent decree-law is not sufficiently detailed.",
 note:"Effective 30 November 2022 and listed as Active on the official UAE Legislation portal. Applies only within the domestic-worker framework; ordinary private-sector employees remain under Federal Decree-Law No. 33 of 2021 and Cabinet Resolution No. 1 of 2022, while DIFC and ADGM have separate employment regimes.",
 appliesTo:["Domestic workers, employers and recruitment offices governed by the federal domestic-worker framework"],
 notApplyTo:["Ordinary private-sector employees governed by the general Labour Law","DIFC employment relationships","ADGM employment relationships"],
 readWith:["Federal Decree-Law No. 9 of 2022"]
});

enrichLaw("DIFC Law No. 2 of 2019",{
 summary:"The DIFC's principal employment statute for employment relationships within the Dubai International Financial Centre. It covers minimum employment standards, contracts, leave, termination, discrimination and workplace rights, with DIFC-specific end-of-service arrangements including the DEWS framework where applicable.",
 relevance:"Use this law when the employment relationship falls within DIFC jurisdiction. Do not default to the federal private-sector Labour Law merely because the employee works in Dubai; the DIFC operates a distinct employment-law regime.",
 note:"Current DIFC legal materials list Employment Law No. 2 of 2019 together with amendment laws, including amendments in 2020 and 2021. Use the current consolidated DIFC version and related Employment Regulations/DEWS materials. Federal Labour Law rules on overtime, gratuity, probation or termination should not be transplanted into a DIFC case without checking the DIFC provisions first.",
 appliesTo:["Employment relationships governed by the DIFC Employment Law"],
 notApplyTo:["Mainland/private-sector employment governed by Federal Decree-Law No. 33 of 2021","ADGM employment relationships","Domestic workers under the federal domestic-worker regime"]
});

enrichLaw("ADGM Employment Regulations",{
 title:"ADGM Employment Regulations 2024",
 summary:"The current employment framework for ADGM registered entities and their employees, covering employment terms, flexible and remote work, employee entitlements, work permits and visas, discrimination, victimisation, termination and other minimum employment standards.",
 relevance:"Use these Regulations when the employer is an ADGM registered entity and the employment relationship falls within ADGM. ADGM is a financial free zone exempt from the UAE Federal Labour Law, so federal private-sector rules should not be assumed to apply.",
 note:"Employment Regulations 2024 became effective on 1 April 2025 and repealed the Employment Regulations 2019. They operate with subordinate rules, including the Employment Regulations (Temporary Work Permit) Rules 2024 and Employment Regulations (Fees) Rules 2024. ADGM expressly states that its registered entities and employees are governed by this framework. Verify current ADGM guidance for work-permit, leave, termination and other entitlement details.",
 appliesTo:["ADGM registered entities and employees within the Regulations' scope"],
 notApplyTo:["Mainland/private-sector employment governed by Federal Decree-Law No. 33 of 2021","DIFC employment relationships"]
});

enrichLaw("Cabinet Resolution No. 18 of 2022",{
 summary:"Classifies establishments subject to the federal private-sector Labour Law into three categories and links classification to labour-market compliance, including work permits and contracts, Wage Protection System compliance and worker-protection requirements.",
 relevance:"Use this resolution for employer-side compliance questions involving establishment classification, WPS compliance, guarantees or insurance and consequences of serious labour-market violations.",
 note:"Effective 1 June 2022. New establishments are generally placed in the second category unless third-category criteria apply. Article 8 requires a bank guarantee of AED 3,000 per worker or approved insurance, subject to the stated exception for high-risk establishments. The classification framework applies to establishments subject to Federal Decree-Law No. 33 of 2021, not automatically to DIFC or ADGM entities.",
 readWith:["Federal Decree-Law No. 33 of 2021","Cabinet Resolution No. 1 of 2022"]
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

enrichLaw("Cabinet Resolution No. 109 of 2023",{
 appliesTo:["Covered UAE legal persons within the beneficial-owner procedures framework"],
 notApplyTo:["Entities excluded by the Resolution, including relevant Financial Free Zone entities and qualifying government-owned entities"],
 supersedes:"Cabinet Decision No. 58 of 2020"
});

// AML/CFT Step 1 — verified against current official/regulator sources in August 2026.
// The 2018 federal law and 2019 executive decision are retained as historical entries only;
// both were superseded by the 2025 framework and are not presented as current law.
enrichLaw("Federal Decree-Law No. 10 of 2025",{
 appliesTo:["Financial institutions","Designated non-financial businesses and professions (DNFBPs)","Virtual asset service providers (VASPs)","Non-profit organisations and other persons where the federal framework imposes obligations"],
 notApplyTo:["Persons outside the statutory activity/scope triggers, subject to generally applicable criminal prohibitions"],
 readWith:["Cabinet Resolution No. 134 of 2025"],
 supersedes:"Federal Decree-Law No. 20 of 2018",
 supersededBy:null,
 note:"Current federal AML/CFT/CPF framework. CBUAE records Federal Decree-Law No. 10 of 2025 as in force from 14 October 2025; it superseded Federal Decree-Law No. 20 of 2018. Read with Cabinet Resolution No. 134 of 2025 and the rules/guidance of the competent supervisory authority. UAE FATF context: FATF removed the UAE from increased monitoring in February 2024; that status is contextual and does not reduce statutory AML/CFT obligations. Re-verify this entry monthly because AML/CFT and sanctions rules change frequently."
});

addLawIfMissing({
 number:"Cabinet Resolution No. 134 of 2025",
 title:"Executive Regulations of the Federal AML/CFT/CPF Law",
 jurisdiction:"Federal",
 authority:"UAE Cabinet",
 status:"In force",
 summary:"The current Executive Regulations under Federal Decree-Law No. 10 of 2025. They set the operational AML/CFT/CPF framework for financial institutions, DNFBPs, VASPs and relevant non-profit organisations, including risk assessment, customer due diligence, beneficial-owner identification, PEP controls, suspicious transaction reporting, internal controls and record keeping.",
 relevance:"Use this Resolution for the practical compliance rules beneath the 2025 federal AML law. It defines the covered financial and DNFBP activities, includes thresholds for specified DNFBP activity, and requires covered firms to apply risk-based controls, CDD, ongoing monitoring and suspicious transaction reporting. Records covered by the retention rule must generally be kept for at least five years, calculated from the latest applicable trigger specified in the Resolution.",
 topics:"aml cft cpf money laundering terrorist financing proliferation financing cdd customer due diligence kyc beneficial owner pep suspicious transaction str sar fiu goaml financial institution dnfbp vasp record keeping risk assessment",
 source:"https://rulebook.centralbank.ae/en/rulebook/cabinet-resolution-no-134-2025-regarding-executive-regulations-federal-decree-law-no-10",
 note:"Effective 14 December 2025 and in force. Article 3 includes, among others, real-estate brokers/agents for purchase or sale transactions; dealers in valuable metals and precious stones for cash transactions of AED 55,000 or more; specified legal/accounting activities; company and trust service providers; and commercial gaming operators at the stated AED 11,000 threshold. Article 70 repeals Cabinet Resolution No. 10 of 2019. Re-verify monthly.",
 appliesTo:["Financial institutions","DNFBPs within the activities and thresholds in Article 3","Virtual asset service providers","Relevant non-profit organisations"],
 notApplyTo:["Businesses that do not meet a covered activity or statutory trigger, except where another AML/CFT obligation applies"],
 readWith:["Federal Decree-Law No. 10 of 2025"],
 supersedes:"Cabinet Decision No. 10 of 2019",
 supersededBy:null
});

addLawIfMissing({
 number:"Federal Decree-Law No. 20 of 2018",
 title:"Former Federal AML/CFT Law",
 jurisdiction:"Federal",
 authority:"UAE Federal Government",
 status:"Superseded",
 summary:"The former federal anti-money-laundering and counter-terrorist-financing statute. It was amended by Federal Decree-Law No. 26 of 2021 and Federal Decree-Law No. 7 of 2024 before being superseded by Federal Decree-Law No. 10 of 2025.",
 relevance:"Use this entry for historical research, investigations or compliance periods governed by the former framework. For current obligations, use Federal Decree-Law No. 10 of 2025 instead.",
 topics:"aml cft money laundering terrorist financing historical repealed superseded 2018 2021 2024",
 source:"https://rulebook.centralbank.ae/en/rulebook/decree-federal-law-no-20-2018-anti-money-laundering-and-combating-financing-terrorism-and",
 note:"CBUAE marks this law Repealed. It was effective from 23 October 2018, amended by Federal Decree-Law No. 26 of 2021 and Federal Decree-Law No. 7 of 2024, and superseded by Federal Decree-Law No. 10 of 2025. Do not use it as the anchor for current AML/CFT compliance.",
 appliesTo:["Historical periods and matters governed by the former federal AML/CFT framework"],
 notApplyTo:["Current compliance periods governed by Federal Decree-Law No. 10 of 2025"],
 readWith:["Cabinet Decision No. 10 of 2019"],
 supersedes:null,
 supersededBy:"Federal Decree-Law No. 10 of 2025"
});

addLawIfMissing({
 number:"Cabinet Decision No. 10 of 2019",
 title:"Former Executive Regulations of the Federal AML/CFT Law",
 jurisdiction:"Federal",
 authority:"UAE Cabinet",
 status:"Superseded",
 summary:"The former Executive Regulations under Federal Decree-Law No. 20 of 2018. They contained the previous operational CDD, reporting, record-keeping and AML/CFT requirements and were amended by Cabinet Resolution No. 24 of 2022.",
 relevance:"Use this entry only for historical compliance periods. Current operational AML/CFT/CPF requirements are governed by Cabinet Resolution No. 134 of 2025.",
 topics:"aml cft executive regulation cdd suspicious transaction record keeping historical repealed superseded 2019 2022",
 source:"https://rulebook.centralbank.ae/en/rulebook/cabinet-decision-no-10-2019-concerning-implementing-regulation-decree-law-no-20-2018-anti",
 note:"CBUAE marks this Decision Repealed. Cabinet Resolution No. 134 of 2025 expressly repealed it and replaced the former executive framework from 14 December 2025.",
 appliesTo:["Historical periods and matters governed by the former federal AML/CFT executive regulations"],
 notApplyTo:["Current compliance periods governed by Cabinet Resolution No. 134 of 2025"],
 readWith:["Federal Decree-Law No. 20 of 2018"],
 supersedes:null,
 supersededBy:"Cabinet Resolution No. 134 of 2025"
});

addLawIfMissing({
 number:"CBUAE AML/CFT Rulebook and Guidance",
 title:"AML/CFT Requirements and Guidance for Licensed Financial Institutions",
 jurisdiction:"Federal",
 authority:"Central Bank of the UAE (CBUAE)",
 status:"In force",
 summary:"CBUAE's AML/CFT rulebook area brings together the current federal AML/CFT laws, CBUAE procedures and guidance applicable to licensed financial institutions. It covers the risk-based approach, customer and transaction risk, CDD, suspicious activity reporting, sanctions and targeted-financial-sanctions controls, and sector-specific financial-crime guidance.",
 relevance:"Use this source when a bank, finance company, exchange house, insurer or other CBUAE-licensed financial institution needs to translate the federal AML/CFT framework into regulator-specific systems and controls. CBUAE materials should be read together with Federal Decree-Law No. 10 of 2025 and Cabinet Resolution No. 134 of 2025.",
 topics:"cbuae aml cft licensed financial institution bank exchange house insurer risk based approach sanctions screening goaml str sar cdd kyc guidance",
 source:"https://rulebook.centralbank.ae/en/rulebook/amlcft",
 note:"CBUAE's live Rulebook is the preferred current source because individual guidance documents and notices are updated over time. Suspicious reports are made to the UAE FIU through the prescribed reporting framework, including goAML where applicable. Verify the current CBUAE notice/guidance relevant to the institution and activity before relying on a specific control requirement.",
 appliesTo:["CBUAE licensed financial institutions within the scope of the relevant rule, notice or guidance"],
 notApplyTo:["Firms regulated solely by DFSA or FSRA for financial-services activity, which have separate regulator rulebooks in addition to applicable federal law"],
 readWith:["Federal Decree-Law No. 10 of 2025","Cabinet Resolution No. 134 of 2025"]
});

addLawIfMissing({
 number:"DFSA AML Module [VER30/04-26]",
 title:"Anti-Money Laundering, Counter-Terrorist Financing and Sanctions Module",
 jurisdiction:"DIFC",
 authority:"Dubai Financial Services Authority (DFSA)",
 status:"In force",
 summary:"The DFSA's current AML Module sets the AML, counter-terrorist-financing and sanctions systems and controls for Relevant Persons in the DIFC regulatory framework. It covers business and customer risk assessment, CDD, enhanced and simplified due diligence, ongoing monitoring, correspondent banking, transfers, sanctions, MLRO requirements, suspicious activity reporting, training, record keeping and DNFBP supervision.",
 relevance:"Use this Module for DFSA-regulated firms and registered DNFBPs in the DIFC. It is not a substitute for the applicable UAE federal AML/CFT framework; DIFC firms must identify both the DFSA requirements and the federal obligations that apply to them.",
 topics:"dfsa difc aml cft sanctions relevant person authorised firm authorized firm registered dnfbp cdd mlro suspicious activity sar str risk assessment record keeping crypto transfer",
 source:"https://dfsaen.thomsonreuters.com/rulebook/anti-money-laundering-counter-terrorist-financing-and-sanctions-module-aml-ver3004-26",
 note:"Current online version identified as VER30/04-26. The Module includes specific chapters on CDD, sanctions, MLROs, suspicious activity reports, record keeping and DNFBP registration/supervision. Re-check the DFSA current-version marker before publishing or citing a rule number.",
 appliesTo:["DFSA Relevant Persons to the extent specified by the AML Module","DFSA Authorised Firms","DFSA Registered DNFBPs where applicable"],
 notApplyTo:["Mainland financial institutions regulated solely by CBUAE","ADGM firms regulated by FSRA"],
 readWith:["Federal Decree-Law No. 10 of 2025","Cabinet Resolution No. 134 of 2025"]
});

addLawIfMissing({
 number:"ADGM Anti-Money Laundering and Sanctions Rulebook",
 title:"Anti-Money Laundering and Sanctions Rules and Guidance",
 jurisdiction:"ADGM",
 authority:"Financial Services Regulatory Authority (FSRA)",
 status:"In force",
 summary:"The FSRA AML Rulebook provides ADGM's financial-services AML, counter-terrorist-financing, counter-proliferation-financing and sanctions framework. It uses a risk-based approach and operates alongside the UAE federal AML/CFT legislation.",
 relevance:"Use this Rulebook for FSRA-regulated persons in ADGM when determining regulator-specific AML systems, controls, CDD, reporting, sanctions and governance requirements. ADGM expressly states that its AML Rules must be read in the context of the relevant UAE federal laws and legislation.",
 topics:"adgm fsra aml cft cpf sanctions rulebook authorised person authorized person relevant person cdd risk based approach mlro suspicious transaction federal law",
 source:"https://www.adgm.com/operating-in-adgm/financial-and-cyber-crime-prevention/aml",
 note:"FSRA finalised enhancements to the AML Framework on 21 May 2026, including amendments to FSMR and the AML Rulebook to reflect federal-law developments and FATF standards. Use the live ADGM Rulebook/current amendments rather than an older PDF snapshot. Re-verify monthly.",
 appliesTo:["Persons within the application provisions of the FSRA AML Rulebook","FSRA Authorised Persons and other covered ADGM persons as specified by the Rulebook"],
 notApplyTo:["DIFC firms regulated by DFSA","Mainland financial institutions regulated solely by CBUAE"],
 readWith:["Federal Decree-Law No. 10 of 2025","Cabinet Resolution No. 134 of 2025"]
});

addLawIfMissing({
 number:"MoET DNFBP AML/CFT/CPF Guidance — March 2026",
 title:"Guidelines for Designated Non-Financial Businesses and Professions",
 jurisdiction:"Federal",
 authority:"UAE Ministry of Economy and Tourism",
 status:"Current guidance",
 summary:"Current Ministry of Economy and Tourism guidance explains how the federal AML/CFT/CPF framework applies to supervised DNFBPs. The DNFBP perimeter includes real-estate brokers and agents, dealers in precious metals and stones, company and trust service providers, and specified independent legal and accounting activities when the statutory transaction/activity conditions are met.",
 relevance:"Use this guidance when a non-financial business needs to determine whether it is a DNFBP and what practical AML controls are expected. It is particularly relevant to real-estate brokerage, precious-metals/stones activity and corporate-service-provider businesses supervised by the Ministry.",
 topics:"dnfbp ministry economy tourism moet aml cft cpf real estate broker agent precious metals stones dealer company service provider trust service provider lawyer notary accountant guidance goaml cdd str",
 source:"https://www.moet.gov.ae/documents/20121/0/AML_CFT_Guidelines_for_Designated_Non_Financial_Businesses_and_Professions_March_2026.pdf",
 note:"The substantive obligations come from Federal Decree-Law No. 10 of 2025, Cabinet Resolution No. 134 of 2025 and applicable supervisory decisions; this guidance explains implementation and does not replace the legislation. Cabinet Resolution No. 134 of 2025 sets activity-specific DNFBP triggers, including AED 55,000 for covered cash transactions by dealers in valuable metals and precious stones. Ministry materials also list Ministerial Decision No. 253 of 2025 concerning controls and conditions for DNFBP registration by licensing authorities. Verify the latest Ministry page and supervisory allocation before relying on a sector-specific requirement.",
 appliesTo:["DNFBPs supervised by the Ministry of Economy and Tourism within the relevant statutory activity triggers"],
 notApplyTo:["Businesses outside the DNFBP definitions/triggers unless another AML/CFT regime applies","DNFBPs supervised by another competent authority for the relevant activity"],
 readWith:["Federal Decree-Law No. 10 of 2025","Cabinet Resolution No. 134 of 2025"]
});
