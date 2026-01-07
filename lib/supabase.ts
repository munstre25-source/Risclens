import { createClient, SupabaseClient } from '@supabase/supabase-js';

// =============================================================================
// SUPABASE CLIENT CONFIGURATION
// =============================================================================

/**
 * Supabase client for client-side and public server-side operations (read-only)
 * Uses the anonymous/public key - safe to expose to browser
 */
let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase public environment variables. ' +
      'Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
    );
  }

  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return clientInstance;
}

/**
 * Supabase admin client for server-side privileged operations
 * Uses the service_role key - NEVER expose to browser
 * 
 * @throws Error if called on client-side or if service key is missing
 */
let adminInstance: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Safety check: ensure we're on the server
  if (typeof window !== 'undefined') {
    throw new Error(
      'getSupabaseAdmin() must only be called on the server. ' +
      'Never use the service_role key on the client side.'
    );
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Supabase admin environment variables. ' +
      'Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
    );
  }

  if (!adminInstance) {
    adminInstance = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return adminInstance;
}

// =============================================================================
// TYPE DEFINITIONS & HELPERS
// =============================================================================

export type LeadStatus = 'new' | 'qualified' | 'contacted' | 'in_conversation' | 'closed_won' | 'closed_lost';

export interface SOC2Lead {
  id: string;
  is_test?: boolean;
  is_partial?: boolean;
  company_name: string;
  company?: string; // Legacy/magnet support
  industry: string;
  num_employees: number;
  data_types: string[];
  audit_date: string;
  role: string;
  email: string | null;
  utm_source: string | null;
  variation_id: string | null;
  context_note: string | null;
  soc2_requirers: string[];
  lead_status: LeadStatus;
  status?: LeadStatus;
  readiness_score: number;
  estimated_cost_low: number;
  estimated_cost_high: number;
  lead_score: number;
  keep_or_sell: 'keep' | 'sell';
  pdf_path: string | null;
  pdf_url: string | null;
  email_sent: boolean;
  email_delivery_status: string | null;
  consent: boolean;
  sold: boolean;
  buyer_email: string | null;
  sale_amount: number | null;
  followup_day3_sent: boolean;
  followup_day7_sent: boolean;
  created_at: string;
  updated_at: string;
  lead_type?: string | null;
  payload?: any;
  frameworks?: string[];
}

export interface Buyer {
  id: string;
  name: string;
  contact_email: string;
  company_name: string | null;
  active: boolean;
  lead_types: string[];
  min_score: number;
  max_price_per_lead: number;
  created_at?: string;
}

export interface BuyerWebhook {
  id: string;
  buyer_id: string;
  url: string;
  secret_header: string;
  secret_value: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  filter_config: any;
  created_at?: string;
  updated_at?: string;
}

export interface AdminNote {
  id: string;
  lead_id: string;
  note: string;
  author: string;
  created_at: string;
}

export interface LeadEnrichment {
  id: string;
  lead_id: string;
  provider: string;
  raw_data: any;
  enriched_fields: any;
  created_at: string;
}

export interface RevenueEvent {
  id?: string;
  lead_id: string | null;
  keyword_id: string | null;
  calculator_page: string;
  event_type: string;
  event_value: number;
  event_date: string;
  notes: string | null;
  is_test?: boolean;
}

/**
 * Insert a new lead into the unified leads table
 */
