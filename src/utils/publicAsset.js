/**
 * Resolve public-folder asset paths for Vite dev and GitHub Pages (BASE_URL).
 * Paths are relative to public/ — do not include "public/" in the path.
 */
export function publicAsset(path = "") {
  const base = import.meta.env.BASE_URL || "/";
  const trimmed = String(path).trim();

  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  if (trimmed.startsWith(base)) return trimmed;

  const normalized = trimmed.replace(/^\/+/, "");
  return `${base}${normalized}`;
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

export const pageHeroFallbackPaths = {
  home: defaultImagePaths.homeHero,
  events: defaultImagePaths.eventsHero,
  programs: defaultImagePaths.programsHero,
  membership: defaultImagePaths.membershipHero,
  leadership: defaultImagePaths.leadershipHero,
  media: defaultImagePaths.eventsHero,
  contact: defaultImagePaths.homeHero,
  support: defaultImagePaths.homeHero,
  volunteer: defaultImagePaths.homeHero,
  about: defaultImagePaths.patternDivider,
  documents: defaultImagePaths.patternDivider,
};
