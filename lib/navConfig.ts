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
            { label: 'NIST AI RMF vs EU AI Act', href: '/compliance/compare/nist-ai-rmf-vs-eu-ai-act', description: 'AI Risk comparison' },
            { label: 'HIPAA vs GDPR', href: '/compliance/compare/hipaa-vs-gdpr', description: 'Privacy framework mapping' },
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
      { label: 'Vendor Risk Program', href: '/vendor-risk-program', badge: 'New', description: 'Third-party risk automation' },
    ],
    sections: [
      {
        title: 'Cost & Timeline Estimators',
        items: [
          { label: 'SOC 2 Cost Calculator', href: '/soc-2-cost-calculator', description: 'Budget your audit spend' },
          { label: 'Timeline Estimator', href: '/soc-2-timeline/estimator', description: 'Plan your certification path' },
          { label: 'Audit Delay Cost', href: '/soc-2-audit-delay-cost', description: 'Revenue impact calculator' },
          { label: 'Compliance ROI', href: '/compliance-roi-calculator', description: 'Justify your investment' },
        ],
      },
      {
        title: 'Specialized Assessments',
        items: [
          { label: 'AI Governance Index', href: '/ai-governance-readiness-index', description: 'ISO 42001 readiness' },
          { label: 'PCI-DSS Calculator', href: '/pci-dss-readiness-calculator', description: 'Payment compliance costs' },
          { label: 'ISO 42001 Calculator', href: '/iso-42001-calculator', description: 'AI compliance budget' },
        ],
      },
    ],
  },

  marketInsights: {
    label: 'Market Insights',
    href: '/intelligence-hub',
    items: [
      { label: 'Intelligence Hub', href: '/intelligence-hub', badge: 'Live', description: 'Real-time vendor & market data' },
    ],
    sections: [
      {
        title: 'Software Selection',
        items: [
          { label: 'Pricing Hub', href: '/pricing', description: 'Compare 50+ platform costs' },
          { label: 'Platform Comparisons', href: '/compare', description: 'Drata vs Vanta, Secureframe & more' },
          { label: 'Compliance Directory', href: '/compliance/directory', description: 'Search 2,400+ verified companies' },
        ],
      },
      {
        title: 'Auditor Discovery',
        items: [
          { label: 'Auditor Directory', href: '/auditor-directory', description: 'Find SOC 2 & ISO auditors by city' },
          { label: 'Auditor Match', href: '/auditor-match', description: 'Get competitive bids from auditors' },
          { label: 'Auditor Portal', href: '/auditor-portal', badge: 'Partner', description: 'For audit firms' },
        ],
      },
    ],
  },

  guides: {
    label: 'Guides',
    href: '/learn',
    sections: [
      {
        title: 'By Industry',
        items: [
          { label: 'SaaS Compliance', href: '/soc-2/industries/saas', description: 'B2B software requirements' },
          { label: 'Fintech Compliance', href: '/soc-2/industries/fintech', description: 'Financial services security' },
          { label: 'Healthcare Compliance', href: '/soc-2/industries/healthcare', description: 'HIPAA + SOC 2 overlap' },
          { label: 'All Industries', href: '/soc-2/industries', badge: '12+', description: 'View all industry guides' },
        ],
      },
      {
        title: 'By Tech Stack',
        items: [
          { label: 'AWS Compliance', href: '/soc-2/stack/aws', description: 'Amazon Web Services' },
          { label: 'Azure Compliance', href: '/soc-2/stack/azure', description: 'Microsoft Azure' },
          { label: 'GCP Compliance', href: '/soc-2/stack/gcp', description: 'Google Cloud Platform' },
          { label: 'All Tech Stacks', href: '/soc-2/stack', badge: '18+', description: 'Kubernetes, Vercel & more' },
        ],
      },
        {
          title: 'By Role',
          items: [
            { label: 'For Founders', href: '/soc-2/for/founders', description: 'Executive compliance roadmap' },
            { label: 'For CTOs', href: '/soc-2/for/cto', description: 'Technical implementation' },
            { label: 'For Security Leaders', href: '/soc-2/for/devops', description: 'DevSecOps best practices' },
            { 
              label: 'View All Roles', 
              href: '/intelligence-hub?tab=Roles', 
              badge: '50+', 
              description: 'Department-specific roadmaps' 
            },
          ],
        },
    ],
  },

  resources: {
    label: 'Resources',
    href: '/learn',
    sections: [
      {
        title: 'Learning Hub',
        items: [
          { label: 'Learning Center', href: '/learn', description: 'All guides & tutorials' },
          { label: 'SOC 2 Glossary', href: '/glossary', description: '100+ compliance terms' },
          { label: 'Evidence Vault', href: '/soc-2-evidence/vault', description: 'Sample policies & templates' },
          { label: 'Readiness Checklist', href: '/soc-2-readiness-checklist', description: 'Step-by-step preparation' },
        ],
      },
      {
        title: 'Deep Dives',
        items: [
          { label: 'SOC 2 Cost Guide', href: '/soc-2-cost', description: 'Complete pricing breakdown' },
          { label: 'SOC 2 Timeline', href: '/soc-2-timeline', description: 'Realistic certification paths' },
          { label: 'Penetration Testing', href: '/penetration-testing', badge: 'Guide', description: 'Pentest prep & scoping' },
          { label: 'Vendor Risk Assessment', href: '/vendor-risk-assessment', description: 'Third-party due diligence' },
        ],
      },
      {
        title: 'Company',
        items: [
          { label: 'About RiscLens', href: '/about' },
          { label: 'Methodology', href: '/methodology' },
          { label: 'Editorial Policy', href: '/editorial-policy' },
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
