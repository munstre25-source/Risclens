import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContentPage } from '@/lib/content';
import { readinessGuides } from '@/lib/soc2Guides';

const defaultDescription =
  'SOC 2 readiness hub with practical guides, role-based paths, and industry tracks for startups preparing for enterprise security reviews.';

const defaultHighlights = [
  'Map control ownership before you begin evidence collection.',
  'Use role-based guides to align engineering, legal, and finance teams.',
  'Prioritize industry-specific controls that buyers ask about first.',
  'Estimate timeline and budget before selecting auditors and tooling.',
];

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContentPage('soc-2-readiness');

  return {
    title: content?.title || 'SOC 2 Readiness Hub | RiscLens',
    description: content?.description || defaultDescription,
    alternates: {
      canonical: 'https://risclens.com/soc-2-readiness',
    },
  };
}

export default async function Soc2ReadinessHubPage() {
  const content = await getContentPage('soc-2-readiness');
  const title = content?.title || 'SOC 2 Readiness Hub';
  const description = content?.description || defaultDescription;
  const highlights = content?.content_json?.highlights?.length
    ? content.content_json.highlights
    : defaultHighlights;

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">SOC 2</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">{title}</h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed mb-8">{description}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/soc-2-readiness-calculator"
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-lg"
            >
              Start Readiness Assessment
            </Link>
            <Link
              href="/soc-2-cost-calculator"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-6 py-3 rounded-lg bg-white"
            >
              Estimate Budget
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">What to do first</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((item: string) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">Industry readiness tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { href: '/soc-2-readiness/healthcare', label: 'Healthcare Readiness' },
              { href: '/soc-2-readiness/fintech', label: 'Fintech Readiness' },
              { href: '/soc-2-readiness/saas', label: 'SaaS Readiness' },
              { href: '/soc-2-readiness/startups', label: 'Startup Readiness' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-200 p-5 hover:border-slate-400 transition-colors"
              >
                <p className="text-lg font-semibold text-slate-900">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">Control-specific guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {readinessGuides.slice(0, 8).map((guide) => (
              <Link
                key={guide.slug}
                href={`/soc-2-readiness/${guide.slug}`}
                className="rounded-lg border border-slate-200 p-5 hover:border-slate-400 transition-colors"
              >
                <p className="text-lg font-semibold text-slate-900 mb-2">{guide.title}</p>
                <p className="text-sm text-slate-600">{guide.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
