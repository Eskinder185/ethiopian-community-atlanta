import { Link } from 'react-router-dom'
import siteInfo from '../../data/siteInfo.json'

export default function HeaderBrand() {
  return (
    <Link
      to="/"
      className="group flex min-w-0 shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500"
      aria-label={`${siteInfo.name} home`}
    >
      <span className="shrink-0 text-lg font-bold tracking-tight text-ecaa-green-900 transition-colors duration-300 group-hover:text-ecaa-green-800">
        {siteInfo.shortName}
      </span>
      <span className="hidden h-5 w-px shrink-0 bg-ecaa-border xl:block" aria-hidden="true" />
      <span className="hidden max-w-[14rem] truncate text-sm text-ecaa-ink-subtle xl:block 2xl:max-w-xs">
        {siteInfo.name}
      </span>
    </Link>
  )
}
