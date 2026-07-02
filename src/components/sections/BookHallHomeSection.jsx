import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import { getLinkProps, getPublicText, isSectionVisible, isUsableHomeText } from '../../utils/homepage'

const DEFAULT_USE_CASES = [
  'Community meetings',
  'Celebrations',
  'Workshops',
  'Cultural events',
]

export default function BookHallHomeSection({ data }) {
  if (!isSectionVisible(data)) return null

  const primaryCta = getLinkProps(data.primaryCta)
  const secondaryCta = getLinkProps(data.secondaryCta)
  const hasImage = isUsableHomeText(data.image) && !data.image.startsWith('TODO')
  const imageAlt = getPublicText(data.imageAlt, 'ECAA community event space')
  const useCases = (data.useCases ?? DEFAULT_USE_CASES).filter(
    (item) => isUsableHomeText(item) && !String(item).startsWith('TODO'),
  )

  return (
    <section className="home-section border-y border-ecaa-gold-200/50 bg-gradient-to-br from-ecaa-gold-50 via-ecaa-cream to-ecaa-gold-100/30">
      <Container className="home-section-inner">
        <AnimateIn>
          <div className="overflow-hidden rounded-ecaa-2xl border border-ecaa-gold-200/60 bg-ecaa-white/90 shadow-ecaa-md backdrop-blur-sm lg:grid lg:grid-cols-2 lg:items-stretch">
            <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px] lg:min-h-full lg:order-2">
              {hasImage ? (
                <img
                  src={data.image}
                  alt={imageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div
                  className="absolute inset-0 bg-gradient-to-br from-ecaa-gold-100 via-ecaa-cream to-ecaa-green-50"
                  aria-hidden="true"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ecaa-green-950/50 via-ecaa-green-950/10 to-transparent" />
              <div className="relative flex h-full min-h-[240px] flex-col justify-end p-6 sm:p-8 lg:min-h-full">
                <p className="max-w-sm text-base font-medium leading-snug text-ecaa-white drop-shadow-sm">
                  Host your next community event in a welcoming space with ECAA.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <p className="text-eyebrow text-ecaa-gold-700">{data.eyebrow}</p>
              <h2 className="heading-section mt-3 text-3xl text-ecaa-green-950 sm:text-4xl">
                {data.title}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                {data.description}
              </p>

              {useCases.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {useCases.map((label) => (
                    <li
                      key={label}
                      className="rounded-full border border-ecaa-gold-200/80 bg-ecaa-gold-50/80 px-3 py-1.5 text-sm font-medium text-ecaa-green-900"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-5 text-sm text-ecaa-ink-subtle">
                Please contact ECAA for current availability and booking details.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryCta && (
                  <CTAButton {...primaryCta} variant="primary" size="lg">
                    {data.primaryCta.label}
                  </CTAButton>
                )}
                {secondaryCta && (
                  <CTAButton {...secondaryCta} variant="secondary" size="lg">
                    {data.secondaryCta.label}
                  </CTAButton>
                )}
              </div>
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
