import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { costGuides, timelineGuides, readinessGuides } from '@/lib/soc2Guides';

export const metadata: Metadata = {
  title: 'SOC 2 Guides Hub | RiscLens',
  description: 'All SOC 2 guides in one place: costs, timelines, readiness controls, and industry-specific advice.',
  alternates: { canonical: '/soc-2/guides' },
  openGraph: {
    title: 'SOC 2 Guides Hub | RiscLens',
    description: 'All SOC 2 guides in one place: costs, timelines, readiness controls, and industry-specific advice.',
    url: 'https://risclens.com/soc-2/guides',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2 Guides' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Guides Hub | RiscLens',
    description: 'All SOC 2 guides in one place: costs, timelines, readiness controls, and industry-specific advice.',
    images: ['/og.png'],
  },
};

export default function Soc2GuidesPage() {
  const sections = [
    { title: 'Cost Drivers', href: '/soc-2-cost', items: costGuides },
    { title: 'Timelines', href: '/soc-2-timeline', items: timelineGuides },
    { title: 'Readiness Controls', href: '/soc-2-readiness', items: readinessGuides },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">SOC 2 Guides</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">View all SOC 2 Guides</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore every SOC 2 guide we publish—costs, timelines, readiness controls, and industry-specific advice. Use this hub to navigate without crowding the header menu.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{section.title}</p>
                  <p className="text-sm text-slate-600">Linked to the hub: {section.href}</p>
                </div>
                <Link href={section.href} className="text-sm text-brand-700 underline underline-offset-4">
                  Go to hub
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {section.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`${item.parent}/${item.slug}`}
                    className="block border border-slate-200 rounded-lg p-4 bg-slate-50 hover:border-brand-200 transition"
                  >
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-700 leading-relaxed mt-1">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
