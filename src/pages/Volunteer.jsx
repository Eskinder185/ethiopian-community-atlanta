import PageHero from '../components/layout/PageHero'
import Container from '../components/ui/Container'
import AnimateIn from '../components/ui/AnimateIn'
import MailtoForm from '../components/forms/MailtoForm'
import volunteerData from '../data/volunteer.json'

export default function Volunteer() {
  const { hero, areas, form } = volunteerData

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        badge={{ label: 'Serve the community', variant: 'green' }}
        imageId="home-hero-community-atlanta"
      >
        <a href="#volunteer-form" className="btn btn-primary btn-lg">
          Volunteer Interest Form
        </a>
      </PageHero>

      <section className="surface-white">
        <Container className="section-spacing-sm">
          <AnimateIn>
            <h2 className="heading-section text-center text-2xl">Volunteer Areas</h2>
            <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
              {areas.map((area) => (
                <li
                  key={area}
                  className="rounded-ecaa-lg border border-ecaa-border/60 bg-ecaa-cream/50 px-5 py-4 text-base text-ecaa-ink-muted"
                >
                  {area}
                </li>
              ))}
            </ul>
          </AnimateIn>
        </Container>
      </section>

      <section className="surface-muted" id="volunteer-form">
        <Container className="section-spacing-sm">
          <AnimateIn>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-section text-2xl">Volunteer Interest Form</h2>
              <p className="text-body mt-4">
                Share your interest, availability, and preferred volunteer area with ECAA.
              </p>
            </div>
            <div className="mt-10">
              <MailtoForm
                email={form.email}
                subject={form.subject}
                fields={form.fields}
                submitLabel={form.submitLabel}
                note={form.note}
                areaOptions={areas}
              />
            </div>
          </AnimateIn>
        </Container>
      </section>
    </>
  )
}
