import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import contactData from '../../content/contact.json'
import siteInfo from '../../content/siteInfo.json'
import { hasUsableText } from '../../utils/data'

function ContactLine({ label, value, href, multiline = false }) {
  if (!hasUsableText(value)) {
    return (
      <li className="flex flex-col gap-1 sm:flex-row sm:gap-3">
        <span className="min-w-24 text-sm font-semibold uppercase tracking-wide text-ecaa-ink-subtle">
          {label}
        </span>
        <span className="editorial-todo">TODO: Add verified {label.toLowerCase()}</span>
      </li>
    )
  }

  return (
    <li className="flex flex-col gap-1 sm:flex-row sm:gap-3">
      <span className="min-w-24 text-sm font-semibold uppercase tracking-wide text-ecaa-ink-subtle">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          className="text-lg text-ecaa-green-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500"
        >
          {value}
        </a>
      ) : (
        <span className={`text-lg text-ecaa-ink ${multiline ? 'whitespace-pre-line' : ''}`}>{value}</span>
      )}
    </li>
  )
}

export default function ContactPreview() {
  const { general } = contactData
  const { address } = general

  const streetLine = hasUsableText(address.street)
    ? address.street
    : 'TODO: Add verified street address'

  const locationLine = hasUsableText(address.zip)
    ? `${address.city}, ${address.state} ${address.zip}`
    : `${address.city}, ${address.state}`

  return (
    <section className="surface-cream">
      <Container className="section-spacing-sm">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimateIn>
            <SectionHeader
              eyebrow="Contact & Visit"
              title="Let's Connect With ECAA"
              description="Reach out with questions, ideas, or ways to get involved with the Ethiopian community in Atlanta."
            />
          </AnimateIn>

          <AnimateIn delay={100}>
            <article className="ecaa-card-premium">
              <h3 className="text-xl font-semibold tracking-tight text-ecaa-ink">
                {siteInfo.shortName} contact
              </h3>

              <ul className="mt-8 space-y-6">
                <ContactLine
                  label="Email"
                  value={general.email}
                  href={hasUsableText(general.email) ? `mailto:${general.email}` : undefined}
                />
                <ContactLine
                  label="Phone"
                  value={general.phone}
                  href={
                    hasUsableText(general.phone)
                      ? `tel:${general.phone.replace(/\s/g, '')}`
                      : undefined
                  }
                />
                <ContactLine label="Hours" value={general.hours} multiline />
                <li className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <span className="min-w-24 text-sm font-semibold uppercase tracking-wide text-ecaa-ink-subtle">
                    Visit
                  </span>
                  <address className="not-italic text-lg text-ecaa-ink-muted">
                    <span className={streetLine.startsWith('TODO') ? 'editorial-todo' : ''}>
                      {streetLine}
                    </span>
                    <br />
                    {locationLine}
                  </address>
                </li>
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <CTAButton to="/contact" variant="primary">
                  Contact ECAA
                </CTAButton>
                <CTAButton to="/membership" variant="secondary">
                  Become a Member
                </CTAButton>
              </div>
            </article>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
