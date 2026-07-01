import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import ContactCard from '../cards/ContactCard'
import contactData from '../../data/contact.json'
import siteInfo from '../../data/siteInfo.json'
import { filterPublished, hasUsableText } from '../../utils/data'

function ContactDetail({ label, value, href }) {
  return (
    <div className="ecaa-card">
      <p className="text-sm font-semibold uppercase tracking-widest text-ecaa-gold-600">
        {label}
      </p>
      {hasUsableText(value) ? (
        href ? (
          <a
            href={href}
            className="mt-3 block text-lg font-medium text-ecaa-green-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500"
          >
            {value}
          </a>
        ) : (
          <p className="mt-3 text-lg text-ecaa-ink">{value}</p>
        )
      ) : (
        <p className="mt-3 text-base text-ecaa-ink-subtle">
          TODO: Add verified {label.toLowerCase()}
        </p>
      )}
    </div>
  )
}

export default function ContactDetailsSection() {
  const { general, departments } = contactData
  const { address } = general
  const publishedDepartments = filterPublished(departments)

  const streetDisplay = hasUsableText(address.street)
    ? address.street
    : 'TODO: Add verified street address'

  const cityLine = hasUsableText(address.zip)
    ? `${address.city}, ${address.state} ${address.zip}`
    : `${address.city}, ${address.state}`

  return (
    <>
      <section className="surface-white">
        <Container className="section-spacing-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <ContactDetail
              label="Email"
              value={general.email}
              href={hasUsableText(general.email) ? `mailto:${general.email}` : undefined}
            />
            <ContactDetail
              label="Phone"
              value={general.phone}
              href={
                hasUsableText(general.phone)
                  ? `tel:${general.phone.replace(/\s/g, '')}`
                  : undefined
              }
            />
            <ContactDetail label="Office hours" value={general.hours} />
            <div className="ecaa-card">
              <p className="text-sm font-semibold uppercase tracking-widest text-ecaa-gold-600">
                Address
              </p>
              <address className="mt-3 not-italic text-lg leading-relaxed text-ecaa-ink">
                {streetDisplay}
                <br />
                {cityLine}
                <br />
                {address.country}
              </address>
            </div>
          </div>
        </Container>
      </section>

      <section className="surface-muted" id="map">
        <Container className="section-spacing-sm">
          <h2 className="heading-section">Map</h2>
          <p className="text-body mt-3 max-w-2xl">
            TODO: Add verified map embed or directions once the official ECAA
            address is confirmed.
          </p>
          <div
            className="mt-8 flex aspect-[16/9] max-h-96 items-center justify-center rounded-ecaa-xl border border-dashed border-ecaa-border-strong bg-ecaa-cream-dark px-6 text-center"
            role="img"
            aria-label="Map placeholder — location details to be added"
          >
            <div>
              <p className="text-lg font-semibold text-ecaa-ink">
                {siteInfo.name}
              </p>
              <p className="mt-2 text-base text-ecaa-ink-subtle">
                {address.city}, {address.state}
              </p>
              <p className="mt-4 text-sm text-ecaa-ink-faint">
                Map area — TODO: Add verified location
              </p>
            </div>
          </div>
        </Container>
      </section>

      {publishedDepartments.length > 0 && (
        <section className="surface-white">
          <Container className="section-spacing-sm">
            <h2 className="heading-section">Department contacts</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {publishedDepartments.map((dept) => (
                <ContactCard key={dept.id} contact={dept} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="surface-muted">
        <Container className="section-spacing-sm">
          <div className="ecaa-card mx-auto max-w-3xl text-center">
            <h2 className="heading-section text-2xl">Ready to get involved?</h2>
            <p className="text-body mx-auto mt-4 max-w-xl">
              TODO: Add verified preferred contact method or response time
              expectations.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton to="/membership" variant="primary" size="lg">
                Become a Member
              </CTAButton>
              <CTAButton to="/support" variant="secondary" size="lg">
                Support ECAA
              </CTAButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
