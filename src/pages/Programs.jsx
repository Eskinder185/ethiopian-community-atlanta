import { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import PageHeroWithStats from "../components/layout/PageHeroWithStats";
import ProgramsOverviewSection from "../components/sections/ProgramsOverviewSection";
import ProgramsMainGrid from "../components/sections/ProgramsMainGrid";
import ProgramsDetailsPlaceholderSection from "../components/sections/ProgramsDetailsPlaceholderSection";
import ProgramsFormsSection from "../components/sections/ProgramsFormsSection";
import ProgramsClosingCta from "../components/sections/ProgramsClosingCta";
import { getProgramsPageContent } from "../data/programsPageContent";
import { usePrograms } from "../hooks/usePrograms";
import { applyProgramsLocale } from "../utils/programsLocale";
import { getPageHero, getHeroBackground } from "../utils/pageHeroes";
import { defaultImages } from "../utils/publicAsset";

export default function Programs() {
  const { language } = useLanguage();
  const pageContent = getProgramsPageContent(language);
  const { programs: rawPrograms } = usePrograms();
  const programs = useMemo(
    () => applyProgramsLocale(rawPrograms, language),
    [rawPrograms, language]
  );
  const pageHeroConfig = getPageHero("programs");
  const background = getHeroBackground(pageHeroConfig, "programs");

  return (
    <>
      <PageHeroWithStats
        eyebrow={pageContent.hero.eyebrow}
        title={pageContent.hero.title}
        description={pageContent.hero.description}
        backgroundImage={background}
        backgroundAlt={pageHeroConfig?.backgroundAlt}
        buttons={pageContent.hero.buttons}
        stats={pageContent.overviewCards}
        variant={pageHeroConfig?.variant || "page"}
        overlayStrength={pageHeroConfig?.overlayStrength || "default"}
        fallbackImage={defaultImages.programsHero}
      />

      <ProgramsOverviewSection section={pageContent.intro} />
      <ProgramsMainGrid programs={programs} />
      <ProgramsDetailsPlaceholderSection section={pageContent.detailsComingSoon} />
      <ProgramsFormsSection section={pageContent.interestForms} labels={pageContent.detailLabels} />
      <ProgramsClosingCta section={pageContent.finalCta} />
    </>
  );
}
