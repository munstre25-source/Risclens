import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import AboutSection from '@/components/AboutSection';
import ExpertReview from '@/components/ExpertReview';
import { costIndustries } from '@/lib/navConfig';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { ContextualSignals } from '@/components/compliance/ContextualSignals';
import { StickyCTA } from '@/components/StickyCTA';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Soc2CostCalculator } from '@/components/calculators/Soc2CostCalculator';

const costTiers = [
  {
    tier: 'Startup (1-15 staff)',
    typeI: '$15,000 – $25,000',
    typeII: '$25,000 – $40,000',
    bestFor: 'Seed/Series A, proof of concept',
  },
  {
    tier: 'Growth (15-75 staff)',
    typeI: '$25,000 – $40,000',
    typeII: '$40,000 – $65,000',
    bestFor: 'Scaling startups, vendor diligence',
  },
  {
    tier: 'Enterprise (100+ staff)',
    typeI: '$45,000 – $75,000',
    typeII: '$75,000 – $150,000+',
    bestFor: 'Public/regulated entities, complex tech stacks',
  },
];

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
    canonical: 'https://risclens.com/soc-2-cost',
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

          <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-20 lg:pt-16 lg:pb-28 text-center">
              <Breadcrumb
                items={[
                  { label: 'SOC 2', href: '/soc-2' },
                  { label: 'Cost Guide', href: '/soc-2-cost' }
                ]}
              />
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                <span className="block">SOC 2 Cost (2026)</span>
                <span className="block text-brand-600">Full Budget Breakdown</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                Estimate your Total Cost of Compliance (TCC). From auditor fees to internal engineering effort and automation tooling—map every dollar before you start.
              </p>
              
              <Soc2CostCalculator />
            </div>
          </section>

          <section className="bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Auditor Fees by Tier</h2>
                  <p className="text-slate-600 mb-8">
                    CPA firm pricing is driven by scope and headcount. Boutique firms offer lower entry points for startups, while "Big 4" and national firms carry premiums for brand and complex enterprise environments.
                  </p>
                  <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-bottom border-slate-200">
                          <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Tier</th>
                          <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Type I</th>
                          <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Type II</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {costTiers.map((tier) => (
                          <tr key={tier.tier} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3">
                              <p className="text-sm font-bold text-slate-900">{tier.tier}</p>
                              <p className="text-xs text-slate-500">{tier.bestFor}</p>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600 font-medium">{tier.typeI}</td>
                            <td className="px-4 py-3 text-sm text-slate-600 font-medium">{tier.typeII}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                  <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-2xl">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-sm">!</span>
                      Market Pricing Variance
                    </h3>
                    <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                      Auditor rates vary by up to 35% depending on your home market and whether you require on-site walkthroughs. Boutique firms in tech hubs like Austin or Denver often provide more competitive rates than national firms in NYC or SF.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-brand-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm"><strong>Regional Hubs:</strong> Save 15-20% on local expertise.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-brand-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm"><strong>Remote Audits:</strong> Eliminates T&E (Travel & Expense) fees.</p>
                      </div>
                    </div>
                    <Link 
                      href="/auditor-directory"
                      className="block mt-8 w-full py-3 bg-white text-slate-900 text-center rounded-lg font-bold transition-all hover:bg-slate-100"
                    >
                      Browse Local Auditor Pricing →
                    </Link>
                  </div>

              </div>
            </div>
          </section>

          <section className="bg-slate-50 border-y border-slate-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Programmatic Cost Analysis by Scenario</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  href="/soc-2-cost/first-year-vs-renewal"
                  className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-600 group-hover:text-white transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">First Year vs Renewal</h3>
                  <p className="text-sm text-slate-600 mb-4">Initial readiness costs can be 3x higher than maintenance. See the 3-year budget model.</p>
                  <span className="text-brand-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read the analysis <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                </Link>

                <Link
                  href="/soc-2-cost/by-team-size"
                  className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-600 group-hover:text-white transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Cost by Team Size</h3>
                  <p className="text-sm text-slate-600 mb-4">Calculated benchmarks for 5, 25, 100, and 500 employee organizations.</p>
                  <span className="text-brand-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View benchmarks <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                </Link>

                <Link
                  href="/soc-2-cost/type-1-vs-type-2-cost"
                  className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-600 group-hover:text-white transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Type I vs II Delta</h3>
                  <p className="text-sm text-slate-600 mb-4">Why Type II costs 2x but generates 5x the trust. Direct pricing comparison.</p>
                  <span className="text-brand-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Compare types <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-white py-16 border-b border-slate-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Industry Cost Benchmarks</h2>
                  <p className="text-slate-600 mt-2">Niche-specific compliance requirements drive cost variance.</p>
                </div>
                <Link href="/soc-2-cost/industries" className="inline-flex items-center gap-2 font-bold text-brand-600 hover:text-brand-700">
                  Browse All Industries <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {costIndustries.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.costHref}
                    className="group flex items-center justify-between p-5 rounded-xl border border-slate-200 bg-white hover:border-brand-500 hover:shadow-md transition-all"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{item.label}</h4>
                      <p className="text-xs text-slate-500 mt-1">{item.blurb}</p>
                    </div>
                    <svg className="w-5 h-5 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
                {/* Programmatic expansion links */}
                <Link
                  href="/soc-2-cost/soc-2-cost-for-gaming"
                  className="group flex items-center justify-between p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-brand-500 hover:shadow-md transition-all opacity-70 hover:opacity-100"
                >
                  <h4 className="font-bold text-slate-900">Gaming & Web3</h4>
                  <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link
                  href="/soc-2-cost/soc-2-cost-for-hrtech"
                  className="group flex items-center justify-between p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-brand-500 hover:shadow-md transition-all opacity-70 hover:opacity-100"
                >
                  <h4 className="font-bold text-slate-900">HRTech & Payroll</h4>
                  <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link
                  href="/soc-2-cost/soc-2-cost-for-martech"
                  className="group flex items-center justify-between p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-brand-500 hover:shadow-md transition-all opacity-70 hover:opacity-100"
                >
                  <h4 className="font-bold text-slate-900">MarTech & Analytics</h4>
                  <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </section>

          <section className="py-20 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <ExpertReview
                authorId="raphael"
                date="January 10, 2026"
                title="SOC 2 Cost Guide 2026"
                url="/soc-2-cost"
              />
              
              <div className="mt-16 prose prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">What Shapes Your Final Quote?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 not-prose">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold">1</div>
                      <div>
                        <h4 className="font-bold text-slate-900">TSC Selection</h4>
                        <p className="text-sm text-slate-600">Adding Confidentiality, Availability, or Processing Integrity to the base Security criteria adds 15-20% per Trust Service Criteria.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold">2</div>
                      <div>
                        <h4 className="font-bold text-slate-900">Infrastructure Complexity</h4>
                        <p className="text-sm text-slate-600">Multi-cloud or hybrid environments require more evidence samples and auditor interviews, driving up manual effort.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold">3</div>
                      <div>
                        <h4 className="font-bold text-slate-900">Auditor Brand</h4>
                        <p className="text-sm text-slate-600">Enterprise customers may reject boutique reports. "Tier 1" firms charge a $20k+ premium for their letterhead.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-brand-900 text-white rounded-2xl p-8">
                    <h4 className="text-lg font-bold mb-4">Total Cost of Compliance (TCC)</h4>
                    <p className="text-sm text-brand-100 mb-6">
                      A true budget must include the "soft" costs often ignored in GRC sales pitches.
                    </p>
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center text-sm border-b border-brand-800 pb-2">
                          <span>Auditor Fee</span>
                          <span className="font-mono text-brand-300">40%</span>
                        </li>
                        <li className="flex justify-between items-center text-sm border-b border-brand-800 pb-2">
                          <span>Automation Platform</span>
                          <Link href="/pricing" className="font-mono text-brand-300 hover:text-white underline decoration-brand-600 underline-offset-4">20%</Link>
                        </li>
                        <li className="flex justify-between items-center text-sm border-b border-brand-800 pb-2">
                          <span>Engineering Opportunity Cost</span>
                          <span className="font-mono text-brand-300">30%</span>
                        </li>
                        <li className="flex justify-between items-center text-sm border-b border-brand-800 pb-2">
                          <span>Third Party Tools (EDR, MDM)</span>
                          <span className="font-mono text-brand-300">10%</span>
                        </li>
                      </ul>
                      <div className="mt-8 flex flex-col gap-3">
                        <Link href="/soc-2-audit-delay-cost" className="text-xs font-bold text-brand-400 hover:text-brand-300 underline underline-offset-4">
                          Read: The real cost of audit delays →
                        </Link>
                        <Link href="/pricing" className="text-xs font-bold text-brand-400 hover:text-brand-300 underline underline-offset-4">
                          Explore: Vendor pricing intelligence hub →
                        </Link>
                      </div>
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                <div className="space-y-8">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="bg-white p-6 rounded-xl border border-slate-200">
                      <h4 className="text-base font-bold text-slate-900 mb-2">{faq.question}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-20">
                <ContextualSignals />
                <RelatedGuidesRow
                  topics={['soc2-cost', 'soc2-readiness', 'soc2-timeline', 'pentest']}
                />
              </div>
            </div>
          </section>

          <AboutSection />
          <AssessmentCTA />
          <StickyCTA />
        </main>
        <Footer />
      </>
  );
}
