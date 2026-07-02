import PageHero from '../components/layout/PageHero'
import FeaturedEventsSection from '../components/sections/FeaturedEventsSection'
import FeaturedMediaSection from '../components/sections/FeaturedMediaSection'
import BookHallHomeSection from '../components/sections/BookHallHomeSection'
import FeaturedProgramsSection from '../components/sections/FeaturedProgramsSection'
import CTAButton from '../components/ui/CTAButton'
import homepage from '../content/homepage.json'
import { getLinkProps, getPublicText, isSectionVisible } from '../utils/homepage'

export default function Home() {
  const { hero, featuredEvents, featuredMedia, bookHall, featuredPrograms } = homepage

  return (
    <>
      {isSectionVisible(hero) && (
        <PageHero
          size="home"
          priority
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={hero.description}
          imageId="home-hero-community-atlanta"
          overlayStrength="welcoming"
          footer={getPublicText(hero.trustCue)}
        >
          {getLinkProps(hero.primaryCta) && (
            <CTAButton {...getLinkProps(hero.primaryCta)} variant="primary" size="lg">
              {hero.primaryCta.label}
            </CTAButton>
          )}
          {getLinkProps(hero.secondaryCta) && (
            <CTAButton
              {...getLinkProps(hero.secondaryCta)}
              variant="secondary"
              size="lg"
              className="btn-hero-outline"
            >
              {hero.secondaryCta.label}
            </CTAButton>
          )}
          {getLinkProps(hero.supportCta) && (
            <CTAButton
              {...getLinkProps(hero.supportCta)}
              variant="ghost"
              size="lg"
              className="btn-hero-ghost"
            >
              {hero.supportCta.label}
            </CTAButton>
          )}
        </PageHero>
      )}

      <FeaturedEventsSection data={featuredEvents} />
      <FeaturedMediaSection data={featuredMedia} />
      <BookHallHomeSection data={bookHall} />
      <FeaturedProgramsSection data={featuredPrograms} />
    </>
  )
}
