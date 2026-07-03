import eventsContent from '../content/events.json'
import { mergeLocalizedContent } from '../utils/homepageLocale'

export const eventsPageContent = {
  en: {
    hero: {
      eyebrow: 'Events & News',
      title: 'Events, Announcements, and Community Updates',
      description:
        'Find ECAA community events, announcements, meetings, event hall rental requests, and opportunities to participate.',
      buttons: [
        { label: 'Upcoming Events', href: '#upcoming-events', style: 'primary' },
        { label: 'Book a Hall', href: '#book-hall', style: 'secondary' },
        { label: 'Media Gallery', href: '/media', style: 'ghost' },
      ],
      highlightCards: [
        { value: 'Events', label: 'Community gatherings' },
        { value: 'Announcements', label: 'News & updates' },
        { value: 'Community News', label: 'Stay informed' },
        { value: 'Hall Rental', label: 'Host your event' },
      ],
    },
    quickActions: eventsContent.quickActions,
    sections: {
      upcoming: {
        id: 'upcoming-events',
        title: 'Upcoming Events',
      },
      announcements: {
        id: 'announcements',
        title: 'Announcements',
      },
      communityNews: {
        id: 'community-news',
        title: 'Community News',
      },
      past: {
        id: 'past-events',
        title: 'Past Events',
      },
    },
    emptyStates: eventsContent.emptyStates,
    bookHall: {
      ...eventsContent.bookHall,
      importantLabel: 'Important:',
      goodForTitle: 'Good for',
      contactButton: 'Contact ECAA',
      hallImageAlt: 'ECAA event hall space for community meetings and celebrations.',
      availability: {
        title: 'Hall availability',
        description:
          'Approved public reservations are shown below. Final availability must still be confirmed by ECAA before any booking is guaranteed.',
        emptyDescription:
          'No approved public reservations are listed at this time. Submit a request below and ECAA will review availability with you.',
        reservedLabel: 'Reserved',
      },
      form: {
        title: 'Booking request form',
        fields: {
          name: 'Your name',
          email: 'Email',
          phone: 'Phone',
          eventTitle: 'Event title',
          eventType: 'Event type',
          expectedGuests: 'Expected guests',
          startTime: 'Start date & time',
          endTime: 'End date & time',
          notes: 'Notes',
        },
        submitLabel: 'Submit Hall Request',
        submittingLabel: 'Submitting…',
        successMessage:
          'Thank you. Your hall request has been submitted. ECAA will review availability, requirements, pricing, and approval before confirming the booking.',
        errorMessage:
          'Your request could not be submitted right now. Please contact ECAA directly for hall rental information.',
      },
    },
    badgeLabels: {
      upcoming: 'Upcoming',
      announcement: 'Announcement',
      news: 'News',
      past: 'Past',
    },
    buttonLabels: {
      readMore: 'Read more',
      learnMore: 'Learn more',
    },
    closingCta: eventsContent.closingCta,
  },
  am: {
    hero: {
      eyebrow: 'ዝግጅቶች እና ዜና',
      title: 'ዝግጅቶች፣ ማስታወቂያዎች እና የማህበረሰብ ዝማኔዎች',
      description:
        'የECAA ማህበረሰብ ዝግጅቶችን፣ ማስታወቂያዎችን፣ ስብሰባዎችን፣ የዝግጅት አዳራሽ ኪራይ ጥያቄዎችን እና የመሳተፍ እድሎችን ያግኙ።',
      buttons: [
        { label: 'መጪ ዝግጅቶች', href: '#upcoming-events', style: 'primary' },
        { label: 'የአዳራሽ ቦታ ያስይዙ', href: '#book-hall', style: 'secondary' },
        { label: 'የሚዲያ ጋለሪ', href: '/media', style: 'ghost' },
      ],
      highlightCards: [
        { value: 'ዝግጅቶች', label: 'የማህበረሰብ ስብሰባዎች' },
        { value: 'ማስታወቂያዎች', label: 'News & updates' },
        { value: 'ዜና እና ዝማኔዎች', label: 'የማህበረሰብ ዜና' },
        { value: 'የአዳራሽ ኪራይ', label: 'ዝግጅትዎን ያስተናግዱ' },
      ],
    },
    quickActions: [
      { label: 'መጪ ዝግጅቶች', href: '#upcoming-events' },
      { label: 'ማስታወቂያዎች', href: '#announcements' },
      { label: 'የማህበረሰብ ዜና', href: '#community-news' },
      { label: 'አዳራሽ ቦታ ያስይዙ', href: '#book-hall' },
      { label: 'ያለፉ ዝግጅቶች', href: '#past-events' },
    ],
    sections: {
      upcoming: {
        title: 'መጪ ዝግጅቶች',
      },
      announcements: {
        title: 'ማስታወቂያዎች',
      },
      communityNews: {
        title: 'የማህበረሰብ ዜና',
      },
      past: {
        title: 'ያለፉ ዝግጅቶች',
      },
    },
    emptyStates: {
      upcoming: {
        title: 'ምንም መጪ ዝግጅቶች አልታተሙም',
        description:
          'በዚህ ጊዜ ምንም መጪ ዝግጅቶች አልታተሙም። እባክዎን በቅርቡ ተመልሰው ይመልከቱ ወይም ለአሁኑ ማስታወቂያዎች ECAAን ያነጋግሩ።',
      },
      communityNews: {
        title: 'የማህበረሰብ ዜና በቅርቡ ይመጣል',
        description: 'የማህበረሰብ ዜና ሲገኝ እዚህ ይታተማል።',
      },
      past: {
        title: 'ያለፉ ዝግጅቶች በቅርቡ ይታከላሉ',
        description:
          'ያለፉ የማህበረሰብ ዝግጅቶች የተረጋገጡ ዝርዝሮች ሲገኙ እዚህ ይዘረዘራሉ።',
      },
    },
    bookHall: {
      title: 'የECAA ዝግጅት አዳራሽ ያስይዙ',
      description:
        'ለስብሰባዎች፣ ለበዓላት፣ ለባህል ስብሰባዎች፣ ለአውደ ጥናቶች፣ ለስልጠናዎች እና ለማህበረሰብ ዝግጅቶች የECAA ዝግጅት አዳራሽ ለመከራየት ጥያቄ ያቅርቡ።',
      importantLabel: 'አስፈላጊ፡',
      importantNote:
        'ጥያቄ ማስገባት ቦታ ማስያዝ ዋስትና አይሰጥም። ECAA አዳራሹ ከመያዙ በፊት ተገኝነትን፣ መስፈርቶችን፣ ዋጋን እና ማፅደቅን ማረጋገጥ አለበት።',
      goodForTitle: 'ለማህበረሰብ ስብሰባዎች ጥሩ ነው',
      goodFor: [
        null,
        'የባህል ስብሰባዎች',
        'የቤተሰብ ክብረ በዓላት',
        'ወርክሾፖች እና ስልጠናዎች',
        'የወጣቶች እና የትምህርት ዝግጅቶች',
        'የጤና እና የደህንነት ክፍለ ጊዜዎች',
        'የገቢ ማሰባሰቢያ ዝግጅቶች',
      ],
      contactButton: 'ECAAን ያግኙ',
      hallImageAlt: 'የECAA ዝግጅት አዳራሽ ለማህበረሰብ ስብሰባዎች እና ለበዓላት ቦታ',
      availability: {
        title: 'የአዳራሽ አቅርቦት',
        description:
          'የተፈቀደላቸው የህዝብ ቦታ ማስያዝ ከዚህ በታች ይታያል። ማንኛውም ቦታ ማስያዝ ከመረጋገጡ በፊት የመጨረሻ ተገኝነት በECAA መረጋገጥ አለበት።',
        emptyDescription:
          'በዚህ ጊዜ ምንም የተፈቀደ የህዝብ ቦታ ማስያዝ አልተዘረዘሩም። ከዚህ በታች ጥያቄ ያስገቡ እና ECAA ከእርስዎ ጋር ያለውን ተገኝነት ይገመግማል።',
      },
      form: {
        title: 'የቦታ ማስያዣ ጥያቄ ቅጽ',
        fields: {
          name: 'ስምዎ',
          email: 'ኢሜይል',
          phone: 'ስልክ',
          eventTitle: 'የዝግጅት ርዕስ',
          eventType: 'የዝግጅት አይነት',
          expectedGuests: 'የሚጠበቁ እንግዶች',
          startTime: 'የመጀመሪያ ቀን እና ሰዓት',
        },
      },
    },
    badgeLabels: {
      announcement: 'ማስታወቂያ',
    },
    buttonLabels: {
      readMore: 'ተጨማሪ ያንብቡ',
    },
    closingCta: {
      title: 'ስለ አንድ ዝግጅት ወይም ማስታወቂያ ጥያቄዎች አሉዎት?',
      description:
        'ለአሁኑ የዝግጅት ዝርዝሮች፣ የአዳራሽ አቅርቦት እና የማህበረሰብ ዝመናዎች ECAAን ያነጋግሩ።',
      buttons: [
        { label: 'ECAAን ያነጋግሩ', href: '/contact' },
        { label: 'አባል ይሁኑ', href: '/membership' },
      ],
    },
  },
}

