import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';

interface LastVerifiedBadgeProps {
  date: string;
  framework?: string;
}

export function LastVerifiedBadge({ date, framework }: LastVerifiedBadgeProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium mb-4">
      <CheckCircle2 size={14} className="text-emerald-500" />
      <span>Verified Accuracy: {formattedDate}</span>
      {framework && (
        <>
          <span className="w-1 h-1 rounded-full bg-emerald-300" />
          <span>{framework}</span>
        </>
      )}
    </div>
  );
}

export function AccuracyDisclaimer() {
  return (
    <div className="mt-8 p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-xs italic">
      <p>
        Disclaimer: Compliance costs and timelines are estimates based on market benchmarks (AICPA fee surveys, vendor pricing indices 2025). 
        Actual auditor fees and internal effort will vary based on your specific control environment, system complexity, and auditor selection. 
        Consult with a qualified CPA for a formal statement of work.
      </p>
    </div>
  );
}
