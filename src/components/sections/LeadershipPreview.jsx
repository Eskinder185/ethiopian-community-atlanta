import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import TeamMemberCard from '../cards/TeamMemberCard'
import EmptyState from '../ui/EmptyState'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import teamData from '../../data/teamMembers.json'
import { filterVerifiedMembers } from '../../utils/data'

export default function LeadershipPreview({ limit = 3 }) {
  const members = filterVerifiedMembers(teamData.members).slice(0, limit)

  return (
    <section className="surface-muted">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow="Leadership"
            title="Guided by community volunteers"
            description="ECAA is led by dedicated board members, officers, and committee volunteers."
            action={{ label: 'Meet leadership', to: '/leadership', variant: 'secondary' }}
          />

          {members.length > 0 ? (
            <div className="mt-14 grid-cards">
              {members.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-14"
              title="Leadership profiles coming soon"
              description="TODO: Add verified board and committee profiles to teamMembers.json."
              action={
                <CTAButton to="/leadership" variant="primary">
                  Leadership page
                </CTAButton>
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
