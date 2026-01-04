import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness for Enterprise Sales | RiscLens',
  description:
    'How SOC 2 impacts security questionnaires, procurement, and deal timelines. Learn when a Type I is enough, what sales teams misunderstand, and how readiness affects deal velocity.',
};

export default function Soc2EnterpriseSalesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-6 leading-tight tracking-tight">
              SOC 2 Readiness for Enterprise Sales
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
              How SOC 2 impacts security questionnaires, procurement, and deal timelines.
            </p>
            <p className="text-sm text-slate-600 mb-8">
              Built for teams navigating enterprise buyers that expect SOC 2 signals before moving to legal and security review.
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
              <h2 className="text-2xl font-semibold text-slate-900">How SOC 2 shows up in enterprise sales cycles</h2>
              <p className="text-slate-700 leading-relaxed">
                Security questionnaires, procurement reviews, and legal addenda all probe your controls. SOC 2 gives procurement a consistent artifact to reference.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>Security questionnaires: SOC 2 helps shorten iterations.</li>
                <li>Procurement: auditors’ opinion letter builds trust with risk teams.</li>
                <li>Legal: reduces back-and-forth on security addenda and DPAs.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">When a Type I is enough to unblock deals</h2>
              <p className="text-slate-700 leading-relaxed">
                Early sales cycles often accept a Type I plus evidence that controls are operating. Type II is not always required to start selling.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>Type I establishes design; combine with recent evidence exports.</li>
                <li>Type II becomes expected as annual renewals and scale grow.</li>
                <li>Signal timing: align Type I with first enterprise contracts, Type II later.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">What sales teams misunderstand</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>SOC 2 does not guarantee “pass/fail”; it’s evidence-based readiness.</li>
                <li>Automation tools alone do not satisfy auditors without ownership and process.</li>
                <li>Evidence timing matters: stale exports create churn with buyers.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">How readiness affects deal velocity and trust</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>Clear ownership for security responses shortens questionnaire cycles.</li>
                <li>Documented access, change management, and vendor reviews build trust.</li>
                <li>Consistent evidence reduces redlines and “blocker” flags from procurement.</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                Use the readiness index to show sales and security teams where you stand before deals get stuck.
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
