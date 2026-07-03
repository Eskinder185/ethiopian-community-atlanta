import { useMemo } from 'react'
import PageHeroWithStats from '../components/layout/PageHeroWithStats'
import Container from '../components/ui/Container'
import CTAButton from '../components/ui/CTAButton'
import ExternalFormCTA from '../components/ui/ExternalFormCTA'
import AnimateIn from '../components/ui/AnimateIn'
import { useSupportPage } from '../hooks/useSupportPage'
import { getSupportHighlightCards } from '../data/supportPageContent'
import { getPageHero, getHeroBackground } from '../utils/pageHeroes'

export default function Support() {
  const { content } = useSupportPage()
  const pageHeroConfig = useMemo(() => getPageHero('support'), [])
  const background = useMemo(() => getHeroBackground(pageHeroConfig, 'support'), [pageHeroConfig])
  const highlightCards = useMemo(() => getSupportHighlightCards(content), [content])

  return (
    <>
      <PageHeroWithStats
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        backgroundImage={background}
        backgroundAlt={pageHeroConfig?.backgroundAlt}
        buttons={content.hero.buttons}
        stats={highlightCards}
        variant={pageHeroConfig?.variant || 'page'}
        overlayStrength={pageHeroConfig?.overlayStrength || 'default'}
      />

      <section className="surface-white" id="donate">
        <Container className="section-spacing-sm">
          <AnimateIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-eyebrow">{content.donation.eyebrow}</p>
              <h2 className="heading-section mt-3 text-3xl">{content.donation.title}</h2>
              <p className="text-body mx-auto mt-4 max-w-2xl">{content.donation.description}</p>
            </div>

            <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.donation.levels.map((level) => (
                <li
                  key={`${level.name}-${level.amount}`}
                  className="rounded-ecaa-lg border border-ecaa-border/60 bg-ecaa-cream/50 px-5 py-4 text-center"
                >
                  <p className="font-semibold text-ecaa-ink">{level.name}</p>
                  <p className="mt-1 text-lg text-ecaa-green-800">{level.amount}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <ExternalFormCTA
                title={content.donation.form.title}
                description={content.donation.form.description}
                buttonLabel={content.donation.form.buttonLabel}
                formUrl={content.donation.form.formUrl}
                badges={content.donation.form.badges}
              />
            </div>
          </AnimateIn>
        </Container>
      </section>

      <section className="surface-muted" id="other-ways">
        <Container className="section-spacing-sm">
          <AnimateIn>
            <div className="ecaa-card mx-auto max-w-3xl text-center">
              <h2 className="heading-section text-2xl">{content.otherOptions.title}</h2>
              <p className="text-body mx-auto mt-4 max-w-xl">{content.otherOptions.description}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {content.otherOptions.links.map((link) => (
                  <CTAButton key={link.path} to={link.path} variant="secondary" size="lg">
                    {link.label}
                  </CTAButton>
                ))}
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>

      <section className="surface-muted" id={content.volunteer.id || 'volunteer'}>
        <Container className="section-spacing-sm">
          <AnimateIn>
            <div className="ecaa-card mx-auto max-w-3xl text-center">
              <h2 className="heading-section text-2xl">{content.volunteer.title}</h2>
              <p className="text-body mx-auto mt-4 max-w-xl">{content.volunteer.description}</p>
              <div className="mt-8">
                <CTAButton to={content.volunteer.buttonPath} variant="primary" size="lg">
                  {content.volunteer.buttonLabel}
                </CTAButton>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>

      <section className="surface-white">
        <Container className="section-spacing-sm">
          <div className="ecaa-card mx-auto max-w-3xl text-center">
            <h2 className="heading-section text-2xl">{content.finalCta.title}</h2>
            <p className="text-body mx-auto mt-4 max-w-xl">{content.finalCta.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {content.finalCta.buttons.map((button, index) => (
                <CTAButton
                  key={button.href}
                  to={button.href}
                  variant={index === 0 ? 'primary' : 'secondary'}
                  size="lg"
                >
                  {button.label}
                </CTAButton>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
