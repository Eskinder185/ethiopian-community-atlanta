import PageHero from '../components/layout/PageHero'
import Container from '../components/ui/Container'
import AnimateIn from '../components/ui/AnimateIn'
import ExternalFormCTA from '../components/ui/ExternalFormCTA'
import MailtoForm from '../components/forms/MailtoForm'
import volunteerData from '../data/volunteer.json'

export default function Volunteer() {
  const { hero, areas, googleForm, form } = volunteerData

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
          Volunteer With ECAA
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
              <h2 className="heading-section text-2xl">{googleForm.title}</h2>
              <p className="text-body mt-4">{googleForm.description}</p>
            </div>
            <div className="mt-10">
              <ExternalFormCTA
                title={googleForm.title}
                description={googleForm.description}
                buttonLabel={googleForm.buttonLabel}
                formUrl={googleForm.url}
              />
            </div>

            <div className="mx-auto mt-14 max-w-2xl text-center">
              <h3 className="text-xl font-semibold text-ecaa-ink">Contact ECAA by email</h3>
              <p className="text-body mt-3">{form.note}</p>
            </div>
            <div className="mt-8">
              <MailtoForm
                email={form.email}
                subject={form.subject}
                fields={form.fields}
                submitLabel={form.submitLabel}
                areaOptions={areas}
              />
            </div>
          </AnimateIn>
        </Container>
      </section>
    </>
  )
}
