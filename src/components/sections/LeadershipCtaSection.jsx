import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'

export default function LeadershipCtaSection({ section }) {
  if (!section?.title) return null

  return (
    <section className="surface-muted">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="ecaa-card-premium mx-auto max-w-3xl text-center">
            <h2 className="heading-section text-2xl sm:text-3xl">{section.title}</h2>
            {section.buttons?.length > 0 && (
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                {section.buttons.map((button, index) => (
                  <CTAButton
                    key={`${button.label}-${button.href}`}
                    to={button.href}
                    variant={index === 0 ? 'primary' : 'secondary'}
                    size="lg"
                  >
                    {button.label}
                  </CTAButton>
                ))}
              </div>
            )}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
