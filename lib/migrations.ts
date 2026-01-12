import { getSupabaseAdmin, getSupabaseClient } from './supabase';

export interface MigrationGap {
  area: string;
  description: string;
  severity: 'high' | 'medium' | 'low' | 'none';
}

export interface MigrationFAQ {
  question: string;
  answer: string;
}

export interface MigrationSource {
  name: string;
  url: string;
  type: 'official' | 'industry';
}

export interface FrameworkMigration {
  id: string;
  from_framework_slug: string;
  to_framework_slug: string;
  slug: string;
  overlap_percentage: number;
  time_to_compliance_weeks: number;
  cost_savings_percentage: number | null;
  difficulty_level: 'easy' | 'moderate' | 'complex';
  primary_audience: string | null;
  industry_relevance: string[] | null;
  key_gaps: MigrationGap[];
  migration_steps: string[];
  shared_controls: string[] | null;
  unique_requirements: string[] | null;
  use_cases: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  hero_description: string;
  faq: MigrationFAQ[] | null;
  sources: MigrationSource[] | null;
  last_verified: string | null;
  created_at: string;
  updated_at: string;
}

const FRAMEWORK_DISPLAY_NAMES: Record<string, string> = {
  'soc-2': 'SOC 2',
  'soc-3': 'SOC 3',
  'iso-27001': 'ISO 27001',
  'iso-42001': 'ISO 42001',
  'hipaa': 'HIPAA',
  'gdpr': 'GDPR',
  'pci-dss': 'PCI DSS',
  'nist-csf': 'NIST CSF',
  'tisax': 'TISAX',
};

export function getFrameworkDisplayName(slug: string): string {
  return FRAMEWORK_DISPLAY_NAMES[slug] || slug.toUpperCase().replace(/-/g, ' ');
}

export async function getAllMigrations(): Promise<FrameworkMigration[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('framework_migrations')
    .select('*')
    .order('from_framework_slug');
  
  if (error) {
    console.error('Error fetching migrations:', error);
    return [];
  }
  
  return data as FrameworkMigration[];
}

export async function getMigrationBySlug(slug: string): Promise<FrameworkMigration | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('framework_migrations')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error fetching migration:', error);
    }
    return null;
  }
  
  return data as FrameworkMigration;
}

export async function getMigrationSlugs(): Promise<string[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('framework_migrations')
    .select('slug');
  
  if (error) {
    console.error('Error fetching migration slugs:', error);
    return [];
  }
  
  return data.map(m => m.slug);
}

export async function getMigrationsFromFramework(fromSlug: string): Promise<FrameworkMigration[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('framework_migrations')
    .select('*')
    .eq('from_framework_slug', fromSlug)
    .order('overlap_percentage', { ascending: false });
  
  if (error) {
    console.error('Error fetching migrations from framework:', error);
    return [];
  }
  
  return data as FrameworkMigration[];
}

export async function getMigrationsToFramework(toSlug: string): Promise<FrameworkMigration[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('framework_migrations')
    .select('*')
    .eq('to_framework_slug', toSlug)
    .order('overlap_percentage', { ascending: false });
  
  if (error) {
    console.error('Error fetching migrations to framework:', error);
    return [];
  }
  
  return data as FrameworkMigration[];
}

export async function getRelatedMigrations(currentSlug: string, fromSlug: string, toSlug: string): Promise<FrameworkMigration[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('framework_migrations')
    .select('*')
    .neq('slug', currentSlug)
    .or(`from_framework_slug.eq.${fromSlug},to_framework_slug.eq.${toSlug},from_framework_slug.eq.${toSlug},to_framework_slug.eq.${fromSlug}`)
    .limit(6);
  
  if (error) {
    console.error('Error fetching related migrations:', error);
    return [];
  }
  
  return data as FrameworkMigration[];
}

export function getDifficultyColor(level: string): string {
  switch (level) {
    case 'easy': return 'text-green-600 bg-green-50 border-green-200';
    case 'moderate': return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'complex': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-slate-600 bg-slate-50 border-slate-200';
  }
}

export function getDifficultyLabel(level: string): string {
  switch (level) {
    case 'easy': return 'Low Complexity';
    case 'moderate': return 'Moderate Complexity';
    case 'complex': return 'High Complexity';
    default: return level;
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'high': return 'border-l-red-500 bg-red-50/50';
    case 'medium': return 'border-l-amber-500 bg-amber-50/50';
    case 'low': return 'border-l-blue-500 bg-blue-50/50';
    case 'none': return 'border-l-green-500 bg-green-50/50';
    default: return 'border-l-slate-500 bg-slate-50/50';
  }
}
