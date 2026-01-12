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
      { label: 'Intelligence Hub', href: '/intelligence-hub', description: 'Real-time vendor & pricing data', badge: 'Live' },
      { label: 'Matrix Explorer', href: '/compliance', description: 'Custom compliance roadmap generator', badge: 'AI' },
      { label: 'Evidence Gap Analyzer', href: '/evidence-gap-analyzer', description: 'AI-powered policy & control gaps', badge: 'AI' },
      { label: 'Vendor Risk Program', href: '/vendor-risk-program', description: 'Automation & triage tools', badge: 'New' },
    ],
    sections: [
      {
        title: 'Assessments & Services',
        items: [
          { label: 'SOC 2 Readiness Index', href: '/soc-2-readiness-index', badge: 'Popular' },
          { label: 'AI Governance Index', href: '/ai-governance-readiness-index' },
          { label: 'Penetration Testing', href: '/penetration-testing', badge: 'Service' },
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
            { label: 'AI Governance Hub', href: '/ai-compliance', badge: 'Hub' },
        ],
      },
      {
        title: 'Strategic Path',
        items: [
          { label: 'Migration Hub', href: '/compliance/migrate', badge: 'Guides', description: 'Cross-framework mapping' },
          { label: 'SOC 2 Cost Guide', href: '/soc-2-cost' },
          { label: 'SOC 2 Timeline', href: '/soc-2-timeline' },
          { label: 'Readiness Checklist', href: '/soc-2-readiness-checklist' },
        ],
      },
    ],
  },

  marketIntel: {
    label: 'Market Intelligence',
    href: '/intelligence-hub',
    sections: [
      {
        title: 'Buying & Selection',
        items: [
          { label: 'Pricing Hub', href: '/pricing', description: 'Benchmark SaaS compliance costs' },
          { label: 'Platform Comparisons', href: '/compare', description: 'In-depth head-to-head analysis' },
          { label: 'Compliance Directory', href: '/compliance/directory', description: 'Search 2,400+ verified companies' },
        ],
      },
      {
        title: 'Auditor Discovery',
        items: [
          { label: 'Auditor Directory', href: '/auditor-directory', description: 'Find local compliance partners' },
          { label: 'Auditor Match', href: '/auditor-match', description: 'Connect & request bids' },
          { label: 'Auditor Portal', href: '/auditor-portal', badge: 'Partner' },
        ],
      },
    ],
  },

  solutions: {
    label: 'Solutions',
    href: '/soc-2/industries',
    sections: [
      {
        title: 'By Tech Stack',
        items: [
          { label: 'Tech-Stack Hub', href: '/soc-2/stack', badge: 'Hub', description: 'All platform guides' },
          { label: 'AWS Compliance', href: '/soc-2/stack/aws' },
          { label: 'Azure Compliance', href: '/soc-2/stack/azure' },
          { label: 'GCP Compliance', href: '/soc-2/stack/gcp' },
          { label: 'Kubernetes', href: '/soc-2/stack/kubernetes' },
          { label: 'Supabase & Vercel', href: '/soc-2/stack/supabase' },
        ],
      },
      {
        title: 'By Industry',
        items: [
          { label: 'SaaS Compliance', href: '/soc-2/industries/saas' },
          { label: 'Fintech Compliance', href: '/soc-2/industries/fintech' },
          { label: 'Healthcare & AI', href: '/soc-2/industries/healthcare' },
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
        title: 'Calculators & Tools',
        items: [
          { label: 'SOC 2 Cost Calculator', href: '/soc-2-cost-calculator' },
          { label: 'Timeline Estimator', href: '/soc-2-timeline/estimator' },
          { label: 'Compliance ROI', href: '/compliance-roi-calculator' },
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
