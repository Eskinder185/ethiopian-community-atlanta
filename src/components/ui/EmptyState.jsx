import { isTodoValue } from '../../utils/data'

const headingClasses = {
  h2: 'heading-section text-2xl',
  h3: 'text-xl font-semibold text-ecaa-ink',
}

export default function EmptyState({
  title = 'Nothing to show yet',
  description = 'Content will appear here once it is added to the data files.',
  action,
  className = '',
  headingLevel = 'h3',
}) {
  const HeadingTag = headingLevel
  const isEditorialTodo =
    typeof description === 'string' && isTodoValue(description)

  return (
    <div
      className={`empty-state ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      <p className="text-sm font-semibold uppercase tracking-widest text-ecaa-gold-600">
        Coming soon
      </p>
      <HeadingTag className={`mt-3 ${headingClasses[headingLevel]}`}>
        {title}
      </HeadingTag>
      <p
        className={`mt-3 text-base leading-relaxed sm:text-lg ${
          isEditorialTodo ? 'editorial-todo' : 'text-ecaa-ink-muted'
        }`}
      >
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
