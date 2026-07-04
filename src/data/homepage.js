import homepageJson from "../content/homepage.json";

export const HOMEPAGE_SECTION_KEYS = [
  "hero",
  "missionSection",
  "eventsCommunity",
  "communityMoments",
  "bookHall",
  "featuredPrograms",
  "finalCta",
];

const DEFAULT_FINAL_CTA = {
  visible: true,
  title: "Ready to get involved with ECAA?",
  description:
    "Become a member, attend an event, volunteer, or contact ECAA to learn how you can participate in community life.",
  buttons: [
    { label: "Become a Member", href: "/membership" },
    { label: "View Events", href: "/events" },
    { label: "Contact ECAA", href: "/contact" },
  ],
};

export function getFallbackHomepage() {
  return {
    seo: homepageJson.seo,
    hero: homepageJson.hero,
    missionSection: homepageJson.missionSection,
    eventsCommunity: homepageJson.featuredEvents,
    communityMoments: {
      ...homepageJson.featuredMedia,
      items: [],
    },
    bookHall: homepageJson.bookHall,
    featuredPrograms: {
      ...homepageJson.featuredPrograms,
      items: [],
    },
    finalCta: homepageJson.finalCta || DEFAULT_FINAL_CTA,
  };
}

export { DEFAULT_FINAL_CTA };
