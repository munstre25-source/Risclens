import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness for Startups | RiscLens',
  description:
    'What early-stage teams actually need for SOC 2 without over-spending. Learn why startups pursue SOC 2, what auditors expect under 50 employees, and what to focus on first.',
};

export default function Soc2ReadinessStartupsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-6 leading-tight tracking-tight">
              SOC 2 Readiness for Startups
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
              What early-stage teams actually need — and what’s overkill.
            </p>
            <p className="text-sm text-slate-600 mb-8">
              Built for teams under 50 employees who need to satisfy enterprise buyers without burning time and budget on the wrong controls.
            </p>
            <Link
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Your Readiness Score →
            </Link>
            <p className="mt-4 text-sm text-slate-500">Free • No credit card • Instant results</p>
          </div>
        </section>

        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Why startups pursue SOC 2</h2>
              <p className="text-slate-700 leading-relaxed">
                Enterprise customers and investors expect evidence that you manage access, change, and incident response. SOC 2 answers security questionnaires faster and keeps deals moving.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>Enterprise procurement: reduce back-and-forth on security questionnaires.</li>
                <li>Due diligence: show you know your risks, owners, and evidence.</li>
                <li>Customer trust: signal you can scale with controlled processes.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">What auditors expect under 50 employees</h2>
              <p className="text-slate-700 leading-relaxed">
                Auditors want clear ownership and consistent evidence, not heavyweight enterprise tooling.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>Named owners for access reviews, incident response, and change approvals.</li>
                <li>Documented onboarding/offboarding, MFA, logging, and vendor reviews.</li>
                <li>Evidence that controls run on a cadence (tickets, exports, logs), even if lightweight.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Common startup mistakes</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>Over-tooling before defining owners and processes.</li>
                <li>Jumping to Type II too early without stable evidence.</li>
                <li>Copying enterprise policies that nobody follows.</li>
                <li>Ignoring vendor risk and access hygiene until the audit window opens.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">What to focus on first</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>Ownership: who runs access reviews, change control, and incidents.</li>
                <li>Access: MFA everywhere, least privilege, fast offboarding.</li>
                <li>Evidence basics: repeatable checklists/tickets for reviews, backups, and vendor checks.</li>
                <li>Scope control: start with core product systems before adding every tool.</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                Use the readiness index to map these fundamentals to your current state before engaging auditors.
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Your Readiness Score →
              </Link>
              <p className="mt-3 text-sm text-slate-500">Free • No credit card • Instant results</p>
            </div>

            <div className="bg-white/70 border border-slate-200 rounded-lg p-4 space-y-2">
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
