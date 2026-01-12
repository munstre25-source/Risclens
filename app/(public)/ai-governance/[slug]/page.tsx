import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { RelatedPseoPages } from '@/components/seo/RelatedPseoPages';
import { constructMetadata } from '@/lib/seo';
import { getSupabaseAdmin } from '@/lib/supabase';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Zap,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPageData(slug: string) {
  const supabase = getSupabaseAdmin();
  const { data: page } = await supabase
    .from('pseo_pages')
    .select('*, framework:pseo_frameworks(*), industry:pseo_industries(*), role:pseo_roles(*)')
    .eq('slug', slug)
    .single();

  return page;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page) return { title: 'Not Found' };

  return constructMetadata({
    title: page.title,
    description: page.meta_description || `Expert guide to ${page.title}. Learn about requirements, implementation, and best practices.`,
    path: `/ai-governance/${slug}`,
    category: page.category,
    keywords: [page.category, 'AI Governance', page.title].filter(Boolean) as string[],
  });
}

export default async function AiGovernanceProgrammaticPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page) notFound();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <GeneralPageSchema
        title={page.title}
        description={page.meta_description || `Strategic guide for ${page.title}.`}
        url={`https://risclens.com/ai-governance/${slug}`}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Governance Hub', item: 'https://risclens.com/ai-governance' },
          { name: page.title, item: `https://risclens.com/ai-governance/${slug}` },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-slate-900 text-white py-20 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/ai-governance" className="text-brand-400 hover:text-brand-300 text-sm font-bold flex items-center gap-1 transition-all">
                AI Governance Hub <ArrowRight className="w-4 h-4 rotate-180" />
              </Link>
              <span className="text-slate-600 text-sm">/</span>
              <span className="text-slate-400 text-sm font-medium">{page.category || 'Guide'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">{page.title}</h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-10">
              {page.meta_description || `Navigate the complexities of ${page.title} with our programmatic framework for modern AI organizations.`}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/ai-governance-readiness-index" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all">
                <BarChart3 className="w-5 h-5" />
                Start Readiness Index
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 max-w-4xl mx-auto px-4">
          <div className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Strategic Overview</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Implementing {page.title} is no longer optional for high-growth AI startups. 
              Enterprise buyers and regulators now require clear evidence of model transparency, 
              risk mitigation, and compliance with emerging standards like ISO 42001 and the EU AI Act.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <Shield className="w-10 h-10 text-brand-500 mb-6" />
                <h3 className="text-xl font-bold mb-3">Core Requirements</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-sm text-slate-600 italic">
                    <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                    Algorithmic Impact Assessments
                  </li>
                  <li className="flex gap-2 text-sm text-slate-600 italic">
                    <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                    Data Provenance Tracking
                  </li>
                  <li className="flex gap-2 text-sm text-slate-600 italic">
                    <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                    Model Monitoring & Observability
                  </li>
                </ul>
              </div>
              <div className="bg-brand-50 p-8 rounded-2xl border border-brand-100">
                <Zap className="w-10 h-10 text-brand-500 mb-6" />
                <h3 className="text-xl font-bold mb-3">Quick Implementation</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-sm text-brand-800 italic">
                    <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                    Automated Evidence Collection
                  </li>
                  <li className="flex gap-2 text-sm text-brand-800 italic">
                    <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                    Policy Template Generation
                  </li>
                  <li className="flex gap-2 text-sm text-brand-800 italic">
                    <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                    Real-time Gap Analysis
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Execution Roadmap</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              To successfully navigate {page.title}, organizations must move beyond manual checklists. 
              The programmatic approach involves integrating governance directly into the CI/CD pipeline and model training workflows.
            </p>

            <div className="space-y-6 my-12">
              {[
                { step: 'Phase 1: Discovery', desc: 'Identify all AI assets and classify them based on risk level (Low, Medium, High, Unacceptable).' },
                { step: 'Phase 2: Gap Analysis', desc: 'Compare existing controls against the specific requirements of the chosen framework.' },
                { step: 'Phase 3: Remediation', desc: 'Implement missing technical and administrative controls with automated evidence capture.' },
                { step: 'Phase 4: Continuous Monitoring', desc: 'Set up real-time alerts for model drift, bias detection, and compliance violations.' }
              ].map((phase, idx) => (
                <div key={idx} className="flex gap-6 p-6 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all">
                  <div className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center font-black flex-shrink-0 shadow-lg shadow-brand-500/20">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{phase.step}</h4>
                    <p className="text-sm text-slate-600">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <RelatedPseoPages currentSlug={slug} category={page.category} />

          <div className="mt-20">
            <AuthorBio authorId="kevin" />
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Need a custom roadmap for {page.title}?</h2>
            <p className="text-slate-400 mb-10">Get expert guidance tailored to your specific AI architecture and industry risk profile.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/readiness-review" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-xl transition-all">
                Book Expert Review
              </Link>
              <Link href="/ai-governance" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl transition-all">
                Back to AI Hub
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
