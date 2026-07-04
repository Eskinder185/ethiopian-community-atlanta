-- Replace legacy formal homepage hero copy with warm welcoming message
-- Safe to run when homepage_sections table exists; merges with admin CMS

INSERT INTO public.homepage_sections (section_key, title, content, content_am, visible, display_order)
VALUES
  (
    'hero',
    'Hero',
    '{
      "visible": true,
      "eyebrow": "Ethiopian Community Association in Atlanta",
      "title": "A Home for Ethiopians in Atlanta",
      "description": "Come connect with culture, community, support, events, and people who understand your story.",
      "trustCue": "Serving Ethiopian and Ethiopian American families in Atlanta since 1983.",
      "primaryCta": { "label": "Become a Member", "href": "/membership" },
      "secondaryCta": { "label": "See Upcoming Events", "href": "/events" },
      "supportCta": { "label": "Volunteer", "href": "/support#volunteer" },
      "donateCta": { "label": "Donate", "href": "/support" },
      "image": "/images/heroes/home-hero.jpg",
      "imageAlt": "Ethiopian community members gathered together at an ECAA event in the Atlanta area."
    }'::jsonb,
    '{
      "eyebrow": "በአትላንታ የሚገኘው የኢትዮጵያ ማህበረሰብ ማህበር",
      "title": "በአትላንታ ለኢትዮጵያውያን የሆነ ቤት",
      "description": "ከባህል፣ ከማህበረሰብ፣ ከድጋፍ፣ ከዝግጅቶች እና ታሪክዎን ከሚረዱ ሰዎች ጋር ይገናኙ።",
      "trustCue": "ከ1983 ጀምሮ በአትላንታ ያሉ ኢትዮጵያውያንን እና ኢትዮጵያ-አሜሪካውያንን በማገልገል ላይ",
      "primaryCta": { "label": "አባል ይሁኑ" },
      "secondaryCta": { "label": "መጪ ዝግጅቶችን ይመልከቱ" },
      "supportCta": { "label": "በጎ ፈቃደኝነት" },
      "donateCta": { "label": "ይለግሱ" }
    }'::jsonb,
    true,
    1
  )
ON CONFLICT (section_key) DO UPDATE SET
  content = EXCLUDED.content,
  content_am = EXCLUDED.content_am,
  visible = EXCLUDED.visible,
  display_order = EXCLUDED.display_order,
  updated_at = now();

NOTIFY pgrst, 'reload schema';
