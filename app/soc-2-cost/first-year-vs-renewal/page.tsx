import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { StickyCTA } from '@/components/StickyCTA';
import { Rocket, RotateCw } from 'lucide-react';

const faqs = [
  {
    question: 'Why is the first year of SOC 2 more expensive?',
    answer: 'First-year costs include initial policy creation, control implementation, gap remediation, tooling setup, and the auditor learning your environment. None of this carries over to year two.',
  },
  {
    question: 'What typically decreases in renewal years?',
    answer: 'Auditor fees often drop 20-40% as they reuse prior walkthroughs. Internal effort decreases as evidence collection becomes routine. Tooling costs stabilize or reduce with annual contracts.',
  },
  {
    question: 'Are there any costs that increase in renewal years?',
    answer: 'Scope expansion (new systems, criteria, or frameworks) can increase costs. Major infrastructure changes may require additional auditor time. Some compliance tools increase pricing annually.',
  },
  {
    question: 'How much should I budget for SOC 2 renewal?',
    answer: 'Most organizations budget 50-70% of first-year costs for renewals. This assumes stable scope and no major control changes. Factor in any planned system additions.',
  },
  {
    question: 'Can I switch auditors to reduce renewal costs?',
    answer: 'Switching auditors resets some first-year dynamics—new auditor learning curve, fresh walkthroughs. The savings from lower fees may be offset by increased preparation time.',
  },
  {
    question: 'What is the biggest mistake companies make in renewal years?',
    answer: 'Assuming evidence collection stays automated without maintenance. Log retention, access review schedules, and policy updates often drift. Auditors catch these gaps quickly.',
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
  title: 'SOC 2 Cost: First Year vs Renewal (2026 Guide) | RiscLens',
  description: 'Compare first-year SOC 2 costs vs renewal costs. See where budget decreases in year two and how to plan for ongoing compliance spending.',
  alternates: {
    canonical: '/soc-2-cost/first-year-vs-renewal',
  },
  openGraph: {
    type: 'article',
    url: 'https://risclens.com/soc-2-cost/first-year-vs-renewal',
    title: 'SOC 2 Cost: First Year vs Renewal (2026 Guide) | RiscLens',
    description: 'Compare first-year SOC 2 costs vs renewal costs. See where budget decreases in year two and plan ongoing compliance spending.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost First Year vs Renewal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost: First Year vs Renewal (2026 Guide) | RiscLens',
    description: 'Compare first-year SOC 2 costs vs renewal costs. Budget planning guidance for ongoing compliance.',
    images: ['/og.png'],
  },
};

export default function FirstYearVsRenewalPage() {
  return (
    <>
      <Script
        id="first-year-renewal-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'SOC 2 Cost', href: '/soc-2-cost' }, { label: 'First Year vs Renewal' }]} />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">SOC 2 Cost Comparison</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              SOC 2 Cost: First Year vs Renewal
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              First-year SOC 2 costs are significantly higher than renewals. Understand where the budget goes—and how to plan for sustainable compliance spending.
            </p>
            <Link
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Calculate Your Cost
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="mt-4 text-sm text-slate-500">Free • No credit card • Instant estimate</p>
          </div>
        </section>

        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-amber-600" />
                    <h2 className="text-xl font-bold text-slate-900">First Year Costs</h2>
                  </div>

                <p className="text-slate-700 text-sm leading-relaxed">
                  The first year includes one-time setup costs that don&apos;t repeat.
                </p>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-amber-100">
                    <p className="font-semibold text-slate-900">Auditor Fees</p>
                    <p className="text-2xl font-bold text-amber-700">$15,000 – $50,000</p>
                    <p className="text-xs text-slate-500 mt-1">Higher due to initial walkthroughs & control documentation</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-100">
                    <p className="font-semibold text-slate-900">GRC Platform Setup</p>
                    <p className="text-2xl font-bold text-amber-700">$12,000 – $36,000</p>
                    <p className="text-xs text-slate-500 mt-1">Annual subscription + implementation time</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-100">
                    <p className="font-semibold text-slate-900">Internal Effort</p>
                    <p className="text-2xl font-bold text-amber-700">$20,000 – $60,000</p>
                    <p className="text-xs text-slate-500 mt-1">Policy creation, gap remediation, evidence setup</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-100">
                    <p className="font-semibold text-slate-900">Consultant/Advisory</p>
                    <p className="text-2xl font-bold text-amber-700">$5,000 – $25,000</p>
                    <p className="text-xs text-slate-500 mt-1">Optional readiness assessment & guidance</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-amber-200">
                  <p className="text-sm text-slate-600">First Year Total Range</p>
                  <p className="text-3xl font-extrabold text-amber-800">$52,000 – $171,000</p>
                </div>
              </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <RotateCw className="w-6 h-6 text-green-600" />
                    <h2 className="text-xl font-bold text-slate-900">Renewal Year Costs</h2>
                  </div>

                <p className="text-slate-700 text-sm leading-relaxed">
                  Renewal years benefit from existing controls, policies, and auditor familiarity.
                </p>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <p className="font-semibold text-slate-900">Auditor Fees</p>
                    <p className="text-2xl font-bold text-green-700">$10,000 – $35,000</p>
                    <p className="text-xs text-slate-500 mt-1">20-40% lower with same auditor</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <p className="font-semibold text-slate-900">GRC Platform</p>
                    <p className="text-2xl font-bold text-green-700">$10,000 – $30,000</p>
                    <p className="text-xs text-slate-500 mt-1">Renewal pricing, no setup fees</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <p className="font-semibold text-slate-900">Internal Effort</p>
                    <p className="text-2xl font-bold text-green-700">$8,000 – $25,000</p>
                    <p className="text-xs text-slate-500 mt-1">Maintenance mode, not creation mode</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <p className="font-semibold text-slate-900">Consultant/Advisory</p>
                    <p className="text-2xl font-bold text-green-700">$0 – $5,000</p>
                    <p className="text-xs text-slate-500 mt-1">Usually not needed unless scope changes</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-green-200">
                  <p className="text-sm text-slate-600">Renewal Year Total Range</p>
                  <p className="text-3xl font-extrabold text-green-800">$28,000 – $95,000</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Key Takeaway: Budget 50-60% for Renewals</h3>
              <p className="text-slate-700 leading-relaxed">
                Most organizations see renewal costs at <strong>50-60% of first-year spending</strong>. The biggest drops come from eliminated setup work and auditor efficiency. Plan for this reduction, but don&apos;t assume automation runs itself—budget for ongoing maintenance.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">What Changes Between Year 1 and Year 2+</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-900">Cost Category</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-900">Year 1</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-900">Year 2+</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-900">Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-white">
                      <td className="px-4 py-3 text-slate-900">Policy & procedure creation</td>
                      <td className="px-4 py-3 text-slate-600">Full effort</td>
                      <td className="px-4 py-3 text-slate-600">Updates only</td>
                      <td className="px-4 py-3 text-green-600 font-medium">↓ 70-80%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 text-slate-900">Control implementation</td>
                      <td className="px-4 py-3 text-slate-600">Build from scratch</td>
                      <td className="px-4 py-3 text-slate-600">Already operating</td>
                      <td className="px-4 py-3 text-green-600 font-medium">↓ 90%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 text-slate-900">Evidence automation setup</td>
                      <td className="px-4 py-3 text-slate-600">Configure integrations</td>
                      <td className="px-4 py-3 text-slate-600">Maintain existing</td>
                      <td className="px-4 py-3 text-green-600 font-medium">↓ 80%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 text-slate-900">Auditor walkthroughs</td>
                      <td className="px-4 py-3 text-slate-600">Full documentation</td>
                      <td className="px-4 py-3 text-slate-600">Delta review</td>
                      <td className="px-4 py-3 text-green-600 font-medium">↓ 30-50%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 text-slate-900">Evidence collection</td>
                      <td className="px-4 py-3 text-slate-600">Manual + automation</td>
                      <td className="px-4 py-3 text-slate-600">Mostly automated</td>
                      <td className="px-4 py-3 text-green-600 font-medium">↓ 50-60%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 text-slate-900">Platform subscription</td>
                      <td className="px-4 py-3 text-slate-600">Year 1 pricing</td>
                      <td className="px-4 py-3 text-slate-600">Renewal pricing</td>
                      <td className="px-4 py-3 text-amber-600 font-medium">↓ 0-20%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">When Renewal Costs Increase</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-900 mb-2">Scope Expansion</p>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Adding new Trust Service Criteria</li>
                    <li>• New products or systems in scope</li>
                    <li>• Adding ISO 27001 or HIPAA</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-900 mb-2">Infrastructure Changes</p>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Cloud provider migration</li>
                    <li>• Major architecture overhaul</li>
                    <li>• Acquisitions or mergers</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-900 mb-2">Auditor Changes</p>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Switching CPA firms</li>
                    <li>• New auditor learning curve</li>
                    <li>• Fresh documentation requests</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-900 mb-2">Control Drift</p>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Evidence gaps from neglected automation</li>
                    <li>• Policy updates not completed</li>
                    <li>• Access reviews not conducted</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">SOC 2 First Year vs Renewal FAQs</h3>
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
              <h3 className="text-xl font-bold text-slate-900">Get Your Personalized SOC 2 Cost Estimate</h3>
              <p className="text-slate-600 max-w-xl mx-auto">
                Whether it&apos;s your first year or renewal, get a budget range tailored to your team size, scope, and timeline.
              </p>
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Calculate Your Cost →
              </Link>
            </div>

            <RelatedGuidesRow
              links={[
                { href: '/soc-2-cost', label: 'SOC 2 Cost Overview' },
                { href: '/soc-2-cost/by-team-size', label: 'Cost by Team Size' },
                { href: '/soc-2-cost/type-1-vs-type-2-cost', label: 'Type I vs Type II Cost' },
                { href: '/soc-2-type-i-vs-type-ii', label: 'Type I vs Type II Guide' },
                { href: '/compliance-roi-calculator', label: 'ROI Calculator' },
              ]}
            />
          </div>
        </section>

        <StickyCTA />
      </main>
      <Footer />
    </>
  );
}
