import EventCard from '../cards/EventCard'
import AnnouncementCard from '../cards/AnnouncementCard'
import EmptyState from '../ui/EmptyState'
import ContentSection from './ContentSection'
import eventsData from '../../data/events.json'
import { filterVerifiedContent } from '../../utils/data'

const sections = [
  {
    id: 'upcoming-events',
    title: 'Upcoming Events',
    description: 'Community gatherings, celebrations, and programs on the calendar.',
    key: 'upcoming',
    type: 'event',
    variant: 'upcoming',
    emptyTitle: 'Upcoming events will be added soon.',
    emptyDescription:
      'TODO: Add verified upcoming events to events.json with published set to true.',
  },
  {
    id: 'announcements',
    title: 'Announcements',
    description: 'Important updates for ECAA members and the community.',
    key: 'announcements',
    type: 'announcement',
    emptyTitle: 'No announcements yet',
    emptyDescription:
      'TODO: Add verified announcements to events.json with published set to true.',
  },
  {
    id: 'community-news',
    title: 'Community News',
    description: 'Stories and news from the ECAA community.',
    key: 'communityNews',
    type: 'news',
    emptyTitle: 'Community news coming soon',
    emptyDescription:
      'TODO: Add verified news items to events.json with published set to true.',
  },
  {
    id: 'past-events',
    title: 'Past Events',
    description: 'A look back at previous ECAA gatherings and programs.',
    key: 'past',
    type: 'event',
    variant: 'past',
    emptyTitle: 'Past events will be added soon.',
    emptyDescription:
      'TODO: Add verified past events to events.json with published set to true.',
  },
]

export default function EventsSection({ config, muted = false }) {
  const items = filterVerifiedContent(eventsData[config.key] ?? [], ['title'])

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
          title={config.emptyTitle}
          description={config.emptyDescription}
        />
      )}
    </ContentSection>
  )
}

export { sections as eventSectionConfigs }
