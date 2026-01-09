import Link from 'next/link';
import { getContextualLinks, ContextualTopic } from '@/lib/contextual-linking';

type GuideLink = { href: string; label: string };

type RelatedGuidesRowProps = {
  links?: GuideLink[];
  topics?: ContextualTopic[];
  title?: string;
  className?: string;
};

export function RelatedGuidesRow({ links = [], topics = [], title = 'Related guides', className = '' }: RelatedGuidesRowProps) {
  const dynamicLinks = topics.length > 0 ? getContextualLinks(topics) : [];
  const allLinks = [...links, ...dynamicLinks];
  
  // Dedup by href
  const uniqueLinks = Array.from(new Map(allLinks.map(link => [link.href, link])).values());

  if (!uniqueLinks.length) return null;
  
  return (
    <div className={`border border-slate-200 rounded-xl bg-white p-6 ${className}`}>
      <p className="text-sm font-semibold text-slate-900 mb-4">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {uniqueLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className="flex items-center p-3 rounded-lg border border-slate-100 hover:border-brand-200 hover:bg-brand-50 transition-all text-sm text-brand-700 font-medium group"
          >
            <span className="group-hover:translate-x-1 transition-transform">
              {link.label}
            </span>
            <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
