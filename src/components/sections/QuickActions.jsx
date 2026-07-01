import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import QuickActionCard from '../cards/QuickActionCard'
import AnimateIn from '../ui/AnimateIn'

const actions = [
  {
    title: 'Membership',
    description: 'Join ECAA and stay connected with the community in Atlanta.',
    to: '/membership',
    icon: 'M',
    accent: 'green',
  },
  {
    title: 'Events',
    description: 'TODO: Add verified events overview for the home page.',
    to: '/events',
    icon: 'E',
    accent: 'gold',
  },
  {
    title: 'EDIR',
    description: 'TODO: Add verified EDIR overview for the home page.',
    to: '/programs#edir',
    icon: 'Ed',
    accent: 'red',
  },
  {
    title: 'Volunteer / Support',
    description: 'TODO: Add verified volunteer and support overview for the home page.',
    to: '/support',
    icon: 'S',
    accent: 'cream',
  },
]

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
            {actions.map((action, index) => (
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
