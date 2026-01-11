export interface ToolCostData {
  name: string;
  slug: string;
  description: string;
  assumptions: string[];
  costBreakdown: string[];
  savings: string[];
  targetAudience: string;
  pros: string[];
  cons: string[];
}

export const tools: ToolCostData[] = [
  {
    name: 'Vanta',
    slug: 'vanta',
    description: 'Vanta is a leader in trust management. Combining Vanta with a vetted auditor can significantly reduce the internal effort and total spend on your SOC 2.',
    assumptions: [
      'Standard SaaS headcount (10-100 employees).',
      'Integration-heavy cloud stack (AWS/GCP/Azure + GitHub + Okta).',
      'Auditor selected from Vanta’s preferred network for maximum efficiency.',
    ],
    costBreakdown: [
      'Vanta Subscription: $10k - $25k (varies by headcount and TSCs).',
      'Auditor Fee: $10k - $20k (discounted via Vanta network).',
      'Internal Time: ~20-40 hours (down from 100+).',
    ],
    savings: [
      '30-50% reduction in auditor walkthrough time.',
      'Automated evidence collection replaces manual screenshots.',
      'Pre-built policy templates save $5k+ in consulting fees.',
    ],
    targetAudience: 'Early to mid-stage SaaS companies looking for speed and scalability.',
    pros: [
      'Deepest integration library in the market.',
      'Strongest network of "automation-friendly" auditors.',
      'Includes Trust Center for report sharing.',
    ],
    cons: [
      'Premium pricing compared to some newer entrants.',
      'Requires team buy-in to follow Vanta-specific control naming.',
    ],
  },
  {
    name: 'Drata',
    slug: 'drata',
    description: 'Drata offers a highly automated platform with a focus on continuous monitoring and a robust auditor-facing portal.',
    assumptions: [
      'Multi-cloud or complex identity requirements.',
      'Need for custom control mappings beyond baseline SOC 2.',
      'Preference for high-touch customer success during rollout.',
    ],
    costBreakdown: [
      'Drata Subscription: $12k - $30k.',
      'Auditor Fee: $12k - $25k.',
      'Internal Time: ~25-45 hours.',
    ],
    savings: [
      'Real-time monitoring prevents "broken controls" that cause audit rework.',
      'Auditor portal allows for async evidence review, reducing meeting debt.',
      'Combined SOC 2 + ISO 27001 packages reduce duplicate effort.',
    ],
    targetAudience: 'Enterprise-focused startups and companies with complex compliance needs.',
    pros: [
      'Excellent user interface and auditor experience.',
      'Highly flexible control customization.',
      'Strong support for multiple frameworks (ISO, HIPAA, GDPR).',
    ],
    cons: [
      'Can be more expensive than lightweight alternatives.',
      'Steeper learning curve for very small teams.',
    ],
  },
  {
    name: 'Secureframe',
    slug: 'secureframe',
    description: 'Secureframe balances powerful automation with expert-led compliance support to guide teams through their first audit.',
    assumptions: [
      'First-time SOC 2 candidates needing more guidance.',
      'Interest in a "compliance-in-a-box" experience.',
    ],
    costBreakdown: [
      'Secureframe Subscription: $8k - $20k.',
      'Auditor Fee: $10k - $18k.',
      'Internal Time: ~30-50 hours.',
    ],
    savings: [
      'Dedicated compliance manager reduces the need for external consultants.',
      'Competitive auditor pricing via partner network.',
      'Fast-track templates for policies and procedures.',
    ],
    targetAudience: 'Founders and lean teams who want a guided compliance journey.',
    pros: [
      'Included compliance advisory support.',
      'Streamlined onboarding process.',
      'Good value-to-feature ratio.',
    ],
    cons: [
      'Smaller integration ecosystem than Vanta/Drata.',
      'Auditor network is slightly more selective.',
    ],
  },
  {
    name: 'Sprinto',
    slug: 'sprinto',
    description: 'Sprinto specializes in high-velocity compliance for tech startups, emphasizing low-touch automation and fixed-price audits.',
    assumptions: [
      'High-growth tech teams focused on engineering velocity.',
      'Preference for fixed-cost compliance bundles.',
    ],
    costBreakdown: [
      'Sprinto Subscription: $6k - $15k.',
      'Auditor Fee: $8k - $12k (often bundled).',
      'Internal Time: ~15-30 hours.',
    ],
    savings: [
      'Lowest TCO (Total Cost of Ownership) for early-stage startups.',
      'Bundled auditor deals eliminate the need for separate procurement.',
      'Engineering-centric workflows reduce non-technical overhead.',
    ],
    targetAudience: 'Agile startups and international teams looking for the fastest path to SOC 2.',
    pros: [
      'Highly affordable fixed-price models.',
      'Extremely fast implementation timelines.',
      'Auditor-friendly automated evidence exports.',
    ],
    cons: [
      'May feel too automated for extremely complex enterprise requirements.',
      'Niche focus on tech/SaaS might not fit traditional industries.',
    ],
  },
];

export const toolBySlug = tools.reduce((acc, tool) => {
  acc[tool.slug] = tool;
  return acc;
}, {} as Record<string, ToolCostData>);
