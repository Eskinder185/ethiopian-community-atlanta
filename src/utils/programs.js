import fallbackPrograms from "../data/programs.js";
import { supabase } from "../lib/supabaseClient";
import { hasUsableText, isTodoValue } from "./data";

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

function warnSupabaseFallback(context, error) {
  console.warn(`Using fallback programs because Supabase failed (${context})`, error);
}

export function isProgramVisible(program) {
  if (!program) return false;
  if (program.visible === false || program.published === false) return false;
  return hasUsableText(program.title) && hasUsableText(program.slug);
}

function parseJsonField(value, fallback = []) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function normalizeDetailSections(sections) {
  return parseJsonField(sections)
    .map((section) => ({
      heading: section?.heading || section?.title || "",
      body: section?.body || section?.description || "",
    }))
    .filter((section) => hasUsableText(section.heading) && hasUsableText(section.body));
}

function normalizeMediaItems(items) {
  return parseJsonField(items)
    .map((item, index) => ({
      id: item?.id || `media-${index}`,
      type: item?.type || "image",
      title: item?.title || "",
      caption: item?.caption || "",
      url: item?.url || "",
      imageUrl: item?.imageUrl || item?.image_url || "",
      altText: item?.altText || item?.alt_text || "",
    }))
    .filter(
      (item) => hasUsableText(item.title) || hasUsableText(item.url) || hasUsableText(item.imageUrl)
    );
}

function normalizeResourceLinks(links) {
  return parseJsonField(links)
    .map((link, index) => ({
      id: link?.id || `resource-${index}`,
      label: link?.label || link?.title || "",
      url: link?.url || "",
      description: link?.description || "",
      buttonLabel: link?.buttonLabel || link?.button_label || "",
      external: link?.external !== false,
    }))
    .filter(
      (link) => hasUsableText(link.label) && hasUsableText(link.url) && !isTodoValue(link.url)
    );
}

function normalizeRegistrationLinks(raw) {
  const parsed = parseJsonField(raw.registrationLinks ?? raw.registration_links, []);
  const items = parsed.map((link, index) => ({
    id: link?.id || `registration-${index}`,
    title: link?.title || link?.label || "",
    description: link?.description || "",
    buttonLabel: link?.buttonLabel || link?.button_label || "Open Form",
    url: link?.url || "",
    external: link?.external !== false,
    note: link?.note || "",
  }));

  if (items.length > 0) {
    return items.filter(
      (link) => hasUsableText(link.title) && hasUsableText(link.url) && !isTodoValue(link.url)
    );
  }

  const legacyLabel = raw.interestFormLabel || raw.interest_form_label || "";
  const legacyLink = raw.interestFormLink || raw.interest_form_link || "";
  if (hasUsableText(legacyLabel) && hasUsableText(legacyLink) && !isTodoValue(legacyLink)) {
    return [
      {
        id: "legacy-interest-form",
        title: legacyLabel,
        description: "",
        buttonLabel: legacyLabel,
        url: legacyLink,
        external: legacyLink.startsWith("http"),
        note: "",
      },
    ];
  }

  return [];
}

/** Normalize JSON fallback or Supabase row into one app shape. */
export function normalizeProgram(raw) {
  if (!raw) return null;

  const slug = raw.slug || raw.id || "";
  const placeholderDetails = parseJsonField(
    raw.placeholderDetails ?? raw.placeholder_details,
    []
  ).filter((line) => hasUsableText(line) && !isTodoValue(line));

  const registrationLinks = normalizeRegistrationLinks(raw);
  const legacyInterest = registrationLinks[0];

  return {
    id: raw.id || slug,
    slug,
    initials: raw.initials || "",
    category: raw.category || "",
    title: raw.title || "",
    subtitle: raw.subtitle || "",
    description: raw.description || raw.shortDescription || raw.short_description || "",
    shortDescription: raw.shortDescription || raw.short_description || raw.description || "",
    fullDescription: raw.fullDescription || raw.full_description || "",
    pageIntro: raw.pageIntro || raw.page_intro || "",
    statusLabel: raw.statusLabel || raw.status_label || "Details Coming Soon",
    placeholderDetails,
    detailSections: normalizeDetailSections(raw.detailSections ?? raw.detail_sections),
    mediaItems: normalizeMediaItems(raw.mediaItems ?? raw.media_items),
    resourceLinks: normalizeResourceLinks(raw.resourceLinks ?? raw.resource_links),
    registrationLinks,
    registrationEmptyMessage: raw.registrationEmptyMessage || raw.registration_empty_message || "",
    mediaEmptyMessage: raw.mediaEmptyMessage || raw.media_empty_message || "",
    interestFormLabel:
      legacyInterest?.title || raw.interestFormLabel || raw.interest_form_label || "",
    interestFormLink: legacyInterest?.url || raw.interestFormLink || raw.interest_form_link || "",
    interestFormSlug: raw.interest_form_slug || raw.interestFormSlug || "",
    buttonLabel: raw.buttonLabel || raw.button_label || "View Program Details",
    buttonLink: raw.buttonLink || raw.button_link || `/programs/${slug}`,
    featured: raw.featured !== false,
    visible: raw.visible !== false,
    published: raw.published !== false,
    displayOrder:
      typeof raw.displayOrder === "number" ? raw.displayOrder : (raw.display_order ?? 999),
    legalNotice: raw.legalNotice || raw.legal_notice || "",
    content_am: raw.content_am ?? raw.contentAm ?? null,
  };
}

