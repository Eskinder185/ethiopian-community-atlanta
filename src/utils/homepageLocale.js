import { HOMEPAGE_SECTION_KEYS } from "../data/homepage";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function mergeLocalizedContent(base, overlay) {
  if (!overlay || !isPlainObject(overlay)) return base;
  if (!base || !isPlainObject(base)) return overlay;

  const result = { ...base };

  for (const [key, value] of Object.entries(overlay)) {
    if (value === null || value === undefined || value === "") continue;
    if (typeof value === "string" && value.trim() === "") continue;

    if (Array.isArray(value)) {
      if (!Array.isArray(base[key])) {
        result[key] = value;
        continue;
      }
      result[key] = base[key].map((item, index) => {
        const overlayItem = value[index];
        if (overlayItem === null || overlayItem === undefined || overlayItem === "") return item;
        if (typeof overlayItem === "string") return overlayItem;
        if (isPlainObject(item) && isPlainObject(overlayItem)) {
          return mergeLocalizedContent(item, overlayItem);
        }
        return overlayItem;
      });
      continue;
    }

    if (isPlainObject(value) && isPlainObject(base[key])) {
      result[key] = mergeLocalizedContent(base[key], value);
      continue;
    }

    result[key] = value;
  }

  return result;
}

export function mergeHomepageForLanguage(englishHomepage, amharicOverlay = {}) {
  const merged = { ...englishHomepage };

  for (const key of HOMEPAGE_SECTION_KEYS) {
    if (amharicOverlay[key]) {
      merged[key] = mergeLocalizedContent(englishHomepage[key], amharicOverlay[key]);
    }
  }

  if (amharicOverlay.seo) {
    merged.seo = mergeLocalizedContent(englishHomepage.seo, amharicOverlay.seo);
  }

  return merged;
}

export function stripEmptyOverlay(overlay = {}) {
  if (!isPlainObject(overlay)) return {};

  const result = {};
  for (const [key, value] of Object.entries(overlay)) {
    if (value === null || value === undefined || value === "") continue;
    if (typeof value === "string" && value.trim() === "") continue;
    if (Array.isArray(value)) {
      const cleaned = value
        .map((item) => (isPlainObject(item) ? stripEmptyOverlay(item) : item))
        .filter((item) => item !== null && item !== undefined && item !== "");
      if (cleaned.length > 0) result[key] = cleaned;
      continue;
    }
    if (isPlainObject(value)) {
      const cleaned = stripEmptyOverlay(value);
      if (Object.keys(cleaned).length > 0) result[key] = cleaned;
      continue;
    }
    result[key] = value;
  }
  return result;
}
