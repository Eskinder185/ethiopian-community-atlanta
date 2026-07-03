import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'

export default function MembershipOptionCard({ section, formUrl }) {
  if (!section?.published) return null

  return (
    <section className="surface-muted" id="membership-options">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <article className="mx-auto max-w-2xl overflow-hidden rounded-ecaa-2xl border border-ecaa-gold-200/70 bg-gradient-to-br from-ecaa-white via-ecaa-cream to-ecaa-gold-50/40 p-8 shadow-ecaa-md sm:p-10">
            <p className="text-xs font-semibold normal-case tracking-wide text-ecaa-gold-700">
              {section.badge || 'Standard membership'}
            </p>
            <h2 className="mt-3 text-3xl font-semibold normal-case tracking-tight text-ecaa-green-950">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mt-3 text-lg leading-relaxed text-ecaa-ink-muted">{section.subtitle}</p>
            )}

            <div className="mt-8 rounded-ecaa-xl border border-ecaa-gold-200/60 bg-ecaa-white/80 px-6 py-5">
              <p className="text-sm font-semibold normal-case tracking-wide text-ecaa-gold-700">
                {section.feeLabel || 'Annual fee'}
              </p>
              <p className="mt-1 text-2xl font-semibold text-ecaa-green-900">{section.feeAmount || '$30.00'}</p>
              <p className="mt-1 text-sm leading-relaxed text-ecaa-ink-subtle">
                {section.feePerPerson || 'per person'}
              </p>
              {section.feeNote && (
                <p className="mt-3 text-sm leading-relaxed text-ecaa-ink-subtle">{section.feeNote}</p>
              )}
            </div>

            {section.description && (
              <p className="mt-6 text-base leading-relaxed text-ecaa-ink-muted">{section.description}</p>
            )}

            <CTAButton
              href={formUrl}
              variant="primary"
              size="lg"
              className="mt-8 w-full justify-center sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${section.ctaLabel} (opens in a new tab)`}
            >
              {section.ctaLabel}
            </CTAButton>
          </article>
        </AnimateIn>
      </Container>
    </section>
  )
}
