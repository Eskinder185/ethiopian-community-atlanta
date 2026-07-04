-- ECAA admin delete RLS for events, leadership, programs, hall_bookings
-- Run after supabase/migrations/20260709_admin_auth_rls.sql (is_admin() must exist)

-- ---------------------------------------------------------------------------
-- events
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF to_regclass('public.events') IS NOT NULL THEN
    ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Public can read visible events" ON public.events;
    DROP POLICY IF EXISTS "Admins can manage events" ON public.events;

    CREATE POLICY "Public can read visible events"
    ON public.events
    FOR SELECT
    TO anon, authenticated
    USING (visible = true AND published = true);

    CREATE POLICY "Admins can manage events"
    ON public.events
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- leadership
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF to_regclass('public.leadership') IS NOT NULL THEN
    ALTER TABLE public.leadership ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Public can read visible leadership" ON public.leadership;
    DROP POLICY IF EXISTS "Admins can manage leadership" ON public.leadership;

    CREATE POLICY "Public can read visible leadership"
    ON public.leadership
    FOR SELECT
    TO anon, authenticated
    USING (visible = true AND active = true);

    CREATE POLICY "Admins can manage leadership"
    ON public.leadership
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- programs
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF to_regclass('public.programs') IS NOT NULL THEN
    ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Public can read visible programs" ON public.programs;
    DROP POLICY IF EXISTS "Admins can manage programs" ON public.programs;

    CREATE POLICY "Public can read visible programs"
    ON public.programs
    FOR SELECT
    TO anon, authenticated
    USING (visible = true AND published = true);

    CREATE POLICY "Admins can manage programs"
    ON public.programs
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- hall_bookings
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF to_regclass('public.hall_bookings') IS NOT NULL THEN
    ALTER TABLE public.hall_bookings ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Public can read approved hall bookings" ON public.hall_bookings;
    DROP POLICY IF EXISTS "Public can submit hall bookings" ON public.hall_bookings;
    DROP POLICY IF EXISTS "Admins can manage hall bookings" ON public.hall_bookings;

    CREATE POLICY "Public can read approved hall bookings"
    ON public.hall_bookings
    FOR SELECT
    TO anon, authenticated
    USING (status = 'approved' AND visible_public = true);

    CREATE POLICY "Public can submit hall bookings"
    ON public.hall_bookings
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

    CREATE POLICY "Admins can manage hall bookings"
    ON public.hall_bookings
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
