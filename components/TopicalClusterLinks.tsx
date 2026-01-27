'use client';

import Link from 'next/link';

/**
 * TopicalClusterLinks - Internal Linking Component
 * 
 * Distributes link equity and improves crawl discovery.
 */

interface LinkCluster {
  title: string;
  links: { href: string; label: string }[];
}

interface TopicalClusterLinksProps {
  framework?: 'soc-2' | 'iso-27001' | 'pci-dss' | 'hipaa' | 'gdpr' | 'ai-governance';
  industry?: string;
  currentPath?: string;
  pageType?: 'pricing' | 'comparison' | 'directory' | 'guide' | 'calculator';
  variant?: 'sidebar' | 'inline' | 'footer';
}

// Pre-defined clusters for different page types
const frameworkClusters: Record<string, LinkCluster[]> = {
  'soc-2': [
    {
      title: 'SOC 2 Tools',
      links: [
        { href: '/soc-2-readiness-index', label: 'Readiness Assessment' },
        { href: '/soc-2-cost', label: 'Cost Calculator' },
        { href: '/soc-2-timeline', label: 'Timeline Estimator' },
      ],
    },
    {
      title: 'By Industry',
      links: [
        { href: '/soc-2/industries/saas', label: 'SOC 2 for SaaS' },
        { href: '/soc-2/industries/fintech', label: 'SOC 2 for Fintech' },
        { href: '/soc-2/industries/healthcare', label: 'Healthcare' },
      ],
    },
    {
      title: 'Compare',
      links: [
        { href: '/compare/vanta-vs-drata', label: 'Vanta vs Drata' },
        { href: '/compare/drata-vs-onetrust', label: 'Drata vs OneTrust' },
        { href: '/compare/scytale-vs-workiva', label: 'Scytale vs Workiva' },
        { href: '/compare/onetrust-alternatives', label: 'OneTrust Alternatives' },
      ],
    },
  ],
  'iso-27001': [
    {
      title: 'ISO 27001',
      links: [
        { href: '/iso-27001-checklist', label: 'Checklist' },
        { href: '/soc-2-vs-iso-27001', label: 'SOC 2 vs ISO 27001' },
        { href: '/compliance/migrate/soc-2-to-iso-27001', label: 'Migration Guide' },
      ],
    },
    {
      title: 'Related',
      links: [
        { href: '/soc-2', label: 'SOC 2' },
        { href: '/ai-governance', label: 'AI Governance' },
        { href: '/pci-dss', label: 'PCI DSS' },
      ],
    },
  ],
  'ai-governance': [
    {
      title: 'AI Compliance',
      links: [
        { href: '/iso-42001-calculator', label: 'ISO 42001 Calculator' },
        { href: '/ai-governance-readiness-index', label: 'AI Readiness' },
        { href: '/ai-governance/risk-classifier', label: 'Risk Classifier' },
      ],
    },
    {
      title: 'Guides',
      links: [
        { href: '/ai-compliance/nist-ai-rmf', label: 'NIST AI RMF' },
        { href: '/ai-compliance/iso-42001', label: 'ISO 42001' },
        { href: '/ai-compliance/eu-ai-act', label: 'EU AI Act' },
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
        { href: '/soc-2-cost/saas', label: 'SaaS Costs' },
        { href: '/pricing/vanta', label: 'Vanta Pricing' },
      ],
    },
  ],
  'fintech': [
    {
      title: 'Fintech',
      links: [
        { href: '/soc-2/industries/fintech', label: 'SOC 2 for Fintech' },
        { href: '/soc-2-cost/fintech', label: 'Fintech Costs' },
        { href: '/pci-dss', label: 'PCI DSS' },
      ],
    },
  ],
  'healthcare': [
    {
      title: 'Healthcare',
      links: [
        { href: '/soc-2/industries/healthcare', label: 'SOC 2 for Healthcare' },
        { href: '/soc-2-cost/healthcare', label: 'Healthcare Costs' },
      ],
    },
  ],
};

