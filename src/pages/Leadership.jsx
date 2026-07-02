import PageHero from '../components/layout/PageHero'
import LeadershipIntroSection from '../components/sections/LeadershipIntroSection'
import LeadershipGroupSection from '../components/sections/LeadershipGroupSection'
import LeadershipCtaSection from '../components/sections/LeadershipCtaSection'
import CTAButton from '../components/ui/CTAButton'
import teamData from '../content/teamMembers.json'

export default function Leadership() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Leadership"
        description="Meet the dedicated volunteers guiding ECAA's mission, programs, and community service."
        badge={{ label: 'Volunteer-led', variant: 'green' }}
        imageId="leadership-community-guidance"
      >
        <CTAButton href="#executive-committee" variant="primary" size="lg">
          Executive Committee
        </CTAButton>
        <CTAButton href="#board-of-directors" variant="secondary" size="lg" className="btn-hero-outline">
          Board of Directors
        </CTAButton>
      </PageHero>

      <LeadershipIntroSection intro={teamData.intro} />

      {teamData.groups.map((group, index) => (
        <LeadershipGroupSection key={group.id} group={group} muted={index % 2 === 1} />
      ))}

      <LeadershipCtaSection />
    </>
  )
}
