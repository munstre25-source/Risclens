import Link from 'next/link';
import controls from '@/src/content/soc2ReadinessControls';
import DefinitionCallout from '@/components/DefinitionCallout';

export const metadata = {
  title: 'SOC 2 Readiness Controls | RiscLens',
  description: 'SOC 2 readiness controls hub: access, change, logging, incident response, vendors, and more—each with guidance and evidence expectations.',
  alternates: { canonical: '/learn/soc-2-readiness' },
};

export default function LearnSoc2ReadinessPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">SOC 2 Readiness</p>
          <h1 className="text-4xl font-bold text-slate-900">Readiness Controls</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore every SOC 2 readiness control: what auditors care about, what to implement, and the evidence to keep audit-ready.
          </p>
          <div className="max-w-3xl mx-auto">
            <DefinitionCallout
              title="What SOC 2 readiness means"
              description="SOC 2 readiness is a pre-audit assessment of how prepared you are for a SOC 2 audit—gaps, timelines, and evidence expectations. It is not a certification or audit opinion."
              linkKey="soc2ReadinessIndex"
            />
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
