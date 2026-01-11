import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';

export const metadata: Metadata = {
  title: 'SOC 2 Evidence Vault: How to Store Audit Evidence | RiscLens',
  description:
    'Build a simple SOC 2 evidence vault with consistent storage, ownership, and retention so auditors can verify quickly. What to store, how to structure, and how to keep it current.',
  alternates: { canonical: '/soc-2-evidence/vault' },
};

const buckets = [
  { title: 'Access & identity', items: ['Access reviews with approvals and timestamps', 'MFA scope and enforcement proof', 'Joiner/mover/leaver records and tickets'] },
  { title: 'Change management', items: ['Change tickets with approvals, testing, and rollback plan', 'Emergency change log with after-action notes', 'Release pipeline evidence (build logs)'] },
  { title: 'Logging & monitoring', items: ['Alert policies and runbooks', 'Sample alert with response evidence', 'Log retention settings and integrity controls'] },
  { title: 'Incident response', items: ['IR playbook and roles', 'Tabletop results and follow-up tasks', 'Post-incident report (de-identified)'] },
  { title: 'Vendor risk', items: ['Vendor inventory with tiers', 'Evidence for critical vendors (questionnaire, SOC 2/ISO, pen test summary)', 'Contract clauses: breach notice, subprocessor approval'] },
  { title: 'Business continuity', items: ['Backup/restore test results', 'RPO/RTO targets vs. actuals', 'Dependency map for critical services'] },
];

export default function EvidenceVaultPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'SOC 2', href: '/soc-2' },
                { label: 'Evidence Vault' }
              ]} 
            />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 lg:pb-14 pt-4 text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">SOC 2 Evidence</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">Build a SOC 2 Evidence Vault</h1>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              A simple structure for storing audit evidence—so reviewers can find, verify, and accept it fast.
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
                <Link href="/soc-2-evidence" className="text-sm text-brand-700 underline underline-offset-4">
                  See evidence categories →
                </Link>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="grid gap-4 md:grid-cols-2">
              {buckets.map((bucket) => (
                <div key={bucket.title} className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm space-y-3">
                  <h2 className="text-lg font-semibold text-slate-900">{bucket.title}</h2>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {bucket.items.map((item) => (
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
              <h2 className="text-lg font-semibold text-slate-900">How to structure your vault</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Use consistent folders by control area (access, change, incident, vendor, BCP) with clear owners.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Store one “golden” artifact per control with timestamps—reduce duplicates.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Label files with date + system + control (e.g., <code>2026-01_access-review_appX.pdf</code>).</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Track expirations: reviews, tests, tabletop dates—set reminders before they lapse.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Limit editor access; keep view-only for most users to preserve evidence integrity.</span></li>
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Keep it fresh</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Schedule quarterly evidence reviews per control owner.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Update artifacts after every incident, major release, or vendor change.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Archive superseded evidence; avoid mixing old and new in the same folder.</span></li>
                </ul>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">What auditors look for</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Recency and completeness (who, what, when, approval, system of record).</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Consistency across systems—evidence matches the policy/control description.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Integrity: minimal redaction, clear source, tamper-safe storage.</span></li>
                </ul>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-slate-700 leading-relaxed">
                A clean evidence vault speeds audits and reduces back-and-forth. Map owners, keep recency, and store one trusted artifact per control.
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

              <RelatedGuidesRow
                links={[
                  { href: '/soc-2-readiness-checklist', label: 'SOC 2 Checklist' },
                  { href: '/soc-2-type-i-vs-type-ii', label: 'Type I vs Type II' },
                  { href: '/soc-2-cost', label: 'SOC 2 Cost' },
                  { href: '/vendor-risk-assessment', label: 'Vendor Risk Hub' },
                  { href: '/penetration-testing', label: 'Pentest Hub' },
                ]}
                className="mt-12"
              />
            </div>
          </section>
        </main>

      <Footer />
    </>
  );
}
