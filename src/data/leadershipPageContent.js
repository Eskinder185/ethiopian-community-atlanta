import { getFallbackLeadershipIntro, LEADERSHIP_COMMITTEES } from "./leadership";
import { mergeLocalizedContent } from "../utils/homepageLocale";

export const leadershipPageContent = {
  en: {
    hero: {
      eyebrow: "Leadership",
      title: "Leadership",
      description:
        "Meet the leaders, board members, committee members, and advisors serving the Ethiopian Community Association in Atlanta.",
      buttons: [
        { label: "View Committees", href: "#leadership-directory", style: "primary" },
        { label: "Contact ECAA", href: "/contact", style: "secondary" },
      ],
      highlightCards: [
        { value: "Executive Committee", label: "Organizational leadership" },
        { value: "Board", label: "Governance oversight" },
        { value: "Advisory", label: "Community guidance" },
        { value: "EDIR Committee", label: "Mutual support" },
      ],
    },
    intro: getFallbackLeadershipIntro(),
    explorer: {
      title: "Explore ECAA Leadership",
      description:
        "Click a leader to view their role, committee, and publicly shared contact options.",
      modalCloseLabel: "Close",
    },
    directory: {
      title: "Leadership Directory",
      description: "Search and filter ECAA leaders by committee, name, or role.",
      searchLabel: "Search leaders",
      searchPlaceholder: "Search leaders by name or role",
      viewProfileLabel: "View Profile",
      modalCloseLabel: "Close",
      noResults: "No leaders match your search. Try another name, role, or committee filter.",
      filters: {
        all: "All",
        "executive-committee": "Executive Committee",
        "board-of-directors": "Board of Directors",
        "audit-committee": "Audit Committee",
        "advisory-board": "Advisory Board",
        "edir-committee": "Edir Committee",
      },
    },
    accordions: {
      title: "Committee Overview",
      description: "Browse leaders by committee in expandable sections.",
      viewProfileLabel: "View Profile",
      modalCloseLabel: "Close",
    },
    contactLabels: {
      email: "Email",
      phone: "Phone",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      website: "Website",
    },
    committees: LEADERSHIP_COMMITTEES.map((committee) => ({
      id: committee.id,
      anchor: committee.anchor,
      title: committee.title,
      description: committee.description,
    })),
    emptyState: {
      title: "Leadership information for this committee will be added soon.",
      description: "Check back for verified committee profiles and updates from ECAA.",
    },
    finalCta: {
      title: "Want to get involved with ECAA?",
      buttons: [
        { label: "Become a Member", href: "/membership" },
        { label: "Volunteer", href: "/support#volunteer" },
        { label: "Support ECAA", href: "/support" },
      ],
    },
  },
  am: {
    hero: {
      eyebrow: "አመራር",
      title: "አመራር",
      description:
        "በአትላንታ የኢትዮጵያ ማህበረሰብ ማህበርን የሚያገለግሉ መሪዎችን፣ የቦርድ አባላትን፣ የኮሚቴ አባላትን እና አማካሪዎችን ያግኙ።",
      buttons: [
        { label: "ኮሚቴዎችን ይመልከቱ", href: "#leadership-directory", style: "primary" },
        { label: "ECAAን ያነጋግሩ", href: "/contact", style: "secondary" },
      ],
      highlightCards: [
        { value: "የስራ አስፈፃሚ ኮሚቴ", label: "የድርጅታዊ አመራር" },
        { value: "ቦርድ", label: "የአስተዳደር ቁጥጥር" },
        { value: "ምክር", label: "የማህበረሰብ መመሪያ" },
        { value: "የEDIR ኮሚቴ", label: "የጋራ ድጋፍ" },
      ],
    },
    intro:
      "የECAA አመራር የአስፈፃሚ አመራርን፣ የቦርድ አባላትን፣ የኦዲት ኮሚቴ አባላትን፣ የአማካሪ ቦርድ አባላትን እና የEDIR ኮሚቴ መሪዎችን የድርጅታዊ አቅጣጫን፣ ተጠያቂነትን እና የማህበረሰብ አገልግሎትን የሚደግፉ ያካትታል።",
    explorer: {
      title: "የECAA አመራርን ያስሱ",
      description: "የእነሱን ሚና፣ ኮሚቴ እና በይፋ የተጋሩ የእውቂያ አማራጮችን ለማየት መሪን ጠቅ ያድርጉ።",
      modalCloseLabel: "ዝጋ",
    },
    directory: {
      title: "የአመራር ዝርዝር",
      description: "በኮሚቴ፣ በስም ወይም በሚና ECAA መሪዎችን ይፈልጉ እና ያጣሩ።",
      searchLabel: "መሪዎችን ይፈልጉ",
      searchPlaceholder: "በስም ወይም በሚና መሪዎችን ይፈልጉ",
      viewProfileLabel: "መገለጫ ይመልከቱ",
      modalCloseLabel: "ዝጋ",
      noResults: "ምንም መሪ ከፍለጋዎ ጋር አይዛመድም። ሌላ ስም፣ ሚና ወይም ኮሚቴ ይሞክሩ።",
      filters: {
        all: "ሁሉም",
        "executive-committee": "የስራ አስፈፃሚ ኮሚቴ",
        "board-of-directors": "የዳይሬክተሮች ቦርድ",
        "audit-committee": "የኦዲት ኮሚቴ",
        "advisory-board": "አማካሪ ቦርድ",
        "edir-committee": "የኤዲር ኮሚቴ",
      },
    },
    accordions: {
      title: "የኮሚቴ አጠቃላይ እይታ",
      description: "መሪዎችን በኮሚቴ በተለየ የሚሰፉ ክፍሎች ውስጥ ያስሱ።",
      viewProfileLabel: "መገለጫ ይመልከቱ",
      modalCloseLabel: "ዝጋ",
    },
    contactLabels: {
      email: "ኢሜይል",
      phone: "ስልክ",
      facebook: "ፌስቡክ",
      instagram: "ኢንስታግራም",
      linkedin: "LinkedIn",
      website: "ድር ጣቢያ",
    },
    committees: [
      {
        id: "executive-committee",
        anchor: "executive-committee",
        title: "ሥራ አስፈፃሚ ኮሚቴ",
        description:
          "የእለት ከእለት ድርጅታዊ አቅጣጫ፣ የፕሮግራም ማስተባበር እና የማህበረሰብ አገልግሎት ሀላፊነት ያለው የ ECAA አስፈፃሚ አመራር።",
      },
      {
        id: "board-of-directors",
        anchor: "board-of-directors",
        title: "የዳይሬክተሮች ቦርድ",
        description: "የECAA ተልዕኮ እና የማህበረሰብ ስራን የሚከታተሉ እና የሚመሩ የአስተዳደር ቦርድ አባላት።",
      },
      {
        id: "audit-committee",
        anchor: "audit-committee",
        title: "የኦዲት ኮሚቴ",
        description: "የኦዲት ቁጥጥር እና የፋይናንስ ተጠያቂነት ኃላፊነት ያለባቸው የኮሚቴ አባላት።",
      },
      {
        id: "advisory-board",
        anchor: "advisory-board",
        title: "አማካሪ ቦርድ",
        description: "ECAAን በመመሪያ፣ በእውቀት እና በማህበረሰብ እይታ የሚደግፉ አማካሪ አባላት።",
      },
      {
        id: "edir-committee",
        anchor: "edir-committee",
        title: "የኤዲር ኮሚቴ",
        description: "በኢሲኤኤ ውስጥ ከኢዲአር ጋር የተያያዘ የማህበረሰብ ድጋፍ እና አስተዳደር ጋር የተያያዘ አመራር።",
      },
    ],
    emptyState: {
      title: "ለዚህ ኮሚቴ የአመራር መረጃ በቅርቡ ይታያል።",
      description: "የተረጋገጡ የኮሚቴ መገለጫዎችን እና ከECAA የሚመጡ ዝመናዎችን ይመልከቱ።",
    },
    finalCta: {
      title: "ከ ECAA ጋር መሳተፍ ይፈልጋሉ?",
      buttons: [
        { label: "አባል ይሁኑ", href: "/membership" },
        { label: "በጎ ፈቃደኝነት", href: "/support#volunteer" },
        { label: "ECAA ን ይደግፉ", href: "/support" },
      ],
    },
  },
};

