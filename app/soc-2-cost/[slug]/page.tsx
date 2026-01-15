import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { ContentFeedback } from '@/components/ContentFeedback';
import { costGuides, costGuideBySlug, Soc2GuidePage } from '@/lib/soc2Guides';
import { getContentPage } from '@/lib/content';
import { industryCostLinks } from '@/lib/industryCostLinks';
import { LastVerifiedBadge, AccuracyDisclaimer } from '@/components/AccuracyGuards';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface PageProps {
  params: { slug: string };
}

function buildDefaultFaqs(topic: string) {
  return [
    {
      question: `How does ${topic} affect SOC 2 budget?`,
      answer: `${topic} influences auditor expectations and the effort your team spends preparing evidence. Plan for the touchpoints, review cycles, and any tooling or services that support this area.`,
    },
    {
      question: `Where should ${topic} show up in our project plan?`,
      answer: `Surface the work early so remediation or procurement can happen before the observation window. Pair owners with timelines so it stays on track.`,
    },
    {
      question: `What do auditors typically ask for?`,
      answer: `They request control narratives, screenshots or exports that prove the control is operating, and sampling that shows the process repeats over time.`,
    },
    {
      question: `Can automation reduce effort here?`,
      answer: `Automation can collect evidence and standardize reviews, but owners still need to validate outputs and handle exceptions.`,
    },
    {
      question: `How does this tie to customer security reviews?`,
      answer: `Enterprise reviewers often mirror SOC 2 expectations. Having this area documented and evidenced makes those questionnaires faster.`,
    },
    {
      question: `Does this change for Type I vs Type II?`,
      answer: `Type II needs operating effectiveness evidence over time, so your sampling, logs, and approvals must show repeatability—budget extra time for that.`,
    },
  ];
}

function getRelatedPages(slug: string): Soc2GuidePage[] {
  const current = costGuideBySlug[slug];
  if (!current) return costGuides.filter(p => p.slug !== slug).slice(0, 4);

  // Filter by same category first
  const sameCategory = costGuides.filter(
    (page) => page.slug !== slug && page.category === current.category
  );

  // If we don't have enough in the same category, add from others
  if (sameCategory.length < 4) {
    const others = costGuides.filter(
      (page) => page.slug !== slug && page.category !== current.category
    );
    return [...sameCategory, ...others].slice(0, 4);
  }

  return sameCategory.slice(0, 4);
}

export async function generateStaticParams() {
  const guideSlugs = costGuides.map((page) => ({ slug: page.slug }));
  const industrySlugs = industryCostLinks.map((i) => ({ slug: i.slug }));
  const sizeSlugs = [
    { slug: '5-10-employees' },
    { slug: '10-50-employees' },
    { slug: '50-200-employees' },
  ];
  return [...guideSlugs, ...industrySlugs, ...sizeSlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = costGuideBySlug[params.slug];
  if (!page) return {};

  const url = `https://risclens.com${page.parent}/${page.slug}`;
  return {
    title: `${page.title} | SOC 2 Cost Guide | RiscLens`,
    description: page.summary,
    alternates: { canonical: `https://risclens.com${page.parent}/${page.slug}` },
    openGraph: {
      title: `${page.title} | SOC 2 Cost Guide | RiscLens`,
      description: page.summary,
      url,
      type: 'article',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | SOC 2 Cost Guide | RiscLens`,
      description: page.summary,
      images: ['/og.png'],
    },
  };
}

export default async function Soc2CostDetailPage({ params }: PageProps) {
  const staticPage = costGuideBySlug[params.slug];
  
  // Programmatic fallback for industries or company sizes not in static guides
  let programmaticPage = null;
  if (!staticPage) {
    const isIndustrySlug = industryCostLinks.some(i => i.slug === params.slug);
    const isSizeSlug = ['5-10-employees', '10-50-employees', '50-200-employees'].includes(params.slug);
    const topic = params.slug.startsWith('soc-2-cost-for-') 
      ? params.slug.replace('soc-2-cost-for-', '').replace(/-/g, ' ')
      : params.slug.replace(/-/g, ' ');

    if (params.slug.startsWith('soc-2-cost-for-') || isIndustrySlug || isSizeSlug) {
      programmaticPage = {
        slug: params.slug,
        title: `SOC 2 Cost for ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
        summary: `A specialized breakdown of SOC 2 compliance costs, audit fees, and implementation effort specifically for ${topic} organizations.`,
        category: 'cost' as const,
        parent: '/soc-2-cost',
        highlights: [
          `Industry-specific Trust Service Criteria (TSC) mapping for ${topic}.`,
          `Benchmarked auditor fees for ${topic} startups and enterprises.`,
          `Remediation priorities based on common ${topic} tech stacks.`,
        ],
      };
    }
  }

  const dbPage = await getContentPage(params.slug);
  
  const basePage = staticPage || programmaticPage;

  if (!basePage && !dbPage) {
    notFound();
  }

  const page = dbPage ? {
    ...basePage,
    title: dbPage.title,
    summary: dbPage.description,
    highlights: dbPage.content_json?.highlights || basePage?.highlights || [],
    faqs: dbPage.faqs || buildDefaultFaqs(dbPage.title),
    last_reviewed_at: dbPage.last_reviewed_at,
    framework_version: dbPage.framework_version,
    author_note: dbPage.author_note
    } : {
        ...basePage!,
        faqs: buildDefaultFaqs(basePage!.title),
        last_reviewed_at: new Date().toISOString(),
        framework_version: 'SOC 2 (2026)',
        author_note: undefined
      };


  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    dateModified: page.last_reviewed_at,
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const related = getRelatedPages(params.slug);

  return (
    <>
      <Script id={`faq-${params.slug}`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <Header />
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'SOC 2 Cost', href: '/soc-2-cost' }, { label: page.title }]} />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-16 text-center">
            <LastVerifiedBadge date={page.last_reviewed_at} framework={page.framework_version} />
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">SOC 2 Cost Guide</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">{page.title}</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">{page.summary}</p>
            <div className="flex justify-center">
              <AssessmentCTA />
            </div>
          </div>
        </section>

        <section className="bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
            {page.author_note && (
              <div className="p-4 rounded-lg bg-brand-50 border border-brand-100 text-brand-900 text-sm italic">
                <strong>Analyst Note:</strong> {page.author_note}
              </div>
            )}

            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p className="text-sm font-semibold text-slate-800">Why it matters</p>
              <p>{page.summary}</p>
              <ul className="space-y-2">
                {page.highlights.map((item: string) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">How to keep this cost predictable</h2>
              <ol className="list-decimal list-inside text-sm text-slate-700 space-y-2">
                <li>Define owners and timelines for this area before you sign an engagement letter.</li>
                <li>Capture evidence templates so control operators know exactly what to collect.</li>
                <li>Run a mini-walkthrough with your auditor to confirm expectations.</li>
              </ol>
              <Link href="/penetration-testing/for-soc-2" className="text-sm text-brand-700 underline underline-offset-4">
                Related: Penetration Testing for SOC 2
              </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">FAQ</h3>
              <div className="space-y-4">
                {page.faqs.map((faq: any) => (
                  <div key={faq.question}>
                    <p className="font-semibold text-slate-900">{faq.question}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-white">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Related</h3>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href={page.parent} className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                  Back to SOC 2 Cost Hub
                </Link>
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`${rel.parent}/${rel.slug}`}
                    className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200"
                  >
                    {rel.title}
                  </Link>
                ))}
              </div>
            </div>
            
            <ContentFeedback pageUrl={`/soc-2-cost/${params.slug}`} />

            <AccuracyDisclaimer />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
