import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VendorTieringTool } from '@/components/calculators/VendorTieringTool';

export const metadata: Metadata = {
  title: 'Vendor Tiering Logic Tool | RiscLens',
  description: 'Instantly categorize your vendors into risk tiers to determine necessary security reviews. Standardize your vendor risk management process.',
};

export default function VendorTieringPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                Vendor Tiering Logic Tool
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Standardize your vendor risk management for audit execution. Right-size security reviews and eliminate operational bottlenecks before your next SOC 2 audit.
              </p>
            </div>

          <VendorTieringTool />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Why Tiering Matters</h3>
              <p className="text-gray-600">
                SOC 2 auditors look for a consistent, risk-based approach to vendor management. If you treat your coffee supplier the same as your cloud provider, you're doing it wrong.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-brand-600 font-bold mr-2">•</span>
                  <span className="text-sm text-gray-600"><strong>Efficiency:</strong> Focus your security team's time where it matters most.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-600 font-bold mr-2">•</span>
                  <span className="text-sm text-gray-600"><strong>Compliance:</strong> Meet SOC 2 CC9.1 requirements with a documented process.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-600 font-bold mr-2">•</span>
                  <span className="text-sm text-gray-600"><strong>Risk Reduction:</strong> Identify high-risk "shadow IT" before it becomes a problem.</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tier Definitions</h3>
              <div className="space-y-4">
                <div className="pb-4 border-b">
                  <span className="text-sm font-bold text-red-600">Tier 1: Critical</span>
                  <p className="text-xs text-gray-500">Access to production data or critical core service. Requires full SOC 2 review.</p>
                </div>
                <div className="pb-4 border-b">
                  <span className="text-sm font-bold text-orange-600">Tier 2: High</span>
                  <p className="text-xs text-gray-500">Access to PII or important business data. Requires security questionnaire.</p>
                </div>
                <div>
                  <span className="text-sm font-bold text-blue-600">Tier 3/4: Medium/Low</span>
                  <p className="text-xs text-gray-500">Public data or non-critical services. Basic terms review only.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
