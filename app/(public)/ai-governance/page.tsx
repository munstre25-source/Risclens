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

        {/* AI Governance Resources Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">AI Governance Resources</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive guides, cost breakdowns, and implementation roadmaps for AI compliance frameworks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* ISO 42001 Column */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <FileCheck className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900">ISO 42001</h3>
                </div>
                <ul className="space-y-3">
                  <li><Link href="/iso-42001/certification-cost" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Certification Cost Guide</Link></li>
                  <li><Link href="/iso-42001/certification-timeline" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Timeline Expectations</Link></li>
                  <li><Link href="/iso-42001/implementation-guide" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Implementation Guide</Link></li>
                  <li><Link href="/iso-42001/gap-analysis-template" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Gap Analysis Template</Link></li>
                  <li><Link href="/iso-42001/controls-list" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Controls List</Link></li>
                  <li><Link href="/iso-42001/audit-preparation" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Audit Preparation</Link></li>
                </ul>
              </div>

              {/* EU AI Act Column */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900">EU AI Act</h3>
                </div>
                <ul className="space-y-3">
                  <li><Link href="/eu-ai-act/compliance-checklist" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Compliance Checklist</Link></li>
                  <li><Link href="/eu-ai-act/high-risk-ai-systems" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">High-Risk AI Systems</Link></li>
                  <li><Link href="/eu-ai-act/implementation-timeline" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Implementation Timeline</Link></li>
                  <li><Link href="/eu-ai-act/penalties-fines" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Penalties & Fines</Link></li>
                  <li><Link href="/eu-ai-act/conformity-assessment" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Conformity Assessment</Link></li>
                  <li><Link href="/eu-ai-act/general-purpose-ai" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">GPAI Requirements</Link></li>
                </ul>
              </div>

              {/* NIST AI RMF Column */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900">NIST AI RMF</h3>
                </div>
                <ul className="space-y-3">
                  <li><Link href="/nist-ai-rmf/implementation" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Implementation Guide</Link></li>
                  <li><Link href="/nist-ai-rmf/playbook" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Complete Playbook</Link></li>
                  <li><Link href="/nist-ai-rmf/govern-function" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Govern Function</Link></li>
                  <li><Link href="/nist-ai-rmf/map-function" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Map Function</Link></li>
                  <li><Link href="/nist-ai-rmf/measure-function" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Measure Function</Link></li>
                  <li><Link href="/nist-ai-rmf/manage-function" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Manage Function</Link></li>
                </ul>
              </div>

              {/* AI Governance General Column */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900">AI Governance</h3>
                </div>
                <ul className="space-y-3">
                  <li><Link href="/ai-governance/framework" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Framework Guide</Link></li>
                  <li><Link href="/ai-governance/policy-template" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Policy Template</Link></li>
                  <li><Link href="/ai-governance/committee" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Committee Structure</Link></li>
                  <li><Link href="/ai-governance/best-practices" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Best Practices</Link></li>
                  <li><Link href="/ai-governance/tools" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Tools Comparison</Link></li>
                  <li><Link href="/ai-governance/roadmap" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Implementation Roadmap</Link></li>
                </ul>
              </div>
            </div>

            {/* Additional Resource Categories */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {/* AI Vendor Risk */}
              <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  AI Vendor Risk
                </h3>
                <ul className="space-y-2">
                  <li><Link href="/ai-governance/ai-vendor-risk-assessment" className="text-sm text-indigo-700 hover:text-indigo-900 transition-colors">Vendor Assessment Framework</Link></li>
                  <li><Link href="/ai-governance/ai-vendor-due-diligence" className="text-sm text-indigo-700 hover:text-indigo-900 transition-colors">Due Diligence Checklist</Link></li>
                  <li><Link href="/ai-governance/ai-third-party-risk" className="text-sm text-indigo-700 hover:text-indigo-900 transition-colors">Third-Party Risk Guide</Link></li>
                </ul>
              </div>

              {/* AI Ethics & Responsible AI */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Responsible AI
                </h3>
                <ul className="space-y-2">
                  <li><Link href="/ai-governance/responsible-ai-framework" className="text-sm text-green-700 hover:text-green-900 transition-colors">Responsible AI Framework</Link></li>
                  <li><Link href="/ai-governance/ai-bias-detection" className="text-sm text-green-700 hover:text-green-900 transition-colors">Bias Detection Guide</Link></li>
                  <li><Link href="/ai-governance/ai-explainability" className="text-sm text-green-700 hover:text-green-900 transition-colors">Explainability Requirements</Link></li>
                </ul>
              </div>

              {/* LLM & GenAI Governance */}
              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  LLM Governance
                </h3>
                <ul className="space-y-2">
                  <li><Link href="/ai-governance/llm-governance-framework" className="text-sm text-purple-700 hover:text-purple-900 transition-colors">LLM Framework</Link></li>
                  <li><Link href="/ai-governance/chatgpt-enterprise-governance" className="text-sm text-purple-700 hover:text-purple-900 transition-colors">ChatGPT Enterprise</Link></li>
                  <li><Link href="/ai-governance/copilot-governance" className="text-sm text-purple-700 hover:text-purple-900 transition-colors">Microsoft Copilot</Link></li>
                </ul>
              </div>
            </div>

            {/* Role-Based Guides Row */}
            <div className="mt-8 bg-slate-900 rounded-2xl p-8">
              <h3 className="font-bold text-white text-xl mb-6">AI Governance by Role</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/ai-governance/ai-governance-for-ciso" className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl text-center transition-colors">
                  <span className="block text-2xl mb-1">🛡️</span>
                  <span className="text-sm font-bold">For CISOs</span>
                </Link>
                <Link href="/ai-governance/ai-governance-for-cto" className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl text-center transition-colors">
                  <span className="block text-2xl mb-1">⚙️</span>
                  <span className="text-sm font-bold">For CTOs</span>
                </Link>
                <Link href="/ai-governance/ai-governance-for-legal" className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl text-center transition-colors">
                  <span className="block text-2xl mb-1">⚖️</span>
                  <span className="text-sm font-bold">For Legal</span>
                </Link>
                <Link href="/ai-governance/ai-governance-for-boards" className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl text-center transition-colors">
                  <span className="block text-2xl mb-1">📊</span>
                  <span className="text-sm font-bold">For Boards</span>
                </Link>
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
