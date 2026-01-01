'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'SOC 2 Readiness', href: '/' },
  { label: 'SaaS', href: '/soc-2-readiness/saas' },
  { label: 'Fintech', href: '/soc-2-readiness/fintech' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-slate-900">
            RiscLens
          </Link>

          {/* Navigation */}
          <nav aria-label="Main navigation">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-sm transition-colors ${
                        isActive
                          ? 'text-slate-900 font-medium'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
