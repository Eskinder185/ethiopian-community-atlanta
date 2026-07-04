import homepageJson from "../content/homepage.json";
import { homepageAmharicSections } from "../data/homepageAmharic";

const LEGACY_HERO_TITLE =
  "Building Intergenerational Connections and Strengthening Community Resilience";

const LEGACY_HERO_DESCRIPTION_SNIPPET = "ECAA exists to serve, connect, and empower";

const STALE_HERO_TITLE = "A Home for Ethiopians in Atlanta";

const STALE_HERO_DESCRIPTION_SNIPPET = "Come connect with culture, community, support, events";

const STALE_HERO_TITLE_AM = "በአትላንታ ለኢትዮጵያውያን የሆነ ቤት";

const STALE_HERO_DESCRIPTION_SNIPPET_AM = "ከባህል፣ ከማህበረሰብ፣ ከድጋፍ፣ ከዝግጅቶች";

function mapLegacyCta(button) {
  if (!button?.label) return null;
  const href = button.href || button.link || button.path || button.to;
  return href ? { label: button.label, href } : { label: button.label };
}

function usesStaleHeroCopy(hero) {
  if (!hero) return false;
  if (hero.title === LEGACY_HERO_TITLE || hero.title === STALE_HERO_TITLE) return true;
  if (typeof hero.description !== "string") return false;
  return (
    hero.description.includes(LEGACY_HERO_DESCRIPTION_SNIPPET) ||
    hero.description.includes(STALE_HERO_DESCRIPTION_SNIPPET)
  );
}

function usesStaleHeroCopyAm(heroAm) {
  if (!heroAm) return false;
  if (heroAm.title === STALE_HERO_TITLE_AM) return true;
  if (typeof heroAm.description !== "string") return false;
  return heroAm.description.includes(STALE_HERO_DESCRIPTION_SNIPPET_AM);
}

/** Replace legacy or stale Supabase hero copy and map old button field names. */
export function normalizeHomeHeroSection(hero) {
  if (!hero || typeof hero !== "object") return hero;

  const canonical = homepageJson.hero;
  let next = { ...hero };

  if (usesStaleHeroCopy(hero)) {
    next = {
      ...next,
      eyebrow: canonical.eyebrow,
      title: canonical.title,
      description: canonical.description,
      trustCue: canonical.trustCue,
      primaryCta: canonical.primaryCta,
      secondaryCta: canonical.secondaryCta,
      image: next.image || next.backgroundImage || canonical.image,
      imageAlt: next.imageAlt || canonical.imageAlt,
      visible: next.visible !== false,
    };
  }

  if (!next.primaryCta?.label && hero.primaryButton) {
    next.primaryCta = mapLegacyCta(hero.primaryButton);
  }
  if (!next.secondaryCta?.label && hero.secondaryButton) {
    next.secondaryCta = mapLegacyCta(hero.secondaryButton);
  }

  delete next.supportCta;
  delete next.donateCta;

  return next;
}

/** Replace stale Amharic hero copy from Supabase CMS overlay. */
export function normalizeHomeHeroAmharicSection(heroAm) {
  if (!heroAm || typeof heroAm !== "object") return heroAm;

  const canonical = homepageAmharicSections.hero;
  if (!usesStaleHeroCopyAm(heroAm)) return heroAm;

  return {
    ...heroAm,
    eyebrow: canonical.eyebrow,
    title: canonical.title,
    description: canonical.description,
    trustCue: canonical.trustCue,
    primaryCta: { ...canonical.primaryCta, href: heroAm.primaryCta?.href },
    secondaryCta: { ...canonical.secondaryCta, href: heroAm.secondaryCta?.href },
  };
}
