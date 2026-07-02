import PageHero from '../components/layout/PageHero'
import ContentSection from '../components/sections/ContentSection'
import AboutOverview from '../components/sections/about/AboutOverview'
import AboutMissionVision from '../components/sections/about/AboutMissionVision'
import AboutHistory from '../components/sections/about/AboutHistory'
import AboutHowItWorks from '../components/sections/about/AboutHowItWorks'
import AboutLeadershipStructure from '../components/sections/about/AboutLeadershipStructure'
import AboutClosingCta from '../components/sections/about/AboutClosingCta'
import CTAButton from '../components/ui/CTAButton'
import aboutData from '../data/about.json'
import pages from '../data/pages.json'

export default function About() {
  const {
    hero,
    overview,
    missionVision,
    history,
    howItWorks,
    leadershipStructure,
    closingCta,
  } = aboutData
  const page = pages.about

  return (
    <>
      <PageHero
        size="page"
        title={page.title}
        description={page.description}
        badge={{ label: hero.badge || 'About ECAA', variant: 'gold' }}
        imageId="home-hero-community-atlanta"
        overlayStrength="default"
      >
        <CTAButton href="#mission-vision" variant="primary" size="lg">
          Mission & Vision
        </CTAButton>
        <CTAButton to="/membership" variant="secondary" size="lg" className="btn-hero-outline">
          Become a Member
        </CTAButton>
      </PageHero>

      <AboutOverview section={overview} />

      <ContentSection
        id={missionVision.id}
        eyebrow={missionVision.eyebrow}
        title={missionVision.title}
      >
        <AboutMissionVision section={missionVision} />
      </ContentSection>

      <ContentSection id={history.id} eyebrow={history.eyebrow} title={history.title} muted>
        <AboutHistory section={history} />
      </ContentSection>

      <ContentSection id={howItWorks.id} eyebrow={howItWorks.eyebrow} title={howItWorks.title}>
        <AboutHowItWorks section={howItWorks} />
      </ContentSection>

      <ContentSection
        id={leadershipStructure.id}
        eyebrow={leadershipStructure.eyebrow}
        title={leadershipStructure.title}
        muted
      >
        <AboutLeadershipStructure section={leadershipStructure} />
      </ContentSection>

      <AboutClosingCta section={closingCta} />
    </>
  )
}
