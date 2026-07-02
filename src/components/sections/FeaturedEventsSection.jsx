import Container from '../ui/Container'
import HomeSectionHeader from '../ui/HomeSectionHeader'
import FeaturedEventCard from '../cards/FeaturedEventCard'
import EventPreviewCard from '../cards/EventPreviewCard'
import AnimateIn from '../ui/AnimateIn'
import {
  getLinkProps,
  getVisibleItems,
  isFeaturedEventItem,
  isSectionVisible,
} from '../../utils/homepage'

export default function FeaturedEventsSection({ data }) {
  if (!isSectionVisible(data)) return null

  const items = getVisibleItems(data.items, isFeaturedEventItem, 3)
  const placeholders = data.placeholderItems ?? []
  const sectionCta = getLinkProps(data.sectionCta)
  const hasItems = items.length > 0

  return (
    <section className="home-section surface-white">
      <Container className="home-section-inner">
        <AnimateIn>
          <HomeSectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
            action={
              sectionCta
                ? { label: data.sectionCta.label, ...sectionCta, variant: 'secondary' }
                : undefined
            }
            className="home-section-header-row"
          />

          {hasItems ? (
            <div className="home-events-showcase mt-10">
              <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
                <AnimateIn className="lg:col-span-2 lg:row-span-2">
                  <FeaturedEventCard item={items[0]} size="large" />
                </AnimateIn>
                {items.slice(1, 3).map((item, index) => (
                  <AnimateIn key={item.id} delay={(index + 1) * 60}>
                    <FeaturedEventCard item={item} />
                  </AnimateIn>
                ))}
              </div>
            </div>
          ) : (
            <div className="home-events-showcase mt-10">
              <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
                <AnimateIn className="lg:col-span-2 lg:row-span-2">
                  <EventPreviewCard item={placeholders[0]} size="large" index={0} />
                </AnimateIn>
                {placeholders.slice(1, 3).map((item, index) => (
                  <AnimateIn key={item.id} delay={(index + 1) * 60}>
                    <EventPreviewCard item={item} index={index + 1} />
                  </AnimateIn>
                ))}
              </div>
              {data.emptyCaption && (
                <p className="mt-5 text-center text-sm text-ecaa-ink-subtle">{data.emptyCaption}</p>
              )}
            </div>
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
