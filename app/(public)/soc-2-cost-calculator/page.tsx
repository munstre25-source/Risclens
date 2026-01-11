import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Soc2CostCalculator } from '@/components/calculators/Soc2CostCalculator';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { Metadata } from 'next';
import { AdvancedSchema } from '@/components/AdvancedSchema';

export const metadata: Metadata = {
  title: 'SOC 2 Cost Calculator | 2026 Audit & Software Pricing Estimator',
  description: 'Estimate your total SOC 2 compliance costs including audit fees, automation software (Vanta/Drata), penetration testing, and internal resource allocation.',
  openGraph: {
    images: ['/og-cost-calculator.png'],
  },
};

export default function Soc2CostCalculatorPage() {
  const faqItems = [
    {
      question: "How much does a SOC 2 audit cost?",
      answer: "A SOC 2 Type I audit typically costs between $10,000 and $20,000, while a Type II audit can range from $30,000 to $60,000+ depending on company size and complexity."
    },
    {
      question: "Does the calculator include software costs?",
      answer: "Yes, the calculator includes estimates for compliance automation software like Vanta, Drata, and Secureframe, which typically range from $10,000 to $20,000 per year."
    }
  ];

  const softwareApp = {
    name: "SOC 2 Cost Calculator",
    description: "Instant estimate of total SOC 2 compliance budget based on company size and audit type.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <AdvancedSchema faq={faqItems} softwareApp={softwareApp} />
      <Header />
      
      <div className="bg-brand-900 pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight mb-4">
            SOC 2 Cost Calculator
          </h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto">
            Get an instant estimate of your total compliance budget based on company size, audit type, and tooling choices.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-20">
        <Soc2CostCalculator />
        
        <div className="mt-16 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Understanding SOC 2 Cost Drivers</h2>
          <div className="grid md:grid-cols-2 gap-8 not-prose">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Audit Type (Type I vs Type II)</h3>
              <p className="text-sm text-slate-600">
                A Type I audit is a snapshot in time and is generally cheaper ($10k-$20k). A Type II audit covers a period (3-12 months) and requires more testing, costing significantly more ($30k-$60k+).
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Automation vs. Manual</h3>
              <p className="text-sm text-slate-600">
                Compliance platforms like Vanta or Drata cost $10k-$20k/year but can reduce auditor fees by up to 30% and save hundreds of engineering hours.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Internal Opportunity Cost</h3>
              <p className="text-sm text-slate-600">
                Often overlooked, compliance takes 200-400+ hours of staff time. At $150/hr, this is a "hidden" cost of $30k-$60k that must be budgeted.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Penetration Testing</h3>
              <p className="text-sm text-slate-600">
                Most auditors require a fresh penetration test (within 12 months). Depending on scope, expect to pay $7k-$15k for a quality assessment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedGuidesRow />
      <Footer />
    </main>
  );
}
