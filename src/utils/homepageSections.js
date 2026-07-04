import { getFallbackHomepage, HOMEPAGE_SECTION_KEYS } from "../data/homepage";
import { getFallbackHomepageAmharic } from "../data/homepageAmharic";
import { supabase } from "../lib/supabaseClient";
import { mergeLocalizedContent, stripEmptyOverlay } from "./homepageLocale";
import { normalizeHomeHeroAmharicSection, normalizeHomeHeroSection } from "./normalizeHomeHero";

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

function warnSupabaseFallback(context, error) {
  console.warn(`Using fallback homepage because Supabase failed (${context})`, error);
}

function mergeSection(fallbackSection, remoteContent) {
  if (!remoteContent || typeof remoteContent !== "object") return fallbackSection;
  return mergeLocalizedContent(fallbackSection, remoteContent);
}

function buildEnglishHomepage(rows = []) {
  const fallback = getFallbackHomepage();
  if (!rows.length) return fallback;

  const merged = { ...fallback };
  for (const row of rows) {
    const key = row.section_key;
    if (!HOMEPAGE_SECTION_KEYS.includes(key)) continue;
    merged[key] = mergeSection(fallback[key], row.content);
    if (key === "hero") {
      merged[key] = normalizeHomeHeroSection(merged[key]);
    }
    if (row.visible === false && merged[key]) {
      merged[key] = { ...merged[key], visible: false };
    }
  }
  return merged;
}

function buildAmharicOverlay(rows = []) {
  const fallbackAm = getFallbackHomepageAmharic();
  const overlay = { ...fallbackAm };

  for (const row of rows) {
    const key = row.section_key;
    if (!HOMEPAGE_SECTION_KEYS.includes(key)) continue;
    if (row.content_am && typeof row.content_am === "object") {
      let mergedAm = mergeSection(overlay[key] || {}, row.content_am);
      if (key === "hero") {
        mergedAm = normalizeHomeHeroAmharicSection(mergedAm);
      }
      overlay[key] = mergedAm;
    }
  }

  return overlay;
}

export async function fetchHomepageBilingual() {
  const fallbackEn = getFallbackHomepage();
  const fallbackAm = getFallbackHomepageAmharic();

  if (!hasSupabaseConfig()) {
    return {
      en: fallbackEn,
      am: fallbackAm,
    };
  }

  try {
    const { data, error } = await supabase
      .from("homepage_sections")
      .select("section_key, title, content, content_am, visible, display_order");

    if (error) {
      warnSupabaseFallback("fetchHomepageBilingual", error);
      return { en: fallbackEn, am: fallbackAm };
    }

    if (!data?.length) {
      return { en: fallbackEn, am: fallbackAm };
    }

    return {
      en: buildEnglishHomepage(data),
      am: buildAmharicOverlay(data),
    };
  } catch (error) {
    warnSupabaseFallback("fetchHomepageBilingual", error);
    return { en: fallbackEn, am: fallbackAm };
  }
}

/** @deprecated Use fetchHomepageBilingual — kept for admin refresh compatibility */
export async function fetchHomepage() {
  const { en } = await fetchHomepageBilingual();
  return en;
}

export async function fetchHomepageForAdmin() {
  const bilingual = await fetchHomepageBilingual();
  return {
    sections: bilingual.en,
    sectionsAm: bilingual.am,
  };
}

export async function saveHomepageSection(sectionKey, content, contentAm = null) {
  if (!HOMEPAGE_SECTION_KEYS.includes(sectionKey)) {
    throw new Error(`Unknown homepage section: ${sectionKey}`);
  }

  if (!hasSupabaseConfig()) {
    throw new Error(
      "Supabase is not configured. Connect Supabase to save homepage changes from the admin portal."
    );
  }

  const payload = {
    section_key: sectionKey,
    content,
    visible: content?.visible !== false,
  };

  if (contentAm !== null) {
    payload.content_am = stripEmptyOverlay(contentAm);
  }

  const { error } = await supabase
    .from("homepage_sections")
    .upsert(payload, { onConflict: "section_key" });

  if (error) throw error;
}

export async function saveAllHomepageSections(sections, sectionsAm = {}) {
  for (const key of HOMEPAGE_SECTION_KEYS) {
    if (sections[key]) {
      await saveHomepageSection(key, sections[key], sectionsAm[key] || {});
    }
  }
}
