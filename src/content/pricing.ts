export interface PricingTier {
  name: string;
  price?: string;
  description: string;
  features: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PricingDriver {
  title: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface HiddenCost {
  title: string;
  description: string;
}

export interface ComparisonRow {
  platform: string;
  startingPrice: string;
  auditorIncluded: boolean;
  targetMarket: string;
}

export interface ToolPricing {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  category: string;
  startingPrice: string;
  priceModel: string;
  typicalRange: string;
  targetMarket: string;
  hiddenCosts: string;
  detailedHiddenCosts?: HiddenCost[];
  negotiationTips?: (string | FeatureItem)[];
  pricingDrivers?: PricingDriver[];
  featuresOverview?: (string | FeatureItem)[];
  compareData?: ComparisonRow[];
  implementationTimeline: string;
  integrationsCount: string;
  tiers: PricingTier[];
  pros: string[];
  cons: string[];
  faqs: FAQ[];
  bestFor: string;
  risclensVerdict: string;
  website: string;
}

export const toolPricing: ToolPricing[] = [
  {
    id: 'vanta',
    name: 'Vanta',
    slug: 'vanta',
    category: 'Trust Management & Compliance platform',
    startingPrice: '$10,000',
    priceModel: 'Flat-fee + Modules',
    typicalRange: '$7,500 – $45,000 / year',
    targetMarket: 'Startups to Mid-Market SaaS',
    hiddenCosts: 'Auditor fees ($5k-$15k), Premium support',
    detailedHiddenCosts: [
      { title: 'External Auditor Fees', description: 'Vanta does not include the audit. Budget $5k-$15k for a CPA firm.' },
      { title: 'Additional Modules', description: 'HIPAA, GDPR, and PCI modules often cost extra.' },
      { title: 'Premium Support Surcharge', description: 'Priority support and dedicated success managers may require a higher tier.' }
    ],
    negotiationTips: [
      'Ask about "Auditor Connect" discounts if using one of their preferred partners.',
      'Check for end-of-quarter promotions, especially in June and December.',
      'Inquire about multi-framework bundles if you need more than just SOC 2.'
    ],
    pricingDrivers: [
      { title: 'Employee Count', description: 'Pricing scales based on your total headcount as it impacts monitoring complexity.' },
      { title: 'Framework Selection', description: 'Each additional framework (ISO 27001, HIPAA, etc.) adds to the annual fee.' },
      { title: 'Infrastructure Complexity', description: 'Deep AWS/GCP/Azure integrations may influence the tier required.' },
      { title: 'Auditor Fees (Separate)', description: 'Remember to budget separately for auditor fees, typically $8,000-$25,000 for SOC 2 Type II.' }
    ],
    featuresOverview: [
      'Automated evidence collection',
      'Security awareness training',
      'Policy templates & builder',
      'Risk management module',
      'Trust Center (Public security page)',
      'Vulnerability management'
    ],
    compareData: [
      { platform: 'Vanta', startingPrice: '$7,500/year', auditorIncluded: false, targetMarket: 'Startups and Mid-Market SaaS' },
      { platform: 'Drata', startingPrice: '$6,000/year', auditorIncluded: false, targetMarket: 'Mid-Market and Enterprise' },
      { platform: 'Secureframe', startingPrice: '$5,000/year', auditorIncluded: false, targetMarket: 'Growth-Stage Startups' },
      { platform: 'Sprinto', startingPrice: '$4,000/year', auditorIncluded: false, targetMarket: 'Early-Stage SaaS Startups' }
    ],
    implementationTimeline: '4-8 weeks',
    integrationsCount: '300+',
    tiers: [
      {
        name: 'Starter',
        price: '$7,500+',
        description: 'For early-stage startups needing SOC 2.',
        features: ['Automated evidence collection', 'Security awareness training', 'Policy templates']
      },
      {
        name: 'Growth',
        price: '$15,000+',
        description: 'For scaling companies with multiple frameworks.',
        features: ['Custom controls', 'API access', 'Risk management module']
      },
      {
        name: 'Enterprise',
        price: 'Contact Sales',
        description: 'Global compliance and trust management.',
        features: ['Trust Center Premium', 'Advanced RBAC', 'Dedicated Support']
      }
    ],
    pros: ['Deepest automation library', 'Excellent UI/UX', 'Large auditor network'],
    cons: ['Premium pricing', 'Additional modules can get expensive', 'Complex for very small teams'],
    faqs: [
      { question: 'Does Vanta include the audit?', answer: 'No, Vanta provides the software to get ready for the audit. You must hire a 3rd party CPA firm for the actual SOC 2 report.' },
      { question: 'How long does Vanta take to implement?', answer: 'Most companies are audit-ready in 4-6 weeks.' }
    ],
    bestFor: 'automate security monitoring and compliance workflows',
    risclensVerdict: 'Vanta is the gold standard for automation. It is the most expensive but typically saves the most time for engineering teams.',
    website: 'https://vanta.com'
  },
  {
    id: 'drata',
    name: 'Drata',
    slug: 'drata',
    category: 'Continuous Control Monitoring platform',
    startingPrice: '$15,000',
    priceModel: 'Flat-fee',
    typicalRange: '$6,000 – $40,000 / year',
    targetMarket: 'Security-conscious Tech Companies',
    hiddenCosts: 'External audit fees, HIPAA/PCI modules',
    detailedHiddenCosts: [
      { title: 'External Auditor Fees', description: 'Audit is separate; expect to pay $7k-$15k to a partner firm.' },
      { title: 'Advanced Automation Modules', description: 'Specific deep integrations or custom automation workflows may require an add-on.' },
      { title: 'Premium Onboarding', description: 'White-glove implementation support is often an additional cost.' }
    ],
    negotiationTips: [
      'Ask for the "Continuous Monitoring" discount if committing to a multi-year deal.',
      'Inquire about bundled pricing if you need both SOC 2 and ISO 27001.',
      'End-of-quarter discounts are common, particularly in Q4 (December).'
    ],
    pricingDrivers: [
      { title: 'Asset Count', description: "Drata's pricing often considers the number of cloud assets and endpoints being monitored." },
      { title: 'Framework Complexity', description: 'Adding more frameworks increases the price per framework as more automated controls are deployed.' },
      { title: 'Auditor Fees (Separate)', description: 'Budget $8,000-$20,000 for your independent audit report.' }
    ],
    featuresOverview: [
      'Automated control monitoring',
      'Risk assessment engine',
      'Trust Center (Real-time security report)',
      'Agent-based endpoint monitoring',
      'Policy builder and manager',
      'Auditor portal'
    ],
    compareData: [
      { platform: 'Drata', startingPrice: '$6,000/year', auditorIncluded: false, targetMarket: 'Mid-Market and Enterprise' },
      { platform: 'Vanta', startingPrice: '$7,500/year', auditorIncluded: false, targetMarket: 'Startups and Mid-Market SaaS' },
      { platform: 'Secureframe', startingPrice: '$5,000/year', auditorIncluded: false, targetMarket: 'Growth-Stage Startups' },
      { platform: 'Sprinto', startingPrice: '$4,000/year', auditorIncluded: false, targetMarket: 'Early-Stage SaaS Startups' }
    ],
    implementationTimeline: '6-10 weeks',
    integrationsCount: '150+',
    tiers: [
      {
        name: 'Launch',
        price: '$6,000+',
        description: 'Tailored for startups getting their first SOC 2.',
        features: ['Automated monitoring', 'Asset discovery', 'Basic policy set']
      },
      {
        name: 'Growth',
        price: '$12,000+',
        description: 'For companies with multiple frameworks and assets.',
        features: ['Advanced RBAC', 'Custom frameworks', 'API access']
      },
      {
        name: 'Enterprise',
        price: 'Contact Sales',
        description: 'Global control monitoring for scale.',
        features: ['SAML/SSO', 'Custom evidence requests', 'Premium support']
      }
    ],
    pros: ['Robust agent-based monitoring', 'Excellent customer success', 'Strong ISO 27001 support'],
    cons: ['Pricing is opaque for larger tiers', 'Implementation can be rigorous'],
    faqs: [
      { question: 'Is Drata better than Vanta?', answer: 'Drata is often preferred by more technical teams who want deeper infrastructure monitoring and more custom framework options.' }
    ],
    bestFor: 'maintain continuous visibility into security controls',
    risclensVerdict: 'Drata is a close competitor to Vanta with a slightly different approach to monitoring. Often preferred by companies with complex infrastructure.',
    website: 'https://drata.com'
  },
  {
    id: 'secureframe',
    name: 'Secureframe',
    slug: 'secureframe',
    category: 'Compliance Automation platform',
    startingPrice: '$12,000',
    priceModel: 'Flat-fee',
    typicalRange: '$5,000 – $30,000 / year',
    targetMarket: 'Early to Mid-stage Startups',
    hiddenCosts: 'Implementation fee (sometimes waived)',
    detailedHiddenCosts: [
      { title: 'Implementation Fee', description: 'One-time setup fee of $1,000-$3,000 (often negotiable).' },
      { title: 'Auditor Engagement', description: 'External audit fees are not included in the platform subscription.' }
    ],
    negotiationTips: [
      'Secureframe is often willing to price-match against Vanta or Drata for similar tiers.',
      'Ask for "Expert Onboarding" to be included for free in the first year.',
      'Check for startup discounts if you are under 25 employees or have raised less than $5M.'
    ],
    pricingDrivers: [
      { title: 'Onboarding Support', description: 'The level of dedicated expert support during your first audit can impact the base price.' },
      { title: 'Framework Selection', description: 'Adding HIPAA or PCI-DSS typically adds a 25-30% surcharge to the base SOC 2 price.' },
      { title: 'Auditor Fees (Separate)', description: 'Budget $7,000-$15,000 separately for your independent audit.' }
    ],
    featuresOverview: [
      'Automated evidence collection',
      'Security training for employees',
      'Policy library',
      'Vulnerability scanning',
      'Vendor risk management',
      { title: 'Expert-led onboarding', description: 'Dedicated experts guide you through the initial audit setup.' }
    ],
    compareData: [
      { platform: 'Secureframe', startingPrice: '$5,000/year', auditorIncluded: false, targetMarket: 'Growth-Stage Startups' },
      { platform: 'Vanta', startingPrice: '$7,500/year', auditorIncluded: false, targetMarket: 'Startups and Mid-Market SaaS' },
      { platform: 'Drata', startingPrice: '$6,000/year', auditorIncluded: false, targetMarket: 'Mid-Market and Enterprise' },
      { platform: 'Sprinto', startingPrice: '$4,000/year', auditorIncluded: false, targetMarket: 'Early-Stage SaaS Startups' }
    ],
    implementationTimeline: '4-6 weeks',
    integrationsCount: '100+',
    tiers: [
      {
        name: 'Essential',
        price: '$5,000+',
        description: 'Entry-level compliance for small teams.',
        features: ['Core integrations', 'Policy library', 'Employee onboarding']
      },
      {
        name: 'Professional',
        price: '$10,000+',
        description: 'Scale your compliance program.',
        features: ['Premium integrations', 'Risk assessment', 'Vendor management']
      },
      {
        name: 'Enterprise',
        price: 'Contact Sales',
        description: 'Full trust and compliance for scale.',
        features: ['Custom controls', 'Dedicated success manager', 'SLA guarantees']
      }
    ],
    pros: ['Highly competitive startup pricing', 'Includes security training', 'Expert-led onboarding'],
    cons: ['Automation depth is slightly behind Vanta', 'User interface can be dense'],
    faqs: [],
    bestFor: 'accelerate audit readiness for scaling startups',
    risclensVerdict: 'Secureframe offers the best balance of price and features for early-stage founders.',
    website: 'https://secureframe.com'
  },
  {
    id: 'hyperproof',
    name: 'Hyperproof',
    slug: 'hyperproof',
    category: 'Enterprise Compliance platform',
    startingPrice: '$15,000',
    priceModel: 'Professional / Business / Enterprise',
    typicalRange: '$15,000 – $60,000 / year',
    targetMarket: 'Mature Security Teams',
    hiddenCosts: 'Implementation consulting ($10k)',
    detailedHiddenCosts: [
      { title: 'Implementation Fee', description: 'Standard $10,000 setup fee is common, though negotiable for multi-year deals.' },
      { title: 'Module-Based Billing', description: 'Risk management and specific framework expansions are billed as separate modules.' },
      { title: 'Professional Services', description: 'Custom framework mapping and training are often paid service engagements.' }
    ],
    negotiationTips: [
      'Present competing GRC quotes (e.g., SmartSuite) to unlock 30%+ discounting.',
      'Request an implementation fee waiver in exchange for a 2 or 3-year commitment.',
      'End-of-month and end-of-year signatures can yield discounts up to 50%.'
    ],
    pricingDrivers: [
      { title: 'Compliance Workload', description: 'Pricing flexes based on the number of frameworks and controls being managed.' },
      { title: 'Number of Modules', description: 'Each additional module (Risk, Vendor, Audit) adds incrementally to the subscription.' },
      { title: 'Service Level', description: 'Premium onboarding and dedicated support hours are tiered by plan level.' },
      { title: 'Auditor Fees (Separate)', description: 'Budget $10,000-$25,000 for your independent auditor.' }
    ],
    featuresOverview: [
      'Multi-framework mapping',
      'Automated evidence management',
      'Cross-walking controls',
      'Risk register & assessment',
      'Audit management workflow',
      'Unlimited user licenses'
    ],
    compareData: [
      { platform: 'Hyperproof', startingPrice: '$15,000/year', auditorIncluded: false, targetMarket: 'Enterprise GRC' },
      { platform: 'AuditBoard', startingPrice: '$50,000/year', auditorIncluded: false, targetMarket: 'Fortune 500' },
      { platform: 'Vanta', startingPrice: '$10,000/year', auditorIncluded: false, targetMarket: 'Mid-Market' }
    ],
    implementationTimeline: '8-12 weeks',
    integrationsCount: '100+',
    tiers: [
      {
        name: 'Professional',
        price: '$15,000+',
        description: 'For teams managing 2-5 frameworks.',
        features: ['Core framework mapping', 'Evidence management', 'Unlimited users']
      },
      {
        name: 'Business',
        price: 'Contact Sales',
        description: 'For scaling security programs.',
        features: ['Risk management module', 'Advanced automation', 'Priority support']
      },
      {
        name: 'Enterprise',
        price: 'Contact Sales',
        description: 'Global GRC management.',
        features: ['Custom integrations', 'Dedicated success manager', 'SLA guarantees']
      }
    ],
    pros: ['Excellent for multi-framework mapping', 'Auditor-agnostic', 'Highly flexible'],
    cons: ['Not as "automated" as Vanta', 'Steeper learning curve'],
    faqs: [],
    bestFor: 'manage complex, overlapping compliance requirements',
    risclensVerdict: 'Hyperproof is the best choice for teams that have already outgrown basic automation and need a serious GRC tool.',
    website: 'https://hyperproof.io'
  },
  {
    id: 'onetrust',
    name: 'OneTrust',
    slug: 'onetrust',
    category: 'Privacy & Compliance behemoth',
    startingPrice: '$10,000',
    priceModel: 'Module-based + Users',
    typicalRange: '$10,000 – $200,000+ / year',
    targetMarket: 'Global Enterprises',
    hiddenCosts: 'Professional services, Module sprawl',
    detailedHiddenCosts: [
      { title: 'Professional Services', description: 'Implementation for complex modules often requires $25k+ in consulting fees.' },
      { title: 'Module Sprawl', description: 'Buying individual modules (GDPR, CCPA, Ethics) can lead to exponential cost increases.' },
      { title: 'Renewal Escalators', description: 'Watch for 5-10% annual price increases in multi-year contracts.' }
    ],
    negotiationTips: [
      'Push for bundled module pricing rather than paying for each feature à la carte.',
      'Request a fixed-price implementation SOW to avoid "hourly rate" creep.',
      'Leverage competitive threats from Big 4 consulting GRC tools.'
    ],
    pricingDrivers: [
      { title: 'Module Selection', description: 'The number of active modules (Privacy, GRC, ESG) is the primary driver.' },
      { title: 'Headcount/Users', description: 'Pricing typically scales based on the number of administrative and end-users.' },
      { title: 'Geographic Scope', description: 'Support for multiple jurisdictions and languages triggers higher tiers.' },
      { title: 'Auditor Fees (Separate)', description: 'OneTrust does not include audit fees; budget separately for certification.' }
    ],
    featuresOverview: [
      'Global privacy management',
      'Automated data mapping',
      'Ethics & compliance module',
      'Third-party risk management',
      'ESG reporting suite',
      'Consent management'
    ],
    compareData: [
      { platform: 'OneTrust', startingPrice: '$10k/year', auditorIncluded: false, targetMarket: 'Global Enterprise' },
      { platform: 'AuditBoard', startingPrice: '$50k/year', auditorIncluded: false, targetMarket: 'Fortune 500' },
      { platform: 'Vanta', startingPrice: '$10k/year', auditorIncluded: false, targetMarket: 'SaaS SME' }
    ],
    implementationTimeline: '3-9 months',
    integrationsCount: '500+',
    tiers: [
      {
        name: 'Professional',
        price: 'Contact Sales',
        description: 'Essential privacy and security.',
        features: ['GDPR/CCPA compliance', 'Security assurance', 'Standard support']
      },
      {
        name: 'Enterprise',
        price: 'Contact Sales',
        description: 'Global GRC and trust management.',
        features: ['Multi-jurisdiction support', 'Vendor risk module', 'Dedicated CSM']
      }
    ],
    pros: ['Global leader in privacy', 'Huge feature set', 'Integrates with everything'],
    cons: ['Interface can be overwhelming', 'Legacy feel in some modules', 'Sales process is heavy'],
    faqs: [],
    bestFor: 'unify privacy, security, and governance globally',
    risclensVerdict: 'OneTrust is the behemoth. If privacy is your primary concern alongside security, OneTrust is the logical choice.',
    website: 'https://onetrust.com'
  },
  {
    id: 'anecdotes',
    name: 'Anecdotes',
    slug: 'anecdotes',
    category: 'Compliance OS platform',
    startingPrice: '$12,000',
    priceModel: 'Quote-only',
    typicalRange: '$12,000 – $80,000 / year',
    targetMarket: 'Engineering-led Tech Firms',
    hiddenCosts: 'Custom integration work',
    detailedHiddenCosts: [
      { title: 'Custom Connector Fees', description: 'Building bespoke data connectors for unique tech stacks can be an extra cost.' },
      { title: 'Premium Support Tiers', description: 'Access to high-level engineering support is often gated behind higher pricing.' }
    ],
    negotiationTips: [
      'Leverage your "Engineering-first" culture to negotiate early adopter features.',
      'Ask about bundling discounts for multi-framework (SOC 2 + ISO 27001) support.',
      'Request data export and API access to be included in the base tier.'
    ],
    pricingDrivers: [
      { title: 'Data Ingestion Volume', description: 'The amount of evidence data being pulled into the OS impacts the cost.' },
      { title: 'Framework Complexity', description: 'Pricing scales with the number of compliance standards managed.' },
      { title: 'Integration Depth', description: 'The complexity of automated vs. manual data sources being connected.' }
    ],
    featuresOverview: [
      'Data-first evidence collection',
      'Developer-friendly APIs',
      'Custom control logic',
      'Deep cloud-native integrations',
      'Real-time compliance monitoring',
      'Auditor portal'
    ],
    compareData: [
      { platform: 'Anecdotes', startingPrice: '$12,000/year', auditorIncluded: false, targetMarket: 'Engineering Orgs' },
      { platform: 'Vanta', startingPrice: '$10,000/year', auditorIncluded: false, targetMarket: 'SaaS SME' },
      { platform: 'Drata', startingPrice: '$12,000/year', auditorIncluded: false, targetMarket: 'Tech Heavy Orgs' }
    ],
    implementationTimeline: '6-10 weeks',
    integrationsCount: '120+',
    tiers: [
      {
        name: 'Compliance OS',
        price: 'Contact Sales',
        description: 'Data-driven compliance for tech teams.',
        features: ['Deep evidence automation', 'Custom connectors', 'Expert support']
      }
    ],
    pros: ['True data-driven approach', 'Developer friendly', 'Highly scalable'],
    cons: ['Premium pricing', 'Targeted at larger, tech-heavy teams'],
    faqs: [],
    bestFor: 'treat compliance as a data engineering problem',
    risclensVerdict: 'Anecdotes is the most "modern" approach to compliance, focusing on data rather than just screenshots and checklists.',
    website: 'https://anecdotes.ai'
  },
  {
    id: 'apptega',
    name: 'Apptega',
    slug: 'apptega',
    category: 'Cybersecurity Management platform',
    startingPrice: '$8,000',
    priceModel: 'User-based / Per-framework',
    typicalRange: '$8,000 – $40,000 / year',
    targetMarket: 'MSPs and Mid-market Teams',
    hiddenCosts: 'MSP markup, Professional services',
    detailedHiddenCosts: [
      { title: 'Professional Services', description: 'Implementation and custom framework builds often require $5k-$15k in services.' },
      { title: 'Integration Connectors', description: 'Connecting to specialized security tools can incur per-connector fees.' }
    ],
    negotiationTips: [
      'If working through an MSP, ask for a bundled security + compliance rate.',
      'Negotiate for "Framework Cross-walking" to be included at no extra cost.',
      'Request a fixed number of support hours to be included in the annual fee.'
    ],
    pricingDrivers: [
      { title: 'Framework Count', description: 'The number of standards (SOC 2, ISO, CMMC) is the main driver.' },
      { title: 'User Access', description: 'Pricing scales with the number of administrators and contributors.' },
      { title: 'Reporting Level', description: 'Advanced executive dashboards and visual reports are often premium features.' }
    ],
    featuresOverview: [
      'Framework cross-walking',
      'Visual reporting dashboards',
      'Task management workflow',
      'Policy library',
      'Auditor portal',
      'Multi-framework mapping'
    ],
    compareData: [
      { platform: 'Apptega', startingPrice: '$8,000/year', auditorIncluded: false, targetMarket: 'MSPs & SME' },
      { platform: 'Hyperproof', startingPrice: '$15,000/year', auditorIncluded: false, targetMarket: 'Mid-Market' },
      { platform: 'Vanta', startingPrice: '$10,000/year', auditorIncluded: false, targetMarket: 'SaaS SME' }
    ],
    implementationTimeline: '4-8 weeks',
    integrationsCount: '50+',
    tiers: [
      {
        name: 'Standard',
        price: 'Contact Sales',
        description: 'Cybersecurity management for small teams.',
        features: ['Core frameworks', 'Standard reporting', 'Task management']
      },
      {
        name: 'Enterprise',
        price: 'Contact Sales',
        description: 'Full GRC for large organizations.',
        features: ['Cross-walking', 'Advanced API', 'Priority support']
      }
    ],
    pros: ['Excellent framework cross-walking', 'Preferred by MSPs', 'Visual reporting'],
    cons: ['Manual evidence collection in some areas', 'UI is a bit dated'],
    faqs: [],
    bestFor: 'visualize and manage multiple security frameworks simultaneously',
    risclensVerdict: 'Apptega is a solid, reliable choice for those who want a structured way to manage security frameworks visually.',
    website: 'https://apptega.com'
  },
  {
    id: 'jupiterone',
    name: 'JupiterOne',
    slug: 'jupiterone',
    category: 'Cyber Asset GRC platform',
    startingPrice: '$10,000',
    priceModel: 'Asset-based / Usage',
    typicalRange: '$10,000 – $75,000 / year',
    targetMarket: 'Cloud-native Tech Teams',
    hiddenCosts: 'Data ingestion volume fees',
    detailedHiddenCosts: [
      { title: 'Data Ingestion Fees', description: 'Connecting a massive number of cloud assets can trigger volume-based surcharges.' },
      { title: 'Premium Connectors', description: 'Specific enterprise integrations are billed as add-ons.' }
    ],
    negotiationTips: [
      'Negotiate for an "Unlimited Asset" license if your infrastructure is some ephemeral.',
      'Request a credit for professional services during the initial graph setup.',
      'Lock in data ingestion rates for 3 years to avoid scaling "surprises".'
    ],
    pricingDrivers: [
      { title: 'Asset Count', description: 'The total number of devices, users, and cloud resources in the graph.' },
      { title: 'Integration Volume', description: 'The number of external tools being monitored and mapped.' },
      { title: 'Query Volume', description: 'Heavy use of the graph API and custom reporting can impact cost tiers.' }
    ],
    featuresOverview: [
      'Asset inventory mapping',
      'Graph-based relationship analysis',
      'Compliance control mapping',
      'Vulnerability management',
      'Cloud security posture (CSPM)',
      'Policy as code'
    ],
    compareData: [
      { platform: 'JupiterOne', startingPrice: '$10k/year', auditorIncluded: false, targetMarket: 'Cloud-Native Tech' },
      { platform: 'Wiz', startingPrice: '$20k/year', auditorIncluded: false, targetMarket: 'Large Enterprise' },
      { platform: 'Vanta', startingPrice: '$10k/year', auditorIncluded: false, targetMarket: 'SaaS SME' }
    ],
    implementationTimeline: '6-10 weeks',
    integrationsCount: '100+',
    tiers: [
      {
        name: 'Professional',
        price: 'Contact Sales',
        description: 'Asset and compliance management.',
        features: ['Core graph mapping', 'Framework templates', 'Basic reporting']
      },
      {
        name: 'Enterprise',
        price: 'Contact Sales',
        description: 'Advanced cyber asset governance.',
        features: ['Advanced graph API', 'Custom frameworks', 'Dedicated Success Manager']
      }
    ],
    pros: ['Incredible asset visibility', 'Graph-based relationship mapping', 'Strong AWS/Cloud focus'],
    cons: ['Steep learning curve', 'Requires technical expertise to maximize value'],
    faqs: [],
    bestFor: 'achieve complete visibility into cloud assets and compliance relationships',
    risclensVerdict: 'JupiterOne is compliance for the cloud-native age. It\'s more of an asset tool that does compliance, which is a powerful combo.',
    website: 'https://jupiterone.com'
  },
  {
    id: 'wiz',
    name: 'Wiz',
    slug: 'wiz',
    category: 'Cloud Security (CNAPP) platform',
    startingPrice: '$20,000',
    priceModel: 'Workload / Workstation based',
    typicalRange: '$20,000 – $150,000+ / year',
    targetMarket: 'Large Cloud Footprints',
    hiddenCosts: 'Compliance module surcharge',
    detailedHiddenCosts: [
      { title: 'Compliance Module Add-on', description: 'While CSPM is core, detailed compliance reporting is often a premium module.' },
      { title: 'Workload Scalability', description: 'Rapidly expanding your cloud footprint can lead to significant mid-contract true-ups.' }
    ],
    negotiationTips: [
      'Request the compliance module to be bundled into the base platform fee.',
      'Negotiate for "Unlimited Scanning" without per-resource penalties.',
      'Ask about multi-cloud (AWS + Azure) bundling discounts.'
    ],
    pricingDrivers: [
      { title: 'Workload Volume', description: 'The number of cloud instances and serverless functions being scanned.' },
      { title: 'Scan Frequency', description: 'Real-time vs. periodic scanning impacts the pricing tier.' },
      { title: 'Reporting Depth', description: 'Executive-level GRC dashboards and audit reports are often premium.' }
    ],
    featuresOverview: [
      'Agentless cloud scanning',
      'Vulnerability management',
      'Cloud Infrastructure Entitlement (CIEM)',
      'Compliance reporting (SOC 2, ISO)',
      'Risk-based prioritization',
      'Kubernetes security'
    ],
    compareData: [
      { platform: 'Wiz', startingPrice: '$20k/year', auditorIncluded: false, targetMarket: 'Large Enterprise' },
      { platform: 'Vanta', startingPrice: '$10k/year', auditorIncluded: false, targetMarket: 'SaaS SME' },
      { platform: 'Drata', startingPrice: '$12k/year', auditorIncluded: false, targetMarket: 'Mid-Market' }
    ],
    implementationTimeline: '1-2 weeks (Fast setup)',
    integrationsCount: '100+',
    tiers: [
      {
        name: 'Core Security',
        price: 'Contact Sales',
        description: 'Essential cloud security and visibility.',
        features: ['Agentless scanning', 'CSPM', 'Standard compliance']
      },
      {
        name: 'Advanced GRC',
        price: 'Contact Sales',
        description: 'Full stack security and governance.',
        features: ['Wiz Graph API', 'Detailed audit reports', 'Premium support']
      }
    ],
    pros: ['Fastest setup in cloud security', 'Incredible visibility', 'Top-tier vulnerability data'],
    cons: ['High price point', 'Compliance is a module, not the primary focus'],
    faqs: [],
    bestFor: 'secure and audit massive cloud environments simultaneously',
    risclensVerdict: 'Wiz is primarily a security tool, but its compliance reporting is so good that many large teams use it as their primary source of truth.',
    website: 'https://wiz.io'
  },
  {
    id: 'vgs',
    name: 'VGS',
    slug: 'vgs',
    category: 'Data Security & Compliance platform',
    startingPrice: '$12,000',
    priceModel: 'Usage-based (Vaulting volume)',
    typicalRange: '$12,000 – $60,000 / year',
    targetMarket: 'Fintech and Payments',
    hiddenCosts: 'Data ingestion volume surcharges',
    detailedHiddenCosts: [
      { title: 'Vaulting Overages', description: 'Exceeding your monthly data vaulting volume triggers significant overage fees.' },
      { title: 'Custom Implementation', description: 'Bespoke data aliasing logic often requires professional service hours.' }
    ],
    negotiationTips: [
      'Negotiate for high vaulting caps upfront to avoid overage penalties.',
      'Request a "Proof of Concept" credit to cover initial integration work.',
      'Ask about "Fintech Startup" discounts for pre-seed/seed stage companies.'
    ],
    pricingDrivers: [
      { title: 'Data Volume', description: 'The total amount of sensitive data being vaulted and aliased.' },
      { title: 'API Request Volume', description: 'The number of calls made to the VGS platform for data retrieval.' },
      { title: 'Compliance Level', description: 'Pricing scales with the level of certification (PCI Level 1, etc.).' }
    ],
    featuresOverview: [
      'Data vaulting & aliasing',
      'PCI-DSS Level 1 environment',
      'Secure data collection',
      'Third-party data proxy',
      'Zero-data compliance',
      'Secure file storage'
    ],
    compareData: [
      { platform: 'VGS', startingPrice: '$12,000/year', auditorIncluded: false, targetMarket: 'Fintech/Payments' },
      { platform: 'Vanta', startingPrice: '$10,000/year', auditorIncluded: false, targetMarket: 'General SaaS' }
    ],
    implementationTimeline: '4-12 weeks',
    integrationsCount: '40+',
    tiers: [
      {
        name: 'Essentials',
        price: '$1,000/mo+',
        description: 'Basic data vaulting for startups.',
        features: ['PCI Level 1', 'Data aliasing', 'Standard support']
      },
      {
        name: 'Enterprise',
        price: 'Contact Sales',
        description: 'Global data security and compliance.',
        features: ['Custom vaulting', 'Advanced API', 'Dedicated Success Manager']
      }
    ],
    pros: ['Inherit compliance (PCI)', 'Never touch sensitive data', 'Accelerates Fintech builds'],
    cons: ['Complex integration', 'Changes how you handle data'],
    faqs: [],
    bestFor: 'eliminate the risk of holding sensitive data',
    risclensVerdict: 'VGS is the "cheat code" for PCI compliance. By never touching the data, you never have to audit the systems that would have held it.',
    website: 'https://verygoodsecurity.com'
  },
  {
    id: 'strike-graph',
    name: 'Strike Graph',
    slug: 'strike-graph',
    category: 'Compliance Automation platform',
    startingPrice: '$5,000',
    priceModel: 'Flat-fee + Audit packages',
    typicalRange: '$5,000 – $25,000 / year',
    targetMarket: 'Security-first Small Teams',
    hiddenCosts: 'External audit fees',
    detailedHiddenCosts: [
      { title: 'External Audit Fees', description: 'Audits are separate; budget $8k-$15k for a CPA report.' },
      { title: 'Penetration Testing', description: 'Strike Graph offers integrated pen testing for an additional fee.' }
    ],
    negotiationTips: [
      'Request "Auditor-in-the-loop" pricing if you need help selecting a CPA.',
      'Ask about bundling SOC 2 and HIPAA for a fixed annual rate.',
      'Inquire about multi-year rate locks to protect against future hikes.'
    ],
    pricingDrivers: [
      { title: 'Risk Scope', description: 'Pricing flexes with the number of risks and controls managed.' },
      { title: 'Audit Readiness Level', description: 'Internal audit and readiness check add-ons increase the base fee.' },
      { title: 'Integration Count', description: 'Standard integrations are included; custom ones may require a higher tier.' }
    ],
    featuresOverview: [
      'Risk-based compliance mapping',
      'Automated evidence collection',
      'Custom control designer',
      'Auditor portal',
      'Policy library',
      'Vulnerability management'
    ],
    compareData: [
      { platform: 'Strike Graph', startingPrice: '$5,000/year', auditorIncluded: false, targetMarket: 'Security-First Teams' },
      { platform: 'Vanta', startingPrice: '$10,000/year', auditorIncluded: false, targetMarket: 'SaaS SME' },
      { platform: 'Sprinto', startingPrice: '$6,000/year', auditorIncluded: false, targetMarket: 'Early Startups' }
    ],
    implementationTimeline: '6-8 weeks',
    integrationsCount: '60+',
    tiers: [
      {
        name: 'Essential',
        price: '$5,000+',
        description: 'Right-sized compliance for small teams.',
        features: ['Risk assessment', 'Core monitoring', 'Standard support']
      },
      {
        name: 'Growth',
        price: '$12,000+',
        description: 'Scale your GRC and risk program.',
        features: ['Advanced automation', 'Multi-framework support', 'Priority support']
      }
    ],
    pros: ['Risk-based approach (not just a checklist)', 'Flexible', 'Lower price point'],
    cons: ['Automation library is smaller than Vanta'],
    faqs: [],
    bestFor: 'build a custom, risk-based security program',
    risclensVerdict: 'Strike Graph is perfect for the "security first" team that wants to build a custom program that also happens to pass an audit.',
    website: 'https://strikegraph.com'
  },
  {
    id: 'ostendio',
    name: 'Ostendio',
    slug: 'ostendio',
    category: 'Security & Risk Management platform',
    startingPrice: '$7,000',
    priceModel: 'Quote-only',
    typicalRange: '$7,000 – $35,000 / year',
    targetMarket: 'Healthcare & HITRUST',
    hiddenCosts: 'HITRUST certification fees',
    detailedHiddenCosts: [
      { title: 'HITRUST Assessment Fees', description: 'The external assessment for HITRUST can cost $20k-$60k+ separately.' },
      { title: 'Consulting Services', description: 'Professional GRC consulting for healthcare is often a paid add-on.' }
    ],
    negotiationTips: [
      'Leverage their 30-day "No Commitment" period to test the platform.',
      'Ask about annual prepay discounts to shave 10-15% off the monthly rate.',
      'Request "Auditor-Readiness" credits if you use an Ostendio-approved auditor.'
    ],
    pricingDrivers: [
      { title: 'Certification Type', description: 'HITRUST vs. SOC 2 vs. ISO impacts the base platform fee.' },
      { title: 'Asset & User Count', description: 'Pricing typically scales with the size of the healthcare organization.' },
      { title: 'Assessment Frequency', description: 'Interim assessments and annual reviews are factored into the tier.' }
    ],
    featuresOverview: [
      'HITRUST-certified platform',
      'Employee training & tracking',
      'Policy & document management',
      'Asset & risk inventory',
      'Collaborative audit portal',
      'Incident management'
    ],
    compareData: [
      { platform: 'Ostendio', startingPrice: '$7,000/year', auditorIncluded: false, targetMarket: 'Healthcare' },
      { platform: 'Vanta', startingPrice: '$10,000/year', auditorIncluded: false, targetMarket: 'General SaaS' }
    ],
    implementationTimeline: '8-12 weeks',
    integrationsCount: '50+',
    tiers: [
      {
        name: 'Core',
        price: 'Contact Sales',
        description: 'Essential compliance for healthcare SME.',
        features: ['HITRUST readiness', 'Policy manager', 'Standard support']
      },
      {
        name: 'Enterprise',
        price: 'Contact Sales',
        description: 'Full GRC for large healthcare networks.',
        features: ['Advanced risk engine', 'Multi-entity support', 'Dedicated CSM']
      }
    ],
    pros: ['Strong healthcare (HITRUST) focus', 'Collaborative interface', 'Good for regulated industries'],
    cons: ['UI feels slightly dated', 'Automation is less focused than competitors'],
    faqs: [],
    bestFor: 'manage complex healthcare data security and HITRUST compliance',
    risclensVerdict: 'Ostendio is a veteran in the space with deep roots in healthcare. Reliable and thorough.',
    website: 'https://ostendio.com'
  },
  {
    id: 'standard-fusion',
    name: 'Standard Fusion',
    slug: 'standard-fusion',
    category: 'Cloud GRC platform',
    startingPrice: '$10,000',
    priceModel: 'Professional / Business / Enterprise',
    typicalRange: '$10,000 – $45,000 / year',
    targetMarket: 'Mid-market Risk Teams',
    hiddenCosts: 'Implementation consulting',
    detailedHiddenCosts: [
      { title: 'Implementation Fee', description: 'Initial setup and framework mapping often incurs a $2.5k-$7.5k fee.' },
      { title: 'Advanced Reporting', description: 'Custom executive reports may require a higher pricing tier.' }
    ],
    negotiationTips: [
      'Request a credit for the implementation fee if committing to a 2-year deal.',
      'Ask about "Bulk Framework" discounts if managing 3 or more standards.',
      'Leverage their "Middle Ground" positioning against AuditBoard to secure better rates.'
    ],
    pricingDrivers: [
      { title: 'User Type', description: 'Pricing scales based on the mix of "Writer" vs. "Viewer" licenses.' },
      { title: 'Framework Count', description: 'Each active standard (ISO, SOC 2, HIPAA) drives the subscription.' },
      { title: 'Storage & History', description: 'Retention requirements for audit trails can impact storage tiers.' }
    ],
    featuresOverview: [
      'Risk management suite',
      'Audit & control management',
      'Vendor risk assessment',
      'Policy lifecycle management',
      'Visual reporting dashboards',
      'Standard framework templates'
    ],
    compareData: [
      { platform: 'Standard Fusion', startingPrice: '$10,000/year', auditorIncluded: false, targetMarket: 'Mid-Market GRC' },
      { platform: 'AuditBoard', startingPrice: '$50,000/year', auditorIncluded: false, targetMarket: 'Enterprise' },
      { platform: 'Hyperproof', startingPrice: '$15,000/year', auditorIncluded: false, targetMarket: 'Scaling Tech' }
    ],
    implementationTimeline: '8-14 weeks',
    integrationsCount: '40+',
    tiers: [
      {
        name: 'Professional',
        price: '$10,000+',
        description: 'GRC for small to mid-market teams.',
        features: ['Core risk engine', 'Policy manager', 'Standard support']
      },
      {
        name: 'Business',
        price: 'Contact Sales',
        description: 'Comprehensive risk and compliance.',
        features: ['Advanced GRC', 'API access', 'Audit management']
      }
    ],
    pros: ['Easy to use for non-technical users', 'Solid reporting', 'Strong support'],
    cons: ['Automation is manual compared to Vanta/Drata'],
    faqs: [],
    bestFor: 'streamline risk management without the enterprise complexity',
    risclensVerdict: 'Standard Fusion is the "middle ground" of GRC. It provides enterprise-style risk management at a mid-market price point.',
    website: 'https://standardfusion.com'
  },
  {
    id: 'sprinto',
    name: 'Sprinto',
    slug: 'sprinto',
    category: 'SaaS Compliance Automation',
    startingPrice: '$8,000',
    priceModel: 'Flat-fee (Unlimited users)',
    typicalRange: '$6,000 – $25,000 / year',
    targetMarket: 'Lean Cloud-Native Startups',
    hiddenCosts: 'Implementation fees (negotiable)',
    detailedHiddenCosts: [
      { title: 'Implementation Fees', description: 'One-time setup fees can range from $1,000 to $3,000 but are often waived for multi-year deals.' },
      { title: 'Advanced Connectors', description: 'Deep integrations with tools like Jira or ServiceNow may trigger higher pricing tiers.' },
      { title: 'Private Cloud Hosting', description: 'Specialized hosting requirements can push costs towards the $25k+ range.' }
    ],
    negotiationTips: [
      'Sprinto typically offers 10–20% off for multi-framework bundles (e.g., SOC 2 + ISO 27001).',
      'Request "Auditor Connect" discounts if you use their preferred CPA partners.',
      'Prepaying annually can save 15–25% compared to quarterly or monthly billing cycles.'
    ],
    pricingDrivers: [
      { title: 'Framework Selection', description: 'Each additional compliance framework adds to the base subscription cost.' },
      { title: 'Infrastructure Complexity', description: 'The number of cloud entities and regions being monitored impacts the total quote.' },
      { title: 'Service Level', description: 'Dedicated Slack support and faster onboarding response times are reflected in premium tiers.' },
      { title: 'Auditor Fees (Separate)', description: 'Budget $5,000-$12,000 separately for your independent CPA audit report.' }
    ],
    featuresOverview: [
      'Automated evidence collection',
      'Unlimited user licenses',
      'Security awareness training',
      'Vulnerability scanning',
      'Policy management',
      '24/7 technical support'
    ],
    compareData: [
      { platform: 'Sprinto', startingPrice: '$6,000/year', auditorIncluded: false, targetMarket: 'Early-Stage SaaS Startups' },
      { platform: 'Vanta', startingPrice: '$7,500/year', auditorIncluded: false, targetMarket: 'Startups and Mid-Market SaaS' },
      { platform: 'Drata', startingPrice: '$6,000/year', auditorIncluded: false, targetMarket: 'Mid-Market and Enterprise' },
      { platform: 'Secureframe', startingPrice: '$5,000/year', auditorIncluded: false, targetMarket: 'Growth-Stage Startups' }
    ],
    implementationTimeline: '2-4 weeks',
    integrationsCount: '80+',
    tiers: [
      {
        name: 'Starter',
        price: '$6,000+',
        description: 'Essential compliance for small teams.',
        features: ['Cloud monitoring', 'Policy manager', 'Standard integrations']
      },
      {
        name: 'Growth',
        price: '$12,000+',
        description: 'For scaling companies with complex stacks.',
        features: ['Advanced RBAC', 'Custom controls', 'Dedicated Slack support']
      },
      {
        name: 'Enterprise',
        price: 'Contact Sales',
        description: 'Global compliance for large organizations.',
        features: ['Multi-entity support', 'Private cloud hosting', 'Premium Success Manager']
      }
    ],
    pros: ['Extremely fast implementation', 'Cost-effective for small teams', 'Unlimited user licenses'],
    cons: ['Limited enterprise customization', 'Smaller integration library than Vanta'],
    faqs: [],
    bestFor: 'Lean, cloud-native startups needing SOC 2 quickly and affordably.',
    risclensVerdict: 'Sprinto is the speed leader. If you need audit-readiness in under a month, Sprinto is your best bet.',
    website: 'https://sprinto.com'
  },
  {
    id: 'thoropass',
    name: 'Thoropass',
    slug: 'thoropass',
    category: 'Integrated Compliance & Audit',
    startingPrice: '$14,500',
    priceModel: 'Integrated Audit (Software + CPA)',
    typicalRange: '$14,500 – $50,000 / year',
    targetMarket: 'Companies wanting a "Turnkey" solution',
    hiddenCosts: 'Penetration testing add-ons',
    detailedHiddenCosts: [
      { title: 'Penetration Testing', description: 'While Thoropass offers integrated pen testing, it is often a separate $4k-$8k line item.' },
      { title: 'Advisory Retainers', description: 'Access to specialized compliance consultants can cost $200-$550 per hour.' },
      { title: 'Vulnerability Scanning', description: 'Advanced scanning requirements for larger cloud footprints may incur extra fees.' }
    ],
    negotiationTips: [
      'Ask about bundling discounts if you need both SOC 2 and a PCI-DSS assessment.',
      'Thoropass often provides lifetime discounts (10%+) through marketplace partners like NachoNacho.',
      'Check for "Ramp Rewards" which can offer up to 20% off your annual subscription.'
    ],
    pricingDrivers: [
      { title: 'Audit Scope', description: 'The number of frameworks and the complexity of the audit period impact the integrated cost.' },
      { title: 'Implementation Speed', description: 'Expedited onboarding for tight deadlines may require a premium service fee.' },
      { title: 'Infrastructure Density', description: 'The total number of cloud assets and employee count influences the platform fee.' }
    ],
    featuresOverview: [
      'Integrated audit execution',
      'Expert compliance concierges',
      'Automated evidence gathering',
      'Policy library & templates',
      'Vulnerability management',
      'Risk assessment module'
    ],
    compareData: [
      { platform: 'Thoropass', startingPrice: '$14,500/year', auditorIncluded: true, targetMarket: 'Turnkey Compliance Seekers' },
      { platform: 'Vanta', startingPrice: '$12,500/year*', auditorIncluded: false, targetMarket: 'Automation-Focused Teams' },
      { platform: 'Drata', startingPrice: '$13,000/year*', auditorIncluded: false, targetMarket: 'Engineering-Heavy Orgs' }
    ],
    implementationTimeline: '8-12 weeks',
    integrationsCount: '120+',
    tiers: [
      {
        name: 'Integrated Audit',
        price: '$14,500+',
        description: 'Software platform plus the cost of the audit.',
        features: ['CPA-led audit', 'Expert concierge', 'Compliance platform']
      },
      {
        name: 'Multi-Framework',
        price: '$25,000+',
        description: 'Complex compliance requirements.',
        features: ['SOC 2 + ISO 27001', 'Dedicated advisor', 'Priority support']
      }
    ],
    pros: ['Predictable "all-in" pricing', 'Single point of contact', 'High-touch expert support'],
    cons: ['Locked into their auditor network', 'Higher upfront costs than software-only tools'],
    faqs: [],
    bestFor: 'Companies that want a "one-stop shop" and don\'t want to deal with 3rd party auditors.',
    risclensVerdict: 'Thoropass is the ultimate convenience play. By bundling the auditor and software, they eliminate the friction of the audit process.',
    website: 'https://thoropass.com'
  },
  {
    id: 'auditboard',
    name: 'AuditBoard',
    slug: 'auditboard',
    category: 'Enterprise GRC platform',
    startingPrice: '$50,000',
    priceModel: 'Enterprise modules + users',
    typicalRange: '$50,000 – $250,000+ / year',
    targetMarket: 'Fortune 500 and Large Enterprise',
    hiddenCosts: 'Implementation services ($25,000 – $100,000+)',
    detailedHiddenCosts: [
      { title: 'Additional cost for each user license beyond base', description: 'Seat-based pricing can escalate costs quickly for large internal audit teams.' },
      { title: 'High implementation fees for SOX workflows', description: 'Configuring complex SOX control environments often requires expensive professional services.' },
      { title: 'Premium support surcharges', description: '24/7 dedicated support and faster SLA response times are typically paid add-ons.' }
    ],
    negotiationTips: [
      'AuditBoard is often willing to discount if you switch from a legacy competitor like RSA Archer.',
      'Negotiate for unlimited view-only licenses for stakeholders.',
      'Ask about multi-year platform fee locks.'
    ],
    pricingDrivers: [
      { title: 'Employee Count', description: 'Most compliance platforms price based on the number of employees, as this affects the volume of access reviews, security training, and evidence collection required.' },
      { title: 'Number of Frameworks', description: 'Adding frameworks like ISO 27001, HIPAA, or SOC 1 to your SOC 2 program typically increases costs by 20-40% per additional framework.' },
      { title: 'Integrations Required', description: 'Complex tech stacks with many cloud providers and tools may require additional configuration and custom integrations.' },
      { title: 'Auditor Fees (Separate)', description: 'Remember to budget separately for auditor fees, typically $8,000-$25,000 for SOC 2 Type II depending on complexity.' }
    ],
    featuresOverview: [
      'SOX compliance',
      'Internal audit management',
      'ESG reporting',
      'Risk quantification',
      'Workflow automation',
      'Board reporting'
    ],
    compareData: [
      { platform: 'AuditBoard', startingPrice: '$50,000/year', auditorIncluded: false, targetMarket: 'Fortune 500 and Large Enterprise' },
      { platform: 'Vanta', startingPrice: '$10,000/year', auditorIncluded: false, targetMarket: 'Startups and Mid-Market SaaS' },
      { platform: 'Drata', startingPrice: '$15,000/year', auditorIncluded: false, targetMarket: 'Mid-Market and Enterprise' },
      { platform: 'Secureframe', startingPrice: '$12,000/year', auditorIncluded: false, targetMarket: 'Growth-Stage Startups' },
      { platform: 'Sprinto', startingPrice: '$8,000/year', auditorIncluded: false, targetMarket: 'Early-Stage SaaS Startups' }
    ],
    implementationTimeline: '3-6 months',
    integrationsCount: '200+',
    tiers: [
      {
        name: 'Growth',
        price: '$30,000 - $50,000',
        description: 'Mid-market teams',
        features: ['OpsAudit Core', 'Issue Management', 'Standard Dashboards', 'Standard Support']
      },
      {
        name: 'Enterprise',
        price: '$75,000 - $150,000',
        description: 'Integrated GRC orgs',
        features: ['Compliance Automation', 'RiskOversight', 'ESG Module', 'Advanced Reporting']
      },
      {
        name: 'Global',
        price: '$250,000+',
        description: 'Fortune 500',
        features: ['Cross-functional Workflows', 'SOX Compliance', 'Strategic Risk Management', 'Dedicated Success Manager']
      }
    ],
    pros: ['Comprehensive enterprise GRC', 'SOX and internal audit expertise', 'Scales to largest organizations'],
    cons: ['Expensive ($50k+ minimum)', 'Months-long implementation', 'Too complex for SMBs'],
    faqs: [
      { question: 'Is AuditBoard suitable for a 50-person startup?', answer: 'Likely not. AuditBoard is built for complex, enterprise environments and is usually cost-prohibitive for startups.' }
    ],
    bestFor: 'unify audit, risk, and compliance workflows',
    risclensVerdict: 'The enterprise giant. Best for Fortune 500 companies with dedicated internal audit teams.',
    website: 'https://auditboard.com'
  },
  {
    id: 'auth0',
    name: 'Auth0',
    slug: 'auth0',
    category: 'Identity Management Platform',
    startingPrice: '$1,560',
    priceModel: 'Usage-based (MAU) + Connections',
    typicalRange: '$1,560 – $100,000+ / year',
    targetMarket: 'SaaS Developers and Enterprises',
    hiddenCosts: 'Enterprise SSO connections ($11/mo each)',
    detailedHiddenCosts: [
      { title: 'Enterprise SSO Connection Caps', description: 'Essentials plan limits you to 3-5 SSO connections. Exceeding this forces a jump to a custom Enterprise contract.' },
      { title: 'B2C MAU Overage Rates', description: 'Exceeding your MAU band can trigger $0.07 per additional user, leading to "pricing cliffs".' },
      { title: 'Professional Services', description: 'Complex enterprise implementations often require Auth0 consultants, costing $25k-$75k.' }
    ],
    negotiationTips: [
      'Negotiate for a higher number of included SSO connections in the base contract.',
      'Cap MAU overage rates to avoid massive price shocks during viral growth.',
      'Request 3-year rate locks to protect against annual price hikes (common in Q4).'
    ],
    pricingDrivers: [
      { title: 'MAU Count', description: 'Monthly Active Users are the primary driver, with hard caps forcing plan upgrades.' },
      { title: 'SSO Connections', description: 'Each enterprise identity provider (Okta, Azure AD) connected triggers a per-connection fee.' },
      { title: 'Feature Gating', description: 'SCIM provisioning and custom domains are often locked behind the highest tiers.' },
      { title: 'Compliance Requirements', description: 'HIPAA and SOC 2 compliant environments require Enterprise-level security add-ons.' }
    ],
    featuresOverview: [
      'Universal Login & MFA',
      'Single Sign-On (SSO)',
      'User Management Dashboard',
      'Brute Force Protection',
      'Anomaly Detection',
      'Actionable Security Analytics'
    ],
    compareData: [
      { platform: 'Auth0', startingPrice: '$1,560/year', auditorIncluded: false, targetMarket: 'Enterprises' },
      { platform: 'Clerk', startingPrice: '$0/year', auditorIncluded: false, targetMarket: 'Next.js Devs' },
      { platform: 'WorkOS', startingPrice: '$0/year', auditorIncluded: false, targetMarket: 'B2B SaaS' }
    ],
    implementationTimeline: '1-4 weeks',
    integrationsCount: '500+',
    tiers: [
      {
        name: 'B2B Essentials',
        price: '$130/mo+',
        description: 'For growing B2B SaaS apps.',
        features: ['3 SSO connections', '10,000 MAUs', 'Standard MFA']
      },
      {
        name: 'B2B Professional',
        price: '$800/mo+',
        description: 'For scaling enterprise SaaS.',
        features: ['5 SSO connections', 'Custom domains', 'Advanced security']
      },
      {
        name: 'Enterprise',
        price: 'Contact Sales',
        description: 'Global scale and security.',
        features: ['Unlimited SSO', 'Custom MFA', 'Dedicated Success Manager']
      }
    ],
    pros: ['Identity leading security', 'Extensive documentation', 'Huge integration library'],
    cons: ['Extremely expensive at scale', 'Hard feature gating', 'Complex pricing tiers'],
    faqs: [],
    bestFor: 'modernize identity and access management security',
    risclensVerdict: 'Auth0 is the gold standard but has the "Auth0 Tax". Expect high costs as you sign larger enterprise customers.',
    website: 'https://auth0.com'
  },
  {
    id: 'compliance-ai',
    name: 'Compliance.ai',
    slug: 'compliance-ai',
    category: 'Regulatory Intelligence Platform',
    startingPrice: '$15,000',
    priceModel: 'Per-user / Per-module',
    typicalRange: '$15,000 – $75,000 / year',
    targetMarket: 'Fintech and Banking',
    hiddenCosts: 'Custom data feeds & API access',
    detailedHiddenCosts: [
      { title: 'Module Bundling Fees', description: 'AML, KYC, and Data Privacy modules are often sold as separate expensive add-ons.' },
      { title: 'Implementation Services', description: 'Professional services typically add 20-40% to the first-year total investment.' },
      { title: 'Ongoing Maintenance', description: 'Support and maintenance add-ons typically cost 15-25% of the base annual fee.' }
    ],
    negotiationTips: [
      'Request bundled pricing for multiple regulatory modules instead of à la carte.',
      'Lock implementation SOWs with "not-to-exceed" caps to avoid billing surprises.',
      'Negotiate data export terms upfront to avoid heavy vendor lock-in penalties.'
    ],
    pricingDrivers: [
      { title: 'Regulatory Scope', description: 'The number of jurisdictions and frameworks monitored directly impacts the platform fee.' },
      { title: 'User Access', description: 'Pricing typically scales per-seat, ranging from $250 to $2,000 per user per month.' },
      { title: 'Integration Depth', description: 'Connecting to legacy core banking systems incurs significant professional service fees.' }
    ],
    featuresOverview: [
      'Real-time regulatory tracking',
      'AI-powered impact analysis',
      'Automated workflow triggers',
      'Executive reporting suite',
      'Audit trail management',
      'Regulator relationship portal'
    ],
    compareData: [
      { platform: 'Compliance.ai', startingPrice: '$15k/year', auditorIncluded: false, targetMarket: 'Banking & Fintech' },
      { platform: 'OneTrust', startingPrice: '$10k/year', auditorIncluded: false, targetMarket: 'Global Enterprise' },
      { platform: 'AuditBoard', startingPrice: '$50k/year', auditorIncluded: false, targetMarket: 'Fortune 500' }
    ],
    implementationTimeline: '4-8 weeks',
    integrationsCount: '50+',
    tiers: [
      {
        name: 'Core Intelligence',
        price: 'Contact Sales',
        description: 'Essential regulatory monitoring.',
        features: ['Global feeds', 'Basic AI analysis', 'Standard reporting']
      },
      {
        name: 'Advanced GRC',
        price: 'Contact Sales',
        description: 'Full regulatory lifecycle management.',
        features: ['Workflow automation', 'API access', 'Custom modules']
      }
    ],
    pros: ['Excellent AI-driven filtering', 'Broad regulatory coverage', 'Strong fintech focus'],
    cons: ['High price point', 'Requires significant setup', 'Niche focus on financial services'],
    faqs: [],
    bestFor: 'automate regulatory change management workflows',
    risclensVerdict: 'A must-have for banks and fintechs. It turns a manual research process into a streamlined AI-driven workflow.',
    website: 'https://compliance.ai'
  },
  {
    id: 'scrut-automation',
    name: 'Scrut Automation',
    slug: 'scrut-automation',
    category: 'Compliance Automation platform',
    startingPrice: '$3,500',
    priceModel: 'Flat-fee + Audit packages',
    typicalRange: '$3,500 – $25,000 / year',
    targetMarket: 'Mid-market APAC/EMEA & US',
    hiddenCosts: 'Implementation & Customization fees',
    detailedHiddenCosts: [
      { title: 'Setup & Customization', description: 'Initial configuration for non-standard stacks can cost between $1,000 and $5,000.' },
      { title: 'Surveillance Audits', description: 'Annual surveillance audits to maintain certification cost an additional $3k-$10k.' },
      { title: 'Remediation Services', description: 'Expert help for control redesigns after a failure can add significant hourly costs.' }
    ],
    negotiationTips: [
      'Request weekly business reviews and dedicated Slack support in the contract.',
      'Leverage their competitive positioning against Vanta/Drata to secure deeper discounts.',
      'Ask about "Start-up bundles" that include SOC 2, ISO 27001, and a Pen Test for a fixed price.'
    ],
    pricingDrivers: [
      { title: 'Automation Scope', description: 'The depth of automated evidence collection vs. manual tasks drives the tier.' },
      { title: 'Risk Assessment Depth', description: 'Advanced risk scoring modules and custom dashboards add to the base cost.' },
      { title: 'Audit Readiness', description: 'Bundling internal audit readiness checks with the platform subscription adds 20% to cost.' }
    ],
    featuresOverview: [
      'Continuous monitoring',
      'Risk assessment engine',
      'Auditor collaboration portal',
      'Integrated pen testing',
      'Vendor risk management',
      'Policy repository'
    ],
    compareData: [
      { platform: 'Scrut', startingPrice: '$3,500/year', auditorIncluded: false, targetMarket: 'SME to Mid-Market' },
      { platform: 'Sprinto', startingPrice: '$6,000/year', auditorIncluded: false, targetMarket: 'Early-Stage SaaS' },
      { platform: 'Vanta', startingPrice: '$7,500/year', auditorIncluded: false, targetMarket: 'High-Growth Tech' }
    ],
    implementationTimeline: '4-6 weeks',
    integrationsCount: '70+',
    tiers: [
      {
        name: 'Standard',
        price: '$3,500+',
        description: 'Essential automation for startups.',
        features: ['Core monitoring', 'Policy manager', 'Standard integrations']
      },
      {
        name: 'Professional',
        price: '$12,000+',
        description: 'Scale your GRC efforts globally.',
        features: ['Advanced risk engine', 'Multi-framework support', 'Custom dashboards']
      }
    ],
    pros: ['Very aggressive pricing', 'Strong customer support (9.8 G2)', 'Ease of use (9.6 G2)'],
    cons: ['Fewer integrations than incumbents', 'US brand recognition is still growing'],
    faqs: [],
    bestFor: 'streamline mid-market compliance and risk operations',
    risclensVerdict: 'Scrut is the value leader. If you want high-end automation at 40% less than Vanta, Scrut is the best choice.',
    website: 'https://scrut.io'
  },
  {
    id: 'scytale',
    name: 'Scytale',
    slug: 'scytale',
    category: 'Compliance Automation platform',
    startingPrice: '$4,500',
    priceModel: 'Flat-fee',
    typicalRange: '$4,500 – $30,000 / year',
    targetMarket: 'Startups with no Security Hire',
    hiddenCosts: 'Expert consultation add-ons',
    detailedHiddenCosts: [
      { title: 'Expert Consultation', description: 'Deep-dive consulting with GRC experts for complex framework mapping is often an extra fee.' },
      { title: 'Audit Management', description: 'Managing the audit process with external auditors can incur additional service charges.' },
      { title: 'Framework Expansion', description: 'Adding frameworks like ISO 42001 or GDPR typically increases the annual subscription by 20-30%.' }
    ],
    negotiationTips: [
      'Scytale is often open to bundling discounts for SOC 2 and ISO 27001 packages.',
      'Ask about "Start-up Friendly" pricing if you have fewer than 20 employees.',
      'Request a fixed-price implementation fee to avoid billable hour surprises.'
    ],
    pricingDrivers: [
      { title: 'Framework Scope', description: 'The number of frameworks (e.g., SOC 2, HIPAA, GDPR) is the primary driver of cost.' },
      { title: 'Asset Volume', description: 'The number of employees and cloud resources monitored impacts the platform fee.' },
      { title: 'Support Tier', description: 'Access to dedicated GRC experts and faster response times are tiered.' }
    ],
    featuresOverview: [
      'Automated evidence collection',
      'Expert guidance & support',
      'Policy library & templates',
      'Risk assessment module',
      'Auditor portal',
      'Compliance dashboard'
    ],
    compareData: [
      { platform: 'Scytale', startingPrice: '$4,500/year', auditorIncluded: false, targetMarket: 'SME Startups' },
      { platform: 'Sprinto', startingPrice: '$6,000/year', auditorIncluded: false, targetMarket: 'Early-Stage SaaS' },
      { platform: 'Secureframe', startingPrice: '$5,000/year', auditorIncluded: false, targetMarket: 'Growth Startups' }
    ],
    implementationTimeline: '4-6 weeks',
    integrationsCount: '60+',
    tiers: [
      {
        name: 'Prime',
        price: '$4,500+',
        description: 'Essential compliance for small startups.',
        features: ['Core monitoring', 'Policy manager', 'Standard support']
      },
      {
        name: 'Pro',
        price: '$12,000+',
        description: 'For growing teams with complex needs.',
        features: ['Advanced RBAC', 'Expert GRC advisor', 'Priority support']
      },
      {
        name: 'Pro Plus',
        price: 'Contact Sales',
        description: 'Full-service enterprise compliance.',
        features: ['Custom frameworks', 'Multi-entity support', 'Dedicated Success Manager']
      }
    ],
    pros: ['Dedicated compliance experts', 'Fast implementation', 'Transparent pricing'],
    cons: ['Fewer native integrations than Vanta', 'Brand is newer in the US market'],
    faqs: [],
    bestFor: 'Startups that want both a platform and heavy-duty expert support.',
    risclensVerdict: 'Scytale is a strong choice for founders who need a "helping hand" through the audit process, not just a software tool.',
    website: 'https://scytale.ai'
  },
  {
    id: 'resolver',
    name: 'Resolver',
    slug: 'resolver',
    category: 'Enterprise GRC & Risk Management platform',
    startingPrice: '$10,000',
    priceModel: 'Custom (based on modules + users)',
    typicalRange: '$10,000 – $75,000+ / year',
    targetMarket: 'Mid-market to Global Enterprises',
    hiddenCosts: 'Implementation fees, Customization, Training',
    detailedHiddenCosts: [
      { title: 'Implementation & Onboarding', description: 'Customization beyond out-of-the-box workflows often requires professional service hours.' },
      { title: 'Advanced Training Services', description: 'Deep-dive training for advanced users is often a paid engagement.' },
      { title: 'Module Sprawl', description: 'Adding Security & Investigations or Trust & Safety modules significantly increases the base fee.' }
    ],
    negotiationTips: [
      'Ask for a bundle discount if combining GRC with Security or Incident Management modules.',
      'Request a "Fixed-Price Implementation" SOW to avoid hourly rate creep during setup.',
      'Check if user licensing can be scaled based on "Active Risk Managers" vs. general employees.'
    ],
    pricingDrivers: [
      { title: 'Module Selection', description: 'Pricing is heavily influenced by the specific solutions chosen (GRC, ERM, ORM, etc.).' },
      { title: 'User Access Levels', description: 'The number of administrative users managing the risk program is a primary cost driver.' },
      { title: 'Customization Depth', description: 'The complexity of custom triggers, alerts, and bespoke dashboard configurations.' }
    ],
    featuresOverview: [
      'Automated risk assessments',
      'No-code workflow builder',
      'Real-time risk scoring',
      'Internal controls management',
      'ERM & ORM capabilities',
      'Configurable drag-and-drop dashboards'
    ],
    compareData: [
      { platform: 'Resolver', startingPrice: '$10,000/year', auditorIncluded: false, targetMarket: 'Mid-Market to Enterprise' },
      { platform: 'AuditBoard', startingPrice: '$50,000/year', auditorIncluded: false, targetMarket: 'Fortune 500' },
      { platform: 'OneTrust', startingPrice: '$10,000/year', auditorIncluded: false, targetMarket: 'Global Enterprise' },
      { platform: 'Hyperproof', startingPrice: '$15,000/year', auditorIncluded: false, targetMarket: 'Mature Security Teams' }
    ],
    implementationTimeline: '8-16 weeks',
    integrationsCount: '80+',
    tiers: [
      {
        name: 'Core GRC',
        price: '$10,000+',
        description: 'Essential risk and compliance management.',
        features: ['Risk assessments', 'Internal controls', 'Policy management', 'Standard reporting']
      },
      {
        name: 'Advanced Risk',
        price: 'Contact Sales',
        description: 'Comprehensive ERM and ORM capabilities.',
        features: ['Enterprise Risk Management', 'Custom workflows', 'Advanced analytics', 'API access']
      },
      {
        name: 'Enterprise Suite',
        price: 'Contact Sales',
        description: 'Integrated security, risk, and compliance.',
        features: ['Integrated Risk & Security', 'Incident Management', 'Dedicated support', 'Custom dashboards']
      }
    ],
    pros: ['High customization flexibility', 'No-code workflow builder', 'Strong reporting & dashboards'],
    cons: ['High cost for small businesses', 'Steep learning curve', 'Complex initial setup'],
    faqs: [
      { question: 'Is Resolver suitable for startups?', answer: 'Generally no. Resolver is designed for organizations with more mature risk and compliance needs.' },
      { question: 'Does Resolver include external audits?', answer: 'No, Resolver is a GRC platform. You will still need to hire an independent auditor for certifications like SOC 2 or ISO 27001.' }
    ],
    bestFor: 'manage complex risk, compliance, and security operations in an integrated platform',
    risclensVerdict: 'Resolver is a powerful, highly customizable GRC tool best suited for mature organizations with complex risk environments. It is overkill for early-stage startups.',
    website: 'https://resolver.com'
  }
];
