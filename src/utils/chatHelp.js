import chatHelpItems from '../data/chatHelp.json'

export const QUICK_TOPICS = [
  { label: 'Membership', query: 'membership' },
  { label: 'Events', query: 'events' },
  { label: 'Media', query: 'media' },
  { label: 'Book a Hall', query: 'book a hall' },
  { label: 'Programs', query: 'programs' },
  { label: 'Contact', query: 'contact' },
]

export const CHAT_INTRO_MESSAGE =
  'Welcome! Ask a question or choose a topic below to find membership, events, media, programs, and community resources.'

export const CHAT_NO_MATCH_MESSAGE =
  "I couldn't find an exact match. Try Membership, Events, Media, Book a Hall, Programs, or Contact."

export function getChatHelpItems() {
  return chatHelpItems
}

function scoreItem(item, query) {
  const normalized = query.toLowerCase().trim()
  if (!normalized) return 0

  let score = 0
  const title = item.title.toLowerCase()
  const description = item.description.toLowerCase()

  if (title.includes(normalized)) score += 12
  if (description.includes(normalized)) score += 4

  for (const keyword of item.keywords) {
    if (normalized === keyword) score += 14
    else if (normalized.includes(keyword)) score += 8
    else if (keyword.includes(normalized)) score += 6
  }

  const words = normalized.split(/\s+/).filter((word) => word.length > 1)
  for (const word of words) {
    if (title.includes(word)) score += 3
    if (description.includes(word)) score += 2
    for (const keyword of item.keywords) {
      if (keyword.includes(word) || word.includes(keyword)) score += 4
    }
  }

  return score
}

export function searchChatHelp(query, limit = 3) {
  const normalized = query.toLowerCase().trim()
  if (!normalized) return []

  return chatHelpItems
    .map((item) => ({ item, score: scoreItem(item, normalized) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item)
}

export function getChatHelpById(id) {
  return chatHelpItems.find((item) => item.id === id) ?? null
}
