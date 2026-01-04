import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { costIndustries } from '@/lib/navConfig';

const faqs = [
  {
    question: 'What drives SOC 2 audit pricing?',
    answer:
      'Auditor selection, Type I vs Type II scope, how many Trust Service Criteria you include, and how complex your environment is. More systems and data flows typically mean more evidence to collect and review.',
  },
  {
    question: 'How much should we budget beyond the auditor fee?',
    answer:
      'Most teams budget for compliance tooling, evidence automation, and remediation work. Expect software subscriptions and internal engineering time to be part of the total cost—not just the CPA firm invoice.',
  },
  {
    question: 'Does timeline change the cost?',
    answer:
      'Expedited timelines often cost more. Compressing readiness and Type II observation periods can require premium auditor time and more internal hours to gather evidence quickly.',
  },
  {
    question: 'Do early-stage startups need Type II on the first audit?',
    answer:
      'Many start with Type I to validate control design, then move to Type II once controls have been operating. If enterprise customers require a Type II immediately, plan for a longer observation period and higher total effort.',
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
  title: 'SOC 2 Cost (2026) Budget Estimate | RiscLens',
  description:
    'Estimate SOC 2 cost based on scope, timeline, tooling, and starting readiness. Use this guide to anchor your budget—then validate with the readiness assessment.',
  alternates: {
    canonical: '/soc-2-cost',
  },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost',
    title: 'SOC 2 Cost (2026) Budget Estimate | RiscLens',
    description:
      'Estimate SOC 2 cost based on scope, timeline, tooling, and starting readiness. Use this guide to anchor your budget—then validate with the readiness assessment.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'RiscLens - SOC 2 Cost and Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost (2026) Budget Estimate | RiscLens',
    description:
      'Estimate SOC 2 cost based on scope, timeline, tooling, and starting readiness. Use this guide to anchor your budget—then validate with the readiness assessment.',
    images: ['/og.png'],
  },
};

