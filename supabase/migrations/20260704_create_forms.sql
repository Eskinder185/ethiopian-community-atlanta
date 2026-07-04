-- ECAA Form Builder tables, indexes, and RLS policies
-- Run in Supabase SQL Editor or via supabase db push

-- ---------------------------------------------------------------------------
-- Table: forms
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  content_am jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft',
  form_type text NOT NULL DEFAULT 'general',
  confirmation_message text,
  confirmation_message_am text,
  submit_button_label text DEFAULT 'Submit',
  submit_button_label_am text DEFAULT 'አስገባ',
  allow_multiple_submissions boolean NOT NULL DEFAULT true,
  require_login boolean NOT NULL DEFAULT false,
  collect_email boolean NOT NULL DEFAULT false,
  notification_email text,
  visible_public boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 999,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT forms_status_check CHECK (status IN ('draft', 'published', 'archived')),
  CONSTRAINT forms_form_type_check CHECK (
    form_type IN (
      'general',
      'event_registration',
      'program_interest',
      'volunteer',
      'membership',
      'hall_booking',
      'feedback',
      'application'
    )
  )
);

-- ---------------------------------------------------------------------------
-- Table: form_fields
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.form_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id uuid NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
  field_key text NOT NULL,
  label text NOT NULL,
  label_am text,
  help_text text,
  help_text_am text,
  field_type text NOT NULL,
  required boolean NOT NULL DEFAULT false,
  placeholder text,
  placeholder_am text,
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  validation jsonb NOT NULL DEFAULT '{}'::jsonb,
  display_order int NOT NULL DEFAULT 999,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT form_fields_field_type_check CHECK (
    field_type IN (
      'text',
      'textarea',
      'email',
      'phone',
      'number',
      'date',
      'time',
      'datetime',
      'select',
      'radio',
      'checkbox',
      'file',
      'consent'
    )
  ),
  UNIQUE (form_id, field_key)
);

-- ---------------------------------------------------------------------------
-- Table: form_responses
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.form_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id uuid NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
  submitter_email text,
  submitter_name text,
  response_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  language text NOT NULL DEFAULT 'en',
  status text NOT NULL DEFAULT 'new',
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT form_responses_status_check CHECK (
    status IN ('new', 'reviewed', 'contacted', 'approved', 'declined', 'archived')
  )
);

-- ---------------------------------------------------------------------------
-- Table: form_response_files (optional uploads)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.form_response_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid NOT NULL REFERENCES public.form_responses(id) ON DELETE CASCADE,
  field_key text NOT NULL,
  file_url text NOT NULL,
  file_name text,
  file_type text,
  file_size bigint,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Optional CMS integration columns
-- ---------------------------------------------------------------------------
ALTER TABLE public.programs
  ADD COLUMN IF NOT EXISTS interest_form_slug text;

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS registration_form_slug text;

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS forms_slug_idx ON public.forms (slug);
CREATE INDEX IF NOT EXISTS forms_status_idx ON public.forms (status);
CREATE INDEX IF NOT EXISTS form_fields_form_id_idx ON public.form_fields (form_id);
CREATE INDEX IF NOT EXISTS form_responses_form_id_idx ON public.form_responses (form_id);
CREATE INDEX IF NOT EXISTS form_responses_created_at_idx ON public.form_responses (created_at DESC);

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS forms_set_updated_at ON public.forms;
CREATE TRIGGER forms_set_updated_at
  BEFORE UPDATE ON public.forms
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS form_fields_set_updated_at ON public.form_fields;
CREATE TRIGGER form_fields_set_updated_at
  BEFORE UPDATE ON public.form_fields
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS form_responses_set_updated_at ON public.form_responses;
CREATE TRIGGER form_responses_set_updated_at
  BEFORE UPDATE ON public.form_responses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
ALTER TABLE public.forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_response_files ENABLE ROW LEVEL SECURITY;

-- Admin helper: use is_admin() when available, otherwise authenticated users
CREATE OR REPLACE FUNCTION public.ecaa_is_editor()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT
    CASE
      WHEN to_regprocedure('public.is_admin()') IS NOT NULL THEN public.is_admin()
      ELSE auth.uid() IS NOT NULL
    END;
$$;

-- forms
DROP POLICY IF EXISTS forms_public_select ON public.forms;
CREATE POLICY forms_public_select ON public.forms
  FOR SELECT
  USING (status = 'published' AND visible_public = true);

DROP POLICY IF EXISTS forms_admin_all ON public.forms;
CREATE POLICY forms_admin_all ON public.forms
  FOR ALL
  USING (public.ecaa_is_editor())
  WITH CHECK (public.ecaa_is_editor());

-- form_fields
DROP POLICY IF EXISTS form_fields_public_select ON public.form_fields;
CREATE POLICY form_fields_public_select ON public.form_fields
  FOR SELECT
  USING (
    visible = true
    AND EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = form_fields.form_id
        AND f.status = 'published'
        AND f.visible_public = true
    )
  );

DROP POLICY IF EXISTS form_fields_admin_all ON public.form_fields;
CREATE POLICY form_fields_admin_all ON public.form_fields
  FOR ALL
  USING (public.ecaa_is_editor())
  WITH CHECK (public.ecaa_is_editor());

-- form_responses: public insert only, no public read
DROP POLICY IF EXISTS form_responses_public_insert ON public.form_responses;
CREATE POLICY form_responses_public_insert ON public.form_responses
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = form_responses.form_id
        AND f.status = 'published'
        AND f.visible_public = true
    )
  );

DROP POLICY IF EXISTS form_responses_admin_all ON public.form_responses;
CREATE POLICY form_responses_admin_all ON public.form_responses
  FOR ALL
  USING (public.ecaa_is_editor())
  WITH CHECK (public.ecaa_is_editor());

-- form_response_files
DROP POLICY IF EXISTS form_response_files_public_insert ON public.form_response_files;
CREATE POLICY form_response_files_public_insert ON public.form_response_files
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.form_responses r
      JOIN public.forms f ON f.id = r.form_id
      WHERE r.id = form_response_files.response_id
        AND f.status = 'published'
        AND f.visible_public = true
    )
  );

DROP POLICY IF EXISTS form_response_files_admin_all ON public.form_response_files;
CREATE POLICY form_response_files_admin_all ON public.form_response_files
  FOR ALL
  USING (public.ecaa_is_editor())
  WITH CHECK (public.ecaa_is_editor());

NOTIFY pgrst, 'reload schema';
