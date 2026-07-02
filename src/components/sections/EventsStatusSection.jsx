import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import EmptyState from '../ui/EmptyState'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'

export default function EventsStatusSection({
  id,
  label,
  title,
  description,
  items = [],
  renderItem,
  emptyState,
  emptyActions = [],
  compactEmpty = false,
  muted = false,
}) {
  const spacingClass = compactEmpty ? 'py-12 sm:py-14 lg:py-16' : 'section-spacing-sm'

  return (
    <section id={id} className={muted ? 'surface-muted' : 'surface-white'}>
      <Container className={spacingClass}>
        <AnimateIn>
          <SectionHeader eyebrow={label} title={title} description={description} />

          {items.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => renderItem(item))}
            </div>
          ) : (
            <EmptyState
              className={compactEmpty ? 'mt-8 max-w-2xl' : 'mt-10'}
              title={emptyState?.title ?? 'Nothing to show yet'}
              description={
                emptyState?.description ??
                'Check back soon or contact ECAA for current updates.'
              }
              headingLevel="h3"
              compact={compactEmpty}
              action={
                emptyActions.length > 0 ? (
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {emptyActions.map((action, index) => (
                      <CTAButton
                        key={action.href || action.to}
                        href={action.href}
                        to={action.to}
                        variant={index === 0 ? 'primary' : 'secondary'}
                        size={compactEmpty ? 'md' : 'lg'}
                      >
                        {action.label}
                      </CTAButton>
                    ))}
                  </div>
                ) : undefined
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
