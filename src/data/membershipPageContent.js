import membershipData from '../content/membership.json'
import faqData from '../content/faq.json'
import formsData from '../content/forms.json'
import { mergeLocalizedContent } from '../utils/homepageLocale'

const membershipFormUrl = formsData.membership?.formUrl || 'https://form.jotform.com/211111215669043'

export const membershipPageContent = {
  en: {
    hero: {
      eyebrow: 'Membership',
      title: 'Join ECAA',
      description:
        'Join the Ethiopian Community Association in Atlanta and help strengthen Ethiopian community life, cultural connection, mutual support, and intergenerational resilience.',
      buttons: [
        {
          label: 'Open Membership Form',
          href: membershipFormUrl,
          style: 'primary',
          external: true,
        },
        { label: 'Learn About EDIR', href: '/programs#edir', style: 'secondary' },
      ],
    },
    overviewCards: [
      { value: 'Membership', label: 'Join the community' },
      { value: 'Community', label: 'Stay connected' },
      { value: 'EDIR', label: 'Mutual support' },
      { value: 'Support', label: 'Programs & services' },
    ],
    benefits: membershipData.benefitsSection,
    membershipCard: {
      badge: 'Standard membership',
      ...membershipData.membershipOption,
      feeLabel: 'Annual fee',
      feeAmount: '$30.00',
      feePerPerson: 'per person',
    },
    checklist: membershipData.beforeYouStart,
    registration: {
      ...membershipData.registration,
      formUrl: membershipFormUrl,
      privacyNote: formsData.membership?.privacyNote || '',
    },
    exploreMore: membershipData.relatedLinks,
    notice: membershipData.notice,
    faq: {
      ...membershipData.faqSection,
      items: faqData.membership || [],
    },
    finalCta: membershipData.finalCta,
  },
  am: {
    hero: {
      eyebrow: 'አባልነት',
      title: 'ECAAን ይቀላቀሉ',
      description:
        'በአትላንታ የሚገኘውን የኢትዮጵያ ኮሚኒቲ ማህበርን በመቀላቀል የኢትዮጵያን ማህበረሰብ ህይወት፣ የባህል ትስስር፣ የጋራ መደጋገፍ እና የእርስ በርስ መደጋገፍን ለማጠናከር ይረዱ።',
      buttons: [
        {
          label: 'ክፍት የአባልነት ቅጽ',
          href: membershipFormUrl,
          style: 'primary',
          external: true,
        },
        { label: 'ስለ EDIR ይወቁ', href: '/programs#edir', style: 'secondary' },
      ],
    },
    overviewCards: [
      { value: 'የአባልነት', label: 'ማህበረሰቡን ይቀላቀሉ' },
      { value: 'ማህበረሰብ', label: 'ተገናኝተው ይቆዩ' },
      { value: 'EDIR', label: 'የጋራ ድጋፍ' },
      { value: 'ድጋፍ', label: 'ፕሮግራሞች እና አገልግሎቶች' },
    ],
    benefits: {
      label: 'የአባልነት ዝርዝሮች',
      title: 'የአባልነት ጥቅሞች',
      description:
        'አባልነት የ ECAA ማህበረሰብ ፕሮግራሞችን፣ የባህል እንቅስቃሴዎችን፣ የአመራር ስራዎችን እና በአትላንታ አካባቢ ላሉ ኢትዮጵያውያን እና አሜሪካውያን አገልግሎቶችን ለመደገፍ ይረዳል።',
      items: [
        'የማህበረሰብ ፕሮግራሞችን እና አገልግሎቶችን ይደግፉ',
        'ከECAA ማስታወቂያዎች እና ዝግጅቶች ጋር እንደተገናኙ ይቆዩ',
        'ብቁ በሚሆንበት ጊዜ በማህበረሰብ ውሳኔ አሰጣጥ ላይ ይሳተፉ',
        'የኢትዮጵያን ባህል እና ቅርስ ለመጠበቅ ያግዙ',
        'ወጣቶችን፣ ቤተሰቦችን፣ ሽማግሌዎችን እና ትውልድን የሚያካትቱ ፕሮግራሞችን ይደግፉ',
        'አስፈላጊ በሚሆንበት ጊዜ ለEDIR እና የጋራ ድጋፍ ጥረቶች አስተዋጽኦ ያድርጉ',
      ],
    },
    membershipCard: {
      badge: 'መደበኛ አባልነት',
      title: 'ECAA አባልነት',
      feeLabel: 'ዓመታዊ ክፍያ',
      feeAmount: '$30.00',
      feePerPerson: 'በአንድ ሰው',
      ctaLabel: 'ምዝገባ ይጀምሩ',
    },
    checklist: {
      items: [
        'ሙሉ ስም',
        'የትውልድ ቀን',
        'የስልክ ቁጥር',
        'የኢሜል አድራሻ',
        'ቋሚ አድራሻ',
        'የሂሳብ አከፋፈል አድራሻ',
        'የትዳር ጓደኛ መረጃ ካለ',
        'የልጆች መረጃ ካለ',
        'የተመደበ ተወካይ መረጃ ካለ',
        'የፊርማ ማረጋገጫ',
      ],
    },
    registration: {
      ctaLabel: 'የአባልነት ቅጽ ይክፈቱ',
      privacyNote:
        'መረጃዎ ከECAA ጋር ደህንነቱ የተጠበቀ ሲሆን ለግብይት እና ለማስተዋወቂያ ዓላማዎች ለሶስተኛ ወገኖች አይጋራም ወይም አይሸጥም።',
      importantNote: '',
    },
    exploreMore: {
      links: [
        { label: 'ትምህርት እና ስልጠና', path: '/programs#education-training' },
        { label: 'በጎ ፈቃደኝነት', path: '/support#volunteer' },
        { label: 'ዝግጅቶች', path: '/events' },
        { label: 'ECAAን ያነጋግሩ', path: '/contact' },
      ],
    },
    faq: {
      title: 'የአባልነት ተደጋጋሚ ጥያቄዎች',
      items: [
        { id: 'how-to-join', question: 'አባል እንዴት እሆናለሁ?' },
        { id: 'form-secure', question: 'የአባልነት ቅጹ ደህንነቱ የተጠበቀ ነው?' },
        { id: 'leave-website', question: 'ከECAA ድህረ ገጽ እወጣለሁ?' },
        { id: 'form-fields', question: 'ቅጹ ምን መረጃ ይጠይቃል?' },
        { id: 'membership-fee', question: 'አባልነት ምን ያህል ነው?' },
        {
          id: 'edir-membership',
          question: 'ECAA ከEDIR ጋር የተያያዘ አባልነት አለው?',
          answer:
            'የምዝገባ ሂደቱ ከEDIR ጋር የተያያዘ ይፋ ማድረግን ወይም የአባልነት መረጃን ሊያካትት ይችላል። ከመፈረምዎ በፊት እባክዎ ቅጹን በጥንቃቄ ያንብቡ እና ጥያቄዎች ካሉዎት ECAA ን ያነጋግሩ።',
        },
      ],
    },
  },
}

