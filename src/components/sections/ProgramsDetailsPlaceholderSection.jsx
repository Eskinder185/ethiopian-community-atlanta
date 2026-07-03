import Container from '../ui/Container'
import AnimateIn from '../ui/AnimateIn'

export default function ProgramsDetailsPlaceholderSection({ section }) {
  if (!section) return null

  const cards = section.cards ?? []

  return (
    <section className="border-y border-ecaa-green-100/80 bg-linear-to-b from-ecaa-cream/60 to-ecaa-white py-16 sm:py-20">
      <Container>
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-ecaa-green-950 sm:text-3xl">
              {section.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
              {section.description}
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {cards.map((card, index) => (
              <AnimateIn key={card.title} delay={index * 40}>
                <article className="h-full rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white p-5 shadow-ecaa-sm">
                  <h3 className="text-base font-semibold text-ecaa-green-950">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ecaa-ink-muted">{card.description}</p>
                </article>
              </AnimateIn>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
