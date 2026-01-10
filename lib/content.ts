import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface ContentPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  content_json: any;
  author_note?: string;
  framework_version?: string;
  last_reviewed_at: string;
  faqs?: { question: string; answer: string }[];
}

export async function getContentPage(slug: string): Promise<ContentPage | null> {
  const { data, error } = await supabase
    .from('content_pages')
    .select('*, content_faqs(question, answer)')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  return {
    ...data,
    faqs: data.content_faqs?.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
  };
}

export interface PricingBenchmark {
  category: string;
  tier: string;
  low_estimate: number;
  median_estimate: number;
  high_estimate: number;
  source_citation?: string;
  last_verified_at: string;
}

export async function getPricingBenchmarks(category?: string): Promise<PricingBenchmark[]> {
  let query = supabase.from('pricing_benchmarks').select('*');
  
  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  return data;
}

export async function getBenchmark(category: string, tier: string): Promise<PricingBenchmark | null> {
  const { data, error } = await supabase
    .from('pricing_benchmarks')
    .select('*')
    .eq('category', category)
    .eq('tier', tier)
    .single();

  if (error || !data) return null;
  return data;
}
