import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { comparisonPages, getComparisonPage } from '@/lib/soc2Comparisons';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getComparisonPage(params.slug);
  if (!page) return {};
  const url = `https://risclens.com/soc-2-vs-iso-27001/${page.slug}`;
  return {
    title: `${page.title} | RiscLens`,
    description: page.description,
    alternates: { canonical: `https://risclens.com/soc-2-vs-iso-27001/${page.slug}` },
    openGraph: {
      title: `${page.title} | RiscLens`,
      description: page.description,
      url,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2 vs ISO 27001' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | RiscLens`,
      description: page.description,
      images: ['/og.png'],
    },
  };
}

export default function ComparisonPage({ params }: PageProps) {
  const page = getComparisonPage(params.slug);
  if (!page) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const lastUpdated = new Date().toISOString().split('T')[0];

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <script
        id={`faq-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">SOC 2 vs ISO 27001</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{page.title}</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{page.description}</p>
          <div className="flex justify-center">
            <AssessmentCTA />
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-sm text-left text-slate-800">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3">Aspect</th>
                  <th className="px-4 py-3">SOC 2</th>
                  <th className="px-4 py-3">ISO 27001</th>
                </tr>
              </thead>
              <tbody>
                {page.tableRows.map((row) => (
                  <tr key={row.aspect} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.aspect}</td>
                    <td className="px-4 py-3 text-slate-700">{row.soc2}</td>
                    <td className="px-4 py-3 text-slate-700">{row.iso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 text-slate-700">
            <h2 className="text-xl font-semibold text-slate-900">Decision guide</h2>
            <ul className="space-y-2 text-sm">
              {page.decisions.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Related pages</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/soc-2-cost" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Cost</Link>
              <Link href="/soc-2-timeline" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Timeline</Link>
              <Link href="/soc-2/guides" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Guides</Link>
              <Link href="/soc-2-readiness-calculator" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Readiness Index</Link>
              <Link href="/soc-2-vs-iso-27001" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 vs ISO 27001</Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">FAQ</h3>
            {page.faqs.map((faq) => (
              <div key={faq.question}>
                <p className="font-semibold text-slate-900">{faq.question}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500">Last updated: {lastUpdated}</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
