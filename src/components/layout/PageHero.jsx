import Container from '../ui/Container'
import Badge from '../ui/Badge'
import AnimateIn from '../ui/AnimateIn'

export default function PageHero({
  eyebrow,
  title,
  description,
  badge,
  children,
}) {
  return (
    <header className="hero-shell surface-cream">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-ecaa-gold-200/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-ecaa-green-200/25 blur-3xl"
        aria-hidden="true"
      />

      <Container className="section-spacing-sm relative">
        <AnimateIn>
          {badge && (
            <div className="mb-5">
              <Badge variant={badge.variant || 'gold'}>{badge.label}</Badge>
            </div>
          )}
          {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
          <h1 className={`heading-page max-w-4xl ${eyebrow ? 'mt-4' : ''}`}>{title}</h1>
          {description && (
            <p className="text-lead mt-6 max-w-2xl">{description}</p>
          )}
          {children && (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {children}
            </div>
          )}
        </AnimateIn>
      </Container>
    </header>
  )
}
