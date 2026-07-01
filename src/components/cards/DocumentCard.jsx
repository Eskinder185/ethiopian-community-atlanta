import Badge from '../ui/Badge'
import CTAButton from '../ui/CTAButton'
import { hasUsableText, hasUsableUrl } from '../../utils/data'

export default function DocumentCard({ document, categoryTitle }) {
  return (
    <article className="ecaa-card-hover flex h-full flex-col">
      {categoryTitle && <Badge variant="neutral">{categoryTitle}</Badge>}

      <h3 className={`heading-section text-xl ${categoryTitle ? 'mt-4' : ''}`}>
        {document.title}
      </h3>

      {hasUsableText(document.description) && (
        <p className="text-body mt-3 flex-1">{document.description}</p>
      )}

      {hasUsableText(document.date) && (
        <p className="mt-4 text-sm text-ecaa-ink-subtle">{document.date}</p>
      )}

      {hasUsableUrl(document.fileUrl) ? (
        <CTAButton
          href={document.fileUrl}
          variant="secondary"
          size="sm"
          className="mt-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          View document
        </CTAButton>
      ) : (
        <p className="mt-6 text-sm text-ecaa-ink-subtle">File not yet available</p>
      )}
    </article>
  )
}
