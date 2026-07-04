import { useLanguage } from "../context/LanguageContext";
import PageHeroWithStats from "../components/layout/PageHeroWithStats";
import ContentSection from "../components/sections/ContentSection";
import AboutOverview from "../components/sections/about/AboutOverview";
import AboutMissionVision from "../components/sections/about/AboutMissionVision";
import AboutHistory from "../components/sections/about/AboutHistory";
import AboutHowItWorks from "../components/sections/about/AboutHowItWorks";
import AboutLeadershipStructure from "../components/sections/about/AboutLeadershipStructure";
import AboutClosingCta from "../components/sections/about/AboutClosingCta";
import { getAboutPageContent } from "../data/aboutPageContent";
import { getPageHero, getHeroBackground } from "../utils/pageHeroes";
import { pageHeroDefaults } from "../utils/publicAsset";

export default function About() {
  const { language } = useLanguage();
  const content = getAboutPageContent(language);
  const pageHeroConfig = getPageHero("about");
  const background = getHeroBackground(pageHeroConfig, "about");

  return (
    <>
      <PageHeroWithStats
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        backgroundImage={background}
        backgroundAlt={pageHeroConfig?.backgroundAlt}
        buttons={content.hero.buttons}
        stats={content.highlights}
        variant={pageHeroConfig?.variant || "page"}
        overlayStrength={pageHeroConfig?.overlayStrength || "default"}
        fallbackImage={pageHeroDefaults.about}
      />

      <AboutOverview section={{ cards: content.values }} />

      <ContentSection
        id={content.missionVision.id}
        eyebrow={content.missionVision.eyebrow}
        title={content.missionVision.title}
      >
        <AboutMissionVision section={content.missionVision} />
      </ContentSection>

      <ContentSection
        id={content.history.id}
        eyebrow={content.history.eyebrow}
        title={content.history.title}
        muted
      >
        <AboutHistory section={content.history} />
      </ContentSection>

      <ContentSection
        id={content.howItWorks.id}
        eyebrow={content.howItWorks.eyebrow}
        title={content.howItWorks.title}
      >
        <AboutHowItWorks section={content.howItWorks} />
      </ContentSection>

      <ContentSection
        id={content.leadershipStructure.id}
        eyebrow={content.leadershipStructure.eyebrow}
        title={content.leadershipStructure.title}
        muted
      >
        <AboutLeadershipStructure section={content.leadershipStructure} />
      </ContentSection>

      <AboutClosingCta section={content.finalCta} />
    </>
  );
}
