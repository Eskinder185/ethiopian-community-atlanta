export const SITE_NAME = "Ethiopian Community Association in Atlanta";
export const SITE_SHORT_NAME = "ECAA";
export const SITE_URL = "https://eskinder185.github.io/ethiopian-community-atlanta";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/brand/ECAA_logo.jpg`;

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  description:
    "Connect with ECAA, a home for Ethiopians in Atlanta built around culture, connection, support, and belonging.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5616 Memorial Dr",
    addressLocality: "Stone Mountain",
    addressRegion: "GA",
    postalCode: "30083",
    addressCountry: "US",
  },
  email: "staff@ethiopiancaa.org",
  telephone: "+1-404-298-4570",
  sameAs: [],
};

/** @type {Record<string, { title: string; description: string; type?: string }>} */
export const pageSeo = {
  "/": {
    title: "Ethiopian Community Association in Atlanta | ECAA",
    description:
      "Connect with ECAA, a home for Ethiopians in Atlanta built around culture, connection, support, and belonging.",
    type: "website",
  },
  "/about": {
    title: "About ECAA | Ethiopian Community Association in Atlanta",
    description:
      "Learn about ECAA's mission, history, and leadership serving Ethiopians in Atlanta through culture, programs, and community support.",
  },
  "/membership": {
    title: "Join ECAA | Ethiopian Community Association in Atlanta",
    description:
      "Become a member of ECAA and help strengthen Ethiopian community life, cultural connection, and shared support in Atlanta.",
  },
  "/programs": {
    title: "Community Programs | ECAA Atlanta",
    description:
      "Explore ECAA programs for youth, education, wellness, family support, financial literacy, legal awareness, and community growth.",
  },
  "/events": {
    title: "Events and News | ECAA Atlanta",
    description:
      "View ECAA community events, announcements, hall booking information, and updates for Ethiopians in Atlanta.",
  },
  "/media": {
    title: "Media Gallery | ECAA Atlanta",
    description:
      "Browse ECAA photos, videos, and community moments from events, programs, and gatherings in Atlanta.",
  },
  "/support": {
    title: "Support ECAA | Donate, Sponsor, Volunteer",
    description:
      "Support ECAA through donations, sponsorship, volunteering, membership, and community participation.",
  },
  "/leadership": {
    title: "Leadership | ECAA Atlanta",
    description:
      "Meet ECAA leadership, board members, and committee contacts serving the Ethiopian community in Atlanta.",
  },
  "/documents": {
    title: "Documents and Governance | ECAA Atlanta",
    description:
      "Access ECAA governance documents, bylaws, policies, and community resources for members and partners.",
  },
  "/contact": {
    title: "Contact ECAA | Ethiopian Community Association in Atlanta",
    description:
      "Contact ECAA by phone, email, or visit the community center in Stone Mountain, Georgia.",
  },
  "/privacy": {
    title: "Privacy Policy | ECAA Atlanta",
    description:
      "Read ECAA's privacy policy for website visitors, members, and community participants.",
  },
  "/terms": {
    title: "Terms of Use | ECAA Atlanta",
    description: "Review the terms of use for the ECAA website and online community resources.",
  },
  "/volunteer": {
    title: "Volunteer with ECAA | Ethiopian Community Association in Atlanta",
    description:
      "Volunteer with ECAA to support programs, events, and community services for Ethiopians in Atlanta.",
  },
};

export function getCanonicalUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
}

export function buildEventStructuredData(event) {
  if (!event?.title || !event?.date) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    description: event.description || undefined,
    location: event.location
      ? {
          "@type": "Place",
          name: event.location,
        }
      : undefined,
    image: event.posterUrl || event.imageUrl || undefined,
    url: event.link || undefined,
  };

  if (event.endDate) {
    data.endDate = event.endDate;
  }

  return data;
}
