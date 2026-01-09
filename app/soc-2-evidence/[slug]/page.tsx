import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { evidenceGuides, getEvidenceGuide } from '@/lib/soc2Evidence';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return evidenceGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = getEvidenceGuide(params.slug);
  if (!guide) return {};
  const url = `https://risclens.com/soc-2-evidence/${guide.slug}`;
  return {
    title: `${guide.title} | RiscLens`,
    description: guide.description,
    alternates: { canonical: `/soc-2-evidence/${guide.slug}` },
    openGraph: {
      title: `${guide.title} | RiscLens`,
      description: guide.description,
      url,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2 Evidence' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guide.title} | RiscLens`,
      description: guide.description,
      images: ['/og.png'],
    },
  };
}

export default function EvidencePage({ params }: PageProps) {
  const guide = getEvidenceGuide(params.slug);
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

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <script
        id={`faq-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'SOC 2', href: '/soc-2' },
              { label: 'Evidence', href: '/soc-2-evidence/vault' },
              { label: guide.title }
            ]} 
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-14 lg:pb-20 pt-4 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">SOC 2 Evidence Pack</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{guide.title}</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{guide.description}</p>
          <div className="flex justify-center">
            <AssessmentCTA />
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          <div className="space-y-3 text-slate-700">
            <h2 className="text-xl font-semibold text-slate-900">What auditors look for</h2>
            <p className="text-sm leading-relaxed">
              Auditors want to see design and operating effectiveness for this area—clear owners, repeatable processes, and evidence that the control works over time.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Evidence checklist</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {guide.checklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Common mistakes to avoid</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {guide.mistakes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">How to produce evidence quickly</h2>
            <ol className="list-decimal list-inside text-sm text-slate-700 space-y-2">
              {guide.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Related pages</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href={guide.readinessLink} className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">Readiness control</Link>
              <Link href="/soc-2-cost" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Cost</Link>
              <Link href="/soc-2-timeline" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Timeline</Link>
              <Link href="/soc-2-readiness-calculator" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Readiness Index</Link>
              <Link href="/soc-2/guides" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">SOC 2 Guides</Link>
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
