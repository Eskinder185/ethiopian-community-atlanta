export function getGoogleDriveFileId(url = "") {
  if (!url || typeof url !== "string") return "";

  const patterns = [
    /drive\.google\.com\/file\/d\/([^/]+)/,
    /drive\.google\.com\/open\?id=([^&]+)/,
    /drive\.google\.com\/uc\?id=([^&]+)/,
    /id=([^&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return "";
}

export function getDirectImageUrl(url = "") {
  if (!url || typeof url !== "string") return "";

  if (url.startsWith("blob:")) return "";
  if (url.startsWith("C:\\")) return "";
  if (url.startsWith("file:")) return "";

  const driveFileId = getGoogleDriveFileId(url);

  if (driveFileId) {
    return `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1200`;
  }

  return url;
}

export function getYouTubeId(url = "") {
  if (!url || typeof url !== "string") return "";

  const trimmed = url.trim();
  if (!trimmed) return "";

  // Reject bare YouTube homepage URLs
  if (/^https?:\/\/(www\.)?youtube\.com\/?$/i.test(trimmed)) return "";
  if (/^https?:\/\/(www\.)?youtu\.be\/?$/i.test(trimmed)) return "";

  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }

  return "";
}

export function getYouTubeEmbedUrl(url = "") {
  const videoId = getYouTubeId(url);
  if (!videoId) return "";
  return `https://www.youtube.com/embed/${videoId}`;
}

export function isExternalUrl(url = "") {
  return /^https?:\/\//i.test(url);
}
