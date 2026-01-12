import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPSEOFrameworks } from '@/lib/pseo';
import { getSupabaseAdmin } from '@/lib/supabase';
import { IntelligenceHub } from '@/components/compliance/IntelligenceHub';
import { AuthorByline, EditorialPolicyBadge, generateArticleJsonLd } from '@/components/compliance/AuthorByline';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'RiscLens Intelligence Hub | Compliance & Security Data',
  description: 'The central intelligence layer for enterprise trust. Access frameworks, pricing data, auditor directories, and company security signals.',
  alternates: {
    canonical: 'https://risclens.com/intelligence-hub',
  },
};

export const dynamic = "force-dynamic";

async function getPSEOData(category: string) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('slug, content_json')
    .eq('category', category)
    .order('slug');
  return data || [];
}

async function getCompanies() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('company_signals')
    .select('name, slug, domain, signal_score')
    .eq('indexable', true)
    .gt('signal_score', 0)
    .order('signal_score', { ascending: false })
    .limit(12);
  return data || [];
}

export default async function IntelligenceHubPage() {
  const frameworks = await getPSEOFrameworks();
  const companies = await getCompanies();
    const roles = await getPSEOData('role');
    const pricing = await getPSEOData('pricing');
    const alternatives = await getPSEOData('alternatives');
    const industryGuides = await getPSEOData('compliance');


  const jsonLd = generateArticleJsonLd({
    title: 'RiscLens Intelligence Hub | Compliance & Security Data',
    description: 'The central intelligence layer for enterprise trust. Access frameworks, pricing data, auditor directories, and company security signals.',
    url: 'https://risclens.com/intelligence-hub',
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
        <section className="bg-white border-b border-slate-200 pt-16 pb-24 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          <div className="max-w-7xl mx-auto px-4 relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-6">
              <Sparkles className="w-3 h-3 text-brand-600" />
              <span className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em]">Master Intelligence Hub</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
              The Intelligence Layer for <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Enterprise Trust.</span>
            </h1>
            
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
                A consolidated engine for frameworks, pricing, signals, and roadmaps. 
                Search the ecosystem, browse by category, or <Link href="/compliance/directory" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-500 transition-all">view all companies</Link>.
              </p>
            
            <div className="mt-8">
              <AuthorByline authorId="compliance-team" updatedDate="January 11, 2026" variant="compact" />
            </div>
          </div>
        </section>

        {/* Interactive Hub Component */}
        <div className="max-w-7xl mx-auto px-4 py-16 -mt-12">
          <IntelligenceHub 
            frameworks={frameworks}
            companies={companies}
            roles={roles}
            pricing={pricing}
            alternatives={alternatives}
            industryGuides={industryGuides}
          />
        </div>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-4 pb-24">
          <div className="bg-brand-600 rounded-3xl p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            
            <h2 className="text-3xl sm:text-4xl font-black mb-6 relative z-10">Can't find what you need?</h2>
            <p className="text-brand-50 text-lg mb-10 max-w-2xl mx-auto relative z-10 opacity-90 leading-relaxed font-medium">
              Our intelligence team adds new signals and frameworks daily. If you need a specific comparison or roadmap, reach out to our analysts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link 
                href="/readiness-review"
                className="w-full sm:w-auto px-10 py-5 bg-white text-brand-700 font-black rounded-2xl hover:bg-brand-50 transition-all shadow-xl"
              >
                Request Custom Intel
              </Link>
              <Link 
                href="/search"
                className="w-full sm:w-auto px-10 py-5 bg-brand-500 text-white border border-brand-400 font-black rounded-2xl hover:bg-brand-400 transition-all shadow-xl"
              >
                Global Search Engine
              </Link>
            </div>
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <EditorialPolicyBadge variant="footer" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
