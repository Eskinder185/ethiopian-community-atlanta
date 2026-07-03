import { useState } from 'react'
import Container from '../ui/Container'

import AnimateIn from '../ui/AnimateIn'

import LeadershipBubble from './LeadershipBubble'

import LeadershipPreviewModal from './LeadershipPreviewModal'



export default function LeadershipBubbleShowcase({

  members = [],

  explorer,

  contactLabels,

}) {

  const [selectedMember, setSelectedMember] = useState(null)



  if (!members.length) return null



  return (

    <section id="leadership-preview" className="surface-muted">

      <Container className="section-spacing-sm">

        <AnimateIn>

          <div className="mx-auto max-w-3xl text-center">

            <h2 className="heading-section text-2xl sm:text-3xl">{explorer?.title}</h2>

            {explorer?.description && (

              <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">

                {explorer.description}

              </p>

            )}

          </div>



          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">

            {members.map((member) => (

              <LeadershipBubble

                key={`preview-${member.id}`}

                member={member}

                committee={member.committee}

                onSelect={setSelectedMember}

              />

            ))}

          </div>

        </AnimateIn>

      </Container>



      <LeadershipPreviewModal

        member={selectedMember}

        committee={selectedMember?.committee}

        onClose={() => setSelectedMember(null)}

        closeLabel={explorer?.modalCloseLabel}

        contactLabels={contactLabels}

      />

    </section>

  )

}

