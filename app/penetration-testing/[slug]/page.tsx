import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { getPentestPage, pentestPages } from '@/lib/pentestPages';

interface PageProps {
  params: { slug: string };
}

function breadcrumbs(slug: string, title: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://risclens.com/' },
      { '@type': 'ListItem', position: 2, name: 'Penetration Testing', item: 'https://risclens.com/penetration-testing' },
      { '@type': 'ListItem', position: 3, name: title, item: `https://risclens.com/penetration-testing/${slug}` },
    ],
  };
}

function faqSchema(faqs: { question: string; answer: string }[], slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
    url: `https://risclens.com/penetration-testing/${slug}`,
  };
}

export async function generateStaticParams() {
  return pentestPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getPentestPage(params.slug);
  if (!page) return {};
  const url = `https://risclens.com/penetration-testing/${page.slug}`;
  return {
    title: `${page.title} | Penetration Testing | RiscLens`,
    description: page.description,
    alternates: { canonical: `/penetration-testing/${page.slug}` },
    openGraph: {
      title: `${page.title} | Penetration Testing | RiscLens`,
      description: page.description,
      url,
      type: 'article',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Pentest' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | Penetration Testing | RiscLens`,
      description: page.description,
      images: ['/og.png'],
    },
  };
}

export default function PentestDetailPage({ params }: PageProps) {
  const page = getPentestPage(params.slug);
  if (!page) notFound();

  const lastUpdated = new Date().toISOString().split('T')[0];
  const showFaq = page.faqs && page.faqs.length > 0 && page.showFaqSchema;

  return (
    <>
      <Script
        id={`breadcrumbs-${page.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs(page.slug, page.title)) }}
      />
      {showFaq && (
        <Script
          id={`faq-${page.slug}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(page.faqs!, page.slug)) }}
        />
      )}

        <main className="min-h-screen flex flex-col bg-slate-100">
          <Header />
          <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
              <Breadcrumb 
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Pentest', href: '/penetration-testing' },
                  { label: page.title }
                ]} 
              />
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-14 lg:pb-20 pt-4 text-center">

            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">Penetration Testing</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">
              {page.title}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">{page.description}</p>
            <div className="flex items-center justify-center">
              <Link
                href="/penetration-testing/cost-estimator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg transition"
              >
                Run Pentest Cost Estimator
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            {page.slug === 'pricing' && (
              <p className="mt-3 text-sm text-slate-500">Last updated: {lastUpdated}</p>
            )}
          </div>
        </section>

        <section className="bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
              <p className="text-sm font-semibold text-slate-800">Positioning</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                We treat penetration testing as part of trust and compliance motions. Scopes are right-sized, timelines are transparent, and we do not claim to be a pentest firm or guarantee outcomes—everything is anchored to real evidence needs.
              </p>
              <ul className="space-y-2 text-slate-700 text-sm">
                {page.bullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {page.slug === 'web-application' && (
              <div className="text-sm text-slate-700 space-y-2">
                <p className="font-semibold text-slate-900">Related scopes</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/penetration-testing/api" className="text-brand-700 underline underline-offset-4">API testing</Link>
                  <Link href="/penetration-testing/mobile" className="text-brand-700 underline underline-offset-4">Mobile app testing</Link>
                </div>
              </div>
            )}
            {page.slug === 'api' && (
              <div className="text-sm text-slate-700 space-y-2">
                <p className="font-semibold text-slate-900">Related scopes</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/penetration-testing/web-application" className="text-brand-700 underline underline-offset-4">Web app testing</Link>
                  <Link href="/penetration-testing/cloud" className="text-brand-700 underline underline-offset-4">Cloud configuration review</Link>
                </div>
              </div>
            )}
            {page.slug === 'mobile' && (
              <div className="text-sm text-slate-700 space-y-2">
                <p className="font-semibold text-slate-900">Related scopes</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/penetration-testing/web-application" className="text-brand-700 underline underline-offset-4">Web app testing</Link>
                </div>
              </div>
            )}

            {page.slug === 'for-soc-2' && (
              <div className="text-sm text-slate-700 space-y-2">
                <p className="font-semibold text-slate-900">SOC 2 bridge</p>
                <p>
                  Pentesting supports SOC 2 by validating security, availability, and change controls. It complements—not replaces—access reviews, logging, and change management. Use reports as evidence and map findings to control narratives.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/soc-2-cost" className="text-brand-700 underline underline-offset-4">SOC 2 Cost</Link>
                  <Link href="/soc-2-timeline" className="text-brand-700 underline underline-offset-4">SOC 2 Timeline</Link>
                  <Link href="/learn/soc-2-readiness" className="text-brand-700 underline underline-offset-4">SOC 2 Readiness</Link>
                </div>
              </div>
            )}

            {page.faqs && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">FAQ</h3>
                {page.faqs.map((faq) => (
                  <div key={faq.question}>
                    <p className="font-semibold text-slate-900">{faq.question}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
              <p className="text-sm font-semibold text-slate-800 mb-2">Related</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/penetration-testing" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">Hub</Link>
                <Link href="/penetration-testing/pricing" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">Pricing</Link>
                <Link href="/penetration-testing/cost-estimator" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">Cost Estimator</Link>
                <Link href="/penetration-testing/report" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">Reporting</Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
