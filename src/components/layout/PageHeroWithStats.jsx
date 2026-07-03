import { useState } from 'react'
import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import { getPatternImage, hasImageAsset, resolvePublicAssetPath } from '../../utils/images'
import {
  getHeroBackground,
  getHeroButtons,
  getHeroButtonProps,
  getHeroStats,
  getHeroSummaryBand,
  getPublicHeroText,
} from '../../utils/pageHeroes'

const overlayPresets = {
  welcoming: {
    main: 'from-ecaa-green-950/78 via-ecaa-green-900/55 to-ecaa-green-950/35',
    vertical: 'from-ecaa-green-950/55 via-ecaa-green-950/20 to-ecaa-green-950/25',
    mobile: 'bg-ecaa-green-950/25',
  },
  subtle: {
    main: 'from-ecaa-green-950/88 via-ecaa-green-950/65 to-ecaa-green-950/30',
    vertical: 'from-ecaa-green-950/60 via-ecaa-green-950/15 to-ecaa-green-950/25',
    mobile: 'bg-ecaa-green-950/20',
  },
  default: {
    main: 'from-ecaa-green-950/92 via-ecaa-green-950/75 to-ecaa-green-950/45',
    vertical: 'from-ecaa-green-950/70 via-ecaa-green-950/20 to-ecaa-green-950/30',
    mobile: 'bg-ecaa-green-950/30',
  },
  strong: {
    main: 'from-ecaa-green-950/96 via-ecaa-green-950/88 to-ecaa-green-950/60',
    vertical: 'from-ecaa-green-950/80 via-ecaa-green-950/35 to-ecaa-green-950/40',
    mobile: 'bg-ecaa-green-950/40',
  },
}

const sizeClasses = {
  home: 'min-h-[420px] py-12 sm:min-h-[480px] sm:py-14 lg:min-h-[520px] lg:py-16',
  page: 'min-h-[380px] py-12 sm:min-h-[440px] sm:py-14 lg:min-h-[480px] lg:py-16',
  legal: 'min-h-[320px] py-10 sm:min-h-[360px] sm:py-12',
}

const buttonVariants = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost',
}

function HeroButtons({ buttons, isHome }) {
  if (!buttons.length) return null

  return (
    <div className={isHome ? 'mt-8' : 'mt-8 lg:mt-10'}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {buttons.map((button) => {
          const variant = buttonVariants[button.style] || 'secondary'
          const linkProps = getHeroButtonProps(button)
          const isOutline = variant === 'secondary' || variant === 'ghost'
          const external = button.href?.startsWith('http')

          return (
            <CTAButton
              key={`${button.label}-${button.href}`}
              {...linkProps}
              variant={variant}
              size="lg"
              className={
                isOutline
                  ? variant === 'ghost'
                    ? 'btn-hero-ghost'
                    : 'btn-hero-outline'
                  : ''
              }
              {...(external
                ? {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': `${button.label} (opens in a new tab)`,
                  }
                : {})}
            >
              {button.label}
            </CTAButton>
          )
        })}
      </div>
    </div>
  )
}

function HeroSummaryBand({ text }) {
  return (
    <div className="relative border-t border-ecaa-gold-500/20 bg-ecaa-green-950/90">
      <Container className="py-4 sm:py-5">
        <p className="max-w-4xl text-center text-sm italic leading-relaxed text-ecaa-cream/90 sm:text-base lg:text-left">
          {text}
        </p>
      </Container>
    </div>
  )
}

function HeroStatsStrip({ stats }) {
  return (
    <div className="relative bg-ecaa-green-950">
      <Container className="py-5 sm:py-6">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat) => (
            <li key={`${stat.value}-${stat.label}`} className="text-center sm:text-left">
              <p className="text-base font-semibold tracking-tight text-ecaa-gold-300 sm:text-lg">
                {stat.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-ecaa-cream/75 sm:text-sm">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

export default function PageHeroWithStats({
  eyebrow,
  title,
  description,
  backgroundImage,
  backgroundAlt,
  buttons = [],
  stats = [],
  summaryBand,
  variant = 'page',
  overlayStrength = 'default',
  usePattern = false,
  priority = false,
  trustCue,
}) {
  const [imageFailed, setImageFailed] = useState(false)

  const resolvedBackground =
    backgroundImage?.src
      ? backgroundImage
      : typeof backgroundImage === 'string' && backgroundImage
        ? { src: backgroundImage, alt: backgroundAlt }
        : null

  const hasPhoto =
    !imageFailed &&
    resolvedBackground?.src &&
    resolvedBackground.src.startsWith('/') &&
    !resolvedBackground.src.includes('TODO')

  const photoSrc = hasPhoto ? resolvePublicAssetPath(resolvedBackground.src) : ''
  const pattern = getPatternImage()
  const patternSrc = hasImageAsset(pattern) ? resolvePublicAssetPath(pattern.src) : ''
  const overlay = overlayPresets[overlayStrength] || overlayPresets.default
  const isHome = variant === 'home'
  const isLegal = variant === 'legal'
  const titleText = getPublicHeroText(title)
  const descriptionText = getPublicHeroText(description)
  const eyebrowText = getPublicHeroText(eyebrow)
  const trustText = getPublicHeroText(trustCue)
  const visibleButtons = getHeroButtons(buttons)
  const visibleStats = getHeroStats(stats)
  const band = summaryBand ? getHeroSummaryBand({ summaryBand }) : null

  return (
    <header className="hero-bg relative isolate overflow-hidden">
      {hasPhoto ? (
        <img
          src={photoSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-ecaa-green-950 via-ecaa-green-900 to-ecaa-green-950"
          aria-hidden="true"
        />
      )}

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${overlay.main}`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${overlay.vertical}`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute inset-0 lg:hidden ${overlay.mobile}`}
        aria-hidden="true"
      />

      {(usePattern || isLegal) && patternSrc && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-soft-light"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${patternSrc})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '280px auto',
          }}
        />
      )}

      <Container
        className={`relative flex flex-col justify-center ${sizeClasses[variant] || sizeClasses.page}`}
      >
        <AnimateIn>
          <div className={isHome ? 'max-w-2xl' : 'max-w-xl lg:max-w-2xl'}>
            {eyebrowText && (
              <>
                <p className={isHome ? 'hero-home-eyebrow' : 'hero-page-eyebrow'}>{eyebrowText}</p>
                {isHome && (
                  <span
                    className="mt-4 mb-1 block h-1 w-14 rounded-full bg-gradient-to-r from-ecaa-gold-400 to-ecaa-gold-600"
                    aria-hidden="true"
                  />
                )}
              </>
            )}
            {titleText && (
              <h1
                className={`${isHome ? 'hero-home-title' : 'hero-page-title'} ${eyebrowText ? (isHome ? 'mt-3' : 'mt-4') : ''}`}
              >
                {titleText}
              </h1>
            )}
            {descriptionText && (
              <p className={`${isHome ? 'hero-home-lead' : 'hero-page-lead'} ${isHome ? 'mt-5' : 'mt-5 lg:mt-6'}`}>
                {descriptionText}
              </p>
            )}
            <HeroButtons buttons={visibleButtons} isHome={isHome} />
            {trustText && <p className="hero-home-trust mt-5 max-w-lg">{trustText}</p>}
          </div>
        </AnimateIn>
      </Container>

      {band && <HeroSummaryBand text={band.text} />}
      {visibleStats.length > 0 && <HeroStatsStrip stats={visibleStats} />}
    </header>
  )
}
