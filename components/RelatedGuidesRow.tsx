import Link from 'next/link';

type GuideLink = { href: string; label: string };

type RelatedGuidesRowProps = {
  links: GuideLink[];
  className?: string;
};

export function RelatedGuidesRow({ links, className = '' }: RelatedGuidesRowProps) {
  if (!links.length) return null;
  return (
    <div className={`border border-slate-200 rounded-xl bg-white p-4 ${className}`}>
      <p className="text-sm font-semibold text-slate-900 mb-2">Related guides</p>
      <div className="flex flex-wrap gap-3 text-sm">
        {links.slice(0, 3).map((link) => (
          <Link key={link.href} href={link.href} className="text-brand-700 underline underline-offset-4 hover:text-brand-800">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
