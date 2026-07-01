import CTAButton from '../ui/CTAButton'
import { hasUsableUrl } from '../../utils/data'

const accentStyles = {
  green: 'border-ecaa-green-200 bg-gradient-to-br from-ecaa-green-50 to-ecaa-white',
  gold: 'border-ecaa-gold-200 bg-gradient-to-br from-ecaa-gold-50 to-ecaa-white',
  red: 'border-ecaa-red-200 bg-gradient-to-br from-ecaa-red-50 to-ecaa-white',
  cream: 'border-ecaa-border bg-ecaa-cream',
}

export default function SupportCtaSection({ section, muted = false }) {
  const hasLink = hasUsableUrl(section.ctaUrl)

  return (
    <section
      id={section.id}
      className={muted ? 'surface-muted' : 'surface-white'}
    >
      <div className="page-container section-spacing-sm">
        <article
          className={`rounded-ecaa-xl border p-8 shadow-ecaa sm:p-10 lg:p-12 ${accentStyles[section.accent] || accentStyles.cream}`}
        >
          <p className="text-eyebrow">Support ECAA</p>
          <h2 className="heading-section mt-3 text-3xl">{section.title}</h2>
          <p className="text-lead mt-4 max-w-2xl">{section.description}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.highlights.map((item) => (
              <li
                key={item}
                className="rounded-ecaa-lg border border-ecaa-border/60 bg-ecaa-white/80 px-5 py-4 text-base text-ecaa-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            {hasLink ? (
              <CTAButton
                href={section.ctaUrl}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {section.ctaLabel}
              </CTAButton>
            ) : (
              <p className="text-base font-medium text-ecaa-ink-subtle">
                {section.ctaUrl}
              </p>
            )}
            <CTAButton to="/contact" variant="secondary" size="lg">
              Contact ECAA
            </CTAButton>
          </div>
        </article>
      </div>
    </section>
  )
}
