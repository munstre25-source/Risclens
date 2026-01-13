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
  Brain,
  Zap,
  Lock,
  Search,
  Users,
  ClipboardCheck,
  Scale,
  Cloud,
  Layers
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Governance & Compliance Hub | Enterprise AI Strategy | RiscLens',
  description:
    'The ultimate resource for AI Governance. Master vendor risk management, EU AI Act compliance, and framework interoperability with our programmatic tools and guides.',
  openGraph: {
    title: 'AI Governance & Compliance Hub | RiscLens',
    description: 'Master AI Governance. Tools for vendor risk, EU AI Act, and enterprise AI compliance.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens AI Governance Hub' }],
  },
  alternates: {
    canonical: 'https://risclens.com/ai-governance',
  },
};

const highIntentTools = [
  {
    title: 'AI Vendor Risk Hub',
    description: 'Automate vendor assessments with our AI-specific questionnaires and audit templates.',
    icon: Users,
    href: '/ai-governance/vendor-risk-questionnaire',
    tag: 'High Intent'
  },
  {
    title: 'AI Risk Classifier',
    description: 'Determine your EU AI Act risk tier in seconds based on your specific AI use case.',
    icon: Scale,
    href: '/ai-governance/risk-classifier',
    tag: 'Tool'
  },
  {
    title: 'SOC 2 to ISO 42001 Bridge',
    description: 'Learn how to leverage your existing SOC 2 audit to accelerate AI compliance.',
    icon: Layers,
    href: '/ai-compliance/compare/soc-2-vs-iso-42001',
    tag: 'Guide'
  }
];

const techStackCompliance = [
  { name: 'AWS Bedrock', href: '/ai-compliance/stack/aws-bedrock', icon: Cloud },
  { name: 'Azure OpenAI', href: '/ai-compliance/stack/azure-openai', icon: Cloud },
  { name: 'Google Vertex AI', href: '/ai-compliance/stack/google-vertex-ai', icon: Cloud },
  { name: 'OpenAI Enterprise', href: '/ai-compliance/stack/openai', icon: Brain },
];

export default function AIGovernanceHub() {
  const breadcrumbItems = [
    { label: 'AI Governance', href: '/ai-governance' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title="AI Governance & Compliance Hub"
        description="The ultimate resource for AI Governance and Compliance."
        url="https://risclens.com/ai-governance"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Governance', item: 'https://risclens.com/ai-governance' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-800 text-white py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4">
            <div className="lg:max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-sm font-bold uppercase tracking-wider mb-6">
                <Brain className="w-4 h-4" />
                Bleeding Edge AI Compliance
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                The AI Governance <br />
                <span className="text-indigo-300">Command Center</span>
              </h1>
              <p className="text-xl text-indigo-100 leading-relaxed mb-8">
                Move beyond static checklists. Use programmatic market intelligence to automate AI vendor risk, 
                classify regulatory tiers, and bridge the gap between Security and AI Governance.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/ai-governance/risk-classifier"
                  className="bg-white text-indigo-900 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2"
                >
                  Run Risk Classifier
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/ai-governance/vendor-risk-questionnaire"
                  className="bg-indigo-700/50 text-white border border-indigo-400/30 font-bold px-6 py-3.5 rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                  AI Vendor Questionnaire
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">High-Intent Governance Tools</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Interactive tools and deep-dive resources designed for legal, security, and product teams.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {highIntentTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.title} href={tool.href} className="group">
                    <div className="h-full bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-indigo-500 hover:shadow-xl transition-all relative overflow-hidden">
                      <div className="absolute top-4 right-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-indigo-100 text-indigo-700">
                          {tool.tag}
                        </span>
                      </div>
                      <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{tool.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {tool.description}
                      </p>
                      <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                        Launch Tool
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Platform-Specific AI Compliance</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Implementing AI Governance depends heavily on your underlying stack. We've mapped ISO 42001 and EU AI Act controls to specific cloud services.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {techStackCompliance.map((stack) => (
                    <Link 
                      key={stack.name} 
                      href={stack.href}
                      className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all"
                    >
                      <stack.icon className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold text-slate-700">{stack.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex-1 bg-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">The "SOC 2 Bridge"</h3>
                  <p className="text-indigo-100 mb-6 leading-relaxed">
                    Already have a SOC 2 Report? You are likely 60% of the way to AI compliance. Our mapping tool shows you exactly which SOC 2 controls satisfy AI requirements.
                  </p>
                  <Link 
                    href="/ai-compliance/compare/soc-2-vs-iso-42001"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-all"
                  >
                    View Mapping Matrix
                    <Layers className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Programmatic AI Governance?</h2>
            <div className="grid md:grid-cols-2 gap-10 text-left mt-12">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-lg">Real-Time Extraction</h4>
                <p className="text-slate-600 italic">"Our engine scans vendor domains to find hidden AI risk signals that questionnaires often miss."</p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-lg">Semantic Search Intent</h4>
                <p className="text-slate-600 italic">"We don't just target 'AI Compliance'. We target 'ISO 42001 for Fintech Startups using AWS Bedrock'."</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-indigo-950 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Master AI Governance Today</h2>
            <p className="text-indigo-200 text-lg mb-10">
              Access the world's most granular database of AI compliance resources and tools.
            </p>
            <Link
              href="/ai-governance/risk-classifier"
              className="inline-flex items-center gap-2 bg-white text-indigo-950 font-bold px-10 py-5 rounded-xl hover:bg-indigo-50 transition-all shadow-xl"
            >
              Get Started
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