export async function insertLead(lead: Omit<SOC2Lead, 'id' | 'created_at' | 'updated_at'>): Promise<SOC2Lead> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('leads')
    .insert(lead)
    .select()
    .single();

  if (error) {
    console.error('Failed to insert lead:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

export async function getLeadById(id: string): Promise<SOC2Lead | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

export async function updateLead(id: string, updates: Partial<SOC2Lead>): Promise<SOC2Lead> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('leads')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

export async function getLeads(filters?: {
  keep_or_sell?: 'keep' | 'sell';
  industry?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ leads: SOC2Lead[]; total: number }> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (filters?.keep_or_sell) query = query.eq('keep_or_sell', filters.keep_or_sell);
  if (filters?.industry) query = query.eq('industry', filters.industry);
  if (filters?.search) query = query.or(`company_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
  if (filters?.limit) query = query.limit(filters.limit);
  if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  return { leads: data || [], total: count || 0 };
}

export async function logAuditEvent(eventType: string, payload: Record<string, unknown>): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('AUDIT_LOGS').insert({ event_type: eventType, payload });
  if (error) console.error('Failed to log audit event:', error);
}

export async function getAuditLogs(params?: { limit?: number; offset?: number }): Promise<any[]> {
  const supabase = getSupabaseAdmin();
  const limit = params?.limit || 50;
  const offset = params?.offset || 0;

  const { data, error } = await supabase
    .from('AUDIT_LOGS')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw new Error(`Database error: ${error.message}`);
  return data || [];
}

export async function getHealthMetrics(): Promise<{ lead_count: number; pdf_count: number }> {
  const supabase = getSupabaseAdmin();
  const [leadResult, pdfResult] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact', head: true }),
    supabase.from('leads').select('id', { count: 'exact', head: true }).not('pdf_url', 'is', null),
  ]);
  return {
    lead_count: leadResult.count || 0,
    pdf_count: pdfResult.count || 0,
  };
}

export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<SOC2Lead | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('leads')
    .update({ lead_status: status, status, updated_at: new Date().toISOString() })
    .eq('id', leadId)
    .select()
    .single();

  if (error) return null;
  return data;
}

// =============================================================================
// BUYERS & WEBHOOKS
// =============================================================================

export async function getBuyers(): Promise<Buyer[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('buyers').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(`Database error: ${error.message}`);
  return data || [];
}

export async function upsertBuyer(buyer: Partial<Buyer>): Promise<Buyer> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('buyers').upsert(buyer).select().single();
  if (error) throw new Error(`Database error: ${error.message}`);
  return data;
}

export async function deleteBuyer(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('buyers').delete().eq('id', id);
  if (error) throw new Error(`Database error: ${error.message}`);
}

export async function getBuyerWebhooks(buyerId: string): Promise<BuyerWebhook[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('buyer_webhooks').select('*').eq('buyer_id', buyerId);
  if (error) throw new Error(`Database error: ${error.message}`);
  return data || [];
}

export async function upsertBuyerWebhook(webhook: Partial<BuyerWebhook>): Promise<BuyerWebhook> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('buyer_webhooks').upsert(webhook).select().single();
  if (error) throw new Error(`Database error: ${error.message}`);
  return data;
}

export async function deleteBuyerWebhook(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('buyer_webhooks').delete().eq('id', id);
  if (error) throw new Error(`Database error: ${error.message}`);
}

// =============================================================================
// SAVED FILTERS
// =============================================================================

export async function getSavedFilters(): Promise<SavedFilter[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('SAVED_FILTERS').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(`Database error: ${error.message}`);
  return data || [];
}

export async function createSavedFilter(name: string, filter_config: any): Promise<SavedFilter> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('SAVED_FILTERS').insert({ name, filter_config }).select().single();
  if (error) throw new Error(`Database error: ${error.message}`);
  return data;
}

export async function deleteSavedFilter(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('SAVED_FILTERS').delete().eq('id', id);
  if (error) throw new Error(`Database error: ${error.message}`);
  return true;
}

// =============================================================================
// ADMIN NOTES
// =============================================================================

export async function getAdminNotes(leadId: string): Promise<AdminNote[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('ADMIN_NOTES').select('*').eq('lead_id', leadId).order('created_at', { ascending: false });
  if (error) throw new Error(`Database error: ${error.message}`);
  return data || [];
}

export async function addAdminNote(lead_id: string, note: string, author: string): Promise<AdminNote> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('ADMIN_NOTES').insert({ lead_id, note, author }).select().single();
  if (error) throw new Error(`Database error: ${error.message}`);
  return data;
}

// =============================================================================
// ENRICHMENT & METRICS
// =============================================================================

export async function getLeadEnrichment(leadId: string): Promise<LeadEnrichment[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('lead_enrichment').select('*').eq('lead_id', leadId);
  if (error) throw new Error(`Database error: ${error.message}`);
  return data || [];
}

export async function recordRevenueEvent(event: RevenueEvent): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('REVENUE_EVENTS').insert(event);
  if (error) console.error('Failed to record revenue event:', error);
}

export async function incrementABCounter(variation_id: string, field: 'impressions' | 'submissions'): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.rpc('increment_ab_counter', { p_variation_id: variation_id, p_field: field });
  if (error) console.error('Failed to increment A/B counter:', error);
}

export async function getEnhancedMetrics(): Promise<any> {
  const supabase = getSupabaseAdmin();
  
  // Basic metrics
  const { data: leads, error: leadError } = await supabase.from('leads').select('readiness_score, created_at, sold, sale_amount');
  const { data: revenue, error: revError } = await supabase.from('REVENUE_EVENTS').select('event_value, event_date');
  
  if (leadError || revError) return {};

  const totalLeads = leads?.length || 0;
  const avgReadiness = totalLeads > 0 ? (leads?.reduce((acc, curr) => acc + curr.readiness_score, 0) || 0) / totalLeads : 0;
  const totalRevenue = revenue?.reduce((acc, curr) => acc + (curr.event_value || 0), 0) || 0;

  return {
    totalLeads,
    avgReadiness: Math.round(avgReadiness),
    totalRevenue,
    conversionRate: totalLeads > 0 ? (leads?.filter(l => l.sold).length || 0) / totalLeads : 0
  };
}
