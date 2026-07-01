import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import membershipData from '../../data/membership.json'

export default function MembershipOptionCards() {
  const { options } = membershipData

  return (
    <section className="surface-white" id="membership-options">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow="Choose your path"
            title="Membership options"
            description="Select the membership type that fits your needs. TODO: Add verified official guidance if members must choose a specific option."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {options.map((option, index) => (
              <AnimateIn key={option.id} delay={index * 80}>
                <article
                  className={`ecaa-card-premium flex h-full flex-col ${
                    option.highlight
                      ? 'border-ecaa-gold-200/80 bg-gradient-to-br from-ecaa-gold-50/50 to-ecaa-white'
                      : ''
                  }`}
                >
                  {option.highlight && (
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ecaa-gold-700">
                      Includes EDIR
                    </p>
                  )}
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ecaa-ink">
                    {option.title}
                  </h3>
                  <p className="text-body mt-4">{option.summary}</p>
                  <ul className="mt-8 flex-1 space-y-3">
                    {option.details.map((detail) => (
                      <li
                        key={detail}
                        className={`text-base ${detail.startsWith('TODO') ? 'editorial-todo' : 'text-ecaa-ink-muted'}`}
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <CTAButton
                    href="#registration-form"
                    variant={option.highlight ? 'accent' : 'secondary'}
                    className="mt-10 w-full justify-center sm:w-auto"
                  >
                    Start Registration
                  </CTAButton>
                </article>
              </AnimateIn>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
