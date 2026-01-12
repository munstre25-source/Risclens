import Link from 'next/link';
import { getSupabaseAdmin } from '@/lib/supabase';
import { ArrowRight, BookOpen } from 'lucide-react';

interface RelatedPseoPagesProps {
  currentSlug: string;
  category?: string;
  frameworkId?: string;
  limit?: number;
}

export async function RelatedPseoPages({
  currentSlug,
  category,
  frameworkId,
  limit = 4,
}: RelatedPseoPagesProps) {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('pseo_pages')
    .select('slug, title, category, framework:pseo_frameworks(name, slug)')
    .neq('slug', currentSlug);

  if (category) {
    query = query.eq('category', category);
  }

  if (frameworkId) {
    query = query.eq('framework_id', frameworkId);
  }

  const { data: relatedPages } = await query.limit(limit);

  if (!relatedPages || relatedPages.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-16 border-t border-slate-100">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-brand-500" />
        Related Compliance Guides
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {relatedPages.map((page) => {
          // Determine the correct href based on category/framework
          let href = `/ai-governance/${page.slug}`;
          if (page.framework) {
             const fw = page.framework as any;
             if (fw.slug === 'soc-2' || fw.slug === 'iso-27001') {
                href = `/compliance/${fw.slug}/${page.slug}`;
             } else if (fw.slug === 'ai-governance') {
                href = `/ai-governance/${page.slug}`;
             }
          }

          return (
            <Link
              key={page.slug}
              href={href}
              className="group p-6 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-2 block">
                  {page.category || 'Guide'}
                </span>
                <h4 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {page.title}
                </h4>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-slate-500 group-hover:text-brand-600 transition-colors">
                Read Guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
