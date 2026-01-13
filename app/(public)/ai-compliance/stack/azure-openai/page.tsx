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
  title: 'Azure OpenAI Compliance Guide | ISO 42001 & EU AI Act | RiscLens',
  description:
    'Complete compliance guide for Azure OpenAI Service. Map ISO 42001 controls to Azure security features like Content Safety, Private Endpoints, and Entra ID.',
  openGraph: {
    title: 'Azure OpenAI Compliance Guide | RiscLens',
    description: 'Secure your Azure OpenAI implementation. AI governance for Microsoft Azure users.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Azure OpenAI Compliance Guide' }],
  },
  alternates: {
    canonical: 'https://risclens.com/ai-compliance/stack/azure-openai',
  },
};

const controlMapping = [
  {
    requirement: 'Identity & Access (A.9.1)',
    azureFeature: 'Microsoft Entra ID (formerly Azure AD)',
    description: 'Enforce RBAC and MFA for all model management and API access.'
  },
  {
    requirement: 'Content Safety (A.10.1)',
    azureFeature: 'Azure AI Content Safety',
    description: 'Integrated moderation to detect and block harmful content in real-time.'
  },
  {
    requirement: 'Data Privacy (A.7.2)',
    azureFeature: 'Azure Private Link',
    description: 'Keep your AI traffic within the Azure private backbone.'
  },
  {
    requirement: 'Monitoring (A.9.2)',
    azureFeature: 'Azure Monitor & Log Analytics',
    description: 'Detailed telemetry on model usage, latency, and security events.'
  }
];

export default function AzureOpenAICompliance() {
  const breadcrumbItems = [
    { label: 'AI Compliance', href: '/ai-compliance' },
    { label: 'Stack', href: '/ai-compliance/stack' },
    { label: 'Azure OpenAI', href: '/ai-compliance/stack/azure-openai' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title="Azure OpenAI Compliance Guide"
        description="Compliance and security guide for Azure OpenAI Service."
        url="https://risclens.com/ai-compliance/stack/azure-openai"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Compliance', item: 'https://risclens.com/ai-compliance' },
          { name: 'Azure OpenAI', item: 'https://risclens.com/ai-compliance/stack/azure-openai' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-[#0078d4] text-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-bold uppercase tracking-wider mb-6">
                  <Cloud className="w-4 h-4" />
                  Azure Enterprise AI
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                  Azure OpenAI <br />
                  <span className="text-blue-200">Compliance Guide</span>
                </h1>
                <p className="text-xl text-blue-50 mb-8 leading-relaxed">
                  Enterprise AI on Azure requires more than just an API key. We help you map Microsoft's robust security ecosystem to the requirements of ISO 42001 and the EU AI Act.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-[#0078d4] font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-50 transition-all">
                    Download Azure AI Pack
                  </button>
                  <Link
                    href="/ai-governance/risk-classifier"
                    className="bg-blue-800 text-white border border-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all"
                  >
                    Run Risk Assessment
                  </Link>
                </div>
              </div>
              <div className="w-24 h-24 md:w-48 md:h-48 bg-white p-6 rounded-3xl shadow-2xl flex items-center justify-center">
                <Cpu className="w-20 h-20 text-[#0078d4]" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Azure Control Mapping</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {controlMapping.map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-500 transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{item.requirement}</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.azureFeature}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Microsoft's Responsible AI Standard</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Microsoft has its own Responsible AI Standard (RAIS). While not a certification, mapping RAIS to ISO 42001 is a critical step for Azure-native organizations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <Shield className="w-6 h-6 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Transparency Requirements</h4>
                    <p className="text-sm text-slate-600">Using Azure's "Transparency Notes" to satisfy EU AI Act documentation tiers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <Users className="w-6 h-6 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Human-in-the-Loop</h4>
                    <p className="text-sm text-slate-600">Configuring Azure AI Studio for effective human oversight controls.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Implementing AI Governance on Azure</h2>
            <p className="text-lg text-slate-600 mb-10">
              Need help configuring your Azure OpenAI environment for ISO 42001?
            </p>
            <Link
              href="/ai-governance"
              className="inline-flex items-center gap-2 bg-[#0078d4] text-white font-bold px-10 py-5 rounded-xl hover:bg-blue-700 transition-all shadow-xl"
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
