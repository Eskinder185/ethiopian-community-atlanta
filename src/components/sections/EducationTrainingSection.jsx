import Container from '../ui/Container'
import AnimateIn from '../ui/AnimateIn'
import { filterPublished } from '../../utils/data'

function TopicCard({ topic }) {
  const initials = topic.initials || topic.title?.slice(0, 2)?.toUpperCase() || 'ET'

  return (
    <article className="flex h-full flex-col rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm sm:p-7">
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-ecaa-green-100 to-ecaa-green-50 text-xs font-bold tracking-wide text-ecaa-green-900"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ecaa-gold-600">
            {topic.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-ecaa-green-950">{topic.title}</h3>
          {topic.subtitle && (
            <p className="mt-1 text-sm font-medium text-ecaa-green-800">{topic.subtitle}</p>
          )}
        </div>
      </div>
      <p className="mt-4 flex-1 text-base leading-relaxed text-ecaa-ink-muted">{topic.description}</p>
    </article>
  )
}

export default function EducationTrainingSection({ section }) {
  const topics = filterPublished(section.topics ?? [])

  return (
    <section
      id={section.id}
      className="border-y border-ecaa-green-100/80 bg-linear-to-b from-ecaa-green-50/80 to-ecaa-cream/40 py-16 sm:py-20"
    >
      <Container>
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="text-eyebrow">{section.eyebrow || 'Education & Training'}</p>
            <h2 className="heading-section mt-3">{section.title}</h2>
            <p className="text-lead mt-4 leading-relaxed">{section.intro}</p>
            {section.scheduleNote && (
              <p className="mt-4 rounded-ecaa-lg border border-ecaa-gold-200/60 bg-ecaa-gold-50/50 px-4 py-3 text-sm leading-relaxed text-ecaa-ink-muted">
                {section.scheduleNote}
              </p>
            )}
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {topics.map((topic, index) => (
              <AnimateIn key={topic.id} delay={index * 30}>
                <TopicCard topic={topic} />
              </AnimateIn>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
