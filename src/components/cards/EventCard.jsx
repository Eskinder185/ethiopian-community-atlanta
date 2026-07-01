import Badge from '../ui/Badge'
import CTAButton from '../ui/CTAButton'
import { hasUsableText, hasUsableUrl } from '../../utils/data'

export default function EventCard({ event, variant = 'upcoming' }) {
  const showDate = hasUsableText(event.date)
  const showLocation = hasUsableText(event.location)

  return (
    <article className="ecaa-card-hover flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={variant === 'past' ? 'neutral' : 'green'}>
          {variant === 'past' ? 'Past event' : 'Upcoming'}
        </Badge>
        {showDate && (
          <span className="text-sm text-ecaa-ink-subtle">{event.date}</span>
        )}
      </div>

      <h3 className="heading-section mt-4 text-2xl">{event.title}</h3>

      {(hasUsableText(event.summary) || hasUsableText(event.description)) && (
        <p className="text-body mt-3 flex-1">
          {hasUsableText(event.summary) ? event.summary : event.description}
        </p>
      )}

      {showLocation && (
        <p className="mt-4 text-base text-ecaa-ink-subtle">{event.location}</p>
      )}

      {hasUsableUrl(event.registrationUrl) && (
        <CTAButton
          href={event.registrationUrl}
          variant="secondary"
          size="sm"
          className="mt-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Register
        </CTAButton>
      )}
    </article>
  )
}