function mergeFaqItems(englishItems = [], amharicItems = []) {
  if (!amharicItems.length) return englishItems

  const amById = Object.fromEntries(amharicItems.filter((item) => item?.id).map((item) => [item.id, item]))

  return englishItems.map((item) => {
    const overlay = amById[item.id]
    if (!overlay) return item
    return {
      ...item,
      question: overlay.question || item.question,
      answer: overlay.answer || item.answer,
    }
  })
}

function mergeLinkArray(englishLinks = [], amharicLinks = []) {
  if (!amharicLinks.length) return englishLinks
  return englishLinks.map((link, index) => mergeLocalizedContent(link, amharicLinks[index] || {}))
}

export function getMembershipPageContent(language = 'en', remoteContent = null) {
  const en = membershipPageContent.en
  if (language !== 'am') {
    if (remoteContent?.content) {
      return mergeLocalizedContent(en, remoteContent.content)
    }
    return en
  }

  const am = membershipPageContent.am
  const remoteAm = remoteContent?.content_am || {}

  return {
    hero: mergeLocalizedContent(mergeLocalizedContent(en.hero, am.hero), remoteAm.hero),
    overviewCards: mergeLinkArray(en.overviewCards, remoteAm.overviewCards?.length ? remoteAm.overviewCards : am.overviewCards),
    benefits: {
      ...mergeLocalizedContent(mergeLocalizedContent(en.benefits, am.benefits), remoteAm.benefits),
      items: remoteAm.benefits?.items?.length
        ? remoteAm.benefits.items
        : am.benefits?.items?.length
          ? am.benefits.items
          : en.benefits.items,
    },
    membershipCard: mergeLocalizedContent(
      mergeLocalizedContent(en.membershipCard, am.membershipCard),
      remoteAm.membershipCard,
    ),
    checklist: {
      ...mergeLocalizedContent(mergeLocalizedContent(en.checklist, am.checklist), remoteAm.checklist),
      items: remoteAm.checklist?.items?.length
        ? remoteAm.checklist.items
        : am.checklist?.items?.length
          ? am.checklist.items
          : en.checklist.items,
    },
    registration: {
      ...mergeLocalizedContent(mergeLocalizedContent(en.registration, am.registration), remoteAm.registration),
      formUrl: membershipFormUrl,
      importantNote: am.registration?.importantNote ?? '',
    },
    notice: mergeLocalizedContent(mergeLocalizedContent(en.notice, am.notice), remoteAm.notice),
    faq: {
      ...mergeLocalizedContent(mergeLocalizedContent(en.faq, am.faq), remoteAm.faq),
      items: mergeFaqItems(
        en.faq.items,
        remoteAm.faq?.items?.length ? remoteAm.faq.items : am.faq?.items,
      ),
    },
    finalCta: {
      ...mergeLocalizedContent(en.finalCta, remoteAm.finalCta || am.finalCta || {}),
      buttons: mergeLinkArray(
        en.finalCta.buttons,
        remoteAm.finalCta?.buttons || am.finalCta?.buttons,
      ),
    },
  }
}
