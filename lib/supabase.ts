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
  company_name: string;
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

export async function getBuyers(): Promise<any[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('buyers').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(`Database error: ${error.message}`);
  return data || [];
}

export async function deleteBuyer(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('buyers').delete().eq('id', id);
  if (error) throw new Error(`Database error: ${error.message}`);
}