export default function Soc2CostPage() {
  return (
    <>
      <Script
        id="soc2-cost-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen flex flex-col bg-slate-100">
        <Header />

        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 lg:py-28 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              <span className="block">SOC 2 Cost (2026)</span>
              <span className="block text-brand-600">Budget Estimate</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              SOC 2 pricing isn&apos;t one-size-fits-all. Auditor selection, scope, timeline, tooling, and your starting readiness all influence the final number. Use this guide to anchor your budget, then run the readiness assessment to get tailored ranges.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Ready to see your score? Start the SOC 2 Readiness Index.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Link
                href="/soc-2-readiness-index"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Your Readiness Score
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-sm text-slate-500">Free • No sales calls • Instant results</p>
              <Link href="/soc-2-timeline" className="text-sm text-brand-700 underline underline-offset-2 hover:text-brand-800">
                Want timelines? See the SOC 2 Timeline Calculator
              </Link>
              <Link href="/penetration-testing/for-soc-2" className="text-sm text-brand-700 underline underline-offset-2 hover:text-brand-800">
                Related: Penetration Testing for SOC 2
              </Link>
              <Link href="/vendor-risk-assessment" className="text-sm text-brand-700 underline underline-offset-2 hover:text-brand-800">
                Related: Vendor Risk Assessment
              </Link>
            </div>
          </div>
          <div className="max-w-2xl mx-auto text-left mt-8">
            <p className="text-sm font-medium text-slate-700 mb-2">Who this is for</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm leading-relaxed">
              <li>SaaS, fintech, and data-driven startups</li>
              <li>Teams preparing for enterprise customers or investor due diligence</li>
              <li>Founders who need a SOC 2 reality check before engaging auditors</li>
            </ul>
          </div>
        </section>

        <section className="bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">Cost by industry</h2>
              <Link href="/soc-2/industries" className="text-sm text-brand-700 underline underline-offset-4 hover:text-brand-800">
                View all industries →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {costIndustries.map((item) => (
                <Link
                  key={item.slug}
                  href={item.costHref}
                  className="group block rounded-xl border border-slate-200 bg-white hover:border-brand-200 hover:shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                >
                  <div className="p-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-semibold text-slate-900">{item.label}</p>
                      <svg className="w-4 h-4 text-brand-600 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-600">{item.blurb}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What shapes SOC 2 pricing?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A realistic SOC 2 budget blends external fees and internal effort. CPA firms price based on the controls they need to test, the number of systems in scope, and how quickly you want the report. Tooling helps reduce lift, but it adds subscription spend you should plan for up front.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Early clarity prevents mid-engagement surprises. Teams that map out scope, ownership, and evidence expectations ahead of time usually avoid rush fees and rework.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Top SOC 2 cost drivers</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Audit scope and type</strong> — Type I vs Type II, number of Trust Service Criteria, and included systems.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Auditor selection</strong> — CPA firm reputation, delivery model, and how much support they provide.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Timeline and observation</strong> — Compressed timelines or longer observation windows affect total effort.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Tooling stack</strong> — GRC platforms, evidence automation, logging, and vulnerability tooling subscriptions.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Readiness starting point</strong> — Policies, access reviews, and security baselines already in place reduce remediation spend.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Ready to see your number?</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The RiscLens readiness assessment benchmarks your environment, timelines, and industry to project a realistic SOC 2 budget. It highlights where to reduce cost—before you sign an auditor engagement letter.
              </p>
              <Link
                href="/soc-2-readiness-index"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all"
              >
                Start the readiness assessment
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">SOC 2 Cost FAQs</h3>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question} className="space-y-2">
                    <p className="text-base font-semibold text-slate-900">{faq.question}</p>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Explore related resources</h3>
              <div className="flex flex-wrap gap-4 text-brand-700">
                <Link href="/soc-2-readiness-index" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 Readiness Index
                </Link>
                <Link href="/soc-2-readiness/saas" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 Readiness for SaaS
                </Link>
                <Link href="/soc-2-readiness/fintech" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 Readiness for Fintech
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">SOC 2 Cost FAQs</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">How much does SOC 2 typically cost?</h3>
                <p className="text-slate-600">Budgets often range from tens of thousands for first-time Type I to higher for Type II with tooling and internal effort included.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">What increases SOC 2 audit cost the most?</h3>
                <p className="text-slate-600">Expanded scope, compressed timelines, and complex environments add hours for auditors and internal teams.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Is SOC 2 Type II more expensive than Type I?</h3>
                <p className="text-slate-600">Yes. Type II requires operating evidence over an observation window, which adds auditor time and preparation effort.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Can startups reduce SOC 2 costs?</h3>
                <p className="text-slate-600">Narrowing scope, standardizing controls, and using evidence automation can lower both auditor fees and internal hours.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">How long does SOC 2 usually take?</h3>
                <p className="text-slate-600">Readiness can take a few months; Type I typically weeks; Type II adds 3–12 months of observation depending on requirements.</p>
              </div>
              <div className="border-t border-slate-200 pt-6 text-sm text-slate-600">
                <p className="font-medium text-slate-700 mb-2">About RiscLens</p>
                <p className="leading-relaxed">
                  RiscLens is an independent SOC 2 readiness project built to help early-stage teams understand audit expectations, costs, and gaps — without sales pressure or automation lock-in.
                </p>
              </div>
              <div className="text-sm text-slate-600">
                <p className="font-medium text-slate-700 mb-2">Your data &amp; privacy</p>
                <ul className="list-disc list-inside space-y-1 leading-relaxed">
                  <li>We do not sell or share your information</li>
                  <li>Responses are used only to calculate your score</li>
                  <li>You can complete the assessment without providing an email</li>
                  <li>Aggregated, anonymous data may be used to improve estimates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <AssessmentCTA />
      </main>
      <Footer />
    </>
  );
}