function mergeQuickActions(englishActions = [], amharicActions = [], remoteActions = []) {
  const base = englishActions.map((action, index) =>
    mergeLocalizedContent(action, amharicActions[index] || {}),
  )
  if (!remoteActions.length) return base
  return base.map((action, index) => mergeLocalizedContent(action, remoteActions[index] || {}))
}

function mergeEmptyStates(englishStates = {}, amharicStates = {}, remoteStates = {}) {
  const keys = Object.keys(englishStates)
  return keys.reduce((result, key) => {
    result[key] = mergeLocalizedContent(
      mergeLocalizedContent(englishStates[key], amharicStates[key]),
      remoteStates[key],
    )
    return result
  }, {})
}

function mergeLinkArray(englishLinks = [], amharicLinks = []) {
  if (!amharicLinks.length) return englishLinks
  return englishLinks.map((link, index) => mergeLocalizedContent(link, amharicLinks[index] || {}))
}

function mergeGoodForList(englishItems = [], amharicItems = [], remoteItems = []) {
  const overlay = remoteItems.length ? remoteItems : amharicItems
  if (!overlay.length) return englishItems

  return englishItems.map((item, index) => {
    const translated = overlay[index]
    return translated || item
  })
}

function mergeBookHall(englishBookHall = {}, amharicBookHall = {}, remoteBookHall = {}) {
  const merged = mergeLocalizedContent(
    mergeLocalizedContent(englishBookHall, amharicBookHall),
    remoteBookHall,
  )

  return {
    ...merged,
    availability: mergeLocalizedContent(
      mergeLocalizedContent(englishBookHall.availability, amharicBookHall.availability),
      remoteBookHall.availability,
    ),
    form: {
      ...mergeLocalizedContent(englishBookHall.form, amharicBookHall.form),
      fields: mergeLocalizedContent(
        mergeLocalizedContent(englishBookHall.form?.fields, amharicBookHall.form?.fields),
        remoteBookHall.form?.fields,
      ),
    },
    goodFor: mergeGoodForList(
      englishBookHall.goodFor,
      amharicBookHall.goodFor,
      remoteBookHall.goodFor,
    ),
    contactPath: englishBookHall.contactPath,
    requestPath: englishBookHall.requestPath,
    email: englishBookHall.email,
    subject: englishBookHall.subject,
    bodyTemplate: englishBookHall.bodyTemplate,
    id: englishBookHall.id,
  }
}

