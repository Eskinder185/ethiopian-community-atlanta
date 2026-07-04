import fallbackEvents from "../data/events.js";
import { supabase } from "../lib/supabaseClient";
import { sanitizeStoredImageUrl, resolvePublicImageUrl } from "../lib/uploadMedia";
import { getDirectImageUrl } from "./mediaUrl";
import { filterVerifiedContent, hasUsableText } from "./data";
import {
  assertAdminSession,
  ensureDeletableUuid,
  logAdminDeleteInDev,
  mapAdminDeleteError,
} from "./adminAuth";

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

function warnSupabaseFallback(context, error) {
  console.warn(`Using fallback events because Supabase failed (${context})`, error);
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

function isEventItemVisible(item) {
  return item?.published !== false && item?.visible !== false;
}

export const EVENT_STATUS = {
  UPCOMING: "upcoming",
  ANNOUNCEMENT: "announcement",
  COMMUNITY_NEWS: "community-news",
  PAST: "past",
};

export function normalizeEvent(raw) {
  if (!raw) return null;
  const slug = raw.slug || raw.id || "";
  const eventDate = raw.event_date || raw.eventDate || raw.date || "";

  return {
    id: raw.id || slug,
    slug,
    status: raw.status || EVENT_STATUS.UPCOMING,
    category: raw.category || "",
    title: raw.title || "",
    eventDate,
    eventTime: raw.event_time || raw.eventTime || "",
    location: raw.location || "",
    excerpt: raw.excerpt || raw.summary || "",
    description: raw.description || raw.body || "",
    imageUrl: resolvePublicImageUrl(raw.image_url || raw.imageUrl || raw.image?.src || "") || "",
    imageAlt: raw.image_alt || raw.imageAlt || raw.image?.alt || "",
    coverImageUrl:
      resolvePublicImageUrl(raw.cover_image_url || raw.coverImageUrl || "") || "",
    coverImageAlt: raw.cover_image_alt || raw.coverImageAlt || "",
    eventbriteLink: raw.eventbrite_link || raw.eventbriteLink || "",
    googleFormLink: raw.google_form_link || raw.googleFormLink || "",
    registrationFormSlug: raw.registration_form_slug || raw.registrationFormSlug || "",
    partifulLink: raw.partiful_link || raw.partifulLink || "",
    youtubeLink: raw.youtube_link || raw.youtubeLink || "",
    link: raw.link || "",
    registrationUrl: raw.registration_url || raw.registrationUrl || "",
    recapUrl: raw.recap_url || raw.recapUrl || "",
    ctaLabel: raw.cta_label || raw.ctaLabel || "Learn more",
    mediaItems: parseJsonField(raw.media_items ?? raw.mediaItems),
    resourceLinks: parseJsonField(raw.resource_links ?? raw.resourceLinks),
    registrationLinks: parseJsonField(raw.registration_links ?? raw.registrationLinks),
    featured: raw.featured === true,
    visible: raw.visible !== false,
    published: raw.published !== false,
    displayOrder: raw.display_order ?? raw.displayOrder ?? 999,
    external: raw.external !== false,
    date: eventDate,
    summary: raw.excerpt || raw.summary || "",
    shortDescription: raw.short_description || raw.shortDescription || "",
    startTime: raw.start_time || raw.startTime || "",
    endTime: raw.end_time || raw.endTime || "",
    content_am: raw.content_am ?? raw.contentAm ?? null,
    createdAt: raw.created_at || raw.createdAt || "",
  };
}

export function isHomepageEventCandidate(event) {
  if (!isEventItemVisible(event)) return false;
  if (!hasUsableText(event.title)) return false;
  return event.status === EVENT_STATUS.UPCOMING || event.featured === true;
}

function getHomepageEventsFallback() {
  return getFallbackEvents().filter(isHomepageEventCandidate);
}

export function getFallbackEvents() {
  return fallbackEvents.map(normalizeEvent).filter(isEventItemVisible);
}

function parseEventDate(value) {
  if (!hasUsableText(value)) return null;
  const trimmed = value.trim();
  if (/^\d{4}$/.test(trimmed)) {
    return new Date(`${trimmed}-12-31T23:59:59`);
  }
  const parsed = Date.parse(trimmed);
  return Number.isNaN(parsed) ? null : new Date(parsed);
}

export function sortUpcomingEvents(events = []) {
  return [...events].sort((a, b) => {
    const dateA = parseEventDate(a.eventDate || a.date);
    const dateB = parseEventDate(b.eventDate || b.date);
    if (dateA && dateB) return dateA - dateB;
    if (dateA) return -1;
    if (dateB) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getVerifiedUpcomingEvents(events = []) {
  const verified = filterVerifiedContent(events, ["title"])
    .filter(isEventItemVisible)
    .filter((item) => hasUsableText(item.eventDate || item.date));
  return sortUpcomingEvents(verified);
}

export function getVerifiedAnnouncements(items = []) {
  return filterVerifiedContent(items, ["title"]).filter(isEventItemVisible);
}

export function getVerifiedCommunityNews(items = []) {
  return filterVerifiedContent(items, ["title"]).filter(isEventItemVisible);
}

export function getVerifiedPastEvents(events = []) {
  return filterVerifiedContent(events, ["title"]).filter(isEventItemVisible);
}

export function groupEvents(events = []) {
  const visible = events.filter(isEventItemVisible);
  return {
    upcoming: getVerifiedUpcomingEvents(visible.filter((e) => e.status === EVENT_STATUS.UPCOMING)),
    announcements: getVerifiedAnnouncements(
      visible.filter((e) => e.status === EVENT_STATUS.ANNOUNCEMENT)
    ),
    communityNews: getVerifiedCommunityNews(
      visible.filter((e) => e.status === EVENT_STATUS.COMMUNITY_NEWS)
    ),
    past: getVerifiedPastEvents(visible.filter((e) => e.status === EVENT_STATUS.PAST)),
  };
}

export async function fetchHomepageEvents() {
  if (!hasSupabaseConfig()) {
    return import.meta.env.DEV ? getHomepageEventsFallback() : [];
  }

  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("visible", true)
      .order("display_order", { ascending: true });

    if (error) {
      warnSupabaseFallback("fetchHomepageEvents", error);
      return import.meta.env.DEV ? getHomepageEventsFallback() : [];
    }

    if (!data?.length) return [];

    return data.map(normalizeEvent).filter(isHomepageEventCandidate);
  } catch (error) {
    warnSupabaseFallback("fetchHomepageEvents", error);
    return import.meta.env.DEV ? getHomepageEventsFallback() : [];
  }
}

export async function fetchEvents() {
  if (!hasSupabaseConfig()) return getFallbackEvents();

  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      warnSupabaseFallback("fetchEvents", error);
      return getFallbackEvents();
    }

    if (!data?.length) return getFallbackEvents();

    const normalized = data.map(normalizeEvent).filter(isEventItemVisible);
    return normalized.length > 0 ? normalized : getFallbackEvents();
  } catch (error) {
    warnSupabaseFallback("fetchEvents", error);
    return getFallbackEvents();
  }
}

export async function fetchEventsForAdmin() {
  if (!hasSupabaseConfig()) return getFallbackEvents();

  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      warnSupabaseFallback("fetchEventsForAdmin", error);
      return getFallbackEvents();
    }
    if (data?.length) return data.map(normalizeEvent);
  } catch (error) {
    warnSupabaseFallback("fetchEventsForAdmin", error);
  }

  return getFallbackEvents();
}

