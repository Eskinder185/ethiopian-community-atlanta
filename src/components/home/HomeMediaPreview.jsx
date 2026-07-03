import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import HomeSectionHeader from '../ui/HomeSectionHeader'
import CTAButton from '../ui/CTAButton'
import EmptyState from '../ui/EmptyState'
import AnimateIn from '../ui/AnimateIn'
import { useLanguage } from '../../context/LanguageContext'
import {
  getHomepageFeaturedMedia,
  getLinkProps,
  getMediaAlt,
  getMediaCaption,
  getPublicText,
  isSectionVisible,
} from '../../utils/homepage'
import { getResolvedImageSrc } from '../../utils/images'
import { getYoutubeThumbnail } from '../../utils/data'

function MediaPreviewCard({ item }) {
  const { t } = useLanguage()
  const [imageFailed, setImageFailed] = useState(false)
  const isVideo = item.type === 'video' || item.type === 'youtube'
  const thumbnail =
    isVideo && getYoutubeThumbnail(item.youtubeUrl || item.embedUrl || item.url)
  const imageSrc = getResolvedImageSrc(item.src)
  const title = getPublicText(item.title)
  const caption = getMediaCaption(item)
  const showImage = !isVideo && imageSrc && !imageFailed

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white shadow-ecaa-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-ecaa-green-900 via-ecaa-green-800 to-ecaa-gold-800">
        {isVideo && thumbnail ? (
          <img
            src={thumbnail}
            alt={getMediaAlt(item)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        ) : showImage ? (
          <img
            src={imageSrc}
            alt={getMediaAlt(item)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-ecaa-cream/80">
            {isVideo ? 'Video preview' : 'Photo preview'}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {title && <h3 className="text-lg font-semibold text-ecaa-ink">{title}</h3>}
        {caption && caption !== title && (
          <p className="mt-2 text-sm leading-relaxed text-ecaa-ink-muted">{caption}</p>
        )}
        <Link
          to="/media"
          className="mt-4 text-sm font-semibold text-ecaa-green-800 hover:underline"
        >
          {t('common.viewInGallery')}
        </Link>
      </div>
    </article>
  )
}

export default function HomeMediaPreview({ section, mediaItems = [] }) {
  if (!isSectionVisible(section)) return null

  const maxItems = section.maxItems ?? 4
  const items = getHomepageFeaturedMedia(mediaItems, maxItems)
  const sectionCta = getLinkProps(section.sectionCta)
  const emptyState = section.emptyState ?? {}
  const emptyPrimaryCta = getLinkProps(emptyState.primaryCta)
  const hasItems = items.length > 0

  return (
    <section className="home-section surface-muted" aria-labelledby="home-media-heading">
      <Container className="home-section-inner">
        <AnimateIn>
          <HomeSectionHeader
            id="home-media-heading"
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            action={
              hasItems && sectionCta
                ? { label: section.sectionCta.label, ...sectionCta, variant: 'secondary' }
                : undefined
            }
            className="home-section-header-row"
          />

          {hasItems ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item, index) => (
                <AnimateIn key={item.id} delay={index * 50}>
                  <MediaPreviewCard item={item} />
                </AnimateIn>
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-10 rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white/80 p-8 text-center shadow-ecaa-sm sm:p-10"
              headingLevel="h3"
              title={emptyState.title || 'Community media will be shared soon'}
              description={
                emptyState.description ||
                'Photos, flyers, videos, and community moments will appear here when published.'
              }
              action={
                emptyPrimaryCta ? (
                  <CTAButton {...emptyPrimaryCta} variant="primary" size="lg">
                    {emptyState.primaryCta?.label || 'View Media Gallery'}
                  </CTAButton>
                ) : sectionCta ? (
                  <CTAButton {...sectionCta} variant="primary" size="lg">
                    {section.sectionCta.label}
                  </CTAButton>
                ) : null
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
