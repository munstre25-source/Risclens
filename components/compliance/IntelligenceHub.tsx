'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Shield, 
  Building2, 
  Users, 
  DollarSign, 
  CheckSquare, 
  ArrowRightLeft, 
  Database, 
  Layers, 
  Scale,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface HubItem {
  id: string;
  name: string;
  description?: string;
  href: string;
  category: 'Frameworks' | 'Companies' | 'Roles' | 'Pricing' | 'Checklists' | 'Evidence' | 'Tech Stack' | 'Alternatives' | 'Industry Guides';
  tags?: string[];
}

interface IntelligenceHubProps {
  initialTab?: 'All' | HubItem['category'];
  frameworks: any[];
  companies: any[];
  roles: any[];
  pricing: any[];
  alternatives: any[];
  industryGuides: any[];
}

export function IntelligenceHub({ 
  initialTab = 'All',
  frameworks, 
  companies, 
  roles, 
  pricing, 
  alternatives,
  industryGuides 
}: IntelligenceHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | HubItem['category']>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const allItems: HubItem[] = useMemo(() => {
    const items: HubItem[] = [];

    // Frameworks
    frameworks.forEach(f => items.push({
      id: `framework-${f.id}`,
      name: f.name,
      description: f.description || `Complete ${f.name} compliance guides.`,
      href: `/compliance/${f.slug}`,
      category: 'Frameworks',
      tags: ['compliance', 'standards', f.name.toLowerCase()]
    }));

    // Companies (Directory)
    companies.forEach(c => items.push({
      id: `company-${c.slug}`,
      name: c.name,
      description: `Security signals and compliance disclosures for ${c.name}.`,
      href: `/compliance/directory/${c.slug}`,
      category: 'Companies',
      tags: ['directory', 'signals', c.domain]
    }));

    // Roles
    roles.forEach(r => {
      const roleName = r.content_json?.roleName || r.content_json?.title || r.slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      items.push({
        id: `role-${r.slug}`,
        name: roleName.endsWith('s') ? roleName : `${roleName}s`,
        description: r.content_json?.heroDescription || `Compliance roadmap specifically for ${roleName}s.`,
        href: `/soc-2/for/${r.slug}`,
        category: 'Roles',
        tags: ['soc2', 'roles', r.slug]
      });
    });

    // Pricing
    pricing.forEach(p => {
      const toolName = p.content_json?.toolName || p.content_json?.vendor || p.slug.replace('-pricing', '').split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      items.push({
        id: `pricing-${p.slug}`,
        name: p.content_json?.title || `${toolName} Pricing`,
        description: p.content_json?.heroDescription || p.content_json?.description || `Detailed cost and pricing analysis for ${toolName}.`,
        href: `/pricing/${p.slug}`,
        category: 'Pricing',
        tags: ['tools', 'cost', p.slug]
      });
    });

    // Alternatives
    alternatives.forEach(a => {
      const toolName = a.content_json?.toolName || a.content_json?.vendor || a.slug.replace('-alternatives', '').split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      items.push({
        id: `alt-${a.slug}`,
        name: a.content_json?.title || `${toolName} Alternatives`,
        description: a.content_json?.heroDescription || a.content_json?.description || `Compare ${toolName} with other compliance automation tools.`,
        href: `/compare/${a.slug}`,
        category: 'Alternatives',
        tags: ['compare', 'tools', a.slug]
      });
    });

    // Industry Guides (Compliance)
    industryGuides.forEach(ig => items.push({
      id: `guide-${ig.slug}`,
      name: ig.content_json?.guideTitle || ig.slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
      description: ig.content_json?.heroDescription || `Comprehensive compliance guide for ${ig.slug.split('-').pop()} industry.`,
      href: `/compliance/${ig.slug.startsWith('soc-2') ? 'soc-2' : 'iso-27001'}/${ig.slug}`,
      category: 'Industry Guides',
      tags: ['guide', 'industry', ig.slug]
    }));

    // Static sections (Checklists, Evidence, Tech Stack)
    // We can add these manually or fetch them if they were in DB
    const staticItems: HubItem[] = [
      { id: 'check-fintech', name: 'Fintech Checklist', href: '/soc-2-readiness-checklist/fintech', category: 'Checklists' },
      { id: 'check-healthcare', name: 'Healthcare Checklist', href: '/soc-2-readiness-checklist/healthcare', category: 'Checklists' },
      { id: 'check-saas', name: 'SaaS Checklist', href: '/soc-2-readiness-checklist/saas', category: 'Checklists' },
      { id: 'check-ai', name: 'AI/ML Checklist', href: '/soc-2-readiness-checklist/ai-ml', category: 'Checklists' },
      { id: 'ev-access', name: 'Access Control', href: '/soc-2-evidence/access-control', category: 'Evidence' },
      { id: 'ev-change', name: 'Change Management', href: '/soc-2-evidence/change-management', category: 'Evidence' },
      { id: 'ev-incident', name: 'Incident Response', href: '/soc-2-evidence/incident-response', category: 'Evidence' },
      { id: 'ev-logging', name: 'Logging & Monitoring', href: '/soc-2-evidence/logging-monitoring', category: 'Evidence' },
      { id: 'ts-aws', name: 'AWS Guide', href: '/soc-2/stack/aws', category: 'Tech Stack' },
      { id: 'ts-gcp', name: 'GCP Guide', href: '/soc-2/stack/gcp', category: 'Tech Stack' },
      { id: 'ts-azure', name: 'Azure Guide', href: '/soc-2/stack/azure', category: 'Tech Stack' },
      { id: 'ts-k8s', name: 'Kubernetes Guide', href: '/soc-2/stack/kubernetes', category: 'Tech Stack' },
    ];
    items.push(...staticItems);

    return items;
  }, [frameworks, companies, roles, pricing, alternatives, industryGuides]);

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'All' || item.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [allItems, searchQuery, activeTab]);

  const categories: (HubItem['category'] | 'All')[] = [
    'All', 'Frameworks', 'Companies', 'Roles', 'Pricing', 'Alternatives', 'Industry Guides', 'Checklists', 'Evidence', 'Tech Stack'
  ];

  const getIcon = (category: HubItem['category']) => {
    switch (category) {
      case 'Frameworks': return <Shield className="w-5 h-5" />;
      case 'Companies': return <Building2 className="w-5 h-5" />;
      case 'Roles': return <Users className="w-5 h-5" />;
      case 'Pricing': return <DollarSign className="w-5 h-5" />;
      case 'Checklists': return <CheckSquare className="w-5 h-5" />;
      case 'Evidence': return <Database className="w-5 h-5" />;
      case 'Tech Stack': return <Layers className="w-5 h-5" />;
      case 'Alternatives': return <Scale className="w-5 h-5" />;
      case 'Industry Guides': return <Sparkles className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Search and Tabs Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 sticky top-4 z-10">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search the hub for frameworks, roles, tools, or companies..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === cat 
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-200 scale-105' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat !== 'All' && <span className="opacity-70">{getIcon(cat as HubItem['category'])}</span>}
                {cat}
              </button>
            ))}
          </div>

          {activeTab === 'Companies' && (
            <div className="flex justify-center pt-2">
              <Link 
                href="/compliance/directory"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group transition-all"
              >
                Browse the full directory of 100+ companies
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          <>
            {filteredItems.map((item) => (
              <Link 
                key={item.id}
                href={item.href}
                className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${
                    item.category === 'Frameworks' ? 'bg-blue-50 text-blue-600' :
                    item.category === 'Companies' ? 'bg-indigo-50 text-indigo-600' :
                    item.category === 'Roles' ? 'bg-purple-50 text-purple-600' :
                    item.category === 'Pricing' ? 'bg-green-50 text-green-600' :
                    item.category === 'Checklists' ? 'bg-orange-50 text-orange-600' :
                    item.category === 'Evidence' ? 'bg-amber-50 text-amber-600' :
                    item.category === 'Tech Stack' ? 'bg-cyan-50 text-cyan-600' :
                    'bg-brand-50 text-brand-600'
                  }`}>
                    {getIcon(item.category)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-brand-500 transition-colors">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {item.name}
                </h3>
                
                {item.description && (
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                    {item.description}
                  </p>
                )}
                
                <div className="flex items-center text-sm font-bold text-brand-600 group-hover:gap-2 transition-all">
                  <span>Explore Intelligence</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </Link>
            ))}
            
            {activeTab === 'Companies' && searchQuery === '' && (
              <Link 
                href="/compliance/directory"
                className="group p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 hover:border-brand-300 hover:bg-white transition-all flex flex-col items-center justify-center text-center h-full min-h-[280px]"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-brand-50 transition-all">
                  <Building2 className="w-7 h-7 text-brand-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">View Full Directory</h3>
                <p className="text-slate-500 text-sm mb-6 max-w-[200px]">Access security signals for 100+ tracked enterprises.</p>
                <div className="flex items-center gap-1 text-sm font-black text-brand-600 uppercase tracking-wider">
                  <span>Open Now</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )}
          </>
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No intelligence found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      {/* Directory Teaser Card */}
      {activeTab === 'All' && searchQuery === '' && (
        <div className="mt-12 bg-slate-900 rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent)]" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-brand-500/10 text-brand-400 border border-brand-500/20 uppercase tracking-[0.2em] mb-6">
                Live Directory
              </span>
                <h2 className="text-3xl font-black text-white mb-6 leading-tight">
                  The <span className="text-brand-400">Ground Truth</span> for Compliance.
                </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Access the security signals of 100+ enterprises. Monitor SOC 2 disclosures, trust centers, and transparency markers in real-time.
              </p>
              <Link 
                href="/compliance/directory"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-colors"
              >
                Open Full Directory
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Signal Score', val: '84/100' },
                { name: 'Disclosures', val: '12,400+' },
                { name: 'Active Domains', val: '2,400+' },
                { name: 'Live Updates', val: 'Real-time' },
              ].map((stat) => (
                <div key={stat.name} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.name}</div>
                  <div className="text-2xl font-black text-white">{stat.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
