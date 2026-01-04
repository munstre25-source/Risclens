import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { industryCostLinks } from '@/lib/industryCostLinks';

export const metadata: Metadata = {
  title: 'SOC 2 Cost by Industry | RiscLens',
  description: 'Browse SOC 2 cost guidance for each industry: scope hotspots, auditor focus areas, and links to readiness resources.',
  alternates: { canonical: '/soc-2-cost/industries' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/industries',
    title: 'SOC 2 Cost by Industry | RiscLens',
    description: 'Find SOC 2 cost pages by industry with scope highlights and readiness links.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost by Industry' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost by Industry | RiscLens',
    description: 'Industry-specific SOC 2 cost guidance with scope hotspots and readiness links.',
    images: ['/og.png'],
  },
};

export default function Soc2CostIndustriesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-20 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">SOC 2 Cost</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">SOC 2 Cost by Industry</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Jump to industry-specific SOC 2 cost guidance. Each page outlines scope hotspots, what auditors emphasize, and how to keep budgets predictable.
          </p>
          <div className="text-sm text-brand-700">
            <Link href="/soc-2-cost" className="underline underline-offset-4">
              Back to SOC 2 cost overview →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {industryCostLinks.map((item) => (
              <Link
                key={item.slug}
                href={item.costHref}
                className="group block rounded-xl border border-slate-200 bg-white hover:border-brand-200 hover:shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
              >
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-slate-900">{item.label}</p>
                    <svg className="w-4 h-4 text-brand-600 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-600">{item.blurb}</p>
                  <Link href={item.hubHref} className="text-xs text-brand-700 underline underline-offset-4 hover:text-brand-800">
                    SOC 2 requirements for {item.label} →
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
