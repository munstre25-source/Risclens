import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { FAQSection } from '@/components/FAQSection';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { RelatedPseoPages } from '@/components/seo/RelatedPseoPages';
import { RiskClassifier } from '@/components/ai-governance/tools/RiskClassifier';
import { VendorRiskQuestionnaire } from '@/components/ai-governance/tools/VendorRiskQuestionnaire';
import { constructMetadata } from '@/lib/seo';
import { getSupabaseAdmin } from '@/lib/supabase';
import { generateGuideFAQs } from '@/lib/seo-enhancements';
import { getDecisionSlugCandidates, getRoleSlugCandidates, normalizeFrameworkSlug } from '@/lib/pseo-slug-normalization';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Zap,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ framework: string, slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdmin();
    
    // Get all frameworks
    const { data: frameworks } = await supabase
      .from('pseo_frameworks')
      .select('id, slug');

    if (!frameworks) return [];

    // Only pre-render the top 20 pages total for this route to avoid build timeouts
    const { data: pages } = await supabase
      .from('pseo_pages')
      .select('slug, framework_id')
      .in('framework_id', frameworks.map(f => f.id))
      .limit(20);

    if (!pages) return [];

    return pages.filter(p => !p.slug.includes('/')).map(page => {
      const framework = frameworks.find(f => f.id === page.framework_id);
      return {
        framework: framework?.slug || 'unknown',
        slug: page.slug
      };
    }).filter(p => p.framework !== 'unknown');
  } catch (err) {
    console.error('[generateStaticParams] Failed for [framework]/[slug]:', err);
    return [];
  }
}

