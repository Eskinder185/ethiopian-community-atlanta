import {
  CHATBOT_FALLBACK,
  CHATBOT_INTENTS,
  CHATBOT_NO_ADVICE,
  CHATBOT_NO_ADVICE_KEYWORDS,
} from "../data/chatbotKnowledgeBase";

const MATCH_THRESHOLD = 1;

export function normalizeText(text = "") {
  return String(text)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s\u1200-\u137F.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getAllKeywords(intent) {
  return [...(intent.keywords?.en || []), ...(intent.keywords?.am || [])];
}

function getAllPhrases(intent) {
  return [...(intent.phrases?.en || []), ...(intent.phrases?.am || [])];
}

export function scoreIntent(userText, intent) {
  const normalized = normalizeText(userText);
  if (!normalized) return { score: 0, longestMatch: 0 };

  let score = 0;
  let longestMatch = 0;

  for (const phrase of getAllPhrases(intent)) {
    const normalizedPhrase = normalizeText(phrase);
    if (!normalizedPhrase) continue;

    if (normalized === normalizedPhrase) {
      score += 24;
      longestMatch = Math.max(longestMatch, normalizedPhrase.length);
    } else if (normalized.includes(normalizedPhrase)) {
      score += 18;
      longestMatch = Math.max(longestMatch, normalizedPhrase.length);
    }
  }

  for (const keyword of getAllKeywords(intent)) {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) continue;

    if (normalized === normalizedKeyword) {
      score += 16;
      longestMatch = Math.max(longestMatch, normalizedKeyword.length);
    } else if (normalized.includes(normalizedKeyword)) {
      score += 10 + Math.min(normalizedKeyword.length, 12);
      longestMatch = Math.max(longestMatch, normalizedKeyword.length);
    } else if (normalizedKeyword.includes(normalized) && normalized.length > 2) {
      score += 6;
      longestMatch = Math.max(longestMatch, normalized.length);
    }
  }

  const words = normalized.split(" ").filter((word) => word.length > 1);
  for (const word of words) {
    for (const keyword of getAllKeywords(intent)) {
      const normalizedKeyword = normalizeText(keyword);
      if (!normalizedKeyword) continue;
      if (normalizedKeyword.includes(word) || word.includes(normalizedKeyword)) {
        score += 4;
        longestMatch = Math.max(longestMatch, Math.max(word.length, normalizedKeyword.length));
      }
    }
  }

  if (intent.id === "admin") {
    const adminSignals = ["admin", "login", "editor", "dashboard", "cms", "አስተዳዳሪ", "መግቢያ"];
    if (!adminSignals.some((signal) => normalized.includes(normalizeText(signal)))) {
      score = Math.max(0, score - 6);
    }
  }

  return { score, longestMatch };
}

function matchesNoAdvice(userText) {
  const normalized = normalizeText(userText);
  if (!normalized) return false;

  const keywords = [...CHATBOT_NO_ADVICE_KEYWORDS.en, ...CHATBOT_NO_ADVICE_KEYWORDS.am];
  return keywords.some((keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    return normalized.includes(normalizedKeyword);
  });
}

function pickBestIntent(scoredIntents) {
  return scoredIntents.reduce((best, current) => {
    if (!best) return current;
    if (current.score > best.score) return current;
    if (current.score === best.score && current.longestMatch > best.longestMatch) return current;
    return best;
  }, null);
}

function localizeReply(source, language = "en") {
  const lang = language === "am" ? "am" : "en";
  return {
    text: source[lang]?.text || source.en.text,
    actions: source[lang]?.actions || source.en.actions || [],
  };
}

export function getChatbotReply(userText, language = "en") {
  const lang = language === "am" ? "am" : "en";
  const normalized = normalizeText(userText);

  if (!normalized) {
    return localizeReply(CHATBOT_FALLBACK, lang);
  }

  if (matchesNoAdvice(userText)) {
    return localizeReply(CHATBOT_NO_ADVICE, lang);
  }

  const scored = CHATBOT_INTENTS.map((intent) => {
    const { score, longestMatch } = scoreIntent(userText, intent);
    return { intent, score, longestMatch };
  }).filter((entry) => entry.score >= MATCH_THRESHOLD);

  const best = pickBestIntent(scored);

  if (!best) {
    return localizeReply(CHATBOT_FALLBACK, lang);
  }

  const intent = best.intent;
  return {
    text: intent.response[lang] || intent.response.en,
    actions: intent.actions[lang] || intent.actions.en || [],
  };
}
