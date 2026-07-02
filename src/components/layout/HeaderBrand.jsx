import { Link } from 'react-router-dom'
import siteInfo from '../../content/siteInfo.json'
import navigation from '../../data/navigation.json'

export default function HeaderBrand() {
  const subtitle = navigation.header.brandSubtitle || 'Ethiopian Community Association'

  return (
    <Link
      to="/"
      className="group flex min-w-0 shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500 sm:gap-3"
      aria-label={`${siteInfo.name} home`}
    >
      <span className="shrink-0 whitespace-nowrap text-lg font-bold tracking-tight text-ecaa-green-900 transition-colors duration-300 group-hover:text-ecaa-green-800 xl:text-xl">
        {siteInfo.shortName}
      </span>
      <span
        className="hidden h-5 w-px shrink-0 bg-ecaa-border 2xl:block"
        aria-hidden="true"
      />
      <span className="hidden max-w-[17rem] truncate text-sm text-ecaa-ink-subtle 2xl:inline">
        {subtitle}
      </span>
    </Link>
  )
}
