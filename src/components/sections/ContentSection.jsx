import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import AnimateIn from '../ui/AnimateIn'

export default function ContentSection({
  id,
  eyebrow,
  title,
  description,
  children,
  muted = false,
  align = 'left',
}) {
  return (
    <section
      id={id}
      className={muted ? 'surface-muted' : 'surface-white'}
    >
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={align}
          />
          {children && <div className="mt-12">{children}</div>}
        </AnimateIn>
      </Container>
    </section>
  )
}
