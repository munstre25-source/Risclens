import Link from 'next/link';

export default function AssessmentCTA() {
  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-12 text-center space-y-3">
        <p className="text-sm font-semibold text-slate-800">Not sure where you stand?</p>
        <p className="text-base text-slate-700">Get a SOC 2 readiness score + cost range in under 2 minutes.</p>
        <Link
          href="/soc-2-readiness-calculator"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Get Your Readiness Score →
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
