'use client';

import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  FileCheck,
  Search,
  Users,
  AlertTriangle,
  Scale,
  Database,
  Lock,
  Zap
} from 'lucide-react';

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

export function VendorRiskQuestionnaire() {
  return (
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
                <div className="space-y-4 text-left">
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

        <div className="md:sticky md:top-8 h-fit space-y-8 text-left">
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
  );
}
