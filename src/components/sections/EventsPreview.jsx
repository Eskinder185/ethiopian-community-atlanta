import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import EventCard from '../cards/EventCard'
import EmptyState from '../ui/EmptyState'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import eventsData from '../../data/events.json'
import { filterPublished } from '../../utils/data'

export default function EventsPreview({ limit = 2 }) {
  const events = filterPublished(eventsData.upcoming).slice(0, limit)

  return (
    <section className="surface-muted">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow="Events & News"
            title="Community gatherings and updates"
            description="Stay connected with what is happening across ECAA."
            action={{ label: 'View events', to: '/events', variant: 'secondary' }}
          />

          {events.length > 0 ? (
            <div className="mt-14 grid-cards-2">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-14"
              title="Upcoming events will be added soon."
              description="TODO: Add upcoming events to events.json when dates and details are confirmed."
              action={
                <CTAButton to="/events" variant="secondary">
                  View Events &amp; News
                </CTAButton>
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
