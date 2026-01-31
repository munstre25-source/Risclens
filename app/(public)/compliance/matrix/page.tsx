import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQSection } from '@/components/FAQSection';
import Link from 'next/link';
import { Shield, Target, Building2, Globe, ChevronRight, Zap } from 'lucide-react';
import { getPSEOFrameworks, getPSEOIndustries, getPSEORoles, getPSEODecisionTypes } from '@/lib/pseo';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { generateHubFAQs } from '@/lib/seo-enhancements';

export const metadata = {
  title: 'Compliance Matrix Directory | RiscLens',
  description: 'Explore our complete index of 15,000+ compliance strategy combinations across frameworks, industries, and roles.',
};

export default async function ComplianceMatrixDirectoryPage() {
  const [frameworks, industries, roles, decisions] = await Promise.all([
    getPSEOFrameworks(),
    getPSEOIndustries(),
    getPSEORoles(),
    getPSEODecisionTypes()
  ]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Compliance', href: '/compliance' },
    { label: 'Matrix Directory' },
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <Breadcrumb items={breadcrumbs} />
          <h1 className="text-4xl font-black text-slate-900 mb-4 mt-6">Compliance Matrix Directory</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our comprehensive index of tailored compliance roadmaps. Browse by standard, role, or industry to find the exact guidance for your situation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        
        {/* Frameworks Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-brand-100 text-brand-600 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">1. Select Your Framework</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {frameworks.map((f) => (
              <Link 
                key={f.slug} 
                href={`/${f.slug}`}
                className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-500 hover:shadow-lg transition-all group"
              >
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.name}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{f.description}</p>
                <div className="flex items-center text-brand-600 font-bold text-xs uppercase tracking-widest">
                  Explore {f.name} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Roles Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">2. Perspective by Role</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {(roles as any[]).map((r) => (
              <Link 
                key={r.slug} 
                href={`/soc-2/for/${r.slug}`}
                className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all text-center group"
              >
                <div className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  {r.name || r.slug}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-black">Strategic Guide</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Decision Types Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">3. Decision-Driven Guides</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {(decisions as any[]).map((d) => (
              <Link 
                key={d.slug} 
                href={`/soc-2/${d.slug}`}
                className="p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all text-center group"
              >
                <div className="font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {d.name || d.slug}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-black">Data Benchmark</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Industries Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">4. Industry Specializations</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {industries.map((i) => (
              <Link 
                key={i.slug} 
                href={`/soc-2/readiness-checklist/${i.slug}`}
                className="p-4 bg-white border border-slate-200 rounded-xl hover:border-orange-500 hover:shadow-md transition-all text-center group"
              >
                <div className="font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                  {i.name}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-black">{i.slug} sector</div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <h2 className="text-3xl font-black mb-6 relative z-10">Can't find your specific combination?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                Our dynamic engine generates 15,000+ unique compliance paths. Use the Hub to filter precisely for your tech stack and requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <Link 
                    href="/compliance"
                    className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl hover:scale-105"
                >
                    Launch Matrix Explorer
                    <Zap className="w-6 h-6" />
                </Link>
            </div>
        </section>

        <FAQSection
          title="Compliance Matrix FAQs"
          faqs={generateHubFAQs('Compliance Matrix Directory', 'the compliance matrix and compliance roadmaps')}
        />
      </div>

      <Footer />
    </main>
  );
}
