'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Readiness Score', href: '/soc-2-readiness-calculator' },
  { label: 'Audit Delay Cost', href: '/soc-2-audit-delay-cost' },
  { label: 'Timeline Estimator', href: '/soc-2-timeline/estimator' },
  { label: 'Cost Calculator', href: '/compliance-roi-calculator' },
];

export default function ReadinessNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 mb-8 max-w-fit mx-auto">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              isActive
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
