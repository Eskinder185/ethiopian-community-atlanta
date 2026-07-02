import PageHero from '../components/layout/PageHero'
import ProgramsOverviewSection from '../components/sections/ProgramsOverviewSection'
import ProgramsMainGrid from '../components/sections/ProgramsMainGrid'
import EducationTrainingSection from '../components/sections/EducationTrainingSection'
import ProgramsFormsSection from '../components/sections/ProgramsFormsSection'
import ProgramsClosingCta from '../components/sections/ProgramsClosingCta'
import CTAButton from '../components/ui/CTAButton'
import programsData from '../content/programs.json'

export default function Programs() {
  const { overview, categories, educationTraining, formsSection, closingCta } = programsData

  return (
    <>
      <PageHero
        size="page"
        eyebrow="Programs"
        title="Community Programs & Services"
        description="Explore the main program areas that support ECAA's mission in Atlanta."
        badge={{ label: 'Community programs', variant: 'gold' }}
        imageId="programs-community-support"
        overlayStrength="default"
      >
        <CTAButton href="#community-programs" variant="primary" size="lg">
          Explore Programs
        </CTAButton>
        <CTAButton href="#education-training" variant="secondary" size="lg" className="btn-hero-outline">
          Education & Training
        </CTAButton>
      </PageHero>

      <ProgramsOverviewSection section={overview} />
      <ProgramsMainGrid categories={categories} />
      <ProgramsFormsSection section={formsSection} categories={categories} />
      <EducationTrainingSection section={educationTraining} />
      <ProgramsClosingCta section={closingCta} />
    </>
  )
}
