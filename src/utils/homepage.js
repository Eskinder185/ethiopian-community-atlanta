import { hasUsableText, isTodoValue, toEmbedUrl } from './data'
import { featuredProgramAmharicBySlug } from '../data/homepageAmharic'

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

export function isHomeItemVisible(item) {
  if (!item) return false
  if (item.visible === false || item.published === false) return false
  return true
}

export function isFeaturedEventItem(item) {
  if (!isHomeItemVisible(item)) return false
  return isUsableHomeText(item?.title) && isUsableHomeText(item?.excerpt)
}

export function isFeaturedProgramItem(item) {
  if (!isHomeItemVisible(item)) return false
  return isUsableHomeText(item?.title) && isUsableHomeText(item?.shortDescription)
}

export function isFeaturedMediaItem(item) {
  if (!isHomeItemVisible(item)) return false
  if (!isUsableHomeText(item?.title)) return false
  const mediaType = item.type === 'gif' ? 'image' : item.type
  if (mediaType === 'video' || item.type === 'youtube') {
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

/** Visible caption for media preview — caption or title, never alt text. */
export function getMediaCaption(item) {
  return getPublicText(item?.caption) || getPublicText(item?.title)
}

export function mapMediaItemToHomePreview(item) {
  if (!item) return null
  const isVideo = item.type === 'youtube' || item.type === 'video' || item.type === 'video_link'

  return {
    id: item.id,
    type: isVideo ? 'video' : item.type === 'gif' ? 'image' : item.type || 'image',
    title: item.title || '',
    caption: item.caption || '',
    src: item.imageUrl || '',
    alt: item.altText || item.title || '',
    youtubeUrl: isVideo ? item.url : '',
    embedUrl: isVideo ? item.url : '',
    href: '/media',
  }
}

export function getHomepageFeaturedMedia(mediaItems = [], limit = 4) {
  return mediaItems
    .filter((item) => item.visible !== false && item.featured === true)
    .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
    .slice(0, limit)
    .map(mapMediaItemToHomePreview)
    .filter(Boolean)
}

export function mapEventToHomePreview(event) {
  if (!event) return null
  return {
    id: event.id,
    title: event.title,
    category: event.category || 'Event',
    date: event.eventDate || event.date || '',
    excerpt: event.excerpt || event.summary || event.description || '',
    image: event.imageUrl || event.image || '',
    imageAlt: event.imageAlt || event.title,
    href: event.registrationUrl || event.eventbriteLink || event.link || '/events',
    ctaLabel: event.ctaLabel || 'Learn more',
  }
}

export function getHomepageFeaturedEvents(events = [], limit = 3) {
  const visible = events.filter((event) => event.visible !== false && event.published !== false)
  const featured = visible.filter((event) => event.featured === true)
  const upcoming = visible.filter((event) => event.status === 'upcoming')
  const source = featured.length > 0 ? featured : upcoming

  return source
    .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
    .slice(0, limit)
    .map(mapEventToHomePreview)
    .filter((item) => isUsableHomeText(item.title))
}

const PREFERRED_FEATURED_PROGRAM_SLUGS = [
  'special-needs-children-family',
  'youth-education',
  'health-wellness',
  'legal-education',
]

export function mapProgramToHomeCard(program) {
  if (!program) return null
  return {
    id: program.id,
    slug: program.slug,
    initials: program.initials || program.title?.slice(0, 2).toUpperCase() || 'EC',
    category: program.category || 'Program',
    title: program.title,
    subtitle: program.subtitle || '',
    shortDescription: program.shortDescription || program.description || '',
    href: program.buttonLink || `/programs/${program.slug}`,
    image: '',
    imageAlt: program.title,
  }
}

export function getHomepageFeaturedPrograms(programs = [], limit = 4) {
  const featured = programs.filter((program) => program.featured === true && program.visible !== false)

  const sorted = [...featured].sort((a, b) => {
    const indexA = PREFERRED_FEATURED_PROGRAM_SLUGS.indexOf(a.slug)
    const indexB = PREFERRED_FEATURED_PROGRAM_SLUGS.indexOf(b.slug)
    if (indexA !== -1 && indexB !== -1) return indexA - indexB
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    return (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
  })

  return sorted.slice(0, limit).map(mapProgramToHomeCard).filter(Boolean)
}

export function applyFeaturedProgramLocale(program, language = 'en') {
  if (!program || language !== 'am') return program
  const localized = featuredProgramAmharicBySlug[program.slug]
  if (!localized) return program

  return {
    ...program,
    category: localized.category || program.category,
    title: localized.title || program.title,
    subtitle: localized.subtitle || program.subtitle,
    shortDescription: localized.shortDescription || program.shortDescription,
    buttonLabel: localized.buttonLabel,
  }
}

export function getFeaturedProgramButtonLabel(program, language = 'en') {
  if (language === 'am' && program?.buttonLabel) return program.buttonLabel
  return 'View Program Details'
}

export function filterPublicLines(lines = []) {
  return lines.filter((line) => isUsableHomeText(line))
}

/** Map homepage.json hero to PageHeroWithStats props. */
export function mapHomeHeroData(hero) {
  if (!hero) return null

  const buttons = []
  const addButton = (cta, style) => {
    const props = getLinkProps(cta)
    if (props && cta?.label) {
      buttons.push({ label: cta.label, href: cta.href || cta.path, style })
    }
  }

  addButton(hero.primaryCta, 'primary')
  addButton(hero.secondaryCta, 'secondary')
  addButton(hero.supportCta, 'ghost')

  return {
    eyebrow: hero.eyebrow,
    title: hero.title,
    description: hero.description,
    backgroundImage: hero.image,
    backgroundAlt: hero.imageAlt,
    trustCue: hero.trustCue,
    buttons,
    stats: [],
    variant: 'home',
    overlayStrength: 'welcoming',
  }
}
