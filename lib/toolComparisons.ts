export interface PricingData {
  toolAStarting: string;
  toolBStarting: string;
  toolACostDrivers: string;
  toolBCostDrivers: string;
  toolAHiddenCosts: string;
  toolBHiddenCosts: string;
  toolAAuditorIncluded: boolean;
  toolBAuditorIncluded: boolean;
  summary: string;
}

export interface ToolComparison {
  slug: string;
  title: string;
  description: string;
  toolA: { name: string; logo?: string };
  toolB: { name: string; logo?: string };
  tableRows: { feature: string; toolAValue: string; toolBValue: string }[];
  verdict: string;
  faqs: { question: string; answer: string }[];
  pricing?: PricingData;
}

export const toolComparisons: ToolComparison[] = [
  {
    slug: 'vanta-vs-drata',
    title: 'Vanta vs Drata: Which Compliance Automation Tool is Better in 2026?',
    description: 'A deep dive comparison into the two giants of compliance automation. We compare features, integrations, pricing models, and audit support.',
    toolA: { name: 'Vanta' },
    toolB: { name: 'Drata' },
    tableRows: [
      { feature: 'Primary Focus', toolAValue: 'Fast SOC 2, ease of use, broad integrations', toolBValue: 'Enterprise scale, deep automation, custom controls' },
      { feature: 'Supported Frameworks', toolAValue: 'SOC 2, ISO 27001, HIPAA, GDPR, PCI + 20 more', toolBValue: 'SOC 2, ISO 27001, HIPAA, GDPR, NIST + 15 more' },
      { feature: 'Integration Depth', toolAValue: '300+ pre-built integrations with deep alerting', toolBValue: '150+ deep integrations with custom API support' },
      { feature: 'Audit Support', toolAValue: 'Vanta-vetted auditors with fixed-fee options', toolBValue: 'Drata-vetted auditors with strong reporting' },
      { feature: 'User Interface', toolAValue: 'Clean, task-oriented, high velocity', toolBValue: 'Robust, policy-first, enterprise dashboard' },
    ],
    verdict: 'Vanta is generally better for startups wanting speed and simplicity. Drata is preferred by enterprises needing deep customization and custom control mapping.',
    faqs: [
      { question: 'Is Vanta cheaper than Drata?', answer: 'Pricing varies based on employee count and frameworks. Vanta often has lower entry points for early startups.' },
      { question: 'Can I switch from Vanta to Drata?', answer: 'Yes, but evidence migration can be manual. Both tools offer some export capabilities.' },
    ],
    pricing: {
      toolAStarting: '$10,000 - $15,000/year',
      toolBStarting: '$15,000 - $25,000/year',
      toolACostDrivers: 'Employee count, number of frameworks, add-on modules',
      toolBCostDrivers: 'Employee count, custom controls, enterprise features',
      toolAHiddenCosts: 'Separate auditor fee ($8,000 - $20,000)',
      toolBHiddenCosts: 'Separate auditor fee ($10,000 - $25,000)',
      toolAAuditorIncluded: false,
      toolBAuditorIncluded: false,
      summary: 'Vanta typically has lower entry pricing for startups under 50 employees. Drata pricing scales more aggressively but includes more enterprise features.',
    },
  },
  {
    slug: 'secureframe-vs-vanta',
    title: 'Secureframe vs Vanta: Choosing the Right SOC 2 Partner',
    description: 'Comparing Secureframe’s expert-led approach with Vanta’s automation-first platform.',
    toolA: { name: 'Secureframe' },
    toolB: { name: 'Vanta' },
    tableRows: [
      { feature: 'Onboarding', toolAValue: 'White-glove, expert-guided setup', toolBValue: 'Self-serve, automation-driven setup' },
      { feature: 'Expert Access', toolAValue: 'Dedicated compliance managers included', toolBValue: 'Available as an add-on or via partners' },
      { feature: 'Platform Maturity', toolAValue: 'Solid automation with focus on accuracy', toolBValue: 'Industry leader with most integrations' },
    ],
    verdict: 'Secureframe is great for teams that want more "hand-holding" during the audit process. Vanta is best for teams that want to automate everything themselves.',
    faqs: [
      { question: 'Does Secureframe include auditors?', answer: 'They have a network of partner auditors but they are separate entities.' },
    ],
    pricing: {
      toolAStarting: '$12,000 - $18,000/year',
      toolBStarting: '$10,000 - $15,000/year',
      toolACostDrivers: 'Employee count, dedicated compliance manager hours',
      toolBCostDrivers: 'Employee count, number of frameworks, add-on modules',
      toolAHiddenCosts: 'Separate auditor fee ($8,000 - $18,000)',
      toolBHiddenCosts: 'Separate auditor fee ($8,000 - $20,000)',
      toolAAuditorIncluded: false,
      toolBAuditorIncluded: false,
      summary: 'Secureframe includes more hands-on support in base pricing. Vanta has lower entry points but expert support is often an add-on.',
    },
  },
  {
    slug: 'drata-vs-secureframe',
    title: 'Drata vs Secureframe: Which is Best for Your Audit?',
    description: 'A battle of the heavyweights. We compare Drata’s technical automation with Secureframe’s personalized guidance.',
    toolA: { name: 'Drata' },
    toolB: { name: 'Secureframe' },
    tableRows: [
      { feature: 'Automation Depth', toolAValue: 'Continuous monitoring across 100+ tests', toolBValue: 'Strong automation with focus on readiness' },
      { feature: 'Policy Customization', toolAValue: 'Extremely flexible, custom control mapping', toolBValue: 'Standardized templates with expert review' },
      { feature: 'Support Model', toolAValue: 'Technical account managers for enterprise', toolBValue: 'Compliance managers assigned to every account' },
      { feature: 'Best For', toolAValue: 'Complex tech stacks and scaling teams', toolBValue: 'Teams needing guided compliance support' },
    ],
    verdict: 'Choose Drata if you have a complex technical environment and want deep control. Choose Secureframe if you want a partner to guide you through every step of the audit.',
    faqs: [
      { question: 'Is Drata more expensive than Secureframe?', answer: 'Generally, Drata is priced for the enterprise and can be more expensive, while Secureframe offers competitive packages for growth-stage startups.' },
    ],
    pricing: {
      toolAStarting: '$15,000 - $25,000/year',
      toolBStarting: '$12,000 - $18,000/year',
      toolACostDrivers: 'Employee count, custom controls, enterprise features, multi-framework',
      toolBCostDrivers: 'Employee count, dedicated compliance manager hours',
      toolAHiddenCosts: 'Separate auditor fee ($10,000 - $25,000)',
      toolBHiddenCosts: 'Separate auditor fee ($8,000 - $18,000)',
      toolAAuditorIncluded: false,
      toolBAuditorIncluded: false,
      summary: 'Drata commands premium pricing for enterprise-grade automation. Secureframe is more competitive for growth-stage companies needing guided support.',
    },
  },
  {
    slug: 'thoropass-vs-vanta',
    title: 'Thoropass vs Vanta: The "All-in-One" vs Marketplace Debate',
    description: 'Should you bundle your software and auditor together? We compare Thoropass’s combined model with Vanta’s platform approach.',
    toolA: { name: 'Thoropass' },
    toolB: { name: 'Vanta' },
    tableRows: [
      { feature: 'Audit Model', toolAValue: 'Bundled: Platform + Auditor in one contract', toolBValue: 'Marketplace: Platform + Choice of 3rd party auditor' },
      { feature: 'Audit Friction', toolAValue: 'Lowest: Auditor uses the same tool you do', toolBValue: 'Low: Auditor logs into Vanta to review evidence' },
      { feature: 'Objectivity', toolAValue: 'Integrated internal audit team', toolBValue: 'Strict 3rd party independence' },
      { feature: 'Pricing', toolAValue: 'Single predictable fee for everything', toolBValue: 'Platform fee + separate Auditor fee' },
    ],
    verdict: 'Thoropass (formerly Laika) is the clear winner for teams that want the simplest possible experience with no separate auditor search. Vanta is better if you want to choose your own auditor or already have one.',
    faqs: [
      { question: 'Does Thoropass provide the final SOC 2 report?', answer: 'Yes, they handle the entire process from readiness to the final signed report through their integrated audit firm.' },
    ],
    pricing: {
      toolAStarting: '$20,000 - $35,000/year (all-inclusive)',
      toolBStarting: '$10,000 - $15,000/year (platform only)',
      toolACostDrivers: 'Company size, framework complexity, audit type',
      toolBCostDrivers: 'Employee count, number of frameworks, add-on modules',
      toolAHiddenCosts: 'None - auditor included in price',
      toolBHiddenCosts: 'Separate auditor fee ($8,000 - $20,000)',
      toolAAuditorIncluded: true,
      toolBAuditorIncluded: false,
      summary: 'Thoropass appears more expensive upfront but includes auditor fees. Total cost of ownership is often comparable when factoring in Vanta + separate auditor.',
    },
  },
  {
    slug: 'sprinto-vs-vanta',
    title: 'Sprinto vs Vanta: The Tech-Native Alternative',
    description: 'Sprinto is challenging Vanta with deeper automation and faster onboarding. See how they stack up for SaaS startups.',
    toolA: { name: 'Sprinto' },
    toolB: { name: 'Vanta' },
    tableRows: [
      { feature: 'Automation Focus', toolAValue: 'Highly automated evidence collection', toolBValue: 'Broad integration ecosystem' },
      { feature: 'Onboarding Speed', toolAValue: 'Can get ready for audit in < 2 weeks', toolBValue: 'Standard 4-8 week readiness period' },
      { feature: 'Custom Frameworks', toolAValue: 'Easy to build custom security programs', toolBValue: 'Focus on standard frameworks (SOC 2, ISO)' },
      { feature: 'Pricing', toolAValue: 'Highly competitive for early-stage SaaS', toolBValue: 'Premium pricing as the market leader' },
    ],
    verdict: 'Sprinto is an excellent choice for fast-moving SaaS startups that want the highest degree of automation possible. Vanta remains the gold standard for brand recognition and integration breadth.',
    faqs: [
      { question: 'Is Sprinto suitable for enterprise?', answer: 'Sprinto is rapidly expanding into enterprise, but Vanta currently has more experience with 1000+ employee organizations.' },
    ],
    pricing: {
      toolAStarting: '$8,000 - $12,000/year',
      toolBStarting: '$10,000 - $15,000/year',
      toolACostDrivers: 'Employee count, framework selection, automation level',
      toolBCostDrivers: 'Employee count, number of frameworks, add-on modules',
      toolAHiddenCosts: 'Separate auditor fee ($6,000 - $15,000)',
      toolBHiddenCosts: 'Separate auditor fee ($8,000 - $20,000)',
      toolAAuditorIncluded: false,
      toolBAuditorIncluded: false,
      summary: 'Sprinto offers aggressive startup pricing, often 20-30% below Vanta for comparable features. Best value for early-stage SaaS companies.',
    },
  },
  {
    slug: 'drata-vs-thoropass',
    title: 'Drata vs Thoropass: Enterprise Automation vs Managed Compliance',
    description: 'Comparing the most powerful automation platform with the most comprehensive managed service.',
    toolA: { name: 'Drata' },
    toolB: { name: 'Thoropass' },
    tableRows: [
      { feature: 'Primary Value', toolAValue: 'Continuous monitoring and automation', toolBValue: 'Guaranteed audit success and simplicity' },
      { feature: 'Control Ownership', toolAValue: 'You manage controls via their platform', toolBValue: 'They guide you through control implementation' },
      { feature: 'Audit Experience', toolAValue: 'Platform-agnostic (bring any auditor)', toolBValue: 'Integrated (use their auditors)' },
    ],
    verdict: 'Drata is for the "Power User" who wants to build a world-class security program. Thoropass is for the "Efficiency User" who wants to get the SOC 2 badge with minimal distraction from core business.',
    faqs: [
      { question: 'Can I use my own auditor with Thoropass?', answer: 'Thoropass is designed to be used with their own audit partners to ensure the smoothest experience.' },
    ],
    pricing: {
      toolAStarting: '$15,000 - $25,000/year (platform only)',
      toolBStarting: '$20,000 - $35,000/year (all-inclusive)',
      toolACostDrivers: 'Employee count, custom controls, enterprise features',
      toolBCostDrivers: 'Company size, framework complexity, audit type',
      toolAHiddenCosts: 'Separate auditor fee ($10,000 - $25,000)',
      toolBHiddenCosts: 'None - auditor included in price',
      toolAAuditorIncluded: false,
      toolBAuditorIncluded: true,
      summary: 'Drata + auditor often costs more than Thoropass all-in for first-time SOC 2. Thoropass wins on simplicity; Drata wins on long-term flexibility.',
    },
  },
  {
    slug: 'vanta-vs-auditboard',
    title: 'Vanta vs AuditBoard: Startup Speed vs Enterprise GRC',
    description: 'When does a company outgrow Vanta? We compare the leader in startup compliance with the leader in Enterprise GRC.',
    toolA: { name: 'Vanta' },
    toolB: { name: 'AuditBoard' },
    tableRows: [
      { feature: 'Target Market', toolAValue: 'Startups and Mid-Market SaaS', toolBValue: 'Fortune 500 and large enterprises' },
      { feature: 'Scope', toolAValue: 'Security Compliance (SOC 2, ISO)', toolBValue: 'Full GRC (Internal Audit, SOX, ESG, Risk)' },
      { feature: 'Implementation', toolAValue: 'Hours to days', toolBValue: 'Months' },
      { feature: 'Automation', toolAValue: 'API-driven evidence collection', toolBValue: 'Workflow-driven risk management' },
    ],
    verdict: 'Vanta is the right choice for 99% of tech companies under 1,000 employees. AuditBoard is for global enterprises that need to manage complex internal audits and SOX compliance across multiple business units.',
    faqs: [
      { question: 'Do people switch from Vanta to AuditBoard?', answer: 'Yes, typically during an IPO or when internal audit becomes a dedicated department with 5+ full-time employees.' },
    ],
    pricing: {
      toolAStarting: '$10,000 - $15,000/year',
      toolBStarting: '$50,000 - $150,000+/year',
      toolACostDrivers: 'Employee count, number of frameworks, add-on modules',
      toolBCostDrivers: 'Number of users, modules (SOX, Risk, ESG), implementation scope',
      toolAHiddenCosts: 'Separate auditor fee ($8,000 - $20,000)',
      toolBHiddenCosts: 'Implementation services ($25,000 - $100,000+)',
      toolAAuditorIncluded: false,
      toolBAuditorIncluded: false,
      summary: 'Vanta is 5-10x cheaper than AuditBoard. AuditBoard is only justified for companies with dedicated internal audit teams and complex GRC needs.',
    },
  },
];

export function getToolComparison(slug: string) {
  return toolComparisons.find((c) => c.slug === slug);
}
