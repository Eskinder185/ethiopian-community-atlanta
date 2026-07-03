import { hasUsableText } from '../../utils/data'
import { getResolvedImageSrc } from '../../utils/images'

export default function ImageCard({ image }) {
  const hasImage = image.src && !image.src.startsWith('TODO')
  const imageSrc = getResolvedImageSrc(image)

  return (
    <figure className="ecaa-card-hover overflow-hidden p-0">
      <div className="aspect-[4/3] bg-ecaa-cream-dark">
        {hasImage && imageSrc ? (
          <img
            src={imageSrc}
            alt={image.alt || image.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <p className="text-base text-ecaa-ink-subtle">Image not yet available</p>
          </div>
        )}
      </div>

      {(hasUsableText(image.title) || hasUsableText(image.description)) && (
        <figcaption className="p-5 sm:p-6">
          {hasUsableText(image.title) && (
            <h3 className="text-lg font-semibold text-ecaa-ink">{image.title}</h3>
          )}
          {hasUsableText(image.description) && (
            <p className="text-body mt-2">{image.description}</p>
          )}
        </figcaption>
      )}
    </figure>
  )
}
