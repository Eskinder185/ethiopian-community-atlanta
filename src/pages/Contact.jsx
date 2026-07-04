import { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import PageHeroWithStats from "../components/layout/PageHeroWithStats";
import ContactDetailsSection from "../components/sections/ContactDetailsSection";
import { getContactPageContent } from "../data/contactPageContent";
import { getPageHero, getHeroBackground } from "../utils/pageHeroes";

export default function Contact() {
  const { language } = useLanguage();
  const content = useMemo(() => getContactPageContent(language), [language]);
  const pageHeroConfig = getPageHero("contact");
  const background = getHeroBackground(pageHeroConfig, "contact");

  return (
    <>
      <PageHeroWithStats
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        backgroundImage={background}
        backgroundAlt={pageHeroConfig?.backgroundAlt}
        buttons={content.hero.buttons}
        stats={content.summaryCards}
        variant={pageHeroConfig?.variant || "page"}
        overlayStrength={pageHeroConfig?.overlayStrength || "default"}
      />
      <ContactDetailsSection content={content} />
    </>
  );
}
