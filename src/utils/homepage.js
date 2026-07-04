import { hasUsableText, isTodoValue, toEmbedUrl } from "./data";
import { featuredProgramAmharicBySlug } from "../data/homepageAmharic";
import { EVENT_STATUS } from "./events";
import { isHomepageMediaCandidate } from "./mediaItems";
import { getResolvedImageSrc, resolveHeroImagePath } from "./images";
import { defaultImagePaths } from "./publicAsset";

export function isSectionVisible(section) {
  return section?.visible !== false;
}

export function getLinkProps(link) {
  if (!link) return null;
  const href = link.href || link.path || link.to;
  if (!hasUsableText(href) || isTodoValue(href)) return null;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return { href };
  }
  return { to: href };
}

export function isUsableHomeText(value) {
  return hasUsableText(value) && !isTodoValue(value);
}

/** Never show TODO or editor-only strings on the public site. */
export function getPublicText(value, fallback = "") {
  return isUsableHomeText(value) ? value.trim() : fallback;
}

export function getVisibleItems(items = [], validator, limit) {
  const filtered = items.filter(validator);
  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

export function isHomeItemVisible(item) {
  if (!item) return false;
  if (item.visible === false || item.published === false) return false;
  return true;
}

export function isFeaturedEventItem(item) {
  if (!isHomeItemVisible(item)) return false;
  return isUsableHomeText(item?.title) && isUsableHomeText(item?.excerpt);
}

export function isFeaturedProgramItem(item) {
  if (!isHomeItemVisible(item)) return false;
  return isUsableHomeText(item?.title) && isUsableHomeText(item?.shortDescription);
}

export function isFeaturedMediaItem(item) {
  if (!isHomeItemVisible(item)) return false;
  if (!isUsableHomeText(item?.title)) return false;
  const mediaType = item.type === "gif" ? "image" : item.type;
  if (mediaType === "video" || item.type === "youtube") {
    return Boolean(toEmbedUrl(item.embedUrl) || toEmbedUrl(item.youtubeUrl));
  }
  return isUsableHomeText(item?.imageUrl || item?.src) && !isTodoValue(item.imageUrl || item.src);
}

/** Alt text for images — never expose TODO strings publicly. */
export function getMediaAlt(item) {
  const alt = getPublicText(item?.alt);
  if (alt) return alt;
  const title = getPublicText(item?.title);
  if (title) return title;
  return "ECAA community photo";
}

/** Visible caption for media preview — caption or title, never alt text. */
export function getMediaCaption(item) {
  return getPublicText(item?.caption) || getPublicText(item?.title);
}

export function mapMediaItemToHomePreview(item) {
  if (!item) return null;

  const imageUrl = item.imageUrl || item.src || "";
  if (!hasUsableText(imageUrl) || isTodoValue(imageUrl) || imageUrl.startsWith("blob:")) {
    return null;
  }

  return {
    id: item.id,
    type: item.type === "gif" ? "image" : item.type || "image",
    title: item.title || "",
    caption: item.caption || "",
    src: imageUrl,
    alt: item.altText || item.title || "",
    href: "/media",
  };
}

export function getHomepageFeaturedMedia(mediaItems = [], limit = 6) {
  return [...mediaItems]
    .filter(isHomepageMediaCandidate)
    .sort((a, b) => {
      const orderDiff = (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
      if (orderDiff !== 0) return orderDiff;
      const createdA = a.createdAt ? Date.parse(a.createdAt) : 0;
      const createdB = b.createdAt ? Date.parse(b.createdAt) : 0;
      return createdB - createdA;
    })
    .slice(0, limit)
    .map(mapMediaItemToHomePreview)
    .filter(Boolean);
}

export function mapEventToHomePreview(event, language = "en") {
  if (!event) return null;

  let href = "/events";
  let external = false;
  let isEventbrite = false;

  if (isUsableHomeText(event.eventbriteLink)) {
    href = event.eventbriteLink.trim();
    external = true;
    isEventbrite = true;
  } else if (isUsableHomeText(event.googleFormLink)) {
    href = event.googleFormLink.trim();
    external = true;
  } else if (isUsableHomeText(event.partifulLink)) {
    href = event.partifulLink.trim();
    external = true;
  } else if (isUsableHomeText(event.link)) {
    href = event.link.trim();
    external = href.startsWith("http");
  } else if (isUsableHomeText(event.registrationUrl)) {
    href = event.registrationUrl.trim();
    external = href.startsWith("http");
  }

  const defaultCta =
    language === "am"
      ? isEventbrite
        ? "ይመዝገቡ / ዝግጅቱን ይመልከቱ"
        : "ተጨማሪ ያንብቡ"
      : isEventbrite
        ? "Register / View Event"
        : "Learn more";

  const rawImageUrl =
    event.coverImageUrl ||
    event.cover_image_url ||
    event.imageUrl ||
    event.image ||
    "";

  return {
    id: event.id,
    title: event.title,
    category: event.category || "Event",
    date: event.eventDate || event.date || "",
    eventTime: event.eventTime || "",
    location: event.location || "",
    excerpt: event.excerpt || event.shortDescription || event.summary || event.description || "",
    image: rawImageUrl,
    coverImageAlt: event.coverImageAlt || event.cover_image_alt || "",
    imageAlt: event.imageAlt || event.image_alt || event.title,
    href,
    external,
    isEventbrite,
    ctaLabel: event.ctaLabel || defaultCta,
  };
}

function parseHomeEventDate(value) {
  if (!isUsableHomeText(value)) return null;
  const trimmed = value.trim();
  if (/^\d{4}$/.test(trimmed)) return Date.parse(`${trimmed}-12-31`);
  const parsed = Date.parse(trimmed);
  return Number.isNaN(parsed) ? null : parsed;
}

export function getHomepageFeaturedEvents(events = [], limit = 3, language = "en") {
  const eligible = events.filter(
    (event) =>
      event.visible !== false &&
      event.published !== false &&
      (event.status === EVENT_STATUS.UPCOMING || event.featured === true)
  );

  return eligible
    .sort((a, b) => {
      const dateA = parseHomeEventDate(a.eventDate || a.date);
      const dateB = parseHomeEventDate(b.eventDate || b.date);
      if (dateA && dateB && dateA !== dateB) return dateA - dateB;
      if (dateA) return -1;
      if (dateB) return 1;
      return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
    })
    .slice(0, limit)
    .map((event) => mapEventToHomePreview(event, language))
    .filter((item) => isUsableHomeText(item.title));
}

const PREFERRED_FEATURED_PROGRAM_SLUGS = [
  "special-needs-children-family",
  "youth-education",
  "health-wellness",
  "legal-education",
];

export function mapProgramToHomeCard(program) {
  if (!program) return null;
  return {
    id: program.id,
    slug: program.slug,
    initials: program.initials || program.title?.slice(0, 2).toUpperCase() || "EC",
    category: program.category || "Program",
    title: program.title,
    subtitle: program.subtitle || "",
    shortDescription: program.shortDescription || program.description || "",
    href: program.buttonLink || `/programs/${program.slug}`,
    image: "",
    imageAlt: program.title,
  };
}

export function getHomepageFeaturedPrograms(programs = [], limit = 4) {
  const featured = programs.filter(
    (program) => program.featured === true && program.visible !== false
  );

  const sorted = [...featured].sort((a, b) => {
    const indexA = PREFERRED_FEATURED_PROGRAM_SLUGS.indexOf(a.slug);
    const indexB = PREFERRED_FEATURED_PROGRAM_SLUGS.indexOf(b.slug);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
  });

  return sorted.slice(0, limit).map(mapProgramToHomeCard).filter(Boolean);
}

export function applyFeaturedProgramLocale(program, language = "en") {
  if (!program || language !== "am") return program;
  const localized = featuredProgramAmharicBySlug[program.slug];
  if (!localized) return program;

  return {
    ...program,
    category: localized.category || program.category,
    title: localized.title || program.title,
    subtitle: localized.subtitle || program.subtitle,
    shortDescription: localized.shortDescription || program.shortDescription,
    buttonLabel: localized.buttonLabel,
  };
}

export function getFeaturedProgramButtonLabel(program, language = "en") {
  if (language === "am" && program?.buttonLabel) return program.buttonLabel;
  return "View Program Details";
}

export function filterPublicLines(lines = []) {
  return lines.filter((line) => isUsableHomeText(line));
}

/** Map homepage.json hero to PageHeroWithStats props. */
export function mapHomeHeroData(hero) {
  if (!hero) return null;

  const buttons = [];
  const addButton = (cta, style) => {
    const props = getLinkProps(cta);
    if (props && cta?.label) {
      buttons.push({ label: cta.label, href: cta.href || cta.path, style });
    }
  };

  addButton(hero.primaryCta, "primary");
  addButton(hero.secondaryCta, "secondary");
  addButton(hero.supportCta, "ghost");
  addButton(hero.donateCta, "ghost");

  return {
    eyebrow: hero.eyebrow,
    title: hero.title,
    description: hero.description,
    backgroundImage: getResolvedImageSrc(
      resolveHeroImagePath(hero.image, defaultImagePaths.homeHero)
    ),
    backgroundAlt: hero.imageAlt,
    trustCue: hero.trustCue,
    buttons,
    stats: [],
    variant: "home",
    overlayStrength: "welcoming",
  };
}
