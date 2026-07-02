import EventCard from '../cards/EventCard'
import AnnouncementCard from '../cards/AnnouncementCard'
import EmptyState from '../ui/EmptyState'
import ContentSection from './ContentSection'
import eventsData from '../../content/events.json'
import { filterVerifiedContent, hasUsableText } from '../../utils/data'

const sections = [
  {
    id: 'upcoming-events',
    title: 'Upcoming Events',
    description: 'Community gatherings, celebrations, and programs on the calendar.',
    key: 'upcoming',
    type: 'event',
    variant: 'upcoming',
    emptyKey: 'upcoming',
  },
  {
    id: 'announcements',
    title: 'Announcements',
    description: 'Important updates for ECAA members and the community.',
    key: 'announcements',
    type: 'announcement',
    emptyKey: 'announcements',
  },
  {
    id: 'community-news',
    title: 'Community News',
    description: 'Stories and news from the ECAA community.',
    key: 'communityNews',
    type: 'news',
    emptyKey: 'communityNews',
  },
  {
    id: 'past-events',
    title: 'Past Events',
    description: 'A look back at previous ECAA gatherings and programs.',
    key: 'past',
    type: 'event',
    variant: 'past',
    emptyKey: 'past',
  },
]

export default function EventsSection({ config, muted = false }) {
  let items = filterVerifiedContent(eventsData[config.key] ?? [], ['title'])
  if (config.variant === 'upcoming') {
    items = items.filter((item) => hasUsableText(item.date))
  }
  const emptyState = eventsData.emptyStates?.[config.emptyKey]

  return (
    <ContentSection
      id={config.id}
      eyebrow="Events & News"
      title={config.title}
      description={config.description}
      muted={muted}
    >
      {items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) =>
            config.type === 'event' ? (
              <EventCard key={item.id} event={item} variant={config.variant} />
            ) : (
              <AnnouncementCard key={item.id} item={item} type={config.type} />
            ),
          )}
        </div>
      ) : (
        <EmptyState
          title={emptyState?.title ?? 'No items published'}
          description={
            emptyState?.description ??
            'Check back soon or contact ECAA for current updates.'
          }
        />
      )}
    </ContentSection>
  )
}

export { sections as eventSectionConfigs }
