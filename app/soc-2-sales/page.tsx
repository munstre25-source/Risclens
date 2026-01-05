import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { salesGuides } from '@/lib/soc2Guides';
import AssessmentCTA from '@/components/AssessmentCTA';

export const metadata: Metadata = {
  title: 'SOC 2 for Sales & Operations | RiscLens',
  description: 'How to use your SOC 2 report to accelerate sales, handle security questionnaires, and manage post-audit obligations.',
  alternates: { canonical: '/soc-2-sales' },
  openGraph: {
    title: 'SOC 2 for Sales & Operations | RiscLens',
    description: 'How to use your SOC 2 report to accelerate sales, handle security questionnaires, and manage post-audit obligations.',
    url: 'https://risclens.com/soc-2-sales',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2 Sales' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 for Sales & Operations | RiscLens',
    description: 'How to use your SOC 2 report to accelerate sales, handle security questionnaires, and manage post-audit obligations.',
    images: ['/og.png'],
  },
};

export default function Soc2SalesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">Sales & Operations</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">SOC 2 as a Sales Accelerator</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Obtaining your SOC 2 is only the first half of the battle. The second half is using it to close bigger deals faster, automate security reviews, and stay compliant year-round.
          </p>
          <div className="flex justify-center">
            <AssessmentCTA />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {salesGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`${guide.parent}/${guide.slug}`}
                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-brand-200 hover:shadow-sm transition-all flex flex-col h-full"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">{guide.title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">{guide.summary}</p>
                <div className="space-y-2 mb-6">
                  {guide.highlights.slice(0, 3).map((highlight) => (
                    <div key={highlight} className="flex gap-2 text-xs text-slate-500">
                      <span className="text-brand-500">•</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                <span className="text-brand-700 text-sm font-semibold inline-flex items-center group-hover:underline">
                  Read Guide
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Need help using your report?</h2>
          <p className="text-slate-600 mb-8">
            Our experts help founders draft bridge letters, respond to complex questionnaires, and build trust centers that impress enterprise security teams.
          </p>
          <AssessmentCTA />
        </div>
      </section>

      <Footer />
    </main>
  );
}
