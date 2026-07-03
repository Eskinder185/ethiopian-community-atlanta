import { getMemberImageAlt, memberHasDisplayableImage, getPublicContactLinks } from '../../utils/leadership'
import { hasUsableText } from '../../utils/data'
import { resolvePublicAssetPath } from '../../utils/images'

const SOCIAL_LABELS = {
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  twitter: 'Twitter',
  x: 'X',
  youtube: 'YouTube',
  email: 'Email',
}

function getImageSrc(member) {
  return member.image || member.photo?.src || ''
}

function getValidSocials(socials = []) {
  return socials.filter((item) => {
    if (!item?.url || typeof item.url !== 'string') return false
    const url = item.url.trim()
    return url.startsWith('http') || url.startsWith('mailto:')
  })
}

export default function LeadershipCard({ member, committee }) {
  const imageSrc = getImageSrc(member)
  const hasPhoto = memberHasDisplayableImage(member)
  const socials = getValidSocials(member.socials)
  const publicLinks = getPublicContactLinks(member)
  const altText = getMemberImageAlt(member)
  const resolvedSrc = hasPhoto
    ? imageSrc.startsWith('http')
      ? imageSrc
      : resolvePublicAssetPath(imageSrc)
    : ''

  return (
    <article className="ecaa-card-hover group flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-ecaa-cream-dark">
        {hasPhoto ? (
          <img
            src={resolvedSrc}
            alt={altText}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-ecaa-green-100">
            <span className="text-4xl font-semibold text-ecaa-green-800" aria-hidden="true">
              {member.name?.charAt(0) || '?'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-semibold tracking-tight text-ecaa-ink">{member.name}</h3>

        {member.title && (
          <p className="mt-2 text-base font-medium leading-snug text-ecaa-gold-700">
            {member.title}
          </p>
        )}

        {committee && (
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-ecaa-ink-subtle">
            {committee}
          </p>
        )}

        {hasUsableText(member.bio) && (
          <p className="mt-3 text-sm leading-relaxed text-ecaa-ink-muted">{member.bio}</p>
        )}

        {(publicLinks.length > 0 || socials.length > 0) && (
          <div className="mt-5 space-y-3">
            {publicLinks.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label={`Contact links for ${member.name}`}>
                {publicLinks.map((link) => (
                  <li key={`${link.type}-${link.href}`}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border border-ecaa-border bg-ecaa-cream px-3 text-xs font-semibold uppercase tracking-wide text-ecaa-green-900 transition-colors hover:border-ecaa-green-700 hover:bg-ecaa-green-50"
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label={`Social links for ${member.name}`}>
                {socials.map((social) => (
                  <li key={`${social.platform}-${social.url}`}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border border-ecaa-border bg-ecaa-cream px-3 text-xs font-semibold uppercase tracking-wide text-ecaa-green-900 transition-colors hover:border-ecaa-green-700 hover:bg-ecaa-green-50"
                      aria-label={`${member.name} on ${SOCIAL_LABELS[social.platform] || social.platform}`}
                    >
                      {SOCIAL_LABELS[social.platform] || social.platform}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export { getValidSocials, getImageSrc }
