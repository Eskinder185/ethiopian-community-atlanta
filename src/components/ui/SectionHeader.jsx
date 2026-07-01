import CTAButton from './CTAButton'

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  className = '',
}) {
  const alignment =
    align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`.trim()}>
      {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
      <h2 className="heading-section">{title}</h2>
      {description && <p className="text-lead">{description}</p>}
      {action?.label && (action.to || action.href) && (
        <CTAButton
          to={action.to}
          href={action.href}
          variant={action.variant || 'secondary'}
          size="md"
        >
          {action.label}
        </CTAButton>
      )}
    </div>
  )
}
