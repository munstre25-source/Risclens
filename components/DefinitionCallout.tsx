'use client';

import { LearnMoreLink } from './LearnMoreLink';
import { LearnMoreKey } from '@/lib/learnMoreLinks';

interface DefinitionCalloutProps {
  title: string;
  description: string;
  linkKey: LearnMoreKey;
}

export default function DefinitionCallout({ title, description, linkKey }: DefinitionCalloutProps) {
  return (
    <div className="border border-slate-200 rounded-xl bg-white p-4 text-left shadow-sm">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-sm text-slate-700 leading-relaxed mt-1">{description}</p>
      <LearnMoreLink to={linkKey} className="text-sm text-brand-700 underline underline-offset-4 mt-2 inline-block" />
    </div>
  );
}
