import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'

export default function MembershipClosingCta({ section }) {
  if (!section) return null

  return (
    <section className="surface-white py-16 sm:py-20">
      <Container>
        <AnimateIn>
          <div className="rounded-ecaa-2xl border border-ecaa-green-800/20 bg-gradient-to-br from-ecaa-green-900 via-ecaa-green-950 to-ecaa-green-900 px-6 py-10 text-center shadow-ecaa-md sm:px-10 sm:py-12">
            <h2 className="text-2xl font-semibold tracking-tight text-ecaa-white sm:text-3xl">
              {section.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ecaa-green-100/90 sm:text-lg">
              {section.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              {section.buttons?.map((button, index) => (
                <CTAButton
                  key={button.href}
                  href={button.external ? button.href : undefined}
                  to={button.external ? undefined : button.href}
                  variant={index === 0 ? 'accent' : 'secondary'}
                  size="lg"
                  target={button.external ? '_blank' : undefined}
                  rel={button.external ? 'noopener noreferrer' : undefined}
                  aria-label={
                    button.external ? `${button.label} (opens in a new tab)` : button.label
                  }
                  className={
                    index !== 0
                      ? '!border-ecaa-white/40 !bg-transparent !text-ecaa-white hover:!bg-ecaa-white/10'
                      : ''
                  }
                >
                  {button.label}
                </CTAButton>
              ))}
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
