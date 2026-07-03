import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import { siteAssets } from '../../config/assets'
import { resolvePublicAssetPath } from '../../utils/images'
import { useLanguage } from '../../context/LanguageContext'
import {
  filterPublicLines,
  getLinkProps,
  getPublicText,
  isSectionVisible,
  isUsableHomeText,
} from '../../utils/homepage'

const DEFAULT_USE_CASES = [
  'Community meetings',
  'Cultural gatherings',
  'Celebrations',
  'Workshops',
  'Trainings',
  'Youth events',
  'Wellness sessions',
  'Fundraising events',
]

export default function HomeBookHall({ data }) {
  const { t } = useLanguage()
  if (!isSectionVisible(data)) return null

  const primaryCta = getLinkProps(data.primaryCta)
  const secondaryCta = getLinkProps(data.secondaryCta)
  const useCases = filterPublicLines(
    (data.useCases ?? DEFAULT_USE_CASES).map((item) =>
      typeof item === 'string' ? item : item?.useCase || item?.label || '',
    ),
  )
  const importantNote = getPublicText(
    data.importantNote,
    'Submitting a request does not guarantee a reservation. ECAA must confirm availability, requirements, pricing, and approval before the hall is booked.',
  )
  const hallImageSrc = resolvePublicAssetPath(siteAssets.bookHall)
  const hallImageAlt = getPublicText(data.imageAlt, siteAssets.bookHallAlt)
  const goodForLabel = getPublicText(data.goodForLabel, t('common.goodFor'))

  return (
    <section
      className="home-section border-y border-ecaa-gold-200/50 bg-gradient-to-br from-ecaa-gold-50 via-ecaa-cream to-ecaa-gold-100/30"
      aria-labelledby="home-book-hall-heading"
    >
      <Container className="home-section-inner">
        <AnimateIn>
          <div className="overflow-hidden rounded-ecaa-2xl border border-ecaa-gold-200/60 bg-ecaa-white/90 shadow-ecaa-md backdrop-blur-sm lg:grid lg:grid-cols-2 lg:items-stretch">
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-eyebrow text-ecaa-gold-700">{data.eyebrow}</p>
              <h2 id="home-book-hall-heading" className="heading-section mt-3 text-3xl text-ecaa-green-950 sm:text-4xl">
                {data.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                {data.description}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

              {isUsableHomeText(importantNote) && (
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-ecaa-ink-subtle">{importantNote}</p>
              )}

              <div className="mt-6 lg:mt-8">
                <h3 className="text-base font-semibold text-ecaa-green-950">{goodForLabel}</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {useCases.map((label) => (
                    <li
                      key={label}
                      className="flex items-start gap-2 text-sm leading-relaxed text-ecaa-ink-muted"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ecaa-gold-600"
                        aria-hidden="true"
                      />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-ecaa-gold-200/60 lg:border-l lg:border-t-0">
              <img
                src={hallImageSrc}
                alt={hallImageAlt}
                className="h-full min-h-[240px] w-full object-cover sm:min-h-[320px] lg:min-h-full"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
