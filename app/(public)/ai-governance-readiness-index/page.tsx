import { Suspense } from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIGovernanceForm from '@/components/AIGovernanceForm';
import { Cpu, Shield, Zap, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ISO 42001 AI Governance Readiness Index | RiscLens',
  description: 'Assess your AI Management System (AIMS) against ISO 42001 standards. Get a deterministic readiness score and certification cost estimate.',
};

export default function AIGovernancePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">The First ISO 42001 Index for AI Startups</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            AI Governance <span className="text-brand-600">Readiness Index</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The global standard for AI Trust is here. Determine if your AI Management System (AIMS) is audit-ready in under 3 minutes.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="grid md:grid-cols-[1fr_320px]">
            <div className="p-8 sm:p-12">
              <Suspense fallback={<div className="h-[400px] animate-pulse bg-slate-100 rounded-xl" />}>
                <AIGovernanceForm />
              </Suspense>
            </div>
            
            <div className="bg-slate-900 p-8 sm:p-10 text-white flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-8">What this index covers:</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <Cpu className="w-5 h-5 text-brand-400 shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold">AIMS Baseline</p>
                    <p className="text-slate-400">Alignment with ISO 42001:2023 clauses.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Shield className="w-5 h-5 text-brand-400 shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold">Risk Management</p>
                    <p className="text-slate-400">Impact assessments for bias & safety.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Zap className="w-5 h-5 text-brand-400 shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold">Cost Estimate</p>
                    <p className="text-slate-400">Deterministic auditor fee benchmarks.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Lock className="w-5 h-5 text-brand-400 shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold">Data Governance</p>
                    <p className="text-slate-400">PII handling in model lifecycles.</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-xs text-slate-500 italic">
                  "ISO 42001 is the new SOC 2 for the AI era. RiscLens is the only platform providing deterministic readiness for this standard."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
