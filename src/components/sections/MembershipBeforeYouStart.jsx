import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import AnimateIn from '../ui/AnimateIn'
import membershipData from '../../content/membership.json'

export default function MembershipBeforeYouStart() {
  const { beforeYouStart } = membershipData

  return (
    <section className="surface-white" id="before-you-start">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={beforeYouStart.label}
            title={beforeYouStart.title}
            description={beforeYouStart.description}
          />

          <ol className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {beforeYouStart.items.map((item, index) => (
              <AnimateIn key={item} delay={index * 30} as="li">
                <div className="flex items-center gap-4 rounded-ecaa-lg border border-ecaa-border/70 bg-ecaa-white px-4 py-3.5 shadow-ecaa-sm">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ecaa-green-900 text-sm font-bold text-ecaa-white"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <span className="text-base text-ecaa-ink">{item}</span>
                </div>
              </AnimateIn>
            ))}
          </ol>
        </AnimateIn>
      </Container>
    </section>
  )
}
