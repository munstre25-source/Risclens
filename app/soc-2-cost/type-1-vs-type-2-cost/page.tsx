import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { StickyCTA } from '@/components/StickyCTA';

const faqs = [
  {
    question: 'Why is Type II more expensive than Type I?',
    answer: 'Type II requires operating effectiveness evidence over 3-12 months, not just point-in-time documentation. More auditor hours, longer observation, and more evidence collection drive the cost increase.',
  },
  {
    question: 'Is it cheaper to skip Type I and go straight to Type II?',
    answer: 'Sometimes, but risky. Type I helps validate control design before committing to a long observation window. If controls are immature, you may waste the observation period fixing issues.',
  },
  {
    question: 'How much more does Type II cost vs Type I?',
    answer: 'Typically 40-80% more. A $20K Type I audit might be $28-36K for Type II from the same firm. The longer observation window and evidence requirements drive the difference.',
  },
  {
    question: 'Can I do a 3-month Type II to save money?',
    answer: 'Yes, but many enterprise buyers prefer 6-12 month windows. A 3-month window is better than Type I, but you may face questions about why the window is short.',
  },
  {
    question: 'Does the same auditor charge less for Type II after Type I?',
    answer: 'Often yes. They already documented your environment during Type I. Expect 10-20% auditor efficiency on the Type II portion, though the longer observation still adds cost.',
  },
  {
    question: 'What is the hidden cost of Type II?',
    answer: 'Internal effort. Your team must maintain evidence quality for the entire observation window—access reviews, change logs, incident responses. This sustained effort is often underestimated.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: 'SOC 2 Type I vs Type II Cost Breakdown (2026) | RiscLens',
  description: 'Compare SOC 2 Type I vs Type II costs. See audit fees, timeline differences, and total budget breakdown for each audit type.',
  alternates: {
    canonical: '/soc-2-cost/type-1-vs-type-2-cost',
  },
  openGraph: {
    type: 'article',
    url: 'https://risclens.com/soc-2-cost/type-1-vs-type-2-cost',
    title: 'SOC 2 Type I vs Type II Cost Breakdown (2026) | RiscLens',
    description: 'Compare SOC 2 Type I vs Type II costs. Audit fees, timelines, and total budget for each audit type.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Type I vs Type II Cost' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Type I vs Type II Cost Breakdown (2026) | RiscLens',
    description: 'How much more does Type II cost? Full breakdown of SOC 2 audit pricing by type.',
    images: ['/og.png'],
  },
};

export default function TypeIVsTypeIICostPage() {
  return (
    <>
      <Script
        id="type-cost-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'SOC 2 Cost', href: '/soc-2-cost' }, { label: 'Type I vs Type II Cost' }]} />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">SOC 2 Cost Comparison</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              SOC 2 Type I vs Type II Cost
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Type II costs 40-80% more than Type I. Understand where the money goes—and when each audit type makes financial sense.
            </p>
            <Link
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Your Cost Estimate
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="mt-4 text-sm text-slate-500">Free • Compare Type I vs Type II • Instant results</p>
          </div>
        </section>

        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Type I</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Point-in-Time</span>
                </div>
                <p className="text-slate-700 text-sm">
                  Validates control <strong>design</strong> at a specific date. Confirms controls exist and are documented.
                </p>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <p className="text-xs text-slate-500 mb-1">Auditor Fee Range</p>
                    <p className="text-2xl font-bold text-blue-700">$12,000 – $35,000</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <p className="text-xs text-slate-500 mb-1">Timeline</p>
                    <p className="text-2xl font-bold text-blue-700">2-6 weeks</p>
                    <p className="text-xs text-slate-500 mt-1">After controls are ready</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <p className="text-xs text-slate-500 mb-1">Internal Effort</p>
                    <p className="text-2xl font-bold text-blue-700">80-150 hours</p>
                    <p className="text-xs text-slate-500 mt-1">Documentation + walkthrough prep</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <p className="text-xs text-slate-500 mb-1">Total First-Year Cost</p>
                    <p className="text-2xl font-bold text-blue-700">$35,000 – $90,000</p>
                    <p className="text-xs text-slate-500 mt-1">Including tooling + internal effort</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-blue-200">
                  <p className="text-sm font-semibold text-slate-800 mb-2">Best For:</p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• First-time SOC 2 audits</li>
                    <li>• Proving compliance quickly for a deal</li>
                    <li>• Validating control design before Type II</li>
                  </ul>
                </div>
              </div>

              <div className="bg-violet-50 border-2 border-violet-200 rounded-xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Type II</h2>
                  <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-full">Operating Period</span>
                </div>
                <p className="text-slate-700 text-sm">
                  Validates control <strong>design + operating effectiveness</strong> over 3-12 months. Confirms controls work consistently.
                </p>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-violet-100">
                    <p className="text-xs text-slate-500 mb-1">Auditor Fee Range</p>
                    <p className="text-2xl font-bold text-violet-700">$18,000 – $55,000</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-violet-100">
                    <p className="text-xs text-slate-500 mb-1">Timeline</p>
                    <p className="text-2xl font-bold text-violet-700">3-12 months</p>
                    <p className="text-xs text-slate-500 mt-1">Observation window + audit</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-violet-100">
                    <p className="text-xs text-slate-500 mb-1">Internal Effort</p>
                    <p className="text-2xl font-bold text-violet-700">200-400 hours</p>
                    <p className="text-xs text-slate-500 mt-1">Sustained evidence collection</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-violet-100">
                    <p className="text-xs text-slate-500 mb-1">Total First-Year Cost</p>
                    <p className="text-2xl font-bold text-violet-700">$55,000 – $150,000</p>
                    <p className="text-xs text-slate-500 mt-1">Including tooling + internal effort</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-violet-200">
                  <p className="text-sm font-semibold text-slate-800 mb-2">Best For:</p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Enterprise customer requirements</li>
                    <li>• Mature security programs</li>
                    <li>• Long-term compliance strategy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">The Real Cost Difference: It&apos;s Not Just Auditor Fees</h3>
              <p className="text-slate-700 leading-relaxed">
                Auditor fees for Type II are ~40-60% higher. But the <strong>total cost difference is 60-80%</strong> when you factor in:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-amber-100">
                  <p className="font-bold text-amber-800">Sustained Evidence</p>
                  <p className="text-sm text-slate-600">3-12 months of access reviews, change logs, and incident documentation</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-amber-100">
                  <p className="font-bold text-amber-800">Tooling Runtime</p>
                  <p className="text-sm text-slate-600">Longer subscription period before audit completion</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-amber-100">
                  <p className="font-bold text-amber-800">Team Bandwidth</p>
                  <p className="text-sm text-slate-600">Ongoing maintenance vs. one-time prep sprint</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Cost Breakdown by Component</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-900">Component</th>
                      <th className="text-left px-4 py-3 font-semibold text-blue-700">Type I</th>
                      <th className="text-left px-4 py-3 font-semibold text-violet-700">Type II</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-900">Difference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-white">
                      <td className="px-4 py-3 text-slate-900 font-medium">Auditor fees</td>
                      <td className="px-4 py-3 text-slate-600">$12K – $35K</td>
                      <td className="px-4 py-3 text-slate-600">$18K – $55K</td>
                      <td className="px-4 py-3 text-amber-600 font-medium">+40-60%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 text-slate-900 font-medium">GRC platform</td>
                      <td className="px-4 py-3 text-slate-600">$8K – $24K</td>
                      <td className="px-4 py-3 text-slate-600">$12K – $36K</td>
                      <td className="px-4 py-3 text-amber-600 font-medium">+30-50%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 text-slate-900 font-medium">Internal effort (hours)</td>
                      <td className="px-4 py-3 text-slate-600">80-150 hrs</td>
                      <td className="px-4 py-3 text-slate-600">200-400 hrs</td>
                      <td className="px-4 py-3 text-amber-600 font-medium">+150-200%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 text-slate-900 font-medium">Time to completion</td>
                      <td className="px-4 py-3 text-slate-600">2-6 weeks</td>
                      <td className="px-4 py-3 text-slate-600">3-12 months</td>
                      <td className="px-4 py-3 text-amber-600 font-medium">+300-500%</td>
                    </tr>
                    <tr className="bg-white font-semibold">
                      <td className="px-4 py-3 text-slate-900">Total first-year cost</td>
                      <td className="px-4 py-3 text-blue-700">$35K – $90K</td>
                      <td className="px-4 py-3 text-violet-700">$55K – $150K</td>
                      <td className="px-4 py-3 text-amber-700">+60-80%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">When to Choose Each Type</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-3">
                  <h3 className="font-bold text-blue-900">Choose Type I When:</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">$</span>
                      <span>Budget is constrained and you need compliance proof fast</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">$</span>
                      <span>Customer accepts Type I for initial deal close</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">$</span>
                      <span>Controls are new and untested in production</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">$</span>
                      <span>You want to validate design before committing to Type II</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 space-y-3">
                  <h3 className="font-bold text-violet-900">Choose Type II When:</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-violet-600 font-bold">$</span>
                      <span>Enterprise customers explicitly require Type II</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-violet-600 font-bold">$</span>
                      <span>Controls have been operating 6+ months already</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-violet-600 font-bold">$</span>
                      <span>You have dedicated compliance ownership</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-violet-600 font-bold">$</span>
                      <span>Long-term compliance program is established</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Strategic Path: Type I First, Then Type II</h3>
              <p className="text-slate-700 leading-relaxed">
                Many teams optimize cost by doing Type I first (prove design), then starting the Type II observation window immediately after. This approach:
              </p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span><strong>Validates controls early</strong> — Catch design issues before a long observation period</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span><strong>Unblocks deals faster</strong> — Type I report can close urgent enterprise deals</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span><strong>Reduces Type II risk</strong> — Observation window starts with validated controls</span>
                </li>
              </ul>
              <p className="text-sm text-slate-600 italic">
                Combined cost: ~10-15% higher than skipping Type I, but significantly lower risk of failed Type II audit.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">SOC 2 Type I vs Type II Cost FAQs</h3>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="space-y-1">
                    <p className="font-semibold text-slate-900">{faq.question}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Get Your Type I vs Type II Cost Estimate</h3>
              <p className="text-slate-600 max-w-xl mx-auto">
                See personalized cost projections for both audit types based on your team size, industry, and timeline.
              </p>
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Calculate My SOC 2 Cost →
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-sm justify-center">
              <Link href="/soc-2-cost" className="px-4 py-2 rounded-full border border-slate-200 bg-white text-brand-700 hover:border-brand-200 font-bold shadow-sm transition-all">
                ← Back to SOC 2 Cost Hub
              </Link>
              {['first-year-vs-renewal', 'by-team-size', 'industries', 'startups'].map((slug) => (
                <Link
                  key={slug}
                  href={`/soc-2-cost/${slug}`}
                  className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:text-brand-700 transition-all"
                >
                  {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <StickyCTA />
      </main>
      <Footer />
    </>
  );
}
