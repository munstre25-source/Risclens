import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  DollarSign, 
  Scale, 
  Users, 
  Shield, 
  Building2,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';

type LinkCategory = 'framework' | 'pricing' | 'alternatives' | 'role' | 'directory' | 'evidence' | 'checklist' | 'stack';

interface ContextualLink {
  href: string;
  label: string;
  description?: string;
  category: LinkCategory;
}

interface ContextualLinksProps {
  currentPageType: LinkCategory;
  currentSlug?: string;
  relatedFramework?: string;
  companyName?: string;
  toolName?: string;
  variant?: 'inline' | 'sidebar' | 'footer';
  maxLinks?: number;
}

const LINK_GRAPH: Record<LinkCategory, ContextualLink[]> = {
  framework: [
    { href: '/soc-2-cost-calculator', label: 'SOC 2 Cost Calculator', description: 'Estimate your compliance budget', category: 'framework' },
    { href: '/soc-2-readiness-calculator', label: 'Readiness Assessment', description: 'Check your compliance maturity', category: 'framework' },
    { href: '/soc-2/for/cto', label: 'SOC 2 for CTOs', description: 'Technical leadership guide', category: 'role' },
    { href: '/soc-2/for/founders', label: 'SOC 2 for Founders', description: 'Executive decision framework', category: 'role' },
    { href: '/pricing/vanta', label: 'Vanta Pricing 2026', description: 'Current pricing breakdown', category: 'pricing' },
    { href: '/pricing/drata', label: 'Drata Pricing 2026', description: 'Cost comparison analysis', category: 'pricing' },
    { href: '/compare/vanta-alternatives', label: 'Vanta Alternatives', description: 'Platform comparison guide', category: 'alternatives' },
    { href: '/compliance/directory', label: 'Security Signals Directory', description: 'Enterprise trust database', category: 'directory' },
  ],
  pricing: [
    { href: '/compare/vanta-alternatives', label: 'Tool Alternatives', description: 'Compare all platforms', category: 'alternatives' },
    { href: '/soc-2-cost-calculator', label: 'Total Cost Calculator', description: 'Full compliance budget', category: 'framework' },
    { href: '/soc-2/for/cfo', label: 'SOC 2 for CFOs', description: 'Financial planning guide', category: 'role' },
    { href: '/compliance/directory', label: 'Who Uses This Tool?', description: 'See companies using it', category: 'directory' },
  ],
  alternatives: [
    { href: '/pricing/vanta', label: 'Vanta Pricing', description: 'Detailed cost breakdown', category: 'pricing' },
    { href: '/pricing/drata', label: 'Drata Pricing', description: 'Compare pricing tiers', category: 'pricing' },
    { href: '/soc-2-cost-calculator', label: 'Build vs Buy Calculator', description: 'Estimate total investment', category: 'framework' },
    { href: '/soc-2/for/ciso', label: 'CISO Selection Guide', description: 'Evaluation framework', category: 'role' },
  ],
  role: [
    { href: '/soc-2-readiness-calculator', label: 'Quick Readiness Check', description: '5-minute assessment', category: 'framework' },
    { href: '/soc-2-cost-calculator', label: 'Budget Planning', description: 'Estimate your costs', category: 'framework' },
    { href: '/compliance', label: 'All Compliance Resources', description: 'Full intelligence hub', category: 'framework' },
    { href: '/soc-2-evidence/access-reviews', label: 'Evidence Templates', description: 'Downloadable artifacts', category: 'evidence' },
  ],
  directory: [
    { href: '/vendor-risk-assessment', label: 'Vendor Risk Program', description: 'Build your VRM process', category: 'framework' },
    { href: '/soc-2', label: 'SOC 2 Overview', description: 'Framework fundamentals', category: 'framework' },
    { href: '/pricing/vanta', label: 'Automation Pricing', description: 'Tool cost comparison', category: 'pricing' },
    { href: '/soc-2/for/security-engineer', label: 'Security Engineer Guide', description: 'Technical implementation', category: 'role' },
  ],
  evidence: [
    { href: '/soc-2-readiness-checklist/saas', label: 'SaaS Checklist', description: 'Industry-specific controls', category: 'checklist' },
    { href: '/soc-2/stack/aws', label: 'AWS Compliance Guide', description: 'Cloud-native controls', category: 'stack' },
    { href: '/soc-2/for/devops', label: 'DevOps Guide', description: 'CI/CD compliance', category: 'role' },
    { href: '/compliance/directory', label: 'Example Implementations', description: 'See how others do it', category: 'directory' },
  ],
  checklist: [
    { href: '/soc-2-evidence/access-reviews', label: 'Access Review Templates', description: 'Control evidence', category: 'evidence' },
    { href: '/soc-2-cost-calculator', label: 'Estimate Your Cost', description: 'Budget planning tool', category: 'framework' },
    { href: '/auditor-directory/new-york', label: 'Find Auditors', description: 'Local CPA firms', category: 'directory' },
    { href: '/soc-2-timeline/estimator', label: 'Timeline Estimator', description: 'Project planning', category: 'framework' },
  ],
  stack: [
    { href: '/soc-2-evidence/change-management', label: 'Change Management', description: 'CI/CD evidence', category: 'evidence' },
    { href: '/soc-2/for/devops', label: 'DevOps Compliance', description: 'Platform engineering', category: 'role' },
    { href: '/pricing/vanta', label: 'Automation Tools', description: 'Platform pricing', category: 'pricing' },
    { href: '/soc-2-readiness-checklist/saas', label: 'SaaS Controls', description: 'Industry checklist', category: 'checklist' },
  ],
};

