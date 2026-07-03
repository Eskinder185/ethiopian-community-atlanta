import { getDefaultDetailSections } from '../../utils/programs'

export default function ProgramDetailSections({ program, labels = {} }) {
  const sections = getDefaultDetailSections(program)

  return (
    <section className="surface-cream py-14 sm:py-16">
      <div className="container-ecaa">
        <div className="mx-auto max-w-4xl">
          <h2 className="heading-section text-2xl normal-case sm:text-3xl">
            {labels.programDetails || 'Program Details'}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ecaa-ink-muted">
            {labels.programDetailsIntro ||
              'Additional information about this program will be expanded as ECAA finalizes schedules, resources, and community offerings.'}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <article
                key={section.heading}
                className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm"
              >
                <h3 className="text-lg font-semibold normal-case text-ecaa-green-950">{section.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ecaa-ink-muted sm:text-base">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
