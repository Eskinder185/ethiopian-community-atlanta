import supportData from './support.json'
import { mergeLocalizedContent } from '../utils/homepageLocale'

const donationFormUrl = supportData.donationCampaign.formUrl

export const supportPageContent = {
  en: {
    hero: {
      eyebrow: 'Support ECAA',
      title: 'Support Community Programs and Services',
      description:
        'Support ECAA through donations, sponsorship, volunteering, and participation in community programs.',
      buttons: [
        { label: 'Donate Today', href: '#donate', style: 'primary' },
        { label: 'Volunteer', href: '#volunteer', style: 'secondary' },
      ],
      highlightCards: [
        { value: 'Donate', label: 'Fund programs' },
        { value: 'Sponsor', label: 'Community growth' },
        { value: 'Volunteer', label: 'Share your time' },
        { value: '501(c)(3)', label: 'Nonprofit organization' },
      ],
    },
    donation: {
      eyebrow: 'Donation campaign',
      title: supportData.donationCampaign.title,
      description: supportData.donationCampaign.description,
      levels: supportData.donationCampaign.levels,
      form: {
        badges: ['Jotform', 'Secure online form'],
        title: 'Make a Donation',
        description: supportData.donationCampaign.ctaDescription,
        buttonLabel: supportData.donationCampaign.ctaLabel,
        formUrl: donationFormUrl,
      },
    },
    otherOptions: {
      title: supportData.otherOptions.title,
      description: supportData.otherOptions.description,
      links: [
        { label: 'Become a Member', path: '/membership' },
        { label: 'Volunteer', path: '/support#volunteer' },
        { label: 'Book a Hall', path: '/events#book-hall' },
        { label: 'Contact ECAA', path: '/contact' },
      ],
    },
    volunteer: {
      id: 'volunteer',
      title: 'Volunteer with ECAA',
      description:
        'ECAA welcomes volunteers who want to support community programs, events, and services. Visit the volunteer page to learn more and get started.',
      buttonLabel: 'Volunteer Opportunities',
      buttonPath: '/volunteer',
    },
    finalCta: {
      title: 'Questions about supporting ECAA?',
      description: supportData.closingNote,
      buttons: [
        { label: 'Contact ECAA', href: '/contact' },
        { label: 'Become a Member', href: '/membership' },
      ],
    },
  },
  am: {
    hero: {
      eyebrow: 'ECAAን ይደግፉ',
      title: 'የማህበረሰብ ፕሮግራሞችን እና አገልግሎቶችን ይደግፉ',
      description:
        'ECAAን በልገሳ፣ በስፖንሰርነት፣ በበጎ ፈቃደኝነት እና በማህበረሰብ ፕሮግራሞች ውስጥ በመሳተፍ ይደግፉ።',
      buttons: [
        { label: 'ዛሬ ይለግሱ', href: '#donate', style: 'primary' },
        { label: 'በጎ ፈቃደኝነት', href: '#volunteer', style: 'secondary' },
      ],
      highlightCards: [
        { value: 'ለግሱ', label: 'የገንዘብ ፕሮግራሞችን የገንዘብ ድጋፍ ያድርጉ' },
        { value: 'ስፖንሰር ያድርጉ', label: 'የማህበረሰብ እድገት' },
        { value: 'በጎ ፈቃደኝነት', label: 'ጊዜዎን ያጋሩ' },
        { value: '501(c)(3)', label: 'ለትርፍ ያልተቋቋመ ድርጅት' },
      ],
    },
    donation: {
      eyebrow: 'የልገሳ ዘመቻ',
      title: 'የማህበረሰባችንን የወደፊት ሁኔታ መክፈት፡ ከሞርጌጅ ነፃ እና እድገት የሚያገኙ',
      description:
        'የECAA የማህበረሰብ ፕሮግራሞችን፣ አገልግሎቶችን እና የረጅም ጊዜ የማህበረሰብ ተነሳሽነቶችን በገንዘብ ማሰባሰቢያ ዘመቻው ይደግፉ።',
      levels: [
        { name: 'የምስክር ወረቀት', amount: '$100' },
        { name: 'የነሐስ ፕላክ', amount: '$500' },
        { name: 'የብር ፕላክ', amount: '$1,000' },
        { name: 'የወርቅ ፕላክ', amount: '$5,000' },
        { name: 'የፕላቲነም ፕላክ', amount: '$10,000' },
        { name: 'የመነሻ ደረጃ', amount: '$20' },
        { name: 'ማንኛውም መጠን', amount: 'ብዙ $10' },
      ],
      form: {
        badges: ['ጆትፎርም', 'ደህንነቱ የተጠበቀ የመስመር ላይ ቅጽ'],
        title: 'ልገሳ ያድርጉ',
        description:
          'የልገሳ ክፍያዎች በጆትፎርም በኩል ደህንነቱ በተጠበቀ ሁኔታ ይስተናገዳሉ። ስጦታዎ የECAA ፕሮግራሞችን፣ አገልግሎቶችን እና የማህበረሰብ እድገትን ይደግፋል።',
        buttonLabel: 'ዛሬ ይለግሱ',
      },
    },
    otherOptions: {
      title: 'ECAAን ለመደገፍ ሌሎች መንገዶች',
      description:
        'አባልነት፣ የበጎ ፈቃደኝነት ስራ፣ የአዳራሽ ኪራይ እና ቀጥተኛ ግንኙነት ECAAን ለመደገፍ ሌሎች ትርጉም ያላቸው መንገዶች ናቸው።',
      links: [
        { label: 'አባል ይሁኑ', path: '/membership' },
        { label: 'በጎ ፈቃደኝነት', path: '/support#volunteer' },
        { label: 'አዳራሽ ያስይዙ', path: '/events#book-hall' },
        { label: 'ECAAን ያግኙ', path: '/contact' },
      ],
    },
    volunteer: {
      title: 'ከECAA ጋር በጎ ፈቃደኝነት',
      description:
        'ECAA የማህበረሰብ ፕሮግራሞችን፣ ዝግጅቶችን እና አገልግሎቶችን ለመደገፍ ለሚፈልጉ በጎ ፈቃደኞችን በደስታ ይቀበላል። የበለጠ ለማወቅ እና ለመጀመር የበጎ ፈቃደኝነት ገጹን ይጎብኙ።',
      buttonLabel: 'የበጎ ፈቃደኝነት እድሎች',
    },
    finalCta: {
      title: 'ECAAን ስለመደገፍ ጥያቄዎች?',
      description:
        'ስለ ልገሳ፣ የገንዘብ ማሰባሰቢያ፣ የስፖንሰርሺፕ እና የበጎ ፈቃደኝነት እድሎች ጥያቄዎች ካሉዎት ECAAን ያነጋግሩ።',
      buttons: [
        { label: 'ECAAን ያነጋግሩ', href: '/contact' },
        { label: 'አባል ይሁኑ', href: '/membership' },
      ],
    },
  },
}

