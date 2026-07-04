-- ECAA Form Builder — run in Supabase SQL Editor
-- Creates forms, form_fields, form_responses, form_response_files + RLS

create table if not exists public.forms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  content_am jsonb not null default '{}',
  status text not null default 'draft',
  form_type text not null default 'general',

  cover_image_url text,
  cover_image_alt text,
  background_theme text not null default 'warm',
  accent_theme text not null default 'green',
  layout_style text not null default 'standard',

  confirmation_message text,
  confirmation_message_am text,
  submit_button_label text not null default 'Submit',
  submit_button_label_am text not null default 'አስገባ',

  allow_multiple_submissions boolean not null default true,
  require_login boolean not null default false,
  collect_email boolean not null default false,
  notification_email text,

  visible_public boolean not null default false,
  display_order int not null default 999,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.form_fields (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.forms(id) on delete cascade,

  field_key text not null,
  label text not null,
  label_am text,
  help_text text,
  help_text_am text,
  field_type text not null,
  required boolean not null default false,
  placeholder text,
  placeholder_am text,

  options jsonb not null default '[]',
  validation jsonb not null default '{}',

  display_order int not null default 999,
  visible boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.form_responses (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.forms(id) on delete cascade,

  submitter_email text,
  submitter_name text,
  response_data jsonb not null default '{}',
  language text not null default 'en',
  status text not null default 'new',
  admin_notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.form_response_files (
  id uuid primary key default gen_random_uuid(),
  response_id uuid not null references public.form_responses(id) on delete cascade,

  field_key text not null,
  file_url text not null,
  file_name text,
  file_type text,
  file_size bigint,

  created_at timestamptz not null default now()
);

-- Appearance columns for existing installs
alter table public.forms add column if not exists cover_image_url text;
alter table public.forms add column if not exists cover_image_alt text;
alter table public.forms add column if not exists background_theme text not null default 'warm';
alter table public.forms add column if not exists accent_theme text not null default 'green';
alter table public.forms add column if not exists layout_style text not null default 'standard';

alter table public.forms enable row level security;
alter table public.form_fields enable row level security;
alter table public.form_responses enable row level security;
alter table public.form_response_files enable row level security;

drop policy if exists "Public can read published forms" on public.forms;
create policy "Public can read published forms"
on public.forms
for select
to anon, authenticated
using (status = 'published' and visible_public = true);

drop policy if exists "Admins can manage forms" on public.forms;
create policy "Admins can manage forms"
on public.forms
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read published form fields" on public.form_fields;
create policy "Public can read published form fields"
on public.form_fields
for select
to anon, authenticated
using (
  visible = true
  and exists (
    select 1
    from public.forms f
    where f.id = form_fields.form_id
      and f.status = 'published'
      and f.visible_public = true
  )
);

drop policy if exists "Admins can manage form fields" on public.form_fields;
create policy "Admins can manage form fields"
on public.form_fields
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can submit form responses" on public.form_responses;
create policy "Public can submit form responses"
on public.form_responses
for insert
to anon, authenticated
with check (
  exists (
    select 1
    from public.forms f
    where f.id = form_responses.form_id
      and f.status = 'published'
      and f.visible_public = true
  )
);

drop policy if exists "Admins can manage form responses" on public.form_responses;
create policy "Admins can manage form responses"
on public.form_responses
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can upload form response files" on public.form_response_files;
create policy "Public can upload form response files"
on public.form_response_files
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can manage form response files" on public.form_response_files;
create policy "Admins can manage form response files"
on public.form_response_files
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

notify pgrst, 'reload schema';
