import PageHero from '../components/layout/PageHero'
import MembershipOptionCards from '../components/sections/MembershipOptionCards'
import MembershipBeforeYouStart from '../components/sections/MembershipBeforeYouStart'
import MembershipRegistration from '../components/sections/MembershipRegistration'
import EdirDisclosure from '../components/sections/EdirDisclosure'
import MembershipFaq from '../components/sections/MembershipFaq'
import CTAButton from '../components/ui/CTAButton'
import membershipData from '../data/membership.json'

export default function Membership() {
  const { hero } = membershipData

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        badge={{ label: 'Join ECAA', variant: 'green' }}
      >
        <CTAButton href="#registration-form" variant="primary" size="lg">
          Start Registration
        </CTAButton>
        <CTAButton to="/programs#edir" variant="secondary" size="lg">
          Learn About EDIR
        </CTAButton>
      </PageHero>

      <MembershipOptionCards />
      <MembershipBeforeYouStart />
      <MembershipRegistration />
      <EdirDisclosure />
      <MembershipFaq />
    </>
  )
}
