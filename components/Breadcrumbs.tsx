'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import Script from 'next/script';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const labelOverrides: Record<string, string> = {
  'soc-2': 'SOC 2',
  'iso-27001': 'ISO 27001',
  'iso-42001': 'ISO 42001',
  'pci-dss': 'PCI-DSS',
  'hipaa': 'HIPAA',
  'gdpr': 'GDPR',
  'aws': 'AWS',
  'gcp': 'GCP',
  'azure': 'Azure',
  'kubernetes': 'Kubernetes',
  'supabase': 'Supabase',
  'vercel': 'Vercel',
  'ai': 'AI',
  'cto': 'CTOs',
  'devops': 'DevOps',
  'saas': 'SaaS',
  'fintech': 'Fintech',
  'healthcare': 'Healthcare',
  'stack': 'Stack',
};

const skipSegments = ['for', '(public)'];

const hubRoutes: Record<string, { label: string; href: string }> = {
  'stack': { label: 'Tech-Stack Hub', href: '/soc-2/stack' },
  'industries': { label: 'Industries', href: '/soc-2/industries' },
  'compare': { label: 'Comparisons', href: '/compare' },
  'directory': { label: 'Directory', href: '/compliance/directory' },
  'migrate': { label: 'Migration Hub', href: '/compliance/migrate' },
  'evidence': { label: 'Evidence Vault', href: '/soc-2-evidence/vault' },
};

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  variant?: 'default' | 'dark';
}

export function Breadcrumbs({ items, variant = 'default' }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  if (pathname === '/' || pathname === '') return null;

  const breadcrumbs: BreadcrumbItem[] = items || (() => {
    const segments = pathname.split('/').filter(seg => seg && !skipSegments.includes(seg));
    const result: BreadcrumbItem[] = [];
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const href = `/${segments.slice(0, i + 1).join('/')}`;
      
      let label = labelOverrides[segment.toLowerCase()] || 
        segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      
      if (hubRoutes[segment.toLowerCase()]) {
        const hub = hubRoutes[segment.toLowerCase()];
        result.push({ label: hub.label, href: hub.href });
      } else {
        result.push({ label, href });
      }
    }
    
    return result;
  })();

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

  const isDark = variant === 'dark';

  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={isDark ? "bg-transparent py-3" : "bg-white border-b border-slate-100 py-3"}>
        <div className={`max-w-6xl mx-auto px-4 flex items-center gap-2 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide ${isDark ? 'text-blue-200' : 'text-slate-500'}`}>
          <Link href="/" className={`transition-colors flex items-center gap-1 ${isDark ? 'hover:text-white' : 'hover:text-brand-600'}`}>
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={`${crumb.href}-${index}`} className="flex items-center gap-2">
              <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-blue-400' : 'text-slate-300'}`} />
              {index === breadcrumbs.length - 1 ? (
                <span className={`font-medium truncate max-w-[200px] ${isDark ? 'text-white' : 'text-slate-900'}`} aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-brand-600'}`}>
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
