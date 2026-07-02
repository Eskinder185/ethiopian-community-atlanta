import PageHero from '../components/layout/PageHero'
import MembershipBenefits from '../components/sections/MembershipBenefits'
import MembershipOptionCard from '../components/sections/MembershipOptionCard'
import MembershipBeforeYouStart from '../components/sections/MembershipBeforeYouStart'
import MembershipRegistration from '../components/sections/MembershipRegistration'
import MembershipRelatedLinks from '../components/sections/MembershipRelatedLinks'
import EdirDisclosure from '../components/sections/EdirDisclosure'
import MembershipFaq from '../components/sections/MembershipFaq'
import MembershipClosingCta from '../components/sections/MembershipClosingCta'
import CTAButton from '../components/ui/CTAButton'
import membershipData from '../content/membership.json'
import formsData from '../content/forms.json'

export default function Membership() {
  const { hero, finalCta } = membershipData
  const formUrl = formsData.membership?.formUrl

  return (
    <>
      <PageHero
        size="page"
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        badge={{ label: 'Community membership', variant: 'gold' }}
        imageId="membership-welcome"
        overlayStrength="default"
      >
        <CTAButton
          href={formUrl}
          variant="primary"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${hero.primaryCtaLabel} (opens in a new tab)`}
        >
          {hero.primaryCtaLabel}
        </CTAButton>
        <CTAButton
          to={hero.edirPath}
          variant="secondary"
          size="lg"
          className="btn-hero-outline"
        >
          {hero.secondaryCtaLabel}
        </CTAButton>
      </PageHero>

      <MembershipBenefits />
      <MembershipOptionCard />
      <MembershipBeforeYouStart />
      <MembershipRegistration />
      <MembershipRelatedLinks />
      <EdirDisclosure />
      <MembershipFaq />
      <MembershipClosingCta section={finalCta} />
    </>
  )
}
