import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  Shield, 
  ArrowRight, 
  FileCheck,
  ClipboardCheck,
  Search,
  Users,
  AlertTriangle,
  Scale,
  Database,
  Lock,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Vendor Risk Questionnaire | 2026 Procurement Template | RiscLens',
  description:
    'Download and use our comprehensive AI Vendor Risk Questionnaire. Specifically designed for evaluating LLM providers, GenAI startups, and traditional vendors with AI features.',
  openGraph: {
    title: 'AI Vendor Risk Questionnaire | RiscLens',
    description: 'Evaluate AI vendors with confidence. 50+ specialized questions for AI risk management.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Vendor Risk Questionnaire' }],
  },
  alternates: {
    canonical: 'https://risclens.com/ai-governance/vendor-risk-questionnaire',
  },
};

const questionnaireSections = [
  {
    title: 'Data & Model Privacy',
    icon: Lock,
    questions: [
      'Is customer data used to train your foundational models?',
      'Do you support Zero-Retention (API) for high-sensitivity data?',
      'What are your data isolation mechanisms between different customers?',
      'How do you handle PII/PHI redaction before model processing?'
    ]
  },
  {
    title: 'Model Governance & Safety',
    icon: Shield,
    questions: [
      'What is your process for red-teaming new model releases?',
      'Do you provide an AI System Impact Assessment (AISIA)?',
      'How are hallucinations and biases monitored and reported?',
      'What guardrail technologies (e.g., LlamaGuard) are implemented?'
    ]
  },
  {
    title: 'Legal & Regulatory',
    icon: Scale,
    questions: [
      'Are you compliant with the EU AI Act risk tiering requirements?',
      'Do you offer indemnification for copyright infringement by GenAI output?',
      'What is your opt-out policy for data usage in diagnostic improvements?',
      'Is your AI system registered in the EU database (if applicable)?'
    ]
  },
  {
    title: 'Operational Resilience',
    icon: Zap,
    questions: [
      'What is your fallback mechanism if the LLM provider experiences downtime?',
      'How do you handle rate limits and capacity surges for enterprise users?',
      'What is the frequency of security audits for your AI infrastructure?',
      'Do you have a vulnerability disclosure program specifically for AI assets?'
    ]
  }
];

export default function AIVendorQuestionnaire() {
  const breadcrumbItems = [
    { label: 'AI Governance', href: '/ai-governance' },
    { label: 'Vendor Questionnaire', href: '/ai-governance/vendor-risk-questionnaire' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title="AI Vendor Risk Questionnaire"
        description="A comprehensive template for evaluating AI vendors."
        url="https://risclens.com/ai-governance/vendor-risk-questionnaire"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Governance', item: 'https://risclens.com/ai-governance' },
          { name: 'Vendor Questionnaire', item: 'https://risclens.com/ai-governance/vendor-risk-questionnaire' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-indigo-900 text-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                AI Vendor Risk <br />
                <span className="text-indigo-300">Questionnaire Template</span>
              </h1>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                Standard security questionnaires fail to capture the nuances of AI risk. 
                Use this programmatic template to audit LLM providers, GenAI startups, and SaaS vendors with AI features.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-indigo-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Download CSV Template
                </button>
                <Link
                  href="/ai-governance/vendor-audit-template"
                  className="bg-indigo-700 text-white border border-indigo-500 font-bold px-8 py-4 rounded-xl hover:bg-indigo-600 transition-all flex items-center gap-2"
                >
                  View Audit Guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-12">
                {questionnaireSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <div key={section.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-indigo-500 transition-all shadow-sm">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                      </div>
                      <div className="space-y-4">
                        {section.questions.map((q, i) => (
                          <div key={i} className="flex gap-3 items-start p-4 bg-white rounded-lg border border-slate-100">
                            <span className="w-6 h-6 bg-slate-100 text-slate-500 text-xs font-bold rounded flex items-center justify-center shrink-0">Q{i+1}</span>
                            <p className="text-slate-700 font-medium leading-relaxed">{q}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="md:sticky md:top-8 h-fit space-y-8">
                <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-3 text-indigo-700 font-bold mb-4">
                    <AlertTriangle className="w-5 h-5" />
                    Crucial Red Flag
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">The "Training Leak" Clause</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    If a vendor cannot confirm that your data is <strong>excluded</strong> from their model training weights, they are effectively using your IP to subsidize their R&D. This is the #1 risk for enterprise procurement in 2026.
                  </p>
                  <div className="p-4 bg-white rounded-xl border border-indigo-200 text-sm italic text-slate-500">
                    "Look for 'Zero Data Retention' (ZDR) clauses in their Terms of Service before signing."
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Programmatic Enrichment</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Don't just trust their answers. Use RiscLens to scan their domain for:
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm">
                      <Search className="w-4 h-4 text-indigo-400" />
                      Hidden LLM API calls in their JS bundles
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-indigo-400" />
                      Social proof of enterprise-grade AI safety
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Database className="w-4 h-4 text-indigo-400" />
                      Infrastructure provider (AWS vs Azure vs Anthropic)
                    </li>
                  </ul>
                  <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-2">
                    Enrich Vendor via Domain
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Need a formal Audit Template?</h2>
            <p className="text-lg text-slate-600 mb-10">
              Our AI Vendor Audit Template provides the scoring logic and evidentiary requirements needed for ISO 42001 or SOC 2 + AI.
            </p>
            <Link
              href="/ai-governance/vendor-audit-template"
              className="inline-flex items-center gap-2 bg-indigo-900 text-white font-bold px-10 py-5 rounded-xl hover:bg-slate-800 transition-all shadow-xl"
            >
              Get Audit Template
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <AuthorBio authorId="kevin" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
