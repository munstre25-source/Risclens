import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { industryGuides } from '@/lib/soc2Industries';

const DISPLAY_SLUGS = ['b2b-saas', 'fintech', 'startups', 'enterprise', 'healthcare', 'ecommerce', 'marketplaces', 'ai-data'];

export const metadata: Metadata = {
  title: 'SOC 2 Industries Hub | RiscLens',
  description: 'SOC 2 guidance for SaaS, fintech, startups, enterprise, healthcare, e-commerce, marketplaces, and AI/data companies.',
  alternates: { canonical: '/soc-2/industries' },
  openGraph: {
    title: 'SOC 2 Industries Hub | RiscLens',
    description: 'Explore SOC 2 guides by industry: SaaS, fintech, startups, enterprise, healthcare, e-commerce, marketplaces, AI/data.',
    url: 'https://risclens.com/soc-2/industries',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2 Industries' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Industries Hub | RiscLens',
    description: 'Explore SOC 2 guides by industry: SaaS, fintech, startups, enterprise, healthcare, e-commerce, marketplaces, AI/data.',
    images: ['/og.png'],
  },
};

export default function IndustriesHubPage() {
  const items = DISPLAY_SLUGS.map((slug) => industryGuides.find((guide) => guide.slug === slug)).filter(Boolean);

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">SOC 2 Industries</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">SOC 2 by Industry</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            See how SOC 2 expectations shift by industry—cost, scope, evidence, and timelines for SaaS, fintech, startups, enterprise, healthcare, e-commerce, marketplaces, and AI/data teams.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item!.slug}
              href={`/soc-2/industries/${item!.slug}`}
              className="block border border-slate-200 rounded-xl p-5 bg-slate-50 hover:border-brand-200 transition"
            >
              <p className="text-sm font-semibold text-slate-900">{item!.name}</p>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{item!.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
