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

const FALLBACK_LOCATIONS: PSEOLocation[] = [
  { id: '1', name: 'San Francisco', slug: 'san-francisco', country: 'USA' },
  { id: '2', name: 'New York', slug: 'new-york', country: 'USA' },
  { id: '3', name: 'Austin', slug: 'austin', country: 'USA' },
  { id: '4', name: 'London', slug: 'london', country: 'UK' },
  { id: '5', name: 'Remote', slug: 'remote', country: 'Global' }
];

export async function getPSEOPages() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('pseo_pages').select('*');
    if (error) throw error;
    return data as PSEOPage[];
  } catch (e) {
    console.error('Error fetching PSEO pages:', e);
    return [];
  }
}

export async function getPSEOPageBySlug(slug: string) {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('pseo_pages')
      .select('*, pseo_frameworks(*), pseo_industries(*)')
      .eq('slug', slug)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (e) {
    console.error(`Error fetching PSEO page for slug ${slug}:`, e);
    return null;
  }
}

export async function getPSEOFrameworks() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('pseo_frameworks').select('*');
    if (error) throw error;
    return data as PSEOFramework[];
  } catch (e) {
    console.error('Error fetching PSEO frameworks:', e);
    return [];
  }
}

export async function getPSEOIndustries() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('pseo_industries').select('*');
    if (error) throw error;
    return data as PSEOIndustry[];
  } catch (e) {
    console.error('Error fetching PSEO industries:', e);
    return [];
  }
}

export async function getPSEOLocations() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('pseo_locations').select('*');
    if (error) throw error;
    return (data && data.length > 0) ? (data as PSEOLocation[]) : FALLBACK_LOCATIONS;
  } catch (e) {
    console.error('Error fetching PSEO locations:', e);
    return FALLBACK_LOCATIONS;
  }
}

export async function getPSEOVendors() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('pseo_vendors').select('*');
    if (error) throw error;
    return data as PSEOVendor[];
  } catch (e) {
    console.error('Error fetching PSEO vendors:', e);
    return [];
  }
}

export async function getPSEODecisionTypes() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('pseo_decision_types').select('*');
    if (error) throw error;
    return data;
  } catch (e) {
    console.error('Error fetching PSEO decision types:', e);
    return [];
  }
}

export async function getPSEORoles() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('pseo_roles').select('*');
    if (error) throw error;
    return data;
  } catch (e) {
    console.error('Error fetching PSEO roles:', e);
    return [];
  }
}
