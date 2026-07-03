import { useMemo } from 'react'
import PageHeroWithStats from '../components/layout/PageHeroWithStats'
import LeadershipIntroSection from '../components/sections/LeadershipIntroSection'
import LeadershipCtaSection from '../components/sections/LeadershipCtaSection'
import LeadershipBubbleShowcase from '../components/leadership/LeadershipBubbleShowcase'
import LeadershipCommitteeSection from '../components/leadership/LeadershipCommitteeSection'
import { useLeadership } from '../hooks/useLeadership'
import { getHeroBackground, getPageHero } from '../utils/pageHeroes'
import { getLeadershipHighlightCards } from '../data/leadershipPageContent'

export default function Leadership() {
  const { groups, featuredMembers, pageContent, loading } = useLeadership()
  const pageHeroConfig = useMemo(() => getPageHero('leadership'), [])
  const background = useMemo(() => getHeroBackground(pageHeroConfig, 'leadership'), [pageHeroConfig])
  const highlightCards = useMemo(() => getLeadershipHighlightCards(pageContent), [pageContent])

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
        variant={pageHeroConfig?.variant || 'page'}
        overlayStrength={pageHeroConfig?.overlayStrength || 'default'}
      />

      <LeadershipIntroSection intro={pageContent.intro} />

      {!loading && (
        <LeadershipBubbleShowcase
          members={featuredMembers}
          explorer={pageContent.explorer}
          contactLabels={pageContent.contactLabels}
        />
      )}

      {groups.map((group, index) => (
        <LeadershipCommitteeSection
          key={group.id}
          group={group}
          muted={index % 2 === 1}
          sectionId={index === 0 ? 'leadership-committees' : undefined}
          emptyState={pageContent.emptyState}
          explorer={pageContent.explorer}
          contactLabels={pageContent.contactLabels}
        />
      ))}

      <LeadershipCtaSection section={pageContent.finalCta} />
    </>
  )
}
