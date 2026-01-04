'use client';

import { useEffect, useId, useState } from 'react';

type HowItWorksAccordionProps = {
  className?: string;
  defaultExpandedOnDesktop?: boolean;
};

export function HowItWorksAccordion({ className = '', defaultExpandedOnDesktop = true }: HowItWorksAccordionProps) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (defaultExpandedOnDesktop && window.innerWidth >= 768) {
      setOpen(true);
    }
  }, [defaultExpandedOnDesktop]);

  return (
    <div className={`border border-slate-200 rounded-xl bg-white ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={contentId}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
      >
        How it works
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div id={contentId} className="px-4 pb-4 text-sm text-slate-700 space-y-2">
          <ol className="list-decimal list-inside space-y-1">
            <li>Answer a few quick questions (≈2 minutes).</li>
            <li>Get a readiness score + estimated cost range.</li>
            <li>See top gaps + next steps to prioritize.</li>
          </ol>
        </div>
      )}
    </div>
  );
}
