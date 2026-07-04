import { resolvePublicImageUrl } from "../lib/uploadMedia";

/**
 * Resolve public-folder asset paths for Vite dev and GitHub Pages (BASE_URL).
 * Paths are relative to public/ — do not include "public/" in the path.
 */
export function publicAsset(path = "") {
  const normalized = String(path).replace(/^\/+/, "");
  if (!normalized) return import.meta.env.BASE_URL || "/";
  return `${import.meta.env.BASE_URL}${normalized}`;
}

export function hasUsableImageUrl(value) {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    !value.startsWith("blob:") &&
    !value.startsWith("file:") &&
    !value.startsWith("C:\\") &&
    !value.trim().startsWith("TODO")
  );
}

export const defaultImages = {
  logo: publicAsset("images/brand/ECAA_logo.jpg"),
  homeHero: publicAsset("images/heroes/home-hero.jpg"),
  eventsHero: publicAsset("images/heroes/events-hero.jpg"),
  eventHall: publicAsset("images/heroes/event-hall.jpg"),
  leadershipHero: publicAsset("images/heroes/leadership-hero.jpg"),
  membershipHero: publicAsset("images/heroes/membership-hero.jpg"),
  programsHero: publicAsset("images/heroes/programs-hero.jpg"),
  patternDivider: publicAsset("images/patterns/global-ethiopian-pattern-divider.jpg"),
};

/** Raw public-relative paths (for CMS JSON / admin fields). */
export const defaultImagePaths = {
  logo: "images/brand/ECAA_logo.jpg",
  homeHero: "images/heroes/home-hero.jpg",
  eventsHero: "images/heroes/events-hero.jpg",
  eventHall: "images/heroes/event-hall.jpg",
  leadershipHero: "images/heroes/leadership-hero.jpg",
  membershipHero: "images/heroes/membership-hero.jpg",
  programsHero: "images/heroes/programs-hero.jpg",
  patternDivider: "images/patterns/global-ethiopian-pattern-divider.jpg",
};

export const pageHeroDefaults = {
  home: defaultImages.homeHero,
  events: defaultImages.eventsHero,
  programs: defaultImages.programsHero,
  membership: defaultImages.membershipHero,
  leadership: defaultImages.leadershipHero,
  media: defaultImages.eventsHero,
  contact: defaultImages.homeHero,
  support: defaultImages.homeHero,
  volunteer: defaultImages.homeHero,
  about: defaultImages.patternDivider,
  documents: defaultImages.patternDivider,
};

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

/**
 * CMS/Supabase image first when truly usable, otherwise local defaultImages fallback.
 * Returns a URL ready for img src or CSS backgroundImage.
 */
export function resolveHeroImage(cmsValue, fallbackImage) {
  let heroImage = fallbackImage;

  if (hasUsableImageUrl(cmsValue)) {
    const trimmed = cmsValue.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      heroImage = trimmed;
    } else if (isStorageOnlyPath(trimmed)) {
      const storageUrl = resolvePublicImageUrl(trimmed);
      if (
        storageUrl &&
        (storageUrl.startsWith("http://") || storageUrl.startsWith("https://"))
      ) {
        heroImage = storageUrl;
      }
    } else {
      heroImage = publicAsset(trimmed);
    }
  }

  if (import.meta.env.DEV) {
    console.log("Hero image being used:", heroImage);
  }

  return heroImage;
}
