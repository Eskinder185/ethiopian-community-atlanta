import { useMemo } from 'react'
import PageHeroWithStats from '../components/layout/PageHeroWithStats'
import MembershipBenefits from '../components/sections/MembershipBenefits'
import MembershipOptionCard from '../components/sections/MembershipOptionCard'
import MembershipBeforeYouStart from '../components/sections/MembershipBeforeYouStart'
import MembershipRegistration from '../components/sections/MembershipRegistration'
import EdirDisclosure from '../components/sections/EdirDisclosure'
import MembershipFaq from '../components/sections/MembershipFaq'
import MembershipClosingCta from '../components/sections/MembershipClosingCta'
import { useMembershipPage } from '../hooks/useMembershipPage'
import { getPageHero, getHeroBackground } from '../utils/pageHeroes'

export default function Membership() {
  const { content } = useMembershipPage()
  const pageHeroConfig = useMemo(() => getPageHero('membership'), [])
  const background = useMemo(() => getHeroBackground(pageHeroConfig, 'membership'), [pageHeroConfig])

  return (
    <>
      <PageHeroWithStats
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        backgroundImage={background}
        backgroundAlt={pageHeroConfig?.backgroundAlt}
        buttons={content.hero.buttons}
        stats={content.overviewCards}
        variant={pageHeroConfig?.variant || 'page'}
        overlayStrength={pageHeroConfig?.overlayStrength || 'default'}
      />

      <MembershipBenefits section={content.benefits} />
      <MembershipOptionCard section={content.membershipCard} formUrl={content.registration.formUrl} />
      <MembershipBeforeYouStart section={content.checklist} />
      <MembershipRegistration section={content.registration} />
      <EdirDisclosure section={content.notice} />
      <MembershipFaq section={content.faq} />
      <MembershipClosingCta section={content.finalCta} />
    </>
  )
}
