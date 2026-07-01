import { Link } from 'react-router-dom'

const accents = {
  green: 'from-ecaa-green-100 to-ecaa-green-50 text-ecaa-green-900',
  gold: 'from-ecaa-gold-100 to-ecaa-gold-50 text-ecaa-gold-700',
  red: 'from-ecaa-red-100 to-ecaa-red-50 text-ecaa-red-700',
  cream: 'from-ecaa-cream-dark to-ecaa-cream text-ecaa-ink-muted',
}

export default function QuickActionCard({
  title,
  description,
  to,
  icon,
  accent = 'green',
}) {
  return (
    <Link
      to={to}
      className="ecaa-card-hover group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500"
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold shadow-ecaa-sm ${accents[accent]}`}
        aria-hidden="true"
      >
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold tracking-tight text-ecaa-ink">
        {title}
      </h3>

      <p className="text-body mt-3 flex-1">{description}</p>

      <span className="mt-6 inline-flex items-center text-sm font-semibold text-ecaa-green-900 transition-all duration-300 group-hover:translate-x-1">
        Explore
        <span className="ml-2 opacity-70" aria-hidden="true">→</span>
      </span>
    </Link>
  )
}
