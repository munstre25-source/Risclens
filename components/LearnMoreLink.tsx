'use client';

import Link from 'next/link';
import { learnMoreLinks, LearnMoreKey } from '@/lib/learnMoreLinks';

type LearnMoreLinkProps = {
  to: LearnMoreKey;
  className?: string;
  children?: React.ReactNode;
};

export function LearnMoreLink({ to, className = '', children = 'Learn more' }: LearnMoreLinkProps) {
  const href = learnMoreLinks[to];

  if (process.env.NODE_ENV !== 'production') {
    if (!href || !href.startsWith('/')) {
      throw new Error(`Invalid LearnMoreLink href for key "${to}". Received: "${href}"`);
    }
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
