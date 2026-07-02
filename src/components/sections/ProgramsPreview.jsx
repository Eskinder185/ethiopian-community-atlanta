import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import ProgramCard from '../cards/ProgramCard'
import EmptyState from '../ui/EmptyState'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import programsData from '../../content/programs.json'
import homeData from '../../content/homepage.json'
import { filterPublished } from '../../utils/data'

const categoryOrder = [
  'community-support',
  'cultural-programs',
  'youth-education',
  'health-wellness',
  'edir',
  'volunteer-civic',
]

function getFeaturedPrograms(categories, limit = 6) {
  const published = filterPublished(categories)
  const featured = categoryOrder
    .map((id) => published.find((item) => item.id === id && item.featured === true))
    .filter(Boolean)

  if (featured.length > 0) return featured.slice(0, limit)

  return categoryOrder
    .map((id) => published.find((item) => item.id === id))
    .filter(Boolean)
    .slice(0, limit)
}

export default function ProgramsPreview() {
  const programs = getFeaturedPrograms(programsData.categories)
  const { programsPreview } = homeData

  return (
    <section className="surface-white">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={programsPreview.eyebrow}
            title={programsPreview.title}
            description={programsPreview.description}
            action={{ label: 'Explore All Programs', to: '/programs', variant: 'secondary' }}
          />

          {programs.length > 0 ? (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, index) => (
                <AnimateIn key={program.id} delay={index * 50}>
                  <ProgramCard program={program} />
                </AnimateIn>
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-14"
              title="Featured programs will be added soon."
              description="Featured programs will appear here as they are published."
              action={
                <CTAButton to="/programs" variant="secondary">
                  Explore All Programs
                </CTAButton>
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
