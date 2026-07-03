import { eventsAmharicFallbackById } from '../data/eventsAmharicFallback'
import { hasUsableText } from './data'

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function parseContentAm(raw) {
  if (!raw) return null
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      return isPlainObject(parsed) ? parsed : null
    } catch {
      return null
    }
  }
  return isPlainObject(raw) ? raw : null
}

export function normalizeEventContentAm(raw) {
  const source = parseContentAm(raw)
  if (!source) return null

  return {
    title: source.title,
    excerpt: source.excerpt,
    description: source.description,
    location: source.location,
    category: source.category,
    ctaLabel: source.cta_label ?? source.ctaLabel,
  }
}

export function getEventContentAmSource(item) {
  if (!item) return null
  const key = item.slug || item.id
  const stored = normalizeEventContentAm(item.content_am ?? item.contentAm)
  const fallback = eventsAmharicFallbackById[key] || null
  if (!stored && !fallback) return null
  return { ...fallback, ...stored }
}

export function applyEventItemLocale(item, language = 'en') {
  if (!item || language !== 'am') return item

  const overlay = getEventContentAmSource(item)
  if (!overlay) return item

  return {
    ...item,
    title: hasUsableText(overlay.title) ? overlay.title.trim() : item.title,
    excerpt: hasUsableText(overlay.excerpt)
      ? overlay.excerpt.trim()
      : hasUsableText(overlay.summary)
        ? overlay.summary.trim()
        : item.excerpt,
    summary: hasUsableText(overlay.excerpt)
      ? overlay.excerpt.trim()
      : hasUsableText(overlay.summary)
        ? overlay.summary.trim()
        : item.summary,
    description: hasUsableText(overlay.description) ? overlay.description.trim() : item.description,
    location: hasUsableText(overlay.location) ? overlay.location.trim() : item.location,
    category: hasUsableText(overlay.category) ? overlay.category.trim() : item.category,
    ctaLabel: hasUsableText(overlay.ctaLabel)
      ? overlay.ctaLabel.trim()
      : hasUsableText(overlay.cta_label)
        ? overlay.cta_label.trim()
        : item.ctaLabel,
  }
}

export function applyEventItemsLocale(items = [], language = 'en') {
  return items.map((item) => applyEventItemLocale(item, language))
}

export function applyEventGroupsLocale(groups = {}, language = 'en') {
  if (language !== 'am') return groups

  return {
    upcoming: applyEventItemsLocale(groups.upcoming, language),
    announcements: applyEventItemsLocale(groups.announcements, language),
    communityNews: applyEventItemsLocale(groups.communityNews, language),
    past: applyEventItemsLocale(groups.past, language),
  }
}