export function getEventsPageContent(language = 'en', remoteContent = null) {
  const en = eventsPageContent.en
  if (language !== 'am') {
    if (remoteContent?.content) {
      return mergeLocalizedContent(en, remoteContent.content)
    }
    return en
  }

  const am = eventsPageContent.am
  const remoteAm = remoteContent?.content_am || {}

  return {
    hero: mergeLocalizedContent(mergeLocalizedContent(en.hero, am.hero), remoteAm.hero),
    quickActions: mergeQuickActions(en.quickActions, am.quickActions, remoteAm.quickActions),
    sections: {
      upcoming: mergeLocalizedContent(
        mergeLocalizedContent(en.sections.upcoming, am.sections.upcoming),
        remoteAm.sections?.upcoming,
      ),
      announcements: mergeLocalizedContent(
        mergeLocalizedContent(en.sections.announcements, am.sections.announcements),
        remoteAm.sections?.announcements,
      ),
      communityNews: mergeLocalizedContent(
        mergeLocalizedContent(en.sections.communityNews, am.sections.communityNews),
        remoteAm.sections?.communityNews,
      ),
      past: mergeLocalizedContent(
        mergeLocalizedContent(en.sections.past, am.sections.past),
        remoteAm.sections?.past,
      ),
    },
    emptyStates: mergeEmptyStates(en.emptyStates, am.emptyStates, remoteAm.emptyStates),
    bookHall: mergeBookHall(en.bookHall, am.bookHall, remoteAm.bookHall),
    badgeLabels: mergeLocalizedContent(
      mergeLocalizedContent(en.badgeLabels, am.badgeLabels),
      remoteAm.badgeLabels,
    ),
    buttonLabels: mergeLocalizedContent(
      mergeLocalizedContent(en.buttonLabels, am.buttonLabels),
      remoteAm.buttonLabels,
    ),
    closingCta: {
      ...mergeLocalizedContent(en.closingCta, am.closingCta || {}),
      ...mergeLocalizedContent(en.closingCta, remoteAm.closingCta || {}),
      buttons: mergeLinkArray(
        en.closingCta.buttons,
        remoteAm.closingCta?.buttons?.length ? remoteAm.closingCta.buttons : am.closingCta?.buttons,
      ),
    },
  }
}

export function getEventsHighlightCards(content) {
  return content?.hero?.highlightCards || []
}
