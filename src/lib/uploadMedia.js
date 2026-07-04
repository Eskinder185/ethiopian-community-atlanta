import { uploadToSupabaseStorage } from "../utils/uploadToSupabaseStorage";
import { hasUsableText } from "../utils/data";

const STORAGE_BUCKET = "ecaa-media";

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

function sanitizeFolder(uploadFolder = "") {
  return uploadFolder.replace(/^\/+/, "").replace(/\/+$/, "");
}

export function isInvalidStoredImageUrl(url) {
  if (!hasUsableText(url)) return false;
  const value = url.trim();
  return (
    value.startsWith("blob:") ||
    /^[A-Za-z]:\\/.test(value) ||
    value.startsWith("/uploads/") ||
    value.startsWith("file:") ||
    value.startsWith("/Users/")
  );
}

export function isBadPublishedImageUrl(value) {
  if (!value) return false;
  return (
    value.startsWith("blob:") ||
    value.startsWith("file:") ||
    value.startsWith("C:\\") ||
    value.startsWith("/Users/")
  );
}

function isStorageOnlyPath(url) {
  const value = url.trim().replace(/^\/+/, "");
  return (
    value.startsWith("media-gallery/") ||
    value.startsWith("events/") ||
    value.startsWith("leadership/") ||
    value.startsWith("programs/") ||
    value.startsWith("website/")
  );
}

/** Turn a storage path or URL into a usable public image src. */
export function resolvePublicImageUrl(url) {
  if (!hasUsableText(url) || isInvalidStoredImageUrl(url)) return "";

  const trimmed = url.trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (isStorageOnlyPath(trimmed)) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
    if (supabaseUrl) {
      const path = trimmed.replace(/^\/+/, "");
      return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
    }
    return "";
  }

  return trimmed;
}

export function sanitizeStoredImageUrl(url) {
  if (!hasUsableText(url) || isInvalidStoredImageUrl(url)) return null;
  const resolved = resolvePublicImageUrl(url.trim());
  return resolved || null;
}

/**
 * Upload a community media file to Supabase Storage.
 * Website design images belong in public/images/ — not here.
 */
export async function uploadMedia(file, options = {}) {
  const { uploadFolder = "media-gallery/photos" } = options;
  if (!file) return null;

  if (!hasSupabaseConfig()) {
    throw new Error(
      "Supabase is not configured. Image uploads require VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
    );
  }

  const folder = sanitizeFolder(uploadFolder);
  return uploadToSupabaseStorage(file, folder);
}

export { STORAGE_BUCKET };
