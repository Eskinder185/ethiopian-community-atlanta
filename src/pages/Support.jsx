import PageHero from '../components/layout/PageHero'
import Container from '../components/ui/Container'
import CTAButton from '../components/ui/CTAButton'
import ExternalFormCTA from '../components/ui/ExternalFormCTA'
import AnimateIn from '../components/ui/AnimateIn'
import supportData from '../data/support.json'

export default function Support() {
  const { hero, donationCampaign, otherOptions, closingNote } = supportData

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        badge={{ label: 'Give & support', variant: 'red' }}
        imageId="membership-welcome"
      >
        <CTAButton href="#donate" variant="primary" size="lg">
          Donate
        </CTAButton>
        <CTAButton to="/volunteer" variant="secondary" size="lg" className="btn-hero-outline">
          Volunteer
        </CTAButton>
      </PageHero>

      <section className="surface-white" id="donate">
        <Container className="section-spacing-sm">
          <AnimateIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-eyebrow">Donation campaign</p>
              <h2 className="heading-section mt-3 text-3xl">{donationCampaign.title}</h2>
              <p className="text-body mx-auto mt-4 max-w-2xl">{donationCampaign.description}</p>
            </div>

            <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {donationCampaign.levels.map((level) => (
                <li
                  key={level.name}
                  className="rounded-ecaa-lg border border-ecaa-border/60 bg-ecaa-cream/50 px-5 py-4 text-center"
                >
                  <p className="font-semibold text-ecaa-ink">{level.name}</p>
                  <p className="mt-1 text-lg text-ecaa-green-800">{level.amount}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <ExternalFormCTA
                title="Make a Donation"
                description={donationCampaign.ctaDescription}
                buttonLabel={donationCampaign.ctaLabel}
                formUrl={donationCampaign.formUrl}
              />
            </div>
          </AnimateIn>
        </Container>
      </section>

      <section className="surface-muted" id="other-ways">
        <Container className="section-spacing-sm">
          <AnimateIn>
            <div className="ecaa-card mx-auto max-w-3xl text-center">
              <h2 className="heading-section text-2xl">{otherOptions.title}</h2>
              <p className="text-body mx-auto mt-4 max-w-xl">{otherOptions.description}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {otherOptions.links.map((link) => (
                  <CTAButton key={link.path} to={link.path} variant="secondary" size="lg">
                    {link.label}
                  </CTAButton>
                ))}
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>

      <section className="surface-muted" id="volunteer">
        <Container className="section-spacing-sm">
          <AnimateIn>
            <div className="ecaa-card mx-auto max-w-3xl text-center">
              <h2 className="heading-section text-2xl">Volunteer with ECAA</h2>
              <p className="text-body mx-auto mt-4 max-w-xl">
                ECAA welcomes volunteers who want to support community programs, events, and services.
                Visit the volunteer page to learn more and get started.
              </p>
              <div className="mt-8">
                <CTAButton to="/volunteer" variant="primary" size="lg">
                  Volunteer Opportunities
                </CTAButton>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>

      <section className="surface-white">
        <Container className="section-spacing-sm">
          <div className="ecaa-card mx-auto max-w-3xl text-center">
            <h2 className="heading-section text-2xl">Questions about supporting ECAA?</h2>
            <p className="text-body mx-auto mt-4 max-w-xl">{closingNote}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton to="/contact" variant="primary" size="lg">
                Contact ECAA
              </CTAButton>
              <CTAButton to="/membership" variant="secondary" size="lg">
                Become a Member
              </CTAButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
