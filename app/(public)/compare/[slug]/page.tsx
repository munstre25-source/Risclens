import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Check, X, ArrowRight, ExternalLink } from 'lucide-react';
import {
  getAllTools,
  getToolsForComparison,
  parseComparisonSlug,
  generateComparisonData,
  generateComparisonTitle,
  generateComparisonDescription,
  generateVerdict,
  getAlternativesFor,
  ComplianceTool,
} from '@/lib/compliance-tools';
import {
  getComparisonInternalLinks,
  getAlternativesInternalLinks,
  getBreadcrumbs,
  generateComparisonSchema,
  generateFAQSchema,
  generateSchemaOrgBreadcrumbs,
} from '@/lib/pseo-internal-links';
import { EEATSignals, ExpertAuthorBox, TrustSignals } from '@/components/EEATSignals';
import { InternalLinks, Breadcrumbs, InternalLinksInline } from '@/components/InternalLinks';
import { getSupabaseAdmin } from '@/lib/supabase';

async function getAlternativePage(slug: string) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('slug', slug)
    .eq('category', 'alternatives')
    .single();
  return data;
}

export async function generateStaticParams() {
  const tools = await getAllTools();
  const params: { slug: string }[] = [];

  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      params.push({ slug: `${tools[i].slug}-vs-${tools[j].slug}` });
    }
  }

  tools.forEach(tool => {
    params.push({ slug: `${tool.slug}-alternatives` });
  });

  return params;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;

  if (slug.includes('-vs-')) {
    const parsed = parseComparisonSlug(slug);
    if (!parsed) return { title: 'Comparison | RiscLens' };

    const { toolA, toolB } = await getToolsForComparison(parsed.toolASlug, parsed.toolBSlug);
    if (!toolA || !toolB) return { title: 'Comparison | RiscLens' };

    return {
      title: generateComparisonTitle(toolA, toolB),
      description: generateComparisonDescription(toolA, toolB),
      alternates: { canonical: `https://risclens.com/compare/${slug}` },
      openGraph: {
        title: generateComparisonTitle(toolA, toolB),
        description: generateComparisonDescription(toolA, toolB),
        type: 'article',
      },
    };
  }

  if (slug.endsWith('-alternatives')) {
    const toolSlug = slug.replace('-alternatives', '');
    const tools = await getAllTools();
    const tool = tools.find(t => t.slug === toolSlug);
    
    if (tool) {
      return {
        title: `Top ${tool.name} Alternatives & Competitors in 2026`,
        description: `Looking for ${tool.name} alternatives? Compare the best compliance automation platforms including pricing, features, and expert recommendations.`,
        alternates: { canonical: `https://risclens.com/compare/${slug}` },
      };
    }
  }

  const page = await getAlternativePage(slug);
  if (page) {
    return {
      title: page.title,
      description: page.meta_description,
      alternates: { canonical: `https://risclens.com/compare/${slug}` },
    };
  }

  return { title: 'Tool Comparison | RiscLens' };
}

export default async function DynamicComparisonPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (slug.includes('-vs-')) {
    return <ComparisonPage slug={slug} />;
  }

  if (slug.endsWith('-alternatives')) {
    return <AlternativesPage slug={slug} />;
  }

  const page = await getAlternativePage(slug);
  if (!page) notFound();

  const { toolName, heroDescription, alternatives, comparisonFactors } = page.content_json;
  const ToolAlternativePage = (await import('@/components/ToolAlternativePage')).default;

  return (
    <ToolAlternativePage
      toolName={toolName}
      toolSlug={slug.replace('-alternatives', '')}
      heroDescription={heroDescription}
      alternatives={alternatives}
      comparisonFactors={comparisonFactors}
    />
  );
}

