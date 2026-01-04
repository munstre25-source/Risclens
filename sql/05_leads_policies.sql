-- Migration: align RLS/policies with renamed leads table
-- Purpose: ensure the new public.leads table has RLS enabled and service_role access
-- Safe to run multiple times.

-- Enable RLS on leads
alter table if exists public.leads enable row level security;

-- Drop old policies if they exist (idempotent cleanup)
do $$
begin
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'leads' and policyname = 'Service role full access on leads') then
    execute 'drop policy "Service role full access on leads" on public.leads';
  end if;
end$$;

-- Service role full access on leads
create policy "Service role full access on leads"
on public.leads
for all
to service_role
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

-- Optional: allow anon inserts if your client uses the anon key; comment out if not needed.
-- create policy "Anon insert leads"
-- on public.leads
-- for insert
-- to anon
-- with check (true);

