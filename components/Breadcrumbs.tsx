'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import Script from 'next/script';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  const breadcrumbs = items || (pathname === '/' ? [] : pathname.split('/').filter(Boolean).map((segment, index, array) => {
    const href = `/${array.slice(0, index + 1).join('/')}`;
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return { label, href };
  }));

  if (breadcrumbs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://risclens.com"
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": crumb.label,
        "item": `https://risclens.com${crumb.href}`
      }))
    ]
  };

  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100 py-3">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/" className="hover:text-brand-600 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-slate-900 truncate max-w-[200px]" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-brand-600 transition-colors">
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
