import React from 'react';

type DisclaimerVariant = 'cost' | 'readiness' | 'pentest' | 'vra';

interface EstimateDisclaimerProps {
  variant: DisclaimerVariant;
  className?: string;
}

export const EstimateDisclaimer: React.FC<EstimateDisclaimerProps> = ({ variant, className = '' }) => {
  const disclaimers: Record<DisclaimerVariant, string> = {
    cost: "Estimates are directional and vary by scope, systems, and auditor expectations.",
    readiness: "Readiness scores indicate likely gaps; they are not a certification or audit opinion.",
    pentest: "Pentest scope estimates are directional and should be validated with your auditor and a qualified tester.",
    vra: "Vendor risk scoring indicates relative risk based on common criteria; it is not a formal security guarantee."
  };

  return (
    <div className={`text-xs text-slate-500 mt-4 leading-relaxed bg-slate-50 border border-slate-100 p-3 rounded-lg ${className}`}>
      <div className="flex gap-2">
        <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>{disclaimers[variant]}</p>
      </div>
    </div>
  );
};
