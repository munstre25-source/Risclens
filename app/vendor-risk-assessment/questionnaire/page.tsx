import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Vendor Risk Questionnaire Template | RiscLens',
  description:
    'High-intent vendor risk questionnaire with critical controls, evidence expectations, and scoring tips. Use it to move vendors through review faster.',
  alternates: { canonical: '/vendor-risk-assessment/questionnaire' },
};

export default function VendorRiskQuestionnairePage() {
  const sections = [
    {
      title: 'What to include',
      bullets: [
        'Data handling and residency: data types, locations, subprocessors, retention.',
        'Access control: MFA, SSO, least privilege, joiner/mover/leaver process.',
        'Change management: approvals, testing evidence, rollback plans for production changes.',
        'Logging and monitoring: coverage, alerting thresholds, incident SLAs.',
        'Vendor management: critical vendor list, evidence collected, cadence of reviews.',
      ],
    },
    {
      title: 'Evidence to request',
      bullets: [
        'Sample access review and offboarding record within the last 90 days.',
        'Recent change ticket with approvals and test results.',
        'Incident response playbook and a de-identified post-incident review (if available).',
        'Security policy set (access, change, incident, vendor risk) and enforcement notes.',
        'List of critical vendors with risk tiers and evidence collected for each.',
      ],
    },
    {
      title: 'Scoring guidance',
      bullets: [
        'Tier by data criticality first, then control maturity; avoid over-weighting documentation alone.',
        'Assign heavier weight to access control, logging/alerting, and incident response readiness.',
        'Track exceptions with explicit remediation dates; expire approvals automatically.',
        'Re-test high-risk vendors after material changes or incidents.',
      ],
    },
  ];

  const categories = [
    { name: 'Company & data', prompts: ['Services provided and data flows', 'Data types (PII, financial, health)', 'Data locations and backups'] },
    { name: 'Identity & access', prompts: ['SSO + MFA scope', 'Role design and least privilege', 'Offboarding SLAs and evidence'] },
    { name: 'Change & deployment', prompts: ['Change approvals and testing', 'Rollback/runbooks', 'Emergency change handling'] },
    { name: 'Logging & monitoring', prompts: ['Coverage (app, infra, DB)', 'Alert thresholds and paging', 'Retention and tamper controls'] },
    { name: 'Incident response', prompts: ['Playbook and roles', 'Tabletop cadence', 'Notification SLAs and evidence of past handling'] },
    { name: 'Business continuity', prompts: ['RPO/RTO targets', 'Backup testing cadence', 'Third-party dependencies'] },
    { name: 'Vendors/subprocessors', prompts: ['List of critical vendors', 'Evidence collected per tier', 'Contract clauses (security, breach notice)'] },
    { name: 'Certifications & attestations', prompts: ['Current SOC 2 / ISO status and scope', 'Open exceptions and management responses', 'Penetration test summary and remediation status'] },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Vendor Risk Assessment</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">Vendor Risk Questionnaire Template</h1>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              A concise, high-intent questionnaire with evidence requests and scoring tips. Use it to move vendors through review faster without missing critical controls.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Link
                href="/vendor-risk-assessment/triage"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Run the VRA triage
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/vendor-risk-assessment/checklist" className="text-sm text-brand-700 underline underline-offset-4">
                See the VRA checklist →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="grid gap-4 md:grid-cols-3">
              {sections.map((section) => (
                <div key={section.title} className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm space-y-3">
                  <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-brand-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Questionnaire sections (ask + evidence)</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {categories.map((cat) => (
                  <div key={cat.name} className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
                    <p className="text-sm font-semibold text-slate-900">{cat.name}</p>
                    <ul className="space-y-1 text-sm text-slate-700">
                      {cat.prompts.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="text-brand-600">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">How to use this questionnaire</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Tier the vendor first, then scope evidence depth to criticality.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Ask for one recent, de-identified artifact per control to validate practice.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Track exceptions with explicit remediation dates; retest before renewal.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Align contract clauses (breach notice, subprocessor approvals, right to audit) with the findings.</span></li>
              </ul>
            </div>

            <div className="text-center space-y-3">
              <p className="text-slate-700 leading-relaxed">
                Move vendors through review faster with a clear questionnaire, evidence asks, and a scoring path that matches your risk tiers.
              </p>
              <Link
                href="/vendor-risk-assessment/triage"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Run the VRA triage
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
