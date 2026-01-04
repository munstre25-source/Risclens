-- Migration: Remove legacy SOC2_Leads view/table and point FKs to public.leads
-- Run only if you intentionally renamed the base table to leads and no code depends on SOC2_Leads.

-- 1) Re-point foreign keys that referenced SOC2_Leads (example: REVENUE_EVENTS.lead_id)
do $$
begin
  if exists (
    select 1
    from information_schema.table_constraints
    where constraint_schema = 'public'
      and table_name = 'REVENUE_EVENTS'
      and constraint_type = 'FOREIGN KEY'
      and constraint_name ilike '%lead_id%'
  ) then
    execute 'alter table public."REVENUE_EVENTS" drop constraint if exists "REVENUE_EVENTS_lead_id_fkey"';
  end if;
end$$;

alter table if exists public."REVENUE_EVENTS"
  add constraint "REVENUE_EVENTS_lead_id_fkey"
  foreign key (lead_id) references public.leads(id) on delete set null;

-- 2) Drop the legacy view/table for SOC2_Leads if it still exists
drop view if exists public."SOC2_Leads" cascade;
drop table if exists public."SOC2_Leads" cascade;
