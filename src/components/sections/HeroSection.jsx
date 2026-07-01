import Container from '../ui/Container'
import AnimateIn from '../ui/AnimateIn'
import siteInfo from '../../data/siteInfo.json'

export default function HeroSection({ eyebrow, title, description, children }) {
  return (
    <section className="hero-shell surface-cream">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-ecaa-gold-200/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-ecaa-green-200/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="section-spacing relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <AnimateIn>
            <p className="text-eyebrow">
              {eyebrow || `Welcome to ${siteInfo.shortName}`}
            </p>
            <h1 className="heading-display mt-5 max-w-4xl">
              {title || siteInfo.name}
            </h1>
            <p className="text-lead mt-6 max-w-2xl">
              {description || siteInfo.tagline}
            </p>
            {children && (
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {children}
              </div>
            )}
          </AnimateIn>

          <AnimateIn delay={120} className="hidden lg:block">
            <div className="surface-panel relative overflow-hidden p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ecaa-green-50/80 via-transparent to-ecaa-gold-50/60"
                aria-hidden="true"
              />
              <p className="text-eyebrow relative">{siteInfo.shortName}</p>
              <p className="text-body relative mt-4">{siteInfo.tagline}</p>
              <p className="relative mt-6 text-sm text-ecaa-ink-subtle">
                TODO: Add verified community highlight for the home page.
              </p>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
