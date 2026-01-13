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
  CheckCircle,
  BarChart3,
  Search,
  Users,
  AlertTriangle,
  Scale,
  Database,
  Lock,
  Zap,
  Layers
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Vendor Audit Template | Scoring & Evidence | RiscLens',
  description:
    'Standardize your AI vendor audits. Our template includes scoring rubrics, evidence checklists, and risk mapping for ISO 42001 and EU AI Act compliance.',
  openGraph: {
    title: 'AI Vendor Audit Template | RiscLens',
    description: 'Professional AI vendor audit framework. Evidence checklists and scoring models.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Vendor Audit Template' }],
  },
  alternates: {
    canonical: 'https://risclens.com/ai-governance/vendor-audit-template',
  },
};

const auditPhases = [
  {
    title: 'Pre-Audit Scoping',
    icon: Search,
    steps: [
      'Identify AI usage (Embedded, API-based, or Standalone)',
      'Classify AI Risk level (EU AI Act tiers)',
      'Define data sensitivity boundaries',
      'Inventory sub-processors (LLM providers)'
    ]
  },
  {
    title: 'Evidence Collection',
    icon: Layers,
    steps: [
      'System Architecture Diagrams (AI flow)',
      'Model Card / Transparency Documentation',
      'AI Policy & Ethical Guidelines',
      'Data Processing Addendum (DPA) with AI clauses'
    ]
  },
  {
    title: 'Scoring & Assessment',
    icon: BarChart3,
    steps: [
      'Evaluate model robustness vs expected use cases',
      'Score data privacy controls (Encryption, ZDR)',
      'Assess bias mitigation efforts',
      'Risk-weighting based on business impact'
    ]
  }
];

export default function AIVendorAuditTemplate() {
  const breadcrumbItems = [
    { label: 'AI Governance', href: '/ai-governance' },
    { label: 'Vendor Audit Template', href: '/ai-governance/vendor-audit-template' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title="AI Vendor Audit Template"
        description="A professional framework for auditing AI vendors."
        url="https://risclens.com/ai-governance/vendor-audit-template"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Governance', item: 'https://risclens.com/ai-governance' },
          { name: 'Vendor Audit Template', item: 'https://risclens.com/ai-governance/vendor-audit-template' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-slate-900 text-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-sm font-bold uppercase tracking-wider mb-6">
              <Scale className="w-4 h-4" />
              Standardized Audit Framework
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
              AI Vendor Audit <br />
              <span className="text-indigo-400">Standard Template</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Bridge the gap between "asking questions" and "verifying security." 
              Use our scoring-based rubric to audit AI vendors with enterprise rigor.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-500 transition-all flex items-center justify-center gap-2">
                <FileCheck className="w-5 h-5" />
                Download Audit Rubric (PDF)
              </button>
              <Link
                href="/ai-governance/vendor-risk-questionnaire"
                className="w-full sm:w-auto bg-slate-800 text-white border border-slate-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                Back to Questionnaire
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {auditPhases.map((phase) => {
                const Icon = phase.icon;
                return (
                  <div key={phase.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col h-full">
                    <div className="w-14 h-14 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                      <Icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">{phase.title}</h3>
                    <ul className="space-y-4 mb-8 flex-grow">
                      {phase.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="font-medium">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <Shield className="w-24 h-24 text-slate-50" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Evidence Checklist</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Request these specific documents to verify the vendor's AI governance maturity.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2">Technical Evidence</h4>
                    <ul className="text-sm text-slate-600 space-y-2">
                      <li>• Penetration Test Report (AI infrastructure)</li>
                      <li>• SOC 2 Type II with AI Trust Criteria</li>
                      <li>• Vulnerability Scan Results (Models)</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2">Governance Evidence</h4>
                    <ul className="text-sm text-slate-600 space-y-2">
                      <li>• Ethical AI Usage Policy</li>
                      <li>• Data Retention Schedule</li>
                      <li>• Model Bias Monitoring Logs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Programmatic Audit Intelligence</h2>
            <p className="text-lg text-slate-600 mb-12">
              Automate the "pre-audit" phase by extracting signals from the vendor's domain.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="p-8 bg-indigo-900 rounded-2xl text-white">
                <Zap className="w-10 h-10 text-indigo-400 mb-4" />
                <h4 className="text-xl font-bold mb-2">Instant Stack Detection</h4>
                <p className="text-indigo-200 text-sm">Our engine detects which AI APIs (OpenAI, Anthropic, Bedrock) a vendor is using under the hood.</p>
              </div>
              <div className="p-8 bg-slate-900 rounded-2xl text-white">
                <Users className="w-10 h-10 text-indigo-400 mb-4" />
                <h4 className="text-xl font-bold mb-2">Peer Benchmarking</h4>
                <p className="text-slate-400 text-sm">Compare a vendor's risk profile against 5,000+ other AI companies in our database.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <AuthorBio authorId="kevin" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
