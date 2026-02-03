'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  ArrowRight, 
  AlertTriangle,
  Scale,
  CheckCircle2,
  XCircle,
  Info,
  Zap,
  RefreshCcw,
  Brain
} from 'lucide-react';

const questions = [
  {
    id: 'prohibited',
    text: 'Does your AI system use social scoring, biometric identification in public spaces, or subliminal techniques to manipulate behavior?',
    options: [
      { label: 'Yes', value: 'unacceptable' },
      { label: 'No', value: 'continue' }
    ]
  },
  {
    id: 'high_risk',
    text: 'Is your AI used in critical infrastructure, education, employment (HR Tech), law enforcement, or migration/border control?',
    options: [
      { label: 'Yes', value: 'high' },
      { label: 'No', value: 'continue' }
    ]
  },
  {
    id: 'limited_risk',
    text: 'Does your AI interact directly with humans (e.g., chatbots), generate synthetic content (deepfakes), or use emotion recognition?',
    options: [
      { label: 'Yes', value: 'limited' },
      { label: 'No', value: 'minimal' }
    ]
  }
];

const results = {
  unacceptable: {
    title: 'Unacceptable Risk',
    color: 'bg-red-500',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    bgLight: 'bg-red-50',
    icon: XCircle,
    description: 'Your AI use case is likely prohibited under the EU AI Act.',
    actions: [
      'Stop development immediately.',
      'Consult with legal counsel regarding prohibited practices.',
      'Redesign the core functionality to remove manipulative or biased elements.'
    ]
  },
  high: {
    title: 'High Risk',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
    bgLight: 'bg-orange-50',
    icon: AlertTriangle,
    description: 'Your AI is subject to strict compliance requirements under the EU AI Act.',
    actions: [
      'Implement a Quality Management System (QMS).',
      'Establish a detailed Risk Management System.',
      'Prepare technical documentation and log keeping.',
      'Register in the EU database for high-risk AI systems.'
    ]
  },
  limited: {
    title: 'Limited Risk',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    bgLight: 'bg-blue-50',
    icon: Info,
    description: 'Your AI has specific transparency obligations.',
    actions: [
      'Disclose that the content is AI-generated.',
      'Ensure users know they are interacting with an AI system.',
      'Label deepfakes and synthetic content clearly.'
    ]
  },
  minimal: {
    title: 'Minimal Risk',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    bgLight: 'bg-green-50',
    icon: CheckCircle2,
    description: 'Your AI has no specific regulatory obligations under the EU AI Act.',
    actions: [
      'Adopt voluntary codes of conduct.',
      'Maintain basic security best practices.',
      'Focus on ethical AI principles for brand trust.'
    ]
  }
};

export default function AIRiskClassifier() {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<null | keyof typeof results>(null);

  const handleAnswer = (value: string) => {
    if (value === 'continue') {
      setCurrentStep(prev => prev + 1);
    } else {
      setResult(value as keyof typeof results);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setResult(null);
  };

  const breadcrumbItems = [
    { label: 'AI Governance', href: '/ai-governance' },
    { label: 'Risk Classifier', href: '/ai-governance/risk-classifier' },
  ];

  const ResultIcon = result ? results[result].icon : null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className="flex-grow py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Scale className="w-3.5 h-3.5" />
              EU AI Act Tiering Tool
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              AI Risk Classifier
            </h1>
            <p className="text-slate-600 text-lg">
              Answer 3 questions to determine your regulatory tier under the EU AI Act.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px] flex flex-col">
            {!result ? (
              <div className="p-8 md:p-12 flex flex-col h-full">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Question {currentStep + 1} of 3</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className={`w-8 h-1.5 rounded-full transition-all ${i <= currentStep ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
                    ))}
                  </div>
                </div>

                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-tight">
                    {questions[currentStep].text}
                  </h2>
                  
                  <div className="grid gap-4">
                    {questions[currentStep].options.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => handleAnswer(option.value)}
                        className="group flex items-center justify-between p-6 rounded-lg border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left"
                      >
                        <span className="text-lg font-bold text-slate-700 group-hover:text-indigo-900">{option.label}</span>
                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-2 text-sm text-slate-400">
                  <Brain className="w-4 h-4" />
                  Based on latest EU AI Act (2026 update)
                </div>
              </div>
            ) : (
              <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`w-20 h-20 ${results[result].bgLight} rounded-xl flex items-center justify-center mb-8`}>
                  {ResultIcon && <ResultIcon className={`w-10 h-10 ${results[result].textColor}`} />}
                </div>
                
                <h2 className={`text-3xl font-black ${results[result].textColor} mb-4`}>
                  {results[result].title}
                </h2>
                
                <p className="text-xl text-slate-600 font-medium mb-8">
                  {results[result].description}
                </p>

                <div className="space-y-4 mb-10">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Recommended Actions:</h4>
                  {results[result].actions.map((action, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700">
                      <div className="mt-1">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="font-medium">{action}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={result === 'high' ? '/ai-compliance/iso-42001' : '/ai-governance'}
                    className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl text-center hover:bg-slate-800 transition-all"
                  >
                    Get Detailed Report
                  </Link>
                  <button
                    onClick={reset}
                    className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-xl text-center hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 bg-indigo-900 rounded-xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-indigo-400" />
              <h3 className="text-xl font-bold">Why Tiering Matters</h3>
            </div>
            <p className="text-indigo-100 leading-relaxed mb-6">
              The EU AI Act is a risk-based regulation. "High Risk" systems face fines of up to <strong>€35M or 7% of global turnover</strong> for non-compliance. Knowing your tier is the first step in your AI strategy.
            </p>
            <Link href="/ai-compliance/eu-ai-act" className="text-indigo-300 font-bold hover:text-white transition-colors flex items-center gap-2">
              Read the full EU AI Act Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
