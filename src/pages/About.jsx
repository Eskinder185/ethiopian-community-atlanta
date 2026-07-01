import PageHero from '../components/layout/PageHero'
import ContentSection from '../components/sections/ContentSection'
import AboutMissionVision from '../components/sections/about/AboutMissionVision'
import AboutHistory from '../components/sections/about/AboutHistory'
import AboutHowItWorks from '../components/sections/about/AboutHowItWorks'
import AboutLeadershipStructure from '../components/sections/about/AboutLeadershipStructure'
import CTAButton from '../components/ui/CTAButton'
import aboutData from '../data/about.json'
import siteInfo from '../data/siteInfo.json'

export default function About() {
  const { hero, missionVision, history, howItWorks, leadershipStructure } = aboutData

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        badge={{ label: siteInfo.shortName, variant: 'green' }}
      >
        <CTAButton href="#mission-vision" variant="primary" size="lg">
          Mission & Vision
        </CTAButton>
        <CTAButton to="/membership" variant="secondary" size="lg">
          Become a Member
        </CTAButton>
      </PageHero>

      <ContentSection
        id={missionVision.id}
        eyebrow={missionVision.eyebrow}
        title={missionVision.title}
      >
        <AboutMissionVision section={missionVision} />
      </ContentSection>

      <ContentSection
        id={history.id}
        eyebrow={history.eyebrow}
        title={history.title}
        muted
      >
        <AboutHistory section={history} />
      </ContentSection>

      <ContentSection
        id={howItWorks.id}
        eyebrow={howItWorks.eyebrow}
        title={howItWorks.title}
      >
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
    </>
  )
}
