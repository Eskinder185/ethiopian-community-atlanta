import { useMemo } from "react";
import PageHeroWithStats from "../components/layout/PageHeroWithStats";
import LeadershipIntroSection from "../components/sections/LeadershipIntroSection";
import LeadershipCtaSection from "../components/sections/LeadershipCtaSection";
import LeadershipDirectory from "../components/leadership/LeadershipDirectory";
import ErrorBoundary from "../components/ErrorBoundary";
import LeadershipAccordionGroups from "../components/leadership/LeadershipAccordionGroups";
import { useLeadership } from "../hooks/useLeadership";
import { getHeroBackground, getPageHero } from "../utils/pageHeroes";
import { defaultImages } from "../utils/publicAsset";
import { getLeadershipHighlightCards } from "../data/leadershipPageContent";
import { getVisibleGroupMembers } from "../utils/leadership";

export default function Leadership() {
  const { groups, members, pageContent, loading } = useLeadership();
  const pageHeroConfig = useMemo(() => getPageHero("leadership"), []);
  const background = useMemo(
    () => getHeroBackground(pageHeroConfig, "leadership"),
    [pageHeroConfig]
  );
  const highlightCards = useMemo(() => getLeadershipHighlightCards(pageContent), [pageContent]);
  const directoryMembers = useMemo(() => getVisibleGroupMembers(members), [members]);

  return (
    <>
      <PageHeroWithStats
        eyebrow={pageContent.hero.eyebrow}
        title={pageContent.hero.title}
        description={pageContent.hero.description}
        backgroundImage={background}
        backgroundAlt={pageHeroConfig?.backgroundAlt}
        buttons={pageContent.hero.buttons}
        stats={highlightCards}
        variant={pageHeroConfig?.variant || "page"}
        overlayStrength={pageHeroConfig?.overlayStrength || "default"}
        fallbackImage={defaultImages.leadershipHero}
      />

      <LeadershipIntroSection intro={pageContent.intro} />

      {!loading && (
        <ErrorBoundary compact>
          <LeadershipDirectory
            members={directoryMembers}
            directory={pageContent.directory}
            contactLabels={pageContent.contactLabels}
          />
        </ErrorBoundary>
      )}

      {!loading && (
        <LeadershipAccordionGroups
          groups={groups}
          accordions={pageContent.accordions}
          emptyState={pageContent.emptyState}
          contactLabels={pageContent.contactLabels}
        />
      )}

      <LeadershipCtaSection section={pageContent.finalCta} />
    </>
  );
}
