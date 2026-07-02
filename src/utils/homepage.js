import { hasUsableText, isTodoValue, toEmbedUrl } from './data'

export function isSectionVisible(section) {
  return section?.visible !== false
}

export function getLinkProps(link) {
  if (!link) return null
  const href = link.href || link.path || link.to
  if (!hasUsableText(href) || isTodoValue(href)) return null
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return { href }
  }
  return { to: href }
}

export function isUsableHomeText(value) {
  return hasUsableText(value) && !isTodoValue(value)
}

/** Never show TODO or editor-only strings on the public site. */
export function getPublicText(value, fallback = '') {
  return isUsableHomeText(value) ? value.trim() : fallback
}

export function getVisibleItems(items = [], validator, limit) {
  const filtered = items.filter(validator)
  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered
}

export function isFeaturedEventItem(item) {
  return isUsableHomeText(item?.title) && isUsableHomeText(item?.excerpt)
}

export function isFeaturedProgramItem(item) {
  return isUsableHomeText(item?.title) && isUsableHomeText(item?.shortDescription)
}

export function isFeaturedMediaItem(item) {
  if (!isUsableHomeText(item?.title)) return false
  if (item.type === 'video') {
    return Boolean(toEmbedUrl(item.embedUrl) || toEmbedUrl(item.youtubeUrl))
  }
  return isUsableHomeText(item?.src) && !isTodoValue(item.src)
}

/** Alt text for images — never expose TODO strings publicly. */
export function getMediaAlt(item) {
  const alt = getPublicText(item?.alt)
  if (alt) return alt
  const title = getPublicText(item?.title)
  if (title) return title
  return 'ECAA community photo'
}

/** Visible caption for media collage — title only, never raw alt text. */
export function getMediaCaption(item) {
  return getPublicText(item?.title)
}

export function filterPublicLines(lines = []) {
  return lines.filter((line) => isUsableHomeText(line))
}
