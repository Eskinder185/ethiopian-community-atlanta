import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import { getLinkProps, isSectionVisible } from '../../utils/homepage'

export default function DonationPreview({ data }) {
  if (!isSectionVisible(data)) return null

  const cta = getLinkProps(data.cta)

  return (
    <section className="surface-muted" aria-labelledby="donation-preview-heading">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="ecaa-card-premium mx-auto max-w-3xl text-center">
            <SectionHeader
              eyebrow={data.eyebrow}
              title={data.title}
              description={data.description}
              align="center"
              className="mx-auto"
            />
            {cta && (
              <CTAButton {...cta} variant="primary" size="lg" className="mt-10">
                {data.cta.label}
              </CTAButton>
            )}
            {data.note && (
              <p className="mt-6 text-sm leading-relaxed text-ecaa-ink-subtle">{data.note}</p>
            )}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
