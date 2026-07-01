import PageHero from '../components/layout/PageHero'
import LeadershipGroupSection from '../components/sections/LeadershipGroupSection'
import CTAButton from '../components/ui/CTAButton'
import teamData from '../data/teamMembers.json'
import pages from '../data/pages.json'
import { filterVerifiedMembers } from '../utils/data'

export default function Leadership() {
  const page = pages.leadership
  const members = filterVerifiedMembers(teamData.members)

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title={page.title}
        description={page.description}
        badge={{ label: 'Volunteer-led', variant: 'green' }}
      >
        <CTAButton href="#executive-committee" variant="primary" size="lg">
          Executive Committee
        </CTAButton>
        <CTAButton to="/about#leadership-structure" variant="secondary" size="lg">
          How ECAA Works
        </CTAButton>
      </PageHero>

      {teamData.groups.map((group, index) => (
        <LeadershipGroupSection
          key={group.id}
          group={group}
          members={members}
          muted={index % 2 === 1}
        />
      ))}
    </>
  )
}
