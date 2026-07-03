import {
  CHAT_INTRO_MESSAGE,
  CHAT_NO_MATCH_MESSAGE,
  fallbackButtons,
  intents,
  quickActions,
} from './chatHelp'
import { mergeLocalizedContent } from '../utils/homepageLocale'

export const chatHelpContent = {
  en: {
    title: 'ECAA Website Helper',
    subtitle: 'Find membership, events, programs, media, hall rental, and contact information.',
    startOver: 'Start over',
    close: 'Close',
    closeAria: 'Close chat',
    quickLinksLabel: 'Quick links',
    searchLabel: 'Ask the ECAA Website Helper',
    placeholder: 'Ask about membership, events, programs, hall rental, or contact info...',
    submit: 'Go',
    intro: CHAT_INTRO_MESSAGE,
    noMatch: CHAT_NO_MATCH_MESSAGE,
    quickActions,
    fallbackButtons,
  },
  am: {
    title: 'የECAA ድህረ ገጽ አጋዥ',
    subtitle: 'አባልነት፣ ዝግጅቶች፣ ፕሮግራሞች፣ ሚዲያዎች፣ የአዳራሽ ኪራይ እና የእውቂያ መረጃ ያግኙ።',
    startOver: 'እንደገና ይጀምሩ',
    close: 'ዝጋ',
    closeAria: 'ውይይቱን ዝጋ',
    quickLinksLabel: 'ፈጣን አገናኞች',
    searchLabel: 'የECAA ድህረ ገጽ አጋዥን ይጠይቁ',
    placeholder: 'ስለ አባልነት፣ ዝግጅቶች፣ ፕሮግራሞች፣ የአዳራሽ ኪራይ ወይም የእውቂያ መረጃ ይጠይቁ...',
    submit: 'ሂድ',
    intro:
      'ሰላም! የECAA አባልነት፣ ፕሮግራሞች፣ ዝግጅቶች፣ የአዳራሽ ኪራይ፣ ሚዲያ፣ አመራር፣ ሰነዶች እና የእውቂያ መረጃ እንዲያገኙ ልረዳዎ እችላለሁ።',
    quickActions: [
      { label: 'አባል ይሁኑ', href: '/membership' },
      { label: 'በቅርብ ጊዜ የሚደረጉ ዝግጅቶች', href: '/events' },
      { label: 'የዝግጅት አዳራሹን ያስይዙ', href: '/events#book-hall' },
      { label: 'ፕሮግራሞች', href: '/programs' },
      { label: 'የሚዲያ ጋለሪ', href: '/media' },
      { label: 'ECAAን ያግኙ', href: '/contact' },
    ],
    fallbackButtons: [
      { label: 'ECAAን ያግኙ', href: '/contact' },
      { label: 'ፕሮግራሞች', href: '/programs' },
      { label: 'ዝግጅቶች', href: '/events' },
      { label: 'አባልነት', href: '/membership' },
    ],
  },
}

const intentAmharicById = {
  membership: {
    title: 'አባልነት',
    keywords: ['አባልነት', 'አባል', 'ምዝገባ', 'ይቀላቀሉ'],
    buttons: [{ label: 'አባል ይሁኑ', href: '/membership' }],
  },
  events: {
    title: 'ዝግጅቶች',
    keywords: ['ዝግጅት', 'ዝግጅቶች', 'ማስታወቂያ'],
    buttons: [{ label: 'ዝግጅቶችን ይመልከቱ', href: '/events' }],
  },
  'book-hall': {
    title: 'የአዳራሽ ኪራይ',
    keywords: ['አዳራሽ', 'ኪራይ', 'ቦታ', 'ዝግጅት አዳራሽ'],
    buttons: [{ label: 'የአዳራሽ ተገኝነት ይጠይቁ', href: '/events#book-hall' }],
  },
  media: {
    title: 'የሚዲያ ጋለሪ',
    keywords: ['ሚዲያ', 'ፎቶ', 'ቪዲዮ', 'ጋለሪ'],
    buttons: [{ label: 'የሚዲያ ጋለሪ', href: '/media' }],
  },
  programs: {
    title: 'ፕሮግራሞች',
    keywords: ['ፕሮግራም', 'ፕሮግራሞች', 'አገልግሎት'],
    buttons: [{ label: 'ፕሮግራሞችን ያስሱ', href: '/programs' }],
  },
  contact: {
    title: 'ECAAን ያግኙ',
    keywords: ['እውቂያ', 'አድራሻ', 'ስልክ', 'ኢሜይል', 'ቢሮ'],
    buttons: [{ label: 'ECAAን ያግኙ', href: '/contact' }],
  },
  leadership: {
    title: 'አመራር',
    keywords: ['አመራር', 'ቦርድ', 'ኮሚቴ'],
    buttons: [{ label: 'አመራርን ይመልከቱ', href: '/leadership' }],
  },
  documents: {
    title: 'ሰነዶች',
    keywords: ['ሰነድ', 'ሰነዶች', 'ቅጽ'],
    buttons: [{ label: 'ሰነዶችን ይመልከቱ', href: '/documents' }],
  },
  about: {
    title: 'ስለ ECAA',
    keywords: ['ስለ', 'ተልዕኮ', 'ታሪክ'],
    buttons: [{ label: 'ስለ ECAA', href: '/about' }],
  },
  home: {
    title: 'መነሻ',
    keywords: ['መነሻ', 'ዋና ገጽ'],
    buttons: [{ label: 'ወደ መነሻ', href: '/' }],
  },
  volunteer: {
    title: 'በጎ ፈቃደኝነት',
    keywords: ['በጎ ፈቃደኝነት', 'ተሳትፎ'],
    buttons: [{ label: 'ECAAን ይደግፉ', href: '/support' }],
  },
  donate: {
    title: 'ECAAን ይደግፉ',
    keywords: ['ልገሳ', 'ድጋፍ'],
    buttons: [{ label: 'ECAAን ይደግፉ', href: '/support' }],
  },
  language: {
    title: 'ቋንቋ',
    keywords: ['ቋንቋ', 'አማርኛ', 'እንግሊዝኛ'],
  },
}

export function getChatHelpContent(language = 'en') {
  const en = chatHelpContent.en
  if (language !== 'am') return en

  const am = chatHelpContent.am
  return {
    ...mergeLocalizedContent(en, am),
    quickActions: am.quickActions?.length ? am.quickActions : en.quickActions,
    fallbackButtons: am.fallbackButtons?.length ? am.fallbackButtons : en.fallbackButtons,
    noMatch: en.noMatch,
  }
}

export function getLocalizedIntents(language = 'en') {
  if (language !== 'am') return intents

  return intents.map((intent) => {
    const overlay = intentAmharicById[intent.id]
    if (!overlay) return intent

    return {
      ...intent,
      title: overlay.title || intent.title,
      keywords: [...intent.keywords, ...(overlay.keywords || [])],
      buttons: overlay.buttons?.length
        ? overlay.buttons.map((button, index) =>
            mergeLocalizedContent(intent.buttons[index] || {}, button),
          )
        : intent.buttons,
    }
  })
}

export function localizeIntent(intent, language = 'en') {
  if (language !== 'am') return intent
  const overlay = intentAmharicById[intent.id]
  if (!overlay) return intent

  return {
    ...intent,
    title: overlay.title || intent.title,
    buttons: overlay.buttons?.length
      ? overlay.buttons.map((button, index) =>
          mergeLocalizedContent(intent.buttons[index] || {}, button),
        )
      : intent.buttons,
  }
}
