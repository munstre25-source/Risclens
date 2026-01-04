import { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VendorRiskRelatedLinks } from '@/components/vendor-risk/VendorRiskRelatedLinks';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the biggest vendor risk assessment mistake?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Applying the same evidence requirements to every vendor. It slows procurement and frustrates auditors. Tiering keeps effort proportional.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do teams miss incident history?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They skip explicit questions about past incidents or rely only on sales contacts. Ask for disclosures and check public incident records when risk is higher.',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Common Vendor Risk Assessment Mistakes | RiscLens',
  description: 'Avoid the common pitfalls in vendor risk assessments—over-collection, missing subprocessor chains, and weak monitoring.',
  alternates: { canonical: '/vendor-risk-assessment/common-mistakes' },
  openGraph: {
    title: 'Common Vendor Risk Assessment Mistakes | RiscLens',
    description: 'Avoid the common pitfalls in vendor risk assessments—over-collection, missing subprocessor chains, and weak monitoring.',
    url: 'https://risclens.com/vendor-risk-assessment/common-mistakes',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Vendor Risk Mistakes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Common Vendor Risk Assessment Mistakes | RiscLens',
    description: 'Avoid the common pitfalls in vendor risk assessments—over-collection, missing subprocessor chains, and weak monitoring.',
    images: ['/og.png'],
  },
};

const mistakes = [
  'Requesting full SOC 2 + pen tests from every vendor regardless of tier.',
  'Skipping data flow clarity—unclear data types and volumes lead to wrong tiers.',
  'Ignoring incident history or relying only on marketing claims.',
  'No cadence ownership; reassessments slip and evidence goes stale.',
  'Contracts that omit breach notice, subprocessor approval, or access requirements.',
  'Not documenting exceptions or remediation timelines.',
];

export default function VendorRiskCommonMistakesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="vra-common-mistakes-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-18 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Vendor Risk Assessment</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Common Mistakes</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Keep vendor risk assessments lean and defensible by avoiding these common pitfalls.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">What to avoid</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {mistakes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">How to stay on track</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Use the triage tool to set tier and cadence before requesting evidence.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Store one evidence-by-tier list and reuse it for every review.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Note exceptions with owners and due dates so audits stay clean.</span></li>
            </ul>
          </div>

          <VendorRiskRelatedLinks />
        </div>
      </section>
      <Footer />
    </main>
  );
}
