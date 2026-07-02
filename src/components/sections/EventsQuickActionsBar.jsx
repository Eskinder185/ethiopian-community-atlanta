import Container from '../ui/Container'
import AnimateIn from '../ui/AnimateIn'

export default function EventsQuickActionsBar({ actions = [] }) {
  if (!actions.length) return null

  return (
    <section className="border-b border-ecaa-border/70 bg-ecaa-white py-5 sm:py-6" aria-label="Quick navigation">
      <Container>
        <AnimateIn>
          <nav className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {actions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="inline-flex items-center rounded-full border border-ecaa-border/80 bg-ecaa-cream/50 px-4 py-2 text-sm font-semibold text-ecaa-green-900 transition-colors hover:border-ecaa-green-200 hover:bg-ecaa-green-50 sm:px-5 sm:py-2.5 sm:text-base"
              >
                {action.label}
              </a>
            ))}
          </nav>
        </AnimateIn>
      </Container>
    </section>
  )
}
