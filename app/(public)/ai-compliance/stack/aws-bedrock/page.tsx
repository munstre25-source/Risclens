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
  Database
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AWS Bedrock Compliance Guide | ISO 42001 & EU AI Act | RiscLens',
  description:
    'Complete compliance guide for AWS Bedrock. Map ISO 42001 controls to AWS security features like Bedrock Guardrails, PrivateLink, and KMS.',
  openGraph: {
    title: 'AWS Bedrock Compliance Guide | RiscLens',
    description: 'Secure your AWS Bedrock implementation. AI governance for AWS users.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AWS Bedrock Compliance Guide' }],
  },
  alternates: {
    canonical: 'https://risclens.com/ai-compliance/stack/aws-bedrock',
  },
};

const controlMapping = [
  {
    requirement: 'Data Isolation (A.7.2)',
    awsFeature: 'AWS PrivateLink & VPC Endpoints',
    description: 'Ensures model traffic never traverses the public internet.'
  },
  {
    requirement: 'Content Filtering (A.10.1)',
    awsFeature: 'Amazon Bedrock Guardrails',
    description: 'Configure custom filters for PII, hate speech, and hallucinations.'
  },
  {
    requirement: 'Data Encryption (A.7.1)',
    awsFeature: 'AWS KMS (Key Management Service)',
    description: 'Use customer-managed keys (CMK) for model inputs and outputs.'
  },
  {
    requirement: 'Audit Logging (A.9.2)',
    awsFeature: 'AWS CloudTrail & CloudWatch',
    description: 'Capture every API invocation and administrative change.'
  }
];

export default function AWSBedrockCompliance() {
  const breadcrumbItems = [
    { label: 'AI Compliance', href: '/ai-compliance' },
    { label: 'Stack', href: '/ai-compliance/stack' },
    { label: 'AWS Bedrock', href: '/ai-compliance/stack/aws-bedrock' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title="AWS Bedrock Compliance Guide"
        description="Compliance and security guide for AWS Bedrock."
        url="https://risclens.com/ai-compliance/stack/aws-bedrock"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Compliance', item: 'https://risclens.com/ai-compliance' },
          { name: 'AWS Bedrock', item: 'https://risclens.com/ai-compliance/stack/aws-bedrock' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-[#232f3e] text-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-orange-400 text-sm font-bold uppercase tracking-wider mb-6">
                  <Cloud className="w-4 h-4" />
                  AWS Managed AI
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                  AWS Bedrock <br />
                  <span className="text-orange-400">Compliance Guide</span>
                </h1>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Building on AWS Bedrock? We've mapped ISO 42001 and EU AI Act controls directly to AWS native security services to accelerate your audit readiness.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-orange-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-orange-600 transition-all">
                    Download AWS AI Pack
                  </button>
                  <Link
                    href="/ai-governance/risk-classifier"
                    className="bg-white/10 text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all"
                  >
                    Run Risk Assessment
                  </Link>
                </div>
              </div>
              <div className="w-24 h-24 md:w-48 md:h-48 bg-white p-6 rounded-3xl shadow-2xl flex items-center justify-center">
                <Cpu className="w-20 h-20 text-[#232f3e]" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Native Control Mapping</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {controlMapping.map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 border border-slate-200 rounded-2xl hover:border-orange-500 transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">{item.requirement}</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.awsFeature}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Shared Responsibility Model for AI</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Just like standard cloud security, AI compliance is a shared responsibility. AWS secures the foundational models and infra, but <strong>you</strong> are responsible for:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <Lock className="w-6 h-6 text-orange-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Prompt Engineering Security</h4>
                    <p className="text-sm text-slate-600">Protecting against prompt injection and jailbreaking.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <Database className="w-6 h-6 text-orange-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Training Data Governance</h4>
                    <p className="text-sm text-slate-600">Ensuring data used for fine-tuning is clean and legally compliant.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Implementing AI Governance on AWS</h2>
            <p className="text-lg text-slate-600 mb-10">
              Need help configuring your AWS Bedrock environment for ISO 42001?
            </p>
            <Link
              href="/ai-governance"
              className="inline-flex items-center gap-2 bg-[#232f3e] text-white font-bold px-10 py-5 rounded-xl hover:bg-slate-800 transition-all shadow-xl"
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
