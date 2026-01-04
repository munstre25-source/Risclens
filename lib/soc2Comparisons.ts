export interface ComparisonPage {
  slug: string;
  title: string;
  description: string;
  tableRows: { aspect: string; soc2: string; iso: string }[];
  decisions: string[];
  faqs: { question: string; answer: string }[];
}

export const comparisonPages: ComparisonPage[] = [
  {
    slug: 'timeline-and-effort',
    title: 'SOC 2 vs ISO 27001: Timeline and Effort',
    description: 'Compare how long SOC 2 and ISO 27001 typically take, what effort is involved, and where teams get stuck.',
    tableRows: [
      { aspect: 'Typical kickoff to audit readiness', soc2: '4–12 weeks depending on scope and Type I vs II', iso: '3–6 months to implement ISMS and controls' },
      { aspect: 'Observation/operating period', soc2: '0 for Type I, 3–12 months for Type II', iso: 'Evidence usually over a 3+ month window' },
      { aspect: 'Documentation depth', soc2: 'Policies, procedures, and evidence mapped to TSC', iso: 'ISMS manual, Statement of Applicability, risk treatment plans' },
      { aspect: 'External audit cycle', soc2: 'Annual, report delivery after testing', iso: 'Surveillance audits annually, recertification every 3 years' },
      { aspect: 'Common bottlenecks', soc2: 'Pentest scheduling, access reviews, logging coverage', iso: 'Risk management cadence, internal audit, asset inventory completeness' },
    ],
    decisions: [
      'Choose SOC 2 first if enterprise buyers expect it and you need a faster proof point.',
      'Choose ISO 27001 if you sell globally or want a certifiable ISMS with ongoing surveillance.',
      'Run both if you already have a SOC 2 control set and want ISO certification for EU/regulated buyers.',
    ],
    faqs: [
      { question: 'Which is faster for startups?', answer: 'SOC 2 Type I is usually faster. Type II adds operating evidence; ISO requires an ISMS and surveillance audits.' },
      { question: 'Can we reuse work between them?', answer: 'Yes. Policies, access controls, logging, and change management map well. Keep one control library and evidence store.' },
      { question: 'How do timelines change with multiple products?', answer: 'Scope drives effort. More products and regions extend both SOC 2 and ISO timelines—align on a single scope first.' },
      { question: 'Do we need an internal audit for SOC 2?', answer: 'Not required, but a pre-assessment helps. ISO 27001 requires internal audits before certification.' },
      { question: 'What about pentesting?', answer: 'Both benefit from recent pentests. SOC 2 buyers frequently request it; ISO certification bodies expect testing where risk warrants it.' },
      { question: 'How do observation windows differ?', answer: 'SOC 2 Type II requires an operating period. ISO expects evidence across months plus ongoing surveillance in later years.' },
    ],
  },
  {
    slug: 'cost-comparison',
    title: 'SOC 2 vs ISO 27001: Cost Comparison',
    description: 'Understand how pricing differs between SOC 2 and ISO 27001—auditors, tools, internal time, and retests.',
    tableRows: [
      { aspect: 'Audit fees', soc2: 'Varies by Type I vs II and scope', iso: 'Certification body fees plus surveillance audits' },
      { aspect: 'Internal time', soc2: 'Security, engineering, IT, and leadership for evidence', iso: 'ISMS owners, risk committee, internal audit time' },
      { aspect: 'Tooling', soc2: 'Logging, access reviews, ticketing, pentest', iso: 'Same plus risk management tooling and document control' },
      { aspect: 'Retests', soc2: 'Pentest retests, control remediation', iso: 'Follow-up audits for nonconformities' },
      { aspect: 'Renewals', soc2: 'Annual report refresh', iso: 'Annual surveillance, full recert every 3 years' },
    ],
    decisions: [
      'Budget SOC 2 Type I as a first milestone, then expand to Type II or ISO as customer requirements grow.',
      'Use ISO if you need a certifiable standard for international or regulated buyers; factor in surveillance costs.',
      'Keep pentest and logging budget shared across both frameworks to reduce duplicate spend.',
    ],
    faqs: [
      { question: 'Is ISO always more expensive?', answer: 'Not always, but ISO includes certification and surveillance costs. SOC 2 cost depends on Type I vs II and scope complexity.' },
      { question: 'Can we reuse tooling?', answer: 'Yes. Access reviews, logging, ticketing, and change management tools support both. Add risk tools for ISO if needed.' },
      { question: 'How do retests factor in?', answer: 'Plan for pentest retests and remediation for SOC 2; plan for nonconformity follow-ups in ISO.' },
      { question: 'What about consultant costs?', answer: 'Both may use advisors. Keep control ownership internal and use consultants for gap analysis or policy refinement.' },
      { question: 'Do we need separate auditors?', answer: 'Typically yes—CPA firms for SOC 2, certification bodies for ISO. Some groups offer both; ensure independence requirements are met.' },
      { question: 'How do we avoid double-spending?', answer: 'Share a single control library, evidence store, and cadence. Align pentests and access reviews to serve both frameworks.' },
    ],
  },
  {
    slug: 'which-to-choose',
    title: 'SOC 2 vs ISO 27001: Which to Choose',
    description: 'Guidance on when to prioritize SOC 2, ISO 27001, or both based on buyer expectations, regions, and product maturity.',
    tableRows: [
      { aspect: 'Primary buyers', soc2: 'US-based enterprise and mid-market', iso: 'Global buyers, regulated and EU-centric customers' },
      { aspect: 'Proof format', soc2: 'Attestation report (Type I/II)', iso: 'Certification with surveillance audits' },
      { aspect: 'Scope flexibility', soc2: 'Flexible by system and product', iso: 'ISMS scope statement with defined boundaries' },
      { aspect: 'Time to first proof', soc2: 'Fast with Type I', iso: 'Longer setup; certification after audit' },
      { aspect: 'Maintenance', soc2: 'Annual refresh', iso: 'Ongoing ISMS operation and surveillance' },
    ],
    decisions: [
      'Pick SOC 2 if US enterprise is your primary market and you need faster proof.',
      'Pick ISO 27001 if you sell globally, handle regulated data, or want a certifiable ISMS.',
      'Do both if buyers demand both proofs—map controls once and share evidence.',
    ],
    faqs: [
      { question: 'Do customers ever require both?', answer: 'Yes—some global buyers ask for ISO while US buyers expect SOC 2. Use one control library to serve both.' },
      { question: 'Can we start ISO without SOC 2?', answer: 'Yes, but many teams start with SOC 2 for speed and add ISO when international demand grows.' },
      { question: 'How do we keep scope manageable?', answer: 'Define products, regions, and systems clearly. Avoid adding every internal tool unless necessary for risk coverage.' },
      { question: 'What about privacy frameworks?', answer: 'SOC 2 can include privacy TSC; ISO pairs well with ISO 27701. Align privacy controls with customer expectations.' },
      { question: 'Do startups need ISO?', answer: 'Usually not immediately unless you sell into regions or sectors that require it. SOC 2 Type I often suffices early.' },
      { question: 'How do we communicate choice to customers?', answer: 'Explain scope, milestones, and timelines. Provide interim controls and pentest evidence while longer certifications are underway.' },
    ],
  },
  {
    slug: 'for-startups',
    title: 'SOC 2 vs ISO 27001 for Startups',
    description: 'Startup-focused comparison: speed to proof, scope control, and how to keep audits lightweight.',
    tableRows: [
      { aspect: 'Speed', soc2: 'Type I in weeks with tight scope', iso: 'Longer due to ISMS setup and surveillance expectations' },
      { aspect: 'Team load', soc2: 'Small team can own controls with automation', iso: 'Requires defined roles for ISMS, risk, and internal audit' },
      { aspect: 'Customer asks', soc2: 'Common for early enterprise deals', iso: 'Requested when selling internationally or to regulated buyers' },
      { aspect: 'Cost profile', soc2: 'Auditor + pentest + tooling', iso: 'Certification body + risk tooling + ongoing audits' },
      { aspect: 'Evidence reuse', soc2: 'Reuse for questionnaires and sales', iso: 'Certification helps standardize responses globally' },
    ],
    decisions: [
      'Start with SOC 2 Type I to get a fast proof point, then expand as buyers demand.',
      'Use ISO later when you need a certifiable standard for global sales.',
      'Automate access, logging, and evidence collection to keep team load low.',
    ],
    faqs: [
      { question: 'What do investors expect from startups?', answer: 'A plan with milestones. SOC 2 Type I plus a roadmap to Type II or ISO when needed is common.' },
      { question: 'Can we run SOC 2 and ISO in parallel?', answer: 'Possible but heavy. Most startups stage SOC 2 first, then reuse controls for ISO.' },
      { question: 'How do we keep documentation lean?', answer: 'Use concise policies and automate evidence. Avoid over-scoping systems that do not serve customers yet.' },
      { question: 'Do we need internal audit?', answer: 'Not for SOC 2, but ISO requires it. You can outsource if necessary but keep owners engaged.' },
      { question: 'How do we handle pentests?', answer: 'Budget a scoped pentest with retest. It helps both SOC 2 and ISO readiness.' },
      { question: 'What if customers ask for a cert immediately?', answer: 'Provide your SOC 2 plan, timelines, and interim controls. Offer a pentest summary while certification is in progress.' },
    ],
  },
  {
    slug: 'for-enterprise-sales',
    title: 'SOC 2 vs ISO 27001 for Enterprise Sales',
    description: 'Enterprise deals often demand SOC 2; global buyers ask for ISO. Learn how to position both without overpromising.',
    tableRows: [
      { aspect: 'Buyer expectation', soc2: 'Common prerequisite for US enterprise procurement', iso: 'International buyers and regulated industries favor it' },
      { aspect: 'Proof artifact', soc2: 'Attestation report with scope details', iso: 'Certificate and Statement of Applicability', },
      { aspect: 'Questionnaire impact', soc2: 'Reduces back-and-forth for US buyers', iso: 'Helps standardize responses globally' },
      { aspect: 'Sales timeline', soc2: 'Faster to present with Type I/II', iso: 'Longer, but strong for multi-region RFPs' },
      { aspect: 'Renewal rhythm', soc2: 'Annual refresh', iso: 'Surveillance audits yearly; recert every 3 years' },
    ],
    decisions: [
      'Lead with SOC 2 for US enterprise and pair with a pentest summary.',
      'Add ISO 27001 when expanding internationally or when RFPs demand certification.',
      'Maintain one evidence library to answer questionnaires efficiently.',
    ],
    faqs: [
      { question: 'How do we message status during sales?', answer: 'Share current SOC 2 status, scope, and timelines. Provide pentest summaries and policies as interim proof.' },
      { question: 'Do buyers accept SOC 2 without ISO?', answer: 'Many US buyers do. For global deals, explain your ISO roadmap and how controls already map to ISO.' },
      { question: 'What if procurement asks for both?', answer: 'Prioritize SOC 2 delivery, show ISO plans, and provide interim evidence. Keep RFP answers aligned to a single control set.' },
      { question: 'How do we reduce questionnaire cycles?', answer: 'Provide a concise trust pack: SOC 2 report, pentest summary, policies, and control mappings to common questions.' },
      { question: 'What about data residency?', answer: 'Document regions, backups, and failover. Both SOC 2 and ISO buyers want clarity on residency and retention.' },
      { question: 'How do we manage NDAs for reports?', answer: 'Use a sharing process with NDAs or portals; log who receives reports and when.' },
    ],
  },
  {
    slug: 'mapping-controls-overview',
    title: 'SOC 2 vs ISO 27001: Mapping Controls Overview',
    description: 'High-level mapping of SOC 2 Trust Service Criteria to ISO 27001 Annex A controls with guidance on evidence reuse.',
    tableRows: [
      { aspect: 'Access control', soc2: 'CC6.x, CC7.x expectations', iso: 'Annex A.5, A.8, A.9 controls' },
      { aspect: 'Change management', soc2: 'CC8.x change, deployment, and integrity', iso: 'Annex A.12, A.14 for change and development' },
      { aspect: 'Logging/monitoring', soc2: 'CC7.x monitoring and alerting', iso: 'Annex A.5, A.8, A.13 logging and monitoring expectations' },
      { aspect: 'Availability', soc2: 'A1 availability controls', iso: 'Annex A.5, A.17 business continuity and resilience' },
      { aspect: 'Vendor management', soc2: 'CC9.x third-party risk', iso: 'Annex A.5, A.15 supplier relationships' },
    ],
    decisions: [
      'Maintain one control library mapped to both frameworks to reduce evidence duplication.',
      'Collect evidence once and tag it to SOC 2 TSC and ISO Annex A controls.',
      'Align cadence: access reviews, logging checks, and change approvals serve both frameworks.',
    ],
    faqs: [
      { question: 'Do we need separate evidence for each?', answer: 'No—tag evidence to both control sets. Ensure narratives satisfy both auditors and certification bodies.' },
      { question: 'How do we document mappings?', answer: 'Create a simple matrix linking SOC 2 criteria to ISO Annex A controls with evidence references.' },
      { question: 'What about risk management?', answer: 'ISO requires formal risk management; SOC 2 benefits from it. Keep a shared risk register and treatment plans.' },
      { question: 'How often should we refresh mappings?', answer: 'At least annually or when controls change. Update when new systems or regions are added.' },
      { question: 'Can one pentest serve both?', answer: 'Yes if scoped appropriately. Ensure the report covers in-scope systems and is recent enough for both audiences.' },
      { question: 'How do we onboard new control owners?', answer: 'Provide mapped controls with evidence examples so they understand how work supports both frameworks.' },
    ],
  },
];

export function getComparisonPage(slug: string) {
  return comparisonPages.find((page) => page.slug === slug);
}
