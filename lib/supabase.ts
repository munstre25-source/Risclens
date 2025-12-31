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

export interface SOC2Lead {
  id: string;
  company_name: string;
  industry: string;
  num_employees: number;
  data_types: string[];
  audit_date: string;
  role: string;
  email: string | null; // Nullable - can be set later via /api/lead/set-email
  utm_source: string | null;
  variation_id: string | null;
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

export interface RevenueEvent {
  id: string;
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

// =============================================================================
// DATABASE HELPERS
// =============================================================================

/**
 * Insert a new lead into SOC2_Leads table
 */
export async function insertLead(lead: Omit<SOC2Lead, 'id' | 'created_at' | 'updated_at'>): Promise<SOC2Lead> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('SOC2_Leads')
    .insert(lead)
    .select()
    .single();

  if (error) {
    console.error('Failed to insert lead:', error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

/**
 * Get a lead by ID
 */
export async function getLeadById(id: string): Promise<SOC2Lead | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('SOC2_Leads')
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
    .from('SOC2_Leads')
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
    .from('SOC2_Leads')
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
    supabase.from('SOC2_Leads').select('id', { count: 'exact', head: true }),
    supabase.from('SOC2_Leads').select('id', { count: 'exact', head: true }).not('pdf_url', 'is', null),
  ]);

  return {
    lead_count: leadResult.count || 0,
    pdf_count: pdfResult.count || 0,
  };
}

