import Badge from '../ui/Badge'
import { hasUsableText } from '../../utils/data'

export default function AnnouncementCard({ item, type = 'announcement' }) {
  const label = type === 'news' ? 'Community news' : 'Announcement'

  return (
    <article className="ecaa-card-hover flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={type === 'news' ? 'gold' : 'green'}>{label}</Badge>
        {hasUsableText(item.date) && (
          <span className="text-sm text-ecaa-ink-subtle">{item.date}</span>
        )}
      </div>

      <h3 className="heading-section mt-4 text-xl">{item.title}</h3>

      {hasUsableText(item.summary) && (
        <p className="text-body mt-3 flex-1">{item.summary}</p>
      )}
    </article>
  )
}
