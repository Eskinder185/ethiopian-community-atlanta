import { getPatternImage, getResolvedImageSrc, hasImageAsset } from '../../utils/images'

export default function PatternDivider({ className = '' }) {
  const pattern = getPatternImage()
  const patternSrc = hasImageAsset(pattern) ? getResolvedImageSrc(pattern) : ''

  if (!patternSrc) return null

  return (
    <div
      className={['relative h-6 overflow-hidden sm:h-8', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url(${patternSrc})`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center',
          backgroundSize: 'auto 100%',
        }}
      />
    </div>
  )
}
