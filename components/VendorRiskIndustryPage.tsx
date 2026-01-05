import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';

type RelatedLink = { href: string; label: string };

export interface VendorRiskIndustryContent {
  industry: string;
  heroDescription: string;
  requirements: string[];
  challenges: string[];
  auditorFocus: string[];
  tieringStrategy: string[];
  relatedLinks: RelatedLink[];
}

const CTA_HREF = '/vendor-risk-assessment/tiering';

export function VendorRiskIndustryPage({
  industry,
  heroDescription,
  requirements,
  challenges,
  auditorFocus,
  tieringStrategy,
  relatedLinks,
}: VendorRiskIndustryContent) {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumbs 
            items={[
              { label: 'Vendor Risk Assessment', href: '/vendor-risk-assessment' },
              { label: `VRA for ${industry}`, href: '#' }
            ]} 
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 lg:pb-20 pt-4 text-center space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Vendor Risk Management</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Vendor Risk for {industry}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">{heroDescription}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={CTA_HREF}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Access Tiering Tool
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/vendor-risk-assessment" className="text-sm text-brand-700 font-medium hover:underline">
              View all Vendor Risk resources →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Regulatory Requirements */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Compliance Requirements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800">What {industry} audits demand:</h3>
                <ul className="space-y-3">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
                <h3 className="font-bold text-brand-900 mb-4">Auditor Focus Areas</h3>
                <ul className="space-y-3">
                  {auditorFocus.map((focus, i) => (
                    <li key={i} className="flex gap-3 text-sm text-brand-800">
                      <span className="font-bold">•</span>
                      {focus}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tiering Strategy */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Tiering Strategy</h2>
              <p className="text-sm text-slate-600 mb-6">How to categorize suppliers for {industry} compliance:</p>
              <ul className="space-y-4">
                {tieringStrategy.map((strategy, i) => (
                  <li key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl text-sm text-slate-700 border border-slate-100">
                    <span className="flex items-center justify-center w-6 h-6 bg-brand-100 text-brand-600 rounded-full font-bold text-xs shrink-0">
                      {i + 1}
                    </span>
                    {strategy}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Industry Challenges</h2>
              <p className="text-sm text-slate-600 mb-6">Specific friction points for {industry} teams:</p>
              <ul className="space-y-3">
                {challenges.map((challenge, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600 italic">
                    <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    "{challenge}"
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Related Resources</h3>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-brand-700 hover:border-brand-500 hover:bg-brand-50 transition-all shadow-sm"
                >
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
