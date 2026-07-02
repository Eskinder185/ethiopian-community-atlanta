import Badge from '../ui/Badge'
import CTAButton from '../ui/CTAButton'
import { hasUsableText, hasUsableUrl } from '../../utils/data'
import { formatEventDateLabel } from '../../utils/events'

export default function EventCard({ event, variant = 'upcoming' }) {
  const dateLabel = formatEventDateLabel(event.date)
  const showLocation = hasUsableText(event.location)
  const showCategory = hasUsableText(event.category)
  const excerpt = hasUsableText(event.summary)
    ? event.summary
    : hasUsableText(event.description)
      ? event.description
      : null
  const actionUrl = hasUsableUrl(event.registrationUrl)
    ? event.registrationUrl
    : hasUsableUrl(event.recapUrl)
      ? event.recapUrl
      : hasUsableUrl(event.link)
        ? event.link
        : null
  const badgeLabel = variant === 'past' ? 'Past event' : 'Upcoming'

  return (
    <article className="flex h-full flex-col rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ecaa-green-200/70 hover:shadow-ecaa-md sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={variant === 'past' ? 'neutral' : 'green'}>{badgeLabel}</Badge>
        {showCategory && <Badge variant="gold">{event.category}</Badge>}
        {dateLabel && <span className="text-sm font-medium text-ecaa-ink-subtle">{dateLabel}</span>}
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-ecaa-ink">{event.title}</h3>

      {excerpt && <p className="mt-3 flex-1 text-base leading-relaxed text-ecaa-ink-muted">{excerpt}</p>}

      {showLocation && (
        <p className="mt-4 text-sm text-ecaa-ink-subtle">{event.location}</p>
      )}

      {actionUrl && (
        <CTAButton
          href={actionUrl}
          variant="secondary"
          size="sm"
          className="mt-6 self-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          {hasUsableUrl(event.registrationUrl)
            ? event.ctaLabel || 'Register'
            : variant === 'past'
              ? event.ctaLabel || 'View recap'
              : event.ctaLabel || 'Learn more'}
        </CTAButton>
      )}
    </article>
  )
}
