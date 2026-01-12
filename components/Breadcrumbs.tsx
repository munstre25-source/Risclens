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
    
    const breadcrumbs = items || (pathname === '/' ? [] : pathname.split('/').filter(Boolean).reduce((acc: BreadcrumbItem[], segment, index, array) => {
      // Logic for framework routes that were moved to /compliance
      const frameworks = ['soc-2', 'iso-27001', 'pci-dss', 'hipaa', 'gdpr'];
      
      let label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      let href = `/${array.slice(0, index + 1).join('/')}`;

      // Handle the 'for' segment - it's usually just a structural segment, not a page
      if (segment.toLowerCase() === 'for') {
        return acc; // Skip 'for' in breadcrumbs to avoid 404
      }

      // If the segment is a framework, it might need to link to /compliance/[framework]
      if (frameworks.includes(segment.toLowerCase()) && !href.startsWith('/compliance')) {
        href = `/compliance/${segment.toLowerCase()}`;
        
        // Ensure we only have one 'Compliance' breadcrumb
        if (acc.length === 0 || acc[acc.length - 1].label !== 'Compliance') {
          acc.push({ label: 'Compliance', href: '/compliance' });
        }
      }

      acc.push({ label, href });
      return acc;
    }, []));


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
