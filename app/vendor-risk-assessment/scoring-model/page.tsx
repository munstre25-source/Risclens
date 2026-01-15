import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VendorRiskRelatedLinks } from '@/components/vendor-risk/VendorRiskRelatedLinks';
import VendorRiskLeadMagnet from '@/components/vendor-risk/VendorRiskLeadMagnet';

export const metadata: Metadata = {
  title: 'Vendor Risk Assessment Scoring Model | RiscLens',
  description: 'Deterministic vendor risk scoring that maps inputs to Low, Medium, or High tiers with clear evidence asks.',
  alternates: { canonical: 'https://risclens.com/vendor-risk-assessment/scoring-model' },
  openGraph: {
    title: 'Vendor Risk Assessment Scoring Model | RiscLens',
    description: 'Deterministic vendor risk scoring that maps inputs to Low, Medium, or High tiers with clear evidence asks.',
    url: 'https://risclens.com/vendor-risk-assessment/scoring-model',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Vendor Risk Scoring' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendor Risk Assessment Scoring Model | RiscLens',
    description: 'Deterministic vendor risk scoring that maps inputs to Low, Medium, or High tiers with clear evidence asks.',
    images: ['/og.png'],
  },
};

const weights = [
  { label: 'Data sensitivity', details: ['None/Public: 0', 'Internal: 10', 'PII: 25', 'Financial: 35', 'PHI/regulated: 45'] },
  { label: 'Access level', details: ['No access: 0', 'Limited user: 10', 'API scoped: 20', 'Admin: 35', 'Network/production: 45'] },
  { label: 'Vendor criticality', details: ['Nice-to-have: 5', 'Important: 15', 'Business-critical: 25'] },
  { label: 'Integration type', details: ['Standalone: 0', 'SSO only: 5', 'One-way sync: 10', 'Bi-directional: 20'] },
  { label: 'Data volume', details: ['Low: 0', 'Medium: 10', 'High: 20'] },
  { label: 'Subprocessors', details: ['No: 0', 'Yes: 10'] },
  { label: 'Incident history', details: ['None/not disclosed: 10', 'Minor resolved: 15', 'Significant (24 months): 25'] },
];

const tiers = [
  { name: 'Low (0–34)', notes: 'Light questionnaire and attestations; annual review cadence.' },
  { name: 'Medium (35–64)', notes: 'SOC/ISO reports, incident summary, and quarterly attestations.' },
  { name: 'High (65–100)', notes: 'SOC 2 Type II + pentest summary; semiannual review or continuous monitoring.' },
];

export default function VendorRiskScoringModelPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-18 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Vendor Risk Assessment</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Scoring Model</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transparent scoring keeps vendor reviews consistent and audit-ready. Inputs map directly to points, then into Low, Medium, or High tiers.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Weights by input</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {weights.map((item) => (
                <div key={item.label} className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-2">
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span className="text-brand-600">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Tier mapping</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {tiers.map((tier) => (
                <li key={tier.name} className="flex gap-3">
                  <span className="text-brand-600">•</span>
                  <span><strong>{tier.name}</strong> — {tier.notes}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-600">
              Scores clamp at 100 to avoid runaway math. The “why” explanation highlights the biggest risk drivers so reviewers can sanity check the tier.
            </p>
          </div>

            <VendorRiskLeadMagnet
              title="VRA Scoring Spreadsheet (Excel)"
              description="Download our pre-weighted scoring model to automate your vendor triage. Includes logic for data sensitivity, access levels, and criticality."
              buttonText="Download Scoring Model"
              templateId="vra_scoring_spreadsheet"
              resourceName="Vendor_Risk_Scoring_Model"
            />

            <VendorRiskRelatedLinks />

        </div>
      </section>
      <Footer />
    </main>
  );
}
