import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AccuracyDisclaimer, LastVerifiedBadge } from '@/components/AccuracyGuards';
import { getPSEOPageBySlug } from '@/lib/pseo';
import { getIndustryGuideClusters } from '@/lib/pseo-internal-links';
import { InternalLinks, InternalLinksInline } from '@/components/InternalLinks';

interface PageProps {
  params: {
    framework: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPSEOPageBySlug(params.slug);
  if (!page) return {};

  return {
    title: `${page.title} | Compliance Guide | RiscLens`,
    description: page.meta_description,
    alternates: { canonical: `/compliance/${params.framework}/${params.slug}` },
  };
}

export default async function PSEOCompliancePage({ params }: PageProps) {
  const page = await getPSEOPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  const { content_json: content } = page;
  const internalLinks = await getIndustryGuideClusters(params.framework, params.slug);

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' }, 
              { label: 'Compliance', href: '/compliance' }, 
              { label: page.pseo_frameworks?.name || 'Framework', href: `/compliance/${params.framework}` },
              { label: page.title }
            ]} 
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-20 text-center">
          <LastVerifiedBadge date={page.updated_at} framework={page.pseo_frameworks?.name} />
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {page.title}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            {content.summary}
          </p>
          <div className="flex justify-center">
            <AssessmentCTA />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-16">
              <div className="prose prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Compliance Highlights</h2>
                <div className="grid sm:grid-cols-1 gap-4">
                  {content.highlights.map((highlight: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-slate-700 text-lg">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-900 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-4">Ready to accelerate your {page.pseo_frameworks?.name} journey?</h2>
                  <p className="text-brand-100 text-lg mb-8 max-w-2xl">
                    Our experts help {page.pseo_industries?.name} companies navigate compliance 3x faster with automated evidence collection and pre-built control mapping.
                  </p>
                  <AssessmentCTA variant="outline" className="bg-white text-brand-900 hover:bg-brand-50 border-none" />
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full -mr-32 -mt-32 opacity-50" />
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
                <div className="grid gap-6">
                  {content.faqs.map((faq: any, idx: number) => (
                    <div key={idx} className="border-b border-slate-200 pb-6 last:border-0">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">{faq.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <InternalLinksInline clusters={internalLinks} />
              <AccuracyDisclaimer />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <InternalLinks clusters={internalLinks} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
