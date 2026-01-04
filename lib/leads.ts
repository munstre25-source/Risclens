import { getSupabaseAdmin } from './supabase';

export interface CreateLeadInput {
  name?: string | null;
  email: string;
  company?: string | null;
  website?: string | null;
  sourceUrl?: string | null;
  leadType: 'soc2_readiness' | 'pentest_estimate' | 'vendor_risk_assessment' | string;
  payload: Record<string, unknown>;
  derivedFields?: {
    status?: string;
    urgency?: string | null;
    industry?: string | null;
    score?: number | null;
    estLow?: number | null;
    estHigh?: number | null;
    readinessScore?: number | null;
    estimatedCostLow?: number | null;
    estimatedCostHigh?: number | null;
    leadScore?: number | null;
    keepOrSell?: 'keep' | 'sell' | null;
    variationId?: string | null;
    contextNote?: string | null;
    role?: string | null;
    auditDate?: string | null;
    numEmployees?: number | null;
    dataTypes?: string[] | null;
    utmSource?: string | null;
    isTest?: boolean | null;
  };
}

export async function createLead(input: CreateLeadInput) {
  const supabase = getSupabaseAdmin();

  const {
    name,
    email,
    company,
    website,
    sourceUrl,
    leadType,
    payload,
    derivedFields,
  } = input;

  const insertData = {
    name: name ?? null,
    email,
    company: company ?? null,
    company_name: company ?? null,
    website: website ?? null,
    source_url: sourceUrl ?? null,
    lead_type: leadType,
    lead_payload: payload,
    status: derivedFields?.status ?? 'new',
    lead_status: derivedFields?.status ?? 'new',
    urgency: derivedFields?.urgency ?? null,
    industry: derivedFields?.industry ?? null,
    score: derivedFields?.score ?? derivedFields?.readinessScore ?? null,
    readiness_score: derivedFields?.readinessScore ?? null,
    estimated_cost_low: derivedFields?.estimatedCostLow ?? derivedFields?.estLow ?? null,
    estimated_cost_high: derivedFields?.estimatedCostHigh ?? derivedFields?.estHigh ?? null,
    lead_score: derivedFields?.leadScore ?? null,
    keep_or_sell: derivedFields?.keepOrSell ?? 'sell',
    est_low: derivedFields?.estLow ?? null,
    est_high: derivedFields?.estHigh ?? null,
    variation_id: derivedFields?.variationId ?? null,
    context_note: derivedFields?.contextNote ?? null,
    role: derivedFields?.role ?? null,
    audit_date: derivedFields?.auditDate ?? null,
    num_employees: derivedFields?.numEmployees ?? null,
    data_types: derivedFields?.dataTypes ?? null,
    utm_source: derivedFields?.utmSource ?? null,
    is_test: derivedFields?.isTest ?? null,
  } as Record<string, unknown>;

  const { data, error } = await supabase.from('leads').insert(insertData).select('id').single();

  if (error) {
    console.error('createLead insert error', { error, insertData });
    return { ok: false, error: error.message };
  }

  return { ok: true, id: data?.id as string | undefined };
}
