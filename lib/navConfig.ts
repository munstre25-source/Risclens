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
  columns?: number; // Added to support multi-column layouts
}

export const CTA = {
  href: '/soc-2-readiness-index',
  label: 'Get Free Assessment',
};

export const navConfig: Record<string, NavCategoryConfig> = {
  frameworks: {
    label: 'Frameworks',
    href: '/compliance',
    items: [
      { label: 'SOC 2 Suite', href: '/soc-2', badge: 'Flagship', description: 'Complete readiness, costs & timelines' },
      { label: 'ISO 27001 Hub', href: '/iso-27001', description: 'Controls, checklists & certification' },
      { label: 'PCI-DSS Compliance', href: '/pci-dss', description: 'Payment security requirements' },
      { label: 'AI Governance Hub', href: '/ai-governance', badge: 'Hub', description: 'ISO 42001 & emerging AI standards' },
    ],
    sections: [
      {
        title: 'Framework Comparisons',
        items: [
          { label: 'SOC 2 vs ISO 27001', href: '/compliance/compare/soc-2-vs-iso-27001', description: 'Side-by-side requirements' },
          { label: 'ISO 42001 vs EU AI Act', href: '/compliance/compare/iso-42001-vs-eu-ai-act', description: 'AI Governance guide' },
          { label: 'Migration Hub', href: '/compliance/migrate', description: 'Cross-framework mapping guides' },
          { label: 'Type I vs Type II', href: '/soc-2-type-i-vs-type-ii', description: 'Which audit is right for you' },
        ],
      },
    ],
  },

  tools: {
    label: 'Tools & Calculators',
    href: '/tools',
    items: [
      { label: 'SOC 2 Readiness Index', href: '/soc-2-readiness-index', badge: 'Popular', description: 'Free 5-minute assessment' },
      { label: 'Evidence Gap Analyzer', href: '/evidence-gap-analyzer', badge: 'AI', description: 'AI-powered control gap detection' },
    ],
    sections: [
      {
        title: 'Estimators',
        items: [
          { label: 'SOC 2 Cost Calculator', href: '/soc-2-cost-calculator', description: 'Budget your audit spend' },
          { label: 'Timeline Estimator', href: '/soc-2-timeline/estimator', description: 'Plan your certification path' },
          { label: 'Compliance ROI', href: '/compliance-roi-calculator', description: 'Justify your investment' },
        ],
      },
      {
        title: 'Specialized',
        items: [
          { label: 'AI Governance Index', href: '/ai-governance-readiness-index', description: 'ISO 42001 readiness' },
          { label: 'PCI-DSS Calculator', href: '/pci-dss-readiness-calculator', description: 'Payment compliance costs' },
        ],
      },
    ],
  },

  intelligence: {
    label: 'Intelligence',
    href: '/intelligence-hub',
    columns: 3,
    sections: [
      {
        title: 'Market Intelligence',
        items: [
          { label: 'Pricing Hub', href: '/pricing', description: 'Compare 50+ platform costs' },
          { label: 'Platform Comparisons', href: '/compare', description: 'Vanta vs Drata & more' },
          { label: 'Compliance Directory', href: '/compliance/directory', description: 'Search 2,400+ verified companies' },
          { label: 'Security Signals', href: '/soc-2-evidence/vault', badge: 'New', description: 'Real-time compliance data' },
        ],
      },
      {
        title: 'The Compliance Matrix',
        items: [
          { label: 'Browse by Industry', href: '/soc-2/industries', badge: '15k+', description: 'Fintech, SaaS, Healthcare & more' },
          { label: 'Browse by Role', href: '/intelligence-hub?tab=Roles', description: 'CTOs, Founders, DevOps guides' },
          { label: 'Browse by Stack', href: '/soc-2/stack', description: 'AWS, Azure, GCP, Vercel guides' },
          { label: 'Matrix Directory', href: '/compliance/matrix', description: 'Full sitemap of intelligence nodes' },
        ],
      },
      {
        title: 'Knowledge Base',
        items: [
          { label: 'Learning Center', href: '/learn', description: 'All guides & tutorials' },
          { label: 'SOC 2 Glossary', href: '/glossary', description: '100+ compliance terms' },
          { label: 'Readiness Checklist', href: '/soc-2-readiness-checklist', description: 'Step-by-step preparation' },
          { label: 'Penetration Testing', href: '/penetration-testing', description: 'Pentest prep & scoping' },
        ],
      },
    ],
  },

  auditors: {
    label: 'Auditors',
    href: '/auditor-directory',
    items: [
      { label: 'Auditor Match', href: '/auditor-match', badge: 'Match', description: 'Get competitive bids from auditors' },
    ],
    sections: [
      {
        title: 'Discovery',
        items: [
          { label: 'Auditor Directory', href: '/auditor-directory', description: 'Find auditors by city' },
          { label: 'Auditor Selection', href: '/soc-2/auditor-selection', description: 'How to choose the right firm' },
          { label: 'Auditor Portal', href: '/auditor-portal', badge: 'Partner', description: 'For audit firms' },
        ],
      },
    ],
  },
};

export const industriesNav = industryCostLinks.map(({ label, hubHref }) => ({
  label,
  href: hubHref,
}));

export const costIndustries = industryCostLinks;
