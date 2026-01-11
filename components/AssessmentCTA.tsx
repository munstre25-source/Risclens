'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

interface AssessmentCTAProps {
  label?: string;
  href?: string;
  variant?: 'primary' | 'outline';
  className?: string;
}

export default function AssessmentCTA({ 
  label = 'Validate Readiness Now', 
  href = '/soc-2-readiness-calculator',
  variant = 'primary',
  className = '',
}: AssessmentCTAProps) {
  const buttonClass =
    variant === 'outline'
      ? 'btn-secondary text-lg px-8 py-4 bg-white text-brand-900 hover:bg-brand-50 border border-brand-200'
      : 'btn-primary text-lg px-8 py-4';

  return (
    <section className={`border-t border-slate-200 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-brand-50 border border-brand-100 mb-1 mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">Audit Readiness Validation</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Establish Your Audit Baseline</h2>
        <p className="text-slate-600 max-w-xl mx-auto">Get your readiness score, identify critical gaps, and unblock enterprise deal velocity in under 2 minutes.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
          <Link
            href={href}
            onClick={() => trackEvent('cta_click', { cta_label: label, destination: href })}
            className={buttonClass}
          >
            {label}
          </Link>
          <div className="text-center sm:text-left border-l border-slate-200 pl-6 hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">Technical Sanity Check</p>
            <p className="text-xs text-slate-500">Confirm readiness with an expert. No sales demo.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
