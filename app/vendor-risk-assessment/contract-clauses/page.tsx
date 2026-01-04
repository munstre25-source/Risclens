import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VendorRiskRelatedLinks } from '@/components/vendor-risk/VendorRiskRelatedLinks';

export const metadata: Metadata = {
  title: 'Vendor Risk Contract Clauses | RiscLens',
  description: 'Security addenda and DPA clauses that align with vendor risk tier—breach notice, audit rights, and control expectations.',
  alternates: { canonical: '/vendor-risk-assessment/contract-clauses' },
  openGraph: {
    title: 'Vendor Risk Contract Clauses | RiscLens',
    description: 'Security addenda and DPA clauses that align with vendor risk tier—breach notice, audit rights, and control expectations.',
    url: 'https://risclens.com/vendor-risk-assessment/contract-clauses',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Vendor Contracts' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendor Risk Contract Clauses | RiscLens',
    description: 'Security addenda and DPA clauses that align with vendor risk tier—breach notice, audit rights, and control expectations.',
    images: ['/og.png'],
  },
};

const clauses = [
  {
    title: 'Security addendum essentials',
    items: [
      'Breach notification timelines and required detail.',
      'Access control expectations (SSO, MFA, logging).',
      'Change management and incident response contacts.',
      'Right to request evidence by tier (SOC, pentest, diagrams).',
    ],
  },
  {
    title: 'Data Processing Agreement (if PII/PHI)',
    items: [
      'Lawful basis, purpose limitation, and data minimization.',
      'Subprocessor approval and notification requirements.',
      'Data residency/transfer terms and encryption standards.',
      'Retention and deletion SLAs, including backups.',
    ],
  },
  {
    title: 'For high-risk vendors',
    items: [
      'Audit/assessment rights scoped to security and privacy controls.',
      'Penetration test or independent assessment cadence.',
      'Business continuity and disaster recovery testing expectations.',
      'Stronger liability caps or carve-outs tied to data sensitivity.',
    ],
  },
];

export default function ContractClausesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-18 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Vendor Risk Assessment</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Contract Clauses</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Align security exhibits and DPAs with vendor risk tier so legal negotiations stay proportional and audit-ready.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            {clauses.map((clause) => (
              <div key={clause.title} className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
                <p className="text-sm font-semibold text-slate-900">{clause.title}</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {clause.items.map((item) => (
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
            <h2 className="text-lg font-semibold text-slate-900">Negotiation tips</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Scale requests to the tier; avoid slowing low-risk deals with heavy exhibits.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Accept equivalent evidence (e.g., ISO + bridge letter) when SOC timing is tight.</span></li>
              <li className="flex gap-2"><span className="text-brand-600">•</span><span>Clarify who must approve subprocessor additions and how notice is delivered.</span></li>
            </ul>
          </div>

          <VendorRiskRelatedLinks />
        </div>
      </section>
      <Footer />
    </main>
  );
}
