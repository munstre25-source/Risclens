'use client';

import { trackEvent } from '@/lib/analytics';
import { useState } from 'react';

interface MonetizationCTAProps {
  leadId: string | null;
  email?: string;
  context?: string;
}

export function MonetizationCTA({ leadId, email: initialEmail, context }: MonetizationCTAProps) {
  const [email, setEmail] = useState(initialEmail || '');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    trackEvent('monetization_cta_clicked', { context, email });

    try {
      const resp = await fetch('/api/lead/request-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          review_type: 'auditor_intro',
          email,
        }),
      });

      const data = await resp.json();
      if (!resp.ok || !data.success) throw new Error(data.error || 'Failed to submit request');

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className="card bg-emerald-50 border-emerald-200 p-6 text-center animate-fade-in">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-emerald-900 mb-2">Request Received</h3>
        <p className="text-emerald-700 text-sm">
          We&apos;ve received your request for a strategic auditor introduction. A compliance specialist will contact you shortly to confirm your specific scope and timeline.
        </p>
      </div>
    );
  }

  return (
    <div className="card bg-slate-900 border-slate-800 p-8 shadow-xl text-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/30">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Strategic Outcome
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Request Auditor Quotes
        </h3>
        <p className="text-slate-400 mb-6 leading-relaxed">
          Skip the manual vetting process. Get deterministic audit fee quotes from vetted firms who understand your specific tech stack and compliance scope.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-grow">
            <input
              type="email"
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? 'Processing...' : 'Get Auditor Quotes'}
          </button>
        </form>
        
        {status === 'error' && (
          <p className="text-rose-400 text-xs mt-3">{errorMessage}</p>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-t border-slate-800 pt-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Deal Velocity</p>
            <p className="text-xs text-slate-400">Unblock enterprise sales cycles faster with a vetted audit path.</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Audit Readiness</p>
            <p className="text-xs text-slate-400">Align with an auditor who understands your specific scope and risks.</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Fixed Pricing</p>
            <p className="text-xs text-slate-400">Skip the negotiation dance with transparent, pre-vetted fee structures.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
