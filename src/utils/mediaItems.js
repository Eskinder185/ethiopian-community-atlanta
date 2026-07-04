import fallbackMediaItems from "../data/mediaItems.js";
import { sanitizeStoredImageUrl, resolvePublicImageUrl } from "../lib/uploadMedia";
import { supabase } from "../lib/supabaseClient";
import { hasUsableText, isTodoValue } from "./data";
import { normalizeMediaContentAm } from "./mediaLocale";
import { cleanUuid, isValidUuid } from "./uuid";

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

function warnSupabaseFallback(context, error) {
  console.warn(
    `Media items could not be loaded from Supabase. Using fallback media. (${context})`,
    error
  );
}

export const MEDIA_TYPES = {
  IMAGE: "image",
  GIF: "gif",
  YOUTUBE: "youtube",
  VIDEO_LINK: "video_link",
  EVENTBRITE: "eventbrite",
  GOOGLE_FORM: "google_form",
  PARTIFUL: "partiful",
  DOCUMENT: "document",
  EXTERNAL_LINK: "external_link",
};

export const LINK_MEDIA_TYPES = [
  MEDIA_TYPES.VIDEO_LINK,
  MEDIA_TYPES.EVENTBRITE,
  MEDIA_TYPES.GOOGLE_FORM,
  MEDIA_TYPES.PARTIFUL,
  MEDIA_TYPES.DOCUMENT,
  MEDIA_TYPES.EXTERNAL_LINK,
];

export const COMMUNITY_LINK_MEDIA_TYPES = [
  MEDIA_TYPES.EVENTBRITE,
  MEDIA_TYPES.GOOGLE_FORM,
  MEDIA_TYPES.PARTIFUL,
  MEDIA_TYPES.EXTERNAL_LINK,
];

export const VIDEO_MEDIA_TYPES = [MEDIA_TYPES.YOUTUBE, MEDIA_TYPES.VIDEO_LINK];

export const PHOTO_MEDIA_TYPES = [MEDIA_TYPES.IMAGE, MEDIA_TYPES.GIF];

export function isMediaVisible(item) {
  if (!item) return false;
  if (item.visible === false || item.published === false) return false;
  return hasUsableText(item.title) || hasUsableText(item.url) || hasUsableText(item.imageUrl);
}

export function normalizeMediaItem(raw, index = 0) {
  if (!raw) return null;

  const id = raw.id || `local-media-${index}`;
  const relatedEventId = raw.related_event_id || raw.relatedEventId || "";

  return {
    id,
    localOnly: raw.localOnly === true || !isValidUuid(id),
    title: raw.title || "",
    caption: raw.caption || raw.description || "",
    type: raw.type || MEDIA_TYPES.IMAGE,
    url: raw.url || "",
    imageUrl: resolvePublicImageUrl(raw.image_url || raw.imageUrl || "") || "",
    altText: raw.alt_text || raw.altText || "",
    relatedEventId: isValidUuid(relatedEventId) ? relatedEventId : "",
    category: raw.category || "",
    featured: raw.featured === true,
    visible: raw.visible !== false,
    published: raw.published !== false,
    displayOrder: raw.display_order ?? raw.displayOrder ?? index + 1,
    content_am: normalizeMediaContentAm(raw.content_am ?? raw.contentAm),
    buttonLabel: "",
    createdAt: raw.created_at || raw.createdAt || "",
  };
}

const HOMEPAGE_MEDIA_CATEGORIES = ["photo", "gallery", "community"];

export function isHomepageMediaCandidate(item) {
  if (!item || item.visible === false || item.published === false) return false;
  if (!PHOTO_MEDIA_TYPES.includes(item.type)) return false;

  const imageUrl = item.imageUrl || item.image_url || "";
  if (!hasUsableText(imageUrl) || isTodoValue(imageUrl) || imageUrl.startsWith("blob:")) {
    return false;
  }

  const category = (item.category || "").toLowerCase();
  const categoryMatch = HOMEPAGE_MEDIA_CATEGORIES.some((key) => category.includes(key));
  return item.featured === true || categoryMatch;
}

