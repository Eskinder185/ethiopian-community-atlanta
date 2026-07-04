// Future step: add verified Amharic page hero content after ECAA approves translations.
import pageHeroesData from "../content/pageHeroes.json";
import { hasUsableImageUrl, pageHeroDefaults } from "./publicAsset";
import { resolveHeroImage } from "./images";
import { hasUsableText, isTodoValue } from "./data";

export function getPageHero(pageKey) {
  if (!pageKey) return null;
  return pageHeroesData.pages?.[pageKey] ?? null;
}

export function getPublicHeroText(value, fallback = "") {
  return hasUsableText(value) && !isTodoValue(value) ? value.trim() : fallback;
}

export function isHeroSectionVisible(hero) {
  return hero?.visible !== false;
}

export function getHeroButtons(buttons = []) {
  return buttons.filter(
    (button) =>
      hasUsableText(button?.label) && hasUsableText(button?.href) && !isTodoValue(button.href)
  );
}

export function getHeroStats(stats = []) {
  if (stats?.visible === false) return [];
  const items = Array.isArray(stats) ? stats : (stats?.items ?? []);
  return items.filter(
    (stat) =>
      hasUsableText(stat?.value) &&
      hasUsableText(stat?.label) &&
      !isTodoValue(stat.value) &&
      !isTodoValue(stat.label)
  );
}

function pickCmsHeroValue(hero) {
  if (!hero) return "";
  const candidates = [hero.image_url, hero.backgroundImage, hero.image];
  for (const value of candidates) {
    if (hasUsableImageUrl(value) && !isTodoValue(value)) {
      return value.trim();
    }
  }
  return "";
}

/**
 * Hero background: CMS/Supabase URL first when usable, then local defaultImages fallback.
 * Returns { src, alt } where src includes import.meta.env.BASE_URL for local assets.
 */
export function getHeroBackground(hero, pageKey) {
  const cmsValue = pickCmsHeroValue(hero);
  const fallback = pageKey ? pageHeroDefaults[pageKey] || pageHeroDefaults.home : pageHeroDefaults.home;
  const src = resolveHeroImage(cmsValue, fallback);

  if (!src) return null;

  return {
    src,
    alt: getPublicHeroText(hero?.backgroundAlt, "ECAA community photo"),
  };
}

export function getHeroButtonProps(button) {
  const href = button.href.trim();
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return { href };
  }
  return { to: href };
}

export function getHeroSummaryBand(hero) {
  const band = hero?.summaryBand;
  if (!band || band.visible === false) return null;
  const text = getPublicHeroText(band.text);
  return text ? { text } : null;
}
