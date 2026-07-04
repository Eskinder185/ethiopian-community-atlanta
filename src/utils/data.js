function isPublished(item) {
  return item?.published !== false;
}

export function filterPublished(items = []) {
  return items.filter(isPublished);
}

export function isTodoValue(value) {
  if (typeof value !== "string") return false;
  return value.trim().startsWith("TODO");
}

export function hasUsableText(value) {
  return typeof value === "string" && value.trim() && !isTodoValue(value);
}

export function hasUsableUrl(value) {
  return typeof value === "string" && value.trim().startsWith("http");
}

/** Exclude sample rows that are published but still contain TODO placeholders. */
export function filterVerifiedContent(items = [], requiredFields = ["title"]) {
  return filterPublished(items).filter((item) =>
    requiredFields.every((field) => {
      const value = item[field];
      return typeof value === "string" && value.trim() && !isTodoValue(value);
    })
  );
}

export function filterVerifiedMembers(members = []) {
  return filterPublished(members).filter(
    (member) => hasUsableText(member.name) && !isTodoValue(member.title)
  );
}

/** Convert common YouTube URLs to embed-friendly format. */
export function toEmbedUrl(url) {
  if (!hasUsableUrl(url)) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "");

    if (host === "youtu.be") {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId = parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      if (parsed.pathname.startsWith("/embed/")) return url;
    }

    return url;
  } catch {
    return null;
  }
}

/** Extract YouTube video ID from common URL formats. */
export function getYoutubeVideoId(url) {
  if (!hasUsableUrl(url)) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "");

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const fromQuery = parsed.searchParams.get("v");
      if (fromQuery) return fromQuery;
      const embedMatch = parsed.pathname.match(/\/embed\/([^/?]+)/);
      if (embedMatch) return embedMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

/** Thumbnail URL for YouTube videos; returns null for non-YouTube URLs. */
export function getYoutubeThumbnail(url) {
  if (hasUsableText(url) && !hasUsableUrl(url)) return url;
  const videoId = getYoutubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}
