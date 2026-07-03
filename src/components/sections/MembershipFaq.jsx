import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import Accordion from '../ui/Accordion'
import AnimateIn from '../ui/AnimateIn'
import { filterPublished } from '../../utils/data'

export default function MembershipFaq({ section }) {
  if (!section) return null

  const items = filterPublished(section.items ?? [])

  return (
    <section className="surface-muted" id="membership-faq">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={section.label}
            title={section.title}
            description={section.description}
            align="center"
            className="mx-auto"
          />

          <Accordion items={items} className="mx-auto mt-12 max-w-3xl" />
        </AnimateIn>
      </Container>
    </section>
  )
}
