'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

interface HumanCheckCTAProps {
  context?: string;
  className?: string;
  leadId?: string | null;
  email?: string;
}

export function HumanCheckCTA({ context = 'general', className = '', leadId, email }: HumanCheckCTAProps) {
  return (
    <div className={`p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-4 shadow-sm ${className}`}>
      <div className="flex justify-center">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 overflow-hidden">
               <div className="h-full w-full bg-gradient-to-br from-slate-300 to-slate-400" />
            </div>
          ))}
        </div>
      </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Audit Readiness Validation</p>
            <h3 className="text-xl font-bold text-slate-900">Expert Scoping & Validation Review</h3>
          </div>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Ensure your plan is actually auditor-ready. Get a 15-minute technical validation to confirm your scope, evidence strategy, and timeline before hiring a vendor.
          </p>

      <div className="flex flex-col items-center gap-3">
        <Link
          href={`/readiness-review${leadId ? `?lead_id=${leadId}` : ''}${email ? `${leadId ? '&' : '?'}email=${encodeURIComponent(email)}` : ''}`}
          onClick={() => trackEvent('human_cta_clicked', { context, email })}
          className="inline-flex items-center justify-center px-8 py-3 bg-white border border-slate-300 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          Talk to a Compliance Expert →
        </Link>
        <div className="flex items-center gap-4 text-[10px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No sales demo
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Purely technical guidance
          </span>
        </div>
      </div>
    </div>
  );
}
