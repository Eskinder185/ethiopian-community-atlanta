import Container from '../ui/Container'
import AnimateIn from '../ui/AnimateIn'
import membershipData from '../../data/membership.json'

export default function EdirDisclosure() {
  return (
    <section className="surface-white" id="edir-disclosure">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <aside
            className="notice-todo mx-auto max-w-3xl text-center sm:text-left"
            role="note"
            aria-label="EDIR disclosure reminder"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ecaa-gold-700">
              Important notice
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ecaa-ink">
              {membershipData.edirDisclosure}
            </p>
          </aside>
        </AnimateIn>
      </Container>
    </section>
  )
}
