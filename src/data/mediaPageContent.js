import { mergeLocalizedContent } from "../utils/homepageLocale";

export const mediaPageContent = {
  en: {
    hero: {
      eyebrow: "Media",
      title: "Community Photos and Videos",
      description:
        "Explore photos, flyers, videos, and community links from ECAA events and programs.",
      buttons: [{ label: "View Events", href: "/events", style: "primary" }],
      highlightCards: [
        { value: "Photos", label: "Community moments" },
        { value: "Videos", label: "Stories & events" },
        { value: "Community", label: "People & programs" },
        { value: "Culture", label: "Heritage & pride" },
      ],
    },
    sections: {
      featured: {
        id: "featured-media",
        title: "Featured Media",
        description: "Highlights from ECAA events, programs, and community gatherings.",
        emptyState: {
          title: "Featured media coming soon",
          description: "Featured photos, videos, and flyers will appear here when published.",
        },
      },
      videos: {
        id: "videos",
        title: "Videos",
        description: "YouTube videos and community video links from ECAA.",
        emptyState: {
          title: "Videos coming soon",
          description: "ECAA videos and YouTube links will appear here when published.",
        },
      },
      photos: {
        id: "photos-flyers",
        title: "Photos & Flyers",
        description: "Photos, flyers, and visual moments from ECAA events.",
        emptyState: {
          title: "Photos coming soon",
          description: "Event photos and flyers will appear here when published.",
        },
      },
      links: {
        id: "community-links",
        title: "Community Links",
        description:
          "Eventbrite, Google Forms, Partiful, documents, and other helpful event links.",
        emptyState: {
          title: "Links coming soon",
          description: "Helpful event links will appear here when published.",
        },
      },
    },
    buttonLabels: {
      view: "View",
      watchVideo: "Watch Video",
      openLink: "Open Link",
      viewGallery: "View Gallery",
      eventbrite: "Open on Eventbrite",
      googleForm: "Open Form",
      partiful: "Open on Partiful",
      document: "View Document",
    },
  },
  am: {
    hero: {
      eyebrow: "ሚዲያ",
      title: "የማህበረሰብ ፎቶዎች እና ቪዲዮዎች",
      description: "ከECAA ዝግጅቶች እና ፕሮግራሞች ፎቶዎችን፣ በራሪ ወረቀቶችን፣ ቪዲዮዎችን እና የማህበረሰብ አገናኞችን ያስሱ።",
      buttons: [
        { label: "ዝግጅቶችን ይመልከቱ", href: "/events", style: "primary" },
        { label: "ECAAን ያነጋግሩ", href: "/contact", style: "secondary" },
      ],
      highlightCards: [
        { value: "ፎቶዎች", label: "የማህበረሰብ ጊዜያት" },
        { value: "ቪዲዮዎች", label: "ታሪኮች እና ዝግጅቶች" },
        { value: "ማህበረሰብ", label: "ሰዎች እና ፕሮግራሞች" },
        { value: "ባህል", label: "ቅርስ እና ኩራት" },
      ],
    },
    sections: {
      featured: {
        title: "ተለይተው የቀረቡ ሚዲያዎች",
        description: "ከECAA ዝግጅቶች፣ ፕሮግራሞች እና የማህበረሰብ ስብሰባዎች የተገኙ ዋና ዋና ነጥቦች።",
        emptyState: {
          title: "ተለይተው የቀረቡ ሚዲያዎች በቅርቡ ይታከላሉ",
          description: "ተለይተው የቀረቡ ፎቶዎች፣ ቪዲዮዎች እና ፍላየሮች ሲታተሙ እዚህ ይታያሉ።",
        },
      },
      videos: {
        title: "ቪዲዮዎች",
        description: "ከECAA የዩቲዩብ ቪዲዮዎች እና የማህበረሰብ ቪዲዮ አገናኞች።",
        emptyState: {
          title: "ቪዲዮዎች በቅርቡ ይታከላሉ",
          description: "የECAA ቪዲዮዎች እና የዩቲዩብ አገናኞች ሲታተሙ እዚህ ይታያሉ።",
        },
      },
      photos: {
        title: "ፎቶዎች እና በራሪ ወረቀቶች",
        description: "ከECAA ዝግጅቶች ፎቶዎች፣ በራሪ ወረቀቶች እና የእይታ ጊዜያት።",
        emptyState: {
          title: "ፎቶዎች በቅርቡ ይመጣሉ",
          description: "የዝግጅት ፎቶዎች እና በራሪ ወረቀቶች ሲታተሙ እዚህ ይታያሉ።",
        },
      },
      links: {
        title: "የማህበረሰብ አገናኞች",
        description: "Eventbrite፣ Google Forms፣ Partiful፣ ሰነዶች እና ሌሎች ጠቃሚ የዝግጅት አገናኞች።",
        emptyState: {
          title: "አገናኞች በቅርቡ ይመጣሉ",
          description: "ጠቃሚ የዝግጅት አገናኞች ሲታተሙ እዚህ ይታያሉ።",
        },
      },
    },
    buttonLabels: {
      view: "ይመልከቱ",
      watchVideo: "ቪዲዮውን ይመልከቱ",
      openLink: "አገናኙን ይክፈቱ",
      viewGallery: "ጋለሪውን ይመልከቱ",
      eventbrite: "Eventbrite",
      googleForm: "Open Form",
      partiful: "Partiful",
      document: "ይመልከቱ",
    },
  },
};

function mergeHighlightCards(englishCards = [], amharicCards = []) {
  if (!amharicCards.length) return englishCards;
  return englishCards.map((card, index) => mergeLocalizedContent(card, amharicCards[index] || {}));
}

function mergeSection(sectionEn, sectionAm, remoteSection = {}) {
  return {
    ...mergeLocalizedContent(sectionEn, sectionAm),
    ...mergeLocalizedContent(sectionEn, remoteSection),
    emptyState: mergeLocalizedContent(
      mergeLocalizedContent(sectionEn.emptyState, sectionAm?.emptyState),
      remoteSection?.emptyState
    ),
  };
}

export function getMediaPageContent(language = "en", remoteContent = null) {
  const en = mediaPageContent.en;
  if (language !== "am") {
    if (remoteContent?.content) {
      return mergeLocalizedContent(en, remoteContent.content);
    }
    return en;
  }

  const am = mediaPageContent.am;
  const remoteAm = remoteContent?.content_am || {};

  return {
    hero: mergeLocalizedContent(mergeLocalizedContent(en.hero, am.hero), remoteAm.hero),
    sections: {
      featured: mergeSection(
        en.sections.featured,
        am.sections.featured,
        remoteAm.sections?.featured
      ),
      videos: mergeSection(en.sections.videos, am.sections.videos, remoteAm.sections?.videos),
      photos: mergeSection(en.sections.photos, am.sections.photos, remoteAm.sections?.photos),
      links: mergeSection(en.sections.links, am.sections.links, remoteAm.sections?.links),
    },
    buttonLabels: mergeLocalizedContent(
      mergeLocalizedContent(en.buttonLabels, am.buttonLabels),
      remoteAm.buttonLabels
    ),
  };
}

export function getMediaHighlightCards(content) {
  return content?.hero?.highlightCards || [];
}
