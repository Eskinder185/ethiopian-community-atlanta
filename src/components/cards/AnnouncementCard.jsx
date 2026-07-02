import Badge from '../ui/Badge'
import CTAButton from '../ui/CTAButton'
import { hasUsableText, hasUsableUrl } from '../../utils/data'
import { formatEventDateLabel } from '../../utils/events'

export default function AnnouncementCard({ item, type = 'announcement' }) {
  const label = type === 'news' ? 'Community news' : 'Announcement'
  const dateLabel = formatEventDateLabel(item.date)
  const actionUrl = hasUsableUrl(item.href) ? item.href : hasUsableUrl(item.link) ? item.link : null
  const isExternal = item.external !== false && hasUsableUrl(actionUrl)

  return (
    <article className="flex h-full flex-col rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ecaa-green-200/70 hover:shadow-ecaa-md sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <Badge variant={type === 'news' ? 'gold' : 'green'}>{label}</Badge>
        {dateLabel && (
          <span className="shrink-0 text-sm font-medium text-ecaa-ink-subtle">{dateLabel}</span>
        )}
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-ecaa-ink">{item.title}</h3>

      {hasUsableText(item.summary) && (
        <p className="mt-3 flex-1 text-base leading-relaxed text-ecaa-ink-muted">{item.summary}</p>
      )}

      {actionUrl ? (
        <CTAButton
          href={actionUrl}
          variant="secondary"
          size="sm"
          className="mt-6 self-start"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {item.ctaLabel || 'Read more'}
        </CTAButton>
      ) : (
        <p className="mt-6 text-sm text-ecaa-ink-subtle">More details will be shared when available.</p>
      )}
    </article>
  )
}
