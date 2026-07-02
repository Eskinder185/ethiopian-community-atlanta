import { filterVerifiedContent, hasUsableText } from './data'

export const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  ANNOUNCEMENT: 'announcement',
  COMMUNITY_NEWS: 'community-news',
  PAST: 'past',
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
    const dateA = parseEventDate(a.date)
    const dateB = parseEventDate(b.date)
    if (dateA && dateB) return dateA - dateB
    if (dateA) return -1
    if (dateB) return 1
    return a.title.localeCompare(b.title)
  })
}

export function getVerifiedUpcomingEvents(events = []) {
  const verified = filterVerifiedContent(events, ['title']).filter((item) =>
    hasUsableText(item.date),
  )
  return sortUpcomingEvents(verified)
}

export function getVerifiedAnnouncements(items = []) {
  return filterVerifiedContent(items, ['title'])
}

export function getVerifiedCommunityNews(items = []) {
  return filterVerifiedContent(items, ['title'])
}

export function getVerifiedPastEvents(events = []) {
  return filterVerifiedContent(events, ['title'])
}

export function formatEventDateLabel(date) {
  if (!hasUsableText(date)) return null
  if (/^\d{4}$/.test(date.trim())) return date.trim()
  return date.trim()
}
