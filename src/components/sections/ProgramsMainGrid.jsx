import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import ProgramAreaCard from '../cards/ProgramAreaCard'
import AnimateIn from '../ui/AnimateIn'
import { filterPublished } from '../../utils/data'

export default function ProgramsMainGrid({ categories = [] }) {
  const programs = filterPublished(categories)

  if (programs.length === 0) return null

  return (
    <section id="community-programs" className="surface-white py-16 sm:py-20">
      <Container>
        <AnimateIn>
          <SectionHeader
            eyebrow="Programs"
            title="Community Programs & Services"
            description="Explore the main program areas that support ECAA's mission in Atlanta."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {programs.map((program, index) => (
              <AnimateIn key={program.id} delay={index * 40}>
                <ProgramAreaCard program={program} />
              </AnimateIn>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
