-- Update homepage hero and mission section defaults for warmer first impression
-- Safe to run when homepage_sections table exists; merges with admin CMS

INSERT INTO public.homepage_sections (section_key, title, content, content_am, visible, display_order)
VALUES
  (
    'hero',
    'Hero',
    '{
      "visible": true,
      "eyebrow": "Serving the Ethiopian and Ethiopian American community in Atlanta since 1983.",
      "title": "A Home for Ethiopians in Atlanta",
      "description": "Connect with culture, community, support, events, and people who understand your story.",
      "trustCue": "",
      "primaryCta": { "label": "Become a Member", "href": "/membership" },
      "secondaryCta": { "label": "See Upcoming Events", "href": "/events" },
      "supportCta": { "label": "Volunteer", "href": "/support#volunteer" },
      "donateCta": { "label": "Donate", "href": "/support" },
      "image": "/images/heroes/home-hero.jpg",
      "imageAlt": "Ethiopian community members gathered together at an ECAA event in the Atlanta area."
    }'::jsonb,
    '{
      "eyebrow": "ከ1983 ጀምሮ በአትላንታ ያለውን የኢትዮጵያውያን እና የኢትዮጵያ-አሜሪካውያን ማህበረሰብ በማገልገል ላይ",
      "title": "በአትላንታ ለኢትዮጵያውያን የሆነ ቤት",
      "description": "ከባህል፣ ከማህበረሰብ፣ ከድጋፍ፣ ከዝግጅቶች እና ታሪክዎን ከሚረዱ ሰዎች ጋር ይገናኙ።",
      "primaryCta": { "label": "አባል ይሁኑ" },
      "secondaryCta": { "label": "መጪ ዝግጅቶችን ይመልከቱ" },
      "supportCta": { "label": "በጎ ፈቃደኝነት" },
      "donateCta": { "label": "ይለግሱ" }
    }'::jsonb,
    true,
    1
  ),
  (
    'missionSection',
    'Mission',
    '{
      "visible": true,
      "eyebrow": "",
      "title": "Our Mission",
      "description": "ECAA brings Ethiopians and Ethiopian Americans in Atlanta together through culture, education, mutual support, youth programs, family services, events, and community leadership.",
      "primaryCta": { "label": "Learn About ECAA", "href": "/about" },
      "secondaryCta": { "label": "Explore Programs", "href": "/programs" },
      "badges": [
        { "id": "culture", "label": "Culture" },
        { "id": "education", "label": "Education" },
        { "id": "support", "label": "Mutual Support" },
        { "id": "youth", "label": "Youth & Family" }
      ]
    }'::jsonb,
    '{
      "title": "ተልዕኮአችን",
      "description": "ECAA በአትላንታ የሚገኙ ኢትዮጵያውያንን እና ኢትዮጵያ-አሜሪካውያንን በባህል፣ በትምህርት፣ በየጋራ ድጋፍ፣ በወጣቶች ፕሮግራሞች፣ በቤተሰብ አገልግሎቶች፣ በዝግጅቶች እና በማህበረሰብ አመራር ያሰባስባል።",
      "primaryCta": { "label": "ስለ ECAA ይወቁ" },
      "secondaryCta": { "label": "ፕሮግራሞችን ያስሱ" },
      "badges": [
        { "label": "ባህል" },
        { "label": "ትምህርት" },
        { "label": "የጋራ ድጋፍ" },
        { "label": "ወጣቶች እና ቤተሰብ" }
      ]
    }'::jsonb,
    true,
    2
  )
ON CONFLICT (section_key) DO UPDATE SET
  content = EXCLUDED.content,
  content_am = EXCLUDED.content_am,
  visible = EXCLUDED.visible,
  display_order = EXCLUDED.display_order,
  updated_at = now();

NOTIFY pgrst, 'reload schema';
