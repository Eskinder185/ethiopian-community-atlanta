import { useMemo } from 'react'
import PageHeroWithStats from '../components/layout/PageHeroWithStats'
import EventSection from '../components/events/EventSection'
import MediaCard from '../components/events/MediaCard'
import { useMediaPage } from '../hooks/useMediaPage'
import { getMediaHighlightCards } from '../data/mediaPageContent'
import { getHeroBackground, getPageHero } from '../utils/pageHeroes'
import {
  filterCommunityLinkMediaItems,
  filterMediaByTypes,
  filterPhotoFlyerMediaItems,
  getFeaturedMediaItems,
  VIDEO_MEDIA_TYPES,
} from '../utils/mediaItems'

export default function Media() {
  const { mediaItems, pageContent } = useMediaPage()
  const pageHeroConfig = useMemo(() => getPageHero('media'), [])
  const background = useMemo(() => getHeroBackground(pageHeroConfig, 'media'), [pageHeroConfig])
  const highlightCards = useMemo(() => getMediaHighlightCards(pageContent), [pageContent])

  const featured = getFeaturedMediaItems(mediaItems)
  const videos = filterMediaByTypes(mediaItems, VIDEO_MEDIA_TYPES)
  const photos = filterPhotoFlyerMediaItems(mediaItems)
  const links = filterCommunityLinkMediaItems(mediaItems)

  const { featured: featuredSection, videos: videosSection, photos: photosSection, links: linksSection } =
    pageContent.sections

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

      <EventSection
        id={featuredSection.id}
        title={featuredSection.title}
        description={featuredSection.description}
        hasItems={featured.length > 0}
        emptyState={featuredSection.emptyState}
      >
        {featured.map((item) => (
          <MediaCard key={item.id} item={item} buttonLabels={pageContent.buttonLabels} />
        ))}
      </EventSection>

      <EventSection
        id={videosSection.id}
        title={videosSection.title}
        description={videosSection.description}
        muted
        hasItems={videos.length > 0}
        emptyState={videosSection.emptyState}
      >
        {videos.map((item) => (
          <MediaCard key={item.id} item={item} buttonLabels={pageContent.buttonLabels} />
        ))}
      </EventSection>

      <EventSection
        id={photosSection.id}
        title={photosSection.title}
        description={photosSection.description}
        hasItems={photos.length > 0}
        emptyState={photosSection.emptyState}
      >
        {photos.map((item) => (
          <MediaCard key={item.id} item={item} buttonLabels={pageContent.buttonLabels} />
        ))}
      </EventSection>

      <EventSection
        id={linksSection.id}
        title={linksSection.title}
        description={linksSection.description}
        muted
        hasItems={links.length > 0}
        emptyState={linksSection.emptyState}
      >
        {links.map((item) => (
          <MediaCard key={item.id} item={item} buttonLabels={pageContent.buttonLabels} />
        ))}
      </EventSection>
    </>
  )
}
