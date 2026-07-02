import VideoCard from '../cards/VideoCard'
import ImageCard from '../cards/ImageCard'
import EmptyState from '../ui/EmptyState'
import ContentSection from './ContentSection'
import videosData from '../../content/videos.json'
import imagesData from '../../content/images.json'
import {
  filterPublished,
  filterVerifiedContent,
  hasUsableText,
  hasUsableUrl,
  toEmbedUrl,
} from '../../utils/data'

export function MediaVideosSection({ muted = false }) {
  const videos = filterVerifiedContent(videosData.videos, ['title']).filter(
    (video) => Boolean(toEmbedUrl(video.embedUrl)) || hasUsableUrl(video.embedUrl),
  )

  return (
    <ContentSection
      id="videos"
      eyebrow="Media"
      title="Videos"
      description="Community videos from ECAA events and programs."
      muted={muted}
    >
      {videos.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Videos coming soon"
          description="Community videos will appear here when published."
        />
      )}
    </ContentSection>
  )
}

export function MediaPhotosSection({ muted = false }) {
  const images = filterPublished(imagesData.images).filter(
    (image) =>
      image.mediaGallery !== false &&
      hasUsableText(image.title) &&
      hasUsableText(image.src),
  )

  return (
    <ContentSection
      id="photos"
      eyebrow="Media"
      title="Photos"
      description="Photo galleries from the ECAA community."
      muted={muted}
    >
      {images.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Photos coming soon"
          description="Community photo galleries will appear here when published."
        />
      )}
    </ContentSection>
  )
}
