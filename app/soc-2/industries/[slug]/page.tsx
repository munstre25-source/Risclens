import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { getIndustryGuide, industryGuides } from '@/lib/soc2Industries';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return industryGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = getIndustryGuide(params.slug);
  if (!guide) return {};
  const url = `https://risclens.com/soc-2/industries/${guide.slug}`;
  return {
    title: `${guide.name} SOC 2: Cost, Timeline, Expectations | RiscLens`,
    description: guide.description,
    alternates: { canonical: `/soc-2/industries/${guide.slug}` },
    openGraph: {
      title: `${guide.name} SOC 2: Cost, Timeline, Expectations | RiscLens`,
      description: guide.description,
      url,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guide.name} SOC 2: Cost, Timeline, Expectations | RiscLens`,
      description: guide.description,
      images: ['/og.png'],
    },
  };
}

export default function IndustryPage({ params }: PageProps) {
  const guide = getIndustryGuide(params.slug);
  if (!guide) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const lastUpdated = new Date().toISOString().split('T')[0];

  const relatedIndustryLinks = guide.related
    .map((slug) => getIndustryGuide(slug))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id={`faq-${guide.slug}`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">SOC 2 Industry Guide</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            SOC 2 for {guide.name}: Cost, Timeline, and What Auditors Expect
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{guide.description}</p>
          <div className="flex justify-center">
            <AssessmentCTA />
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          <div className="space-y-3 text-slate-700 leading-relaxed">
            <h2 className="text-xl font-semibold text-slate-900">Why SOC 2 matters for {guide.name}</h2>
            <ul className="space-y-2 text-sm">
              {guide.trustThemes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 text-slate-700 leading-relaxed">
            <h2 className="text-xl font-semibold text-slate-900">Common trust requirements</h2>
            <p className="text-sm">What security questionnaires and buyers tend to probe.</p>
            <ul className="space-y-2 text-sm">
              {guide.trustThemes.map((item) => (
                <li key={`req-${item}`} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Typical scope boundaries (in)</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {guide.scopeIn.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Typical scope boundaries (out)</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {guide.scopeOut.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Cost drivers specific to {guide.name}</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {guide.costDrivers.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-600">Budget ranges depend on scope and environments in play. Use the readiness index to calibrate.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Timeline expectations & bottlenecks</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {guide.bottlenecks.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-600">Timelines vary by scope and control maturity. Remove blockers early—especially pentests and access reviews.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">First 30 days: move fast and stay credible</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {guide.checklist.map((item) => (
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
              <Link href="/soc-2-readiness-index" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Readiness Index</Link>
              <Link href="/soc-2/guides" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Guides</Link>
              {relatedIndustryLinks.map((related) => (
                <Link
                  key={related!.slug}
                  href={`/soc-2/industries/${related!.slug}`}
                  className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200"
                >
                  {related!.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">FAQ</h3>
            {guide.faqs.map((faq) => (
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
