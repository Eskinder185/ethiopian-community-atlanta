import InfoCard from '../../cards/InfoCard'

export default function AboutHistory({ section }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {section.intro && (
        <p className="text-lead">{section.intro}</p>
      )}

      <InfoCard title="Key moments">
        <ul className="space-y-4">
          {section.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-base text-ecaa-ink-muted">
              <span className="text-ecaa-gold-500" aria-hidden="true">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </InfoCard>
    </div>
  )
}
