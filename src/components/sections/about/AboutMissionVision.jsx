import InfoCard from '../../cards/InfoCard'

export default function AboutMissionVision({ section }) {
  return (
    <>
      {section.intro && (
        <p className="text-lead max-w-3xl">{section.intro}</p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {section.cards.map((card) => (
          <InfoCard key={card.title} title={card.title}>
            {card.body}
          </InfoCard>
        ))}
      </div>
    </>
  )
}
