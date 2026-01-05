import { createClient, SupabaseClient } from '@supabase/supabase-js';

// =============================================================================
// SUPABASE CLIENT CONFIGURATION
// =============================================================================

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Supabase client for client-side operations (read-only)
 * Uses the anonymous/public key - safe to expose
 */
let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
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
 * Supabase admin client for server-side operations
 * Uses the service_role key - NEVER expose to client
 * 
 * @throws Error if called on client-side or if service key is missing
 */
let adminInstance: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  // Safety check: ensure we're on the server
  if (typeof window !== 'undefined') {
    throw new Error(
      'getSupabaseAdmin() must only be called on the server. ' +
      'Never use the service_role key on the client side.'
    );
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
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
// TYPE DEFINITIONS
// =============================================================================

// Lead status state machine
export type LeadStatus = 'new' | 'qualified' | 'contacted' | 'in_conversation' | 'closed_won' | 'closed_lost';

export interface SOC2Lead {
  id: string;
  is_test?: boolean;
  company_name: string;
  company?: string; // Fallback for some templates
  industry: string;
  num_employees: number;
  data_types: string[];
  audit_date: string;
  role: string;
  email: string | null; // Nullable - can be set later via /api/lead/set-email
  utm_source: string | null;
  variation_id: string | null;
  context_note: string | null; // Optional free-text context from user (not used in scoring)
  soc2_requirers: string[]; // Array of SOC 2 requirement sources
  lead_status: LeadStatus; // Lead lifecycle status
  status?: LeadStatus; // Duplicate for compatibility
  lead_type?: string;
  lead_payload?: any;
  payload?: any;
  source_url?: string;
  frameworks?: string[];
  readiness_score: number;
  estimated_cost_low: number;
  estimated_cost_high: number;
  lead_score: number;
  keep_or_sell: 'keep' | 'sell';
  pdf_path: string | null; // Storage object path for private bucket access
  pdf_url: string | null; // Signed URL (cached, may expire)
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
}

/**
 * Insert a new lead into the unified leads table
 * @deprecated Use createLead from @/lib/leads instead for most cases
 */
export async function insertLead(lead: Omit<SOC2Lead, 'id' | 'created_at' | 'updated_at'>): Promise<SOC2Lead> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('leads')
    .insert(lead)
    .select()
    .single();

  // Fallback: if older DBs are missing the is_test column, retry without it to avoid blocking submissions.
  if (error && error.message && error.message.toLowerCase().includes('is_test')) {
    const { data: retryData, error: retryError } = await supabase
      .from('leads')
      .insert(({ ...lead, is_test: undefined } as any))
      .select()
      .single();

    if (!retryError && retryData) {
      console.warn('Inserted lead without is_test column fallback');
      return retryData;
    }

    if (retryError) {
      console.error('Failed to insert lead after is_test fallback:', retryError);
      throw new Error(`Database error: ${retryError.message}`);
    }
  }

  if (error) {
    console.error('Failed to insert lead:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

/**
 * Alias for insertLead to support legacy codebases
 * @deprecated Use createLead from @/lib/leads instead
 */
// export const createLead = insertLead;


export interface RevenueEvent {
  id: string;
  is_test?: boolean;
  lead_id: string;
  keyword_id: string | null;
  calculator_page: string;
  event_type: string;
  event_value: number;
  event_date: string;
  notes: string | null;
}

export interface AuditLog {
  id: string;
  event_type: string;
  payload: Record<string, unknown>;
  created_at: string;
}

export interface ABVariant {
  id: string;
  variation_id: string;
  name: string;
  headline: string;
  cta_text: string;
  impressions: number;
  submissions: number;
  active: boolean;
  created_at: string;
}

export interface AdminNote {
  id: string;
  lead_id: string;
  note: string;
  author: string;
  created_at: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  filter_config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * Get a lead by ID
 */
export async function getLeadById(id: string): Promise<SOC2Lead | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Failed to get lead:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

/**
 * Update a lead
 */
export async function updateLead(id: string, updates: Partial<SOC2Lead>): Promise<SOC2Lead> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('leads')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Failed to update lead:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

/**
 * Get leads with filters for admin
 */
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

  if (filters?.keep_or_sell) {
    query = query.eq('keep_or_sell', filters.keep_or_sell);
  }
  if (filters?.industry) {
    query = query.eq('industry', filters.industry);
  }
  if (filters?.search) {
    query = query.or(`company_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
  }
  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Failed to get leads:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return { leads: data || [], total: count || 0 };
}

/**
 * Log an audit event
 */
export async function logAuditEvent(
  eventType: string,
  payload: Record<string, unknown>
): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from('AUDIT_LOGS')
    .insert({ event_type: eventType, payload });

  if (error) {
    // Log but don't throw - audit logging should not break main flows
    console.error('Failed to log audit event:', error);
  }
}

export async function getAuditLogs(params?: { limit?: number; offset?: number }): Promise<AuditLog[]> {
  const supabase = getSupabaseAdmin();
  const limit = params?.limit || 50;
  const offset = params?.offset || 0;

  const { data, error } = await supabase
    .from('AUDIT_LOGS')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Failed to fetch audit logs:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data || [];
}

/**
 * Record a revenue event
 */
export async function recordRevenueEvent(event: Omit<RevenueEvent, 'id'>): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from('REVENUE_EVENTS')
    .insert(event);

  if (error) {
    console.error('Failed to record revenue event:', error);
    throw new Error(`Database error: ${error.message}`);
  }
}

/**
 * Get A/B variant by variation_id
 */
export async function getABVariant(variationId: string): Promise<ABVariant | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('AB_VARIANTS')
    .select('*')
    .eq('variation_id', variationId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('Failed to get A/B variant:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

/**
 * Increment A/B variant counter
 */
export async function incrementABCounter(
  variationId: string,
  field: 'impressions' | 'submissions'
): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.rpc('increment_ab_counter', {
    p_variation_id: variationId,
    p_field: field,
  });

  // If RPC doesn't exist, fall back to manual update
  if (error) {
    const variant = await getABVariant(variationId);
    if (variant) {
      const { error: updateError } = await supabase
        .from('AB_VARIANTS')
        .update({ [field]: variant[field] + 1 })
        .eq('variation_id', variationId);
      
      if (updateError) {
        console.error('Failed to increment A/B counter:', updateError);
      }
    }
  }
}

/**
 * Get health metrics
 */
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

// =============================================================================
// DATABASE HELPERS
// =============================================================================

/**
 * Get a lead by ID
 */
export async function getAdminNotes(leadId: string): Promise<AdminNote[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('ADMIN_NOTES')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to get admin notes:', error);
    return [];
  }

  return data || [];
}

/**
 * Add an admin note to a lead (append-only)
 */
export async function addAdminNote(
  leadId: string,
  note: string,
  author: string = 'admin'
): Promise<AdminNote | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('ADMIN_NOTES')
    .insert({ lead_id: leadId, note, author })
    .select()
    .single();

  if (error) {
    console.error('Failed to add admin note:', error);
    return null;
  }

  return data;
}

/**
 * Update lead status
 */
export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus
): Promise<SOC2Lead | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('leads')
    .update({ lead_status: status, status, updated_at: new Date().toISOString() })
    .eq('id', leadId)
    .select()
    .single();

  if (error) {
    console.error('Failed to update lead status:', error);
    return null;
  }

  return data;
}

// =============================================================================
// SAVED FILTERS FUNCTIONS
// =============================================================================

/**
 * Get all saved filters
 */
export async function getSavedFilters(): Promise<SavedFilter[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('SAVED_FILTERS')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Failed to get saved filters:', error);
    return [];
  }

  return data || [];
}

/**
 * Create a saved filter
 */
export async function createSavedFilter(
  name: string,
  filterConfig: Record<string, unknown>
): Promise<SavedFilter | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('SAVED_FILTERS')
    .insert({ name, filter_config: filterConfig })
    .select()
    .single();

  if (error) {
    console.error('Failed to create saved filter:', error);
    return null;
  }

  return data;
}

/**
 * Delete a saved filter
 */
export async function deleteSavedFilter(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from('SAVED_FILTERS')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Failed to delete saved filter:', error);
    return false;
  }

  return true;
}

// =============================================================================
// BUYERS & MONETIZATION FUNCTIONS
// =============================================================================

export interface Buyer {
  id: string;
  name: string;
  contact_email: string;
  company_name: string | null;
  active: boolean;
  lead_types: string[];
  min_score: number;
  max_price_per_lead: number;
  created_at: string;
}

export interface BuyerWebhook {
  id: string;
  buyer_id: string;
  url: string;
  secret_header: string;
  secret_value: string | null;
  is_active: boolean;
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

/**
 * Get all buyers
 */
export async function getBuyers(): Promise<Buyer[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('buyers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to get buyers:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data || [];
}

/**
 * Create or update a buyer
 */
export async function upsertBuyer(buyer: Partial<Buyer>): Promise<Buyer> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('buyers')
    .upsert(buyer)
    .select()
    .single();

  if (error) {
    console.error('Failed to upsert buyer:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

/**
 * Delete a buyer
 */
export async function deleteBuyer(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('buyers')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Failed to delete buyer:', error);
    throw new Error(`Database error: ${error.message}`);
  }
}

/**
 * Get webhooks for a buyer
 */
export async function getBuyerWebhooks(buyerId: string): Promise<BuyerWebhook[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('buyer_webhooks')
    .select('*')
    .eq('buyer_id', buyerId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Failed to get buyer webhooks:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data || [];
}

/**
 * Upsert a buyer webhook
 */
export async function upsertBuyerWebhook(webhook: Partial<BuyerWebhook>): Promise<BuyerWebhook> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('buyer_webhooks')
    .upsert(webhook)
    .select()
    .single();

  if (error) {
    console.error('Failed to upsert buyer webhook:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

/**
 * Delete a buyer webhook
 */
export async function deleteBuyerWebhook(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('buyer_webhooks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Failed to delete buyer webhook:', error);
    throw new Error(`Database error: ${error.message}`);
  }
}

/**
 * Get lead enrichment data
 */
export async function getLeadEnrichment(leadId: string): Promise<LeadEnrichment[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('lead_enrichment')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to get lead enrichment:', error);
    return [];
  }

  return data || [];
}

export interface EnhancedMetrics {
  total_leads: number;
  avg_readiness_score: number;
  avg_estimated_cost: number;
  pct_enterprise_driven: number;
  pct_urgent: number;
  lead_to_sale_rate: number;
  total_revenue: number;
}

/**
 * Get enhanced metrics for admin dashboard
 */
export async function getEnhancedMetrics(): Promise<EnhancedMetrics> {
  const supabase = getSupabaseAdmin();

  const { data: leads, error } = await supabase
    .from('leads')
    .select('readiness_score, estimated_cost_low, estimated_cost_high, soc2_requirers, audit_date, sold, sale_amount');

  if (error || !leads) {
    return {
      total_leads: 0,
      avg_readiness_score: 0,
      avg_estimated_cost: 0,
      pct_enterprise_driven: 0,
      pct_urgent: 0,
      lead_to_sale_rate: 0,
      total_revenue: 0,
    };
  }

  const total = leads.length;
  if (total === 0) {
    return {
      total_leads: 0,
      avg_readiness_score: 0,
      avg_estimated_cost: 0,
      pct_enterprise_driven: 0,
      pct_urgent: 0,
      lead_to_sale_rate: 0,
      total_revenue: 0,
    };
  }

  const now = new Date();
  
  // Calculate metrics
  const avgReadiness = leads.reduce((sum, l) => sum + (l.readiness_score || 0), 0) / total;
  const avgCost = leads.reduce((sum, l) => sum + ((l.estimated_cost_low + l.estimated_cost_high) / 2 || 0), 0) / total;
  
  const enterpriseCount = leads.filter(l => 
    Array.isArray(l.soc2_requirers) && l.soc2_requirers.includes('enterprise')
  ).length;
  
  const urgentCount = leads.filter(l => {
    if (!l.audit_date) return false;
    const audit = new Date(l.audit_date);
    const daysUntil = (audit.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysUntil < 90;
  }).length;
  
  const soldCount = leads.filter(l => l.sold).length;
  const totalRevenue = leads.reduce((sum, l) => sum + (l.sale_amount || 0), 0);

  return {
    total_leads: total,
    avg_readiness_score: Math.round(avgReadiness),
    avg_estimated_cost: Math.round(avgCost),
    pct_enterprise_driven: Math.round((enterpriseCount / total) * 100),
    pct_urgent: Math.round((urgentCount / total) * 100),
    lead_to_sale_rate: Math.round((soldCount / total) * 100),
    total_revenue: totalRevenue,
  };
}
