import { getPatternImage, hasImageAsset } from '../../utils/images'

export default function PatternDivider({ className = '' }) {
  const pattern = getPatternImage()

  if (!hasImageAsset(pattern)) return null

  return (
    <div
      className={['relative h-6 overflow-hidden sm:h-8', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url(${pattern.src})`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center',
          backgroundSize: 'auto 100%',
        }}
      />
    </div>
  )
}
