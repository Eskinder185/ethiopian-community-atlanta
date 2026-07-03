import contactData from '../content/contact.json'
import { mergeLocalizedContent } from '../utils/homepageLocale'

const { general, departments, closingNote } = contactData
const { address, mailingAddress } = general

const cityLine = `${address.city}, ${address.state} ${address.zip}`
const mailingLine = `${mailingAddress.street}, ${mailingAddress.city}, ${mailingAddress.state} ${mailingAddress.zip}`

export const contactPageContent = {
  en: {
    hero: {
      eyebrow: 'Contact ECAA',
      title: 'Connect With the Ethiopian Community Association in Atlanta',
      description:
        'Find ECAA contact information, location details, office information, and ways to reach the team.',
      buttons: [
        { label: 'Email ECAA', href: 'mailto:staff@ethiopiancaa.org', style: 'primary' },
        { label: 'Get Directions', href: '#visit-ecaa', style: 'secondary' },
      ],
    },
    summaryCards: [
      { value: 'Stone Mountain', label: 'Location' },
      { value: 'Email', label: general.email },
      { value: 'Phone', label: general.phone },
      { value: 'Office Hours', label: 'Mon–Fri & Saturday' },
    ],
    contactInfo: {
      title: 'Contact information',
      email: { label: 'Email', value: general.email },
      phone: { label: 'Phone', value: general.phone },
      secondaryPhone: { label: 'Additional phone', value: general.secondaryPhone },
      hours: { label: 'Office hours', value: general.hours },
      address: {
        label: 'Address',
        lines: [address.street, cityLine, address.country],
      },
      mailingAddress: {
        label: 'Mailing address',
        value: mailingLine,
      },
    },
    visit: {
      id: 'visit-ecaa',
      title: 'Visit ECAA',
      text: `ECAA is located at ${address.street}, ${cityLine}. Contact ECAA for directions or appointment details.`,
      imageAlt: 'ECAA community gathering and welcome image for visitors.',
    },
    departmentContacts: departments.map((dept) => ({
      ...dept,
      emailLabel: 'Email:',
      phoneLabel: 'Phone:',
    })),
    departmentsTitle: 'Department contacts',
    finalCta: {
      title: 'Ready to get involved?',
      description: closingNote,
      buttons: [
        { label: 'Become a Member', href: '/membership' },
        { label: 'Support ECAA', href: '/support' },
        { label: 'View Events', href: '/events' },
      ],
    },
  },
  am: {
    hero: {
      eyebrow: 'ECAA ያግኙ',
      title: 'አትላንታ ከሚገኘው የኢትዮጵያ ኮሚኒቲ ማህበር ጋር ይገናኙ',
      description:
        'የECAA አድራሻ መረጃን፣ የአካባቢ ዝርዝሮችን፣ የቢሮ መረጃን እና ቡድኑን ለማግኘት መንገዶችን ያግኙ።',
      buttons: [
        { label: 'ኢሜል ECAA', href: 'mailto:staff@ethiopiancaa.org', style: 'primary' },
        { label: 'አቅጣጫ ያግኙ', href: '#visit-ecaa', style: 'secondary' },
      ],
    },
    summaryCards: [
      { value: 'ስቶን ማውንቴን', label: 'ቦታ' },
      { value: 'ኢሜይል', label: general.email },
      { value: 'ስልክ', label: general.phone },
      { value: 'የቢሮ ሰዓቶች', label: 'ሰኞ-አርብ እና ቅዳሜ' },
    ],
    contactInfo: {
      title: 'የእውቂያ መረጃ',
      email: { label: 'ኢሜይል', value: general.email },
      phone: { label: 'ስልክ', value: general.phone },
      secondaryPhone: { label: 'ተጨማሪ ስልክ', value: general.secondaryPhone },
      hours: {
        label: 'የቢሮ ሰዓቶች',
        value: 'ሰኞ - አርብ: ከጠዋቱ 10:00 እስከ ምሽቱ 6:00\nቅዳሜ: ከጠዋቱ 9:00 እስከ ምሽቱ 2:00\nእሁድ: ዝግ',
      },
      address: {
        label: 'አድራሻ',
        lines: [address.street, cityLine, address.country],
      },
      mailingAddress: {
        label: 'የፖስታ አድራሻ',
        value: 'P.O. Box 494, Clarkston, GA 30021',
      },
    },
    visit: {
      id: 'visit-ecaa',
      title: 'ECAAን ይጎብኙ',
      text: 'ECAA በ5616 Memorial Dr, Stone Mountain, GA 30083 ይገኛል። ለአቅጣጫ ወይም ለቀጠሮ ዝርዝሮች ECAAን ያግኙ።',
      imageAlt: 'የECAA ማህበረሰብ ስብሰባ እና ለጎብኚዎች የእንኳን ደህና መጡ ምስል።',
    },
    departmentContacts: [
      {
        id: 'legal',
        title: 'የህግ ጥያቄዎች',
        description: 'ለህጋዊ እና ለድርጅታዊ ጉዳዮች ECAAን ያግኙ።',
        email: 'legal@ethiopiancaa.org',
        phone: '',
        emailLabel: 'ኢሜል፡',
        published: true,
      },
      {
        id: 'elections',
        title: 'የምርጫ ጥያቄዎች',
        description: 'ስለ ምርጫዎች እና እጩዎች ECAAን ያነጋግሩ።',
        email: 'ECAAelections@gmail.com',
        phone: '',
        emailLabel: 'ኢሜል፡',
        published: true,
      },
      {
        id: 'membership-forms',
        title: 'የአባልነት እና የልገሳ ቅጾች',
        description: 'በECAA የአባልነት እና የልገሳ ቅጾች ላይ የተዘረዘረ ተጨማሪ የስልክ ቁጥር።',
        email: 'staff@ethiopiancaa.org',
        phone: '404-254-0747',
        emailLabel: 'ኢሜል፡',
        phoneLabel: 'ስልክ፡',
        published: true,
      },
    ],
    departmentsTitle: 'የመምሪያ እውቂያዎች',
    finalCta: {
      title: 'ለመሳተፍ ዝግጁ ነዎት?',
      description:
        'በቢሮ ሰዓት ECAAን በኢሜል፣ በስልክ ወይም በመጎብኘት ያግኙ። ECAA ስለ አባልነት፣ ፕሮግራሞች፣ ዝግጅቶች፣ አመራር እና የማህበረሰብ ድጋፍ ጥያቄዎችን በደስታ ይቀበላል።',
      buttons: [
        { label: 'አባል ይሁኑ', href: '/membership' },
        { label: 'ECAAን ይደግፉ', href: '/support' },
        { label: 'ዝግጅቶችን ይመልከቱ', href: '/events' },
      ],
    },
  },
}

