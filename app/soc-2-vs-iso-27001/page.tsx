import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GapCalculator } from '@/components/calculators/GapCalculator';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';

export const metadata: Metadata = {
  title: 'ISO 27001 vs SOC 2 Gap Calculator | RiscLens',
  description: 'Already have one framework? See exactly what\'s missing to achieve the next one. Calculate the gap effort between ISO 27001 and SOC 2.',
};

export default function Soc2VsIsoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'SOC 2', href: '/soc-2' }, { label: 'SOC 2 vs ISO 27001' }]} />
          <div className="text-center mb-16 pt-8">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              ISO 27001 vs SOC 2 Gap Calculator
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Compare frameworks and calculate the incremental effort required to bridge the gap between SOC 2 and ISO 27001.
            </p>
          </div>

          <GapCalculator />

          <div className="mt-20 bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Framework Overlap</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  SOC 2 and ISO 27001 share about 80% of the same security controls. If you have one, you are already well on your way to the other.
                </p>
                <ul className="space-y-4">
                  {[
                    'Shared focus on Logical Access and Change Management',
                    'Both require formal Risk Assessments',
                    'Common Evidence (Logs, Policies, Training)',
                    'Overlapping Vendor Management requirements'
                  ].map(item => (
                    <li key={item} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Differences</h2>
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-gray-900 mb-2">SOC 2 Focus</h3>
                    <p className="text-sm text-gray-600">Reporting on the effectiveness of controls over a specific period (Type II). Ideal for US-based SaaS companies.</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-gray-900 mb-2">ISO 27001 Focus</h3>
                    <p className="text-sm text-gray-600">Continuous improvement of an Information Security Management System (ISMS). Ideal for global enterprises.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <RelatedGuidesRow
              links={[
                { href: '/soc-2-readiness-checklist', label: 'SOC 2 Checklist' },
                { href: '/soc-2-evidence', label: 'Evidence Vault' },
                { href: '/soc-2-cost', label: 'SOC 2 Cost' },
                { href: '/soc-2-timeline', label: 'SOC 2 Timeline' },
                { href: '/vendor-risk-assessment', label: 'Vendor Risk Hub' },
              ]}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
