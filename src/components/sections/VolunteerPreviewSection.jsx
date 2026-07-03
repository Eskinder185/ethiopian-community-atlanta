import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import { getLinkProps, getVisibleItems, isSectionVisible, isUsableHomeText } from '../../utils/homepage'

export default function VolunteerPreviewSection({ data }) {
  if (!isSectionVisible(data)) return null

  const highlights = getVisibleItems(
    data.highlights,
    (item) => isUsableHomeText(item),
  )
  const primaryCta = getLinkProps(data.primaryCta)
  const secondaryCta = getLinkProps(data.secondaryCta)

  return (
    <section className="surface-cream" aria-labelledby="volunteer-preview-heading">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
          />

          {highlights.length > 0 && (
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((item, index) => (
                <AnimateIn key={item} delay={index * 40} as="li">
                  <div className="rounded-ecaa-lg border border-ecaa-border/60 bg-ecaa-white px-5 py-4 text-base text-ecaa-ink-muted">
                    {item}
                  </div>
                </AnimateIn>
              ))}
            </ul>
          )}

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            {primaryCta && (
              <CTAButton {...primaryCta} variant="primary" size="lg">
                {data.primaryCta.label}
              </CTAButton>
            )}
            {secondaryCta && (
              <CTAButton {...secondaryCta} variant="secondary" size="lg">
                {data.secondaryCta.label}
              </CTAButton>
            )}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
