import Link from 'next/link';
import controls from '@/src/content/soc2ReadinessControls';
import DefinitionCallout from '@/components/DefinitionCallout';

export const metadata = {
  title: 'SOC 2 Readiness Controls | RiscLens',
  description: 'SOC 2 readiness controls hub: access, change, logging, incident response, vendors, and more—each with guidance and evidence expectations.',
  alternates: { canonical: 'https://risclens.com/learn/soc-2-readiness' },
};

export default function LearnSoc2ReadinessPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-6">
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Buyer Guide</p>
            <h1 className="text-4xl font-bold text-slate-900">SOC 2 Preparation Guides</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Operational guides for founders and security leads closing enterprise deals. No fluff—just the requirements, evidence patterns, and auditor expectations you need to unblock revenue.
            </p>
            <div className="max-w-3xl mx-auto">
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 text-left flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-slate-900">Measure Your Readiness First</h3>
                  <p className="text-sm text-slate-600">Don&apos;t guess your compliance posture. Use our deterministic calculator to find your actual gaps before reading the deep-dives.</p>
                </div>
                <Link href="/soc-2-readiness-calculator" className="btn-primary whitespace-nowrap">
                  Get Readiness Score →
                </Link>
              </div>
            </div>
          </div>


        <div className="grid gap-4 md:grid-cols-2">
          {controls.map((item) => (
            <Link
              key={item.slug}
              href={`/learn/soc-2-readiness/${item.slug}`}
              className="block border border-slate-200 rounded-xl p-5 bg-white hover:border-brand-200 transition"
            >
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">{item.subtitle}</p>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{item.summary}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/soc-2-readiness-calculator" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-3 rounded-lg shadow-sm transition">
            Get Readiness Score
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
