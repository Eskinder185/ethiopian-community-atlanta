-- Remove Volunteer and Donate CTAs from homepage hero (desktop shows Member + Events only)

UPDATE public.homepage_sections
SET
  content = content - 'supportCta' - 'donateCta',
  content_am = content_am - 'supportCta' - 'donateCta',
  updated_at = now()
WHERE section_key = 'hero';

NOTIFY pgrst, 'reload schema';
