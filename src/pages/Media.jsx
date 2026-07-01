import PageHero from '../components/layout/PageHero'
import {
  MediaVideosSection,
  MediaPhotosSection,
} from '../components/sections/MediaSections'
import CTAButton from '../components/ui/CTAButton'
import pages from '../data/pages.json'

export default function Media() {
  const page = pages.media

  return (
    <>
      <PageHero
        eyebrow="Media"
        title={page.title}
        description={page.description}
        badge={{ label: 'Photos & videos', variant: 'red' }}
      >
        <CTAButton href="#videos" variant="primary" size="lg">
          Videos
        </CTAButton>
        <CTAButton href="#photos" variant="secondary" size="lg">
          Photos
        </CTAButton>
      </PageHero>

      <MediaVideosSection />
      <MediaPhotosSection muted />
    </>
  )
}
