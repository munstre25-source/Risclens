import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import DefinitionCallout from '@/components/DefinitionCallout';
import { ContentFeedback } from '@/components/ContentFeedback';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { readinessGuides, readinessGuideBySlug, Soc2GuidePage } from '@/lib/soc2Guides';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import { authors } from '@/lib/authors';
import { getContentPage } from '@/lib/content';
import { LastVerifiedBadge, AccuracyDisclaimer } from '@/components/AccuracyGuards';

interface PageProps {
  params: { slug: string };
}

function buildDefaultFaqs(title: string) {
  return [
    {
      question: `Why does ${title} matter for SOC 2?`,
      answer: `${title} is a core control area auditors test for design and operating effectiveness. Clear ownership and repeatable evidence keep reviews smooth.`,
    },
    {
      question: 'What evidence should we prepare?',
      answer: 'Policies, procedures, screenshots or exports, and ticket history showing the control operating over time. Tie each item to a control owner.',
    },
    {
      question: 'How often should we review this control?',
      answer: 'Set a realistic cadence—monthly or quarterly for most controls—and document each review with approvals and any exceptions.',
    },
    {
      question: 'How do we scale this as we grow?',
      answer: 'Automate where possible, assign backups for each owner, and add monitoring so exceptions are caught quickly.',
    },
    {
      question: 'Does this map to customer security questionnaires?',
      answer: 'Yes. Showing a mature control here speeds up vendor due diligence because you can point to evidence and runbooks.',
    },
    {
      question: 'What if we have gaps?',
      answer: 'Document compensating controls, time-bound remediation, and track follow-up. Auditors want transparency more than perfection.',
    },
  ];
}

function relatedPages(slug: string): Soc2GuidePage[] {
  const others = readinessGuides.filter((page) => page.slug !== slug);
  return others.slice(0, 4);
}

export async function generateStaticParams() {
  return readinessGuides.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = readinessGuideBySlug[params.slug];
  if (!page) return {};
  const url = `https://risclens.com/soc-2-readiness/${page.slug}`;
  return {
    title: `${page.title} | SOC 2 Readiness Guide | RiscLens`,
    description: page.summary,
    alternates: { canonical: `/soc-2-readiness/${page.slug}` },
    openGraph: {
      title: `${page.title} | SOC 2 Readiness Guide | RiscLens`,
      description: page.summary,
      url,
      type: 'article',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | SOC 2 Readiness Guide | RiscLens`,
      description: page.summary,
      images: ['/og.png'],
    },
  };
}

export default async function Soc2ReadinessGuidePage({ params }: PageProps) {
  const staticPage = readinessGuideBySlug[params.slug];
  const dbPage = await getContentPage(params.slug);

  if (!staticPage && !dbPage) notFound();

  const page = dbPage ? {
    ...staticPage,
    title: dbPage.title,
    summary: dbPage.description,
    highlights: dbPage.content_json?.highlights || staticPage?.highlights || [],
    faqs: dbPage.faqs || buildDefaultFaqs(dbPage.title),
    last_reviewed_at: dbPage.last_reviewed_at,
    framework_version: dbPage.framework_version || 'SOC 2 (2025)',
    author_note: dbPage.author_note
    } : {
      ...staticPage!,
      faqs: buildDefaultFaqs(staticPage!.title),
      last_reviewed_at: new Date().toISOString(),
      framework_version: 'SOC 2 (2025)',
      author_note: undefined
    };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    dateModified: page.last_reviewed_at,
    mainEntity: page.faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const related = relatedPages(params.slug);
  const author = authors.raphael;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    url: `https://risclens.com/about`,
    sameAs: author.linkedIn ? [author.linkedIn] : [],
  };

  return (
    <>
      <Script
        id={`readiness-faq-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id={`author-schema-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <Header />
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'SOC 2', href: '/soc-2' },
                { label: 'Readiness', href: '/soc-2-readiness-index' },
                { label: page.title }
              ]}
            />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-14 lg:pb-20 pt-4 text-center">
            <LastVerifiedBadge date={page.last_reviewed_at} framework={page.framework_version} />
            <div className="flex justify-center mb-6">
              <VerifiedBy authorId="raphael" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">SOC 2 Readiness</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">{page.title}</h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">{page.summary}</p>
            <div className="flex justify-center">
              <AssessmentCTA />
            </div>
            {params.slug === 'vendor-management' && (
              <div className="max-w-3xl mx-auto mt-6">
                <DefinitionCallout
                  title="What is a vendor risk assessment?"
                  description="A vendor risk assessment (VRA) evaluates a third-party provider’s security and operational risk before sharing data or granting access. It typically includes a questionnaire, evidence review (e.g., SOC 2/ISO), and a risk rating that determines required controls and reassessment frequency."
                  linkKey="vendorRiskOverview"
                />
              </div>
            )}
            {params.slug === 'vulnerability-management' && (
              <div className="max-w-3xl mx-auto mt-6">
                <DefinitionCallout
                  title="What is penetration testing?"
                  description="Penetration testing is a time-boxed security assessment where a qualified tester simulates real attacks to identify and validate exploitable weaknesses in an application, API, network, or cloud environment. It helps teams prioritize fixes based on real-world impact, not just theoretical findings."
                  linkKey="penetrationTestingForSoc2"
                />
              </div>
            )}
          </div>
        </section>

        <section className="bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
            {page.author_note && (
              <div className="p-4 rounded-lg bg-brand-50 border border-brand-100 text-brand-900 text-sm italic">
                <strong>Analyst Note:</strong> {page.author_note}
              </div>
            )}

            <div className="space-y-3 text-slate-700 leading-relaxed">
              <p className="text-sm font-semibold text-slate-800">Control expectations</p>
              <p>{page.summary}</p>
              <ul className="space-y-2 text-sm">
                {page.highlights.map((item: string) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">Make it audit-ready</h2>
              <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                <li>Document the policy, procedure, and evidence path for this control.</li>
                <li>Assign owners and a cadence, then track reviews in one place.</li>
                <li>Bundle pentest findings, access reviews, or logs that prove it works.</li>
              </ol>
              <Link href="/penetration-testing/compliance-buyers" className="text-sm text-brand-700 underline underline-offset-4">
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

              <AuthorBio authorId="raphael" />

              <ContentFeedback pageUrl={`/soc-2-readiness/${params.slug}`} />

              <div className="border border-slate-200 rounded-xl p-6 bg-white">

              <h3 className="text-lg font-semibold text-slate-900 mb-3">Related</h3>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href={page.parent} className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                  Back to Readiness Hub
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
                <Link href="/penetration-testing/compliance-buyers" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                  Penetration Testing for SOC 2
                </Link>
              </div>
            </div>
            
            <AccuracyDisclaimer />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
