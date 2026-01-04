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
      name: 'What should a vendor risk intake form capture?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Data sensitivity, access type, criticality, integrations, data volumes, subprocessors, and incident history. Those inputs drive tiering and evidence asks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do all vendors need the same evidence?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Evidence should scale with risk. Low-risk vendors can often provide a light questionnaire and attestations; high-risk vendors should provide SOC reports, pentest summaries, and stronger contract terms.',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Vendor Risk Assessment Checklist | RiscLens',
  description: 'Intake and diligence checklist for SOC 2 vendor management—tiering, evidence requests, and contract checkpoints.',
  alternates: { canonical: '/vendor-risk-assessment/checklist' },
  openGraph: {
    title: 'Vendor Risk Assessment Checklist | RiscLens',
    description: 'Intake and diligence checklist for SOC 2 vendor management—tiering, evidence requests, and contract checkpoints.',
    url: 'https://risclens.com/vendor-risk-assessment/checklist',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Vendor Risk Checklist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendor Risk Assessment Checklist | RiscLens',
    description: 'Intake and diligence checklist for SOC 2 vendor management—tiering, evidence requests, and contract checkpoints.',
    images: ['/og.png'],
  },
};

export default function VendorRiskChecklistPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="vra-checklist-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-18 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Vendor Risk Assessment</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Vendor Risk Checklist</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A lean intake and diligence checklist so vendor management stays consistent across security, procurement, and legal.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Intake (before scoring)</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Describe data processed (PII/PHI/payment/internal).</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Document access paths (user, admin, API, network).</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Classify vendor criticality and business owner.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Integration type and data flow diagram (one-way vs bi-directional).</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Estimated data volume and regions.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Subprocessor list, if any.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Disclosed incidents or breaches in the last 24 months.</span></li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Due diligence (after tiering)</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Request evidence-by-tier package (SOC reports, pentest, DPAs as needed).</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Validate identity and access model (SSO/MFA, privileged access logging).</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Review incident response process and notification SLAs.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Check data retention/deletion and encryption coverage.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Confirm subprocessors and upstream certifications.</span></li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Contracts and ongoing</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Include tier-aligned security addendum and DPA.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Document reassessment cadence and owners.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Track exceptions with remediation dates.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Store all materials with audit-ready labeling.</span></li>
            </ul>
          </div>

          <VendorRiskRelatedLinks />
        </div>
      </section>
      <Footer />
    </main>
  );
}
