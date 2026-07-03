import {
  CHAT_INTRO_MESSAGE,
  CHAT_NO_MATCH_MESSAGE,
  fallbackButtons,
  intents,
  quickActions,
} from '../data/chatHelp'
import { getLocalizedIntents } from '../data/chatHelpContent'

export { CHAT_INTRO_MESSAGE, CHAT_NO_MATCH_MESSAGE, quickActions, fallbackButtons }

export const QUICK_ACTIONS = quickActions

export function getChatIntents(language = 'en') {
  return getLocalizedIntents(language)
}

function scoreIntent(intent, query) {
  const normalized = query.toLowerCase().trim()
  if (!normalized) return 0

  let score = 0
  const title = intent.title.toLowerCase()
  const answer = intent.answer.toLowerCase()

  if (title.includes(normalized)) score += 12
  if (answer.includes(normalized)) score += 4

  for (const keyword of intent.keywords) {
    if (normalized === keyword) score += 16
    else if (normalized.includes(keyword)) score += 10
    else if (keyword.includes(normalized) && normalized.length > 2) score += 6
  }

  const words = normalized.split(/\s+/).filter((word) => word.length > 1)
  for (const word of words) {
    if (title.includes(word)) score += 3
    if (answer.includes(word)) score += 2
    for (const keyword of intent.keywords) {
      if (keyword.includes(word) || word.includes(keyword)) score += 5
    }
  }

  if (intent.id === 'admin') {
    const adminSignals = ['admin', 'login', 'editor', 'dashboard', 'staff']
    if (!adminSignals.some((signal) => normalized.includes(signal))) {
      score = Math.max(0, score - 8)
    }
  }

  return score
}

export function searchChatHelp(query, limit = 2, language = 'en') {
  const normalized = query.toLowerCase().trim()
  if (!normalized) return []

  const localizedIntents = getLocalizedIntents(language)

  return localizedIntents
    .map((intent) => ({ intent, score: scoreIntent(intent, normalized) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ intent }) => intent)
}

export function getChatHelpById(id) {
  return intents.find((intent) => intent.id === id) ?? null
}
