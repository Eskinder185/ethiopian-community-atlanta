import PageHeroWithStats from './PageHeroWithStats'
import { getPageHero, getHeroBackground, isHeroSectionVisible } from '../../utils/pageHeroes'

export default function PageHeroFromConfig({ page, priority = false }) {
  const hero = getPageHero(page)

  if (!hero || !isHeroSectionVisible(hero)) return null

  const background = getHeroBackground(hero, page)

  return (
    <PageHeroWithStats
      eyebrow={hero.eyebrow}
      title={hero.title}
      description={hero.description}
      backgroundImage={background}
      backgroundAlt={hero.backgroundAlt}
      buttons={hero.buttons}
      stats={hero.stats}
      summaryBand={hero.summaryBand}
      trustCue={hero.trustCue}
      variant={hero.variant || 'page'}
      overlayStrength={hero.overlayStrength || 'default'}
      usePattern={hero.usePattern}
      priority={priority || page === 'home'}
    />
  )
}
