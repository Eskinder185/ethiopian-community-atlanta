import { useState } from 'react'
import {
  getMemberImageAlt,
  getMemberImageSrc,
  getMemberInitials,
  memberHasDisplayableImage,
} from '../../utils/leadership'

export default function LeadershipBubble({ member, committee, onSelect, compact = false, preview = false }) {
  const [imageFailed, setImageFailed] = useState(false)
  const hasPhoto = memberHasDisplayableImage(member) && !imageFailed
  const imageSrc = getMemberImageSrc(member)
  const initials = getMemberInitials(member.name)
  const committeeLabel = committee || member.committee

  const handleClick = () => {
    if (onSelect) onSelect(member)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex w-full flex-col items-center rounded-ecaa-2xl border border-ecaa-border/80 bg-ecaa-white p-4 text-center shadow-ecaa-sm transition-all duration-300 hover:-translate-y-1 hover:border-ecaa-gold-400/70 hover:shadow-ecaa-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500 ${
        compact ? 'p-3' : 'p-5 sm:p-6'
      } ${preview ? 'pointer-events-none' : ''}`}
      aria-label={`View profile for ${member.name}`}
    >
      <div
        className={`relative mb-4 overflow-hidden rounded-full border-2 border-ecaa-gold-200/80 bg-gradient-to-br from-ecaa-green-100 via-ecaa-cream to-ecaa-gold-100 shadow-ecaa-sm transition-transform duration-300 group-hover:scale-[1.03] ${
          compact ? 'h-20 w-20' : 'h-24 w-24 sm:h-28 sm:w-28'
        }`}
      >
        {hasPhoto ? (
          <img
            src={imageSrc}
            alt={getMemberImageAlt(member)}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span
            className={`flex h-full w-full items-center justify-center font-semibold text-ecaa-green-800 ${
              compact ? 'text-xl' : 'text-2xl sm:text-3xl'
            }`}
            aria-hidden="true"
          >
            {initials}
          </span>
        )}
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-ecaa-gold-400/0 via-ecaa-white/20 to-ecaa-gold-300/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>

      <h3 className={`font-semibold tracking-tight text-ecaa-ink ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>
        {member.name}
      </h3>

      {member.role && (
        <p className={`mt-1 font-medium leading-snug text-ecaa-gold-700 ${compact ? 'text-xs' : 'text-sm'}`}>
          {member.role}
        </p>
      )}

      {committeeLabel && (
        <span
          className={`leadership-committee-badge mt-3 inline-flex rounded-full border border-ecaa-green-200 bg-ecaa-green-50 px-3 py-1 font-semibold tracking-[0.12em] text-ecaa-green-800 ${
            compact ? 'text-[10px]' : 'text-[11px]'
          }`}
        >
          {committeeLabel}
        </span>
      )}
    </button>
  )
}
