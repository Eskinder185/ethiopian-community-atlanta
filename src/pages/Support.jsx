import PageHero from '../components/layout/PageHero'
import SupportCtaSection from '../components/sections/SupportCtaSection'
import Container from '../components/ui/Container'
import CTAButton from '../components/ui/CTAButton'
import supportData from '../data/support.json'

export default function Support() {
  const { hero, sections } = supportData

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        badge={{ label: 'Give & volunteer', variant: 'red' }}
      >
        <CTAButton href="#donate" variant="primary" size="lg">
          Donate
        </CTAButton>
        <CTAButton href="#volunteer" variant="secondary" size="lg">
          Volunteer
        </CTAButton>
      </PageHero>

      {sections.map((section, index) => (
        <SupportCtaSection
          key={section.id}
          section={section}
          muted={index % 2 === 1}
        />
      ))}

      <section className="surface-muted">
        <Container className="section-spacing-sm">
          <div className="ecaa-card mx-auto max-w-3xl text-center">
            <h2 className="heading-section text-2xl">Questions about supporting ECAA?</h2>
            <p className="text-body mx-auto mt-4 max-w-xl">
              TODO: Add verified contact information for donations, fundraising,
              sponsorship, and volunteer inquiries.
            </p>
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
