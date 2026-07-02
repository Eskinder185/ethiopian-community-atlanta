import PageHero from '../components/layout/PageHero'
import EventsQuickActionsBar from '../components/sections/EventsQuickActionsBar'
import EventsStatusSection from '../components/sections/EventsStatusSection'
import EventHallRentalSection from '../components/sections/EventHallRentalSection'
import EventsClosingCta from '../components/sections/EventsClosingCta'
import EventCard from '../components/cards/EventCard'
import AnnouncementCard from '../components/cards/AnnouncementCard'
import CTAButton from '../components/ui/CTAButton'
import eventsData from '../content/events.json'
import pages from '../data/pages.json'
import {
  getVerifiedAnnouncements,
  getVerifiedCommunityNews,
  getVerifiedPastEvents,
  getVerifiedUpcomingEvents,
} from '../utils/events'

export default function Events() {
  const page = pages.events
  const {
    quickActions,
    emptyStates,
    upcoming,
    announcements,
    communityNews,
    past,
    bookHall,
    closingCta,
  } = eventsData

  const upcomingEvents = getVerifiedUpcomingEvents(upcoming)
  const announcementItems = getVerifiedAnnouncements(announcements)
  const newsItems = getVerifiedCommunityNews(communityNews)
  const pastEvents = getVerifiedPastEvents(past)

  return (
    <>
      <PageHero
        size="page"
        eyebrow="Events & News"
        title={page.title}
        description={page.description}
        badge={{ label: 'Community calendar', variant: 'gold' }}
        imageId="events-community-gathering"
        overlayStrength="default"
      >
        <CTAButton href="#upcoming" variant="primary" size="lg">
          Upcoming Events
        </CTAButton>
        <CTAButton href="#book-hall" variant="secondary" size="lg" className="btn-hero-outline">
          Book a Hall
        </CTAButton>
      </PageHero>

      <EventsQuickActionsBar actions={quickActions} />

      <EventsStatusSection
        id="upcoming"
        label="Upcoming Events"
        title="Upcoming Events"
        description="Community gatherings, celebrations, and programs on the calendar."
        items={upcomingEvents}
        renderItem={(item) => <EventCard key={item.id} event={item} variant="upcoming" />}
        emptyState={emptyStates.upcoming}
        emptyActions={[
          { label: 'Contact ECAA', to: '/contact' },
          { label: 'View Announcements', href: '#announcements' },
        ]}
      />

      <EventsStatusSection
        id="announcements"
        label="Announcements"
        title="Announcements"
        description="Important updates for ECAA members and the community."
        items={announcementItems}
        renderItem={(item) => <AnnouncementCard key={item.id} item={item} type="announcement" />}
        emptyState={emptyStates.announcements}
        muted
      />

      <EventsStatusSection
        id="community-news"
        label="Community News"
        title="Community News"
        description="Stories and news from the ECAA community."
        items={newsItems}
        renderItem={(item) => <AnnouncementCard key={item.id} item={item} type="news" />}
        emptyState={emptyStates.communityNews}
        emptyActions={[{ label: 'Contact ECAA', to: '/contact' }]}
        compactEmpty
      />

      <EventsStatusSection
        id="past"
        label="Past Events"
        title="Past Events"
        description="A look back at previous ECAA gatherings and programs."
        items={pastEvents}
        renderItem={(item) => <EventCard key={item.id} event={item} variant="past" />}
        emptyState={emptyStates.past}
        compactEmpty
        muted
      />

      <EventHallRentalSection section={bookHall} />
      <EventsClosingCta section={closingCta} />
    </>
  )
}
