import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import controls from '@/src/content/soc2ReadinessControls';

const getControl = (slug: string) => controls.find((c) => c.slug === slug);

export async function generateStaticParams() {
  const slugs = controls.map((c) => ({ slug: c.slug }));
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('Readiness controls (learn) static params', controls.map((c) => c.slug));
  }
  return slugs;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const control = getControl(params.slug);
  if (!control) return {};
  const url = `https://risclens.com/learn/soc-2-readiness/${control.slug}`;
  return {
    title: `${control.title} | SOC 2 Readiness Control | RiscLens`,
    description: control.summary,
    alternates: { canonical: `https://risclens.com/learn/soc-2-readiness/${control.slug}` },
    openGraph: {
      title: `${control.title} | SOC 2 Readiness Control | RiscLens`,
      description: control.summary,
      url,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${control.title} | SOC 2 Readiness Control | RiscLens`,
      description: control.summary,
      images: ['/og.png'],
    },
  };
}

export default function ReadinessControlPage({ params }: { params: { slug: string } }) {
  const control = getControl(params.slug);
  if (!control) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: control.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

    const relatedControls = controls.filter((c) => control.related.includes(c.slug)).slice(0, 4);
  
    return (
      <main className="min-h-screen flex flex-col bg-slate-100">
        <script
          id={`faq-${control.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <Header />


      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">SOC 2 Readiness Control</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">{control.title}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">{control.summary}</p>
          <div className="mt-6">
            <Link
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-3 rounded-lg shadow-sm transition"
            >
              Get Readiness Score
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="space-y-3 text-slate-700 leading-relaxed">
            <h2 className="text-lg font-semibold text-slate-900">Why auditors care</h2>
            <p>{control.subtitle}</p>
            <p>Demonstrate clear ownership, evidence, and cadence to show this control operates consistently.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">What to implement</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Assign an owner and set a review cadence.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Document the policy, procedure, and escalation path.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Track exceptions with remediation dates.</span></li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">Evidence auditors expect</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Dated records of reviews or approvals.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Screenshots/exports showing configurations and coverage.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Tickets proving remediation or follow-up.</span></li>
              </ul>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">Common mistakes</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Unowned control with no cadence.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Evidence not tied to who/when/what changed.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>No process for exceptions or emergency changes.</span></li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">FAQ</h3>
            <div className="space-y-3">
              {control.faqs.map((faq) => (
                <div key={faq.q}>
                  <p className="font-semibold text-slate-900">{faq.q}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Related controls</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/learn/soc-2-readiness" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                Back to Readiness Hub
              </Link>
              {relatedControls.map((item) => (
                <Link
                  key={item.slug}
                  href={`/learn/soc-2-readiness/${item.slug}`}
                  className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200"
                >
                  {item.title}
                </Link>
              ))}
              <Link href="/soc-2-readiness-calculator" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                Get Readiness Score
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
