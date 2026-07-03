import { mediaAmharicFallbackById } from '../data/mediaAmharicFallback'
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

export function normalizeMediaContentAm(raw) {
  const source = parseContentAm(raw)
  if (!source) return null

  return {
    title: source.title,
    caption: source.caption,
    altText: source.alt_text ?? source.altText,
    category: source.category,
    buttonLabel: source.button_label ?? source.buttonLabel,
  }
}

export function getMediaContentAmSource(item) {
  if (!item) return null
  const stored = normalizeMediaContentAm(item.content_am ?? item.contentAm)
  const fallback = mediaAmharicFallbackById[item.id] || null
  if (!stored && !fallback) return null
  return { ...fallback, ...stored }
}

export function applyMediaItemLocale(item, language = 'en') {
  if (!item || language !== 'am') return item

  const overlay = getMediaContentAmSource(item)
  if (!overlay) return item

  return {
    ...item,
    title: hasUsableText(overlay.title) ? overlay.title.trim() : item.title,
    caption: hasUsableText(overlay.caption) ? overlay.caption.trim() : item.caption,
    altText: hasUsableText(overlay.altText)
      ? overlay.altText.trim()
      : hasUsableText(overlay.alt_text)
        ? overlay.alt_text.trim()
        : item.altText,
    category: hasUsableText(overlay.category) ? overlay.category.trim() : item.category,
    buttonLabel: hasUsableText(overlay.buttonLabel)
      ? overlay.buttonLabel.trim()
      : hasUsableText(overlay.button_label)
        ? overlay.button_label.trim()
        : item.buttonLabel,
  }
}

export function applyMediaItemsLocale(items = [], language = 'en') {
  return items.map((item) => applyMediaItemLocale(item, language))
}

export function buildMediaContentAmFromDraft(draft = {}) {
  const source = draft.content_am || {}
  return {
    title: source.title || '',
    caption: source.caption || '',
    alt_text: source.alt_text || source.altText || '',
    category: source.category || '',
    button_label: source.button_label || source.buttonLabel || '',
  }
}

export function mediaItemToDraft(item) {
  const fallback = mediaAmharicFallbackById[item.id] || {}
  const stored = normalizeMediaContentAm(item.content_am ?? item.contentAm) || {}

  return {
    ...item,
    content_am: {
      title: stored.title || fallback.title || '',
      caption: stored.caption || fallback.caption || '',
      alt_text: stored.altText || fallback.alt_text || '',
      category: stored.category || fallback.category || '',
      button_label: stored.buttonLabel || fallback.button_label || '',
    },
  }
}
