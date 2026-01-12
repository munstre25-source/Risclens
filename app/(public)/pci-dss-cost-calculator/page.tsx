import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PciCostCalculator } from '@/components/calculators/PciCostCalculator';
import { Metadata } from 'next';
import { SoftwareApplicationSchema } from '@/components/SoftwareApplicationSchema';

export const metadata: Metadata = {
  title: 'PCI DSS Cost Calculator | 2026 Merchant & QSA Pricing Estimator',
  description: 'Estimate your total PCI DSS compliance budget including QSA fees, ASV scans, penetration testing, and internal resource allocation.',
};

export default function PciCostPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SoftwareApplicationSchema
        name="PCI DSS Cost Calculator"
        description="Estimate total PCI DSS compliance costs based on Merchant Level and SAQ type."
        url="https://risclens.com/pci-dss-cost-calculator"
        category="BusinessApplication"
      />
      <Header />
      
      <main className="flex-grow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight mb-4">
              PCI DSS Compliance Cost Estimator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get an instant estimate of your total annual PCI budget based on transaction volume, scope, and technical complexity.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <PciCostCalculator />
          </div>

          <div className="mt-24 max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Breaking Down PCI Compliance Costs</h2>
            <div className="grid md:grid-cols-2 gap-8 not-prose">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Merchant Level Impact</h3>
                <p className="text-sm text-gray-600">
                  Level 1 merchants (6M+ transactions) require a Report on Compliance (ROC) signed by a QSA, costing significantly more than Level 2-4 Self-Assessment Questionnaires (SAQ).
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">ASV & Pentest Fees</h3>
                <p className="text-sm text-gray-600">
                  Regardless of level, most PCI paths require quarterly external scans by an Approved Scanning Vendor (ASV) and an annual penetration test.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">SAQ-A vs. SAQ-D</h3>
                <p className="text-sm text-gray-600">
                  By using redirects (SAQ-A), you can reduce your compliance scope and costs by up to 70% compared to handling card data via Direct API (SAQ-D).
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Automation Savings</h3>
                <p className="text-sm text-gray-600">
                  Compliance software can reduce manual evidence collection time by hundreds of hours, paying for itself in reduced internal engineering opportunity cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
