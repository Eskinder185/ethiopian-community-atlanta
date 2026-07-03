import programsData from '../content/programs.json'
import { mergeLocalizedContent } from '../utils/homepageLocale'

const sharedLinks = {
  explorePrograms: { label: 'Explore Programs', href: '#community-programs' },
  contactEcaa: { label: 'Contact ECAA', href: '/contact' },
}

export const programsPageContent = {
  en: {
    hero: {
      eyebrow: 'Programs & Services',
      title: 'Programs That Bring Our Community Together',
      description:
        'ECAA offers programs and services that preserve culture, support families, empower youth, promote wellness, encourage service, and strengthen the Ethiopian community in Atlanta.',
      buttons: [
        { label: sharedLinks.explorePrograms.label, href: sharedLinks.explorePrograms.href, style: 'primary' },
        { label: sharedLinks.contactEcaa.label, href: sharedLinks.contactEcaa.href, style: 'secondary' },
      ],
    },
    overviewCards: [
      { value: 'Community Support', label: 'Resources, guidance, and connection' },
      { value: 'Culture', label: 'Celebrating heritage, tradition, and identity' },
      { value: 'Youth & Education', label: 'Learning, mentorship, and growth' },
      { value: 'EDIR', label: 'Mutual support, care, and shared responsibility' },
    ],
    intro: {
      title: programsData.overview.title,
      description: programsData.overview.description,
      subtext: programsData.overview.subtext,
      commonStatus: 'Details Coming Soon',
      commonButton: 'View Program Details',
    },
    detailsComingSoon: programsData.detailsPlaceholder,
    interestForms: programsData.interestForms,
    finalCta: programsData.closingCta,
    detailLabels: {
      programOverview: 'Overview',
      programDetails: 'Program Details',
      programDetailsIntro:
        'Additional information about this program will be expanded as ECAA finalizes schedules, resources, and community offerings.',
      programMedia: 'Program Media',
      programMediaIntro:
        'Photos, videos, flyers, and community moments related to this program can be added here by ECAA editors.',
      mediaEmpty: 'Media for this program will be added soon.',
      mediaComingSoon: 'Media coming soon',
      registrationInterest: 'Registration & Interest',
      registrationEmpty: 'Registration or interest forms for this program will be shared when available.',
      linksResources: 'Links & Resources',
      linksResourcesIntro:
        'Helpful links, forms, documents, and community resources can be added here by ECAA editors.',
      resourcesEmpty: 'Helpful links and resources will be added soon.',
      resourcesComingSoon: 'Resources coming soon',
      overviewFallback: 'More information about this program will be added as details become available.',
      programNotFoundEyebrow: 'Program not found',
      programNotFoundTitle: 'Program not found',
      programNotFoundDescription:
        'The program you are looking for may have moved or is not yet published.',
      loading: 'Loading program…',
      interestFormComingSoon: 'Interest form coming soon.',
      formsEmpty: 'Program interest forms will be shared as they become available.',
    },
  },
  am: {
    hero: {
      eyebrow: 'ፕሮግራሞች እና አገልግሎቶች',
      title: 'ማህበረሰባችንን አንድ ላይ የሚያሰባስቡ ፕሮግራሞች',
      description:
        'ECAA ባህልን የሚጠብቁ፣ ቤተሰቦችን የሚደግፉ፣ ወጣቶችን የሚያበረታቱ፣ ጤናን የሚያበረታቱ፣ አገልግሎትን የሚያበረታቱ እና በአትላንታ የሚገኘውን የኢትዮጵያን ማህበረሰብ የሚያጠናክሩ ፕሮግራሞችን እና አገልግሎቶችን ይሰጣል።',
      buttons: [
        { label: 'ፕሮግራሞችን ያስሱ', href: '#community-programs', style: 'primary' },
        { label: 'ECAAን ያግኙ', href: '/contact', style: 'secondary' },
      ],
    },
    overviewCards: [
      { value: 'የማህበረሰብ ድጋፍ', label: 'ሀብቶች፣ መመሪያ እና ግንኙነት' },
      { value: 'ባህል', label: 'ቅርስን፣ ወግን እና ማንነትን ማክበር' },
      { value: 'ወጣቶች እና ትምህርት', label: 'መማር፣ የምክር አገልግሎት እና እድገት' },
      { value: 'EDIR', label: 'የጋራ ድጋፍ፣ እንክብካቤ እና የጋራ ኃላፊነት' },
    ],
    intro: {
      title: 'የትምህርት እና የሥልጠና ፕሮግራሞች',
      description:
        'የECAA የትምህርት እና የሥልጠና ፕሮግራሞች ልጆችን፣ ወጣቶችን፣ ወላጆችን፣ ቤተሰቦችን እና ሰፊውን ማህበረሰብ በተግባራዊ ትምህርት፣ ግንዛቤ፣ መከላከል፣ ደህንነት እና የአመራር ልማት ይደግፋሉ።',
      subtext: 'የፕሮግራም ቀናት፣ የክፍለ ጊዜ ዝርዝሮች፣ ብቁነት እና የምዝገባ መረጃ ሲገኙ ይፋ ይደረጋሉ።',
      commonStatus: 'ዝርዝሮች በቅርቡ ይመጣሉ',
      commonButton: 'የፕሮግራም ዝርዝሮችን ይመልከቱ',
    },
    detailsComingSoon: {
      title: 'የፕሮግራም ዝርዝሮች በቅርቡ ይመጣሉ',
      description:
        'ECAA የፕሮግራም ዝርዝሮችን፣ መርሃ ግብሮችን፣ የምዝገባ ደረጃዎችን እና የበጎ ፈቃደኝነት እድሎችን ማደራጀቱን ቀጥሏል። ፕሮግራሞች ሲጠናቀቁ መረጃ ይታከላል።',
      cards: [
        {
          title: 'ቀናት እና ክፍለ ጊዜዎች',
          description: 'የፕሮግራም ቀናት እና የክፍለ ጊዜ መርሃ ግብሮች በቅርቡ ይፋ ይደረጋሉ።',
        },
        {
          title: 'ምዝገባ',
          description: 'የምዝገባ ወይም የፍላጎት ቅጾች ሲኖሩ ይጋራሉ።',
        },
        {
          title: 'በጎ ፈቃደኞች',
          description: 'ለተመረጡ ፕሮግራሞች የበጎ ፈቃደኞች እድሎች ሊኖሩ ይችላሉ።',
        },
        {
          title: 'ሀብቶች',
          description: 'ፕሮግራሞች ሲገነቡ ጠቃሚ የማህበረሰብ ሀብቶች ሊታከሉ ይችላሉ።',
        },
        {
          title: 'አግኙን',
          description: 'ለአሁኑ መረጃ፣ እባክዎን ECAAን በቀጥታ ያነጋግሩ።',
        },
      ],
    },
    interestForms: {
      title: 'የፕሮግራም የፍላጎት ቅጾች',
      description:
        'አንዳንድ የECAA ፕሮግራሞች ተሳትፎን፣ በጎ ፈቃደኞችን እና የወደፊት ክፍለ ጊዜዎችን ለማደራጀት የፍላጎት ቅጾችን ሊጠቀሙ ይችላሉ።',
      contactPath: '/contact',
      forms: [
        {
          id: 'student-interest-form',
          category: 'ወጣቶች እና ትምህርት',
          title: 'የተማሪ የፍላጎት ቅጽ',
          description: 'ለECAA ወጣቶች እና የትምህርት ፕሮግራሞች የተማሪ የፍላጎት መረጃ ያስገቡ።',
          url: 'https://docs.google.com/forms/d/e/1FAIpQLSeCofxWdhA6Oc49trML_3uusOLu8dANcMp0Xi3OaxCtbtx1YA/viewform',
          ctaLabel: 'የተማሪ ፍላጎት ይመዝገቡ',
          published: true,
        },
        {
          id: 'volunteer-information-form',
          category: 'የበጎ ፈቃደኞች እና የሲቪክ ተሳትፎ',
          title: 'የበጎ ፈቃደኞች መረጃ ቅጽ',
          description: 'የበጎ ፈቃደኞችዎን ፍላጎት እና ተገኝነት ያጋሩ።',
          url: 'https://docs.google.com/forms/d/e/1FAIpQLScqZHcyvOK4aF1GCrVh2pNeTbvQCAOG6Fpo1Zez27k4OLi0fg/viewform',
          ctaLabel: 'በጎ ፈቃደኛ ይሁኑ',
          published: true,
        },
      ],
    },
    detailLabels: {
      programOverview: 'የፕሮግራም አጠቃላይ እይታ',
      programDetails: 'የፕሮግራም ዝርዝሮች',
      programDetailsIntro:
        'የፕሮግራሙ ተጨማሪ መረጃ መርሃ ግብሮች፣ ሀብቶች እና የማህበረሰብ አገልግሎቶች ሲጠናቀቁ ይሰፋል።',
      programMedia: 'የፕሮግራም ሚዲያ',
      programMediaIntro: 'የዚህ ፕሮግራም ፎቶዎች፣ ቪዲዮዎች፣ ፍላየሮች እና የማህበረሰብ ቅጽበቶች በቅርቡ ሊታከሉ ይችላሉ።',
      mediaEmpty: 'የዚህ ፕሮግራም ሚዲያ በቅርቡ ይታከላል።',
      mediaComingSoon: 'ሚዲያ በቅርቡ',
      registrationInterest: 'ምዝገባ እና ፍላጎት',
      registrationEmpty: 'የዚህ ፕሮግራም ምዝገባ ወይም የፍላጎት ቅጾች ሲገኙ ይጋራሉ።',
      linksResources: 'አገናኞች እና ሀብቶች',
      linksResourcesIntro: 'ጠቃሚ አገናኞች፣ ቅጾች እና ሀብቶች በቅርቡ ሊታከሉ ይችላሉ።',
      resourcesEmpty: 'ጠቃሚ አገናኞች እና ሀብቶች በቅርቡ ይታከላሉ።',
      resourcesComingSoon: 'ሀብቶች በቅርቡ',
      overviewFallback: 'የፕሮግራሙ ተጨማሪ መረጃ ዝርዝሮች ሲገኙ ይታከላል።',
      programNotFoundEyebrow: 'ፕሮግራም አልተገኘም',
      programNotFoundTitle: 'ፕሮግራም አልተገኘም',
      programNotFoundDescription: 'የሚፈልጉት ፕሮግራም ሊዛወር ወይም ገና ላልታተመ ሊሆን ይችላል።',
      loading: 'ፕሮግራም በመጫን ላይ…',
      interestFormComingSoon: 'የፍላጎት ቅጽ በቅርቡ ይገኛል።',
      formsEmpty: 'የፕሮግራም የፍላጎት ቅጾች ሲገኙ ይጋራሉ።',
    },
    finalCta: {
      title: 'ስለ ECAA ፕሮግራሞች ጥያቄዎች አሉዎት?',
      buttons: [
        { label: 'ECAAን ያነጋግሩ', href: '/contact' },
        { label: 'ዝግጅቶችን ይመልከቱ', href: '/events' },
      ],
    },
  },
}

