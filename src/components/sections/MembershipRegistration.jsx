import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import ExternalFormCTA from '../ui/ExternalFormCTA'
import AnimateIn from '../ui/AnimateIn'
import membershipData from '../../content/membership.json'
import formsData from '../../content/forms.json'

export default function MembershipRegistration() {
  const { registration } = membershipData
  const { membership: form } = formsData

  return (
    <section className="surface-muted" id="registration-form">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={registration.label}
            title={registration.title}
            description={registration.description}
            align="center"
            className="mx-auto max-w-3xl"
          />

          {registration.importantNote && (
            <div
              className="mx-auto mt-8 max-w-3xl rounded-ecaa-lg border border-ecaa-gold-200/70 bg-ecaa-gold-50/50 px-5 py-4 text-center sm:text-left"
              role="note"
            >
              <p className="text-base leading-relaxed text-ecaa-ink-muted">
                <span className="font-semibold text-ecaa-ink">Important:</span>{' '}
                {registration.importantNote}
              </p>
            </div>
          )}

          <div className="mt-10">
            <ExternalFormCTA
              title={registration.ctaTitle}
              description={registration.ctaDescription}
              buttonLabel={registration.ctaLabel}
              formUrl={form.formUrl}
            />
          </div>

          {form.privacyNote && (
            <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ecaa-ink-subtle sm:text-base">
              {form.privacyNote}
            </p>
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