const getCategoryIcon = (category: LinkCategory) => {
  switch (category) {
    case 'framework': return <Shield className="w-4 h-4" />;
    case 'pricing': return <DollarSign className="w-4 h-4" />;
    case 'alternatives': return <Scale className="w-4 h-4" />;
    case 'role': return <Users className="w-4 h-4" />;
    case 'directory': return <Building2 className="w-4 h-4" />;
    case 'evidence': return <BookOpen className="w-4 h-4" />;
    case 'checklist': return <BookOpen className="w-4 h-4" />;
    case 'stack': return <BookOpen className="w-4 h-4" />;
    default: return <Sparkles className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: LinkCategory) => {
  switch (category) {
    case 'framework': return 'bg-blue-50 text-blue-600 border-blue-100';
    case 'pricing': return 'bg-green-50 text-green-600 border-green-100';
    case 'alternatives': return 'bg-purple-50 text-purple-600 border-purple-100';
    case 'role': return 'bg-amber-50 text-amber-600 border-amber-100';
    case 'directory': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
    case 'evidence': return 'bg-cyan-50 text-cyan-600 border-cyan-100';
    case 'checklist': return 'bg-orange-50 text-orange-600 border-orange-100';
    case 'stack': return 'bg-teal-50 text-teal-600 border-teal-100';
    default: return 'bg-slate-50 text-slate-600 border-slate-100';
  }
};

export function ContextualLinks({
  currentPageType,
  currentSlug,
  variant = 'footer',
  maxLinks = 4,
}: ContextualLinksProps) {
  const links = LINK_GRAPH[currentPageType]?.slice(0, maxLinks) || [];

  if (links.length === 0) return null;

  if (variant === 'inline') {
    return (
      <div className="my-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Related Intelligence</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-600 transition-all"
            >
              {getCategoryIcon(link.category)}
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-600" />
          Related Resources
        </h4>
        <div className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-start gap-3 p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className={`p-2 rounded-lg ${getCategoryColor(link.category)}`}>
                {getCategoryIcon(link.category)}
              </div>
              <div className="flex-grow min-w-0">
                <div className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                  {link.label}
                </div>
                {link.description && (
                  <div className="text-xs text-slate-500 mt-0.5">{link.description}</div>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Continue Your Research</h2>
          <p className="text-slate-500 mt-1">Explore related compliance intelligence and tools</p>
        </div>
        <Link 
          href="/compliance"
          className="hidden sm:flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
        >
          View All Resources
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all"
          >
            <div className={`inline-flex p-2 rounded-lg mb-4 ${getCategoryColor(link.category)}`}>
              {getCategoryIcon(link.category)}
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-1">
              {link.label}
            </h3>
            {link.description && (
              <p className="text-sm text-slate-500">{link.description}</p>
            )}
            <div className="flex items-center gap-1 mt-4 text-xs font-bold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Explore</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 sm:hidden text-center">
        <Link 
          href="/compliance"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-600"
        >
          View All Resources
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

export function InlineContextLink({ 
  href, 
  children,
  title 
}: { 
  href: string; 
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <Link 
      href={href} 
      className="text-brand-600 font-semibold hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 underline-offset-2 transition-colors"
      title={title}
    >
      {children}
    </Link>
  );
}

export function TopicClusterNav({
  pillarPage,
  pillarLabel,
  clusterPages,
  currentSlug,
}: {
  pillarPage: string;
  pillarLabel: string;
  clusterPages: { href: string; label: string }[];
  currentSlug?: string;
}) {
  return (
    <nav className="my-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200" aria-label="Topic cluster navigation">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-brand-600" />
        <span className="text-sm font-black text-slate-700">Topic Cluster</span>
      </div>
      
      <Link 
        href={pillarPage}
        className="block p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-300 mb-4 group transition-all"
      >
        <div className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1">Pillar Page</div>
        <div className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{pillarLabel}</div>
      </Link>
      
      <div className="grid grid-cols-2 gap-2">
        {clusterPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={`p-3 rounded-lg text-sm font-medium transition-all ${
              currentSlug && page.href.includes(currentSlug)
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-600'
            }`}
          >
            {page.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