function mergeSectionArray(englishItems = [], amharicItems = []) {
  if (!amharicItems.length) return englishItems
  return englishItems.map((item, index) => mergeLocalizedContent(item, amharicItems[index] || {}))
}

export function getProgramsPageContent(language = 'en') {
  const en = programsPageContent.en
  if (language !== 'am') return en

  const am = programsPageContent.am

  return {
    hero: mergeLocalizedContent(en.hero, am.hero),
    overviewCards: mergeSectionArray(en.overviewCards, am.overviewCards),
    intro: mergeLocalizedContent(en.intro, am.intro),
    detailsComingSoon: {
      ...mergeLocalizedContent(en.detailsComingSoon, am.detailsComingSoon),
      cards: am.detailsComingSoon?.cards?.length
        ? am.detailsComingSoon.cards
        : en.detailsComingSoon.cards,
    },
    interestForms: {
      ...mergeLocalizedContent(en.interestForms, am.interestForms),
      forms: am.interestForms?.forms?.length ? am.interestForms.forms : en.interestForms.forms,
    },
    finalCta: {
      ...mergeLocalizedContent(en.finalCta, am.finalCta),
      buttons: mergeSectionArray(en.finalCta.buttons, am.finalCta?.buttons),
    },
    detailLabels: mergeLocalizedContent(en.detailLabels, am.detailLabels),
  }
}

export function getProgramDetailLabels(language = 'en') {
  return getProgramsPageContent(language).detailLabels
}