export function eventToDbRow(event) {
  return {
    slug: event.slug,
    title: event.title,
    status: event.status,
    category: event.category || "",
    event_date: event.eventDate || "",
    event_time: event.eventTime || "",
    location: event.location || "",
    excerpt: event.excerpt || "",
    description: event.description || "",
    image_url: sanitizeStoredImageUrl(event.imageUrl) || "",
    image_alt: event.imageAlt || "",
    cover_image_url: sanitizeStoredImageUrl(event.coverImageUrl) || null,
    cover_image_alt: event.coverImageAlt || "",
    eventbrite_link: event.eventbriteLink || "",
    google_form_link: event.googleFormLink || "",
    registration_form_slug: event.registrationFormSlug || "",
    partiful_link: event.partifulLink || "",
    youtube_link: event.youtubeLink || "",
    media_items: event.mediaItems ?? [],
    resource_links: event.resourceLinks ?? [],
    registration_links: event.registrationLinks ?? [],
    featured: event.featured === true,
    visible: event.visible !== false,
    display_order: event.displayOrder ?? 999,
  };
}

export async function saveEvent(event) {
  const row = eventToDbRow(event);
  const { data, error } = await supabase
    .from("events")
    .upsert(row, { onConflict: "slug" })
    .select()
    .single();
  if (error) throw error;
  return normalizeEvent(data);
}

export async function hideEventFromSite(id) {
  await assertAdminSession();
  ensureDeletableUuid(id, "event");
  await logAdminDeleteInDev();

  const { error } = await supabase
    .from("events")
    .update({ visible: false, published: false })
    .eq("id", id);

  if (error) throw mapAdminDeleteError(error);
}

export async function deleteEvent(id) {
  await assertAdminSession();
  ensureDeletableUuid(id, "event");
  await logAdminDeleteInDev();

  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw mapAdminDeleteError(error);
}

export function getEventRawImageUrl(event, { preferCover = false } = {}) {
  if (!event) return "";

  const cover = event.coverImageUrl || event.cover_image_url || "";
  const poster = event.imageUrl || event.image_url || "";

  return preferCover ? cover || poster : poster || cover;
}

export function getResolvedEventImageUrl(event, { preferCover = false } = {}) {
  const raw = getEventRawImageUrl(event, { preferCover });
  if (!hasUsableText(raw)) return "";
  return getDirectImageUrl(resolvePublicImageUrl(raw) || raw);
}

export function formatEventDateLabel(date) {
  if (!hasUsableText(date)) return null;
  if (/^\d{4}$/.test(date.trim())) return date.trim();
  return date.trim();
}
