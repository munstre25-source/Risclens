import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Award, ExternalLink, Calendar } from 'lucide-react';

export interface Author {
  name: string;
  role: string;
  expertise: string[];
  bio: string;
  avatar?: string;
  linkedIn?: string;
  credentials?: string[];
}

export const RISCLENS_AUTHORS: Record<string, Author> = {
  'compliance-team': {
    name: 'RiscLens Compliance Team',
    role: 'Security & Compliance Analysts',
    expertise: ['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR', 'Vendor Risk Management'],
    bio: 'Our compliance team comprises former auditors, security engineers, and GRC professionals with 50+ combined years of experience helping organizations achieve and maintain compliance certifications.',
    credentials: ['CISA', 'CISSP', 'CIPP', 'CPA'],
  },
  'research-team': {
    name: 'RiscLens Research',
    role: 'Market Intelligence Analysts',
    expertise: ['Compliance Automation', 'Market Analysis', 'Tool Evaluation', 'Cost Benchmarking'],
    bio: 'Our research team continuously monitors the compliance automation market, analyzing pricing trends, feature updates, and industry developments to provide accurate, up-to-date intelligence.',
    credentials: ['MBA', 'CFA'],
  },
  'editorial-team': {
    name: 'RiscLens Editorial',
    role: 'Technical Writers & Editors',
    expertise: ['Technical Documentation', 'Compliance Guides', 'Best Practices'],
    bio: 'Our editorial team ensures all content meets the highest standards of accuracy, clarity, and usefulness. Every piece is reviewed by subject matter experts before publication.',
    credentials: [],
  },
};

interface AuthorBylineProps {
  authorId?: keyof typeof RISCLENS_AUTHORS;
  publishedDate?: string;
  updatedDate?: string;
  variant?: 'compact' | 'full' | 'card';
  showCredentials?: boolean;
}

export function AuthorByline({
  authorId = 'compliance-team',
  publishedDate,
  updatedDate,
  variant = 'compact',
  showCredentials = true,
}: AuthorBylineProps) {
  const author = RISCLENS_AUTHORS[authorId];
  if (!author) return null;

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
            <Shield className="w-4 h-4 text-brand-600" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">{author.name}</span>
            {showCredentials && author.credentials && author.credentials.length > 0 && (
              <span className="text-slate-400 ml-1">
                ({author.credentials.slice(0, 2).join(', ')})
              </span>
            )}
          </div>
        </div>
        {(publishedDate || updatedDate) && (
          <div className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {updatedDate ? `Updated ${updatedDate}` : `Published ${publishedDate}`}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
            <Shield className="w-8 h-8 text-brand-600" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-slate-900">{author.name}</h4>
              {author.linkedIn && (
                <a 
                  href={author.linkedIn} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-brand-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-sm text-brand-600 font-medium mb-2">{author.role}</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">{author.bio}</p>
            {showCredentials && author.credentials && author.credentials.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {author.credentials.map((cred) => (
                  <span 
                    key={cred}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600"
                  >
                    <Award className="w-3 h-3 text-amber-500" />
                    {cred}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        {(publishedDate || updatedDate) && (
          <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-4 text-xs text-slate-500">
            {publishedDate && (
              <span>Published: {publishedDate}</span>
            )}
            {updatedDate && (
              <span className="font-medium text-slate-700">Last Updated: {updatedDate}</span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-4 border-y border-slate-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
          <Shield className="w-6 h-6 text-brand-600" />
        </div>
        <div>
          <div className="font-bold text-slate-900">{author.name}</div>
          <div className="text-sm text-slate-500">{author.role}</div>
        </div>
      </div>
      <div className="text-right text-sm">
        {publishedDate && <div className="text-slate-400">Published: {publishedDate}</div>}
        {updatedDate && <div className="text-slate-600 font-medium">Updated: {updatedDate}</div>}
      </div>
    </div>
  );
}

export function generateAuthorJsonLd(authorId: keyof typeof RISCLENS_AUTHORS) {
  const author = RISCLENS_AUTHORS[authorId];
  if (!author) return null;

  return {
    '@type': 'Organization',
    '@id': 'https://risclens.com/#organization',
    name: 'RiscLens',
    url: 'https://risclens.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://risclens.com/logo/risclens-logo.png',
    },
    sameAs: [
      'https://www.linkedin.com/company/risclens',
    ],
  };
}

export function generateArticleJsonLd({
  title,
  description,
  url,
  publishedDate,
  updatedDate,
  authorId = 'compliance-team',
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  updatedDate?: string;
  authorId?: keyof typeof RISCLENS_AUTHORS;
  imageUrl?: string;
}) {
  const author = RISCLENS_AUTHORS[authorId];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: publishedDate,
    dateModified: updatedDate || publishedDate,
    author: {
      '@type': 'Organization',
      name: author?.name || 'RiscLens',
      url: 'https://risclens.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RiscLens',
      url: 'https://risclens.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://risclens.com/logo/risclens-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
  };
}

interface EditorialPolicyBadgeProps {
  variant?: 'inline' | 'footer';
}

export function EditorialPolicyBadge({ variant = 'inline' }: EditorialPolicyBadgeProps) {
  if (variant === 'footer') {
    return (
      <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <Shield className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Editorial Standards & Methodology</h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              All RiscLens content is researched, written, and reviewed by compliance professionals 
              with real-world audit experience. We maintain strict editorial independence and never 
              accept payment for coverage or rankings.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/editorial-policy"
                className="text-sm font-bold text-brand-600 hover:text-brand-700 underline underline-offset-2"
              >
                Read Our Editorial Policy
              </Link>
              <Link 
                href="/methodology"
                className="text-sm font-bold text-brand-600 hover:text-brand-700 underline underline-offset-2"
              >
                View Methodology
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link 
      href="/editorial-policy"
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-600 transition-colors"
    >
      <Shield className="w-3.5 h-3.5 text-brand-600" />
      Reviewed by Compliance Experts
    </Link>
  );
}

interface SourcesCitationProps {
  sources: {
    title: string;
    url?: string;
    publisher?: string;
    date?: string;
  }[];
}

export function SourcesCitation({ sources }: SourcesCitationProps) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-brand-600" />
        Sources & References
      </h4>
      <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
        {sources.map((source, index) => (
          <li key={index}>
            {source.url ? (
              <a 
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:text-brand-700 underline underline-offset-2"
              >
                {source.title}
              </a>
            ) : (
              <span>{source.title}</span>
            )}
            {source.publisher && (
              <span className="text-slate-400"> — {source.publisher}</span>
            )}
            {source.date && (
              <span className="text-slate-400"> ({source.date})</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function LastUpdatedBadge({ date }: { date: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-lg text-xs font-bold text-green-700">
      <Calendar className="w-3.5 h-3.5" />
      Updated {date}
    </div>
  );
}
