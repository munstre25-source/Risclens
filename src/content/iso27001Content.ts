export const iso27001Hub = {
  hero: {
    headline: 'ISO 27001 Certification Hub',
    subhead: 'Build and certify your Information Security Management System (ISMS). Get readiness clarity, implementation roadmaps, and cost estimates tailored to your organization.',
  },
  lastUpdated: '2026-01-12',
};

export const annexAControls = [
  {
    category: 'A.5',
    title: 'Organizational Controls',
    controlCount: 37,
    description: 'Policies, roles, asset management, identity management, and supplier relationships.',
    icon: 'Building2',
    keyControls: [
      'A.5.1 Policies for information security',
      'A.5.9 Inventory of information assets',
      'A.5.15 Access control policy',
      'A.5.19 Information security in supplier relationships',
    ],
  },
  {
    category: 'A.6',
    title: 'People Controls',
    controlCount: 8,
    description: 'Screening, employment terms, awareness, training, and disciplinary processes.',
    icon: 'Users',
    keyControls: [
      'A.6.1 Screening',
      'A.6.3 Information security awareness and training',
      'A.6.5 Responsibilities after termination',
      'A.6.8 Information security event reporting',
    ],
  },
  {
    category: 'A.7',
    title: 'Physical Controls',
    controlCount: 14,
    description: 'Physical perimeters, entry controls, securing offices, and equipment protection.',
    icon: 'Shield',
    keyControls: [
      'A.7.1 Physical security perimeters',
      'A.7.4 Physical security monitoring',
      'A.7.9 Security of assets off-premises',
      'A.7.14 Secure disposal or re-use of equipment',
    ],
  },
  {
    category: 'A.8',
    title: 'Technological Controls',
    controlCount: 34,
    description: 'User endpoints, privileged access, cryptography, secure development, and monitoring.',
    icon: 'Lock',
    keyControls: [
      'A.8.2 Privileged access rights',
      'A.8.9 Configuration management',
      'A.8.15 Logging',
      'A.8.24 Use of cryptography',
      'A.8.28 Secure coding',
    ],
  },
];

export const implementationPhases = [
  {
    phase: 1,
    title: 'Gap Assessment',
    duration: '2-4 weeks',
    activities: [
      'Current state assessment against ISO 27001:2022',
      'ISMS scope definition and boundaries',
      'Asset inventory and risk identification',
      'Gap analysis report with remediation priorities',
    ],
  },
  {
    phase: 2,
    title: 'ISMS Design',
    duration: '4-8 weeks',
    activities: [
      'Information security policy development',
      'Risk assessment methodology (ISO 27005 aligned)',
      'Statement of Applicability (SoA) creation',
      'Control selection and documentation',
    ],
  },
  {
    phase: 3,
    title: 'Implementation',
    duration: '8-16 weeks',
    activities: [
      'Control implementation across all 93 controls',
      'Staff training and awareness programs',
      'Process documentation and procedures',
      'Technical controls deployment and hardening',
    ],
  },
  {
    phase: 4,
    title: 'Internal Audit',
    duration: '2-4 weeks',
    activities: [
      'Internal audit planning and execution',
      'Management review meetings',
      'Nonconformity identification and correction',
      'Evidence package preparation',
    ],
  },
  {
    phase: 5,
    title: 'Certification',
    duration: '4-8 weeks',
    activities: [
      'Stage 1 audit (documentation review)',
      'Stage 2 audit (implementation verification)',
      'Corrective action closure',
      'Certificate issuance and maintenance plan',
    ],
  },
];

export const costBreakdown = [
  { item: 'Gap Assessment', range: '$5,000 - $15,000', notes: 'Scope and complexity dependent' },
  { item: 'Consulting & Implementation', range: '$25,000 - $75,000', notes: '4-8 months typical' },
  { item: 'GRC Platform (Annual)', range: '$8,000 - $30,000', notes: 'Vanta, Drata, Sprinto, etc.' },
  { item: 'Training & Awareness', range: '$3,000 - $10,000', notes: 'All staff + specialized' },
  { item: 'Stage 1 + Stage 2 Audit', range: '$12,000 - $35,000', notes: 'Accredited registrar' },
  { item: 'Surveillance Audits (Annual)', range: '$6,000 - $15,000', notes: 'Years 2 and 3' },
];

