import { leadershipAmharicFallbackByName } from '../data/leadershipAmharicFallback'
import { mergeLocalizedContent } from './homepageLocale'
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

export function normalizeLeadershipContentAm(raw) {
  const source = parseContentAm(raw)
  if (!source) return null

  return {
    name: source.name,
    role: source.role,
    committee: source.committee,
    bio: source.bio,
    imageAlt: source.image_alt ?? source.imageAlt,
  }
}

export function getLeadershipContentAmSource(member) {
  if (!member) return null
  const stored = normalizeLeadershipContentAm(member.content_am ?? member.contentAm)
  const fallback = leadershipAmharicFallbackByName[member.name?.trim()] || null
  if (!stored && !fallback) return null
  return { ...fallback, ...stored }
}

export function applyLeadershipMemberLocale(member, language = 'en') {
  if (!member || language !== 'am') return member

  const overlay = getLeadershipContentAmSource(member)
  if (!overlay) return member

  return {
    ...member,
    name: hasUsableText(overlay.name) ? overlay.name.trim() : member.name,
    role: hasUsableText(overlay.role) ? overlay.role.trim() : member.role,
    committee: hasUsableText(overlay.committee) ? overlay.committee.trim() : member.committee,
    bio: hasUsableText(overlay.bio) ? overlay.bio.trim() : member.bio,
    imageAlt: hasUsableText(overlay.imageAlt) ? overlay.imageAlt.trim() : member.imageAlt,
    title: hasUsableText(overlay.role) ? overlay.role.trim() : member.title,
  }
}

export function applyLeadershipMembersLocale(members = [], language = 'en') {
  return members.map((member) => applyLeadershipMemberLocale(member, language))
}

export function buildLeadershipContentAmFromDraft(draft = {}) {
  const source = draft.content_am || {}
  return {
    name: source.name || '',
    role: source.role || '',
    committee: source.committee || '',
    bio: source.bio || '',
    image_alt: source.image_alt || source.imageAlt || '',
  }
}

export function localizeLeadershipGroups(groups = [], pageContent = null) {
  if (!pageContent?.committees?.length) return groups

  const committeeById = Object.fromEntries(pageContent.committees.map((committee) => [committee.id, committee]))

  return groups.map((group) => {
    const localized = committeeById[group.id]
    if (!localized) return group
    return mergeLocalizedContent(group, {
      title: localized.title,
      description: localized.description,
      anchor: localized.anchor || group.anchor,
    })
  })
}
