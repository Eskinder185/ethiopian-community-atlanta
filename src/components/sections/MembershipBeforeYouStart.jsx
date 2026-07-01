import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import AnimateIn from '../ui/AnimateIn'
import membershipData from '../../data/membership.json'

export default function MembershipBeforeYouStart() {
  const { beforeYouStart } = membershipData

  return (
    <section className="surface-white" id="before-you-start">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow="Prepare"
            title={beforeYouStart.title}
            description={beforeYouStart.description}
          />

          <ul className="mt-14 grid gap-4 sm:grid-cols-2">
            {beforeYouStart.items.map((item, index) => (
              <AnimateIn key={item} delay={index * 40} as="li">
                <div className="ecaa-card-hover flex items-start gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ecaa-green-900 text-sm font-bold text-ecaa-white shadow-ecaa-sm"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-1.5 text-base font-medium text-ecaa-ink">{item}</span>
                </div>
              </AnimateIn>
            ))}
          </ul>
        </AnimateIn>
      </Container>
    </section>
  )
}
