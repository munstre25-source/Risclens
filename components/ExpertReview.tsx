import React from 'react';

interface ExpertReviewProps {
  authorName: string;
  authorTitle: string;
  date: string;
}

export default function ExpertReview({ authorName, authorTitle, date }: ExpertReviewProps) {
  return (
    <div className="flex items-center gap-4 py-6 border-y border-slate-100 my-10">
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm border border-slate-200">
        {authorName.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-900">Fact-checked by {authorName}</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800 uppercase tracking-wider">
            Verified
          </span>
        </div>
        <p className="text-xs text-slate-500">
          {authorTitle} • Last updated {date}
        </p>
      </div>
    </div>
  );
}
