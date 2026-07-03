import Container from '../ui/Container'
import AnimateIn from '../ui/AnimateIn'
import { getPublicText, isSectionVisible } from '../../utils/homepage'

export default function HomeMissionSection({ data }) {
  if (!isSectionVisible(data)) return null

  return (
    <section className="home-section surface-white" aria-labelledby="home-mission-heading">
      <Container className="home-section-inner">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            {data.eyebrow && <p className="text-eyebrow">{data.eyebrow}</p>}
            <h2 id="home-mission-heading" className="heading-section mt-2 text-3xl sm:text-4xl">
              {data.title}
            </h2>
            {getPublicText(data.description) && (
              <p className="mt-5 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                {getPublicText(data.description)}
              </p>
            )}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
