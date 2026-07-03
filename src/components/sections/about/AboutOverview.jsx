import Container from '../../ui/Container'
import AnimateIn from '../../ui/AnimateIn'

export default function AboutOverview({ section }) {
  if (!section?.cards?.length) return null

  return (
    <section className="border-b border-ecaa-border/60 bg-ecaa-cream/50 py-12 sm:py-14">
      <Container>
        <AnimateIn>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {section.cards.map((card, index) => (
              <article
                key={card.id}
                className="rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white px-5 py-6 text-center shadow-ecaa-sm sm:px-6 sm:py-7"
              >
                <div
                  className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-ecaa-green-100 to-ecaa-green-50 text-sm font-bold text-ecaa-green-900"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>
                <h2 className="mt-4 text-lg font-semibold normal-case text-ecaa-ink">{card.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-ecaa-ink-muted">{card.description}</p>
              </article>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