export const iso27001Tools = [
  {
    id: 'readiness',
    href: '/soc-2-readiness-calculator?framework=iso27001',
    title: 'ISMS Readiness Calculator',
    summary: 'Assess your current security posture against ISO 27001:2022 requirements.',
    cta: 'Start Assessment',
  },
  {
    id: 'gap',
    href: '/soc-2-vs-iso-27001',
    title: 'SOC 2 → ISO 27001 Gap Calculator',
    summary: 'Already have SOC 2? See the incremental effort to achieve ISO 27001.',
    cta: 'Calculate Gap',
  },
  {
    id: 'checklist',
    href: '/iso-27001-checklist',
    title: 'ISO 27001 Checklist',
    summary: 'Step-by-step guide covering Clauses 4-10 and all 93 Annex A controls.',
    cta: 'View Checklist',
  },
  {
    id: 'cost',
    href: '/soc-2-readiness-calculator?framework=iso27001&section=budget',
    title: 'Certification Cost Estimator',
    summary: 'Get a tailored estimate based on your org size and existing controls.',
    cta: 'Estimate Costs',
  },
];

export const iso27001Guides = [
  { href: '/iso-27001-checklist', title: 'ISO 27001 Checklist', summary: 'Complete clause-by-clause and Annex A control mapping.' },
  { href: '/soc-2-vs-iso-27001', title: 'SOC 2 vs ISO 27001', summary: 'Compare frameworks and calculate bridging effort.' },
  { href: '/iso-27001/controls', title: 'Annex A Controls Guide', summary: 'Deep dive into all 93 controls across 4 themes.' },
  { href: '/iso-27001/timeline', title: 'Certification Timeline', summary: 'Plan your 6-12 month path to certification.' },
  { href: '/iso-27001/auditor-selection', title: 'Choosing a Registrar', summary: 'How to select an accredited certification body.' },
  { href: '/iso-27001/vs-soc-2', title: 'Dual Compliance Strategy', summary: 'Achieve both ISO 27001 and SOC 2 efficiently.' },
];

export const iso27001Industries = [
  { name: 'SaaS', slug: 'saas', summary: 'Cloud security, multi-tenancy, and SDLC controls emphasis.', bg: 'bg-white' },
  { name: 'Fintech', slug: 'fintech', summary: 'Cryptography, transaction integrity, and regulatory mapping.', bg: 'bg-slate-50' },
  { name: 'Healthcare', slug: 'healthcare', summary: 'PHI protection, HIPAA alignment, and breach notification.', bg: 'bg-slate-50' },
  { name: 'Enterprise', slug: 'enterprise', summary: 'Complex integrations, supplier management, and global compliance.', bg: 'bg-white' },
];

export const iso27001Roles = [
  { name: 'CTO', slug: 'cto', focus: 'Technical architecture, evidence automation, and control implementation.' },
  { name: 'CISO', slug: 'ciso', focus: 'Risk management, governance oversight, and audit coordination.' },
  { name: 'Founder', slug: 'founders', focus: 'Business case, resource allocation, and certification ROI.' },
  { name: 'Compliance Manager', slug: 'compliance-manager', focus: 'Documentation, internal audits, and continuous improvement.' },
  { name: 'DevOps', slug: 'devops', focus: 'Infrastructure security, logging, and configuration management.' },
];

