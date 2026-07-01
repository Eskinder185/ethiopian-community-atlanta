import PageHero from '../components/layout/PageHero'
import ContactDetailsSection from '../components/sections/ContactDetailsSection'
import CTAButton from '../components/ui/CTAButton'
import pages from '../data/pages.json'
import siteInfo from '../data/siteInfo.json'

export default function Contact() {
  const page = pages.contact

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={page.title}
        description={page.description}
        badge={{ label: siteInfo.shortName, variant: 'green' }}
      >
        <CTAButton href="#map" variant="secondary" size="lg">
          Map
        </CTAButton>
        <CTAButton to="/membership" variant="primary" size="lg">
          Become a Member
        </CTAButton>
      </PageHero>

      <ContactDetailsSection />
    </>
  )
}
