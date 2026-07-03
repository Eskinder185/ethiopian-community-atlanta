import Container from '../ui/Container'
import HomeSectionHeader from '../ui/HomeSectionHeader'
import FeaturedEventCard from '../cards/FeaturedEventCard'
import CTAButton from '../ui/CTAButton'
import EmptyState from '../ui/EmptyState'
import AnimateIn from '../ui/AnimateIn'
import { getLinkProps, getHomepageFeaturedEvents, isSectionVisible } from '../../utils/homepage'

export default function HomeEventsPreview({ section, events = [] }) {
  if (!isSectionVisible(section)) return null

  const maxItems = section.maxItems ?? 3
  const items = getHomepageFeaturedEvents(events, maxItems)
  const sectionCta = getLinkProps(section.sectionCta)
  const emptyState = section.emptyState ?? {}
  const emptyPrimaryCta = getLinkProps(emptyState.primaryCta)
  const hasItems = items.length > 0

  return (
    <section className="home-section surface-white" aria-labelledby="home-events-heading">
      <Container className="home-section-inner">
        <AnimateIn>
          <HomeSectionHeader
            id="home-events-heading"
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            action={
              hasItems && sectionCta
                ? { label: section.sectionCta.label, ...sectionCta, variant: 'secondary' }
                : undefined
            }
            className="home-section-header-row"
          />

          {hasItems ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <AnimateIn key={item.id} delay={index * 60}>
                  <FeaturedEventCard item={item} />
                </AnimateIn>
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-10 rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-cream/40 p-8 text-center shadow-ecaa-sm sm:p-10"
              headingLevel="h3"
              title={emptyState.title || 'Upcoming events will be shared soon'}
              description={
                emptyState.description ||
                'ECAA events and community updates will appear here as they become available.'
              }
              action={
                emptyPrimaryCta ? (
                  <CTAButton {...emptyPrimaryCta} variant="primary" size="lg">
                    {emptyState.primaryCta?.label || 'View All Events'}
                  </CTAButton>
                ) : null
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
