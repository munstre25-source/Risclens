import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items || items.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center text-xs text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 mx-2 text-slate-300 flex-shrink-0" strokeWidth={3} />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-slate-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-slate-700 font-medium" : ""}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