function mergeDepartmentContacts(englishItems = [], amharicItems = []) {
  if (!amharicItems.length) return englishItems
  const amById = Object.fromEntries(amharicItems.filter((item) => item?.id).map((item) => [item.id, item]))
  return englishItems.map((item) => {
    const overlay = amById[item.id]
    return overlay ? mergeLocalizedContent(item, overlay) : item
  })
}

function mergeSummaryCards(englishItems = [], amharicItems = []) {
  if (!amharicItems.length) return englishItems
  return englishItems.map((item, index) => mergeLocalizedContent(item, amharicItems[index] || {}))
}

export function getContactPageContent(language = 'en') {
  const en = contactPageContent.en
  if (language !== 'am') return en

  const am = contactPageContent.am

  return {
    hero: mergeLocalizedContent(en.hero, am.hero),
    summaryCards: mergeSummaryCards(en.summaryCards, am.summaryCards),
    contactInfo: {
      ...mergeLocalizedContent(en.contactInfo, am.contactInfo),
      email: mergeLocalizedContent(en.contactInfo.email, am.contactInfo?.email),
      phone: mergeLocalizedContent(en.contactInfo.phone, am.contactInfo?.phone),
      secondaryPhone: mergeLocalizedContent(en.contactInfo.secondaryPhone, am.contactInfo?.secondaryPhone),
      hours: mergeLocalizedContent(en.contactInfo.hours, am.contactInfo?.hours),
      address: {
        ...mergeLocalizedContent(en.contactInfo.address, am.contactInfo?.address),
        lines: en.contactInfo.address.lines,
      },
      mailingAddress: mergeLocalizedContent(en.contactInfo.mailingAddress, am.contactInfo?.mailingAddress),
    },
    visit: mergeLocalizedContent(en.visit, am.visit),
    departmentContacts: mergeDepartmentContacts(en.departmentContacts, am.departmentContacts),
    departmentsTitle: am.departmentsTitle || en.departmentsTitle,
    finalCta: {
      ...mergeLocalizedContent(en.finalCta, am.finalCta),
      buttons: am.finalCta?.buttons?.length ? am.finalCta.buttons : en.finalCta.buttons,
    },
  }
}
