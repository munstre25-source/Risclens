import { getSupabaseAdmin, getSupabaseClient } from './supabase';

export interface PSEOPage {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  content_json: any;
  framework_id?: string;
  industry_id?: string;
  location_id?: string;
  vendor_id?: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface PSEOFramework {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface PSEOIndustry {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface PSEOLocation {
  id: string;
  name: string;
  slug: string;
  country: string;
}

export interface PSEOVendor {
  id: string;
  name: string;
  slug: string;
  category: string;
  pricing_url?: string;
  last_verified_at?: string;
}

export async function getPSEOPages() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('pseo_pages').select('*');
  if (error) throw error;
  return data as PSEOPage[];
}

export async function getPSEOPageBySlug(slug: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*, pseo_frameworks(*), pseo_industries(*)')
    .eq('slug', slug)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getPSEOFrameworks() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('pseo_frameworks').select('*');
  if (error) throw error;
  return data as PSEOFramework[];
}

export async function getPSEOIndustries() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('pseo_industries').select('*');
  if (error) throw error;
  return data as PSEOIndustry[];
}

export async function getPSEOLocations() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('pseo_locations').select('*');
  if (error) throw error;
  return data as PSEOLocation[];
}

export async function getPSEOVendors() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('pseo_vendors').select('*');
  if (error) throw error;
  return data as PSEOVendor[];
}
