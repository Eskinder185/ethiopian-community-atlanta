import { hasUsableText } from '../../utils/data'

const COLLAGE_LAYOUTS = [
  'sm:col-span-2 sm:row-span-2',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-2 sm:row-span-1',
  'sm:col-span-1 sm:row-span-2',
  'sm:col-span-1 sm:row-span-1',
]

function getAltText(image) {
  return hasUsableText(image.alt) ? image.alt : 'TODO: Add alt text'
}

export default function MasonryGallery({ images = [], className = '' }) {
  if (images.length === 0) return null

  return (
    <div
      className={`grid grid-cols-1 gap-3 sm:grid-cols-4 sm:auto-rows-[minmax(140px,auto)] lg:auto-rows-[minmax(180px,auto)] ${className}`.trim()}
    >
      {images.map((image, index) => {
        const layout = COLLAGE_LAYOUTS[index % COLLAGE_LAYOUTS.length]

        return (
          <figure
            key={image.id}
            className={`group relative min-h-[220px] overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-cream-dark shadow-ecaa-sm sm:min-h-0 ${layout}`}
          >
            <img
              src={image.src}
              alt={getAltText(image)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            {hasUsableText(image.title) && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ecaa-green-950/80 via-ecaa-green-950/40 to-transparent px-4 py-4 text-sm font-medium text-ecaa-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:py-5">
                {image.title}
              </figcaption>
            )}
          </figure>
        )
      })}
    </div>
  )
}
