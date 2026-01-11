import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface AuthorBylineProps {
  authorName?: string;
  credentials?: string;
  lastUpdated?: string;
  expertReviewed?: boolean;
}

export default function AuthorByline({
  authorName = "Ryan Miller",
  credentials = "CISO, CISA",
  lastUpdated = "January 2026",
  expertReviewed = true
}: AuthorBylineProps) {
  return (
    <div className="flex flex-wrap items-center gap-y-4 gap-x-8 py-6 border-y border-slate-100 my-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold border border-slate-200">
          {authorName.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 leading-none">
            {authorName}, <span className="font-medium text-slate-500">{credentials}</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Compliance Advisory Board
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 text-slate-500">
          <span className="text-xs">Last updated:</span>
          <span className="text-xs font-medium text-slate-700">{lastUpdated}</span>
        </div>

        {expertReviewed && (
          <div className="flex items-center gap-1.5 bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full border border-brand-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Expert Reviewed</span>
          </div>
        )}
      </div>

      <div className="ml-auto hidden md:flex items-center gap-1.5 text-slate-400">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span className="text-[11px]">Fact-checked & Verified</span>
      </div>
    </div>
  );
}
