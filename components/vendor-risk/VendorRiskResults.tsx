import { useState } from 'react';
import { VendorRiskInput, VendorRiskResult } from '@/lib/vendorRisk';

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
  const [helpOption, setHelpOption] = useState('triage_help');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHelp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs) {
      setStatus('Add your inputs first.');
      return;
    }
    setIsSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch('/api/vendor-risk-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email || undefined,
          inputs,
          result,
          source_url: typeof window !== 'undefined' ? window.location.href : '',
          help_option: helpOption,
          help_notes: notes || undefined,
        }),
      });
      if (!res.ok) throw new Error('Could not send right now.');
      setStatus('Request received. We will follow up shortly.');
      setNotes('');
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Could not send right now.');
    } finally {
      setIsSubmitting(false);
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

      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
        <p className="text-sm font-semibold text-slate-900">Need vendor risk help?</p>
        <p className="text-sm text-slate-600">Optional: request triage help, evidence pack review, or contract/subprocessor review.</p>
        <form onSubmit={submitHelp} className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-800">Choose one</label>
            <select
              value={helpOption}
              onChange={(e) => setHelpOption(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white"
            >
              <option value="triage_help">Triage my vendors (pick the right tier)</option>
              <option value="evidence_review">Evidence pack review (by tier)</option>
              <option value="contract_review">Contract / subprocessor review</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-800">Work email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
              placeholder="you@company.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-800">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
              rows={2}
              placeholder="Share vendor context or timing"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
            >
              {isSubmitting ? 'Sending…' : 'Request help'}
            </button>
            {status && <p className="text-sm text-slate-600">{status}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
