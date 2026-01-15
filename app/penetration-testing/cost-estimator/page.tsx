import { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PentestEstimatorForm from '@/components/pentest/PentestEstimatorForm';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { HowItWorksAccordion } from '@/components/HowItWorksAccordion';
import { SoftwareApplicationSchema } from '@/components/SoftwareApplicationSchema';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';

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
    'Market-aligned pentest pricing based on scope, auth complexity, environments, retests, and timelines. Built for SOC 2 and enterprise security reviews.',
  alternates: { canonical: 'https://risclens.com/penetration-testing/cost-estimator' },
  openGraph: {
    title: 'Penetration Testing Cost Estimator | RiscLens',
    description:
      'Market-aligned pentest pricing based on scope, auth complexity, environments, retests, and timelines. Built for SOC 2 and enterprise security reviews.',
    url: 'https://risclens.com/penetration-testing/cost-estimator',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens pentest estimator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Penetration Testing Cost Estimator | RiscLens',
    description:
      'Market-aligned pentest pricing based on scope, auth complexity, environments, retests, and timelines. Built for SOC 2 and enterprise security reviews.',
    images: ['/og.png'],
  },
};

export default function PentestEstimatorPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <SoftwareApplicationSchema
        name="Pentest Cost Estimator"
        description="Market-aligned pentest pricing based on scope, auth complexity, and environments."
        url="https://risclens.com/penetration-testing/cost-estimator"
        category="SecurityApplication"
      />
      <Script id="pentest-estimator-breadcrumbs" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Pentest', href: '/penetration-testing' },
                { label: 'Cost Estimator' }
              ]} 
            />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-14 lg:pb-20 pt-4 text-center space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Penetration Testing</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Pentest Cost Estimator</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Market-aligned pentest pricing for committed buyers. Plan budgets based on scope, auth complexity, and retest requirements for SOC 2 and customer security reviews.
            </p>
            <p className="text-sm text-slate-500">Last updated: {lastUpdated}</p>
          </div>
        </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          <PentestEstimatorForm />
          <HowItWorksAccordion />
          <RelatedGuidesRow
            links={[
              { href: '/penetration-testing', label: 'Pentest Hub' },
              { href: '/penetration-testing/scoping', label: 'Scoping Worksheet' },
              { href: '/penetration-testing/preparation-checklist', label: 'Preparation Checklist' },
              { href: '/penetration-testing/pricing', label: 'Pricing Guide' },
              { href: '/penetration-testing/for-soc-2', label: 'Pentest for SOC 2' },
              { href: '/soc-2-cost', label: 'SOC 2 Cost Guide' },
            ]}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
