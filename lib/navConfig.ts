import { industryCostLinks } from './industryCostLinks';

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface NavCategoryConfig {
  label: string;
  href: string;
  items?: NavItem[];
  sections: NavSection[];
}

export const CTA = {
  href: '/soc-2-readiness-index',
  label: 'Get Free Assessment',
};

export const navConfig: Record<string, NavCategoryConfig> = {
  platform: {
    label: 'Platform',
    href: '/tools',
    items: [
      { label: 'Intelligence Hub', href: '/intelligence-hub', description: 'Real-time vendor & pricing data', badge: 'Hub' },
      { label: 'Matrix Explorer', href: '/compliance', description: 'Custom compliance roadmap generator', badge: 'AI' },
      { label: 'Penetration Testing', href: '/penetration-testing', description: 'Scoping, costs, and SOW tools', badge: 'Service' },
      { label: 'Vendor Risk Mgmt', href: '/vendor-risk-program', description: 'Automation & triage tools', badge: 'New' },
      { label: 'Evidence Gap Analyzer', href: '/evidence-gap-analyzer', description: 'Policy analysis for SOC 2 gaps', badge: 'AI' },
    ],
    sections: [
      {
        title: 'Indices & Readiness',
        items: [
          { label: 'SOC 2 Readiness Index', href: '/soc-2-readiness-index', badge: 'Popular' },
          { label: 'AI Governance Index', href: '/ai-governance-readiness-index', badge: 'New' },
          { label: 'Compliance ROI Calculator', href: '/compliance-roi-calculator' },
        ],
      },
    ],
  },

  frameworks: {
    label: 'Frameworks',
    href: '/compliance',
    sections: [
      {
        title: 'Core Standards',
        items: [
          { label: 'SOC 2 Suite', href: '/soc-2', badge: 'Flagship', description: 'Readiness, costs, and timelines' },
          { label: 'ISO 27001 Hub', href: '/iso-27001' },
          { label: 'HIPAA Compliance', href: '/soc-2/industries/healthcare' },
          { label: 'PCI-DSS Compliance', href: '/pci-dss' },
          { label: 'AI (ISO 42001)', href: '/ai-compliance', badge: 'New' },
        ],
      },
      {
        title: 'SOC 2 Deep Dives',
        items: [
          { label: 'SOC 2 Cost Guide', href: '/soc-2-cost' },
          { label: 'SOC 2 Timeline', href: '/soc-2-timeline' },
          { label: 'Readiness Checklist', href: '/soc-2-readiness-checklist' },
          { label: 'Evidence & Controls', href: '/soc-2-evidence' },
        ],
      },
    ],
  },

  marketIntel: {
    label: 'Market Intel',
    href: '/intelligence-hub',
    sections: [
      {
        title: 'Buying & Selection',
        items: [
          { label: 'Pricing Hub', href: '/pricing', description: 'Benchmark SaaS compliance costs' },
          { label: 'Platform Comparisons', href: '/compare', description: 'In-depth head-to-head analysis' },
          { label: 'Compliance Directory', href: '/compliance/directory', description: 'Search 2,400+ verified companies' },
          { label: 'Auditor Match', href: '/auditor-match', description: 'Connect with regional auditors' },
        ],
      },
      {
        title: 'Vendor Intelligence',
        items: [
          { label: 'Market Intelligence', href: '/intelligence-hub', badge: 'Live' },
          { label: 'Auditor Directory', href: '/auditor-directory' },
          { label: 'Auditor Portal', href: '/auditor-portal', badge: 'Bidding' },
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
          { label: 'Healthcare & AI', href: '/soc-2/industries/healthcare' },
          { label: 'Migration Hub', href: '/compliance/migrate', badge: 'Guides' },
        ],
      },
      {
        title: 'By Role',
        items: [
          { label: 'For Founders', href: '/soc-2/for/founders' },
          { label: 'For CTOs', href: '/soc-2/for/cto' },
          { label: 'For Security Leaders', href: '/soc-2/for/devops' },
        ],
      },
    ],
  },

  resources: {
    label: 'Resources',
    href: '/learn',
    sections: [
      {
        title: 'Utility & Tools',
        items: [
          { label: 'SOC 2 Cost Calculator', href: '/soc-2-cost-calculator' },
          { label: 'Timeline Estimator', href: '/soc-2-timeline/estimator' },
          { label: 'Audit Delay Cost', href: '/soc-2-audit-delay-cost' },
        ],
      },
      {
        title: 'Learning & Company',
        items: [
          { label: 'Learning Center', href: '/learn' },
          { label: 'SOC 2 Glossary', href: '/glossary' },
          { label: 'Methodology', href: '/methodology' },
          { label: 'About RiscLens', href: '/about' },
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
