import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Maps short nav hash aliases to actual section ids on each page.
const HASH_ALIASES = {
  mission: "mission-vision",
  news: "community-news",
  past: "past",
  "past-events": "past",
  "upcoming-events": "upcoming",
  election: "elections",
  "election-documents": "elections",
  reports: "public-reports",
  "how-it-works": "how-ecaa-works",
  "volunteer-civic-engagement": "volunteer-civic",
  "health-sports": "health-wellness",
};

function resolveElementId(hash) {
  const raw = hash.replace("#", "");
  return HASH_ALIASES[raw] || raw;
}

function scrollToElement(id, attempt = 0) {
  const target = document.getElementById(id);
  if (target) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    return;
  }

  if (attempt < 12) {
    window.setTimeout(() => scrollToElement(id, attempt + 1), 50);
  }
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      scrollToElement(resolveElementId(hash));
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [pathname, hash]);

  return null;
}
