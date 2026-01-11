import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { timelineGuides, timelineGuideBySlug, Soc2GuidePage } from '@/lib/soc2Guides';
import { industryCostLinks } from '@/lib/industryCostLinks';

interface PageProps {
  params: { slug: string };
}

const CTA_HREF = '/soc-2-readiness-calculator';

function buildFaqs(title: string) {
  return [
    {
      question: `How long does SOC 2 take for ${title}?`,
      answer: 'Timelines depend on readiness, tool stack, and how quickly you can gather evidence. Smaller teams can move faster by keeping scope lean and decisions centralized.',
    },
    {
      question: 'What slows SOC 2 timelines down?',
      answer: 'Unclear ownership, missing evidence, and last-minute scope additions create churn. Align on systems in scope and assign owners early.',
    },
    {
      question: 'When should we start readiness?',
      answer: 'Begin at least a few weeks before you want to sign an audit letter. That gives time to close gaps and plan observation windows.',
    },
    {
      question: 'How does Type II change the calendar?',
      answer: 'Type II adds an observation period. Plan for control operation evidence across that window and buffer extra time for sampling.',
    },
    {
      question: 'Where do pentests fit in the schedule?',
      answer: 'Schedule pentests before the observation window ends so remediation and retests are complete. Link findings to control evidence.',
    },
    {
      question: 'What should be parallelized?',
      answer: 'Policies, tooling, and early evidence collection can run in parallel. Keep a weekly cadence to unblock owners quickly.',
    },
  ];
}

function relatedPages(slug: string): Soc2GuidePage[] {
  const others = timelineGuides.filter((page) => page.slug !== slug);
  return others.slice(0, 3);
}

export async function generateStaticParams() {
  const guideSlugs = timelineGuides.map((page) => ({ slug: page.slug }));
  const industrySlugs = industryCostLinks.map((i) => ({ slug: i.slug }));
  return [...guideSlugs, ...industrySlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = timelineGuideBySlug[params.slug];
  if (!page) return {};
  const url = `https://risclens.com${page.parent}/${page.slug}`;
  return {
    title: `${page.title} | SOC 2 Timeline | RiscLens`,
    description: page.summary,
    alternates: { canonical: `${page.parent}/${page.slug}` },
    openGraph: {
      title: `${page.title} | SOC 2 Timeline | RiscLens`,
      description: page.summary,
      url,
      type: 'article',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | SOC 2 Timeline | RiscLens`,
      description: page.summary,
      images: ['/og.png'],
    },
  };
}

export default function Soc2TimelinePage({ params }: PageProps) {
  const staticPage = timelineGuideBySlug[params.slug];
  
  let page = staticPage;

  // Programmatic fallback for industries not in static guides
  if (!staticPage) {
    const industry = industryCostLinks.find(i => i.slug === params.slug);
    if (industry) {
      page = {
        slug: params.slug,
        title: `SOC 2 Timeline for ${industry.label}`,
        summary: `A typical SOC 2 compliance roadmap for ${industry.label} companies, including readiness, observation, and audit milestones.`,
        category: 'timeline',
        parent: '/soc-2-timeline',
        highlights: [
          `Readiness phase focused on ${industry.label}-specific controls.`,
          'Standard 3-6 month observation window for Type II reports.',
          'Audit field work and final report issuance timelines.',
        ],
      };
    }
  }

  if (!page) notFound();

  const faqs = buildFaqs(page.title);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const related = relatedPages(page.slug);

    return (
      <>
        <script
          id={`timeline-faq-${page.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <main className="min-h-screen flex flex-col bg-slate-100">
          <Header />
          <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
              <Breadcrumbs 
                items={[
                  { label: 'SOC 2 Timeline', href: '/soc-2-timeline' },
                  { label: page.title, href: '#' }
                ]}
              />
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-14 lg:pb-20 pt-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">SOC 2 Timeline</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">{page.title}</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">{page.summary}</p>
              <div className="flex justify-center">
                <Link
                  href={CTA_HREF}
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Estimate SOC 2 Timeline
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>


        <section className="bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
            <div className="space-y-3 text-slate-700 leading-relaxed">
              <p className="text-sm font-semibold text-slate-800">Timeline anchors</p>
              <p>{page.summary}</p>
              <ul className="space-y-2 text-sm">
                {page.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">How to stay on schedule</h2>
              <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                <li>Sequence pentests, policy approvals, and access reviews early.</li>
                <li>Hold weekly check-ins with control owners and your auditor.</li>
                <li>Lock observation start/end dates and keep evidence organized.</li>
              </ol>
              <Link href="/penetration-testing/for-soc-2" className="text-sm text-brand-700 underline underline-offset-4">
                Related: Penetration Testing for SOC 2
              </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">What extends the timeline</h3>
              <ul className="space-y-2 text-sm text-slate-700 leading-relaxed list-disc list-inside">
                {(page.delays && page.delays.length ? page.delays : [
                  'Late scope changes or vendor additions that expand sampling.',
                  'Missing change management or access evidence that needs backfill.',
                  'Observation window confusion for Type II engagements.',
                ]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">FAQ</h3>
              <div className="space-y-4">
                {faqs.map((faq) => (
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
                  Back to SOC 2 Timeline Hub
                </Link>
                {page.extraLinks?.map((link) => (
                  <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                    {link.label}
                  </Link>
                ))}
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`${rel.parent}/${rel.slug}`}
                    className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200"
                  >
                    {rel.title}
                  </Link>
                ))}
                <Link href="/penetration-testing/for-soc-2" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                  Penetration Testing for SOC 2
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
