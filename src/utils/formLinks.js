import { hasUsableText } from "./data";
import { fetchPublishedFormBySlug, getFormPublicPath } from "./forms";

/**
 * Resolve a form href: use internal /forms/:slug when published, else fallback URL.
 */
export async function resolveFormHref({ internalSlug, fallbackUrl }) {
  if (hasUsableText(internalSlug)) {
    const published = await fetchPublishedFormBySlug(internalSlug.trim());
    if (published) {
      return getFormPublicPath(internalSlug.trim());
    }
  }

  return hasUsableText(fallbackUrl) ? fallbackUrl.trim() : "";
}

/**
 * Synchronous helper when slug availability is already known.
 */
export function buildFormHref(slug, fallbackUrl) {
  if (hasUsableText(slug)) return getFormPublicPath(slug.trim());
  return hasUsableText(fallbackUrl) ? fallbackUrl.trim() : "";
}

export function isInternalFormPath(href) {
  return typeof href === "string" && /^\/forms\/[a-z0-9-]+$/i.test(href.trim());
}
