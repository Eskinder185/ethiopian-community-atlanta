import { useEffect } from 'react'
import HomeHero from '../components/home/HomeHero'
import HomeEventsPreview from '../components/home/HomeEventsPreview'
import HomeMediaPreview from '../components/home/HomeMediaPreview'
import HomeBookHall from '../components/home/HomeBookHall'
import HomeFeaturedPrograms from '../components/home/HomeFeaturedPrograms'
import HomeFinalCTA from '../components/home/HomeFinalCTA'
import { useHomepage } from '../hooks/useHomepageContent'
import { useEvents } from '../hooks/useEvents'
import { useMediaItems } from '../hooks/useMediaItems'
import { usePrograms } from '../hooks/usePrograms'

function setMetaDescription(content) {
  if (!content) return
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

export default function Home() {
  const { homepage } = useHomepage()
  const { events } = useEvents()
  const { mediaItems } = useMediaItems(events)
  const { programs } = usePrograms()

  useEffect(() => {
    document.title = homepage.seo?.title || 'Ethiopian Community Association in Atlanta | Join ECAA'
    setMetaDescription(homepage.seo?.description)
  }, [homepage.seo?.title, homepage.seo?.description])

  return (
    <>
      <HomeHero data={homepage.hero} />
      <HomeEventsPreview section={homepage.eventsCommunity} events={events} />
      <HomeMediaPreview section={homepage.communityMoments} mediaItems={mediaItems} />
      <HomeBookHall data={homepage.bookHall} />
      <HomeFeaturedPrograms section={homepage.featuredPrograms} programs={programs} />
      <HomeFinalCTA data={homepage.finalCta} />
    </>
  )
}
