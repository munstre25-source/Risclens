import Link from 'next/link';
import { LinkCluster } from '@/lib/pseo-internal-links';
import { uiTokens } from '@/components/ui/uiTokens';

interface InternalLinksProps {
  clusters: LinkCluster[];
  className?: string;
}

export function InternalLinks({ clusters, className = '' }: InternalLinksProps) {
  return (
    <aside className={`space-y-6 ${className}`}>
      {clusters.map((cluster, idx) => (
        <div key={idx} className={`${uiTokens.card} p-4`}>
          <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">
            {cluster.title}
          </h3>
          <ul className="space-y-2">
            {cluster.links.map((link, linkIdx) => (
              <li key={linkIdx}>
                <Link
                  href={link.href}
                  className={`block text-sm hover:underline ${
                    link.priority === 'high' 
                      ? 'text-slate-900 font-medium' 
                      : 'text-slate-600'
                  }`}
                  title={link.title}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

export function InternalLinksInline({ clusters }: InternalLinksProps) {
  const allLinks = clusters.flatMap(c => c.links).slice(0, 8);
  
  return (
    <div className="my-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-4">Related Comparisons</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {allLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="text-sm text-slate-700 hover:text-slate-900 hover:underline"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Breadcrumbs({ 
  items 
}: { 
  items: { label: string; href: string }[] 
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm text-slate-500">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {idx > 0 && <span className="text-slate-300">/</span>}
            {idx === items.length - 1 ? (
              <span className="text-slate-700 font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-slate-900 hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function RelatedToolsGrid({ 
  tools, 
  currentSlug 
}: { 
  tools: Array<{ slug: string; name: string; tagline: string | null; pricing_starting: string | null }>;
  currentSlug: string;
}) {
  const filtered = tools.filter(t => t.slug !== currentSlug).slice(0, 6);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map(tool => (
        <Link
          key={tool.slug}
          href={`/pricing/${tool.slug}`}
          className="block p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all"
        >
          <h4 className="font-semibold text-slate-900">{tool.name}</h4>
          {tool.tagline && (
            <p className="text-sm text-slate-500 mt-1 line-clamp-1">{tool.tagline}</p>
          )}
          {tool.pricing_starting && (
            <p className="text-sm font-medium text-slate-700 mt-2">
              From {tool.pricing_starting}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
