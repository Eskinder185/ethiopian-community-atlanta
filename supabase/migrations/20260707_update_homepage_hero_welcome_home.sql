-- Update homepage hero to warmer "Welcome Home" copy (EN + AM)
-- Safe to run when homepage_sections table exists; merges with admin CMS

INSERT INTO public.homepage_sections (section_key, title, content, content_am, visible, display_order)
VALUES
  (
    'hero',
    'Hero',
    '{
      "visible": true,
      "eyebrow": "Ethiopian Community Association in Atlanta",
      "title": "Welcome Home, Ethiopians in Atlanta",
      "description": "Whether you are new to Atlanta or have called it home for years, ECAA is a place to connect, celebrate our culture, support one another, and belong.",
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
      "title": "እንኳን ወደ ቤታችን መጡ፣ በአትላንታ ያሉ ኢትዮጵያውያን",
      "description": "አዲስ ወደ አትላንታ የመጡም ይሁኑ ለዓመታት እዚህ የኖሩ፣ ECAA ከማህበረሰብ ጋር ለመገናኘት፣ ባህላችንን ለማክበር፣ እርስ በርስ ለመደጋገፍ እና የቤትነት ስሜት ለማግኘት የተዘጋጀ ቦታ ነው።",
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
