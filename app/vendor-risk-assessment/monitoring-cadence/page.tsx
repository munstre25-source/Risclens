import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VendorRiskRelatedLinks } from '@/components/vendor-risk/VendorRiskRelatedLinks';

export const metadata: Metadata = {
  title: 'Vendor Monitoring Cadence by Risk Tier | RiscLens',
  description: 'Align vendor monitoring cadence with risk tiers—annual attestations, quarterly reviews, or semiannual deep dives.',
  alternates: { canonical: 'https://risclens.com/vendor-risk-assessment/monitoring-cadence' },
  openGraph: {
    title: 'Vendor Monitoring Cadence by Risk Tier | RiscLens',
    description: 'Align vendor monitoring cadence with risk tiers—annual attestations, quarterly reviews, or semiannual deep dives.',
    url: 'https://risclens.com/vendor-risk-assessment/monitoring-cadence',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Vendor Monitoring Cadence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendor Monitoring Cadence by Risk Tier | RiscLens',
    description: 'Align vendor monitoring cadence with risk tiers—annual attestations, quarterly reviews, or semiannual deep dives.',
    images: ['/og.png'],
  },
};

const cadence = [
  {
    tier: 'Low',
    rhythm: 'Annual attestation and light questionnaire refresh.',
    focus: ['Confirm no material changes to data type or access.', 'Reconfirm subprocessors and regions.', 'Capture any incidents and responses.'],
  },
  {
    tier: 'Medium',
    rhythm: 'Annual review plus quarterly attestations.',
    focus: ['SOC/ISO updates or bridge letters.', 'Quarterly change log for access and architecture.', 'Incident reporting and remediation status.'],
  },
  {
    tier: 'High',
    rhythm: 'Initial deep review plus semiannual reassessment; consider continuous monitoring.',
    focus: ['Updated SOC 2 Type II and pentest summaries.', 'Semiannual privileged access review.', 'BCP/DR tests and incident drills.', 'Monitoring for subprocessor changes or ownership changes.'],
  },
];

export default function MonitoringCadencePage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-18 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Vendor Risk Assessment</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Monitoring Cadence</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Set an evidence cadence that matches vendor risk. Keep reassessments predictable for auditors and vendors.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            {cadence.map((item) => (
              <div key={item.tier} className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
                <p className="text-sm font-semibold text-slate-900">{item.tier} risk</p>
                <p className="text-sm text-slate-700">{item.rhythm}</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {item.focus.map((focus) => (
                    <li key={focus} className="flex gap-2">
                      <span className="text-brand-600">•</span>
                      <span>{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Operational tips</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Track cadence ownership (security vs procurement) and keep reminders in one system.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Tag vendors with tier + next review date so auditors can trace the schedule.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Escalate cadence immediately if access or data sensitivity increases.</span></li>
            </ul>
          </div>

          <VendorRiskRelatedLinks />
        </div>
      </section>
      <Footer />
    </main>
  );
}
