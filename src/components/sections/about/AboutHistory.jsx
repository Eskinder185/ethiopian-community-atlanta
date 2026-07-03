export default function AboutHistory({ section }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
      <div>
        {section.intro && (
          <p className="text-lead leading-relaxed">{section.intro}</p>
        )}
      </div>

      <aside className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm sm:p-8">
        <h3 className="text-lg font-semibold normal-case text-ecaa-green-900">
          {section.highlightsHeading || 'Key moments'}
        </h3>
        <ul className="mt-5 space-y-4">
          {section.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-relaxed text-ecaa-ink-muted">
              <span
                className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-ecaa-gold-500"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
