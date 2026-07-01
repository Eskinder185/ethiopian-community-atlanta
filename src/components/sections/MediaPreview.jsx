import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import VideoCard from '../cards/VideoCard'
import ImageCard from '../cards/ImageCard'
import EmptyState from '../ui/EmptyState'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import videosData from '../../data/videos.json'
import imagesData from '../../data/images.json'
import { filterPublished } from '../../utils/data'

export default function MediaPreview() {
  const videos = filterPublished(videosData.videos).slice(0, 1)
  const images = filterPublished(imagesData.images).slice(0, 2)
  const hasContent = videos.length > 0 || images.length > 0

  return (
    <section className="surface-white">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow="Media"
            title="Stories from our community"
            description="Photos and videos from ECAA events and programs."
            action={{ label: 'View media', to: '/media', variant: 'secondary' }}
          />

          {hasContent ? (
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
              {images.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-14"
              title="Community media coming soon"
              description="TODO: Add verified photos and videos to the media library."
              action={
                <CTAButton to="/media" variant="secondary">
                  Visit Media
                </CTAButton>
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