function mergeCommittees(englishCommittees = [], amharicCommittees = []) {
  const amById = Object.fromEntries(
    amharicCommittees.map((committee) => [committee.id, committee])
  );
  return englishCommittees.map((committee) =>
    mergeLocalizedContent(committee, amById[committee.id] || {})
  );
}

function mergeHighlightCards(englishCards = [], amharicCards = []) {
  if (!amharicCards.length) return englishCards;
  return englishCards.map((card, index) => mergeLocalizedContent(card, amharicCards[index] || {}));
}

export function getLeadershipPageContent(language = "en", remoteContent = null) {
  const en = leadershipPageContent.en;
  if (language !== "am") {
    if (remoteContent?.content) {
      return mergeLocalizedContent(en, remoteContent.content);
    }
    return en;
  }

  const am = leadershipPageContent.am;
  const remoteAm = remoteContent?.content_am || {};

  return {
    hero: mergeLocalizedContent(mergeLocalizedContent(en.hero, am.hero), remoteAm.hero),
    intro: remoteAm.intro || am.intro || en.intro,
    explorer: mergeLocalizedContent(
      mergeLocalizedContent(en.explorer, am.explorer),
      remoteAm.explorer
    ),
    directory: mergeLocalizedContent(
      mergeLocalizedContent(en.directory, am.directory),
      remoteAm.directory
    ),
    accordions: mergeLocalizedContent(
      mergeLocalizedContent(en.accordions, am.accordions),
      remoteAm.accordions
    ),
    contactLabels: mergeLocalizedContent(
      mergeLocalizedContent(en.contactLabels, am.contactLabels),
      remoteAm.contactLabels
    ),
    committees: mergeCommittees(
      en.committees,
      remoteAm.committees?.length ? remoteAm.committees : am.committees
    ),
    emptyState: mergeLocalizedContent(
      mergeLocalizedContent(en.emptyState, am.emptyState),
      remoteAm.emptyState
    ),
    finalCta: {
      ...mergeLocalizedContent(mergeLocalizedContent(en.finalCta, am.finalCta), remoteAm.finalCta),
      buttons: mergeHighlightCards(
        en.finalCta.buttons,
        remoteAm.finalCta?.buttons || am.finalCta.buttons
      ),
    },
  };
}

export function getLeadershipHighlightCards(content) {
  return content?.hero?.highlightCards || content?.hero?.stats || [];
}
