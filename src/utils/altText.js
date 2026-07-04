import { hasUsableText } from "./data";

export function getEventImageAlt(event) {
  const explicit = event?.imageAlt || event?.image_alt;
  if (hasUsableText(explicit)) return explicit.trim();
  if (hasUsableText(event?.title)) {
    return `ECAA event poster for ${event.title.trim()}`;
  }
  return "ECAA event poster";
}

export function getEventDisplayAlt(event, { preferCover = false, language = "en" } = {}) {
  if (!event) return "ECAA event image";

  const isAm = language === "am";
  const contentAm = event.content_am || event.contentAm || {};
  const coverAlt = event.coverImageAlt || event.cover_image_alt || contentAm.cover_image_alt;
  const posterAlt = event.imageAlt || event.image_alt || contentAm.image_alt;

  if (preferCover) {
    if (hasUsableText(coverAlt)) return coverAlt.trim();
    if (hasUsableText(posterAlt)) return posterAlt.trim();
  } else {
    if (hasUsableText(posterAlt)) return posterAlt.trim();
    if (hasUsableText(coverAlt)) return coverAlt.trim();
  }

  if (hasUsableText(event.title)) {
    return preferCover
      ? `ECAA event cover for ${event.title.trim()}`
      : `ECAA event poster for ${event.title.trim()}`;
  }

  return preferCover ? "ECAA event cover image" : "ECAA event poster";
}

export function getMediaImageAlt(item) {
  const explicit = item?.altText || item?.alt_text || item?.alt;
  if (hasUsableText(explicit)) return explicit.trim();
  if (hasUsableText(item?.title)) return item.title.trim();
  return "ECAA community photo";
}

export function getLeadershipImageAlt(member) {
  const explicit = member?.imageAlt || member?.image_alt || member?.photo?.alt;
  if (hasUsableText(explicit)) return explicit.trim();

  const name = member?.name?.trim();
  const role = member?.role?.trim() || member?.title?.trim();

  if (name && role) return `Portrait of ${name}, ${role}`;
  if (name) return `Portrait of ${name}`;
  return "ECAA leadership member";
}

export const ALT_TEXT_HINT =
  "Describe what is in the image, not just “photo” or “image”. Example: ECAA community members at a cultural celebration in Atlanta.";
