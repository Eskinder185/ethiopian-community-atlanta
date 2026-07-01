import HeroSection from '../components/sections/HeroSection'
import QuickActions from '../components/sections/QuickActions'
import AboutPreview from '../components/sections/AboutPreview'
import ProgramsPreview from '../components/sections/ProgramsPreview'
import EventsPreview from '../components/sections/EventsPreview'
import MediaPreview from '../components/sections/MediaPreview'
import LeadershipPreview from '../components/sections/LeadershipPreview'
import ContactPreview from '../components/sections/ContactPreview'
import CTAButton from '../components/ui/CTAButton'
import siteInfo from '../data/siteInfo.json'

export default function Home() {
  return (
    <>
      <HeroSection title={siteInfo.name} description={siteInfo.tagline}>
        <CTAButton to="/membership" variant="primary" size="lg">
          Become a Member
        </CTAButton>
        <CTAButton to="/support" variant="accent" size="lg">
          Donate
        </CTAButton>
        <CTAButton to="/events" variant="secondary" size="lg">
          View Events
        </CTAButton>
      </HeroSection>

      <QuickActions />
      <AboutPreview />
      <ProgramsPreview />
      <EventsPreview />
      <MediaPreview />
      <LeadershipPreview />
      <ContactPreview />
    </>
  )
}
