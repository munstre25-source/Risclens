import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PciReadinessCalculator } from '@/components/calculators/PciReadinessCalculator';
import { Metadata } from 'next';
import { SoftwareApplicationSchema } from '@/components/SoftwareApplicationSchema';

export const metadata: Metadata = {
  title: 'PCI DSS Readiness Scorecard | PCI 4.0 Compliance Gap Analysis',
  description: 'Identify technical gaps against the 12 PCI DSS requirements and get an instant readiness score for your Merchant Level.',
};

export default function PciReadinessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SoftwareApplicationSchema
        name="PCI DSS Readiness Scorecard"
        description="Identify technical gaps against the 12 PCI DSS requirements."
        url="https://risclens.com/pci-dss-readiness-calculator"
        category="SecurityApplication"
      />
      <Header />
      
      <main className="flex-grow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight mb-4">
              PCI DSS 4.0 Readiness Scorecard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Answer 12 questions to identify gaps in your cardholder data environment (CDE) before your QSA audit.
            </p>
          </div>

          <PciReadinessCalculator />

          <div className="mt-24 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How We Score Your PCI Readiness</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center font-bold mb-4">01</div>
                <h3 className="font-bold text-gray-900 mb-2">Technical Gaps</h3>
                <p className="text-sm text-gray-600">We map your inputs directly to the 12 core PCI requirements to identify missing technical controls.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center font-bold mb-4">02</div>
                <h3 className="font-bold text-gray-900 mb-2">Merchant Levels</h3>
                <p className="text-sm text-gray-600">Merchant Levels 1-4 dictate whether you need an on-site ROC or a self-assessment SAQ.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center font-bold mb-4">03</div>
                <h3 className="font-bold text-gray-900 mb-2">Cost Projection</h3>
                <p className="text-sm text-gray-600">Estimates include QSA fees, ASV scanning costs, and internal engineering effort required.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
