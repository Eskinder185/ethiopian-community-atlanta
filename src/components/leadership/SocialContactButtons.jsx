import { getPublicContactLinks } from '../../utils/leadership'

export default function SocialContactButtons({ member, labels, className = '' }) {
  const links = getPublicContactLinks(member, labels)

  if (!links.length) return null

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={`Contact options for ${member.name}`}>
      {links.map((link) => (
        <li key={`${link.type}-${link.href}`}>
          <a
            href={link.href}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-ecaa-border bg-ecaa-cream px-4 text-sm font-semibold text-ecaa-green-900 transition-colors hover:border-ecaa-green-700 hover:bg-ecaa-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500"
            {...(link.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
