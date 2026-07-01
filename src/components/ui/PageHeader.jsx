import Container from './Container'

export default function PageHeader({ title, description, badge }) {
  return (
    <header className="divider-soft surface-muted">
      <Container className="section-spacing-sm">
        {badge && <div className="mb-4">{badge}</div>}
        <h1 className="heading-page">{title}</h1>
        {description && <p className="text-lead mt-4">{description}</p>}
      </Container>
    </header>
  )
}
