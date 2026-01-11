export interface CityData {
  name: string;
  slug: string;
  state: string;
  description: string;
  localInsights: string[];
  pricingNotes: string[];
  onsitePolicy: string;
  industries: string[];
}

export const cities: CityData[] = [
  {
    name: 'Austin',
    slug: 'austin',
    state: 'TX',
    description: "Austin's tech scene is booming. From boot-strapped startups to enterprise relocations, find an auditor who can keep up with your growth.",
    localInsights: [
      'Growing hub for cybersecurity-focused audit firms.',
      'Cost-competitive audit options compared to coastal hubs.',
      'Auditors with specific experience in healthtech and e-commerce.',
    ],
    pricingNotes: [
      'Type I: ~$11k-$17k with regional firms; national firms tend to price higher.',
      'Type II: $17k-$30k depending on scope and control maturity.',
      'Rush fees apply for tight procurement deadlines—book 4–6 weeks ahead to avoid premiums.',
    ],
    onsitePolicy: "Most Austin firms operate remote-first, but many offer hybrid audits.",
    industries: ['SaaS', 'Cybersecurity', 'Healthtech', 'E-commerce', 'AI/ML'],
  },
  {
    name: 'Dallas',
    slug: 'dallas',
    state: 'TX',
    description: "Dallas is a major financial and logistics hub with a deep pool of CPA firms experienced in SOC 2 audits for enterprise and mid-market firms.",
    localInsights: [
      'High concentration of Big 4 and national mid-tier firms.',
      'Strong expertise in fintech, logistics, and data center compliance.',
      'Competitive pricing for Type II audits due to high firm density.',
    ],
    pricingNotes: [
      'Type I: $12k-$18k with mid-market firms.',
      'Type II: $20k-$35k for typical SaaS scope.',
    ],
    onsitePolicy: "Many firms prefer hybrid models for larger enterprises but support 100% remote for SaaS.",
    industries: ['Fintech', 'Logistics', 'Enterprise SaaS', 'Healthtech'],
  },
  {
    name: 'Houston',
    slug: 'houston',
    state: 'TX',
    description: "Houston auditors specialize in energy, healthcare, and aerospace compliance, offering deep technical expertise for complex infrastructure.",
    localInsights: [
      'Specialized knowledge in OT/ICS and energy sector compliance.',
      'Growing focus on healthtech and biotech security standards.',
      'Efficient audit processes for cloud-migrating legacy enterprises.',
    ],
    pricingNotes: [
      'Type I: $12k-$17k.',
      'Type II: $18k-$32k.',
    ],
    onsitePolicy: "Onsite visits are more common in Houston due to physical infrastructure requirements in the energy sector.",
    industries: ['Energy', 'Healthcare', 'Aerospace', 'Industrial Tech'],
  },
  {
    name: 'New York',
    slug: 'new-york',
    state: 'NY',
    description: "NYC is the global center for fintech and media. Auditors here are accustomed to the highest levels of security and regulatory scrutiny.",
    localInsights: [
      'Maximum concentration of specialized fintech and banking auditors.',
      'Highly competitive but premium pricing for top-tier reputation.',
      'Deep experience with NYDFS and other rigorous state regulations.',
    ],
    pricingNotes: [
      'Type I: $15k-$25k with specialized boutique or national firms.',
      'Type II: $25k-$50k+ depending on framework complexity.',
    ],
    onsitePolicy: "Remote is standard, but the 'NYC audit' often involves high-touch project management.",
    industries: ['Fintech', 'Media', 'AdTech', 'LegalTech', 'Enterprise SaaS'],
  },
  {
    name: 'San Francisco',
    slug: 'san-francisco',
    state: 'CA',
    description: "The heart of the SaaS world. SF auditors lead the way in automation-friendly audits and cloud-native compliance strategies.",
    localInsights: [
      'Early adopters of compliance automation platforms (Vanta, Drata).',
      'Most experienced in auditing complex cloud-native architectures.',
      'Premium pricing reflects the high demand and specialized expertise.',
    ],
    pricingNotes: [
      'Type I: $14k-$22k.',
      'Type II: $25k-$45k.',
    ],
    onsitePolicy: "Almost exclusively remote-first audits for the SaaS community.",
    industries: ['Cloud SaaS', 'AI/ML', 'DevTools', 'Web3', 'Consumer Tech'],
  },
  {
    name: 'Chicago',
    slug: 'chicago',
    state: 'IL',
    description: "Chicago offers a balanced mix of traditional CPA excellence and modern tech-focused compliance for the Midwest's largest tech hub.",
    localInsights: [
      'Strong mid-market firm presence with nationwide reach.',
      'Excellent for logistics, trading, and manufacturing tech compliance.',
      'Pragmatic, efficiency-focused audit methodologies.',
    ],
    pricingNotes: [
      'Type I: $12k-$18k.',
      'Type II: $20k-$35k.',
    ],
    onsitePolicy: "Hybrid models are common; great local support for Midwest-based HQ teams.",
    industries: ['Fintech/Trading', 'Logistics', 'Manufacturing', 'SaaS'],
  },
  {
    name: 'Boston',
    slug: 'boston',
    state: 'MA',
    description: "Boston's auditors excel in life sciences, edtech, and deep-tech compliance, catering to the region's elite academic and research institutions.",
    localInsights: [
      'Deep expertise in HIPAA/SOC 2 mappings for biotech.',
      'Specialized edtech compliance (FERPA/SOC 2).',
      'High-quality boutique firms with personalized service.',
    ],
    pricingNotes: [
      'Type I: $13k-$20k.',
      'Type II: $22k-$40k.',
    ],
    onsitePolicy: "Flexible; often dependent on laboratory or physical R&D facility scope.",
    industries: ['Biotech/Life Sciences', 'EdTech', 'Robotics', 'SaaS'],
  },
  {
    name: 'Seattle',
    slug: 'seattle',
    state: 'WA',
    description: "Home to the cloud giants. Seattle auditors are world-class in AWS and Azure infrastructure compliance and large-scale data security.",
    localInsights: [
      'Top-tier expertise in hyperscale cloud security.',
      'Experienced in auditing high-growth e-commerce platforms.',
      'Strong focus on automation and developer-friendly evidence.',
    ],
    pricingNotes: [
      'Type I: $13k-$20k.',
      'Type II: $22k-$40k.',
    ],
    onsitePolicy: "Remote-first is the standard for the PNW tech corridor.",
    industries: ['Cloud Infrastructure', 'E-commerce', 'Enterprise SaaS', 'Gaming'],
  },
];

export const cityBySlug = cities.reduce((acc, city) => {
  acc[city.slug] = city;
  return acc;
}, {} as Record<string, CityData>);
