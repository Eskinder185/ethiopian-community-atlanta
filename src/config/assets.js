/**
 * Static website design assets (logo, heroes, patterns, placeholders).
 * Community gallery media lives in Supabase / media_items — not here.
 */
export const siteAssets = {
  logo: "/images/brand/ECAA_logo.jpg",
  logoAlt: "Ethiopian Community Association in Atlanta logo",

  bookHall: "/images/heroes/event-hall.jpg",
  bookHallAlt: "ECAA event hall space for community gatherings and celebrations",

  homeHero: "/images/heroes/home-hero.jpg",
  homeHeroAlt: "ECAA community gathering and welcome image for visitors.",

  heroes: {
    home: "/images/heroes/home-hero.jpg",
    about: "/images/patterns/global-ethiopian-pattern-divider.jpg",
    programs: "/images/heroes/programs-hero.jpg",
    events: "/images/heroes/events-hero.jpg",
    membership: "/images/heroes/membership-hero.jpg",
    leadership: "/images/heroes/leadership-hero.jpg",
    media: "/images/heroes/events-hero.jpg",
    contact: "/images/heroes/home-hero.jpg",
    eventHall: "/images/heroes/event-hall.jpg",
  },

  patterns: {
    global: "/images/patterns/global-ethiopian-pattern-divider.jpg",
  },

  placeholders: {
    profile: "",
    media: "",
    program: "",
  },
};

export const uploadFolders = {
  mediaGalleryPhotos: "media-gallery/photos",
  mediaGalleryFlyers: "media-gallery/flyers",
  mediaGalleryDocuments: "media-gallery/documents",
  leadershipProfiles: "leadership/profile-photos",
  programMedia: "programs/program-media",
  eventImages: "events/event-images",
};

const LINK_MEDIA_TYPES = new Set([
  "youtube",
  "video_link",
  "eventbrite",
  "google_form",
  "partiful",
  "external_link",
]);

export function isLinkBasedMediaType(type) {
  return LINK_MEDIA_TYPES.has(type);
}

export function getMediaGalleryUploadFolder(mediaType, category = "") {
  if (isLinkBasedMediaType(mediaType)) return null;

  const normalizedCategory = String(category || "").toLowerCase();
  if (mediaType === "document") return uploadFolders.mediaGalleryDocuments;
  if (normalizedCategory.includes("flyer")) return uploadFolders.mediaGalleryFlyers;
  if (mediaType === "gif" || mediaType === "image") return uploadFolders.mediaGalleryPhotos;

  return uploadFolders.mediaGalleryPhotos;
}

export function getHeroAsset(pageKey) {
  return siteAssets.heroes[pageKey] || null;
}

export function getPatternAsset() {
  return siteAssets.patterns.global;
}
