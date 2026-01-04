import { VendorRiskResult } from '@/lib/vendorRisk';

interface VendorRiskResultsProps {
  result: VendorRiskResult;
}

const tierColors: Record<VendorRiskResult['tier'], string> = {
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-rose-100 text-rose-800',
};

export function VendorRiskResults({ result }: VendorRiskResultsProps) {
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
    </div>
  );
}
