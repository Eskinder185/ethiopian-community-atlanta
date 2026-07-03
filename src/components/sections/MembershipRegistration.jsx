import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import ExternalFormCTA from '../ui/ExternalFormCTA'
import AnimateIn from '../ui/AnimateIn'

export default function MembershipRegistration({ section }) {
  if (!section) return null

  const importantLabel = section.importantLabel || 'Important:'

  return (
    <section className="surface-muted" id="registration-form">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={section.label}
            title={section.title}
            description={section.description}
            align="center"
            className="mx-auto max-w-3xl"
          />

          {section.importantNote && (
            <div
              className="mx-auto mt-8 max-w-3xl rounded-ecaa-lg border border-ecaa-gold-200/70 bg-ecaa-gold-50/50 px-5 py-4 text-center sm:text-left"
              role="note"
            >
              <p className="text-base leading-relaxed text-ecaa-ink-muted">
                <span className="font-semibold text-ecaa-ink">{importantLabel}</span>{' '}
                {section.importantNote}
              </p>
            </div>
          )}

          <div className="mt-10">
            <ExternalFormCTA
              title={section.ctaTitle}
              description={section.ctaDescription}
              buttonLabel={section.ctaLabel}
              formUrl={section.formUrl}
            />
          </div>

          {section.privacyNote && (
            <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ecaa-ink-subtle sm:text-base">
              {section.privacyNote}
            </p>
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
