import { Suspense } from 'react';
import { Metadata } from 'next';
import { AuditorMatchForm } from '@/components/AuditorMatchForm';

export const metadata: Metadata = {
  title: 'Auditor Matching & RFP Generator | RiscLens',
  description: 'Generate a standardized SOC 2 or Pentest RFP and get competitive quotes from vetted auditors. Skip the discovery calls and save 20%+ on audit fees.',
};

export default function AuditorMatchPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wider">
            Decision Grade Tool
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Generate Your Standardized RFP
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stop overpaying for compliance. We help you standardize your requirements so auditors give you transparent, &quot;apples-to-apples&quot; quotes.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <Suspense fallback={<div className="h-[600px] animate-pulse bg-slate-50 rounded-xl" />}>
              <AuditorMatchForm />
            </Suspense>
          </div>
          
          <div className="bg-slate-50 border-t border-slate-200 p-8 sm:px-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vetted Network
                </h4>
                <p className="text-sm text-slate-600">
                  Only CREST, Offensive Security, and AICPA-vetted firms that specialize in SaaS & Fintech.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Cost Transparency
                </h4>
                <p className="text-sm text-slate-600">
                  Standardized bids mean no hidden fees, no &quot;consulting&quot; upsells, and no surprise retest charges.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No Sales Spam
                </h4>
                <p className="text-sm text-slate-600">
                  We act as a buffer. You only talk to auditors when you&apos;re ready to review their specific proposal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
