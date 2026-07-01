import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import CTAButton from '../ui/CTAButton'
import Badge from '../ui/Badge'
import AnimateIn from '../ui/AnimateIn'
import siteInfo from '../../data/siteInfo.json'

export default function AboutPreview() {
  return (
    <section className="surface-muted">
      <Container className="section-spacing-sm">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimateIn>
            <SectionHeader eyebrow="About ECAA" title="A community home in Atlanta" />
            <div className="mt-8 space-y-5 text-body">
              <p>
                The <strong>{siteInfo.name}</strong> ({siteInfo.shortName}) is based
                in {siteInfo.location.city}, {siteInfo.location.state}.
              </p>
              <p>{siteInfo.tagline}</p>
              <p className="editorial-todo">
                TODO: Add verified organization overview, history, and community impact.
              </p>
            </div>
            <CTAButton to="/about" variant="primary" className="mt-10">
              About ECAA
            </CTAButton>
          </AnimateIn>

          <AnimateIn delay={100}>
            <aside className="ecaa-card-premium">
              <Badge variant="gold">Our focus</Badge>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ecaa-ink">
                Mission &amp; theme
              </h3>
              <p className="text-body mt-4">{siteInfo.tagline}</p>
              <ul className="mt-8 space-y-3 text-base text-ecaa-ink-muted">
                <li className="editorial-todo">TODO: Add verified mission statement</li>
                <li className="editorial-todo">TODO: Add verified vision statement</li>
                <li className="editorial-todo">TODO: Add verified community history highlight</li>
              </ul>
            </aside>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