function mergeHighlightCards(englishCards = [], amharicCards = []) {
  if (!amharicCards.length) return englishCards
  return englishCards.map((card, index) => mergeLocalizedContent(card, amharicCards[index] || {}))
}

function mergeDonationLevels(englishLevels = [], amharicLevels = []) {
  if (!amharicLevels.length) return englishLevels
  return englishLevels.map((level, index) => mergeLocalizedContent(level, amharicLevels[index] || {}))
}

function mergeLinks(englishLinks = [], amharicLinks = []) {
  if (!amharicLinks.length) return englishLinks
  return englishLinks.map((link, index) => mergeLocalizedContent(link, amharicLinks[index] || {}))
}

export function getSupportPageContent(language = 'en', remoteContent = null) {
  const en = supportPageContent.en
  if (language !== 'am') {
    if (remoteContent?.content) {
      return mergeLocalizedContent(en, remoteContent.content)
    }
    return en
  }

  const am = supportPageContent.am
  const remoteAm = remoteContent?.content_am || {}

  const donation = {
    ...mergeLocalizedContent(mergeLocalizedContent(en.donation, am.donation), remoteAm.donation),
    levels: mergeDonationLevels(
      en.donation.levels,
      remoteAm.donation?.levels?.length ? remoteAm.donation.levels : am.donation.levels,
    ),
    form: {
      ...mergeLocalizedContent(mergeLocalizedContent(en.donation.form, am.donation.form), remoteAm.donation?.form),
      formUrl: donationFormUrl,
    },
  }

  return {
    hero: mergeLocalizedContent(mergeLocalizedContent(en.hero, am.hero), remoteAm.hero),
    donation,
    otherOptions: {
      ...mergeLocalizedContent(mergeLocalizedContent(en.otherOptions, am.otherOptions), remoteAm.otherOptions),
      links: mergeLinks(
        en.otherOptions.links,
        remoteAm.otherOptions?.links?.length ? remoteAm.otherOptions.links : am.otherOptions.links,
      ),
    },
    volunteer: mergeLocalizedContent(
      mergeLocalizedContent(en.volunteer, am.volunteer),
      remoteAm.volunteer,
    ),
    finalCta: {
      ...mergeLocalizedContent(mergeLocalizedContent(en.finalCta, am.finalCta), remoteAm.finalCta),
      buttons: mergeLinks(
        en.finalCta.buttons,
        remoteAm.finalCta?.buttons?.length ? remoteAm.finalCta.buttons : am.finalCta.buttons,
      ),
    },
  }
}

export function getSupportHighlightCards(content) {
  return content?.hero?.highlightCards || []
}
