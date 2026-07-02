import PageHero from '../components/layout/PageHero'
import ContactDetailsSection from '../components/sections/ContactDetailsSection'
import CTAButton from '../components/ui/CTAButton'
import pages from '../data/pages.json'
import siteInfo from '../content/siteInfo.json'

export default function Contact() {
  const page = pages.contact

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={page.title}
        description={page.description}
        badge={{ label: siteInfo.shortName, variant: 'green' }}
        imageId="home-hero-community-atlanta"
      >
        <CTAButton to="/membership" variant="primary" size="lg">
          Become a Member
        </CTAButton>
        <CTAButton href="#map" variant="secondary" size="lg" className="btn-hero-outline">
          Map
        </CTAButton>
      </PageHero>

      <ContactDetailsSection />
    </>
  )
}
