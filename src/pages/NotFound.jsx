import PageHero from '../components/layout/PageHero'
import CTAButton from '../components/ui/CTAButton'

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Page not found"
      title="We could not find that page"
      description="The page you are looking for may have moved or is not available yet."
    >
      <CTAButton to="/" variant="primary" size="lg">
        Go to Home
      </CTAButton>
      <CTAButton to="/contact" variant="secondary" size="lg">
        Contact ECAA
      </CTAButton>
    </PageHero>
  )
}
