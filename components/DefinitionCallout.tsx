import Link from 'next/link';

interface DefinitionCalloutProps {
  title: string;
  description: string;
  href: string;
}

export default function DefinitionCallout({ title, description, href }: DefinitionCalloutProps) {
  return (
    <div className="border border-slate-200 rounded-xl bg-white p-4 text-left shadow-sm">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-sm text-slate-700 leading-relaxed mt-1">{description}</p>
      <Link href={href} className="text-sm text-brand-700 underline underline-offset-4 mt-2 inline-block">
        Learn more
      </Link>
    </div>
  );
}
