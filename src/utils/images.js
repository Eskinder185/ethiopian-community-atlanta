import imagesData from "../content/images.json";
import { getPatternAsset, siteAssets } from "../config/assets";
import { resolvePublicImageUrl } from "../lib/uploadMedia";
import { hasUsableText } from "./data";

const IMAGE_ID_TO_ASSET = {
  "home-hero-community-atlanta": siteAssets.heroes.home,
  "membership-welcome": siteAssets.heroes.membership,
  "programs-community-support": siteAssets.heroes.programs,
  "events-community-gathering": siteAssets.heroes.events,
  "leadership-community-guidance": siteAssets.heroes.leadership,
  "global-ethiopian-pattern-divider": siteAssets.patterns.global,
};

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

/** Resolve an image record or path string for use in img/background src. */
export function getResolvedImageSrc(imageOrPath) {
  if (!imageOrPath) return "";
  const path = typeof imageOrPath === "string" ? imageOrPath : imageOrPath.src;
  if (!hasUsableText(path) || path.startsWith("TODO")) return "";

  const publicUrl = resolvePublicImageUrl(path);
  if (publicUrl) return publicUrl;

  if (path.startsWith("blob:") || path.startsWith("file:") || /^[A-Za-z]:\\/.test(path)) return "";
  if (path.startsWith("/uploads/")) return "";
  if (
    path.startsWith("http") ||
    path.startsWith("//") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL || "/";
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${normalized}`;
}
