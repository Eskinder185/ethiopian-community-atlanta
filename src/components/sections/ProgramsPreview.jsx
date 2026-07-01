import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import ProgramCard from '../cards/ProgramCard'
import AnimateIn from '../ui/AnimateIn'
import programsData from '../../data/programs.json'
import { filterPublished } from '../../utils/data'

const categoryOrder = [
  'community-support',
  'cultural-programs',
  'youth-education',
  'health-sports',
  'edir',
]

export default function ProgramsPreview() {
  const published = filterPublished(programsData.categories)
  const categories = categoryOrder
    .map((id) => published.find((item) => item.id === id))
    .filter(Boolean)

  return (
    <section className="surface-white">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow="Programs & Services"
            title="Support for every generation"
            description="Programs and services for families, youth, older adults, and the broader community."
            action={{ label: 'All programs', to: '/programs', variant: 'secondary' }}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((program, index) => (
              <AnimateIn key={program.id} delay={index * 50}>
                <ProgramCard program={program} />
              </AnimateIn>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
