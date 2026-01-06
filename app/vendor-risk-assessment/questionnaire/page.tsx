import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VRAQuestionnaireBuilder } from '@/components/vendor-risk/VRAQuestionnaireBuilder';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Vendor Risk Questionnaire Tool | RiscLens',
  description:
    'Download a high-intent vendor risk questionnaire with critical controls, evidence expectations, and scoring tips.',
  alternates: { canonical: '/vendor-risk-assessment/questionnaire' },
};

export default function VendorRiskQuestionnairePage() {
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
              <Breadcrumb 
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Vendor Risk', href: '/vendor-risk-assessment' },
                  { label: 'Questionnaire' }
                ]} 
              />
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-14 text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mx-auto">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Execution Prep
              </div>
              <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">VRA Questionnaire Builder</h1>
              <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
                Deploy auditor-safe security controls for your supply chain. Finalize your vendor assessment framework before your next audit period begins.
              </p>
            </div>
          </section>

        <section className="py-12 lg:py-16 bg-white border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Questionnaire sections included</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {categories.map((cat) => (
                    <div key={cat.name} className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
                      <p className="text-sm font-semibold text-slate-900">{cat.name}</p>
                      <ul className="space-y-1 text-sm text-slate-700">
                        {cat.prompts.slice(0, 2).map((p) => (
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
                <h2 className="text-lg font-semibold text-slate-900">How to use this template</h2>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Tier the vendor first, then scope evidence depth to criticality.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Ask for one recent, de-identified artifact per control to validate practice.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Track exceptions with explicit remediation dates; retest before renewal.</span></li>
                </ul>
              </div>
            </div>

            <div id="builder" className="sticky top-24">
              <VRAQuestionnaireBuilder />
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Need to triage a specific vendor right now?</h2>
            <p className="text-slate-600">Use our interactive triage tool to get a risk score and evidence list in 2 minutes.</p>
            <Link
              href="/vendor-risk-assessment/triage"
              className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-800 transition"
            >
              Run the VRA Triage Tool →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
