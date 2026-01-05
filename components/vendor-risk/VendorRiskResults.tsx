import { useState, useEffect } from 'react';
import { VendorRiskInput, VendorRiskResult } from '@/lib/vendorRisk';
import { PostResultsCTA } from '../PostResultsCTA';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';

interface VendorRiskResultsProps {
  result: VendorRiskResult;
  inputs?: VendorRiskInput;
}

const tierColors: Record<VendorRiskResult['tier'], string> = {
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-rose-100 text-rose-800',
};

export function VendorRiskResults({ result, inputs }: VendorRiskResultsProps) {
  const [templateStatus, setTemplateStatus] = useState<string | null>(null);

    useEffect(() => {
      trackEvent('vendor_risk_results_viewed', {
        score: result.score,
        tier: result.tier,
      });
    }, [result, inputs]);

  const handleTemplateRequest = async () => {
    const email = window.prompt("Where should we send the questionnaire + scoring template?");
    if (!email || !email.includes('@')) return;

    setTemplateStatus('Sending...');
    trackEvent('vendor_risk_template_requested', { email });

    try {
      await fetch('/api/lead/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
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
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
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
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-800">Reassessment cadence</p>
          <p className="text-sm text-slate-600 max-w-xs">{result.cadence}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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

      <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
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