function getHomepageMediaFallback() {
  return fallbackMediaItems.map(normalizeMediaItem).filter(isHomepageMediaCandidate);
}

function collectEventMediaItems(events = []) {
  const fromEvents = [];
  events.forEach((event) => {
    const eventUuid = cleanUuid(event.id);
    (event.mediaItems ?? []).forEach((item, index) => {
      fromEvents.push(
        normalizeMediaItem(
          {
            ...item,
            localOnly: true,
            related_event_id: cleanUuid(item.related_event_id) || eventUuid || null,
          },
          index
        )
      );
    });
  });
  return fromEvents.filter(isMediaVisible);
}

export function getFallbackMediaItems(events = []) {
  const base = fallbackMediaItems.map(normalizeMediaItem).filter(isMediaVisible);
  const fromEvents = collectEventMediaItems(events);
  const merged = [...base];

  fromEvents.forEach((item) => {
    if (!merged.some((existing) => existing.id === item.id)) {
      merged.push(item);
    }
  });

  return merged.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function fetchHomepageMediaItems() {
  if (!hasSupabaseConfig()) {
    return import.meta.env.DEV ? getHomepageMediaFallback() : [];
  }

  try {
    const { data, error } = await supabase
      .from("media_items")
      .select("*")
      .eq("visible", true)
      .order("display_order", { ascending: true });

    if (error) {
      warnSupabaseFallback("fetchHomepageMediaItems", error);
      return import.meta.env.DEV ? getHomepageMediaFallback() : [];
    }

    if (!data?.length) return [];

    return data.map(normalizeMediaItem).filter(isHomepageMediaCandidate);
  } catch (error) {
    warnSupabaseFallback("fetchHomepageMediaItems", error);
    return import.meta.env.DEV ? getHomepageMediaFallback() : [];
  }
}

export async function fetchMediaItems(events = []) {
  if (!hasSupabaseConfig()) return getFallbackMediaItems(events);

  try {
    const { data, error } = await supabase
      .from("media_items")
      .select("*")
      .eq("visible", true)
      .order("display_order", { ascending: true });

    if (error) {
      warnSupabaseFallback("fetchMediaItems", error);
      return getFallbackMediaItems(events);
    }

    if (!data?.length) return getFallbackMediaItems(events);

    const normalized = data.map(normalizeMediaItem).filter(isMediaVisible);
    const fromEvents = collectEventMediaItems(events);
    const merged = [...normalized];

    fromEvents.forEach((item) => {
      if (!merged.some((existing) => existing.id === item.id)) {
        merged.push(item);
      }
    });

    return merged.length > 0
      ? merged.sort((a, b) => a.displayOrder - b.displayOrder)
      : getFallbackMediaItems(events);
  } catch (error) {
    warnSupabaseFallback("fetchMediaItems", error);
    return getFallbackMediaItems(events);
  }
}

export async function fetchMediaItemsForAdmin() {
  const result = await fetchMediaItemsAdminState();
  return result.items;
}

export async function fetchMediaItemsAdminState() {
  if (!hasSupabaseConfig()) {
    return {
      items: getFallbackMediaItems(),
      source: "fallback",
      setupMessage:
        "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to save media online.",
    };
  }

  try {
    const { data, error } = await supabase
      .from("media_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      warnSupabaseFallback("fetchMediaItemsForAdmin", error);
      return {
        items: getFallbackMediaItems(),
        source: "fallback",
        setupMessage:
          "Media could not be loaded from Supabase. Check that the media_items table exists and your admin permissions are configured.",
      };
    }

    if (data?.length) {
      return {
        items: data.map(normalizeMediaItem),
        source: "supabase",
        setupMessage: "",
      };
    }

    return {
      items: getFallbackMediaItems(),
      source: "fallback",
      setupMessage: "",
    };
  } catch (error) {
    warnSupabaseFallback("fetchMediaItemsForAdmin", error);
    return {
      items: getFallbackMediaItems(),
      source: "fallback",
      setupMessage:
        "Media could not be loaded from Supabase. Check that the media_items table exists and your admin permissions are configured.",
    };
  }
}

export function mediaItemToDbRow(item) {
  const contentAm = item.content_am;
  const row = {
    title: item.title || "",
    caption: item.caption || null,
    type: item.type || MEDIA_TYPES.IMAGE,
    url: item.url || null,
    image_url: sanitizeStoredImageUrl(item.imageUrl) || null,
    alt_text: item.altText || null,
    related_event_id: cleanUuid(item.relatedEventId),
    category: item.category || "",
    featured: item.featured === true,
    visible: item.visible !== false,
    display_order: item.displayOrder ?? 999,
  };

  if (contentAm) {
    row.content_am = {
      title: contentAm.title || "",
      caption: contentAm.caption || "",
      alt_text: contentAm.alt_text || contentAm.altText || "",
      category: contentAm.category || "",
      button_label: contentAm.button_label || contentAm.buttonLabel || "",
    };
  }

  return row;
}

export async function saveMediaItem(item) {
  const row = mediaItemToDbRow(item);

  if (isValidUuid(item.id)) {
    const { data, error } = await supabase
      .from("media_items")
      .update(row)
      .eq("id", item.id)
      .select()
      .single();
    if (error) throw error;
    return normalizeMediaItem(data);
  }

  const { data, error } = await supabase.from("media_items").insert(row).select().single();
  if (error) throw error;
  return normalizeMediaItem(data);
}

export async function deleteMediaItem(id) {
  if (!isValidUuid(id)) {
    console.warn("Skipping Supabase delete because media id is not a valid UUID:", id);
    return;
  }

  const { error } = await supabase.from("media_items").delete().eq("id", id);
  if (error) throw error;
}

export function filterMediaByTypes(items = [], types = []) {
  return items.filter((item) => types.includes(item.type));
}

export function isPhotoFlyerMediaItem(item) {
  if (!item) return false;
  if ([MEDIA_TYPES.IMAGE, MEDIA_TYPES.GIF, MEDIA_TYPES.DOCUMENT].includes(item.type)) return true;
  const category = (item.category || "").toLowerCase();
  return category.includes("photo") || category.includes("flyer");
}

export function filterPhotoFlyerMediaItems(items = []) {
  return items.filter(isPhotoFlyerMediaItem);
}

export function filterCommunityLinkMediaItems(items = []) {
  return filterMediaByTypes(items, COMMUNITY_LINK_MEDIA_TYPES);
}

export function getFeaturedMediaItems(items = []) {
  return items.filter((item) => item.featured === true && item.visible !== false);
}

const DEFAULT_BUTTON_LABELS = {
  view: "View",
  watchVideo: "Watch Video",
  openLink: "Open Link",
  viewGallery: "View Gallery",
  eventbrite: "Open on Eventbrite",
  googleForm: "Open Form",
  partiful: "Open on Partiful",
  document: "View Document",
};

export function getMediaButtonLabel(type, language = "en", customLabel = "", labels = {}) {
  if (hasUsableText(customLabel)) return customLabel.trim();

  const resolved = { ...DEFAULT_BUTTON_LABELS, ...labels };

  switch (type) {
    case MEDIA_TYPES.EVENTBRITE:
      return resolved.eventbrite;
    case MEDIA_TYPES.GOOGLE_FORM:
      return resolved.googleForm;
    case MEDIA_TYPES.PARTIFUL:
      return resolved.partiful;
    case MEDIA_TYPES.DOCUMENT:
      return resolved.document;
    case MEDIA_TYPES.VIDEO_LINK:
    case MEDIA_TYPES.YOUTUBE:
      return resolved.watchVideo;
    default:
      return resolved.openLink;
  }
}
