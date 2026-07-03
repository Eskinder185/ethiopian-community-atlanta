import { useState } from 'react'
import Container from '../ui/Container'
import AnimateIn from '../ui/AnimateIn'
import EmptyState from '../ui/EmptyState'
import LeadershipBubble from './LeadershipBubble'
import LeadershipPreviewModal from './LeadershipPreviewModal'

export default function LeadershipCommitteeSection({
  group,
  muted = false,
  sectionId,
  emptyState,
  explorer,
  contactLabels,
}) {
  const [selectedMember, setSelectedMember] = useState(null)
  const members = group.members || []
  const sectionAnchor = sectionId || group.anchor

  return (
    <section id={sectionAnchor} className={muted ? 'surface-muted' : 'surface-white'}>
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="heading-section text-2xl sm:text-3xl">{group.title}</h2>
            {group.description && (
              <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                {group.description}
              </p>
            )}
          </div>

          {members.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {members.map((member) => (
                <LeadershipBubble
                  key={member.id}
                  member={member}
                  committee={group.title}
                  onSelect={setSelectedMember}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-10"
              title={emptyState?.title}
              description={emptyState?.description}
            />
          )}
        </AnimateIn>
      </Container>

      <LeadershipPreviewModal
        member={selectedMember}
        committee={group.title}
        onClose={() => setSelectedMember(null)}
        closeLabel={explorer?.modalCloseLabel}
        contactLabels={contactLabels}
      />
    </section>
  )
}
