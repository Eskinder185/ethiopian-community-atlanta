import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { toEmbedUrl, hasUsableUrl } from '../../utils/data'
import { getResolvedImageSrc } from '../../utils/images'
import { getMediaButtonLabel, LINK_MEDIA_TYPES, MEDIA_TYPES } from '../../utils/mediaItems'
import CTAButton from '../ui/CTAButton'

const IMAGE_PLACEHOLDER = 'Image will appear here once published.'

function ImagePlaceholder({ message = IMAGE_PLACEHOLDER }) {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-ecaa-cream/60 px-6 py-10 text-center text-sm text-ecaa-ink-muted">
      {message}
    </div>
  )
}

function MediaImage({ item }) {
  const [failed, setFailed] = useState(false)
  const src = getResolvedImageSrc(item.imageUrl)

  if (!src || failed) {
    return <ImagePlaceholder />
  }

  return (
    <img
      src={src}
      alt={item.altText || item.title || 'Event media'}
      className="max-h-[28rem] w-full object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

function MediaYoutube({ item, buttonLabels, language }) {
  const embedUrl = toEmbedUrl(item.url)
  const linkUrl = hasUsableUrl(item.url) ? item.url : null
  const buttonLabel = getMediaButtonLabel(item.type, language, item.buttonLabel, buttonLabels)

  if (embedUrl) {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          title={item.title || 'Event video'}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (linkUrl) {
    return (
      <div className="flex min-h-[12rem] flex-col items-center justify-center gap-4 bg-ecaa-cream/60 px-6 py-10 text-center">
        <p className="text-sm text-ecaa-ink-muted">Video link available</p>
        <CTAButton href={linkUrl} variant="secondary" size="sm" target="_blank" rel="noopener noreferrer">
          {buttonLabel}
        </CTAButton>
      </div>
    )
  }

  return null
}

function MediaLinkCard({ item, buttonLabels, language }) {
  const linkUrl = hasUsableUrl(item.url) ? item.url : null
  const buttonLabel = getMediaButtonLabel(item.type, language, item.buttonLabel, buttonLabels)
  const previewSrc = item.type === MEDIA_TYPES.DOCUMENT ? getResolvedImageSrc(item.imageUrl) : null

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
      {previewSrc && (
        <div className="border-b border-ecaa-border/60 bg-ecaa-cream/40 p-4">
          <img
            src={previewSrc}
            alt={item.altText || item.title || 'Document preview'}
            className="max-h-48 w-full object-contain"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-ecaa-green-950">{item.title}</h3>
        {item.caption && <p className="mt-2 flex-1 text-sm leading-relaxed text-ecaa-ink-muted">{item.caption}</p>}
        {linkUrl ? (
          <div className="mt-5">
            <CTAButton href={linkUrl} variant="secondary" size="sm" target="_blank" rel="noopener noreferrer">
              {buttonLabel}
            </CTAButton>
          </div>
        ) : (
          <p className="mt-5 text-sm text-ecaa-ink-muted">Link will appear here once published.</p>
        )}
      </div>
    </article>
  )
}

function MediaFigure({ item, children }) {
  return (
    <figure className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
      <div className="flex items-center justify-center bg-ecaa-cream/40 p-4">{children}</div>
      {(item.title || item.caption) && (
        <figcaption className="border-t border-ecaa-border/60 px-4 py-3">
          {item.title && <p className="font-semibold text-ecaa-green-950">{item.title}</p>}
          {item.caption && <p className="mt-1 text-sm text-ecaa-ink-muted">{item.caption}</p>}
        </figcaption>
      )}
    </figure>
  )
}

export default function MediaCard({ item, buttonLabels = {} }) {
  const { language } = useLanguage()
  const type = item.type || MEDIA_TYPES.IMAGE

  if (LINK_MEDIA_TYPES.includes(type)) {
    return <MediaLinkCard item={item} buttonLabels={buttonLabels} language={language} />
  }

  if (type === MEDIA_TYPES.YOUTUBE) {
    return (
      <MediaFigure item={item}>
        <MediaYoutube item={item} buttonLabels={buttonLabels} language={language} />
      </MediaFigure>
    )
  }

  if (type === MEDIA_TYPES.IMAGE || type === MEDIA_TYPES.GIF) {
    return (
      <MediaFigure item={item}>
        <MediaImage item={item} />
      </MediaFigure>
    )
  }

  const linkUrl = hasUsableUrl(item.url) ? item.url : null
  if (linkUrl) {
    return <MediaLinkCard item={item} buttonLabels={buttonLabels} language={language} />
  }

  return (
    <article className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm">
      {item.title && <h3 className="text-lg font-semibold text-ecaa-green-950">{item.title}</h3>}
      {item.caption && <p className="mt-2 text-sm leading-relaxed text-ecaa-ink-muted">{item.caption}</p>}
    </article>
  )
}
