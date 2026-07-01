import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import CTAButton from '../ui/CTAButton'
import Badge from '../ui/Badge'
import AnimateIn from '../ui/AnimateIn'
import membershipData from '../../data/membership.json'
import formsData from '../../data/forms.json'
import siteInfo from '../../data/siteInfo.json'

export default function MembershipRegistration() {
  const { registration } = membershipData
  const form =
    formsData.forms.find((item) => item.id === 'membership-registration') ?? {
      url: siteInfo.membershipFormUrl,
      title: registration.title,
      provider: 'Jotform',
    }

  return (
    <section className="surface-muted" id="registration-form">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow="Register"
            title={registration.title}
            description={registration.description}
            align="center"
            className="mx-auto"
          />

          <article className="ecaa-card-premium mx-auto mt-14 max-w-2xl text-center">
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="green">{form.provider}</Badge>
              <Badge variant="neutral">Secure online form</Badge>
            </div>

            <h3 className="mt-8 text-2xl font-semibold tracking-tight text-ecaa-ink">
              Ready to complete your registration?
            </h3>

            <p className="text-body mx-auto mt-4 max-w-lg">
              The form opens in a new tab. Take your time — you can return here
              anytime to review the checklist or FAQs.
            </p>

            <CTAButton
              href={form.url}
              variant="primary"
              size="lg"
              className="mt-10"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open full registration form (opens in a new tab)"
            >
              {registration.buttonLabel}
            </CTAButton>

            <p
              className={`mt-8 text-base ${
                registration.helperText?.startsWith('TODO')
                  ? 'editorial-todo'
                  : 'text-ecaa-ink-subtle'
              }`}
            >
              {registration.helperText}
            </p>
          </article>
        </AnimateIn>
      </Container>
    </section>
  )
}
