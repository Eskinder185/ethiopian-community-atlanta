import { mergeLocalizedContent } from "../utils/homepageLocale";

const sharedLinks = {
  missionVision: { label: "Mission & Vision", href: "#mission-vision" },
  viewLeadership: { label: "View Leadership", href: "/leadership" },
  becomeMember: { label: "Become a Member", href: "/membership" },
  viewEvents: { label: "View Events", href: "/events" },
  supportEcaa: { label: "Support ECAA", href: "/support" },
};

export const aboutPageContent = {
  en: {
    hero: {
      eyebrow: "About ECAA",
      title: "Learn About the Community Behind ECAA",
      description:
        "Discover ECAA's mission, history, leadership, and continued work to serve, connect, and empower Ethiopians and Ethiopian Americans in Atlanta and surrounding communities.",
      buttons: [
        {
          label: sharedLinks.missionVision.label,
          href: sharedLinks.missionVision.href,
          style: "primary",
        },
        {
          label: sharedLinks.viewLeadership.label,
          href: sharedLinks.viewLeadership.href,
          style: "secondary",
        },
      ],
    },
    highlights: [
      { value: "Mission", label: "Serving with purpose, unity, and vision" },
      { value: "History", label: "Honoring our story and community journey" },
      { value: "Leadership", label: "Guided by trusted community leadership" },
      { value: "Community", label: "Connecting Atlanta and beyond" },
    ],
    values: [
      {
        id: "community",
        title: "Community",
        description: "Serving Ethiopians and Ethiopian-Americans in Atlanta.",
      },
      {
        id: "culture",
        title: "Culture",
        description: "Preserving heritage through connection, events, and programs.",
      },
      {
        id: "resilience",
        title: "Resilience",
        description: "Strengthening families, youth, elders, and community support.",
      },
    ],
    missionVision: {
      id: "mission-vision",
      eyebrow: "Purpose",
      title: "Mission & Vision",
      intro:
        "ECAA is guided by a commitment to building intergenerational connections and strengthening community resilience.",
      cards: [
        {
          title: "Mission",
          body: "ECAA serves, empowers, and advances the interests of Ethiopians and Ethiopian Americans in Atlanta and surrounding areas. We promote cultural pride, community support, education, civic connection, and successful integration into American society while preserving the values and traditions that unite us.",
        },
        {
          title: "Vision",
          body: "A connected, resilient, and thriving Ethiopian community in Atlanta where generations support one another, preserve their heritage, and contribute positively to the broader society.",
        },
      ],
    },
    history: {
      id: "history",
      eyebrow: "Our Story",
      title: "History",
      intro:
        "Founded in 1983, the Ethiopian Community Association in Atlanta was created by Ethiopian community members who wanted to help newcomers adjust to life in Atlanta while preserving Ethiopian culture and building a stronger community. ECAA has served as a community institution for Ethiopians and Ethiopian-Americans in Georgia, supporting cultural preservation, community engagement, mutual aid, and access to services.",
      highlightsHeading: "Key moments",
      highlights: [
        "Founded in 1983 by Ethiopian community members in the Atlanta area",
        "Created to support newcomers and preserve Ethiopian culture in Georgia",
        "Serves as a gathering point for families, youth, elders, and volunteers",
        "Supports cultural preservation and community resilience across generations",
      ],
    },
    howItWorks: {
      id: "how-ecaa-works",
      eyebrow: "Community",
      title: "How ECAA Works",
      intro:
        "ECAA operates as a volunteer-led community organization connecting members to programs, resources, and opportunities.",
      items: [
        "Volunteer-led and community-centered",
        "Guided by elected leadership and committees",
        "Supports cultural, social, educational, health, and EDIR-related activities",
        "Connects community members to programs, events, resources, and opportunities",
        "Uses membership, donations, sponsorship, and volunteer service to sustain programs",
      ],
    },
    leadershipStructure: {
      id: "leadership-structure",
      eyebrow: "Governance",
      title: "Leadership Structure",
      intro:
        "ECAA leadership includes an Executive Committee, Governing Board, Audit Committee, Advisory Board, and EDIR Committee. Learn more about the people serving in these roles.",
      groups: [
        {
          id: "executive-committee",
          title: "Executive Committee",
          description:
            "ECAA executive leadership responsible for day-to-day organizational direction, program coordination, and community service.",
        },
        {
          id: "board-of-directors",
          title: "Board of Directors",
          description:
            "Governing board members who provide oversight and guidance for ECAA's mission and community work.",
        },
        {
          id: "audit-committee",
          title: "Audit Committee",
          description:
            "Committee members responsible for audit oversight and financial accountability.",
        },
        {
          id: "advisory-board",
          title: "Advisory Board",
          description:
            "Advisory members who support ECAA with guidance, expertise, and community perspective.",
        },
        {
          id: "edir-committee",
          title: "Edir Committee",
          description:
            "Leadership connected to EDIR-related community support and governance within ECAA.",
        },
      ],
      linkLabel: sharedLinks.viewLeadership.label,
      linkTo: sharedLinks.viewLeadership.href,
    },
    finalCta: {
      title: "Ready to connect with ECAA?",
      description:
        "Become a member, explore upcoming events, or learn how to support community programs.",
      buttons: [
        { label: sharedLinks.becomeMember.label, href: sharedLinks.becomeMember.href },
        { label: sharedLinks.viewEvents.label, href: sharedLinks.viewEvents.href },
        { label: sharedLinks.supportEcaa.label, href: sharedLinks.supportEcaa.href },
      ],
    },
  },
  am: {
    hero: {
      eyebrow: "ስለ ECAA",
      title: "ስለ ECAA በስተጀርባ ስላለው ማህበረሰብ ይወቁ",
      description:
        "የECAAን ተልዕኮ፣ ታሪክ፣ አመራር እና በአትላንታ እና በአካባቢው ማህበረሰቦች ውስጥ ኢትዮጵያውያንን እና ኢትዮጵያውያን አሜሪካውያንን ለማገልገል፣ ለማገናኘት እና ለማብቃት የቀጠለውን ስራ ያግኙ።",
      buttons: [
        { label: "ተልዕኮ እና ራዕይ", href: "#mission-vision", style: "primary" },
        { label: "አመራርን ይመልከቱ", href: "/leadership", style: "secondary" },
      ],
    },
    highlights: [
      { value: "ተልዕኮ", label: "በዓላማ፣ በአንድነት እና በራዕይ ማገልገል" },
      { value: "ታሪክ", label: "ታሪካችንን እና የማህበረሰብ ጉዞአችንን ማክበር" },
      { value: "አመራር", label: "በታመነ የማህበረሰብ አመራር የሚመራ" },
      { value: "ማህበረሰብ", label: "አትላንታን እና ከዚያም በላይ ማገናኘት" },
    ],
    values: [
      {
        id: "community",
        title: "ማህበረሰብ",
        description: "በአትላንታ ውስጥ ኢትዮጵያውያንን እና ኢትዮጵያውያንን አሜሪካውያንን ማገልገል።",
      },
      {
        id: "culture",
        title: "ባህል",
        description: "ቅርስን በግንኙነት፣ በዝግጅቶች እና በፕሮግራሞች መጠበቅ።",
      },
      {
        id: "resilience",
        title: "ጽናት",
        description: "ቤተሰቦችን፣ ወጣቶችን፣ ሽማግሌዎችን እና የማህበረሰብ ድጋፍን ማጠናከር።",
      },
    ],
    missionVision: {
      eyebrow: "ዓላማ",
      title: "ተልዕኮ እና ራዕይ",
      intro: "ECAA የሚመራው በትውልዶች መካከል ያሉ ግንኙነቶችን ለመገንባት እና የማህበረሰብን የመቋቋም አቅም ለማጠናከር ባለው ቁርጠኝነት ነው።",
      cards: [
        {
          title: "ተልዕኮ",
          body: "ECAA በአትላንታ እና አካባቢው ያሉ ኢትዮጵያውያንን እና ኢትዮጵያውያን አሜሪካውያንን ጥቅም ያገለግላል፣ ያጎለብታል እና ያሳድጋል። የባህል ኩራትን፣ የማህበረሰብ ድጋፍን፣ ትምህርትን፣ የሲቪክ ግንኙነትን እና አንድ የሚያደርገንን እሴቶችን እና ወጎችን እየጠበቅን በአሜሪካ ማህበረሰብ ውስጥ ስኬታማ ውህደትን እናበረታታለን።",
        },
        {
          title: "ራዕይ",
          body: "ትውልዶች እርስ በርስ የሚደጋገፉበት፣ ቅርሳቸውን የሚጠብቁበት እና ለሰፊው ማህበረሰብ አዎንታዊ አስተዋጽኦ የሚያደርጉበት በአትላንታ የሚገኝ፣ የተሳሰረ፣ ጠንካራ እና የበለፀገ የኢትዮጵያ ማህበረሰብ።",
        },
      ],
    },
    history: {
      eyebrow: "ታሪካችን",
      title: "ታሪክ",
      intro:
        "በ1983 የተመሰረተው በአትላንታ የሚገኘው የኢትዮጵያ ማህበረሰብ ማህበር የተፈጠረው አዲስ መጤዎች በአትላንታ ህይወት እንዲላመዱ ለመርዳት በሚፈልጉ የኢትዮጵያ ማህበረሰብ አባላት ሲሆን የኢትዮጵያን ባህል እየጠበቁ እና ጠንካራ ማህበረሰብ እየገነቡ ነው። ኢሲኤኤ በጆርጂያ ውስጥ ለኢትዮጵያውያን እና ለኢትዮጵያውያን አሜሪካውያን የማህበረሰብ ተቋም ሆኖ አገልግሏል፣ የባህል ጥበቃን፣ የማህበረሰብ ተሳትፎን፣ የጋራ እርዳታን እና የአገልግሎት ተደራሽነትን ይደግፋል።",
      highlightsHeading: "ቁልፍ ጊዜያት",
      highlights: [
        "በ1983 በአትላንታ አካባቢ በኢትዮጵያውያን የማህበረሰብ አባላት የተመሰረተው",
        "አዲስ መጤዎችን ለመደገፍ እና በጆርጂያ የኢትዮጵያን ባህል ለመጠበቅ የተፈጠረ",
        "ለቤተሰቦች፣ ለወጣቶች፣ ለሽማግሌዎች እና ለበጎ ፈቃደኞች የመሰብሰቢያ ቦታ ሆኖ ያገለግላል",
        "በትውልድ የሚተላለፍ የባህል ጥበቃ እና የማህበረሰብ መቋቋምን ይደግፋል",
      ],
    },
    howItWorks: {
      eyebrow: "ማህበረሰብ",
      title: "ኢሲኤኤ እንዴት እንደሚሰራ",
      intro: "ኢሲኤኤ አባላትን ከፕሮግራሞች፣ ሀብቶች እና እድሎች ጋር የሚያገናኝ በበጎ ፈቃደኞች የሚመራ የማህበረሰብ ድርጅት ሆኖ ይሰራል።",
      items: [
        "በፈቃደኝነት የሚመራ እና ማህበረሰብን ማዕከል ያደረገ",
        "በተመረጡ የአመራር እና ኮሚቴዎች የሚመራ",
        "ከባህል፣ ከማህበራዊ፣ ከትምህርት፣ ከጤና እና ከEDIR ጋር የተያያዙ እንቅስቃሴዎችን ይደግፋል",
        "የማህበረሰብ አባላትን ከፕሮግራሞች፣ ከዝግጅቶች፣ ከሀብቶች እና ከዕድሎች ጋር ያገናኛል",
        "ፕሮግራሞችን ለማስቀጠል አባልነትን፣ ልገሳዎችን፣ ስፖንሰርሺፕን እና የበጎ ፈቃድ አገልግሎትን ይጠቀማል",
      ],
    },
    leadershipStructure: {
      eyebrow: "አስተዳደር",
      title: "የአመራር መዋቅር",
      intro:
        "ECAA አመራር የስራ አስፈፃሚ ኮሚቴ፣ የአስተዳደር ቦርድ፣ የኦዲት ኮሚቴ፣ የአማካሪ ቦርድ እና የEDIR ኮሚቴን ያካትታል። በእነዚህ ሚናዎች ውስጥ ስለሚያገለግሉት ሰዎች የበለጠ ይወቁ።",
      groups: [
        {
          id: "executive-committee",
          title: "የስራ አስፈፃሚ ኮሚቴ",
          description:
            "ለዕለታዊ የድርጅታዊ አቅጣጫ፣ ለፕሮግራም ቅንጅት እና ለማህበረሰብ አገልግሎት ኃላፊነት ያለው የECAA ስራ አስፈፃሚ አመራር።",
        },
        {
          id: "board-of-directors",
          title: "የዳይሬክተሮች ቦርድ",
          description: "ለECAA ተልዕኮ እና ለማህበረሰብ ስራ ክትትል እና መመሪያ የሚሰጡ የአስተዳደር ቦርድ አባላት።",
        },
        {
          id: "audit-committee",
          title: "የኦዲት ኮሚቴ",
          description: "ለኦዲት ቁጥጥር እና ለፋይናንስ ተጠያቂነት ኃላፊነት ያላቸው የኮሚቴ አባላት።",
        },
        {
          id: "advisory-board",
          title: "የአማካሪ ቦርድ",
          description: "ECAAን በመምራት፣ በሙያ እና በማህበረሰብ እይታ የሚደግፉ የአማካሪ አባላት።",
        },
        {
          id: "edir-committee",
          title: "የኤዲር ኮሚቴ",
          description: "በECAA ውስጥ ከEDIR ጋር የተያያዘ የማህበረሰብ ድጋፍ እና አስተዳደር ጋር የተገናኘ አመራር።",
        },
      ],
      linkLabel: "አመራርን ይመልከቱ",
    },
    finalCta: {
      title: "ከECAA ጋር ለመገናኘት ዝግጁ ነዎት?",
      description: "አባል ይሁኑ፣ የሚመጡ ዝግጅቶችን ያስሱ ወይም የማህበረሰብ ፕሮግራሞችን እንዴት እንደሚደግፉ ይማሩ።",
      buttons: [
        { label: "አባል ይሁኑ", href: "/membership" },
        { label: "ዝግጅቶችን ይመልከቱ", href: "/events" },
        { label: "ECAAን ይደግፉ", href: "/support" },
      ],
    },
  },
};

