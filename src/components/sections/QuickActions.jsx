import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import QuickActionCard from '../cards/QuickActionCard'
import AnimateIn from '../ui/AnimateIn'
import homeData from '../../content/homepage.json'

export default function QuickActions() {
  return (
    <section className="surface-white">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow="Get involved"
            title="Quick ways to connect"
            description="Start here — whether you are new to Atlanta or a long-time community member."
            align="center"
            className="mx-auto"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeData.quickActions.map((action, index) => (
              <AnimateIn key={action.to} delay={index * 60}>
                <QuickActionCard {...action} />
              </AnimateIn>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
