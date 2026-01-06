import { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VendorRiskTriageForm } from '@/components/vendor-risk/VendorRiskTriageForm';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { HowItWorksAccordion } from '@/components/HowItWorksAccordion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const lastUpdated = '2026-03-20';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is the vendor risk score calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We assign points to data sensitivity, access, criticality, integration, data volume, subprocessors, and incident history. The sum maps to Low, Medium, or High tiers with evidence and cadence guidance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this triage replace legal review?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This is guidance to speed up intake and vendor management but it does not replace counsel, procurement, or internal risk sign-off.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will the tool store my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Results show instantly in-browser. If you request the VRA package, we store the inputs and outputs with your email to send follow-up materials.',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Vendor Risk Assessment Triage Tool | RiscLens',
  description:
    'Score vendor risk, get evidence requirements, and set monitoring cadence in minutes. Built for SOC 2 vendor management teams.',
  alternates: { canonical: '/vendor-risk-assessment/triage' },
  openGraph: {
    title: 'Vendor Risk Assessment Triage Tool | RiscLens',
    description:
      'Score vendor risk, get evidence requirements, and set monitoring cadence in minutes. Built for SOC 2 vendor management teams.',
    url: 'https://risclens.com/vendor-risk-assessment/triage',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Vendor Risk Assessment' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendor Risk Assessment Triage Tool | RiscLens',
    description:
      'Score vendor risk, get evidence requirements, and set monitoring cadence in minutes. Built for SOC 2 vendor management teams.',
    images: ['/og.png'],
  },
};

export default function VendorRiskAssessmentTriagePage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="vra-triage-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Vendor Risk', href: '/vendor-risk-assessment' },
              { label: 'Triage' }
            ]} 
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-14 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Vendor Risk Assessment</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Vendor Risk Triage</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Capture seven signals—data sensitivity, access, criticality, integrations, volume, subprocessors, and incident history—to set a risk tier with evidence and monitoring guidance.
          </p>
          <p className="text-sm text-slate-500">Guidance only. Results appear instantly; optional email capture is for follow-up. Last updated: {lastUpdated}.</p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="border border-slate-200 rounded-xl p-6 bg-white">
            <VendorRiskTriageForm />
          </div>
          <HowItWorksAccordion />
          <RelatedGuidesRow
            links={[
              { href: '/vendor-risk-assessment/checklist', label: 'VRA Checklist' },
              { href: '/vendor-risk-assessment/evidence-by-tier', label: 'Evidence by tier' },
              { href: '/vendor-risk-assessment/contract-clauses', label: 'Contract clauses' },
            ]}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
