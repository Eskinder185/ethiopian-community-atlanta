-- Add optional homepage cover image fields to events
ALTER TABLE IF EXISTS public.events
  ADD COLUMN IF NOT EXISTS cover_image_url text,
  ADD COLUMN IF NOT EXISTS cover_image_alt text;

NOTIFY pgrst, 'reload schema';
