import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pentestPages } from '@/lib/pentestPages';
import DefinitionCallout from '@/components/DefinitionCallout';
import CommonForIndustries from '@/components/CommonForIndustries';
import { HowItWorksButton } from '@/components/HowItWorksButton';

const faqs = [
  {
    question: 'Do you guarantee findings?',
    answer: 'No. Responsible pentesting avoids guarantees. We focus on realistic scope, timelines, and transparency so evidence is useful for SOC 2 and customer reviews.',
  },
  {
    question: 'How does pentesting fit with SOC 2?',
    answer: 'It supports security and availability controls. Plan tests so reports and retests land inside your observation window and align to customer security reviews.',
  },
  {
    question: 'Do you run tests directly?',
    answer: 'We scope and coordinate with partners. The focus is on getting the right evidence for trust and compliance, not claiming to be a pentest firm.',
  },
  {
    question: 'What makes a good pentest report?',
    answer: 'Clear scope, methodology, findings with impact, remediation guidance, and retest outcomes. It should stand up to auditors and enterprise buyers.',
  },
  {
    question: 'How do we budget?',
    answer: 'Use the cost estimator to set ranges based on scope, auth, environments, retests, and timelines. Adjust as scope firms up.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://risclens.com/' },
    { '@type': 'ListItem', position: 2, name: 'Penetration Testing', item: 'https://risclens.com/penetration-testing' },
  ],
};

export const metadata: Metadata = {
  title: 'Penetration Testing for Trust & Compliance | RiscLens',
  description:
    'Scope-first pentest planning with deterministic pricing. Align tests to SOC 2 and enterprise security reviews without overpromising outcomes.',
  alternates: { canonical: '/penetration-testing' },
  openGraph: {
    title: 'Penetration Testing for Trust & Compliance | RiscLens',
    description:
      'Scope-first pentest planning with deterministic pricing. Align tests to SOC 2 and enterprise security reviews without overpromising outcomes.',
    url: 'https://risclens.com/penetration-testing',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens pentest' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Penetration Testing for Trust & Compliance | RiscLens',
    description:
      'Scope-first pentest planning with deterministic pricing. Align tests to SOC 2 and enterprise security reviews without overpromising outcomes.',
    images: ['/og.png'],
  },
};

export default function PentestHubPage() {
  const featurePages = [
    ...pentestPages,
    {
      slug: 'cost-estimator',
      title: 'Pentest Cost Estimator',
      description: 'Deterministic pricing based on scope, auth, environments, retests, and timelines.',
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="pentest-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="pentest-breadcrumbs" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">Penetration Testing</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">Pentesting for trust-driven teams</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Plan pentests that support SOC 2, enterprise deals, and customer security reviews. No guarantees—just clear scope, deterministic pricing, and evidence that stands up to scrutiny.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/penetration-testing/cost-estimator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg transition"
            >
              Run Pentest Cost Estimator
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <HowItWorksButton />
          </div>
          <div className="max-w-3xl mx-auto mt-6">
            <DefinitionCallout
              title="What is penetration testing?"
              description="Penetration testing is a time-boxed security assessment where a qualified tester simulates real attacks to identify and validate exploitable weaknesses in an application, API, network, or cloud environment. It helps teams prioritize fixes based on real-world impact, not just theoretical findings."
              linkKey="penetrationTestingOverview"
            />
          </div>
          <div className="max-w-4xl mx-auto mt-6">
            <CommonForIndustries
              items={[
                { label: 'SaaS', href: '/penetration-testing/saas' },
                { label: 'Fintech', href: '/penetration-testing/fintech' },
                { label: 'Healthcare', href: '/penetration-testing#healthcare' },
                { label: 'Marketplaces', href: '/penetration-testing#marketplaces' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            {featurePages.map((page) => (
              <Link
                key={page.slug}
                href={`/penetration-testing/${page.slug}`}
                className="block border border-slate-200 rounded-xl p-5 bg-slate-50 hover:border-brand-200 transition"
              >
                <p className="text-sm font-semibold text-slate-800">{page.title}</p>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed">{page.description}</p>
              </Link>
            ))}
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-3" id="how-it-works">
            <h2 className="text-lg font-semibold text-slate-900">How it works</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
              <li>Define scope: apps, APIs, auth, environments, and retests so expectations are clear.</li>
              <li>Estimate cost and timeline using the estimator, then align testing windows to SOC 2 and deals.</li>
              <li>Schedule the test, track remediation, and retest to produce evidence buyers and auditors accept.</li>
            </ol>
            <p className="text-xs text-slate-500">For planning guidance only—confirm scope and methods with your testing partner.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">FAQ</h2>
            {faqs.map((faq) => (
              <div key={faq.question}>
                <p className="font-semibold text-slate-900">{faq.question}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col gap-3">
            <p className="text-sm font-semibold text-slate-800">Bridge to SOC 2</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Pair pentests with SOC 2 readiness so reports and remediation land inside your observation window. See how pentesting supports security, availability, and change management controls.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/penetration-testing/for-soc-2" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">Pentesting for SOC 2</Link>
              <Link href="/soc-2-cost" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Cost</Link>
              <Link href="/soc-2-timeline" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Timeline</Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Related high-intent pentest guides</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/penetration-testing/sow" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                Pentest SOW Template
              </Link>
              <Link href="/penetration-testing/retesting-remediation" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                Retesting &amp; Remediation
              </Link>
              <Link href="/penetration-testing/compliance-buyers" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                For Compliance Buyers
              </Link>
            </div>
          </div>

            <div className="grid gap-4 md:grid-cols-2" id="saas">
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
                <p className="text-sm font-semibold text-slate-900">SaaS pentests</p>
                <p className="text-sm text-slate-700">Scope often centers on multi-tenant auth, RBAC, and data isolation. Pricing flexes with app+API count and retest needs.</p>
                <Link href="/penetration-testing/saas" className="text-sm text-brand-700 underline underline-offset-4">View SaaS Pentest Guide</Link>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2" id="fintech">
                <p className="text-sm font-semibold text-slate-900">Fintech pentests</p>
                <p className="text-sm text-slate-700">Includes payment flows, auth strength, and segregation of duties. Extra review for API scopes and audit trails.</p>
                <Link href="/penetration-testing/fintech" className="text-sm text-brand-700 underline underline-offset-4">View Fintech Pentest Guide</Link>
              </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2" id="healthcare">
              <p className="text-sm font-semibold text-slate-900">Healthcare pentests</p>
              <p className="text-sm text-slate-700">PHI handling and ePHI integrations push for deeper auth and audit logging checks; cadence aligns with compliance cycles.</p>
              <Link href="/penetration-testing/cost-estimator" className="text-sm text-brand-700 underline underline-offset-4">Estimate cost</Link>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2" id="marketplaces">
              <p className="text-sm font-semibold text-slate-900">Marketplace pentests</p>
              <p className="text-sm text-slate-700">Buyer/seller flows and payment handling drive scope; expect app+API coverage with session and fraud-abuse focus.</p>
              <Link href="/penetration-testing/pricing" className="text-sm text-brand-700 underline underline-offset-4">See pricing approach</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
