import { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PentestEstimatorForm from '@/components/pentest/PentestEstimatorForm';
import { HowItWorksAccordion } from '@/components/HowItWorksAccordion';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://risclens.com/' },
    { '@type': 'ListItem', position: 2, name: 'Penetration Testing', item: 'https://risclens.com/penetration-testing' },
    { '@type': 'ListItem', position: 3, name: 'Cost Estimator', item: 'https://risclens.com/penetration-testing/cost-estimator' },
  ],
};

export const metadata: Metadata = {
  title: 'Penetration Testing Cost Estimator | RiscLens',
  description:
    'Deterministic pentest pricing based on scope, auth complexity, environments, retests, and timelines. Built for SOC 2 and enterprise security reviews.',
  alternates: { canonical: '/penetration-testing/cost-estimator' },
  openGraph: {
    title: 'Penetration Testing Cost Estimator | RiscLens',
    description:
      'Deterministic pentest pricing based on scope, auth complexity, environments, retests, and timelines. Built for SOC 2 and enterprise security reviews.',
    url: 'https://risclens.com/penetration-testing/cost-estimator',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens pentest estimator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Penetration Testing Cost Estimator | RiscLens',
    description:
      'Deterministic pentest pricing based on scope, auth complexity, environments, retests, and timelines. Built for SOC 2 and enterprise security reviews.',
    images: ['/og.png'],
  },
};

export default function PentestEstimatorPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="pentest-estimator-breadcrumbs" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Penetration Testing</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Pentest Cost Estimator</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Plan pentest budgets without guarantees. Set scope, auth complexity, environments, retests, and timelines to see deterministic pricing aligned to SOC 2 and customer security reviews.
          </p>
          <p className="text-sm text-slate-500">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-6">
          <PentestEstimatorForm />
          <HowItWorksAccordion />
        </div>
      </section>
      <Footer />
    </main>
  );
}
