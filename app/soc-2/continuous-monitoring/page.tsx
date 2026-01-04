import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SOC 2 Continuous Monitoring After Type II | RiscLens',
  description:
    'Keep SOC 2 controls and evidence fresh after your Type II: monitoring cadence, ownership, and quick wins to avoid gaps in the next audit.',
  alternates: { canonical: '/soc-2/continuous-monitoring' },
};

const practices = [
  { title: 'Access & identity', items: ['Monthly access reviews on critical systems with approvals.', 'Strict offboarding SLA; monitor stale accounts and MFA coverage.', 'Role hygiene: remove direct permissions, use groups/roles.'] },
  { title: 'Change management', items: ['Keep approvals + testing evidence on every prod change.', 'Flag emergency changes; require post-review.', 'Review deployment pipeline logs for failed or skipped steps.'] },
  { title: 'Logging & alerting', items: ['Validate alert thresholds quarterly; avoid alert fatigue.', 'Track MTTR for critical alerts; keep on-call runbooks current.', 'Retain tamper-resistant logs per policy.'] },
  { title: 'Incident response', items: ['Tabletop twice a year; refresh contact lists and escalation.', 'Document post-incident actions and ensure follow-through.', 'Log notifications to customers/partners when required.'] },
  { title: 'Vendor risk', items: ['Re-tier vendors annually; update evidence for critical vendors.', 'Monitor new subprocessors and contract clauses.', 'Track remediation for vendor exceptions.'] },
  { title: 'Business continuity', items: ['Test backups/restores at least annually; log RPO/RTO results.', 'Rehearse failover for critical services if feasible.', 'Update dependency map when architecture changes.'] },
];

export default function ContinuousMonitoringPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">SOC 2 Guides</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">SOC 2 Continuous Monitoring (Post Type II)</h1>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              How to keep controls and evidence current between audits—without adding bloat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get your readiness score
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/soc-2-readiness-checklist" className="text-sm text-brand-700 underline underline-offset-4">
                See the readiness checklist →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="grid gap-4 md:grid-cols-2">
              {practices.map((area) => (
                <div key={area.title} className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm space-y-3">
                  <h2 className="text-lg font-semibold text-slate-900">{area.title}</h2>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {area.items.map((item) => (
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
              <h2 className="text-lg font-semibold text-slate-900">Cadence and ownership</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Monthly: access/offboarding, alert quality check, critical vendor changes.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Quarterly: control owner review of evidence freshness; patch/backup tests.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Biannual: incident tabletop; policy refresh; audit readiness spot-check.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Annual: BCP/DR test; vendor re-tiering; full evidence vault sweep.</span></li>
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Quick wins</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Automate access anomaly alerts (dormant accounts, no MFA, privilege drift).</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Tag evidence with owner + refresh date; remind before it ages out.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Track exceptions centrally with due dates and retest proof.</span></li>
                </ul>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Risks if you pause</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Evidence goes stale; next audit stretches or fails samples.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Access and vendor sprawl create new control gaps.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Incident playbooks decay; response time increases.</span></li>
                </ul>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-slate-700 leading-relaxed">
                Keep your Type II steady: refresh evidence on a cadence, track exceptions, and rehearse the controls that matter most.
              </p>
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get your readiness score
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
