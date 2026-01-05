'use client';

import { useState, useEffect } from 'react';
import { VendorRiskInput, VendorRiskResult } from '@/lib/vendorRisk';
import { PostResultsCTA } from '../PostResultsCTA';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';

interface VendorRiskResultsProps {
  result: VendorRiskResult;
  inputs?: VendorRiskInput;
  email?: string;
}

const tierColors: Record<VendorRiskResult['tier'], string> = {
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-rose-100 text-rose-800',
};

export function VendorRiskResults({ result, inputs, email: initialEmail }: VendorRiskResultsProps) {
  const [templateStatus, setTemplateStatus] = useState<string | null>(null);
  const [unlockEmail, setUnlockEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(!!initialEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    trackEvent('vendor_risk_results_viewed', {
      score: result.score,
      tier: result.tier,
      is_gated: !isUnlocked
    });
  }, [result, isUnlocked]);

  const handleUnlock = async (e: FormEvent) => {
    e.preventDefault();
    if (!unlockEmail.includes('@')) return;

    setIsSubmitting(true);
    trackEvent('vendor_risk_unlocked', { email: unlockEmail });

    try {
      // Capture lead and results
      await fetch('/api/vendor-risk-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: unlockEmail,
          company: 'Unknown (Value-First)',
          industry: 'VRA Triage',
          inputs,
          result,
          source_url: window.location.href,
        }),
      });
      setIsUnlocked(true);
    } catch (err) {
      console.error(err);
      setIsUnlocked(true); // Unlock anyway for UX
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTemplateRequest = async () => {
    const emailToUse = initialEmail || unlockEmail;
    
    if (!emailToUse || !emailToUse.includes('@')) {
      // This shouldn't happen if they are already unlocked, but safety first
      const prompted = window.prompt("Where should we send the questionnaire + scoring template?");
      if (prompted) setUnlockEmail(prompted);
      return;
    }

    setTemplateStatus('Sending...');
    trackEvent('vendor_risk_template_requested', { email: emailToUse });

    try {
      await fetch('/api/lead/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailToUse,
          lead_type: 'vendor_risk_template',
          source_url: window.location.href,
        }),
      });
      setTemplateStatus('Sent! Check your inbox shortly.');
    } catch (err) {
      setTemplateStatus('Could not send right now.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-800">Risk tier</p>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${tierColors[result.tier]}`}>
              {result.tier === 'low' && 'Low'}
              {result.tier === 'medium' && 'Medium'}
              {result.tier === 'high' && 'High'}
            </span>
            <span className="text-sm text-slate-600">Score {result.score}/100</span>
          </div>
        </div>
        <div className="sm:text-right">
          <p className="text-sm font-semibold text-slate-800">Reassessment cadence</p>
          <p className="text-sm text-slate-600 max-w-xs">{result.cadence}</p>
        </div>
      </div>

      {!isUnlocked ? (
        <div className="relative">
          {/* Blurred Background Content */}
          <div className="grid gap-4 md:grid-cols-2 opacity-20 pointer-events-none filter blur-sm">
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
              <p className="text-sm font-semibold text-slate-900">Required due diligence package</p>
              <div className="h-20 bg-slate-100 rounded"></div>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
              <p className="text-sm font-semibold text-slate-900">Minimum security requirements</p>
              <div className="h-20 bg-slate-100 rounded"></div>
            </div>
          </div>

          {/* Unlock Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="max-w-md w-full bg-white p-6 rounded-2xl border border-brand-200 shadow-xl text-center space-y-4">
              <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Unlock Full Evidence Package</h4>
                <p className="text-sm text-slate-600">Get the exact list of SOC 2/ISO evidence needed for this risk tier.</p>
              </div>
              <form onSubmit={handleUnlock} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter work email"
                  value={unlockEmail}
                  onChange={(e) => setUnlockEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-600 outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Unlocking...' : 'Reveal Evidence & Analysis'}
                </button>
              </form>
              <p className="text-[10px] text-slate-400">By unlocking, you agree to receive VRA resources. Opt-out anytime.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 animate-fade-in">
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
              <p className="text-sm font-semibold text-slate-900">Required due diligence package</p>
              <ul className="space-y-2 text-sm text-slate-700">
                {result.evidencePackage.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
              <p className="text-sm font-semibold text-slate-900">Minimum security requirements</p>
              <ul className="space-y-2 text-sm text-slate-700">
                {result.requirements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3 animate-fade-in">
            <p className="text-sm font-semibold text-slate-900">Why this tier</p>
            <ul className="space-y-2 text-sm text-slate-700">
              {result.why.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500">Guidance only. Use this to prioritize reviews; always confirm with your risk team.</p>
          </div>

          <PostResultsCTA
            title="Turn this into a repeatable vendor risk program"
            description="Implement a lightweight scoring model, review cadence, and evidence flow that auditors accept—without heavyweight GRC tooling."
            primaryCtaLabel="Set Up Vendor Risk Program"
            primaryCtaHref="/vendor-risk-program"
            primaryCtaOnClick={() => trackEvent('vendor_risk_program_cta_clicked')}
            secondaryCtaLabel={templateStatus || "Download questionnaire + scoring template"}
            secondaryCtaOnClick={handleTemplateRequest}
            footnote="Designed for early-stage teams."
          />
        </>
      )}

      <div className="flex justify-center mt-4">
        <Link
          href="/vendor-risk-assessment"
          className="text-sm text-slate-500 hover:text-brand-600 transition"
        >
          ← Back to Vendor Risk Guide
        </Link>
      </div>
    </div>
  );
}
