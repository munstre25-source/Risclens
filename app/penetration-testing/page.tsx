import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DefinitionCallout from '@/components/DefinitionCallout';
import CommonForIndustries from '@/components/CommonForIndustries';
import { HowItWorksButton } from '@/components/HowItWorksButton';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { StickyCTA } from '@/components/StickyCTA';
import { messaging } from '@/src/content/messaging';

const lastUpdated = '2026-01-05';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a penetration test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A time-boxed security assessment where a qualified tester simulates real-world attacks to identify and validate exploitable weaknesses in an application, API, or network.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often is a pentest required for SOC 2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most auditors and enterprise buyers expect an annual penetration test, specifically for production applications and infrastructure in scope for SOC 2.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you run tests directly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We help you scope, estimate costs, and prepare evidence for your audit. We partner with qualified testers to ensure reports meet SOC 2 and customer requirements.',
      },
    },
  ],
};

const clusterLinks = [
  { href: '/penetration-testing/cost-estimator', title: 'Pentest Cost Estimator', summary: 'Get estimated market pricing ranges based on your app, API, and environment scope.', type: 'tool' },
  { href: '/penetration-testing/scoping', title: 'Pentest Scoping Worksheet', summary: 'New: Define your targets and complexity to get accurate quotes and auditor-ready scope.', type: 'tool' },
  { href: '/penetration-testing/sow', title: 'Pentest SOW Template', summary: 'Standardized Statement of Work to ensure your test covers the right controls.', type: 'tool' },
  { href: '/penetration-testing/retesting-remediation', title: 'Retesting Guidance', summary: 'How to handle findings and prove remediation to your auditor.' },
  { href: '/penetration-testing/compliance-buyers', title: 'For Compliance Buyers', summary: 'A guide for GRC and security teams on buying pentests that actually count.' },
];

export const metadata: Metadata = {
  title: 'SOC 2 Pentest Hub | Penetration Testing for Compliance | RiscLens',
  description: 'Scope, estimate, and plan penetration tests that support SOC 2 and enterprise security reviews. Use our cost estimator and scoping tools.',
  alternates: { canonical: 'https://risclens.com/penetration-testing' },
  openGraph: {
    title: 'SOC 2 Pentest Hub | Penetration Testing for Compliance | RiscLens',
    description: 'Scope, estimate, and plan penetration tests that support SOC 2 and enterprise security reviews.',
    url: 'https://risclens.com/penetration-testing',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Pentest Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Pentest Hub | Penetration Testing for Compliance | RiscLens',
    description: 'Scope, estimate, and plan penetration tests that support SOC 2 and enterprise security reviews.',
    images: ['/og.png'],
  },
};

