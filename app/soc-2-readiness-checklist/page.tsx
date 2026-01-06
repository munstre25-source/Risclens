import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import ChecklistDownloadForm from '@/components/ChecklistDownloadForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Checklist (2026) | RiscLens',
  description: 'A practical SOC 2 readiness checklist to spot gaps before you talk to an auditor. Understand people, process, and evidence expectations and common early-stage gaps.',
  openGraph: {
    title: 'SOC 2 Readiness Checklist (2026) | RiscLens',
    description:
      'A practical SOC 2 readiness checklist to spot gaps before you talk to an auditor. Understand people, process, and evidence expectations and common early-stage gaps.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Readiness Checklist (2026) | RiscLens',
    description:
      'A practical SOC 2 readiness checklist to spot gaps before you talk to an auditor. Understand people, process, and evidence expectations and common early-stage gaps.',
    images: ['/og.png'],
  },
};

export default function Soc2ReadinessChecklistPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
            <Breadcrumbs items={[{ label: 'SOC 2', href: '/soc-2' }, { label: 'Readiness Checklist', href: '/soc-2-readiness-checklist' }]} />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-14 text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-6 leading-tight tracking-tight">
              SOC 2 Readiness Checklist (2026)
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
              A practical pre-audit checklist to spot gaps before you talk to an auditor.
            </p>
            <Link
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Your Readiness Score →
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
              <p className="mt-4 text-sm text-slate-500">Free • No credit card • Business email required</p>
            </div>
          </section>

          <section id="download" className="py-12 bg-slate-50 border-y border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    New for 2026
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                    Get the portable PDF version
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Take this checklist offline. Share it with your team, map owners to tasks, and track your progress as you prepare for your SOC 2 audit.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Interactive task list for teams',
                      'Evidence collection templates',
                      'Common auditor questions',
                      'Cost & timeline benchmarks'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-700">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ChecklistDownloadForm />
                </div>
              </div>
            </div>
          </section>

          <section className="py-14 bg-white">

          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">What a SOC 2 readiness checklist is (and isn’t)</h2>
              <p className="text-slate-700 leading-relaxed">
                Use this checklist to map people, processes, and evidence to auditor expectations. It’s a planning tool—not an attestation or audit opinion.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Checklist: what auditors expect to see</h2>
              <div className="space-y-2">
                <p className="text-base font-semibold text-slate-800">People &amp; ownership</p>
                <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1">
                  <li>Named owners for access reviews, incident response, and vendor management</li>
                  <li>Clear escalation paths for security incidents and exceptions</li>
                  <li>Documented roles for approving changes and handling sensitive data</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-base font-semibold text-slate-800">Process &amp; policy</p>
                <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1">
                  <li>Change management process with approvals and testing evidence</li>
                  <li>Onboarding/offboarding steps tied to access provisioning and removal</li>
                  <li>Documented incident response plan with communication steps and timelines</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-base font-semibold text-slate-800">Evidence &amp; systems</p>
                <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1">
                  <li>MFA enforced on critical systems; logging and alerting configured</li>
                  <li>Vendor management records with risk reviews and data flow clarity</li>
                  <li>Access review logs, change records, and incident tickets retained</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Common gaps in early-stage companies</h2>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-2">
                <li>Undefined owners for access reviews and incident response</li>
                <li>Ad-hoc change management without approvals or testing proof</li>
                <li>Incomplete offboarding and stale access for former staff or vendors</li>
                <li>Logging in place but alerts unreviewed or without thresholds</li>
                <li>Vendor risk not documented; data flows unclear</li>
                <li>Incident playbooks not exercised; no post-incident reviews</li>
                <li>Evidence stored in scattered tools with no single source of truth</li>
              </ul>
            </div>

            <div className="text-center space-y-3">
              <p className="text-slate-700 leading-relaxed">
                Use the readiness assessment to see your band and map gaps to timeline and cost before scheduling auditors.
              </p>
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Your Readiness Score →
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
                <p className="text-sm text-slate-500">Free • No credit card • Business email required</p>
              </div>
  
              <div className="bg-white/70 border border-slate-200 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-slate-800">Trust &amp; privacy</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 leading-relaxed space-y-1">
                    <li>No login required; business email required.</li>
                    <li>Answers used only to calculate your score</li>
                    <li>Estimates are planning guidance, not audit advice</li>
                  </ul>
              </div>

            <RelatedGuidesRow
              links={[
                { href: '/soc-2-cost', label: 'SOC 2 Cost' },
                { href: '/soc-2-timeline', label: 'SOC 2 Timeline' },
                { href: '/soc-2-type-i-vs-type-ii', label: 'Type I vs Type II' },
                { href: '/soc-2-readiness/saas', label: 'SOC 2 for SaaS' },
                { href: '/soc-2-readiness/fintech', label: 'SOC 2 for Fintech' },
                { href: '/vendor-risk-assessment', label: 'Vendor Risk Hub' },
              ]}
            />
          </div>
        </section>
      </main>
      <AssessmentCTA />
      <Footer />
    </>
  );
}
