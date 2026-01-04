'use client';

import Link from 'next/link';
import { seoClusters, ClusterKey } from '@/lib/seoClusters';

type Props = {
  currentPath: string;
  clusterKey: ClusterKey;
  heading?: string;
};

export function RelatedLinks({ currentPath, clusterKey, heading = 'Related guides' }: Props) {
  const cluster = seoClusters[clusterKey];
  const links = [cluster.hub, ...cluster.leaves]
    .filter((item) => item.href !== currentPath)
    .slice(0, 6);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 space-y-2">
      <p className="text-sm font-semibold text-slate-900">{heading}</p>
      <div className="space-y-2">
        {links.map((item, idx) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block text-sm ${idx === 0 ? 'text-brand-700 font-semibold' : 'text-slate-700'} hover:text-brand-800 underline underline-offset-4`}
          >
            {idx === 0 ? `View all ${cluster.hub.label}` : item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
