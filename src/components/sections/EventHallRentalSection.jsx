import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'

export default function EventHallRentalSection({ section }) {
  if (!section) return null

  const requestPath = section.requestPath || '/contact'
  const contactPath = section.contactPath || '/contact'

  return (
    <section
      id={section.id || 'book-hall'}
      className="border-y border-ecaa-gold-200/50 bg-gradient-to-br from-ecaa-gold-50 via-ecaa-cream to-ecaa-gold-100/30 py-16 sm:py-20"
    >
      <Container>
        <AnimateIn>
          <div className="overflow-hidden rounded-ecaa-2xl border border-ecaa-gold-200/60 bg-ecaa-white/95 shadow-ecaa-md lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ecaa-gold-100 to-ecaa-gold-50 text-xs font-bold tracking-wide text-ecaa-gold-700"
                  aria-hidden="true"
                >
                  EH
                </div>
                <div>
                  <p className="text-eyebrow text-ecaa-gold-700">Event Hall Rental</p>
                  <h2 className="heading-section mt-2 text-ecaa-green-950">{section.title}</h2>
                </div>
              </div>

              <p className="text-lead mt-5 max-w-xl text-ecaa-ink-muted">{section.description}</p>

              {section.importantNote && (
                <div
                  className="mt-6 rounded-ecaa-lg border border-ecaa-gold-200/70 bg-ecaa-gold-50/60 px-5 py-4"
                  role="note"
                >
                  <p className="text-sm leading-relaxed text-ecaa-ink-muted sm:text-base">
                    <span className="font-semibold text-ecaa-ink">Important:</span>{' '}
                    {section.importantNote}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CTAButton to={requestPath} variant="primary" size="lg">
                  Request Hall Availability
                </CTAButton>
                <CTAButton to={contactPath} variant="secondary" size="lg">
                  Contact ECAA
                </CTAButton>
              </div>
            </div>

            <div className="border-t border-ecaa-gold-200/50 bg-gradient-to-br from-ecaa-cream via-ecaa-gold-50/40 to-ecaa-green-50/30 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <h3 className="text-lg font-semibold text-ecaa-green-950">Good for</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {section.goodFor?.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-ecaa-lg border border-ecaa-border/60 bg-ecaa-white/80 px-4 py-3 text-base text-ecaa-ink-muted"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ecaa-gold-500"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
