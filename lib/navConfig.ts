import { industryCostLinks } from './industryCostLinks';

export const CTA = {
  href: '/soc-2-readiness-index',
  label: 'Get Free Assessment',
};

export const navConfig = {
  frameworks: {
    label: 'Frameworks',
    href: '/compliance',
    items: [
      { label: 'Compliance Hub', href: '/compliance', description: 'Browse all standards in one hub', badge: 'Hub' },
      { label: 'SOC 2 Suite', href: '/soc-2', description: 'Readiness, costs, and timelines', badge: 'Flagship' },
      { label: 'ISO 42001 (AI)', href: '/ai-compliance', badge: 'New', description: 'AI Governance & Compliance' },
      { label: 'ISO 27001', href: '/soc-2-vs-iso-27001', description: 'Gap analysis and roadmap' },
    ],
      sections: [
        {
          title: 'Deep Dives',
          items: [
            { label: 'SOC 2 Cost Guide', href: '/soc-2-cost' },
            { label: 'SOC 2 Timeline', href: '/soc-2-timeline' },
            { label: 'Readiness Checklist', href: '/soc-2-readiness-checklist' },
            { label: 'Evidence & Controls', href: '/soc-2-evidence' },
          ],
        },
        {
          title: 'Cost & Pricing',
          items: [
            { label: 'Pricing Hub', href: '/pricing', badge: 'New', description: 'Vendor cost intelligence' },
            { label: 'SOC 2 Cost Calculator', href: '/soc-2-cost-calculator' },
          ],
        },
        ],
      },

  solutions: {
    label: 'Solutions',
    href: '/soc-2/industries',
    sections: [
      {
        title: 'By Industry',
        items: [
          { label: 'SaaS Compliance', href: '/soc-2/industries/saas' },
          { label: 'Fintech Compliance', href: '/soc-2/industries/fintech' },
          { label: 'Healthcare & HIPAA', href: '/soc-2/industries/healthcare' },
          { label: 'AI & Data Platforms', href: '/soc-2/industries/ai-data' },
        ],
      },
      {
        title: 'By Role',
        items: [
          { label: 'For Founders', href: '/soc-2/for/founders' },
          { label: 'For CTOs', href: '/soc-2/for/cto' },
          { label: 'For DevOps/Security', href: '/soc-2/for/devops' },
        ],
      },
      {
        title: 'Directories',
        items: [
          { label: 'Compliance Directory', href: '/compliance/directory', description: '2,400+ verified companies' },
          { label: 'Auditor Directory', href: '/auditor-directory', description: 'Find regional auditors' },
          { label: 'Auditor Portal', href: '/auditor-portal', badge: 'Bidding' },
        ],
      },
    ],
  },

        tools: {
        label: 'Tools',
        href: '/tools',
          sections: [
            {
              title: 'Tools',
              items: [
                { label: 'Evidence Gap Analyzer', href: '/evidence-gap-analyzer', badge: 'AI', description: 'Analyze your policies for SOC 2 gaps' },
                { label: 'AI Governance Index', href: '/ai-governance-readiness-index', badge: 'New' },
                { label: 'Readiness Index', href: '/soc-2-readiness-index', badge: 'Popular' },
                { label: 'Timeline Estimator', href: '/soc-2-timeline/estimator' },
                { label: 'SOC 2 Cost Calculator', href: '/soc-2-cost-calculator' },
                { label: 'Audit Delay Cost', href: '/soc-2-audit-delay-cost' },
                { label: 'Compliance ROI', href: '/compliance-roi-calculator' },
              ],
            },
          ],
        },

  resources: {
    label: 'Resources',
    href: '/learn',
    sections: [
      {
        title: 'Learning Center',
        items: [
          { label: 'SOC 2 Glossary', href: '/glossary' },
          { label: 'Methodology', href: '/methodology' },
          { label: 'Editorial Policy', href: '/editorial-policy' },
        ],
      },
      {
        title: 'Company',
        items: [
          { label: 'About RiscLens', href: '/about' },
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
      },
    ],
  },
};

export const navConfigLegacy = navConfig;

export const industriesNav = industryCostLinks.map(({ label, hubHref }) => ({
  label,
  href: hubHref,
}));

export const costIndustries = industryCostLinks;