async function ComparisonPage({ slug }: { slug: string }) {
  const parsed = parseComparisonSlug(slug);
  if (!parsed) notFound();

  const { toolA, toolB } = await getToolsForComparison(parsed.toolASlug, parsed.toolBSlug);
  if (!toolA || !toolB) notFound();

  const { comparisonRows, pricingComparison, faqs } = generateComparisonData(toolA, toolB);
  const verdict = generateVerdict(toolA, toolB);
  const internalLinks = await getComparisonInternalLinks(toolA.slug, toolB.slug);
  const breadcrumbs = getBreadcrumbs(`/compare/${slug}`);

  const comparisonSchema = generateComparisonSchema(toolA, toolB, `https://risclens.com/compare/${slug}`);
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateSchemaOrgBreadcrumbs(breadcrumbs);

  const totalReviews = (toolA.g2_reviews_count || 0) + (toolB.g2_reviews_count || 0);

  return (
    <>
      <Script id="comparison-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-slate-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Independent Analysis</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                  {toolA.name} vs {toolB.name}
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  {generateComparisonDescription(toolA, toolB)}
                </p>
              </div>

              <EEATSignals
                lastVerified={toolA.last_verified_at}
                reviewCount={totalReviews}
                sources={['G2 Crowd', 'Capterra', 'Vendor Documentation', 'User Interviews']}
              />

              <TrustSignals />

              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden my-8">
                <div className="grid grid-cols-3 border-b border-slate-100">
                  <div className="p-4 bg-slate-50 border-r border-slate-100 font-bold text-slate-500 text-xs uppercase tracking-wider">Feature</div>
                  <div className="p-4 font-bold text-slate-900 text-center bg-blue-50">{toolA.name}</div>
                  <div className="p-4 font-bold text-slate-900 text-center">{toolB.name}</div>
                </div>

                {comparisonRows.map((row, i) => (
                  <div key={i} className={`grid grid-cols-3 border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                    <div className="p-4 border-r border-slate-100 text-sm font-semibold text-slate-700">{row.feature}</div>
                    <div className="p-4 flex items-center justify-center text-sm text-center bg-blue-50/30">
                      {renderValue(row.tool_a_value)}
                    </div>
                    <div className="p-4 flex items-center justify-center text-sm text-center">
                      {renderValue(row.tool_b_value)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 my-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Pricing Comparison</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <PricingCard tool={toolA} pricing={pricingComparison} side="a" />
                  <PricingCard tool={toolB} pricing={pricingComparison} side="b" />
                </div>
                <p className="mt-6 text-slate-600 text-sm">{pricingComparison.summary}</p>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8 my-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Our Verdict</h2>
                <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: verdict.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '<br/><br/>') }} />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 my-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">{toolA.name} Pros & Cons</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3">Pros</h4>
                    <ul className="space-y-2">
                      {toolA.pros?.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3">Cons</h4>
                    <ul className="space-y-2">
                      {toolA.cons?.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 my-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">{toolB.name} Pros & Cons</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3">Pros</h4>
                    <ul className="space-y-2">
                      {toolB.pros?.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3">Cons</h4>
                    <ul className="space-y-2">
                      {toolB.cons?.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 my-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
                      <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                      <p className="text-slate-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <ExpertAuthorBox />

              <InternalLinksInline clusters={internalLinks} />

              <div className="bg-blue-600 rounded-2xl p-8 text-white text-center my-8">
                <h2 className="text-2xl font-bold mb-4">Still deciding?</h2>
                <p className="text-blue-100 mb-6">Use our SOC 2 Cost Calculator to estimate your total compliance investment.</p>
                <Link href="/soc-2-cost-calculator" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Calculate Your Costs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <InternalLinks clusters={internalLinks} />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

async function AlternativesPage({ slug }: { slug: string }) {
  const toolSlug = slug.replace('-alternatives', '');
  const tools = await getAllTools();
  const tool = tools.find(t => t.slug === toolSlug);

  if (!tool) notFound();

  const alternatives = await getAlternativesFor(toolSlug);
  const internalLinks = await getAlternativesInternalLinks(toolSlug);
  const breadcrumbs = getBreadcrumbs(`/compare/${slug}`);
  const breadcrumbSchema = generateSchemaOrgBreadcrumbs(breadcrumbs);

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-slate-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                  Top {tool.name} Alternatives in 2026
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Looking for alternatives to {tool.name}? Compare {alternatives.length} compliance platforms by pricing, features, and best fit for your organization.
                </p>
              </div>

              <EEATSignals
                lastVerified={tool.last_verified_at}
                sources={['G2 Crowd', 'Capterra', 'Vendor Documentation']}
              />

              <div className="bg-white rounded-2xl border border-slate-200 p-6 my-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">About {tool.name}</h2>
                <p className="text-slate-600 mb-4">{tool.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="px-3 py-1 bg-slate-100 rounded-full">Starting at {tool.pricing_starting}</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-full">{tool.integrations_count}+ Integrations</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-full">{tool.frameworks_count}+ Frameworks</span>
                  {tool.g2_rating && <span className="px-3 py-1 bg-yellow-100 rounded-full">{tool.g2_rating}/5 G2 Rating</span>}
                </div>
              </div>

              <div className="space-y-6">
                {alternatives.map((alt, i) => (
                  <AlternativeCard key={alt.slug} tool={alt} originalTool={tool} rank={i + 1} />
                ))}
              </div>

              <ExpertAuthorBox />

              <InternalLinksInline clusters={internalLinks} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <InternalLinks clusters={internalLinks} />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

function renderValue(value: string) {
  if (value === 'Yes') return <Check className="w-5 h-5 text-green-500" />;
  if (value === 'No') return <X className="w-5 h-5 text-red-400" />;
  return <span className="text-slate-700">{value}</span>;
}

function PricingCard({ tool, pricing, side }: { tool: ComplianceTool; pricing: any; side: 'a' | 'b' }) {
  const starting = side === 'a' ? pricing.tool_a_starting : pricing.tool_b_starting;
  const range = side === 'a' ? pricing.tool_a_range : pricing.tool_b_range;
  const hidden = side === 'a' ? pricing.tool_a_hidden_costs : pricing.tool_b_hidden_costs;
  const auditorIncluded = side === 'a' ? pricing.tool_a_auditor_included : pricing.tool_b_auditor_included;

  return (
    <div className="border border-slate-200 rounded-xl p-6">
      <h3 className="font-bold text-slate-900 text-lg mb-4">{tool.name}</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Starting Price</span>
          <span className="font-semibold text-slate-900">{starting}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Typical Range</span>
          <span className="text-slate-700">{range}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Hidden Costs</span>
          <span className="text-slate-700">{hidden}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Auditor Included</span>
          {auditorIncluded ? (
            <span className="text-green-600 font-medium">Yes</span>
          ) : (
            <span className="text-slate-500">No (separate fee)</span>
          )}
        </div>
      </div>
      <Link
        href={`/pricing/${tool.slug}`}
        className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        Full Pricing Guide →
      </Link>
    </div>
  );
}

function AlternativeCard({ tool, originalTool, rank }: { tool: ComplianceTool; originalTool: ComplianceTool; rank: number }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase">#{rank} Alternative</span>
          <h3 className="text-xl font-bold text-slate-900">{tool.name}</h3>
          <p className="text-slate-500 text-sm">{tool.tagline}</p>
        </div>
        {tool.g2_rating && (
          <div className="text-right">
            <div className="text-lg font-bold text-slate-900">{tool.g2_rating}/5</div>
            <div className="text-xs text-slate-500">{tool.g2_reviews_count} reviews</div>
          </div>
        )}
      </div>

      <p className="text-slate-600 text-sm mb-4">{tool.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">{tool.pricing_starting}</span>
        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">{tool.target_market}</span>
        {tool.auditor_included && (
          <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">Auditor Included</span>
        )}
      </div>

      <div className="flex gap-3">
        <Link
          href={`/compare/${[tool.slug, originalTool.slug].sort().join('-vs-')}`}
          className="flex-1 text-center py-2 px-4 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          Compare with {originalTool.name}
        </Link>
        <Link
          href={`/pricing/${tool.slug}`}
          className="py-2 px-4 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
        >
          Pricing
        </Link>
      </div>
    </div>
  );
}
