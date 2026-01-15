'use client';

import Link from 'next/link';

/**
 * TopicalClusterLinks - Internal linking component for pSEO pages
 * Improves crawl discovery and distributes link equity to related pages
 */

interface LinkCluster {
  title: string;
  links: { href: string; label: string }[];
}

interface TopicalClusterLinksProps {
  framework?: 'soc-2' | 'iso-27001' | 'pci-dss' | 'hipaa' | 'gdpr' | 'ai-governance';
  industry?: string;
  currentPath?: string;
}

// Pre-defined clusters for different page types
const frameworkClusters: Record<string, LinkCluster[]> = {
  'soc-2': [
    {
      title: 'SOC 2 Essentials',
      links: [
        { href: '/soc-2-readiness-index', label: 'Free Readiness Assessment' },
        { href: '/soc-2-cost', label: 'SOC 2 Cost Calculator' },
        { href: '/soc-2-timeline', label: 'Timeline Estimator' },
        { href: '/soc-2/guides', label: 'All SOC 2 Guides' },
      ],
    },
    {
      title: 'Industry Guides',
      links: [
        { href: '/soc-2/industries/saas', label: 'SOC 2 for SaaS' },
        { href: '/soc-2/industries/fintech', label: 'SOC 2 for Fintech' },
        { href: '/soc-2/industries/healthcare', label: 'SOC 2 for Healthcare' },
        { href: '/soc-2/industries/startups', label: 'SOC 2 for Startups' },
      ],
    },
    {
      title: 'Compare Platforms',
      links: [
        { href: '/compare/vanta-vs-drata', label: 'Vanta vs Drata' },
        { href: '/compare/vanta-alternatives', label: 'Vanta Alternatives' },
        { href: '/compare/drata-alternatives', label: 'Drata Alternatives' },
        { href: '/compare', label: 'All Comparisons' },
      ],
    },
  ],
  'iso-27001': [
    {
      title: 'ISO 27001 Resources',
      links: [
        { href: '/iso-27001-checklist', label: 'ISO 27001 Checklist' },
        { href: '/soc-2-vs-iso-27001', label: 'SOC 2 vs ISO 27001' },
        { href: '/compliance/migrate/soc-2-to-iso-27001', label: 'Migration Roadmap' },
      ],
    },
    {
      title: 'Related Frameworks',
      links: [
        { href: '/soc-2', label: 'SOC 2 Hub' },
        { href: '/ai-governance', label: 'AI Governance' },
        { href: '/pci-dss-readiness-calculator', label: 'PCI DSS Calculator' },
      ],
    },
  ],
  'ai-governance': [
    {
      title: 'AI Compliance Tools',
      links: [
        { href: '/iso-42001-calculator', label: 'ISO 42001 Calculator' },
        { href: '/ai-governance-readiness-index', label: 'AI Readiness Assessment' },
        { href: '/ai-governance/risk-classifier', label: 'AI Risk Classifier' },
      ],
    },
    {
      title: 'AI Compliance Guides',
      links: [
        { href: '/ai-compliance/nist-ai-rmf', label: 'NIST AI RMF Guide' },
        { href: '/ai-compliance/iso-42001', label: 'ISO 42001 Guide' },
        { href: '/ai-compliance/eu-ai-act', label: 'EU AI Act Guide' },
      ],
    },
  ],
};

const industryClusters: Record<string, LinkCluster[]> = {
  'saas': [
    {
      title: 'SaaS Compliance',
      links: [
        { href: '/soc-2/industries/saas', label: 'SOC 2 for SaaS' },
        { href: '/soc-2-cost/saas', label: 'SaaS Compliance Costs' },
        { href: '/pricing/vanta', label: 'Vanta Pricing (SaaS)' },
      ],
    },
  ],
  'fintech': [
    {
      title: 'Fintech Compliance',
      links: [
        { href: '/soc-2/industries/fintech', label: 'SOC 2 for Fintech' },
        { href: '/soc-2-cost/fintech', label: 'Fintech Compliance Costs' },
        { href: '/pci-dss-readiness-calculator', label: 'PCI DSS Calculator' },
      ],
    },
  ],
  'healthcare': [
    {
      title: 'Healthcare Compliance',
      links: [
        { href: '/soc-2/industries/healthcare', label: 'SOC 2 for Healthcare' },
        { href: '/soc-2-cost/healthcare', label: 'Healthcare Costs' },
        { href: '/compliance/hipaa', label: 'HIPAA Compliance' },
      ],
    },
  ],
};

export default function TopicalClusterLinks({ 
  framework, 
  industry, 
  currentPath 
}: TopicalClusterLinksProps) {
  const clusters: LinkCluster[] = [];

  // Add framework-specific clusters
  if (framework && frameworkClusters[framework]) {
    clusters.push(...frameworkClusters[framework]);
  }

  // Add industry-specific clusters
  if (industry && industryClusters[industry]) {
    clusters.push(...industryClusters[industry]);
  }

  // Default clusters if nothing specific
  if (clusters.length === 0) {
    clusters.push({
      title: 'Start Here',
      links: [
        { href: '/soc-2-readiness-index', label: 'SOC 2 Readiness Assessment' },
        { href: '/iso-42001-calculator', label: 'ISO 42001 Calculator' },
        { href: '/compliance-roi-calculator', label: 'Compliance ROI Calculator' },
        { href: '/tools', label: 'All Tools' },
      ],
    });
  }

  // Filter out current page from links
  const filteredClusters = clusters.map(cluster => ({
    ...cluster,
    links: cluster.links.filter(link => link.href !== currentPath),
  })).filter(cluster => cluster.links.length > 0);

  if (filteredClusters.length === 0) return null;

  return (
    <aside className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
        Related Resources
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClusters.slice(0, 3).map((cluster) => (
          <div key={cluster.title}>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">{cluster.title}</h4>
            <ul className="space-y-1">
              {cluster.links.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
