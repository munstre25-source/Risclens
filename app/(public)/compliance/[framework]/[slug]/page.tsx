import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AccuracyDisclaimer, LastVerifiedBadge } from '@/components/AccuracyGuards';
import { getIndustryGuideClusters } from '@/lib/pseo-internal-links';
import { InternalLinks, InternalLinksInline } from '@/components/InternalLinks';
import { getSupabaseAdmin } from '@/lib/supabase';
import { SmartContent } from '@/components/seo/SmartContent';
import { getAllTools } from '@/lib/compliance-tools';
import { generateGuideFAQs, generateEnhancedFAQSchema } from '@/lib/seo-enhancements';
import { getDecisionSlugCandidates, getRoleSlugCandidates, normalizeFrameworkSlug } from '@/lib/pseo-slug-normalization';

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdmin();
    // Only pre-render the top 20 most important compliance pages
    const { data } = await supabase
      .from('pseo_pages')
      .select('slug')
      .eq('category', 'compliance')
      .limit(20);
    
    return data?.filter(p => !p.slug.includes('/')).map(p => {
      const framework = p.slug.startsWith('soc-2') ? 'soc-2' : 'iso-27001';
      return { 
        framework,
        slug: p.slug 
      };
    }) || [];
  } catch (err) {
    console.error('[generateStaticParams] Failed to generate params for compliance/[framework]/[slug]:', err);
    return [];
  }
}

interface PageProps {
  params: {
    framework: string;
    slug: string;
  };
}

async function getFrameworkPage(frameworkSlug: string, slug: string) {
  const supabase = getSupabaseAdmin();
  const normalizedFrameworkSlug = normalizeFrameworkSlug(frameworkSlug);

  const { data: framework } = await supabase
    .from('pseo_frameworks')
    .select('id, slug')
    .eq('slug', normalizedFrameworkSlug)
    .single();

  if (!framework) return null;

  const selectClause = '*, pseo_frameworks(*), pseo_industries(*)';
  const { data: exactRows } = await supabase
    .from('pseo_pages')
    .select(selectClause)
    .eq('framework_id', framework.id)
    .eq('slug', slug)
    .limit(1);

  const exact = exactRows?.[0];
  if (exact) {
    return { page: exact, resolvedSlug: exact.slug };
  }

  const decisionCandidates = getDecisionSlugCandidates(slug, normalizedFrameworkSlug);
  for (const decisionSlug of decisionCandidates) {
    const { data: decision } = await supabase
      .from('pseo_decision_types')
      .select('id, slug')
      .eq('slug', decisionSlug)
      .single();
    if (!decision) continue;

    const { data: rows } = await supabase
      .from('pseo_pages')
      .select(selectClause)
      .eq('framework_id', framework.id)
      .eq('decision_type_id', decision.id)
      .limit(1);
    const page = rows?.[0];
    if (page) {
      return { page, resolvedSlug: decision.slug };
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

    const { data: rows } = await supabase
      .from('pseo_pages')
      .select(selectClause)
      .eq('framework_id', framework.id)
      .eq('role_id', role.id)
      .limit(1);
    const page = rows?.[0];
    if (page) {
      return { page, resolvedSlug: role.slug };
    }
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await getFrameworkPage(params.framework, params.slug);
  if (!resolved) return {};
  const { page, resolvedSlug } = resolved;

  return {
    title: `${page.title} | Compliance Guide | RiscLens`,
    description: page.meta_description,
    alternates: { canonical: `https://risclens.com/compliance/${params.framework}/${resolvedSlug}` },
  };
}

export default async function PSEOCompliancePage({ params }: PageProps) {
  const resolved = await getFrameworkPage(params.framework, params.slug);
  const page = resolved?.page;

  if (!page) {
    notFound();
  }

  const { content_json: content } = page;
  const internalLinks = await getIndustryGuideClusters(params.framework, params.slug);
  const tools = await getAllTools();
  const frameworkName = page.pseo_frameworks?.name || 'Compliance';
  const faqs = content?.faqs?.length ? content.faqs : generateGuideFAQs(page.title, frameworkName);
  const faqSchema = generateEnhancedFAQSchema(faqs);

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="compliance-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' }, 
              { label: 'Compliance', href: '/compliance' }, 
              { label: page.pseo_frameworks?.name || 'Framework', href: `/compliance/${params.framework}` },
              { label: page.title }
            ]} 
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-20 text-center">
          <LastVerifiedBadge date={page.updated_at} framework={page.pseo_frameworks?.name} />
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {page.title}
          </h1>
          <SmartContent 
            content={content?.summary || ''} 
            tools={tools} 
            className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed" 
          />
          <div className="flex justify-center">
            <AssessmentCTA />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-16">
              {content?.highlights && content.highlights.length > 0 && (
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Compliance Highlights</h2>
                  <div className="grid sm:grid-cols-1 gap-4">
                    {content.highlights.map((highlight: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-slate-700 text-lg">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-900 rounded-xl p-8 lg:p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-4">Ready to accelerate your {page.pseo_frameworks?.name} journey?</h2>
                  <p className="text-slate-300 text-lg mb-8 max-w-2xl">
                    Our experts help {page.pseo_industries?.name} companies navigate compliance 3x faster with automated evidence collection and pre-built control mapping.
                  </p>
                  <AssessmentCTA variant="outline" className="bg-white text-slate-900 hover:bg-slate-50 border-none" />
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full -mr-32 -mt-32 opacity-50" />
              </div>

              {faqs.length > 0 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
                  <div className="grid gap-6">
                    {faqs.map((faq: { question: string; answer: string }, idx: number) => (
                      <div key={idx} className="border-b border-slate-200 pb-6 last:border-0">
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">{faq.question}</h3>
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <InternalLinksInline clusters={internalLinks} />
              <AccuracyDisclaimer />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <InternalLinks clusters={internalLinks} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
