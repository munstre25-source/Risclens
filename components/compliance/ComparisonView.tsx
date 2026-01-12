import { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';
import { ComplianceTool, ComparisonRow, PricingComparison, FAQ } from '@/lib/compliance-tools';
import { EEATSignals, ExpertAuthorBox, TrustSignals } from '@/components/EEATSignals';
import { InternalLinks, Breadcrumbs, InternalLinksInline } from '@/components/InternalLinks';

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

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Independent Analysis {industry ? `for ${industry.name}` : ''}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                {title}
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                {description}
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

            <div className="bg-white rounded-2xl border border-slate-200 p-8 my-8">
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

            <div className="bg-white rounded-2xl border border-slate-200 p-8 my-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {(faqs || []).map((faq, i) => (
                  <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
                    <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 my-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Alternatives to Consider</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-slate-800 mb-4">Top 3 Alternatives to {toolA.name}</h3>
                  <div className="space-y-4">
                    {(alternativesA || []).map(alt => (
                      <Link key={alt.slug} href={`/compare/${alt.slug}-alternatives`} className="block p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all">
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
                      <Link key={alt.slug} href={`/compare/${alt.slug}-alternatives`} className="block p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all">
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
    </main>
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
