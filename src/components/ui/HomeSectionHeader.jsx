import CTAButton from './CTAButton'

export default function HomeSectionHeader({
  eyebrow,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div className={`home-section-header ${className}`.trim()}>
      <div className="max-w-2xl">
        {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
        <h2 className="heading-section mt-2 text-3xl sm:text-4xl">{title}</h2>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
            {description}
          </p>
        )}
      </div>
      {action?.label && (action.to || action.href) && (
        <CTAButton
          to={action.to}
          href={action.href}
          variant={action.variant || 'secondary'}
          size="md"
          className="shrink-0"
        >
          {action.label}
        </CTAButton>
      )}
    </div>
  )
}
