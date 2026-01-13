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
  CheckCircle,
  Cloud,
  Zap,
  Lock,
  Search,
  Layers,
  FileCheck,
  Cpu,
  Database,
  Users
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Google Vertex AI Compliance Guide | ISO 42001 & EU AI Act | RiscLens',
  description:
    'Complete compliance guide for Google Cloud Vertex AI. Map ISO 42001 controls to GCP features like Vertex AI Model Monitoring, VPC Service Controls, and IAM.',
  openGraph: {
    title: 'Google Vertex AI Compliance Guide | RiscLens',
    description: 'Secure your Google Cloud AI implementation. AI governance for Vertex AI users.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Google Vertex AI Compliance Guide' }],
  },
  alternates: {
    canonical: 'https://risclens.com/ai-compliance/stack/google-vertex-ai',
  },
};

const controlMapping = [
  {
    requirement: 'Data Perimeter (A.7.2)',
    gcpFeature: 'VPC Service Controls',
    description: 'Create a security perimeter to mitigate data exfiltration risks from Vertex AI.'
  },
  {
    requirement: 'Model Monitoring (A.9.2)',
    gcpFeature: 'Vertex AI Model Monitoring',
    description: 'Detect feature attribution drift and prediction drift in production models.'
  },
  {
    requirement: 'Access Control (A.9.1)',
    gcpFeature: 'Cloud IAM & Service Accounts',
    description: 'Fine-grained permissions for model deployment and dataset access.'
  },
  {
    requirement: 'Data Governance (B.7)',
    gcpFeature: 'Dataplex & Cloud Data Loss Prevention',
    description: 'Scan and redact PII from training datasets before they reach the model.'
  }
];

export default function GoogleVertexAICompliance() {
  const breadcrumbItems = [
    { label: 'AI Compliance', href: '/ai-compliance' },
    { label: 'Stack', href: '/ai-compliance/stack' },
    { label: 'Google Vertex AI', href: '/ai-compliance/stack/google-vertex-ai' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title="Google Vertex AI Compliance Guide"
        description="Compliance and security guide for Google Cloud Vertex AI."
        url="https://risclens.com/ai-compliance/stack/google-vertex-ai"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Compliance', item: 'https://risclens.com/ai-compliance' },
          { name: 'Google Vertex AI', item: 'https://risclens.com/ai-compliance/stack/google-vertex-ai' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-[#4285f4] text-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-50 text-sm font-bold uppercase tracking-wider mb-6">
                  <Cloud className="w-4 h-4" />
                  GCP Enterprise AI
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                  Google Vertex AI <br />
                  <span className="text-blue-100">Compliance Guide</span>
                </h1>
                <p className="text-xl text-blue-50 mb-8 leading-relaxed">
                  Google Cloud offers some of the most advanced AI monitoring tools. We show you how to leverage Vertex AI's native features to satisfy the rigorous requirements of ISO 42001.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-[#4285f4] font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-50 transition-all">
                    Download GCP AI Pack
                  </button>
                  <Link
                    href="/ai-governance/risk-classifier"
                    className="bg-blue-600 text-white border border-blue-400 font-bold px-8 py-4 rounded-xl hover:bg-blue-500 transition-all"
                  >
                    Run Risk Assessment
                  </Link>
                </div>
              </div>
              <div className="w-24 h-24 md:w-48 md:h-48 bg-white p-6 rounded-3xl shadow-2xl flex items-center justify-center">
                <Cpu className="w-20 h-20 text-[#4285f4]" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">GCP Control Mapping</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {controlMapping.map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-500 transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#4285f4] uppercase tracking-widest">{item.requirement}</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.gcpFeature}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Explainability & Transparency</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                The EU AI Act places a heavy emphasis on "Explainability" for high-risk systems. Vertex AI's "Explainable AI" feature is a core component of your compliance strategy.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <Search className="w-6 h-6 text-[#4285f4] shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Feature Attribution</h4>
                    <p className="text-sm text-slate-600">Understand which features contributed most to a specific AI prediction for audit logs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <Users className="w-6 h-6 text-[#4285f4] shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Human Oversight</h4>
                    <p className="text-sm text-slate-600">Using Google Cloud's "Human-in-the-Loop" workflows for model validation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Implementing AI Governance on GCP</h2>
            <p className="text-lg text-slate-600 mb-10">
              Need help configuring your Google Cloud environment for ISO 42001?
            </p>
            <Link
              href="/ai-governance"
              className="inline-flex items-center gap-2 bg-[#4285f4] text-white font-bold px-10 py-5 rounded-xl hover:bg-blue-600 transition-all shadow-xl"
            >
              Back to Hub
              <ArrowRight className="w-5 h-5" />
            </Link>
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
