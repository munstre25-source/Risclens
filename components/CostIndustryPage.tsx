import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Scenario = { title: string; detail: string };
type RelatedLink = { href: string; label: string };

export interface CostIndustryContent {
  industry: string;
  heroDescription: string;
  assumptions: string[];
  costRanges: string[];
  timelineBands: string[];
  scope: string[];
  drivers: string[];
  auditorFocus: string[];
  changeCost: string[];
  scenarios: Scenario[];
  hubHref: string;
  timelineHref: string;
  readinessHref: string;
  relatedLinks: RelatedLink[];
}

const CTA_HREF = '/soc-2-readiness-index';

export function CostIndustryPage({
  industry,
  heroDescription,
  assumptions,
  costRanges,
  timelineBands,
  scope,
  drivers,
  auditorFocus,
  changeCost,
  scenarios,
  hubHref,
  timelineHref,
  readinessHref,
  relatedLinks,
}: CostIndustryContent) {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-20 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">SOC 2 Cost</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">SOC 2 Cost for {industry}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">{heroDescription}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <Link
              href={CTA_HREF}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get your readiness score
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href={timelineHref} className="text-sm text-brand-700 underline underline-offset-4">
              See SOC 2 timeline guides →
            </Link>
          </div>
          <div className="text-sm text-brand-700">
            <Link href={hubHref} className="underline underline-offset-4">
              SOC 2 requirements for {industry} →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Cost range and timeline snapshot</h2>
            <ul className="space-y-2 text-slate-700 text-sm">
              {costRanges.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-slate-200 pt-3">
              <p className="text-sm font-semibold text-slate-800 mb-2">Timeline bands</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                {timelineBands.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <p className="text-sm font-semibold text-slate-800 mb-2">Assumptions</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                {assumptions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Common scope</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {scope.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Top cost drivers</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {drivers.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">What auditors focus on</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {auditorFocus.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">What changes cost most</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {changeCost.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Example scenarios</h3>
            <div className="space-y-3 text-sm text-slate-700">
              {scenarios.map((scenario) => (
                <div key={scenario.title}>
                  <p className="font-semibold text-slate-900">{scenario.title}</p>
                  <p className="text-slate-700">{scenario.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Related resources</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href={readinessHref} className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                SOC 2 readiness for {industry}
              </Link>
              <Link href={timelineHref} className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                SOC 2 timeline for {industry}
              </Link>
              <Link href="/soc-2-cost" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                SOC 2 cost (overview)
              </Link>
              {relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
