import PageHero from '../components/layout/PageHero'
import EventsSection, {
  eventSectionConfigs,
} from '../components/sections/EventsSection'
import CTAButton from '../components/ui/CTAButton'
import pages from '../data/pages.json'

export default function Events() {
  const page = pages.events

  return (
    <>
      <PageHero
        eyebrow="Events & News"
        title={page.title}
        description={page.description}
        badge={{ label: 'Community calendar', variant: 'gold' }}
      >
        <CTAButton href="#upcoming-events" variant="primary" size="lg">
          Upcoming Events
        </CTAButton>
        <CTAButton href="#community-news" variant="secondary" size="lg">
          Community News
        </CTAButton>
      </PageHero>

      {eventSectionConfigs.map((config, index) => (
        <EventsSection key={config.id} config={config} muted={index % 2 === 1} />
      ))}
    </>
  )
}
