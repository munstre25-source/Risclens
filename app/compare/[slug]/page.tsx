import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import ComparisonLeadMagnet from '@/components/ComparisonLeadMagnet';
import { getToolComparison, toolComparisons } from '@/lib/toolComparisons';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return toolComparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const comparison = getToolComparison(params.slug);
  if (!comparison) return {};
  const url = `https://risclens.com/compare/${comparison.slug}`;
  return {
    title: comparison.title,
    description: comparison.description,
    alternates: { canonical: `/compare/${comparison.slug}` },
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      url,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Comparison' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: comparison.title,
      description: comparison.description,
      images: ['/og.png'],
    },
  };
}

function PricingSection({ comparison }: { comparison: ReturnType<typeof getToolComparison> }) {
  if (!comparison?.pricing) return null;
  const { pricing, toolA, toolB } = comparison;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-bold text-slate-900">Pricing Comparison</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-brand-700">{toolA.name}</h3>
            {pricing.toolAAuditorIncluded && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Auditor Included</span>
            )}
          </div>
          <p className="text-2xl font-bold text-slate-900">{pricing.toolAStarting}</p>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide">Cost Drivers</p>
              <p className="text-slate-700">{pricing.toolACostDrivers}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide">Hidden Costs</p>
              <p className="text-slate-700">{pricing.toolAHiddenCosts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-brand-700">{toolB.name}</h3>
            {pricing.toolBAuditorIncluded && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Auditor Included</span>
            )}
          </div>
          <p className="text-2xl font-bold text-slate-900">{pricing.toolBStarting}</p>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide">Cost Drivers</p>
              <p className="text-slate-700">{pricing.toolBCostDrivers}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide">Hidden Costs</p>
              <p className="text-slate-700">{pricing.toolBHiddenCosts}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-2">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-semibold text-amber-800 text-sm">Pricing Insight</p>
            <p className="text-amber-700 text-sm">{pricing.summary}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/compliance-roi-calculator"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Calculate your personalized compliance ROI
        </Link>
      </div>
    </div>
  );
}

export default function ToolComparisonPage({ params }: PageProps) {
  const comparison = getToolComparison(params.slug);
  if (!comparison) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comparison.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const lastUpdated = new Date().toISOString().split('T')[0];

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id={`faq-${comparison.slug}`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Tool Comparison</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{comparison.title}</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{comparison.description}</p>
          <div className="flex justify-center">
            <AssessmentCTA />
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-sm text-left text-slate-800">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3">Feature</th>
                  <th className="px-4 py-3 text-brand-700">{comparison.toolA.name}</th>
                  <th className="px-4 py-3 text-brand-700">{comparison.toolB.name}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.tableRows.map((row) => (
                  <tr key={row.feature} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.feature}</td>
                    <td className="px-4 py-3 text-slate-700">{row.toolAValue}</td>
                    <td className="px-4 py-3 text-slate-700">{row.toolBValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

              <PricingSection comparison={comparison} />

              <ComparisonLeadMagnet 
                toolA={comparison.toolA.name} 
                toolB={comparison.toolB.name} 
              />

              <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 space-y-3">

            <h2 className="text-xl font-bold text-brand-900">The Verdict</h2>
            <p className="text-brand-800 leading-relaxed">{comparison.verdict}</p>
          </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Related Resources</h3>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/compare" className="px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 font-medium hover:bg-brand-100 transition-colors">
                  ← Back to Comparisons Hub
                </Link>
                <Link href="/soc-2-readiness-calculator" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200 transition-colors">SOC 2 Readiness Score</Link>
                <Link href="/soc-2-cost" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200 transition-colors">SOC 2 Cost Guide</Link>
                <Link href="/soc-2-timeline" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200 transition-colors">SOC 2 Timeline</Link>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Compare More Platforms</p>
                <div className="flex flex-wrap gap-2">
                  {toolComparisons.filter(c => c.slug !== params.slug).slice(0, 4).map(c => (
                    <Link 
                      key={c.slug} 
                      href={`/compare/${c.slug}`}
                      className="text-sm text-slate-600 hover:text-brand-600 hover:underline transition-colors"
                    >
                      {c.toolA.name} vs {c.toolB.name}
                    </Link>
                  ))}
                  <Link href="/compare" className="text-sm text-brand-600 font-medium hover:underline">
                    View all 15+ comparisons →
                  </Link>
                </div>
              </div>
            </div>


          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Common Questions</h3>
            {comparison.faqs.map((faq) => (
              <div key={faq.question}>
                <p className="font-semibold text-slate-900">{faq.question}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 text-center">Last updated: {lastUpdated}</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
