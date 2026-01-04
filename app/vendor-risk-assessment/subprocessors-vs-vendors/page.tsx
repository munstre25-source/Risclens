import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VendorRiskRelatedLinks } from '@/components/vendor-risk/VendorRiskRelatedLinks';

export const metadata: Metadata = {
  title: 'Subprocessors vs Vendors in SOC 2 | RiscLens',
  description: 'Differentiate subprocessors from vendors, track chains of custody, and set the right evidence expectations.',
  alternates: { canonical: '/vendor-risk-assessment/subprocessors-vs-vendors' },
  openGraph: {
    title: 'Subprocessors vs Vendors in SOC 2 | RiscLens',
    description: 'Differentiate subprocessors from vendors, track chains of custody, and set the right evidence expectations.',
    url: 'https://risclens.com/vendor-risk-assessment/subprocessors-vs-vendors',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Subprocessors vs Vendors' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subprocessors vs Vendors in SOC 2 | RiscLens',
    description: 'Differentiate subprocessors from vendors, track chains of custody, and set the right evidence expectations.',
    images: ['/og.png'],
  },
};

const points = [
  {
    title: 'How they differ',
    items: [
      'Vendors provide services directly to you; subprocessors are vendors your vendor relies on to deliver service to you.',
      'Customers expect transparency for both when their data is involved.',
      'Contractual rights may flow differently; subprocessors often need pre-approval or notice.',
    ],
  },
  {
    title: 'What to track',
    items: [
      'Data types, regions, and residency for each subprocessor.',
      'Security reports (SOC/ISO) and change notifications.',
      'Incident history and breach notice commitments.',
    ],
  },
  {
    title: 'Practical handling',
    items: [
      'Require vendors to disclose subprocessors and update you before changes.',
      'Map evidence asks to the highest-risk element in the chain.',
      'Terminate or escalate cadence if unapproved subprocessors appear.',
    ],
  },
];

export default function SubprocessorsVsVendorsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-18 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Vendor Risk Assessment</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Subprocessors vs Vendors</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Make subprocessor visibility part of your vendor risk playbook so SOC 2 evidence and contracts stay accurate.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            {points.map((section) => (
              <div key={section.title} className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
                <p className="text-sm font-semibold text-slate-900">{section.title}</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-brand-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Evidence you can request</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Subprocessor register with services, regions, and certifications.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Notification process for additions/changes with lead time.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Flow-down of security obligations and incident notice.</span></li>
            </ul>
          </div>

          <VendorRiskRelatedLinks />
        </div>
      </section>
      <Footer />
    </main>
  );
}
