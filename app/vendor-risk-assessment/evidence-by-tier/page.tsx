import { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VendorRiskRelatedLinks } from '@/components/vendor-risk/VendorRiskRelatedLinks';
import VendorRiskLeadMagnet from '@/components/vendor-risk/VendorRiskLeadMagnet';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What evidence should low-risk vendors provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A light security questionnaire, policy attestations, and a DPA if PII is processed. Annual attestations are typically enough.',
      },
    },
    {
      '@type': 'Question',
      name: 'What about high-risk vendors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Expect SOC 2 Type II, recent pentest summary, detailed IR/BCP evidence, architecture diagrams, and stronger contract clauses. Monitoring should be semiannual or continuous.',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Vendor Risk Assessment Evidence by Tier | RiscLens',
  description: 'Evidence requests for Low, Medium, and High vendor risk tiers so SOC 2 vendor management stays consistent.',
  alternates: { canonical: '/vendor-risk-assessment/evidence-by-tier' },
  openGraph: {
    title: 'Vendor Risk Assessment Evidence by Tier | RiscLens',
    description: 'Evidence requests for Low, Medium, and High vendor risk tiers so SOC 2 vendor management stays consistent.',
    url: 'https://risclens.com/vendor-risk-assessment/evidence-by-tier',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Vendor Evidence by Tier' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendor Risk Assessment Evidence by Tier | RiscLens',
    description: 'Evidence requests for Low, Medium, and High vendor risk tiers so SOC 2 vendor management stays consistent.',
    images: ['/og.png'],
  },
};

const evidence = [
  {
    tier: 'Low risk',
    summary: 'Light coverage for vendors with low sensitivity, low access, or low criticality.',
    items: [
      'Security questionnaire (lite) mapped to your controls',
      'DPA if any PII is processed',
      'Policy attestations for access control and incident response',
      'Annual attestation on changes and incidents',
    ],
  },
  {
    tier: 'Medium risk',
    summary: 'Vendors touching customer data or with meaningful access.',
    items: [
      'SOC 2 Type II or ISO 27001 (or roadmap + compensating controls)',
      'Incident response summary and notification SLAs',
      'Access control overview with MFA/SSO enabled',
      'Vendor/subprocessor list with regions',
      'BCP/DR summary and test cadence',
      'Quarterly attestations for changes or incidents',
    ],
  },
  {
    tier: 'High risk',
    summary: 'Vendors with privileged access, regulated data, or bi-directional integrations.',
    items: [
      'SOC 2 Type II (preferred) with bridge letter if timing requires',
      'Recent pentest summary or third-party assessment with remediation status',
      'Detailed IR playbooks and BCP/DR evidence',
      'Data flow diagrams and architecture overview',
      'Security addendum with clear liability and notification terms',
      'Semiannual reassessment or continuous monitoring subscription',
    ],
  },
];

export default function EvidenceByTierPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="vra-evidence-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-18 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Vendor Risk Assessment</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Evidence by Tier</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ask for the right evidence based on the vendor’s tier—nothing more, nothing less. Keep requests predictable for auditors and vendors.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            {evidence.map((tier) => (
              <div key={tier.tier} className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
                <p className="text-sm font-semibold text-slate-900">{tier.tier}</p>
                <p className="text-sm text-slate-700">{tier.summary}</p>
                <ul className="space-y-2 text-sm text-slate-700 mt-2">
                  {tier.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-brand-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Practical tips</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Accept equivalent evidence (e.g., ISO + SOC bridge letter) when appropriate.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Timebox follow-ups and capture exceptions with remediation targets.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Store evidence and notes in one location for audits and security questionnaires.</span></li>
            </ul>
          </div>

            <VendorRiskLeadMagnet
              title="Evidence Request Templates (DOCX)"
              description="Download our pre-written evidence request templates for Low, Medium, and High risk vendors. Save dozens of hours on vendor follow-ups."
              buttonText="Download Evidence Templates"
              templateId="vra_evidence_templates"
              resourceName="Vendor_Evidence_Request_Templates"
            />

            <VendorRiskRelatedLinks />

        </div>
      </section>
      <Footer />
    </main>
  );
}
