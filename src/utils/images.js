import imagesData from "../content/images.json";
import { getPatternAsset, siteAssets } from "../config/assets";
import { resolvePublicImageUrl } from "../lib/uploadMedia";
import { hasUsableText } from "./data";
import {
  defaultImagePaths,
  hasUsableImageUrl,
  pageHeroDefaults,
  publicAsset,
  resolveHeroImage,
} from "./publicAsset";

export { resolveHeroImage, hasUsableImageUrl, publicAsset, defaultImages, pageHeroDefaults } from "./publicAsset";

const IMAGE_ID_TO_ASSET = {
  "home-hero-community-atlanta": siteAssets.heroes.home,
  "membership-welcome": siteAssets.heroes.membership,
  "programs-community-support": siteAssets.heroes.programs,
  "events-community-gathering": siteAssets.heroes.events,
  "leadership-community-guidance": siteAssets.heroes.leadership,
  "global-ethiopian-pattern-divider": siteAssets.patterns.global,
};

function isExternalUrl(path) {
  return (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("//") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  );
}

function isInvalidLocalPath(path) {
  return (
    path.startsWith("blob:") ||
    path.startsWith("file:") ||
    /^[A-Za-z]:\\/.test(path) ||
    path.startsWith("/uploads/")
  );
}

function isStorageOnlyPath(path) {
  const value = path.replace(/^\/+/, "");
  return (
    value.startsWith("media-gallery/") ||
    value.startsWith("events/") ||
    value.startsWith("leadership/") ||
    value.startsWith("programs/") ||
    value.startsWith("website/")
  );
}

export function getImageById(id) {
  if (!id) return null;
  const image = imagesData.images.find((item) => item.id === id) ?? null;
  if (!image) return null;

  const assetPath = IMAGE_ID_TO_ASSET[id];
  return assetPath ? { ...image, src: assetPath } : image;
}

export function hasImageAsset(image) {
  return Boolean(image?.src && hasUsableText(image.src) && !image.src.startsWith("TODO"));
}

export function getPatternImage() {
  const pattern = getImageById("global-ethiopian-pattern-divider");
  if (pattern) return pattern;

  const src = getPatternAsset();
  return src
    ? { id: "global-ethiopian-pattern-divider", src, alt: "Ethiopian-inspired decorative pattern." }
    : null;
}

/** Resolve a public-folder path for the current Vite base URL (e.g. GitHub Pages). */
export function resolvePublicAssetPath(path) {
  return getResolvedImageSrc(path);
}

/**
 * Resolve an image record or path string for use in img/background src.
 * Priority: external/CMS URL → Supabase storage URL → local public asset via BASE_URL.
 */
export function getResolvedImageSrc(imageOrPath) {
  if (!imageOrPath) return "";

  const path = typeof imageOrPath === "string" ? imageOrPath : imageOrPath.src;
  if (!hasUsableImageUrl(path) && !hasUsableText(path)) return "";
  if (path.startsWith("TODO")) return "";

  const trimmed = path.trim();

  if (isExternalUrl(trimmed)) return trimmed;
  if (isInvalidLocalPath(trimmed)) return "";

  const base = import.meta.env.BASE_URL || "/";
  if (trimmed.startsWith(base)) return trimmed;

  if (isStorageOnlyPath(trimmed)) {
    const storageUrl = resolvePublicImageUrl(trimmed);
    if (storageUrl && isExternalUrl(storageUrl)) return storageUrl;
    return "";
  }

  return publicAsset(trimmed);
}

/** Pick CMS image when valid, otherwise a local default public path. */
export function resolveHeroImagePath(cmsPath, fallbackPath = defaultImagePaths.homeHero) {
  if (hasUsableImageUrl(cmsPath)) {
    return cmsPath.trim();
  }
  return fallbackPath;
}

/** Resolve logo or hall image with CMS override support. */
export function resolveLocalImage(cmsValue, fallbackImage) {
  return resolveHeroImage(cmsValue, fallbackImage);
}
