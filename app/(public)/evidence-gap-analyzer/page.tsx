import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { EvidenceGapAnalyzer } from "@/components/compliance/EvidenceGapAnalyzer";
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { Metadata } from 'next';
import { AdvancedSchema } from '@/components/AdvancedSchema';

export const metadata: Metadata = {
  title: "SOC 2 Evidence Gap Analyzer | AI-Powered Policy Review | Risclens",
  description: "Upload your existing security policy (PDF) and identify gaps against SOC 2 Trust Services Criteria using AI. Map your documentation to controls in minutes.",
  openGraph: {
    images: ['/og-evidence-gap-analyzer.png'],
  },
};

export default function EvidenceGapAnalyzerPage() {
  const faqItems = [
    {
      question: "How does the AI analyze my policy?",
      answer: "Our AI uses large language models specifically trained on SOC 2 Trust Services Criteria to parse your document and identify where your current controls meet or miss standard requirements."
    },
    {
      question: "Is my data stored during analysis?",
      answer: "No. Your PDF is processed securely and is not stored permanently on our servers. The analysis is done in real-time to identify gaps and provide immediate recommendations."
    }
  ];

  const softwareApp = {
    name: "Evidence Gap Analyzer",
    description: "AI-powered tool that maps security policies to SOC 2 controls to identify documentation gaps.",
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
            Evidence Gap Analyzer
          </h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto">
            Upload your existing security policy (PDF) and our AI will map it against SOC 2 Trust Services Criteria to identify what's missing.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-20">
        <EvidenceGapAnalyzer />
        
        <div className="mt-16 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Policy Mapping Matters</h2>
          <div className="grid md:grid-cols-2 gap-8 not-prose">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Identify Audit Roadblocks Early</h3>
              <p className="text-sm text-slate-600">
                Most audit delays happen because documentation doesn't explicitly address specific SOC 2 controls. Find these gaps before your auditor does.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Save Hundreds of Manual Hours</h3>
              <p className="text-sm text-slate-600">
                Manual cross-referencing between policies and the SOC 2 framework can take days. AI reduces this initial mapping to just a few minutes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Immediate Recommendations</h3>
              <p className="text-sm text-slate-600">
                Don't just see what's missing—get actionable advice on what content to add to your policies to satisfy Trust Services Criteria.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Secure & Private</h3>
              <p className="text-sm text-slate-600">
                Your policies contain sensitive information. We process them securely and ensure no permanent storage of your uploaded documents.
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
