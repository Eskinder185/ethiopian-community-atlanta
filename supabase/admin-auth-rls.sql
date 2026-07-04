-- ECAA admin auth + RLS for media_items and forms
-- Run in Supabase SQL Editor after auth users exist
-- (Same as supabase/migrations/20260709_admin_auth_rls.sql)

-- ---------------------------------------------------------------------------
-- Admin users registry
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own admin row" ON public.admin_users;
CREATE POLICY "Users can read own admin row"
ON public.admin_users
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- is_admin() helper (SECURITY DEFINER reads admin_users)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon;

-- Seed approved admin (run after user signs up in Supabase Auth)
INSERT INTO public.admin_users (user_id, email)
SELECT id, email
FROM auth.users
WHERE lower(email) = lower('eskewabe185@gmail.com')
ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;

-- ---------------------------------------------------------------------------
-- media_items table (if not already created)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  caption text,
  type text NOT NULL DEFAULT 'image',
  url text,
  image_url text,
  alt_text text,
  related_event_id uuid,
  category text DEFAULT 'community',
  content_am jsonb NOT NULL DEFAULT '{}'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  visible boolean NOT NULL DEFAULT true,
  display_order int NOT NULL DEFAULT 999,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read visible media" ON public.media_items;
CREATE POLICY "Public can read visible media"
ON public.media_items
FOR SELECT
TO anon, authenticated
USING (visible = true);

DROP POLICY IF EXISTS "Admins can manage media" ON public.media_items;
CREATE POLICY "Admins can manage media"
ON public.media_items
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ---------------------------------------------------------------------------
-- forms RLS — unify policies to is_admin()
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF to_regclass('public.forms') IS NOT NULL THEN
    ALTER TABLE public.forms ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS forms_public_select ON public.forms;
    DROP POLICY IF EXISTS forms_admin_all ON public.forms;
    DROP POLICY IF EXISTS "Public can read published forms" ON public.forms;
    DROP POLICY IF EXISTS "Admins can manage forms" ON public.forms;

    CREATE POLICY "Public can read published forms"
    ON public.forms
    FOR SELECT
    TO anon, authenticated
    USING (status = 'published' AND visible_public = true);

    CREATE POLICY "Admins can manage forms"
    ON public.forms
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public.form_fields') IS NOT NULL THEN
    ALTER TABLE public.form_fields ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS form_fields_public_select ON public.form_fields;
    DROP POLICY IF EXISTS form_fields_admin_all ON public.form_fields;
    DROP POLICY IF EXISTS "Public can read published form fields" ON public.form_fields;
    DROP POLICY IF EXISTS "Admins can manage form fields" ON public.form_fields;

    CREATE POLICY "Public can read published form fields"
    ON public.form_fields
    FOR SELECT
    TO anon, authenticated
    USING (
      visible = true
      AND EXISTS (
        SELECT 1
        FROM public.forms f
        WHERE f.id = form_fields.form_id
          AND f.status = 'published'
          AND f.visible_public = true
      )
    );

    CREATE POLICY "Admins can manage form fields"
    ON public.form_fields
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public.form_responses') IS NOT NULL THEN
    ALTER TABLE public.form_responses ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS form_responses_public_insert ON public.form_responses;
    DROP POLICY IF EXISTS form_responses_admin_all ON public.form_responses;
    DROP POLICY IF EXISTS "Public can submit form responses" ON public.form_responses;
    DROP POLICY IF EXISTS "Admins can manage form responses" ON public.form_responses;

    CREATE POLICY "Public can submit form responses"
    ON public.form_responses
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
      EXISTS (
        SELECT 1
        FROM public.forms f
        WHERE f.id = form_responses.form_id
          AND f.status = 'published'
          AND f.visible_public = true
      )
    );

    CREATE POLICY "Admins can manage form responses"
    ON public.form_responses
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public.form_response_files') IS NOT NULL THEN
    ALTER TABLE public.form_response_files ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS form_response_files_public_insert ON public.form_response_files;
    DROP POLICY IF EXISTS form_response_files_admin_all ON public.form_response_files;
    DROP POLICY IF EXISTS "Public can upload form response files" ON public.form_response_files;
    DROP POLICY IF EXISTS "Admins can manage form response files" ON public.form_response_files;

    CREATE POLICY "Public can upload form response files"
    ON public.form_response_files
    FOR INSERT
    TO anon, authenticated
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

    CREATE POLICY "Admins can manage form response files"
    ON public.form_response_files
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';

-- ---------------------------------------------------------------------------
-- events, leadership, programs, hall_bookings (see 20260710_admin_delete_rls.sql)
-- ---------------------------------------------------------------------------
-- Run supabase/migrations/20260710_admin_delete_rls.sql for delete/update RLS
-- on events, leadership, programs, and hall_bookings tables.
