import Container from '../ui/Container'
import HomeSectionHeader from '../ui/HomeSectionHeader'
import FeaturedProgramCard from '../cards/FeaturedProgramCard'
import AnimateIn from '../ui/AnimateIn'
import {
  getLinkProps,
  getVisibleItems,
  isFeaturedProgramItem,
  isSectionVisible,
} from '../../utils/homepage'

export default function FeaturedProgramsSection({ data }) {
  if (!isSectionVisible(data)) return null

  const items = getVisibleItems(data.items, isFeaturedProgramItem, 4)
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

          {hasItems && (
            <div className="home-programs-showcase mt-10 grid gap-4 sm:grid-cols-2">
              {items.map((item, index) => (
                <AnimateIn key={item.id} delay={index * 50}>
                  <FeaturedProgramCard item={item} />
                </AnimateIn>
              ))}
            </div>
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
