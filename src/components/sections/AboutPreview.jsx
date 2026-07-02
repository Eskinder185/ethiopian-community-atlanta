import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import CTAButton from '../ui/CTAButton'
import Badge from '../ui/Badge'
import AnimateIn from '../ui/AnimateIn'
import homeData from '../../content/homepage.json'

export default function AboutPreview() {
  const { aboutPreview, missionPreview } = homeData

  return (
    <section className="surface-muted">
      <Container className="section-spacing-sm">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimateIn>
            <SectionHeader
              eyebrow={aboutPreview.eyebrow}
              title={aboutPreview.title}
            />
            <div className="mt-8 space-y-5 text-body">
              <p>{aboutPreview.summary}</p>
            </div>
            <CTAButton to={aboutPreview.ctaPath} variant="primary" className="mt-10">
              {aboutPreview.ctaLabel}
            </CTAButton>
          </AnimateIn>

          <AnimateIn delay={100}>
            <aside className="ecaa-card-premium">
              <Badge variant="gold">{missionPreview.subheading}</Badge>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ecaa-ink">
                {missionPreview.title}
              </h3>
              <ul className="mt-8 space-y-6">
                {missionPreview.pillars.map((pillar) => (
                  <li key={pillar.title}>
                    <p className="font-semibold text-ecaa-ink">{pillar.title}</p>
                    <p className="mt-2 text-base text-ecaa-ink-muted">{pillar.description}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