export const iso27001FAQs = [
  {
    question: 'What is ISO 27001 certification?',
    answer: 'ISO 27001 is an internationally recognized standard for Information Security Management Systems (ISMS). Certification demonstrates that your organization has implemented a systematic approach to managing sensitive information, ensuring confidentiality, integrity, and availability.',
  },
  {
    question: 'How long does ISO 27001 certification take?',
    answer: 'Typically 6-12 months from gap assessment to certification, depending on organizational complexity, existing security maturity, and resource allocation. Organizations with existing SOC 2 can often accelerate this to 4-6 months.',
  },
  {
    question: 'What is the difference between ISO 27001:2013 and ISO 27001:2022?',
    answer: 'The 2022 update restructured Annex A from 114 controls in 14 domains to 93 controls in 4 themes (Organizational, People, Physical, Technological). It also added 11 new controls addressing cloud security, threat intelligence, and data masking.',
  },
  {
    question: 'Is ISO 27001 mandatory?',
    answer: 'ISO 27001 is voluntary, but increasingly required by enterprise customers, especially in Europe. Many government contracts and regulated industries effectively mandate it. It is often a prerequisite for doing business in financial services and healthcare.',
  },
  {
    question: 'How does ISO 27001 compare to SOC 2?',
    answer: 'ISO 27001 is a certifiable standard with a prescriptive control framework (Annex A), while SOC 2 is an attestation based on Trust Service Criteria. ISO 27001 is preferred in Europe and government, while SOC 2 is more common for US SaaS companies. Many organizations pursue both.',
  },
  {
    question: 'What are the 93 controls in ISO 27001:2022?',
    answer: 'The 93 controls are organized into 4 themes: Organizational (37 controls), People (8 controls), Physical (14 controls), and Technological (34 controls). These cover everything from access control and cryptography to supplier relationships and incident management.',
  },
];

export const iso27001PseoData = {
  roles: [
    { slug: 'cto', name: 'CTO', plural: 'CTOs' },
    { slug: 'ciso', name: 'CISO', plural: 'CISOs' },
    { slug: 'founders', name: 'Founder', plural: 'Founders' },
    { slug: 'compliance-manager', name: 'Compliance Manager', plural: 'Compliance Managers' },
    { slug: 'devops', name: 'DevOps Engineer', plural: 'DevOps Engineers' },
    { slug: 'security-engineer', name: 'Security Engineer', plural: 'Security Engineers' },
    { slug: 'it-manager', name: 'IT Manager', plural: 'IT Managers' },
    { slug: 'ceo', name: 'CEO', plural: 'CEOs' },
    { slug: 'risk-officer', name: 'Risk Officer', plural: 'Risk Officers' },
    { slug: 'product-manager', name: 'Product Manager', plural: 'Product Managers' },
  ],
  industries: [
    { slug: 'saas', name: 'SaaS' },
    { slug: 'fintech', name: 'Fintech' },
    { slug: 'healthcare', name: 'Healthcare' },
    { slug: 'ai-ml', name: 'AI/ML' },
    { slug: 'enterprise', name: 'Enterprise' },
    { slug: 'government', name: 'Government' },
    { slug: 'ecommerce', name: 'E-commerce' },
    { slug: 'edtech', name: 'EdTech' },
    { slug: 'proptech', name: 'PropTech' },
    { slug: 'hr-tech', name: 'HR Tech' },
    { slug: 'logitech', name: 'LogiTech' },
    { slug: 'martech', name: 'MarTech' },
    { slug: 'cybersecurity', name: 'Cybersecurity' },
    { slug: 'cloud-computing', name: 'Cloud Computing' },
    { slug: 'gaming', name: 'Gaming' },
    { slug: 'insurtech', name: 'InsurTech' },
    { slug: 'legaltech', name: 'LegalTech' },
    { slug: 'biotech', name: 'BioTech' },
    { slug: 'cleantech', name: 'CleanTech' },
  ],
  decisions: [
    { slug: 'cost', name: 'Cost' },
    { slug: 'timeline', name: 'Timeline' },
    { slug: 'auditor-selection', name: 'Auditor Selection' },
    { slug: 'readiness', name: 'Readiness' },
    { slug: 'checklist', name: 'Checklist' },
    { slug: 'roi', name: 'ROI' },
  ],
};
