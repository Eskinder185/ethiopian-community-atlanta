import Container from '../ui/Container'
import HomeSectionHeader from '../ui/HomeSectionHeader'
import FeaturedMediaCollage from '../ui/FeaturedMediaCollage'
import AnimateIn from '../ui/AnimateIn'
import {
  getLinkProps,
  getVisibleItems,
  isFeaturedMediaItem,
  isSectionVisible,
} from '../../utils/homepage'

export default function FeaturedMediaSection({ data }) {
  if (!isSectionVisible(data)) return null

  const items = getVisibleItems(data.items, isFeaturedMediaItem, 6)
  const sectionCta = getLinkProps(data.sectionCta)
  const hasItems = items.length > 0
  const sectionHref = sectionCta?.to || sectionCta?.href || '/media'

  return (
    <section className="home-section surface-muted">
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
            <FeaturedMediaCollage
              items={items}
              sectionHref={sectionHref}
              className="home-section-grid mt-10"
            />
          ) : (
            <div className="home-media-placeholder mt-10 grid gap-3 sm:grid-cols-4 sm:auto-rows-[minmax(160px,1fr)]">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`rounded-ecaa-xl border border-ecaa-border/60 bg-gradient-to-br from-ecaa-green-100/60 via-ecaa-cream to-ecaa-gold-100/40 shadow-ecaa-sm ${
                    index === 0 ? 'min-h-[260px] sm:col-span-2 sm:row-span-2' : 'min-h-[160px]'
                  }`}
                  aria-hidden="true"
                />
              ))}
              <p className="sm:col-span-4 mt-2 text-center text-sm text-ecaa-ink-subtle">
                Community photos and videos will appear here soon.
              </p>
            </div>
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
