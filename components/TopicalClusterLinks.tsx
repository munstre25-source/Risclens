'use client';

import Link from 'next/link';
import { ArrowRight, Layers, BookOpen, Calculator, Users } from 'lucide-react';

/**
 * TopicalClusterLinks - Hub-and-Spoke Internal Linking Component
 * 
 * Implements topical clusters for improved SEO:
 * - Hubs: Core content pages (e.g., /soc-2/, /pricing/)
 * - Spokes: Supporting content that links back to hubs
 * 
 * Benefits:
 * - Improves crawl discovery
 * - Distributes link equity
 * - Establishes topical authority
 */

interface LinkCluster {
  title: string;
  icon?: React.ReactNode;
  links: { href: string; label: string; description?: string }[];
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

// Page type specific clusters
const pageTypeClusters: Record<string, LinkCluster[]> = {
  'pricing': [
    {
      title: 'Compare Pricing',
      icon: <Layers className="w-4 h-4" />,
      links: [
        { href: '/compare/vanta-vs-drata', label: 'Vanta vs Drata' },
        { href: '/compare/secureframe-vs-thoropass', label: 'Secureframe vs Thoropass' },
        { href: '/compare/market-intelligence', label: 'All Comparisons' },
      ],
    },
    {
      title: 'Calculate Costs',
      icon: <Calculator className="w-4 h-4" />,
      links: [
        { href: '/soc-2-cost-calculator', label: 'SOC 2 Cost Calculator' },
        { href: '/soc-2-cost-breakdown', label: 'Cost Breakdown Guide' },
        { href: '/auditor-match', label: 'Find an Auditor' },
      ],
    },
  ],
  'comparison': [
    {
      title: 'Pricing Guides',
      icon: <BookOpen className="w-4 h-4" />,
      links: [
        { href: '/pricing/vanta', label: 'Vanta Pricing' },
        { href: '/pricing/drata', label: 'Drata Pricing' },
        { href: '/pricing/secureframe', label: 'Secureframe Pricing' },
        { href: '/pricing/thoropass', label: 'Thoropass Pricing' },
      ],
    },
    {
      title: 'Alternatives',
      icon: <Users className="w-4 h-4" />,
      links: [
        { href: '/compare/vanta-alternatives', label: 'Vanta Alternatives' },
        { href: '/compare/drata-alternatives', label: 'Drata Alternatives' },
        { href: '/compare/onetrust-alternatives', label: 'OneTrust Alternatives' },
      ],
    },
  ],
  'directory': [
    {
      title: 'Role-Specific Guides',
      icon: <Users className="w-4 h-4" />,
      links: [
        { href: '/soc-2/for/founders', label: 'SOC 2 for Founders' },
        { href: '/soc-2/for/cto', label: 'SOC 2 for CTOs' },
        { href: '/soc-2/for/ciso', label: 'SOC 2 for CISOs' },
      ],
    },
    {
      title: 'Compliance Tools',
      icon: <Layers className="w-4 h-4" />,
      links: [
        { href: '/pricing/vanta', label: 'Vanta Pricing' },
        { href: '/pricing/drata', label: 'Drata Pricing' },
        { href: '/compare', label: 'Compare All Tools' },
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
      title: 'Start Here',
      icon: <Calculator className="w-4 h-4" />,
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

  // Sidebar variant
  if (variant === 'sidebar') {
    return (
      <aside className="space-y-6">
        {filteredClusters.slice(0, 4).map((cluster) => (
          <div key={cluster.title} className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              {cluster.icon}
              {cluster.title}
            </h4>
            <ul className="space-y-2">
              {cluster.links.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    );
  }

  // Footer variant - more prominent, full-width
  if (variant === 'footer') {
    return (
      <section className="mt-16 pt-12 border-t border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">
          Continue Your Research
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredClusters.slice(0, 4).map((cluster) => (
            <div key={cluster.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-brand-300 transition-colors">
              <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                {cluster.icon}
                {cluster.title}
              </h4>
              <ul className="space-y-3">
                {cluster.links.slice(0, 4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-brand-600 hover:underline flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
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
    <aside className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
        Related Resources
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClusters.slice(0, 3).map((cluster) => (
          <div key={cluster.title}>
            <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              {cluster.icon}
              {cluster.title}
            </h4>
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