export function getFallbackPrograms() {
  return fallbackPrograms
    .map(normalizeProgram)
    .filter(isProgramVisible)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getFallbackProgramBySlug(slug) {
  const program = fallbackPrograms.find((item) => item.slug === slug || item.id === slug);
  const normalized = normalizeProgram(program);
  return normalized && isProgramVisible(normalized) ? normalized : null;
}

export async function fetchPrograms() {
  if (!hasSupabaseConfig()) {
    return getFallbackPrograms();
  }

  try {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      warnSupabaseFallback("fetchPrograms", error);
      return getFallbackPrograms();
    }

    if (!data?.length) {
      return getFallbackPrograms();
    }

    const normalized = data.map(normalizeProgram).filter(isProgramVisible);
    return normalized.length > 0 ? normalized : getFallbackPrograms();
  } catch (error) {
    warnSupabaseFallback("fetchPrograms", error);
    return getFallbackPrograms();
  }
}

export async function fetchProgramBySlug(slug) {
  if (!slug) return null;

  if (!hasSupabaseConfig()) {
    return getFallbackProgramBySlug(slug);
  }

  try {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      warnSupabaseFallback(`fetchProgramBySlug:${slug}`, error);
      return getFallbackProgramBySlug(slug);
    }

    if (data) {
      const normalized = normalizeProgram(data);
      if (normalized && isProgramVisible(normalized)) return normalized;
    }
  } catch (error) {
    warnSupabaseFallback(`fetchProgramBySlug:${slug}`, error);
  }

  return getFallbackProgramBySlug(slug);
}

export function programToDbRow(program) {
  return {
    slug: program.slug,
    title: program.title,
    category: program.category,
    subtitle: program.subtitle || "",
    initials: program.initials || "",
    short_description: program.shortDescription || program.description || "",
    full_description: program.fullDescription || "",
    page_intro: program.pageIntro || "",
    status_label: program.statusLabel || "Details Coming Soon",
    placeholder_details: program.placeholderDetails ?? [],
    detail_sections: program.detailSections ?? [],
    media_items: program.mediaItems ?? [],
    resource_links: program.resourceLinks ?? [],
    registration_links: program.registrationLinks ?? [],
    registration_empty_message: program.registrationEmptyMessage || "",
    media_empty_message: program.mediaEmptyMessage || "",
    interest_form_label: program.registrationLinks?.[0]?.title || program.interestFormLabel || "",
    interest_form_link: program.registrationLinks?.[0]?.url || program.interestFormLink || "",
    interest_form_slug: program.interestFormSlug || "",
    button_label: program.buttonLabel || "View Program Details",
    button_link: program.buttonLink || `/programs/${program.slug}`,
    featured: program.featured !== false,
    visible: program.visible !== false,
    display_order: program.displayOrder ?? 999,
    legal_notice: program.legalNotice || "",
    content_am: program.content_am ?? null,
  };
}

export async function saveProgram(program) {
  const row = programToDbRow(program);
  const { data, error } = await supabase
    .from("programs")
    .upsert(row, { onConflict: "slug" })
    .select()
    .single();
  if (error) throw error;
  return normalizeProgram(data);
}

export async function fetchProgramsForAdmin() {
  if (!hasSupabaseConfig()) {
    return fallbackPrograms.map(normalizeProgram);
  }

  try {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      warnSupabaseFallback("fetchProgramsForAdmin", error);
      return fallbackPrograms.map(normalizeProgram);
    }

    if (data?.length) {
      return data.map(normalizeProgram);
    }
  } catch (error) {
    warnSupabaseFallback("fetchProgramsForAdmin", error);
  }

  return fallbackPrograms.map(normalizeProgram);
}

export function createEmptyProgram() {
  return normalizeProgram({
    slug: "",
    title: "",
    category: "Education & Training",
    subtitle: "",
    initials: "",
    description: "",
    shortDescription: "",
    fullDescription: "",
    pageIntro: "",
    statusLabel: "Details Coming Soon",
    placeholderDetails: [],
    detailSections: [],
    mediaItems: [],
    resourceLinks: [],
    registrationLinks: [],
    registrationEmptyMessage: "",
    mediaEmptyMessage: "",
    interestFormLabel: "",
    interestFormLink: "",
    interestFormSlug: "",
    buttonLabel: "View Program Details",
    buttonLink: "",
    featured: false,
    visible: true,
    displayOrder: 999,
    published: true,
    content_am: {},
  });
}

export function slugifyTitle(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProgramOverviewText(program, fallbackText) {
  if (hasUsableText(program?.fullDescription) && !isTodoValue(program.fullDescription)) {
    return program.fullDescription;
  }
  if (hasUsableText(program?.pageIntro) && !isTodoValue(program.pageIntro)) {
    return program.pageIntro;
  }
  return (
    fallbackText || "More information about this program will be added as details become available."
  );
}

export function getDefaultDetailSections(program) {
  if (program?.detailSections?.length) return program.detailSections;

  return [
    {
      heading: "Program Information",
      body: "Program details, session information, and community resources will be shared as they become available.",
    },
    {
      heading: "Community Support",
      body: "Contact ECAA for current information about participation, family support, and upcoming announcements.",
    },
  ];
}
