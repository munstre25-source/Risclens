import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StickyCTA } from '@/components/StickyCTA';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CityData } from '@/lib/cityData';

export function CityCostPage(city: CityData) {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'SOC 2 Cost', href: '/soc-2-cost' }, { label: `Cost in ${city.name}` }]} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Localized Cost Guide</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">SOC 2 Cost in {city.name}, {city.state}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">{city.description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get a custom cost estimate
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Local Pricing Benchmarks</h2>
              <ul className="space-y-3">
                {city.pricingNotes.map((note, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-700">
                    <span className="text-brand-600 font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold text-brand-900">Regional Insights</h2>
              <ul className="space-y-3">
                {city.localInsights.map((insight, i) => (
                  <li key={i} className="flex gap-3 text-sm text-brand-800">
                    <span className="text-brand-500 font-bold">✓</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 space-y-4 bg-white">
            <h2 className="text-xl font-semibold text-slate-900">On-site vs. Remote Audits in {city.name}</h2>
            <p className="text-slate-700 leading-relaxed">{city.onsitePolicy}</p>
            <div className="pt-2">
              <Link href={`/auditor-directory/${city.slug}`} className="text-brand-700 font-medium hover:underline">
                View vetted auditors in {city.name} →
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Common Industries Served</h2>
            <div className="flex flex-wrap gap-2">
              {city.industries.map((ind) => (
                <span key={ind} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm border border-slate-200">
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 text-white text-center space-y-6">
            <h3 className="text-2xl font-bold">Ready to start your SOC 2 in {city.name}?</h3>
            <p className="text-slate-300 max-w-xl mx-auto">
              Our platform connects you with the best {city.name}-based auditors while automating up to 90% of the evidence collection.
            </p>
            <Link
              href="/auditor-match"
              className="inline-block bg-white text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Find an Auditor in {city.name}
            </Link>
          </div>
        </div>
      </section>

      <StickyCTA />
      <Footer />
    </main>
  );
}
