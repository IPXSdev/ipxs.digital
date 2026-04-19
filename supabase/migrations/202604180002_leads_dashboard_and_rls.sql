-- Contact submission compatibility for dashboard + Gmail workflow.
alter table public.contact_submissions
  add column if not exists subject text,
  add column if not exists reply_message text,
  add column if not exists phone text,
  add column if not exists company text,
  add column if not exists source_page text,
  add column if not exists inquiry_type text,
  add column if not exists internal_notes text,
  add column if not exists status text default 'new',
  add column if not exists updated_at timestamptz default now();

-- Transmission signup list.
create table if not exists public.transmission_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text not null default 'active',
  source_page text,
  source_label text,
  notes text,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_seen_at timestamptz
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_contact_submissions_updated_at on public.contact_submissions;
create trigger set_contact_submissions_updated_at
before update on public.contact_submissions
for each row execute function public.set_updated_at();

drop trigger if exists set_transmission_signups_updated_at on public.transmission_signups;
create trigger set_transmission_signups_updated_at
before update on public.transmission_signups
for each row execute function public.set_updated_at();

alter table public.contact_submissions enable row level security;
alter table public.transmission_signups enable row level security;

-- anon can insert leads, but cannot read.
drop policy if exists "Allow anon contact submission" on public.contact_submissions;
create policy "Allow anon contact submission"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anon transmission signup" on public.transmission_signups;
create policy "Allow anon transmission signup"
  on public.transmission_signups
  for insert
  to anon
  with check (true);

-- authenticated manager can read/update.
drop policy if exists "Allow authenticated read contact submissions" on public.contact_submissions;
create policy "Allow authenticated read contact submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (true);

drop policy if exists "Allow authenticated update contact submissions" on public.contact_submissions;
create policy "Allow authenticated update contact submissions"
  on public.contact_submissions
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Allow authenticated read transmission signups" on public.transmission_signups;
create policy "Allow authenticated read transmission signups"
  on public.transmission_signups
  for select
  to authenticated
  using (true);

drop policy if exists "Allow authenticated update transmission signups" on public.transmission_signups;
create policy "Allow authenticated update transmission signups"
  on public.transmission_signups
  for update
  to authenticated
  using (true)
  with check (true);
