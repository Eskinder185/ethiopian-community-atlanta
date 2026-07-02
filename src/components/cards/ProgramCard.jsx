import CTAButton from '../ui/CTAButton'
import { hasUsableText, hasUsableUrl } from '../../utils/data'

export default function ProgramCard({ program, variant = 'preview' }) {
  const link = program.link || `/programs#${program.id}`
  const isDetail = variant === 'detail'
  const isExternalLink = hasUsableUrl(link)

  const description = isDetail
    ? program.description || program.summary
    : getPreviewDescription(program)

  return (
    <article className={`flex h-full flex-col ${isDetail ? 'ecaa-card' : 'ecaa-card-hover'}`}>
      {!isDetail && (
        <div
          className="mb-5 h-0.5 w-10 rounded-full bg-gradient-to-r from-ecaa-gold-400 to-ecaa-green-600"
          aria-hidden="true"
        />
      )}
      <h3 className={`font-semibold tracking-tight text-ecaa-ink ${isDetail ? 'text-2xl' : 'text-xl sm:text-2xl'}`}>
        {program.title}
      </h3>

      {description ? (
        <p
          className={`mt-4 flex-1 ${
            typeof description === 'string' && description.startsWith('TODO')
              ? 'editorial-todo'
              : 'text-body'
          }`}
        >
          {description}
        </p>
      ) : (
        !isDetail && (
          <p className="mt-4 flex-1 text-base text-ecaa-ink-subtle">
            Learn more about {program.title}.
          </p>
        )
      )}

      {isDetail && isExternalLink && (
        <CTAButton href={link} variant="secondary" size="sm" className="mt-6 self-start">
          Open form
        </CTAButton>
      )}

      {!isDetail && (
        <CTAButton
          to={isExternalLink ? undefined : link}
          href={isExternalLink ? link : undefined}
          variant="ghost"
          size="sm"
          className="mt-8 self-start"
        >
          Learn more
        </CTAButton>
      )}
    </article>
  )
}

function getPreviewDescription(program) {
  if (hasUsableText(program.summary)) return program.summary
  if (hasUsableText(program.description)) return program.description
  return null
}
