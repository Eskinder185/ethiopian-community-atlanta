import TeamMemberCard from '../cards/TeamMemberCard'
import EmptyState from '../ui/EmptyState'
import ContentSection from './ContentSection'
import { filterVerifiedMembers } from '../../utils/data'

export default function LeadershipGroupSection({ group, members, muted = false }) {
  const groupMembers = filterVerifiedMembers(members)
    .filter((member) => member.groupId === group.id)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <ContentSection
      id={group.anchor}
      eyebrow="Leadership"
      title={group.title}
      description={group.description}
      muted={muted}
    >
      {groupMembers.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groupMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Profiles coming soon"
          description={`TODO: Add verified ${group.title} profiles to teamMembers.json with published set to true.`}
        />
      )}
    </ContentSection>
  )
}
