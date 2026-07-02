import CTAButton from '../../ui/CTAButton'

export default function AboutLeadershipStructure({ section }) {
  const groups = section.groups || []

  return (
    <div className="max-w-6xl">
      {section.intro && (
        <p className="text-lead max-w-3xl leading-relaxed">{section.intro}</p>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <article
            key={group.id}
            className="flex h-full flex-col rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm transition-shadow duration-300 hover:shadow-ecaa-md sm:p-7"
          >
            <h3 className="text-lg font-semibold tracking-tight text-ecaa-green-900">
              {group.title}
            </h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-ecaa-ink-muted">
              {group.description}
            </p>
          </article>
        ))}
      </div>

      {section.linkTo && section.linkLabel && (
        <div className="mt-10">
          <CTAButton to={section.linkTo} variant="primary" size="lg">
            {section.linkLabel}
          </CTAButton>
        </div>
      )}
    </div>
  )
}
