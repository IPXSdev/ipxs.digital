-- Ensure the public contact form payload matches table columns.
alter table public.contact_submissions
  add column if not exists subject text,
  add column if not exists reply_message text,
  add column if not exists phone text,
  add column if not exists source_page text,
  add column if not exists project_type text;

-- Keep RLS enabled and only allow anonymous insert.
alter table public.contact_submissions enable row level security;

drop policy if exists "Allow anon contact submission" on public.contact_submissions;
create policy "Allow anon contact submission"
  on public.contact_submissions
  for insert
  to anon
  with check (true);
