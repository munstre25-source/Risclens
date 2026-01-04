import Link from 'next/link';

interface CommonForIndustriesProps {
  title?: string;
  items: { label: string; href: string; description?: string }[];
}

export default function CommonForIndustries({ title = 'Common for', items }: CommonForIndustriesProps) {
  return (
    <div className="w-full border border-slate-200 rounded-xl bg-white/70 px-4 py-3 flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-sm font-semibold text-slate-800">{title}</span>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-full border border-slate-200 text-xs text-brand-700 hover:border-brand-200 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      {items.some((i) => i.description) && (
        <div className="text-xs text-slate-600">
          {items
            .filter((i) => i.description)
            .map((i) => (
              <div key={`${i.href}-desc`}>{i.description}</div>
            ))}
        </div>
      )}
    </div>
  );
}
