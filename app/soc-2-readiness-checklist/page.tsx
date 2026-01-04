import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';

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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center">
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
            <p className="mt-4 text-sm text-slate-500">Free • No credit card • Instant results</p>
          </div>
        </section>

        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">What a SOC 2 readiness checklist is (and isn’t)</h2>
              <p className="text-slate-700 leading-relaxed">
                Use this checklist to map people, processes, and evidence to auditor expectations. It’s a planning tool—not a certification or audit opinion.
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
              <p className="text-sm text-slate-500">Free • No credit card • Instant results</p>
            </div>

            <div className="bg-white/70 border border-slate-200 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-800">Trust &amp; privacy</p>
              <ul className="list-disc list-inside text-sm text-slate-600 leading-relaxed space-y-1">
                <li>Free, no sales calls</li>
                <li>Answers used only to calculate your score (email optional)</li>
                <li>Estimates are planning guidance, not audit advice</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-800">Related guides</p>
              <div className="flex flex-wrap gap-3 text-sm text-brand-700">
                <Link href="/soc-2-cost" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 Cost
                </Link>
                <Link href="/soc-2-timeline" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 Timeline
                </Link>
                <Link href="/soc-2-type-i-vs-type-ii" className="underline underline-offset-2 hover:text-brand-800">
                  Type I vs Type II
                </Link>
                <Link href="/soc-2-readiness/saas" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 for SaaS
                </Link>
                <Link href="/soc-2-readiness/fintech" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 for Fintech
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AssessmentCTA />
      <Footer />
    </>
  );
}
