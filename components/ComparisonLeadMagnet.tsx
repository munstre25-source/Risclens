'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ComparisonLeadMagnetProps {
  toolA: string;
  toolB: string;
}

export default function ComparisonLeadMagnet({ toolA, toolB }: ComparisonLeadMagnetProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await fetch('/api/lead/partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          lead_type: 'comparison_guide',
          payload: { toolA, toolB },
          source_url: window.location.href,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Lead capture failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-12 bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800">
      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-500/30">
            Free Procurement Resource
          </div>
          <h3 className="text-3xl font-bold leading-tight">
            The 2026 Procurement Guide: {toolA} vs {toolB}
          </h3>
          <p className="text-slate-400 text-lg">
            Download our internal negotiation playbook. Includes pricing benchmarks, 
            hidden platform fees, and a 12-month compliance roadmap for your specific stack.
          </p>
          <ul className="space-y-3">
            {[
              'Real-world pricing benchmarks for 2026',
              'Hidden "Implementation Fee" breakdown',
              'Contract negotiation checklist',
              'Platform-specific auditor requirements',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-inner">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-sm font-medium text-brand-300 uppercase tracking-widest">Instant Download</p>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                    required
                  />
                  <p className="text-[10px] text-slate-400 mt-1">We'll use this to send your comparison guide and occasional market insights.</p>
                </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-brand-500/20 transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Send My Guide (PDF)'}
              </button>
              <p className="text-[10px] text-slate-500 text-center uppercase tracking-tighter">
                Securely delivered via email. No spam, just compliance data.
              </p>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-bold">Check Your Inbox!</h4>
              <p className="text-slate-400">
                The {toolA} vs {toolB} Procurement Guide is on its way to <span className="text-brand-300 font-medium">{email}</span>.
              </p>
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-slate-400 mb-4 italic">Next step for you:</p>
                <Link
                  href="/compliance-roi-calculator"
                  className="inline-block text-brand-400 hover:text-brand-300 font-bold border-b border-brand-400/50 hover:border-brand-300 transition-all"
                >
                  Calculate Your Total Compliance ROI →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl"></div>
    </div>
  );
}
