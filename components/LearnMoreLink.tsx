'use client';

import Link from 'next/link';
import { learnMoreLinks, LearnMoreKey } from '@/lib/learnMoreLinks';

type LearnMoreLinkProps = {
  to: LearnMoreKey;
  className?: string;
  children?: React.ReactNode;
};

export function LearnMoreLink({ to, className = '', children = 'Learn more' }: LearnMoreLinkProps) {
  const href = learnMoreLinks[to] || '/';

  if (process.env.NODE_ENV !== 'production') {
    if (!learnMoreLinks[to] || !href.startsWith('/')) {
      console.warn(`Invalid LearnMoreLink href for key "${to}". Received: "${href}". Falling back to "/".`);
    }
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
