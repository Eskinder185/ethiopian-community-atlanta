import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import homeData from '../../content/homepage.json'

export default function MembershipPreview() {
  const { membershipPreview } = homeData

  return (
    <section className="surface-white">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="ecaa-card-premium mx-auto max-w-3xl text-center">
            <SectionHeader
              eyebrow={membershipPreview.eyebrow}
              title={membershipPreview.title}
              description={membershipPreview.description}
              align="center"
              className="mx-auto"
            />
            <CTAButton
              to={membershipPreview.ctaPath}
              variant="primary"
              size="lg"
              className="mt-10"
            >
              {membershipPreview.ctaLabel}
            </CTAButton>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
