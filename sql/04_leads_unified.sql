-- Canonical leads storage and compatibility view
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text,
  email text not null,
  company text,
  company_name text,
  website text,
  source_url text,
  lead_type text not null default 'soc2_readiness',
  lead_payload jsonb,
  status text not null default 'new',
  lead_status text not null default 'new',
  urgency text,
  industry text,
  score numeric,
  readiness_score integer,
  lead_score integer,
  est_low numeric,
  est_high numeric,
  estimated_cost_low integer,
  estimated_cost_high integer,
  num_employees integer,
  data_types text[],
  audit_date date,
  role text,
  utm_source text,
  variation_id text,
  keep_or_sell text default 'sell' check (keep_or_sell in ('keep', 'sell')),
  pdf_url text,
  pdf_path text,
  email_sent boolean default false,
  email_delivery_status text,
  consent boolean default false,
  sold boolean default false,
  buyer_email text,
  sale_amount numeric(10,2),
  followup_day3_sent boolean default false,
  followup_day7_sent boolean default false,
  soc2_requirers text[],
  context_note text,
  is_test boolean default false
);

-- Trigger to keep updated_at fresh
create or replace function public.update_leads_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_leads_updated_at on public.leads;
create trigger trg_leads_updated_at
before update on public.leads
for each row
execute function public.update_leads_updated_at();

-- Migrate existing SOC2_Leads table into leads (if present), then replace with a view
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'SOC2_Leads' and table_type = 'BASE TABLE') then
    -- copy existing rows into unified table if leads is empty
    insert into public.leads (
      id, created_at, updated_at, company, company_name, industry, num_employees, data_types, audit_date, role,
      email, utm_source, variation_id, readiness_score, estimated_cost_low, estimated_cost_high, lead_score,
      keep_or_sell, pdf_url, email_sent, email_delivery_status, consent, sold, buyer_email, sale_amount,
      followup_day3_sent, followup_day7_sent, lead_type, lead_payload, lead_status, status, urgency, source_url,
      pdf_path, soc2_requirers, context_note, is_test
    )
    select
      id, created_at, updated_at, company_name, company_name, industry, num_employees, data_types, audit_date, role,
      email, utm_source, variation_id, readiness_score, estimated_cost_low, estimated_cost_high, lead_score,
      keep_or_sell, pdf_url, email_sent, email_delivery_status, consent, sold, buyer_email, sale_amount,
      followup_day3_sent, followup_day7_sent, 'soc2_readiness', null, lead_status, lead_status, null, null,
      pdf_path, soc2_requirers, context_note, false as is_test
    from public."SOC2_Leads"
    where not exists (select 1 from public.leads l where l.id = public."SOC2_Leads".id);

    drop table public."SOC2_Leads" cascade;
  end if;
end $$;

create or replace view public."SOC2_Leads" as
select
  id,
  coalesce(company_name, company) as company_name,
  coalesce(industry, '') as industry,
  coalesce(num_employees, 0) as num_employees,
  coalesce(data_types, '{}'::text[]) as data_types,
  audit_date,
  coalesce(role, 'unknown') as role,
  email,
  utm_source,
  variation_id,
  coalesce(readiness_score, score::int) as readiness_score,
  coalesce(estimated_cost_low, est_low::int) as estimated_cost_low,
  coalesce(estimated_cost_high, est_high::int) as estimated_cost_high,
  coalesce(lead_score, score::int) as lead_score,
  coalesce(keep_or_sell, 'sell') as keep_or_sell,
  pdf_url,
  email_sent,
  email_delivery_status,
  coalesce(consent, false) as consent,
  coalesce(sold, false) as sold,
  buyer_email,
  sale_amount,
  coalesce(followup_day3_sent, false) as followup_day3_sent,
  coalesce(followup_day7_sent, false) as followup_day7_sent,
  created_at,
  updated_at,
  lead_type,
  lead_payload,
  lead_status,
  status,
  urgency,
  source_url,
  pdf_path,
  soc2_requirers,
  context_note,
  is_test
from public.leads;

-- RLS
alter table public.leads enable row level security;

-- allow inserts from anon/authenticated/service (public calculators)
drop policy if exists leads_insert_public on public.leads;
create policy leads_insert_public on public.leads
  for insert
  to anon, authenticated, service_role
  with check (true);

-- restrict selects to authenticated/admin (plus service_role)
drop policy if exists leads_select_authenticated on public.leads;
create policy leads_select_authenticated on public.leads
  for select
  to authenticated, service_role
  using (true);

-- basic indexes
create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_email on public.leads (email);
create index if not exists idx_leads_lead_type on public.leads (lead_type);

-- Verification (optional)
-- select count(*) from public.leads;
-- select lead_type, count(*) from public.leads group by lead_type;
