'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

interface AuditorMatchCTAProps {
  leadId?: string | null;
  email?: string;
  context?: string;
  type?: 'auditor' | 'pentest' | 'vendor';
}

export function AuditorMatchCTA({ leadId, email, context = 'general', type = 'auditor' }: AuditorMatchCTAProps) {
  const content = {
    auditor: {
      title: 'Request Auditor Quotes',
      description: 'Ready to hire? Don&apos;t overpay. Use your readiness score to generate a formal RFP and get competitive quotes from vetted auditors who specialize in your industry.',
      button: 'Generate RFP Now →',
      href: '/auditor-match',
    },
    pentest: {
      title: 'Request Pentest Quotes',
      description: 'Need a pentest for SOC 2? Get competitive bids from CREST and Offensive Security certified firms that understand your compliance requirements.',
      button: 'Get Pentest Quotes →',
      href: '/auditor-match?type=pentest',
    },
    vendor: {
      title: 'Request Vendor Match',
      description: 'Looking for a specific compliance tool or service? Get a curated list of vendors that fit your specific size, tech stack, and budget.',
      button: 'Find Vendors →',
      href: '/auditor-match?type=vendor',
    },
  }[type];

  return (
    <div className="card border-2 border-brand-500 bg-brand-50 shadow-lg p-6 sm:p-8">
      <div className="flex flex-col md:row gap-6 items-center">
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
            Decision Grade
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {content.title}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {content.description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Verified Providers
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              3+ Competitive Bids
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save 20%+
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <Link
            href={`${content.href}${leadId ? (content.href.includes('?') ? '&' : '?') + `lead_id=${leadId}` : ''}${email ? `${(leadId || content.href.includes('?')) ? '&' : '?'}email=${encodeURIComponent(email)}` : ''}`}
            onClick={() => trackEvent('vendor_match_cta_clicked', { context, email, type })}
            className="btn-primary px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95"
          >
            {content.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
