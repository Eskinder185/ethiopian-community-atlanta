import { Link } from 'react-router-dom'
import { getMediaAlt, getMediaCaption, getLinkProps } from '../../utils/homepage'
import { getYoutubeThumbnail, toEmbedUrl } from '../../utils/data'

const SIZE_CLASSES = {
  large: 'sm:col-span-2 sm:row-span-2 min-h-[280px] sm:min-h-0',
  wide: 'sm:col-span-2 sm:row-span-1 min-h-[200px] sm:min-h-0',
  small: 'sm:col-span-1 sm:row-span-1 min-h-[200px] sm:min-h-0',
}

function getLayoutClass(item, index) {
  if (item.featuredSize && SIZE_CLASSES[item.featuredSize]) {
    return SIZE_CLASSES[item.featuredSize]
  }
  const fallback = [
    'sm:col-span-2 sm:row-span-2 min-h-[280px] sm:min-h-0',
    'sm:col-span-1 sm:row-span-1 min-h-[200px] sm:min-h-0',
    'sm:col-span-1 sm:row-span-1 min-h-[200px] sm:min-h-0',
    'sm:col-span-2 sm:row-span-1 min-h-[200px] sm:min-h-0',
  ]
  return fallback[index % fallback.length]
}

function PlayIcon() {
  return (
    <span
      className="flex h-14 w-14 items-center justify-center rounded-full border border-ecaa-white/40 bg-ecaa-green-950/50 text-ecaa-white shadow-ecaa-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      <svg className="ml-1 h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  )
}

function MediaTile({ item, layout, sectionHref }) {
  const isVideo = item.type === 'video'
  const embedSrc = toEmbedUrl(item.embedUrl || item.youtubeUrl)
  const caption = getMediaCaption(item)
  const itemLink = getLinkProps({ href: item.href })
  const href = itemLink?.href || itemLink?.to || sectionHref
  const isExternal = typeof href === 'string' && href.startsWith('http')

  const thumbnail =
    (isVideo && getYoutubeThumbnail(item.thumbnailUrl || item.embedUrl || item.youtubeUrl)) ||
  null

  const content = (
    <>
      {isVideo ? (
        thumbnail ? (
          <img
            src={thumbnail}
            alt={getMediaAlt(item)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="h-full w-full bg-gradient-to-br from-ecaa-green-900 via-ecaa-green-800 to-ecaa-gold-800"
            aria-hidden="true"
          />
        )
      ) : (
        <img
          src={item.src}
          alt={getMediaAlt(item)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      )}

      {isVideo && embedSrc && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ecaa-green-950/20">
          <PlayIcon />
        </div>
      )}

      {caption && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ecaa-green-950/90 via-ecaa-green-950/50 to-transparent px-4 pb-4 pt-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-sm font-medium text-ecaa-white">{caption}</span>
        </figcaption>
      )}
    </>
  )

  const figureClass = `group relative overflow-hidden rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-cream-dark shadow-ecaa-sm ${layout}`

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${figureClass} block`}
        >
          {content}
        </a>
      )
    }
    return (
      <Link to={href} className={`${figureClass} block`}>
        {content}
      </Link>
    )
  }

  return <figure className={figureClass}>{content}</figure>
}

export default function FeaturedMediaCollage({ items = [], className = '', sectionHref = '/media' }) {
  if (items.length === 0) return null

  return (
    <div
      className={`grid grid-cols-1 gap-3 sm:grid-cols-4 sm:auto-rows-[minmax(160px,1fr)] lg:gap-4 lg:auto-rows-[minmax(180px,1fr)] ${className}`.trim()}
    >
      {items.map((item, index) => (
        <MediaTile
          key={item.id}
          item={item}
          layout={getLayoutClass(item, index)}
          sectionHref={sectionHref}
        />
      ))}
    </div>
  )
}
