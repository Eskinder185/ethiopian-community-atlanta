import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import membershipData from '../../content/membership.json'
import formsData from '../../content/forms.json'

export default function MembershipOptionCard() {
  const { membershipOption } = membershipData
  const formUrl = formsData.membership?.formUrl

  if (!membershipOption?.published) return null

  return (
    <section className="surface-muted" id="membership-options">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <article className="mx-auto max-w-2xl overflow-hidden rounded-ecaa-2xl border border-ecaa-gold-200/70 bg-gradient-to-br from-ecaa-white via-ecaa-cream to-ecaa-gold-50/40 p-8 shadow-ecaa-md sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ecaa-gold-700">
              Standard membership
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ecaa-green-950">
              {membershipOption.title}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-ecaa-ink-muted">
              {membershipOption.subtitle}
            </p>

            <div className="mt-8 rounded-ecaa-xl border border-ecaa-gold-200/60 bg-ecaa-white/80 px-6 py-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-ecaa-gold-700">
                Annual fee
              </p>
              <p className="mt-1 text-2xl font-semibold text-ecaa-green-900">
                {membershipOption.fee.replace('Annual membership fee: ', '')}
              </p>
              <p className="mt-1 text-sm text-ecaa-ink-subtle">per person</p>
            </div>

            <p className="mt-6 text-base leading-relaxed text-ecaa-ink-muted">
              {membershipOption.description}
            </p>

            <CTAButton
              href={formUrl}
              variant="primary"
              size="lg"
              className="mt-8 w-full justify-center sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${membershipOption.ctaLabel} (opens in a new tab)`}
            >
              {membershipOption.ctaLabel}
            </CTAButton>
          </article>
        </AnimateIn>
      </Container>
    </section>
  )
}
