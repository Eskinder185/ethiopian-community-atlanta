import { useState } from 'react'
import { getImageById, hasImageAsset } from '../../utils/images'

const aspectClasses = {
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-[16/9]',
  square: 'aspect-square',
  auto: '',
}

export default function SectionImage({
  id,
  aspect = '16/9',
  className = '',
  wrapperClassName = '',
  priority = false,
  rounded = true,
}) {
  const image = getImageById(id)
  const [failed, setFailed] = useState(false)

  if (!hasImageAsset(image) || failed) return null

  const roundedClass = rounded ? 'rounded-ecaa-2xl' : 'rounded-none'

  return (
    <div
      className={[
        'overflow-hidden shadow-ecaa',
        roundedClass,
        aspectClasses[aspect] || aspectClasses['16/9'],
        wrapperClassName,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img
        src={image.src}
        alt={image.alt || image.title || ''}
        className={['h-full w-full object-cover object-center', className].filter(Boolean).join(' ')}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
