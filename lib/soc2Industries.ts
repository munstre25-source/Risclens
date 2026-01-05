export interface IndustryGuide {
  slug: string;
  name: string;
  description: string;
  trustThemes: string[];
  scopeIn: string[];
  scopeOut: string[];
  costDrivers: string[];
  bottlenecks: string[];
  checklist: string[];
  related: string[];
  faqs: { question: string; answer: string }[];
}

export const industryGuides: IndustryGuide[] = [
  {
    slug: 'startups',
    name: 'Startups',
    description:
      'Early-stage teams need a lean SOC 2 path that satisfies buyers without slowing product velocity. Keep scope tight and show momentum.',
    trustThemes: [
      'Lightweight but credible security posture for first enterprise buyers',
      'Proof of access control, logging, and incident handling even with small teams',
      'Clear owner for security questionnaires and follow-ups',
    ],
    scopeIn: [
      'Primary production application and data plane',
      'Core CI/CD and infrastructure-as-code pipelines',
      'Identity provider and SSO configuration',
    ],
    scopeOut: [
      'Experimental beta environments without customer data',
      'Legacy prototypes no longer in use',
      'Future product lines not yet sold',
    ],
    costDrivers: [
      'Choosing a Type I vs Type II path for early deals',
      'How much is automated vs manual (logging, access reviews)',
      'Pentest scope and whether a retest is bundled',
    ],
    bottlenecks: [
      'Founders as control owners with limited time',
      'Standing up logging and alerting from scratch',
      'Coordinating evidence across contractors',
    ],
    checklist: [
      'Document data flows and the single production stack in scope',
      'Enable SSO + MFA everywhere possible',
      'Turn on baseline logging and retention',
      'Schedule a right-sized pentest with retest window',
      'Stand up access reviews and offboarding steps',
      'Draft incident response and change management procedures',
    ],
    related: ['b2b-saas', 'fintech', 'ai-companies'],
    faqs: [
      {
        question: 'Do startups need Type II right away?',
        answer:
          'Often no—early buyers may accept a Type I plus a roadmap. If enterprise deals require a Type II, plan for a shorter observation window and scope tightly.',
      },
      {
        question: 'How do we keep SOC 2 lightweight?',
        answer: 'Automate access, logging, and ticketing early, and keep the control set small. Focus on the core app, CI/CD, and cloud account that serves customers.',
      },
      {
        question: 'What should we pentest as a startup?',
        answer: 'Test the production-like environment that serves users, focusing on auth, data handling, and critical APIs. Budget a retest to validate fixes.',
      },
      {
        question: 'How do founders split responsibilities?',
        answer: 'Assign a control owner for access, one for change management, and one for incident response. Use templates and cadence reminders to reduce overhead.',
      },
      {
        question: 'Will SOC 2 slow product delivery?',
        answer: 'It can if unmanaged. Embed reviews into pull requests, keep policy sets concise, and schedule weekly check-ins to unblock evidence collection.',
      },
      {
        question: 'What do investors expect?',
        answer: 'They look for a plan: scope, timeline, tooling, and milestones. Showing consistent progress and recent pentest evidence helps de-risk diligence.',
      },
      {
        question: 'How do we answer long questionnaires?',
        answer: 'Reuse SOC 2 control mappings, provide a sanitized pentest summary, and point to your policy set. Clarify what is in scope and what is not.',
      },
      {
        question: 'How fast can we get through readiness?',
        answer: 'Many startups take a few weeks to set baselines if focused. Tight scope, clear owners, and a weekly cadence keep momentum high.',
      },
    ],
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    description:
      'Established teams juggle multiple products, regions, and stakeholders. SOC 2 needs coordination across business units and suppliers.',
    trustThemes: [
      'Enterprise procurement and security questionnaires with deep control reviews',
      'Alignment with existing risk, privacy, and availability programs',
      'Evidence reuse across multiple frameworks and regions',
    ],
    scopeIn: [
      'Primary customer-facing products and supporting shared services',
      'Central identity, network segments, and logging platforms',
      'Critical third-party integrations and data processors',
    ],
    scopeOut: [
      'Legacy apps being decommissioned with no active customers',
      'Internal-only tools that do not process customer data',
      'M&A systems pending integration plans',
    ],
    costDrivers: [
      'Coordinating evidence across many control owners',
      'Multiple environments and regions needing coverage',
      'Complex pentest scopes with APIs, apps, and cloud estates',
    ],
    bottlenecks: [
      'Scheduling access reviews and change evidence across teams',
      'Aligning audit windows with product release calendars',
      'Vendor risk reviews and contract updates for processors',
    ],
    checklist: [
      'Confirm in-scope business units and data flows',
      'Align SOC 2 with existing risk and privacy programs',
      'Map owners to every control and share evidence templates',
      'Sequence pentests and retests before observation end',
      'Standardize access reviews across apps and cloud accounts',
      'Pre-stage vendor due diligence and DPAs',
      'Create exec-level reporting on milestones and risks',
    ],
    related: ['enterprise', 'cloud-infrastructure', 'payments'],
    faqs: [
      {
        question: 'How do enterprises avoid scope creep?',
        answer: 'Decide which products and regions are in scope, document exclusions, and align procurement teams. Tie evidence to a single control library.',
      },
      {
        question: 'How do we handle shared services?',
        answer: 'Include identity, logging, and network platforms that support in-scope products. Show how shared controls apply across business units.',
      },
      {
        question: 'How do we manage hundreds of evidence items?',
        answer: 'Use templates, ownership assignments, and a cadence for uploads. Group evidence by control to avoid duplication.',
      },
      {
        question: 'What if we already have ISO 27001?',
        answer: 'Map ISO controls to SOC 2 to reuse evidence. You may still need SOC 2-specific testing (e.g., pentests aligned to TSC).',
      },
      {
        question: 'How should we stage pentests?',
        answer: 'Bundle app, API, and cloud scopes, and ensure findings are retested before audit close. Prioritize systems with the highest customer exposure.',
      },
      {
        question: 'How do we brief executives?',
        answer: 'Provide a milestone view: scope, observation dates, readiness risks, and blocker owners. Highlight buyer impact and expected deliverables.',
      },
      {
        question: 'What slows enterprises most?',
        answer: 'Decentralized ownership and delayed approvals. Use steering committees and weekly reviews to keep evidence moving.',
      },
      {
        question: 'Can we reuse evidence for customers?',
        answer: 'Yes. Provide sanitized pentest summaries, policies, and attestations. Keep a central repository so responses stay consistent.',
      },
    ],
  },
  {
    slug: 'b2b-saas',
    name: 'B2B SaaS',
    description:
      'Multi-tenant SaaS platforms must prove data isolation, change safety, and incident responsiveness to enterprise buyers.',
    trustThemes: [
      'Data segregation and tenant isolation',
      'Change management and deployment safety',
      'Availability and reliability commitments',
    ],
    scopeIn: [
      'Production app stack, databases, and tenant isolation controls',
      'CI/CD pipelines and release approvals',
      'Support tooling used to access customer environments',
    ],
    scopeOut: ['Internal-only admin tools without customer data', 'Legacy monoliths sunsetted from active customers'],
    costDrivers: [
      'Proving isolation (policies, tests, and monitoring)',
      'Blue/green or canary release evidence and rollback paths',
      'Pentest coverage for multi-tenant auth and RBAC',
    ],
    bottlenecks: [
      'Coordinating DB access reviews and support tooling controls',
      'Capturing deployment evidence across multiple teams',
      'Managing availability SLAs and monitoring proofs',
    ],
    checklist: [
      'Document tenant isolation controls and monitoring',
      'Lock down support access with SSO, MFA, and approvals',
      'Capture release approvals and rollback evidence',
      'Align incident response to availability SLAs',
      'Schedule pentest on auth, RBAC, and data isolation paths',
      'Prepare sanitized customer trust pack with SOC 2 narrative',
    ],
    related: ['startups', 'devtools', 'marketplaces'],
    faqs: [
      {
        question: 'How do we prove tenant isolation?',
        answer: 'Show architecture diagrams, isolation controls, monitoring alerts, and test results that validate separation across tenants.',
      },
      {
        question: 'What deployment evidence is expected?',
        answer: 'Release approvals, change tickets, automated test results, and rollback records that show safe delivery to production.',
      },
      {
        question: 'Do customers expect uptime evidence?',
        answer: 'Yes. Provide availability metrics, alerting runbooks, and incident summaries tied to SLAs.',
      },
      {
        question: 'How are support tools handled?',
        answer: 'Treat them as in-scope—require SSO/MFA, log access, and review permissions regularly.',
      },
      {
        question: 'What about customer-specific environments?',
        answer: 'Document any single-tenant deployments and include them in scope if they process production data.',
      },
      {
        question: 'Do we need data residency controls?',
        answer: 'If customers ask, document regions, backups, and failover. Align controls with contractual commitments.',
      },
      {
        question: 'Should we provide a pentest summary?',
        answer: 'Yes. Buyers often request a sanitized report showing scope, findings, and remediation status.',
      },
      {
        question: 'How do we keep questionnaires consistent?',
        answer: 'Centralize answers, link to SOC 2 controls, and reuse evidence packs to reduce rework.',
      },
    ],
  },
  {
    slug: 'fintech',
    name: 'Fintech',
    description:
      'Fintech teams face stricter data handling, vendor oversight, and fraud controls. SOC 2 must align with financial regulations and partner due diligence.',
    trustThemes: [
      'Data protection, encryption, and transaction integrity',
      'Vendor and processor risk management',
      'Fraud monitoring and secure change control',
    ],
    scopeIn: [
      'Production payment and ledger systems',
      'KYC/AML tooling and integrations',
      'Critical vendors (payments, identity, risk scoring)',
    ],
    scopeOut: ['Sandbox data with synthetic values only', 'Internal finance tools not touching customer data'],
    costDrivers: [
      'Evidence for encryption, key management, and transaction logging',
      'Vendor due diligence and contract updates',
      'Pentests covering payments flows and APIs',
    ],
    bottlenecks: [
      'Coordinating vendors for evidence and attestation letters',
      'Ensuring prod-like data in lower environments is controlled',
      'Aligning fraud monitoring evidence with audit periods',
    ],
    checklist: [
      'Map data flows for payments and sensitive info',
      'Lock down encryption, key rotation, and access to keys',
      'Document vendor oversight, SLAs, and DPAs',
      'Schedule pentest on payment flows with retest',
      'Prepare incident response for fraud/chargeback scenarios',
      'Run access reviews for finance and engineering systems',
    ],
    related: ['payments', 'b2b-saas', 'cloud-infrastructure'],
    faqs: [
      {
        question: 'How do fintech teams handle vendor risk?',
        answer: 'Track critical suppliers, collect SOC reports or attestation letters, and document SLAs and security exhibits in contracts.',
      },
      {
        question: 'What encryption evidence is needed?',
        answer: 'Show in-transit and at-rest encryption settings, key management procedures, rotation logs, and access controls around key stores.',
      },
      {
        question: 'Do auditors expect fraud controls?',
        answer: 'They will ask how you detect and respond to fraud. Provide monitoring rules, alert handling, and incident examples if available.',
      },
      {
        question: 'How do we scope pentests?',
        answer: 'Include payment flows, APIs, and administrative portals. Ensure test data respects compliance requirements and privacy.',
      },
      {
        question: 'What regulators influence SOC 2 here?',
        answer: 'While SOC 2 is voluntary, expectations are shaped by PCI, GLBA, and bank partner requirements. Align controls accordingly.',
      },
      {
        question: 'Can we reuse PCI evidence?',
        answer: 'Yes—map PCI artifacts to SOC 2 security and availability criteria, but ensure SOC 2-specific narratives are covered.',
      },
      {
        question: 'How do we protect lower environments?',
        answer: 'Avoid real data in test environments. If used, enforce access controls, masking, and logging at the same level as production.',
      },
      {
        question: 'What slows audits for fintech?',
        answer: 'Vendor approvals, data classification gaps, and missing transaction logs are common blockers. Prep these early.',
      },
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    description:
      'Healthcare and healthtech teams handle PHI/PII and must align SOC 2 with HIPAA-like expectations while keeping operations lean.',
    trustThemes: [
      'PHI protection and access monitoring',
      'Vendor risk for EHRs, labs, and cloud hosting',
      'Incident response that covers privacy events',
    ],
    scopeIn: ['Production systems processing PHI', 'Cloud accounts hosting clinical data', 'Support tools with PHI access'],
    scopeOut: ['Synthetic test environments without PHI', 'Legacy clinical prototypes not in use'],
    costDrivers: [
      'Audit evidence for PHI handling and data residency',
      'Vendor BAAs and oversight',
      'Pentest coverage for PHI portals and APIs',
    ],
    bottlenecks: [
      'Coordinating BAAs and vendor attestations',
      'Proving monitoring and alerting on PHI access',
      'Aligning privacy incident handling with SOC 2 narratives',
    ],
    checklist: [
      'Classify data and document PHI flows',
      'Ensure BAAs and vendor oversight are current',
      'Lock down access with SSO/MFA and logging',
      'Test backup/restore with PHI considerations',
      'Schedule pentest for patient/admin portals and APIs',
      'Run privacy-aware incident response tabletop',
    ],
    related: ['edtech', 'ai-companies', 'marketplaces'],
    faqs: [
      {
        question: 'Is SOC 2 enough for healthcare?',
        answer: 'SOC 2 is not a HIPAA certification but it demonstrates control maturity. Pair it with BAAs and privacy controls expected for PHI.',
      },
      {
        question: 'How do we show PHI access is controlled?',
        answer: 'Provide access logs, alert rules, and periodic reviews for systems containing PHI. Document how you handle break-glass scenarios.',
      },
      {
        question: 'Do we need data residency proof?',
        answer: 'If customers ask, show regions, backups, and disaster recovery plans. Include cloud configuration evidence and retention policies.',
      },
      {
        question: 'What about vendor compliance?',
        answer: 'Collect vendor SOC reports, BAAs, and security exhibits. Track review dates and exceptions.',
      },
      {
        question: 'How do we test incident response for PHI?',
        answer: 'Run tabletop exercises that include privacy considerations, patient communication, and regulatory notifications as applicable.',
      },
      {
        question: 'Can we limit scope to one product?',
        answer: 'Yes, if other products do not process PHI. Make the boundary explicit and keep evidence organized by system.',
      },
      {
        question: 'Should we mask PHI in lower environments?',
        answer: 'Yes. Avoid real PHI in test/staging. If necessary, enforce the same controls and document approvals.',
      },
      {
        question: 'What pentest evidence is expected?',
        answer: 'Recent testing of patient portals, admin consoles, and APIs with remediation and retest notes.',
      },
    ],
  },
  {
    slug: 'edtech',
    name: 'EdTech',
    description:
      'Education platforms handle student data and must respect privacy expectations from districts and universities while proving reliability.',
    trustThemes: [
      'Student data privacy and parental consent considerations',
      'Availability during peak academic periods',
      'Vendor oversight for LMS, video, and analytics tools',
    ],
    scopeIn: ['Student-facing apps and data stores', 'Support tools with student data access', 'Analytics pipelines using student data'],
    scopeOut: ['Marketing sites without student data', 'Legacy pilots no longer in production'],
    costDrivers: [
      'Evidence for privacy controls and parental consent workflows',
      'Availability monitoring during school terms',
      'Pentest coverage for portals and APIs used by students and staff',
    ],
    bottlenecks: [
      'Coordinating with districts for questionnaires',
      'Gathering consent and privacy documentation',
      'Proving uptime during exam or enrollment periods',
    ],
    checklist: [
      'Map student data flows and retention',
      'Lock down identity and device policies for staff',
      'Document consent and data sharing processes',
      'Set uptime/alerting SLAs for school calendars',
      'Schedule pentest on student/staff portals',
      'Prepare FAQ for district security reviews',
    ],
    related: ['startups', 'marketplaces', 'ai-companies'],
    faqs: [
      {
        question: 'What privacy proof do districts expect?',
        answer: 'Document consent flows, data sharing policies, and retention. Provide SOC 2 controls and vendor oversight details.',
      },
      {
        question: 'How do we handle student devices?',
        answer: 'Enforce SSO/MFA for staff, manage device baselines, and avoid storing student data locally on unmanaged devices.',
      },
      {
        question: 'Do we need uptime evidence?',
        answer: 'Yes—especially during enrollment and exams. Provide monitoring, alerting, and incident handling records for those periods.',
      },
      {
        question: 'What pentest scope is expected?',
        answer: 'Include portals, APIs, and integrations that handle student data. Ensure testing considers privacy and consent flows.',
      },
      {
        question: 'How do we answer school questionnaires?',
        answer: 'Reuse SOC 2 evidence, provide a clear scope, and include a sanitized pentest summary and policy set.',
      },
      {
        question: 'Can we limit scope to one product line?',
        answer: 'Yes—declare boundaries and keep evidence tied to in-scope systems only.',
      },
      {
        question: 'How do we manage vendors?',
        answer: 'Track critical suppliers (LMS, video, analytics) and keep agreements and SOC reports current.',
      },
      {
        question: 'Do we need parental consent proof?',
        answer: 'If applicable, document consent collection and retention, and ensure it aligns with privacy policies.',
      },
    ],
  },
  {
    slug: 'marketplaces',
    name: 'Marketplaces',
    description:
      'Two-sided marketplaces need trust from buyers and sellers. SOC 2 should highlight fraud controls, payments protection, and availability.',
    trustThemes: [
      'Fraud detection and seller/buyer verification',
      'Payment and PII protection across both sides',
      'Availability during peak demand periods',
    ],
    scopeIn: ['Marketplace platform and payment flows', 'Support tools for trust/safety teams', 'Data pipelines feeding fraud models'],
    scopeOut: ['Legacy verticals without active users', 'Marketing microsites only collecting basic leads'],
    costDrivers: [
      'Fraud monitoring controls and evidence',
      'Payment processor oversight and SLAs',
      'Pentest coverage for buyer/seller portals and APIs',
    ],
    bottlenecks: [
      'Coordinating fraud, product, and engineering teams',
      'Capturing evidence for surge/peak operations',
      'Vendor reviews for payments and identity verification',
    ],
    checklist: [
      'Map buyer/seller data flows and fraud controls',
      'Lock down identity, support tools, and escalation paths',
      'Capture incident runbooks for trust/safety scenarios',
      'Ensure payment and PII encryption evidence is ready',
      'Schedule pentest on portals, APIs, and admin tooling',
      'Prepare surge-readiness monitoring evidence',
    ],
    related: ['payments', 'ecommerce', 'b2b-saas'],
    faqs: [
      {
        question: 'Do marketplaces need specialized fraud evidence?',
        answer: 'Yes. Show monitoring rules, alert handling, and incident response tailored to fraud and abuse cases.',
      },
      {
        question: 'How do we scope payments?',
        answer: 'Include payment processors, wallets, and payout systems. Document vendor oversight and key management.',
      },
      {
        question: 'What about surge periods?',
        answer: 'Provide availability metrics and incident handling examples from peak periods. Show load testing or scaling runbooks if available.',
      },
      {
        question: 'How do we handle multiple verticals?',
        answer: 'Define which verticals are in scope and keep evidence organized by product. Exclude dormant lines explicitly.',
      },
      {
        question: 'Do we need separate pentests?',
        answer: 'Often a combined scope works if architectures overlap. Ensure coverage for both buyer and seller flows.',
      },
      {
        question: 'How do we manage access to seller data?',
        answer: 'Apply least privilege, SSO/MFA, and regular reviews for support and operations teams accessing sensitive data.',
      },
      {
        question: 'What do customers expect in reports?',
        answer: 'Clear scope, findings, remediation status, and how you prevent recurrence—especially for fraud-related issues.',
      },
      {
        question: 'Can we reuse SOC 2 for trust/safety reviews?',
        answer: 'Yes. Provide SOC 2 report sections on security and availability, plus pentest summaries relevant to trust/safety.',
      },
    ],
  },
  {
    slug: 'ai-data',
    name: 'AI/Data',
    description:
      'AI and data companies manage sensitive datasets and models. SOC 2 should highlight data governance, model access controls, and abuse monitoring.',
    trustThemes: [
      'Training data provenance and privacy',
      'Model access control and monitoring',
      'Responsible handling of model abuse and prompt attacks',
    ],
    scopeIn: ['Training data pipelines and storage', 'Model hosting and inference endpoints', 'Admin tools for datasets and model management'],
    scopeOut: ['Public demos with synthetic-only data', 'Research sandboxes without customer data'],
    costDrivers: [
      'Data governance, labeling, and retention expectations',
      'Model hosting security and monitoring coverage',
      'Pentest scope for APIs, models, and admin tooling',
    ],
    bottlenecks: [
      'Proving data rights and consent for training datasets',
      'Locking down privileged access to models and embeddings',
      'Coordinating disclosure and fixes for model behavior issues',
    ],
    checklist: [
      'Inventory data sources and document rights/consent',
      'Restrict and log access to models and embeddings',
      'Enable monitoring for inference and admin endpoints',
      'Create prompt-abuse and model-misuse runbooks',
      'Schedule pentest including model/API abuse cases',
      'Document retention/deletion for datasets and outputs',
    ],
    related: ['cloud-infrastructure', 'devtools', 'startups'],
    faqs: [
      {
        question: 'Do AI/data companies need special scope?',
        answer: 'Yes. Include model hosting, training data pipelines, and admin tooling. Make clear what is production versus research.',
      },
      {
        question: 'How do we protect training data?',
        answer: 'Restrict access, log usage, and document consent/rights. Avoid mixing sensitive data in non-production environments.',
      },
      {
        question: 'What about prompt injection and abuse?',
        answer: 'Have detection and response runbooks. Test controls in pentests and log access to administrative endpoints.',
      },
      {
        question: 'Do we need data residency controls?',
        answer: 'If customers ask, document regions for datasets, backups, and inference endpoints, plus retention policies.',
      },
      {
        question: 'How do we handle open-source models?',
        answer: 'Track licensing, updates, and security posture. Document how you vet models and control modifications.',
      },
      {
        question: 'Can we limit scope to production models?',
        answer: 'Yes, but be explicit. Keep research sandboxes out of scope and document boundaries.',
      },
      {
        question: 'What pentest focus is expected?',
        answer: 'API and model abuse cases, auth, rate limiting, and potential data leakage through responses.',
      },
      {
        question: 'How do we share evidence with customers?',
        answer: 'Provide sanitized pentest summaries, model access controls, and SOC 2 report sections on security and availability.',
      },
    ],
  },
  {
    slug: 'devtools',
    name: 'Developer Tools',
    description:
      'Developer platforms must prove code integrity, CI/CD safety, and protection of customer repositories, secrets, and pipelines.',
    trustThemes: [
      'Source code integrity and access control',
      'CI/CD pipeline security and artifact signing',
      'Secrets management and least privilege',
    ],
    scopeIn: ['Hosted repos or pipelines handling customer code', 'Artifact storage and signing systems', 'Admin/support tools accessing customer projects'],
    scopeOut: ['Open-source community instances without customer data', 'Personal developer sandboxes'],
    costDrivers: [
      'Evidence for code access controls and approvals',
      'Pipeline integrity, build provenance, and artifact signing',
      'Pentest coverage for supply-chain abuse paths',
    ],
    bottlenecks: [
      'Coordinating evidence across engineering and security teams',
      'Capturing build/test/signing artifacts for audits',
      'Managing secrets across multiple clouds and pipelines',
    ],
    checklist: [
      'Enforce SSO/MFA and least privilege for repos/pipelines',
      'Capture approvals and logs for code changes',
      'Document artifact signing and provenance',
      'Inventory secrets and enforce rotation/monitoring',
      'Schedule pentest for pipeline and admin abuse cases',
      'Prepare trust pack for enterprise dev teams',
    ],
    related: ['b2b-saas', 'cloud-infrastructure', 'ai-companies'],
    faqs: [
      {
        question: 'How do we show code integrity?',
        answer: 'Provide branch protections, review approvals, and logs from CI/CD showing checks and sign-offs.',
      },
      {
        question: 'What about artifact signing?',
        answer: 'Document signing keys, who can sign, and evidence of signatures on releases. Include rotation and storage controls.',
      },
      {
        question: 'Do we need to pentest pipelines?',
        answer: 'Yes—cover admin tools, build agents, and supply-chain abuse paths like dependency attacks.',
      },
      {
        question: 'How do we manage secrets at scale?',
        answer: 'Centralize secrets management, enforce rotation, and log access. Provide sample evidence of reviews or alerts.',
      },
      {
        question: 'What do enterprise dev teams ask for?',
        answer: 'Proof of code access controls, pentest summaries, and SOC 2 report sections covering change and access management.',
      },
      {
        question: 'Can we limit scope to hosted products?',
        answer: 'Yes—state that self-hosted or community instances are out of scope if they don’t process customer data.',
      },
      {
        question: 'How do we handle customer repos?',
        answer: 'Restrict access, log all support touches, and review permissions regularly. Provide evidence of these reviews.',
      },
      {
        question: 'What if we use multiple clouds?',
        answer: 'Document controls per provider, ensure consistency in access, logging, and encryption, and include them in scope.',
      },
    ],
  },
  {
    slug: 'cloud-infrastructure',
    name: 'Cloud Infrastructure',
    description:
      'Infrastructure platforms need to prove segregation, availability, and change safety across shared services and customer environments.',
    trustThemes: [
      'Isolation between tenants and environments',
      'Network security, encryption, and logging coverage',
      'Change management and rollback discipline',
    ],
    scopeIn: ['Control planes, data planes, and shared services', 'Network gateways, firewalls, and logging stacks', 'Admin tools used to operate customer environments'],
    scopeOut: ['Internal R&D sandboxes without customer data', 'Deprecated regions not serving customers'],
    costDrivers: [
      'Multi-region monitoring and evidence collection',
      'Network segmentation and firewall management',
      'Pentest coverage for control plane APIs',
    ],
    bottlenecks: [
      'Coordinating changes across regions',
      'Collecting network evidence and firewall rules',
      'Ensuring logging and backups are consistent globally',
    ],
    checklist: [
      'Document isolation, network zoning, and monitoring',
      'Capture change approvals and rollback runbooks',
      'Standardize logging/backup configurations by region',
      'Schedule control-plane/API pentest with retest',
      'Review admin access and emergency access paths',
      'Prepare availability and DR evidence for customers',
    ],
    related: ['enterprise', 'devtools', 'payments'],
    faqs: [
      {
        question: 'How do we prove isolation?',
        answer: 'Show network segmentation, IAM boundaries, logging, and tests validating tenant and environment separation.',
      },
      {
        question: 'What about DR and backups?',
        answer: 'Provide backup schedules, restore tests, and regional failover plans. Align with availability SLAs.',
      },
      {
        question: 'Do auditors look at firewall rules?',
        answer: 'Yes. Provide change control and approvals for security groups and firewall updates, plus logging evidence.',
      },
      {
        question: 'How do we manage many regions?',
        answer: 'Standardize baselines, automate configuration, and sample evidence per region to show consistency.',
      },
      {
        question: 'What pentest scope is expected?',
        answer: 'Control plane APIs, admin consoles, and shared services. Include retest results for fixes.',
      },
      {
        question: 'Can we exclude internal R&D?',
        answer: 'Yes, if it holds no customer data. Document the boundary and access controls.',
      },
      {
        question: 'How do we handle customer-specific stacks?',
        answer: 'Document any single-tenant or dedicated stacks and include them in scope if they process customer data.',
      },
      {
        question: 'How do we answer enterprise questionnaires?',
        answer: 'Provide SOC 2 narratives, pentest summaries, and evidence of isolation, logging, and change controls.',
      },
    ],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    description:
      'E-commerce teams must balance conversion with security. SOC 2 should highlight payments protection, fraud controls, and uptime.',
    trustThemes: [
      'Payment security and cardholder data handling',
      'Fraud prevention and chargeback handling',
      'Availability during promotions and peak seasons',
    ],
    scopeIn: ['Storefronts and checkout services', 'Payment processors and order management systems', 'Fraud/risk tooling and support consoles'],
    scopeOut: ['Content-only marketing sites', 'Legacy catalog services no longer used'],
    costDrivers: [
      'Payment and PII encryption evidence',
      'Fraud tooling and monitoring coverage',
      'Pentest coverage for checkout flows and admin consoles',
    ],
    bottlenecks: [
      'Coordinating evidence during peak seasons',
      'Keeping vendor attestations current',
      'Capturing monitoring and alert evidence for uptime',
    ],
    checklist: [
      'Map payment and PII flows across storefront and OMS',
      'Lock down admin/support consoles with SSO/MFA',
      'Document fraud detection, alerts, and escalations',
      'Capture uptime/alerting evidence from peak periods',
      'Schedule pentest on checkout and admin flows',
      'Prepare customer-facing trust pack for sales',
    ],
    related: ['marketplaces', 'payments', 'b2b-saas'],
    faqs: [
      {
        question: 'Do we need PCI if we have SOC 2?',
        answer: 'SOC 2 is complementary but not a substitute for PCI. Show how you handle card data and rely on compliant processors.',
      },
      {
        question: 'What uptime evidence matters?',
        answer: 'Alert coverage, incident timelines, and recovery details during high-traffic periods.',
      },
      {
        question: 'How do we handle guest checkout data?',
        answer: 'Restrict retention, encrypt data, and ensure deletion policies are documented and followed.',
      },
      {
        question: 'What about third-party scripts?',
        answer: 'Track critical scripts and vendors, review security posture, and monitor for changes that could affect checkout.',
      },
      {
        question: 'How do we prevent fraud?',
        answer: 'Use layered controls—risk scoring, step-up auth, manual review thresholds—and document alert handling.',
      },
      {
        question: 'Do we pentest mobile apps too?',
        answer: 'Yes, if they handle checkout or account management. Include them in scope with web flows.',
      },
      {
        question: 'How do we protect support consoles?',
        answer: 'Enforce SSO/MFA, least privilege, logging, and regular access reviews.',
      },
      {
        question: 'Should we mask data in analytics?',
        answer: 'Yes—mask or tokenize PII before sending to analytics tools where possible.',
      },
    ],
  },
    {
      slug: 'payments',
      name: 'Payments',
      description:
        'Payments platforms face strict scrutiny on security, availability, and vendor oversight. SOC 2 should align with PCI expectations without overpromising.',
      trustThemes: [
        'Transaction security and integrity',
        'Key management and encryption',
        'Vendor oversight for processors and banking partners',
      ],
      scopeIn: ['Payment processing services and ledgers', 'Key management systems and HSMs', 'Admin/support consoles with payment access'],
      scopeOut: ['Sandbox/demo environments without real payments', 'Legacy payment connectors decommissioned'],
      costDrivers: [
        'Key management, HSM operations, and rotation evidence',
        'Processor/vendor oversight and contract updates',
        'Pentest coverage for payment portals and APIs',
      ],
      bottlenecks: [
        'Coordinating with banking partners and processors',
        'Capturing HSM and key rotation evidence',
        'Managing segregation of duties for finance vs engineering',
      ],
      checklist: [
        'Map payment flows and key management lifecycle',
        'Lock down admin consoles and support tools',
        'Ensure logging and monitoring for payment events',
        'Schedule pentest for payment portals/APIs with retest',
        'Collect vendor attestations and SLAs',
        'Document incident response for payment fraud/outages',
      ],
      related: ['fintech', 'marketplaces', 'ecommerce'],
      faqs: [
        {
          question: 'How do payments teams handle keys?',
          answer: 'Use HSMs or managed KMS, enforce separation of duties, and provide rotation and access logs as evidence.',
        },
        {
          question: 'Do auditors expect PCI evidence?',
          answer: 'They will reference PCI principles. Provide encryption, access, and monitoring evidence without positioning SOC 2 as PCI compliance.',
        },
        {
          question: 'How do we coordinate with banks?',
          answer: 'Align on reporting expectations, SLAs, and incident notifications. Keep attestations and SOC reports current.',
        },
        {
          question: 'What pentest scope is expected?',
          answer: 'Payment portals, APIs, admin consoles, and support tools that can affect transactions.',
        },
        {
          question: 'How do we show availability?',
          answer: 'Provide uptime metrics, redundancy plans, and incident summaries relevant to payment flows.',
        },
        {
          question: 'How do we handle chargeback data?',
          answer: 'Restrict access, log reviews, and include fraud/chargeback scenarios in incident response plans.',
        },
        {
          question: 'Can we exclude sandbox?',
          answer: 'Yes, if only synthetic data is used. State that in scope documents and keep access controlled anyway.',
        },
        {
          question: 'What vendor evidence is needed?',
          answer: 'SOC reports, SLAs, and security exhibits for processors, gateways, and banking partners.',
        },
      ],
    },
    {
      slug: 'proptech',
      name: 'PropTech',
      description:
        'Property technology companies manage sensitive lease, financial, and personal data. SOC 2 proves your commitment to data privacy and platform reliability for owners and tenants.',
      trustThemes: [
        'Data privacy for tenant and owner information',
        'Financial transaction integrity for rent and fees',
        'Platform availability for critical property management functions',
      ],
      scopeIn: ['Property management platforms and tenant portals', 'Payment processing and ledger systems', 'Document storage for leases and sensitive records'],
      scopeOut: ['Marketing websites for property listings', 'Internal research tools for market analysis'],
      costDrivers: [
        'Evidence for PII and financial data encryption',
        'Third-party payment processor oversight',
        'Pentest coverage for tenant/owner portals and APIs',
      ],
      bottlenecks: [
        'Ensuring secure handling of legacy property data',
        'Coordinating with multiple third-party financial services',
        'Proving uptime during critical rent collection periods',
      ],
      checklist: [
        'Map data flows for sensitive tenant and financial info',
        'Lock down access to portals with SSO/MFA',
        'Document data retention and deletion policies for old records',
        'Schedule pentest on tenant and owner portals',
        'Prepare incident response for data breaches or payment outages',
        'Run access reviews for all property management systems',
      ],
      related: ['fintech', 'marketplaces', 'real-estate'],
      faqs: [
        {
          question: 'Why do PropTech companies need SOC 2?',
          answer: 'It builds trust with large property owners and institutional investors who require proof of security before integrating their assets with your platform.',
        },
        {
          question: 'How do we handle tenant PII?',
          answer: 'Enforce encryption, restrict access to authorized staff only, and maintain clear audit logs of all PII access.',
        },
      ],
    },
    {
      slug: 'logistics',
      name: 'Logistics',
      description:
        'Supply chain and logistics platforms ensure the movement of goods and data. SOC 2 highlights your operational resilience and data integrity for global shipping partners.',
      trustThemes: [
        'Operational resilience and platform uptime',
        'Data integrity for shipment tracking and manifests',
        'Security of integrations with carriers and warehouse systems',
      ],
      scopeIn: ['Logistics management systems and carrier integrations', 'Warehouse management systems (WMS)', 'Customer tracking portals and APIs'],
      scopeOut: ['Public-facing tracking pages with minimal data', 'Internal employee-only training tools'],
      costDrivers: [
        'Redundancy and failover evidence for high availability',
        'Security of numerous third-party API integrations',
        'Pentest coverage for critical logistics portals',
      ],
      bottlenecks: [
        'Coordinating security across diverse carrier integrations',
        'Proving data integrity across complex supply chain handoffs',
        'Ensuring consistent logging in decentralized warehouse environments',
      ],
      checklist: [
        'Document redundancy and failover plans for critical systems',
        'Secure and monitor all carrier API integrations',
        'Enforce MFA for all administrative and operational access',
        'Schedule pentest on primary logistics and tracking portals',
        'Create incident response plans for supply chain disruptions',
        'Run regular access reviews for carrier and WMS portals',
      ],
      related: ['cloud-infrastructure', 'enterprise', 'ecommerce'],
      faqs: [
        {
          question: 'How does SOC 2 benefit logistics platforms?',
          answer: 'It provides a competitive edge when bidding for contracts with global retailers and manufacturers who demand high reliability and security.',
        },
        {
          question: 'What is the focus of an audit for logistics?',
          answer: 'The focus is often on Availability and Processing Integrity—ensuring the system stays up and that shipment data remains accurate throughout its lifecycle.',
        },
      ],
    },
  ];

export function getIndustryGuide(slug: string) {
  return industryGuides.find((guide) => guide.slug === slug);
}
