import { getSupabaseAdmin } from './supabase';

export interface CreateLeadInput {
  name?: string | null;
  email?: string | null;
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
    utmMedium?: string | null;
    utmCampaign?: string | null;
    utmContent?: string | null;
    utmTerm?: string | null;
    isTest?: boolean | null;
      phone?: string | null;
      budgetRange?: string | null;
      budgetComfort?: string | null;
    };

  isPartial?: boolean | null;
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
    isPartial,
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
      utm_medium: derivedFields?.utmMedium ?? null,
      utm_campaign: derivedFields?.utmCampaign ?? null,
      utm_content: derivedFields?.utmContent ?? null,
      utm_term: derivedFields?.utmTerm ?? null,
      is_test: derivedFields?.isTest ?? null,
        phone: derivedFields?.phone ?? null,
        budget_range: derivedFields?.budgetRange ?? null,
        budget_comfort: derivedFields?.budgetComfort ?? null,
        is_partial: isPartial ?? false,

    } as Record<string, unknown>;


  // Check if a partial lead with this email already exists
  let existingLead = null;
  if (email) {
    const { data } = await supabase
      .from('leads')
      .select('id')
      .eq('email', email)
      .eq('is_partial', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    existingLead = data;
  }

  let result;
  if (existingLead) {
    result = await supabase
      .from('leads')
      .update(insertData)
      .eq('id', existingLead.id)
      .select('id')
      .single();
  } else {
    result = await supabase.from('leads').insert(insertData).select('id').single();
  }

  const { data, error } = result;

  if (error) {
    console.error('createLead error', { error, insertData });
    return { ok: false, error: error.message };
  }

  return { ok: true, id: data?.id as string | undefined };
}
