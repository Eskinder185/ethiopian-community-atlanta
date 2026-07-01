import Badge from '../ui/Badge'
import CTAButton from '../ui/CTAButton'
import ResponsiveEmbed from '../ui/ResponsiveEmbed'
import { hasUsableText, hasUsableUrl } from '../../utils/data'

export default function FormCard({ form, showEmbed = false }) {
  return (
    <article className="ecaa-card flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="gold">{form.provider}</Badge>
        {hasUsableText(form.category) && (
          <Badge variant="neutral">{form.category}</Badge>
        )}
      </div>

      <h3 className="heading-section mt-4 text-2xl">{form.title}</h3>

      {hasUsableText(form.description) && (
        <p className="text-body mt-3">{form.description}</p>
      )}

      {hasUsableText(form.notes) && (
        <p className="mt-4 text-base text-ecaa-ink-subtle">{form.notes}</p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        {hasUsableUrl(form.url) && (
          <CTAButton
            href={form.url}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open form
          </CTAButton>
        )}
      </div>

      {showEmbed && form.embedAllowed && hasUsableUrl(form.url) && (
        <div className="mt-8">
          <ResponsiveEmbed
            src={form.url}
            title={form.title}
            aspectRatio="4/3"
          />
        </div>
      )}
    </article>
  )
}
