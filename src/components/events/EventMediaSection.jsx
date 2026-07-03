import Container from '../ui/Container'
import EmptyState from '../ui/EmptyState'
import AnimateIn from '../ui/AnimateIn'
import MediaGrid from './MediaGrid'

export default function EventMediaSection({ section, mediaItems = [] }) {
  const title = section?.title || 'Event Media'
  const description =
    section?.description ||
    'Photos, flyers, videos, and community moments from ECAA events and programs.'
  const emptyTitle = section?.emptyTitle || 'Media coming soon'
  const emptyDescription =
    section?.emptyDescription ||
    'Event photos, flyers, videos, and links will appear here when published.'

  return (
    <section id="event-media" className="surface-muted">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="max-w-3xl">
            <h2 className="heading-section text-2xl sm:text-3xl">{title}</h2>
            <p className="mt-3 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">{description}</p>
          </div>

          {mediaItems.length > 0 ? (
            <div className="mt-10">
              <MediaGrid items={mediaItems} />
            </div>
          ) : (
            <EmptyState className="mt-10 max-w-2xl" title={emptyTitle} description={emptyDescription} compact />
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