function mergeSectionArray(englishItems = [], amharicItems = []) {
  if (!amharicItems.length) return englishItems;
  return englishItems.map((item, index) => mergeLocalizedContent(item, amharicItems[index] || {}));
}

export function getAboutPageContent(language = "en") {
  const en = aboutPageContent.en;
  if (language !== "am") return en;

  const am = aboutPageContent.am;

  return {
    hero: mergeLocalizedContent(en.hero, am.hero),
    highlights: mergeSectionArray(en.highlights, am.highlights),
    values: mergeSectionArray(en.values, am.values),
    missionVision: {
      ...mergeLocalizedContent(en.missionVision, am.missionVision),
      cards: mergeSectionArray(en.missionVision.cards, am.missionVision?.cards),
    },
    history: {
      ...mergeLocalizedContent(en.history, am.history),
      highlights: am.history?.highlights?.length ? am.history.highlights : en.history.highlights,
    },
    howItWorks: {
      ...mergeLocalizedContent(en.howItWorks, am.howItWorks),
      items: am.howItWorks?.items?.length ? am.howItWorks.items : en.howItWorks.items,
    },
    leadershipStructure: {
      ...mergeLocalizedContent(en.leadershipStructure, am.leadershipStructure),
      groups: mergeSectionArray(en.leadershipStructure.groups, am.leadershipStructure?.groups),
    },
    finalCta: mergeLocalizedContent(en.finalCta, am.finalCta),
  };
}