async function getPageData(frameworkSlug: string, slug: string) {
  const supabase = getSupabaseAdmin();
  const normalizedFrameworkSlug = normalizeFrameworkSlug(frameworkSlug);
  
  const { data: framework } = await supabase
    .from('pseo_frameworks')
    .select('*')
    .eq('slug', normalizedFrameworkSlug)
    .single();

  if (!framework) return null;

  const { data: exactPageRows } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('framework_id', framework.id)
    .eq('slug', slug)
    .limit(1);

  const exactPage = exactPageRows?.[0];
  if (exactPage) {
    return { page: exactPage, framework, resolvedSlug: exactPage.slug };
  }

  const decisionCandidates = getDecisionSlugCandidates(slug, normalizedFrameworkSlug);
  for (const decisionSlug of decisionCandidates) {
    const { data: decision } = await supabase
      .from('pseo_decision_types')
      .select('id, slug')
      .eq('slug', decisionSlug)
      .single();
    if (!decision) continue;

    const { data: pageRows } = await supabase
      .from('pseo_pages')
      .select('*')
      .eq('framework_id', framework.id)
      .eq('decision_type_id', decision.id)
      .limit(1);

    const page = pageRows?.[0];
    if (page) {
      return { page, framework, resolvedSlug: decision.slug };
    }
  }

  const roleCandidates = getRoleSlugCandidates(slug, normalizedFrameworkSlug);
  for (const roleSlug of roleCandidates) {
    const { data: role } = await supabase
      .from('pseo_roles')
      .select('id, slug')
      .eq('slug', roleSlug)
      .single();
    if (!role) continue;

    const { data: pageRows } = await supabase
      .from('pseo_pages')
      .select('*')
      .eq('framework_id', framework.id)
      .eq('role_id', role.id)
      .limit(1);

    const page = pageRows?.[0];
    if (page) {
      return { page, framework, resolvedSlug: role.slug };
    }
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { framework, slug } = await params;
  const data = await getPageData(framework, slug);

  if (!data) return { title: 'Not Found' };

  return constructMetadata({
    title: data.page.title,
    description: data.page.meta_description || `Expert guide to ${data.page.title}. Learn about requirements, implementation, and best practices.`,
    path: `/${framework}/${data.resolvedSlug}`,
    category: data.page.category,
    keywords: [data.page.category, framework, data.page.title].filter(Boolean) as string[],
  });
}

export default async function ProgrammaticPage({ params }: Props) {
  const { framework: frameworkSlug, slug } = await params;
  const data = await getPageData(frameworkSlug, slug);

  if (!data) notFound();

  const { page, framework } = data;
  const faqs = generateGuideFAQs(page.title, framework.name);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <GeneralPageSchema
        title={page.title}
        description={page.meta_description || `Strategic guide for ${page.title}.`}
        url={`https://risclens.com/${framework.slug}/${data.resolvedSlug}`}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: `${framework.name} Hub`, item: `https://risclens.com/${framework.slug}` },
          { name: page.title, item: `https://risclens.com/${framework.slug}/${data.resolvedSlug}` },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-slate-900 text-white py-20 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Link href={`/${framework.slug}`} className="text-brand-400 hover:text-brand-300 text-sm font-bold flex items-center gap-1 transition-all">
                {framework.name} Hub <ArrowRight className="w-4 h-4 rotate-180" />
              </Link>
              <span className="text-slate-600 text-sm">/</span>
              <span className="text-slate-400 text-sm font-medium">{page.category || 'Guide'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">{page.title}</h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-10">
              {page.meta_description || `Navigate the complexities of ${page.title} with our programmatic framework for modern organizations.`}
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
            {page.category === 'classification' ? (
              <RiskClassifier />
            ) : page.category === 'risk-assessment' ? (
              <VendorRiskQuestionnaire />
            ) : (
              <div className="prose prose-slate prose-lg max-w-none text-left">
                <h2 className="text-3xl font-bold mb-6">Strategic Overview</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Implementing {page.title} is no longer optional for high-growth companies. 
                  Enterprise buyers and regulators now require clear evidence of transparency, 
                  risk mitigation, and compliance with emerging standards.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-12">
                  <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                    <Shield className="w-10 h-10 text-brand-500 mb-6" />
                    <h3 className="text-xl font-bold mb-3">Core Requirements</h3>
                    <ul className="space-y-3">
                      <li className="flex gap-2 text-sm text-slate-600 italic">
                        <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                        Automated Control Mapping
                      </li>
                      <li className="flex gap-2 text-sm text-slate-600 italic">
                        <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                        Continuous Evidence Collection
                      </li>
                      <li className="flex gap-2 text-sm text-slate-600 italic">
                        <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                        Real-time Risk Assessment
                      </li>
                    </ul>
                  </div>
                  <div className="bg-brand-50 p-8 rounded-2xl border border-brand-100">
                    <Zap className="w-10 h-10 text-brand-500 mb-6" />
                    <h3 className="text-xl font-bold mb-3">Quick Implementation</h3>
                    <ul className="space-y-3">
                      <li className="flex gap-2 text-sm text-brand-800 italic">
                        <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                        Policy Template Generation
                      </li>
                      <li className="flex gap-2 text-sm text-brand-800 italic">
                        <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                        Vendor Risk Management
                      </li>
                      <li className="flex gap-2 text-sm text-brand-800 italic">
                        <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                        Compliance Dashboards
                      </li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-6">Execution Roadmap</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  To successfully navigate {page.title}, organizations must move beyond manual checklists. 
                  The programmatic approach involves integrating compliance directly into your operational workflows.
                </p>

                <div className="space-y-6 my-12">
                  {[
                    { step: 'Phase 1: Gap Analysis', desc: 'Identify existing controls and map them against the framework requirements.' },
                    { step: 'Phase 2: Remediation', desc: 'Implement missing controls and establish automated evidence capture.' },
                    { step: 'Phase 3: Audit Readiness', desc: 'Prepare for assessment with pre-vetted documentation and control testing.' },
                    { step: 'Phase 4: Continuous Compliance', desc: 'Maintain your posture with automated monitoring and periodic reviews.' }
                  ].map((phase, idx) => (
                    <div key={idx} className="flex gap-6 p-6 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all text-left">
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
              )}


            <FAQSection faqs={faqs} />

            <RelatedPseoPages currentSlug={slug} category={page.category} frameworkId={page.framework_id} />


          <div className="mt-20">
            <AuthorBio authorId="kevin" />
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Need a custom roadmap for {page.title}?</h2>
            <p className="text-slate-400 mb-10">Get expert guidance tailored to your specific infrastructure and industry risk profile.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/readiness-review" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-xl transition-all">
                Book Expert Review
              </Link>
              <Link href={`/${framework.slug}`} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl transition-all">
                Back to {framework.name} Hub
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
