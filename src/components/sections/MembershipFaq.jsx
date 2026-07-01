import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import Accordion from '../ui/Accordion'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import faqData from '../../data/faq.json'
import { filterPublished } from '../../utils/data'

export default function MembershipFaq() {
  const items = filterPublished(faqData.membership)

  return (
    <section className="surface-muted" id="membership-faq">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow="Questions"
            title="Membership FAQ"
            description="Common questions about joining ECAA. TODO: Replace placeholder answers with verified official responses."
            align="center"
            className="mx-auto"
          />

          <Accordion items={items} className="mx-auto mt-14 max-w-3xl" />

          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-4">
            <CTAButton href="#registration-form" variant="primary" size="lg">
              Start Registration
            </CTAButton>
            <CTAButton to="/contact" variant="secondary" size="lg">
              Contact for help
            </CTAButton>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