// Page type specific clusters - includes high-impression pages for internal link boost
const pageTypeClusters: Record<string, LinkCluster[]> = {
  'pricing': [
    {
      title: 'Compare Pricing',
      links: [
        { href: '/compare/vanta-vs-drata', label: 'Vanta vs Drata' },
        { href: '/compare/drata-vs-onetrust', label: 'Drata vs OneTrust' },
        { href: '/compare/secureframe-vs-onetrust', label: 'Secureframe vs OneTrust' },
        { href: '/pricing/auditboard', label: 'AuditBoard Pricing' },
      ],
    },
    {
      title: 'Calculate Costs',
      links: [
        { href: '/soc-2-cost-calculator', label: 'SOC 2 Cost Calculator' },
        { href: '/soc-2-cost-breakdown', label: 'Cost Breakdown' },
        { href: '/auditor-match', label: 'Find an Auditor' },
      ],
    },
  ],
  'comparison': [
    {
      title: 'Pricing Guides',
      links: [
        { href: '/pricing/vanta', label: 'Vanta Pricing' },
        { href: '/pricing/drata', label: 'Drata Pricing' },
        { href: '/pricing/secureframe', label: 'Secureframe Pricing' },
        { href: '/pricing/auditboard', label: 'AuditBoard Pricing' },
      ],
    },
    {
      title: 'More Comparisons',
      links: [
        { href: '/compare/onetrust-alternatives', label: 'OneTrust Alternatives' },
        { href: '/compare/scytale-vs-workiva', label: 'Scytale vs Workiva' },
        { href: '/compare/drata-vs-onetrust', label: 'Drata vs OneTrust' },
        { href: '/compare/auditboard-vs-workiva', label: 'AuditBoard vs Workiva' },
      ],
    },
  ],
  'directory': [
    {
      title: 'Popular Companies',
      links: [
        { href: '/compliance/directory/navan', label: 'Navan Security' },
        { href: '/compliance/directory/tailscale', label: 'Tailscale Compliance' },
        { href: '/compliance/directory/digitalocean', label: 'DigitalOcean SOC 2' },
        { href: '/compliance/directory/fireblocks', label: 'Fireblocks Compliance' },
      ],
    },
    {
      title: 'Compliance Tools',
      links: [
        { href: '/pricing/vanta', label: 'Vanta Pricing' },
        { href: '/pricing/drata', label: 'Drata Pricing' },
        { href: '/compare', label: 'Compare Tools' },
      ],
    },
  ],
};

export default function TopicalClusterLinks({ 
  framework, 
  industry, 
  currentPath,
  pageType,
  variant = 'inline'
}: TopicalClusterLinksProps) {
  const clusters: LinkCluster[] = [];

  // Add page type specific clusters first (highest priority)
  if (pageType && pageTypeClusters[pageType]) {
    clusters.push(...pageTypeClusters[pageType]);
  }

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
      title: 'Resources',
      links: [
        { href: '/soc-2-readiness-index', label: 'SOC 2 Assessment' },
        { href: '/iso-42001-calculator', label: 'ISO 42001 Calculator' },
        { href: '/compliance-roi-calculator', label: 'ROI Calculator' },
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

  // Sidebar variant
  if (variant === 'sidebar') {
    return (
      <aside className="space-y-6">
        {filteredClusters.slice(0, 4).map((cluster) => (
          <div key={cluster.title}>
            <h4 className="text-sm font-medium text-slate-500 mb-3">{cluster.title}</h4>
            <ul className="space-y-2">
              {cluster.links.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-slate-900 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    );
  }

  // Footer variant
  if (variant === 'footer') {
    return (
      <section className="mt-12 pt-8 border-t border-slate-200">
        <h3 className="text-sm font-medium text-slate-500 mb-6">Related</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredClusters.slice(0, 4).map((cluster) => (
            <div key={cluster.title}>
              <h4 className="text-sm font-medium text-slate-700 mb-3">{cluster.title}</h4>
              <ul className="space-y-2">
                {cluster.links.slice(0, 4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Default inline variant
  return (
    <aside className="my-8 pt-6 border-t border-slate-100">
      <h3 className="text-sm font-medium text-slate-500 mb-4">Related</h3>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {filteredClusters.slice(0, 2).flatMap((cluster) => 
          cluster.links.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
            >
              {link.label}
            </Link>
          ))
        )}
      </div>
    </aside>
  );
}
