import CTAButton from '../../ui/CTAButton'
import InfoCard from '../../cards/InfoCard'
import teamData from '../../../data/teamMembers.json'

export default function AboutLeadershipStructure({ section }) {
  return (
    <>
      {section.intro && (
        <p className="text-lead max-w-3xl">{section.intro}</p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {teamData.groups.map((group) => (
          <InfoCard key={group.id} title={group.title} hover>
            {group.description}
          </InfoCard>
        ))}
      </div>

      <CTAButton to={section.linkTo} variant="primary" className="mt-10">
        {section.linkLabel}
      </CTAButton>
    </>
  )
}
