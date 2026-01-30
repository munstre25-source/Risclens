import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Check, X, ArrowRight } from 'lucide-react';
import { ComplianceTool, ComparisonRow, PricingComparison, FAQ } from '@/lib/compliance-tools';
import { EEATSignals, ExpertAuthorBox, TrustSignals } from '@/components/EEATSignals';
import { InternalLinks, Breadcrumbs, InternalLinksInline } from '@/components/InternalLinks';
import { generateComparisonFAQs, generateEnhancedFAQSchema } from '@/lib/seo-enhancements';

interface ComparisonViewProps {
  toolA: ComplianceTool;
  toolB: ComplianceTool;
  comparisonRows: ComparisonRow[];
  pricingComparison: PricingComparison;
  faqs: FAQ[];
  verdict: string;
  title: string;
  description: string;
  internalLinks: any;
  breadcrumbs: any;
  industry?: any;
  alternativesA?: ComplianceTool[];
  alternativesB?: ComplianceTool[];
}

/**
 * Above-fold Quick Summary Component
 * Clean, professional design following Vanta/Drata style
 */
function QuickSummary({ 
  toolA, 
  toolB, 
  pricingComparison 
}: { 
  toolA: ComplianceTool; 
  toolB: ComplianceTool;
  pricingComparison: PricingComparison;
}) {
  const priceA = pricingComparison?.tool_a_starting || toolA.pricing_starting;
  const priceB = pricingComparison?.tool_b_starting || toolB.pricing_starting;
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  return (
    <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 mb-8">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Summary</h2>
        <span className="text-xs text-slate-500">Updated {currentMonth}</span>
      </div>
      
      <p className="text-slate-700 mb-6">
        Both {toolA.name} and {toolB.name} are established compliance automation platforms. 
        Your choice depends on team size, budget, and compliance scope.
      </p>
      
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-slate-900 mb-3">{toolA.name}</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            {priceA && <li>Starting at {priceA}</li>}
            <li>Best for: {toolA.best_for || 'Growing teams'}</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-slate-900 mb-3">{toolB.name}</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            {priceB && <li>Starting at {priceB}</li>}
            <li>Best for: {toolB.best_for || 'Enterprise organizations'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ComparisonView({
  toolA,
  toolB,
  comparisonRows,
  pricingComparison,
  faqs,
  verdict,
  title,
  description,
  internalLinks,
  breadcrumbs,
  industry,
  alternativesA = [],
  alternativesB = []
}: ComparisonViewProps) {
  const totalReviews = (toolA.g2_reviews_count || 0) + (toolB.g2_reviews_count || 0);
  
  // Generate FAQs with schema for rich snippets
  const allFaqs = faqs && faqs.length > 0 ? faqs : generateComparisonFAQs(
    toolA.name,
    toolB.name,
    toolA.pricing_starting || undefined,
    toolB.pricing_starting || undefined
  );
  
  const faqSchema = generateEnhancedFAQSchema(allFaqs);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* FAQ Schema for Rich Snippets */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-slate-700" />
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Independent Analysis {industry ? `for ${industry.name}` : ''}</span>
            </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                {title}
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                {description}
              </p>
            </div>

            {/* Above-fold Quick Summary - Answers query intent immediately */}
            <QuickSummary toolA={toolA} toolB={toolB} pricingComparison={pricingComparison} />

            <EEATSignals
              lastVerified={toolA.last_verified_at}
              reviewCount={totalReviews}
              sources={['G2 Crowd', 'Capterra', 'Vendor Documentation', 'User Interviews']}
            />

            <TrustSignals />

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden my-8">
              <div className="grid grid-cols-3 border-b border-slate-100">
                <div className="p-4 bg-slate-50 border-r border-slate-100 font-bold text-slate-500 text-xs uppercase tracking-wider">Feature</div>
                <div className="p-4 font-semibold text-slate-900 text-center bg-slate-50">{toolA.name}</div>
                <div className="p-4 font-bold text-slate-900 text-center">{toolB.name}</div>
              </div>

              {comparisonRows.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                  <div className="p-4 border-r border-slate-100 text-sm font-semibold text-slate-700">{row.feature}</div>
                  <div className="p-4 flex items-center justify-center text-sm text-center bg-slate-50/60">
                    {renderValue(row.tool_a_value)}
                  </div>
                  <div className="p-4 flex items-center justify-center text-sm text-center">
                    {renderValue(row.tool_b_value)}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-8 my-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Pricing Comparison</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <PricingCard tool={toolA} pricing={pricingComparison} side="a" />
                <PricingCard tool={toolB} pricing={pricingComparison} side="b" />
              </div>
              <p className="mt-6 text-slate-600 text-sm">{pricingComparison.summary}</p>
            </div>

            <div className="bg-slate-900 rounded-lg p-8 my-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Our Verdict</h2>
              <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: verdict.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '<br/><br/>') }} />
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-8 my-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{toolA.name} Pros & Cons</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">Pros</h4>
                  <ul className="space-y-2">
                    {(toolA.pros || []).map((pro, i) => (
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
                    {(toolA.cons || []).map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-8 my-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{toolB.name} Pros & Cons</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">Pros</h4>
                  <ul className="space-y-2">
                    {(toolB.pros || []).map((pro, i) => (
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
                    {(toolB.cons || []).map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-8 my-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Best-fit snapshot</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[{ tool: toolA, label: toolA.name }, { tool: toolB, label: toolB.name }].map(({ tool, label }) => (
                  <div key={tool.slug} className="rounded-lg border border-slate-200 p-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">{label}</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {getFitPoints(tool).map((point, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-slate-400">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section with Schema Markup for Rich Snippets */}
            <div className="bg-white rounded-lg border border-slate-200 p-8 my-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {/* Use provided FAQs or generate defaults */}
                {(faqs && faqs.length > 0 ? faqs : generateComparisonFAQs(
                  toolA.name,
                  toolB.name,
                  toolA.pricing_starting || undefined,
                  toolB.pricing_starting || undefined
                )).map((faq, i) => (
                  <div key={i} className="border-b border-slate-100 pb-4 last:border-0" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h3 className="font-semibold text-slate-900 mb-2" itemProp="name">{faq.question}</h3>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-slate-600 text-sm" itemProp="text">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-8 my-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Alternatives to Consider</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-slate-800 mb-4">Top 3 Alternatives to {toolA.name}</h3>
                  <div className="space-y-4">
                    {(alternativesA || []).map(alt => (
                      <Link key={alt.slug} href={`/compare/${alt.slug}-alternatives`} className="block p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                        <div className="font-bold text-slate-900">{alt.name}</div>
                        <div className="text-sm text-slate-500 line-clamp-1">{alt.tagline}</div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-4">Top 3 Alternatives to {toolB.name}</h3>
                  <div className="space-y-4">
                    {(alternativesB || []).map(alt => (
                      <Link key={alt.slug} href={`/compare/${alt.slug}-alternatives`} className="block p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                        <div className="font-bold text-slate-900">{alt.name}</div>
                        <div className="text-sm text-slate-500 line-clamp-1">{alt.tagline}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ExpertAuthorBox />
            <InternalLinksInline clusters={internalLinks} />

            <div className="bg-slate-900 rounded-lg p-8 text-white text-center my-8">
              <h2 className="text-2xl font-bold mb-4">Still deciding?</h2>
              <p className="text-slate-100 mb-6">Use our SOC 2 Cost Calculator to estimate your total compliance investment.</p>
              <Link href="/soc-2-cost-calculator" className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">
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
    </main>
  );
}

function getFitPoints(tool: ComplianceTool) {
  const points = [
    tool.best_for ? `Best fit: ${tool.best_for}` : 'Best fit: teams prioritizing audit readiness and faster implementations.',
    tool.frameworks_supported && tool.frameworks_supported.length > 0
      ? `Frameworks: ${tool.frameworks_supported.slice(0, 4).join(', ')}`
      : 'Framework coverage varies by plan and auditor requirements.',
    typeof tool.integrations_count === 'number' && tool.integrations_count > 0
      ? `Integrations: ${tool.integrations_count}+ supported systems`
      : 'Integration depth varies by data source and plan.',
    tool.target_market ? `Target market: ${tool.target_market}` : 'Commonly used by growth-stage B2B teams.',
  ];
  return points.slice(0, 4);
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
    <div className="border border-slate-200 rounded-lg p-6">
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
        className="mt-4 block text-center text-sm text-slate-700 hover:text-slate-900 font-medium"
      >
        Full Pricing Guide →
      </Link>
    </div>
  );
}
