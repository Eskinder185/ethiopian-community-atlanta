const ROUTE_FIXES = {
  "/አባልነት": "/membership",
  "/ዝግጅቶች": "/events",
  "/ሚዲያ": "/media",
  "/ፕሮግራሞች": "/programs",
  "/እውቂያ": "/contact",
  "/ድጋፍ": "/support",
  "/events#book-hold": "/events#book-hall",
};

export function normalizeWebsiteRoute(href) {
  if (!href || typeof href !== "string") return href;

  const trimmed = href.trim();
  if (!trimmed) return trimmed;

  if (ROUTE_FIXES[trimmed]) return ROUTE_FIXES[trimmed];

  if (trimmed.startsWith("/ፕሮግራሞች/")) {
    return trimmed.replace("/ፕሮግራሞች/", "/programs/");
  }

  return trimmed;
}

function normalizeCta(cta) {
  if (!cta || typeof cta !== "object") return cta;
  if (!cta.href) return cta;
  return { ...cta, href: normalizeWebsiteRoute(cta.href) };
}

function normalizeSection(section) {
  if (!section || typeof section !== "object") return section;

  const next = { ...section };

  if (next.primaryCta) next.primaryCta = normalizeCta(next.primaryCta);
  if (next.secondaryCta) next.secondaryCta = normalizeCta(next.secondaryCta);
  if (next.supportCta) next.supportCta = normalizeCta(next.supportCta);
  if (next.sectionCta) next.sectionCta = normalizeCta(next.sectionCta);

  if (next.emptyState?.primaryCta) {
    next.emptyState = {
      ...next.emptyState,
      primaryCta: normalizeCta(next.emptyState.primaryCta),
    };
  }

  if (Array.isArray(next.buttons)) {
    next.buttons = next.buttons.map((button) => normalizeCta(button));
  }

  return next;
}

export function normalizeHomepageSectionRoutes(sections) {
  if (!sections || typeof sections !== "object") return sections;

  return Object.fromEntries(
    Object.entries(sections).map(([key, value]) => [key, normalizeSection(value)])
  );
}
