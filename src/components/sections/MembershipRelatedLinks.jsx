import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import membershipData from '../../content/membership.json'

export default function MembershipRelatedLinks() {
  const { relatedLinks } = membershipData

  return (
    <section className="surface-white py-12 sm:py-14">
      <Container>
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-xl font-semibold tracking-tight text-ecaa-green-950 sm:text-2xl">
              {relatedLinks.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ecaa-ink-muted">
              {relatedLinks.description}
            </p>
            <nav
              className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3"
              aria-label="Related ECAA pages"
            >
              {relatedLinks.links.map((link) => (
                <CTAButton key={link.path} to={link.path} variant="secondary" size="md">
                  {link.label}
                </CTAButton>
              ))}
            </nav>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
