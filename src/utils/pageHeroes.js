// Future step: add verified Amharic page hero content after ECAA approves translations.
import pageHeroesData from '../content/pageHeroes.json'
import { getHeroAsset } from '../config/assets'
import { hasUsableText, isTodoValue } from './data'

export function getPageHero(pageKey) {
  if (!pageKey) return null
  return pageHeroesData.pages?.[pageKey] ?? null
}

export function getPublicHeroText(value, fallback = '') {
  return hasUsableText(value) && !isTodoValue(value) ? value.trim() : fallback
}

export function isHeroSectionVisible(hero) {
  return hero?.visible !== false
}

export function getHeroButtons(buttons = []) {
  return buttons.filter(
    (button) =>
      hasUsableText(button?.label) &&
      hasUsableText(button?.href) &&
      !isTodoValue(button.href),
  )
}

export function getHeroStats(stats = []) {
  if (stats?.visible === false) return []
  const items = Array.isArray(stats) ? stats : stats?.items ?? []
  return items.filter(
    (stat) =>
      hasUsableText(stat?.value) &&
      hasUsableText(stat?.label) &&
      !isTodoValue(stat.value) &&
      !isTodoValue(stat.label),
  )
}

export function getHeroBackground(hero, pageKey) {
  const assetPath = pageKey ? getHeroAsset(pageKey) : null
  const src = hasUsableText(hero?.backgroundImage) && !isTodoValue(hero.backgroundImage)
    ? hero.backgroundImage.trim()
    : assetPath

  if (!hasUsableText(src) || isTodoValue(src) || !src.startsWith('/')) return null
  return {
    src,
    alt: getPublicHeroText(hero?.backgroundAlt, 'ECAA community photo'),
  }
}

export function getHeroButtonProps(button) {
  const href = button.href.trim()
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return { href }
  }
  return { to: href }
}

export function getHeroSummaryBand(hero) {
  const band = hero?.summaryBand
  if (!band || band.visible === false) return null
  const text = getPublicHeroText(band.text)
  return text ? { text } : null
}
