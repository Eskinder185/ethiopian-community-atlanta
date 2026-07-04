/**
 * Static website design assets (logo, heroes, patterns, placeholders).
 * Community gallery media lives in Supabase / media_items — not here.
 */
import { defaultImagePaths } from "../utils/publicAsset";

export const siteAssets = {
  logo: defaultImagePaths.logo,
  logoAlt: "Ethiopian Community Association in Atlanta logo",

  bookHall: defaultImagePaths.eventHall,
  bookHallAlt: "ECAA event hall space for community gatherings and celebrations",

  homeHero: defaultImagePaths.homeHero,
  homeHeroAlt: "ECAA community gathering and welcome image for visitors.",

  heroes: {
    home: defaultImagePaths.homeHero,
    about: defaultImagePaths.patternDivider,
    programs: defaultImagePaths.programsHero,
    events: defaultImagePaths.eventsHero,
    membership: defaultImagePaths.membershipHero,
    leadership: defaultImagePaths.leadershipHero,
    media: defaultImagePaths.eventsHero,
    contact: defaultImagePaths.homeHero,
    eventHall: defaultImagePaths.eventHall,
  },

  patterns: {
    global: defaultImagePaths.patternDivider,
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