export default function PentestHubPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="pentest-hub-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center space-y-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Penetration Testing</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              {messaging.pentestHub.hero.headline}
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {messaging.pentestHub.hero.subhead}
            </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  href="/penetration-testing/scoping"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-lg shadow-md transition-all text-lg"
                >
                  {messaging.pentestHub.hero.cta}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Link>

              <Link
                href="/penetration-testing/cost-estimator"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-semibold px-8 py-4 rounded-lg shadow-sm transition-all text-lg"
              >
                Estimate Pentest Cost
                <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
              <div className="hidden sm:block">
                <HowItWorksButton />
              </div>
            </div>
          <p className="text-sm text-slate-500">Guidance only; align scope with your auditor. Last updated: {lastUpdated}.</p>
          <div className="max-w-3xl mx-auto">
            <DefinitionCallout
              title="What is a penetration test?"
              description="A penetration test is a time-boxed security assessment where a qualified tester simulates real-world attacks to identify exploitable weaknesses. For SOC 2, it provides evidence of effective technical controls and vulnerability management within your production environment."
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
            {clusterLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block border rounded-xl p-5 transition group ${
                  item.type === 'tool' 
                    ? 'bg-white border-brand-100 hover:border-brand-300 shadow-sm' 
                    : 'bg-slate-50 border-slate-200 hover:border-brand-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  {item.type === 'tool' && (
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Interactive Tool
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{item.summary}</p>
                {item.type === 'tool' && (
                  <div className="mt-3 flex items-center text-xs font-medium text-brand-600 group-hover:gap-1 transition-all">
                    Launch tool
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Why this matters for SOC 2</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Penetration testing is often a required activity for the Security, Availability, and Confidentiality trust service criteria. It proves your vulnerability management process isn't just theoretical.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-brand-600">•</span>
                <span>Auditors look for clear scope that matches your system description.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">•</span>
                <span>Enterprise buyers use the pentest executive summary as a key trust signal.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">•</span>
                <span>Retesting is critical to show that findings were actually remediated.</span>
              </li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3" id="how-it-works">
            <h3 className="text-lg font-semibold text-slate-900">How it works</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
              <li>Use the Scoping Worksheet to define your technical targets and auth complexity.</li>
              <li>Run the Cost Estimator to set budget expectations and timeline windows.</li>
              <li>Align the test with your SOC 2 observation window and share the SOW with your auditor.</li>
            </ol>
            <p className="text-xs text-slate-500">Use as guidance—align technical scope with your security lead and auditor.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Related high-intent pentest guides</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/penetration-testing/sow" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                Pentest SOW Template
              </Link>
              <Link href="/penetration-testing/retesting-remediation" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                Retesting & Remediation
              </Link>
              <Link href="/penetration-testing/compliance-buyers" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                For Compliance Buyers
              </Link>
            </div>
          </div>

            <div className="grid gap-4 md:grid-cols-2" id="saas">
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
                <p className="text-sm font-semibold text-slate-900">SaaS pentests</p>
                <p className="text-sm text-slate-700">Focus on multi-tenant data isolation, API auth, and session management. Usually requires annual testing.</p>
                  <Link href="/penetration-testing/saas" className="text-sm text-brand-700 underline underline-offset-4">Review SaaS Scoping</Link>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2" id="fintech">
                <p className="text-sm font-semibold text-slate-900">Fintech pentests</p>
                <p className="text-sm text-slate-700">High scrutiny on payment flows, encryption, and segregation of duties. Often includes API and network layers.</p>
                  <Link href="/penetration-testing/fintech" className="text-sm text-brand-700 underline underline-offset-4">Review Fintech Scoping</Link>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2" id="healthcare">
                <p className="text-sm font-semibold text-slate-900">Healthcare pentests</p>
                <p className="text-sm text-slate-700">Deep review of ePHI access controls and breach notification triggers. Cadence often tied to HIPAA/SOC 2 cycles.</p>
                <Link href="/penetration-testing/cost-estimator" className="text-sm text-brand-700 underline underline-offset-4">Estimate cost</Link>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2" id="marketplaces">
                <p className="text-sm font-semibold text-slate-900">Marketplace pentests</p>
                <p className="text-sm text-slate-700">Fraud-abuse focus and buyer/seller data separation. Scope typically covers full web+API stacks.</p>
                <Link href="/penetration-testing/cost-estimator" className="text-sm text-brand-700 underline underline-offset-4">Run estimator</Link>
              </div>
            </div>

              <div className="pt-8 border-t border-slate-200">
                <RelatedGuidesRow
                  links={[
                    { href: '/penetration-testing/scoping', label: 'Scoping Worksheet' },
                    { href: '/penetration-testing/cost-estimator', label: 'Cost Estimator' },
                    { href: '/penetration-testing/sow', label: 'SOW Template' },
                    { href: '/vendor-risk-assessment', label: 'Vendor Risk Hub' },
                    { href: '/soc-2-readiness-calculator', label: 'Readiness Score' },
                    { href: '/soc-2-cost-calculator', label: 'SOC 2 Cost' },
                  ]}
                />
              </div>
          </div>
        </section>
        <Footer />
        <StickyCTA
          label="Run Pentest Cost Estimator"
          description="Get your pentest cost estimate in minutes."
          subDescription="Free · No signup · Instant results"
          href="/penetration-testing/cost-estimator"
        />
      </main>
  );
}
