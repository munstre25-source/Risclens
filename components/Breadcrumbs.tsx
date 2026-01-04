'use client';

import Link from 'next/link';
import { seoClusters, getClusterByPath } from '@/lib/seoClusters';

type Props = {
  currentPath: string;
  title?: string;
};

export function Breadcrumbs({ currentPath, title }: Props) {
  const clusterKey = getClusterByPath(currentPath);
  const cluster = clusterKey ? seoClusters[clusterKey] : null;

  const items = [
    { href: '/', label: 'Home' },
    ...(cluster ? [{ href: cluster.hub.href, label: cluster.hub.label }] : []),
    { href: currentPath, label: title || 'Current' },
  ];

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600 mb-4 overflow-hidden">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, idx) => (
          <li key={item.href} className="flex items-center gap-1 max-w-[50vw] truncate">
            {idx > 0 && <span className="text-slate-400">/</span>}
            {idx === items.length - 1 ? (
              <span className="truncate">{item.label}</span>
            ) : (
              <Link href={item.href} className="truncate hover:text-brand-700">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
