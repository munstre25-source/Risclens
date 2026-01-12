import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPSEOFrameworks, getPSEOIndustries } from '@/lib/pseo';
import { getSupabaseAdmin } from '@/lib/supabase';
import { MatrixExplorer } from '@/components/compliance/MatrixExplorer';
import { AuthorByline, EditorialPolicyBadge, generateArticleJsonLd } from '@/components/compliance/AuthorByline';
import { 
  Shield, 
  ChevronRight, 
  Layers, 
  Database, 
  Users, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frameworks Hub | Compliance Matrix Explorer',
  description: 'Map your compliance roadmap across 1,200+ contextual nodes. Select your framework, role, and industry to generate a tailored security strategy.',
  alternates: {
    canonical: 'https://risclens.com/compliance',
  },
};

export const dynamic = "force-dynamic";

async function getRolesAndDecisions() {
  const supabase = getSupabaseAdmin();
  
  // Get Roles
  const { data: rolesData } = await supabase
    .from('pseo_pages')
    .select('slug, content_json')
    .eq('category', 'role')
    .order('slug');

  // Get Compliance Topics/Decisions (from 'compliance' category)
  const { data: decisionsData } = await supabase
    .from('pseo_pages')
    .select('slug, content_json')
    .eq('category', 'compliance')
    .order('slug');

  const roles = (rolesData || []).map(r => ({
    name: r.content_json?.roleName || r.slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    slug: r.slug
  }));

  const decisions = (decisionsData || []).map(d => ({
    name: d.content_json?.guideTitle || d.slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    slug: d.slug
  }));

  return { roles, decisions };
}

export default async function FrameworksHubPage() {
  const frameworks = await getPSEOFrameworks();
  const industries = await getPSEOIndustries();
  const { roles, decisions } = await getRolesAndDecisions();

  const jsonLd = generateArticleJsonLd({
    title: 'Frameworks Hub | Compliance Matrix Explorer',
    description: 'Map your compliance roadmap across 1,200+ contextual nodes. Select your framework, role, and industry to generate a tailored security strategy.',
    url: 'https://risclens.com/compliance',
    publishedDate: '2025-01-01',
    updatedDate: '2026-01-11',
    authorId: 'compliance-team',
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white pt-16 pb-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          <div className="max-w-7xl mx-auto px-4 relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 mb-6">
              <Shield className="w-3 h-3 text-brand-400" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Frameworks Matrix v1.0</span>
            </div>
            
            <h1 className="text-4xl sm:text-7xl font-black text-slate-900 leading-tight mb-8 tracking-tighter">
              Map Your Path to <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Total Compliance.</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium mb-12">
              Don't follow a generic checklist. Build a contextual roadmap based on your framework, your role, and your industry.
            </p>
            
            <MatrixExplorer 
              frameworks={frameworks}
              industries={industries}
              roles={roles}
              decisions={decisions}
            />
          </div>
        </section>

        {/* Intelligence Hub Link Section */}
        <section className="max-w-7xl mx-auto px-4 py-24 border-t border-slate-200">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Looking for Vendor Signals?</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                Our Frameworks Hub is built for strategy. If you need data on specific vendors, pricing, or auditor directories, visit our Master Intelligence Hub.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/intelligence-hub"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-all shadow-xl"
                >
                  Enter Intelligence Hub
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/compliance/directory"
                  className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                >
                  Full Company Directory
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Auditor Match', href: '/auditor-match', icon: <MapPin className="w-5 h-5" /> },
                { title: 'Pricing Data', href: '/pricing', icon: <Layers className="w-5 h-5" /> },
                { title: 'Evidence Vault', href: '/soc-2-evidence', icon: <Database className="w-5 h-5" /> },
                { title: 'Role Guides', href: '/soc-2/for/cto', icon: <Users className="w-5 h-5" /> },
              ].map((item) => (
                <Link 
                  key={item.title}
                  href={item.href}
                  className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-300 hover:shadow-lg transition-all group"
                >
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-1">
                    {item.title}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <AuthorByline authorId="compliance-team" updatedDate="January 11, 2026" />
          <div className="mt-8">
            <EditorialPolicyBadge variant="footer" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
