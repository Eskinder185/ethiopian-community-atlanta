import PageHero from '../components/layout/PageHero'
import ProgramCategorySection from '../components/sections/ProgramCategorySection'
import CTAButton from '../components/ui/CTAButton'
import programsData from '../data/programs.json'
import pages from '../data/pages.json'

const categoryOrder = [
  'community-support',
  'cultural-programs',
  'youth-education',
  'health-sports',
  'edir',
]

export default function Programs() {
  const page = pages.programs
  const categories = categoryOrder
    .map((id) => programsData.categories.find((item) => item.id === id))
    .filter(Boolean)

  return (
    <>
      <PageHero
        eyebrow="Programs & Services"
        title={page.title}
        description={page.description}
        badge={{ label: 'Community programs', variant: 'gold' }}
      >
        <CTAButton href="#community-support" variant="primary" size="lg">
          Explore programs
        </CTAButton>
        <CTAButton to="/membership" variant="secondary" size="lg">
          Become a Member
        </CTAButton>
        <CTAButton to="/contact" variant="ghost" size="lg">
          Contact ECAA
        </CTAButton>
      </PageHero>

      {categories.map((category, index) => (
        <ProgramCategorySection
          key={category.id}
          category={category}
          muted={index % 2 === 1}
        />
      ))}
    </>
  )
}
