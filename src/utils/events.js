import fallbackEvents from '../data/events.js'
import { supabase } from '../lib/supabaseClient'
import { filterVerifiedContent, hasUsableText } from './data'

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}

function warnSupabaseFallback(context, error) {
  console.warn(`Using fallback events because Supabase failed (${context})`, error)
}

function parseJsonField(value, fallback = []) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : fallback
    } catch {
      return fallback
    }
  }
  return fallback
}

function isEventItemVisible(item) {
  return item?.published !== false && item?.visible !== false
}

export const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  ANNOUNCEMENT: 'announcement',
  COMMUNITY_NEWS: 'community-news',
  PAST: 'past',
}

export function normalizeEvent(raw) {
  if (!raw) return null
  const slug = raw.slug || raw.id || ''
  const eventDate = raw.event_date || raw.eventDate || raw.date || ''

  return {
    id: raw.id || slug,
    slug,
    status: raw.status || EVENT_STATUS.UPCOMING,
    category: raw.category || '',
    title: raw.title || '',
    eventDate,
    eventTime: raw.event_time || raw.eventTime || '',
    location: raw.location || '',
    excerpt: raw.excerpt || raw.summary || '',
    description: raw.description || raw.body || '',
    imageUrl: raw.image_url || raw.imageUrl || raw.image?.src || '',
    imageAlt: raw.image_alt || raw.imageAlt || raw.image?.alt || '',
    eventbriteLink: raw.eventbrite_link || raw.eventbriteLink || '',
    googleFormLink: raw.google_form_link || raw.googleFormLink || '',
    partifulLink: raw.partiful_link || raw.partifulLink || '',
    youtubeLink: raw.youtube_link || raw.youtubeLink || '',
    link: raw.link || '',
    registrationUrl: raw.registration_url || raw.registrationUrl || '',
    recapUrl: raw.recap_url || raw.recapUrl || '',
    ctaLabel: raw.cta_label || raw.ctaLabel || 'Learn more',
    mediaItems: parseJsonField(raw.media_items ?? raw.mediaItems),
    resourceLinks: parseJsonField(raw.resource_links ?? raw.resourceLinks),
    registrationLinks: parseJsonField(raw.registration_links ?? raw.registrationLinks),
    featured: raw.featured !== false,
    visible: raw.visible !== false,
    published: raw.published !== false,
    displayOrder: raw.display_order ?? raw.displayOrder ?? 999,
    external: raw.external !== false,
    date: eventDate,
    summary: raw.excerpt || raw.summary || '',
  }
}

export function getFallbackEvents() {
  return fallbackEvents.map(normalizeEvent).filter(isEventItemVisible)
}

function parseEventDate(value) {
  if (!hasUsableText(value)) return null
  const trimmed = value.trim()
  if (/^\d{4}$/.test(trimmed)) {
    return new Date(`${trimmed}-12-31T23:59:59`)
  }
  const parsed = Date.parse(trimmed)
  return Number.isNaN(parsed) ? null : new Date(parsed)
}

export function sortUpcomingEvents(events = []) {
  return [...events].sort((a, b) => {
    const dateA = parseEventDate(a.eventDate || a.date)
    const dateB = parseEventDate(b.eventDate || b.date)
    if (dateA && dateB) return dateA - dateB
    if (dateA) return -1
    if (dateB) return 1
    return a.title.localeCompare(b.title)
  })
}

export function getVerifiedUpcomingEvents(events = []) {
  const verified = filterVerifiedContent(events, ['title'])
    .filter(isEventItemVisible)
    .filter((item) => hasUsableText(item.eventDate || item.date))
  return sortUpcomingEvents(verified)
}

export function getVerifiedAnnouncements(items = []) {
  return filterVerifiedContent(items, ['title']).filter(isEventItemVisible)
}

export function getVerifiedCommunityNews(items = []) {
  return filterVerifiedContent(items, ['title']).filter(isEventItemVisible)
}

export function getVerifiedPastEvents(events = []) {
  return filterVerifiedContent(events, ['title']).filter(isEventItemVisible)
}

export function groupEvents(events = []) {
  const visible = events.filter(isEventItemVisible)
  return {
    upcoming: getVerifiedUpcomingEvents(visible.filter((e) => e.status === EVENT_STATUS.UPCOMING)),
    announcements: getVerifiedAnnouncements(visible.filter((e) => e.status === EVENT_STATUS.ANNOUNCEMENT)),
    communityNews: getVerifiedCommunityNews(visible.filter((e) => e.status === EVENT_STATUS.COMMUNITY_NEWS)),
    past: getVerifiedPastEvents(visible.filter((e) => e.status === EVENT_STATUS.PAST)),
  }
}

export async function fetchEvents() {
  if (!hasSupabaseConfig()) return getFallbackEvents()

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      warnSupabaseFallback('fetchEvents', error)
      return getFallbackEvents()
    }

    if (!data?.length) return getFallbackEvents()

    const normalized = data.map(normalizeEvent).filter(isEventItemVisible)
    return normalized.length > 0 ? normalized : getFallbackEvents()
  } catch (error) {
    warnSupabaseFallback('fetchEvents', error)
    return getFallbackEvents()
  }
}

export async function fetchEventsForAdmin() {
  if (!hasSupabaseConfig()) return getFallbackEvents()

  try {
    const { data, error } = await supabase.from('events').select('*').order('display_order', { ascending: true })
    if (error) {
      warnSupabaseFallback('fetchEventsForAdmin', error)
      return getFallbackEvents()
    }
    if (data?.length) return data.map(normalizeEvent)
  } catch (error) {
    warnSupabaseFallback('fetchEventsForAdmin', error)
  }

  return getFallbackEvents()
}

export function eventToDbRow(event) {
  return {
    slug: event.slug,
    title: event.title,
    status: event.status,
    category: event.category || '',
    event_date: event.eventDate || '',
    event_time: event.eventTime || '',
    location: event.location || '',
    excerpt: event.excerpt || '',
    description: event.description || '',
    image_url: event.imageUrl || '',
    image_alt: event.imageAlt || '',
    eventbrite_link: event.eventbriteLink || '',
    google_form_link: event.googleFormLink || '',
    partiful_link: event.partifulLink || '',
    youtube_link: event.youtubeLink || '',
    media_items: event.mediaItems ?? [],
    resource_links: event.resourceLinks ?? [],
    registration_links: event.registrationLinks ?? [],
    featured: event.featured !== false,
    visible: event.visible !== false,
    display_order: event.displayOrder ?? 999,
  }
}

export async function saveEvent(event) {
  const row = eventToDbRow(event)
  const { data, error } = await supabase.from('events').upsert(row, { onConflict: 'slug' }).select().single()
  if (error) throw error
  return normalizeEvent(data)
}

export async function deleteEvent(slug) {
  const { error } = await supabase.from('events').delete().eq('slug', slug)
  if (error) throw error
}

export function formatEventDateLabel(date) {
  if (!hasUsableText(date)) return null
  if (/^\d{4}$/.test(date.trim())) return date.trim()
  return date.trim()
}
