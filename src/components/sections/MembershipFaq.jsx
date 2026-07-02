import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import Accordion from '../ui/Accordion'
import AnimateIn from '../ui/AnimateIn'
import faqData from '../../content/faq.json'
import membershipData from '../../content/membership.json'
import { filterPublished } from '../../utils/data'

export default function MembershipFaq() {
  const items = filterPublished(faqData.membership)
  const { faqSection } = membershipData

  return (
    <section className="surface-muted" id="membership-faq">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={faqSection.label}
            title={faqSection.title}
            description={faqSection.description}
            align="center"
            className="mx-auto"
          />

          <Accordion items={items} className="mx-auto mt-12 max-w-3xl" />
        </AnimateIn>
      </Container>
    </section>
  )
}
