import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HowItWorksButton } from '@/components/HowItWorksButton';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { costGuides, timelineGuides, readinessGuides, salesGuides } from '@/lib/soc2Guides';

export const metadata: Metadata = {
  title: 'SOC 2 Guides Hub | RiscLens',
  description: 'All SOC 2 guides in one place: costs, timelines, readiness controls, sales enablement, and industry-specific advice.',
  alternates: { canonical: 'https://risclens.com/soc-2/guides' },
  openGraph: {
    title: 'SOC 2 Guides Hub | RiscLens',
    description: 'All SOC 2 guides in one place: costs, timelines, readiness controls, sales enablement, and industry-specific advice.',
    url: 'https://risclens.com/soc-2/guides',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2 Guides' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Guides Hub | RiscLens',
    description: 'All SOC 2 guides in one place: costs, timelines, readiness controls, sales enablement, and industry-specific advice.',
    images: ['/og.png'],
  },
};

export default function Soc2GuidesPage() {
  const sections = [
    { title: 'Cost Drivers', href: '/soc-2-cost', items: costGuides },
    { title: 'Timelines', href: '/soc-2-timeline', items: timelineGuides },
    { title: 'Readiness Controls', href: '/soc-2-readiness', items: readinessGuides },
    { title: 'Sales & Operations', href: '/soc-2-sales', items: salesGuides },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">SOC 2 Guides Hub</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">View all SOC 2 Guides</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore every SOC 2 guide we publish—costs, timelines, readiness controls, and industry-specific advice. Use these resources to plan your audit with confidence.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/soc-2-readiness-calculator"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-lg shadow-md transition-all text-lg"
            >
              Start Readiness Assessment
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            <Link
              href="/compliance-roi-calculator"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-semibold px-8 py-4 rounded-lg shadow-sm transition-all text-lg"
            >
              Calculate Compliance ROI
              <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
            <div className="hidden sm:block">
              <HowItWorksButton />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                  <p className="text-sm text-slate-500">Deep dives and technical roadmaps</p>
                </div>
                <Link href={section.href} className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1">
                  Go to {section.title} Hub
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {section.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`${item.parent}/${item.slug}`}
                    className="group block border border-slate-200 rounded-xl p-5 bg-white hover:border-brand-200 hover:shadow-sm transition-all"
                  >
                    <p className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">{item.title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">{item.summary}</p>
                    <div className="mt-3 flex items-center text-xs font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Guide
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-8 border-t border-slate-200">
            <RelatedGuidesRow
              links={[
                { href: '/soc-2-readiness-calculator', label: 'Readiness Score' },
                { href: '/soc-2-cost-calculator', label: 'SOC 2 Cost' },
                { href: '/compliance-roi-calculator', label: 'Compliance ROI' },
                { href: '/penetration-testing', label: 'Pentest Hub' },
                { href: '/vendor-risk-assessment', label: 'Vendor Risk Hub' },
              ]}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
