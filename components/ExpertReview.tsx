import React from 'react';
import Script from 'next/script';
import { authors } from '@/lib/authors';

interface ExpertReviewProps {
  authorId: keyof typeof authors;
  date: string;
  title?: string;
  url?: string;
}

export default function ExpertReview({ authorId, date, title, url }: ExpertReviewProps) {
  const author = authors[authorId];
  if (!author) return null;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://risclens.com';
  const reviewUrl = url
    ? (url.startsWith('http') ? url : `${baseUrl}${url}`)
    : undefined;

  // Normalize date to YYYY-MM-DD for schema.org
  const parsedDate = new Date(date);
  const dateIso = isNaN(parsedDate.getTime())
    ? undefined
    : parsedDate.toISOString().split('T')[0];

  const itemTitle = title || 'RiscLens Compliance Guide';
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Service",
      "name": itemTitle,
      "headline": itemTitle,
      "url": reviewUrl,
      "dateModified": dateIso,
      "provider": {
        "@type": "Organization",
        "name": "RiscLens",
        "url": baseUrl,
      },
    },
    "author": {
      "@type": "Person",
      "name": author.name,
      "jobTitle": author.role,
    },
    "reviewAspect": "Technical Accuracy and Compliance Alignment"
  };

  return (
    <>
      <Script
        id={`review-schema-${authorId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-8 border-y border-slate-100 my-10 bg-slate-50/50 px-6 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-500 font-bold text-sm border border-slate-200 shadow-sm">
            {author.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900">Expertly reviewed by {author.name}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">
                Certified
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {author.role} • {author.credentials.join(', ')}
            </p>
          </div>
        </div>
        <div className="sm:ml-auto text-left sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-tight mb-1">Last Verified</p>
          <p className="text-sm font-bold text-slate-700">{date}</p>
          <a href="/methodology" className="text-[10px] text-brand-600 hover:underline font-bold uppercase tracking-widest mt-1 block">
            Our Editorial Process →
          </a>
        </div>
      </div>
    </>
  );
}
