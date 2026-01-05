import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VendorRiskRoiCalculator from '@/components/vendor-risk/VendorRiskRoiCalculator';
import Link from 'next/link';
import { SoftwareApplicationSchema } from '@/components/SoftwareApplicationSchema';

export const metadata: Metadata = {
  title: 'Vendor Risk Management ROI Calculator | RiscLens',
  description: 'Calculate the annual savings and efficiency gains by automating your vendor security assessments and questionnaire reviews.',
  openGraph: {
    title: 'Vendor Risk Management ROI Calculator | RiscLens',
    description: 'Calculate your annual savings from automating vendor risk assessments.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens ROI Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendor Risk Management ROI Calculator | RiscLens',
    description: 'Calculate your annual savings from automating vendor risk assessments.',
    images: ['/og.png'],
  },
};

export default function VendorRiskRoiPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <SoftwareApplicationSchema
        name="Vendor Risk Management ROI Calculator"
        description="Calculate the annual savings and efficiency gains by automating your vendor security assessments."
        url="https://risclens.com/vendor-risk-assessment/roi-calculator"
        category="BusinessApplication"
      />
      <Header />
      
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">Efficiency Calculator</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Vendor Risk Management <br className="hidden sm:block" /> ROI Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stop wasting engineering and security hours on manual questionnaire reviews. See how much you could save by standardizing your VRM program.
          </p>
        </div>
      </section>

      <section className="flex-grow py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <VendorRiskRoiCalculator />
          
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Why ROI matters in VRM</h2>
              <p className="text-slate-600 leading-relaxed">
                Most security teams spend 15-20 hours per vendor on initial assessments. For a company with 50 vendors, that's nearly 1,000 hours of high-cost engineering time spent on repetitive data entry and document review.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Automation doesn't just save money; it reduces "vendor friction" and helps your team stay focused on actual risk remediation rather than administrative overhead.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Next Steps</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">1</div>
                  <p className="text-sm text-slate-600"><span className="font-semibold text-slate-900">Download the VRM Triage Template</span> to standardize how you tier vendors by risk.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">2</div>
                  <p className="text-sm text-slate-600"><span className="font-semibold text-slate-900">Run a Triage Assessment</span> to see which of your current vendors need immediate review.</p>
                </li>
              </ul>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/vendor-risk-assessment/triage" 
                  className="flex-1 bg-slate-900 text-white text-center font-semibold py-3 rounded-lg hover:bg-slate-800 transition"
                >
                  Start Triage
                </Link>
                <Link 
                  href="/vendor-risk-program" 
                  className="flex-1 bg-white border border-slate-200 text-slate-900 text-center font-semibold py-3 rounded-lg hover:bg-slate-50 transition"
                >
                  View Program Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
