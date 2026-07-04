// Future step: add verified Amharic page hero content after ECAA approves translations.
import pageHeroesData from "../content/pageHeroes.json";
import { pageHeroFallbackPaths } from "./publicAsset";
import { getResolvedImageSrc } from "./images";
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

/**
 * Hero background: CMS/Supabase URL first, then local public fallback.
 * Returns { src, alt } where src is ready for img/background use.
 */
export function getHeroBackground(hero, pageKey) {
  const cmsSrc =
    hasUsableText(hero?.backgroundImage) && !isTodoValue(hero.backgroundImage)
      ? hero.backgroundImage.trim()
      : hasUsableText(hero?.image) && !isTodoValue(hero.image)
        ? hero.image.trim()
        : "";

  const fallbackPath = pageKey ? pageHeroFallbackPaths[pageKey] || "" : "";
  const rawSrc = cmsSrc || fallbackPath;

  if (!hasUsableText(rawSrc) || isTodoValue(rawSrc)) return null;

  const resolvedSrc = getResolvedImageSrc(rawSrc);
  if (!resolvedSrc) return null;

  return {
    src: resolvedSrc,
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
