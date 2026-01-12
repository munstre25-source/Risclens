import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { 
  Bot, 
  BarChart3, 
  Handshake, 
  Shield, 
  Scale, 
  FileCheck, 
  ArrowRight, 
  Clock, 
  AlertTriangle,
  Brain,
  Building2,
  Users,
  Cpu,
  Globe,
  BookOpen,
  Target,
  Zap,
  CheckCircle,
  ExternalLink,
  Gavel,
  Lock,
  Eye
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Compliance & Governance Hub | EU AI Act, ISO 42001, NIST AI RMF | RiscLens',
  description:
    'The definitive resource for AI governance and compliance. Navigate EU AI Act requirements, ISO 42001 certification, and NIST AI RMF implementation. Get your AI readiness score today.',
  openGraph: {
    title: 'AI Compliance & Governance Hub | RiscLens',
    description: 'Navigate EU AI Act, ISO 42001, and NIST AI RMF. The intelligence layer for AI governance.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens AI Compliance Hub' }],
  },
  alternates: {
    canonical: 'https://risclens.com/ai-compliance',
  },
};

const deadlineDate = new Date('2026-08-02');
const today = new Date();
const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

export default function AiComplianceHub() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <GeneralPageSchema
        title="AI Compliance & Governance Hub"
        description="The definitive resource for AI governance and compliance. Navigate EU AI Act requirements, ISO 42001 certification, and NIST AI RMF implementation."
        url="https://risclens.com/ai-compliance"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Compliance Hub', item: 'https://risclens.com/ai-compliance' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-sm font-bold uppercase tracking-wider mb-8">
              <Brain className="w-4 h-4" />
              The AI Governance Intelligence Layer
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              AI Compliance &<br />
              <span className="text-brand-400">Governance Hub</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Navigate the EU AI Act, achieve ISO 42001 certification, and implement NIST AI RMF. 
              Everything you need to build trustworthy AI systems that clear enterprise procurement.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/ai-governance-readiness-index"
                className="w-full sm:w-auto bg-brand-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-brand-600 transition-all flex items-center justify-center gap-2"
              >
                Get AI Readiness Score
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/iso-42001-calculator"
                className="w-full sm:w-auto bg-white/10 text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Bot className="w-5 h-5" />
                ISO 42001 Calculator
              </Link>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 border border-orange-400/30 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
                <span className="text-orange-300 font-bold text-lg">EU AI Act Deadline</span>
              </div>
              <div className="text-4xl font-black text-white mb-2">{daysUntilDeadline} Days</div>
              <p className="text-orange-200/80 text-sm">Until August 2, 2026 enforcement for high-risk AI systems</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">AI Governance Frameworks</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Master the three pillars of AI compliance: international standards, regional regulations, and federal frameworks.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/ai-compliance/iso-42001" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 h-full hover:shadow-xl hover:border-blue-300 transition-all">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Shield className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-slate-900">ISO 42001</h3>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Standard</span>
                  </div>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                    The world's first international standard for AI Management Systems (AIMS). Provides the framework for responsible AI development, deployment, and governance.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      38 control objectives
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      Certifiable standard
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      Global recognition
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-bold text-sm group-hover:gap-2 transition-all">
                    Explore ISO 42001 <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>

              <Link href="/ai-compliance/eu-ai-act" className="group">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 h-full hover:shadow-xl hover:border-orange-300 transition-all">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <Gavel className="w-7 h-7 text-orange-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-slate-900">EU AI Act</h3>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">Regulation</span>
                  </div>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                    The world's first comprehensive AI regulation. Risk-based approach with strict requirements for high-risk AI systems affecting EU citizens.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      August 2026 deadline
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      Up to 7% revenue penalties
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      Risk-based tiers
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-sm group-hover:gap-2 transition-all">
                    EU AI Act Guide <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>

              <Link href="/ai-compliance/nist-ai-rmf" className="group">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-8 h-full hover:shadow-xl hover:border-emerald-300 transition-all">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-slate-900">NIST AI RMF</h3>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Framework</span>
                  </div>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                    The U.S. federal framework for managing AI risks. Voluntary but increasingly required for government contractors and enterprise vendors.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      4 core functions
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      FedRAMP alignment
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Trustworthy AI principles
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-sm group-hover:gap-2 transition-all">
                    NIST AI RMF Guide <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>

            <div className="mt-12 text-center">
              <Link 
                href="/ai-compliance/compare/iso-42001-vs-eu-ai-act"
                className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-bold"
              >
                <Scale className="w-5 h-5" />
                Compare Frameworks: ISO 42001 vs EU AI Act
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">AI Compliance by Industry</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Industry-specific guidance for EU AI Act high-risk classifications and ISO 42001 implementation.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/ai-compliance/industries/healthcare" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-200 transition-all h-full">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Healthcare AI</h3>
                  <p className="text-sm text-slate-600 mb-4">Diagnostic AI, clinical decision support, medical imaging analysis</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">High-Risk</span>
                  </div>
                  <span className="text-brand-600 font-medium text-sm group-hover:underline">View Guide →</span>
                </div>
              </Link>

              <Link href="/ai-compliance/industries/hr-tech" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-200 transition-all h-full">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">HR-Tech AI</h3>
                  <p className="text-sm text-slate-600 mb-4">Resume screening, interview analysis, performance evaluation</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">High-Risk</span>
                  </div>
                  <span className="text-brand-600 font-medium text-sm group-hover:underline">View Guide →</span>
                </div>
              </Link>

              <Link href="/ai-compliance/industries/fintech" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-200 transition-all h-full">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Fintech AI</h3>
                  <p className="text-sm text-slate-600 mb-4">Credit scoring, fraud detection, algorithmic trading</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">High-Risk</span>
                  </div>
                  <span className="text-brand-600 font-medium text-sm group-hover:underline">View Guide →</span>
                </div>
              </Link>

              <Link href="/ai-compliance/industries/insurance" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-200 transition-all h-full">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Insurance AI</h3>
                  <p className="text-sm text-slate-600 mb-4">Risk assessment, claims processing, underwriting</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">High-Risk</span>
                  </div>
                  <span className="text-brand-600 font-medium text-sm group-hover:underline">View Guide →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">AI Governance Tools</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Free calculators and assessments to benchmark your AI compliance readiness.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/soc-2-readiness-calculator?framework=iso42001" className="group">
                <div className="bg-brand-50 border-2 border-brand-200 rounded-2xl p-8 h-full hover:shadow-xl hover:border-brand-300 transition-all">
                  <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                    <BarChart3 className="w-7 h-7 text-brand-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-slate-900">AI Readiness Index</h3>
                    <span className="px-2 py-0.5 bg-brand-100 text-brand-700 text-xs font-bold rounded-full">Flagship</span>
                  </div>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                    Comprehensive assessment mapping your AI systems to ISO 42001 and EU AI Act requirements. Get a readiness score in under 3 minutes.
                  </p>
                  <span className="inline-flex items-center gap-1 text-brand-600 font-bold text-sm group-hover:gap-2 transition-all">
                    Start Assessment <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>

              <Link href="/iso-42001-calculator" className="group">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 h-full hover:shadow-xl hover:border-blue-300 transition-all">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Bot className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">ISO 42001 Calculator</h3>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                    Map your AI infrastructure to the 38 controls of ISO 42001. Get cost estimates and certification timeline projections.
                  </p>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-bold text-sm group-hover:gap-2 transition-all">
                    Calculate Score <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>

              <Link href="/ai-compliance/eu-ai-act-classifier" className="group">
                <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 h-full hover:shadow-xl hover:border-orange-300 transition-all">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <Scale className="w-7 h-7 text-orange-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-slate-900">Risk Classifier</h3>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">New</span>
                  </div>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                    Determine if your AI system is Prohibited, High-Risk, Limited, or Minimal risk under the EU AI Act. 3 questions, instant classification.
                  </p>
                  <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-sm group-hover:gap-2 transition-all">
                    Classify Your AI <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why ISO 42001 is the new SOC 2 for AI</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  Just as SOC 2 became the baseline for cloud SaaS, ISO 42001 (AIMS) is becoming the "must-have" for any company using LLMs or proprietary models in an enterprise context.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Deterministic AI Risk Identification",
                    "Data Lineage & Training Governance",
                    "Bias & Hallucination Mitigation Logs",
                    "Human-in-the-Loop Verification",
                    "Model Explainability Documentation"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-200">
                      <CheckCircle className="w-5 h-5 text-brand-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/ai-compliance/iso-42001"
                    className="bg-brand-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-600 transition-all flex items-center gap-2"
                  >
                    Learn ISO 42001
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/soc-2-cost/ai-data"
                    className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-all"
                  >
                    AI Company Costs
                  </Link>
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-3xl p-10 border border-slate-700">
                <div className="text-brand-400 font-bold uppercase tracking-widest text-xs mb-4">Market Intelligence</div>
                <h3 className="text-3xl font-bold mb-4">68%</h3>
                <p className="text-xl text-slate-300 mb-4">of Fortune 500 Procurement Teams...</p>
                <p className="text-slate-400 mb-8">
                  ...now require a specific AI security addendum or ISO 42001 roadmap for all new software vendors deploying AI features.
                </p>
                <div className="pt-8 border-t border-slate-700 space-y-4">
                  <Link href="/compliance/directory" className="flex items-center justify-between text-slate-300 hover:text-white transition-colors group">
                    <span>Browse AI Company Directory</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/auditor-directory" className="flex items-center justify-between text-slate-300 hover:text-white transition-colors group">
                    <span>Find AI Governance Auditors</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">AI Trust Stack</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Compliance guidance for companies building on leading AI platforms and LLM providers.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/ai-compliance/stack/openai" className="group">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-emerald-300 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">OpenAI</h3>
                      <p className="text-sm text-slate-500">GPT-4, ChatGPT, DALL-E</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">SOC 2 + ISO 42001 compliance when using OpenAI APIs. Data residency, prompt injection, and model governance.</p>
                  <span className="text-emerald-600 font-medium text-sm group-hover:underline">View Compliance Guide →</span>
                </div>
              </Link>

              <Link href="/ai-compliance/stack/anthropic" className="group">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-300 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Anthropic</h3>
                      <p className="text-sm text-slate-500">Claude 3, Constitutional AI</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Enterprise compliance for Claude integration. Constitutional AI alignment and responsible deployment patterns.</p>
                  <span className="text-orange-600 font-medium text-sm group-hover:underline">View Compliance Guide →</span>
                </div>
              </Link>

              <Link href="/ai-compliance/stack/azure-openai" className="group">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Azure OpenAI</h3>
                      <p className="text-sm text-slate-500">Enterprise GPT, Copilot</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Azure compliance inheritance for AI. Private endpoints, data isolation, and enterprise security controls.</p>
                  <span className="text-blue-600 font-medium text-sm group-hover:underline">View Compliance Guide →</span>
                </div>
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Link href="/soc-2/stack" className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-600 font-medium">
                View All Tech Stack Guides
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Framework Comparisons</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Understand the differences and overlaps between AI governance frameworks.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Link href="/ai-compliance/compare/iso-42001-vs-eu-ai-act" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg hover:border-brand-200 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-slate-300">vs</span>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Gavel className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">ISO 42001 vs EU AI Act</h3>
                  <p className="text-slate-600 mb-4">
                    Standard vs regulation. Understand when you need certification vs compliance, and how they work together.
                  </p>
                  <span className="text-brand-600 font-bold text-sm group-hover:underline">Read Comparison →</span>
                </div>
              </Link>

              <Link href="/ai-compliance/compare/nist-ai-rmf-vs-iso-42001" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg hover:border-brand-200 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="text-2xl font-bold text-slate-300">vs</span>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">NIST AI RMF vs ISO 42001</h3>
                  <p className="text-slate-600 mb-4">
                    U.S. framework vs international standard. Which one applies to your organization and how to implement both.
                  </p>
                  <span className="text-brand-600 font-bold text-sm group-hover:underline">Read Comparison →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Don't let AI governance stall your GTM.</h2>
            <p className="text-brand-200 text-lg mb-10 max-w-2xl mx-auto">
              Get your AI readiness score today and show enterprise buyers you take AI safety seriously. 
              Free assessment, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/ai-governance-readiness-index"
                className="w-full sm:w-auto bg-white text-brand-900 font-bold px-10 py-5 rounded-xl hover:bg-brand-50 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                Start AI Readiness Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/readiness-review"
                className="w-full sm:w-auto bg-brand-800 text-white border border-brand-700 font-bold px-10 py-5 rounded-xl hover:bg-brand-700 transition-all flex items-center justify-center gap-2"
              >
                <Handshake className="w-5 h-5" />
                Book Expert Review
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <AuthorBio authorId="kevin" />
          </div>
        </section>

        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">Related Resources</h3>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <Link href="/soc-2" className="text-slate-600 hover:text-brand-600 font-medium">SOC 2 Hub</Link>
              <Link href="/iso-27001" className="text-slate-600 hover:text-brand-600 font-medium">ISO 27001</Link>
              <Link href="/soc-2-readiness-checklist/ai-ml" className="text-slate-600 hover:text-brand-600 font-medium">SOC 2 for AI/ML</Link>
              <Link href="/soc-2-cost/ai-data" className="text-slate-600 hover:text-brand-600 font-medium">AI Company Costs</Link>
              <Link href="/compliance/directory" className="text-slate-600 hover:text-brand-600 font-medium">Company Directory</Link>
              <Link href="/auditor-directory" className="text-slate-600 hover:text-brand-600 font-medium">Find Auditors</Link>
              <Link href="/penetration-testing" className="text-slate-600 hover:text-brand-600 font-medium">Penetration Testing</Link>
              <Link href="/vendor-risk-assessment" className="text-slate-600 hover:text-brand-600 font-medium">Vendor Risk</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
