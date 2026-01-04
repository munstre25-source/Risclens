'use client';

import Link from 'next/link';
import { uiTokens } from './ui/uiTokens';

type Props = {
  className?: string;
};

export function HowItWorksButton({ className }: Props) {
  return (
    <Link
      href="#how-it-works"
      className={`${uiTokens.secondaryButton} ${className ?? ''}`}
    >
      How it works
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
