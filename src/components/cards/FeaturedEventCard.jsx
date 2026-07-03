import Badge from '../ui/Badge'
import CTAButton from '../ui/CTAButton'
import { useLanguage } from '../../context/LanguageContext'
import { getLinkProps, getPublicText, isUsableHomeText } from '../../utils/homepage'

const PLACEHOLDER_GRADIENT =
  'from-ecaa-green-900/85 via-ecaa-green-800/45 to-ecaa-gold-600/25'

export default function FeaturedEventCard({ item, size = 'default' }) {
  const { t, language } = useLanguage()
  const cta = getLinkProps({ href: item.href })
  const hasImage = isUsableHomeText(item.image) && !item.image.startsWith('TODO')
  const isExternal = cta?.href?.startsWith('http')
  const imageAlt = getPublicText(item.imageAlt, item.title)
  const isLarge = size === 'large'

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-ecaa-xl border border-ecaa-border/70 shadow-ecaa-sm ${
        isLarge ? 'min-h-[320px] sm:min-h-[380px]' : 'min-h-[220px] sm:min-h-[260px]'
      }`}
    >
      {hasImage ? (
        <img
          src={item.image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${PLACEHOLDER_GRADIENT}`}
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ecaa-green-950/92 via-ecaa-green-950/40 to-ecaa-green-950/15" />

      <div className="relative mt-auto flex flex-1 flex-col justify-end p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {isUsableHomeText(item.category) && !item.category.startsWith('TODO') && (
            <Badge variant="gold">{language === 'am' ? t('common.eventsLabel') : item.category}</Badge>
          )}
          {isUsableHomeText(item.date) && !item.date.startsWith('TODO') && (
            <span className="text-sm text-ecaa-cream/80">{item.date}</span>
          )}
        </div>

        <h3 className={`mt-3 font-semibold tracking-tight text-ecaa-white ${isLarge ? 'text-2xl' : 'text-lg'}`}>
          {item.title}
        </h3>

        {isUsableHomeText(item.excerpt) && (
          <p className={`mt-2 line-clamp-2 text-ecaa-cream/85 ${isLarge ? 'text-base' : 'text-sm'}`}>
            {item.excerpt}
          </p>
        )}

        {cta && (
          <CTAButton
            {...cta}
            variant="secondary"
            size="sm"
            className="mt-4 self-start !border-ecaa-white/30 !bg-ecaa-white/10 !text-ecaa-white hover:!bg-ecaa-white/20"
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {item.ctaLabel || (language === 'am' ? t('common.readMore') : 'Learn more')}
          </CTAButton>
        )}
      </div>
    </article>
  )
}
