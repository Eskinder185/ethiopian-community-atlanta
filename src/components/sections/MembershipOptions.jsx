import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import InfoCard from '../cards/InfoCard'
import navigation from '../../data/navigation.json'

const optionSections = navigation.sections.membership.filter(
  (item) => item.id !== 'registration-form' && item.id !== 'membership-faq',
)

export default function MembershipOptions() {
  return (
    <section className="surface-muted">
      <Container className="section-spacing-sm">
        <SectionHeader
          eyebrow="Membership"
          title="Membership information"
          description="TODO: Add verified membership options and benefits overview."
        />

        <div className="mt-10 grid-cards-2">
          {optionSections.map((section) => (
            <InfoCard key={section.id} title={section.label} id={section.anchor}>
              TODO: Add verified content for {section.label}.
            </InfoCard>
          ))}
        </div>
      </Container>
    </section>
  )
}
