import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'

export default function LeadershipCtaSection() {
  return (
    <section className="surface-muted">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="ecaa-card-premium mx-auto max-w-3xl text-center">
            <h2 className="heading-section text-2xl sm:text-3xl">
              Want to get involved with ECAA?
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <CTAButton to="/membership" variant="primary" size="lg">
                Become a Member
              </CTAButton>
              <CTAButton to="/volunteer" variant="secondary" size="lg">
                Volunteer
              </CTAButton>
              <CTAButton to="/support" variant="secondary" size="lg">
                Support ECAA
              </CTAButton>
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
