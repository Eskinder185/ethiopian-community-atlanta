import LeadershipCard, { getImageSrc } from '../cards/LeadershipCard'
import EmptyState from '../ui/EmptyState'
import ContentSection from './ContentSection'
import { getVisibleGroupMembers, groupHasVisibleMembers } from '../../utils/leadership'

export default function LeadershipGroupSection({ group, muted = false }) {
  if (!groupHasVisibleMembers(group)) return null

  const groupMembers = getVisibleGroupMembers(group.members)

  return (
    <ContentSection
      id={group.anchor}
      eyebrow="Leadership"
      title={group.title}
      description={group.description}
      muted={muted}
    >
      {groupMembers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {groupMembers.map((member) => (
            <LeadershipCard key={member.id} member={member} committee={group.title} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Profiles coming soon"
          description={`Leadership profiles for ${group.title} will be published when verified details are available.`}
        />
      )}
    </ContentSection>
  )
}
