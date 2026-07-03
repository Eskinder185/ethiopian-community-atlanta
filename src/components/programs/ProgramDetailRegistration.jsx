import { hasUsableText } from '../../utils/data'
import CTAButton from '../ui/CTAButton'

function RegistrationLinkCard({ link }) {
  const isInternal = link.url?.startsWith('/') && !link.url?.startsWith('//')
  const buttonLabel = link.buttonLabel || link.title || 'Open Form'

  return (
    <article className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm">
      <h3 className="text-lg font-semibold normal-case text-ecaa-green-950">{link.title}</h3>
      {link.description && (
        <p className="mt-3 text-sm leading-relaxed text-ecaa-ink-muted sm:text-base">{link.description}</p>
      )}
      {hasUsableText(link.note) && (
        <p className="mt-4 rounded-lg border border-ecaa-gold-200/80 bg-ecaa-gold-50/60 px-4 py-3 text-sm leading-relaxed text-ecaa-green-950">
          {link.note}
        </p>
      )}
      <div className="mt-6">
        {isInternal ? (
          <CTAButton to={link.url} variant="accent">
            {buttonLabel}
          </CTAButton>
        ) : (
          <CTAButton
            href={link.url}
            variant="accent"
            target={link.external !== false ? '_blank' : undefined}
            rel={link.external !== false ? 'noopener noreferrer' : undefined}
          >
            {buttonLabel}
          </CTAButton>
        )}
      </div>
    </article>
  )
}

export default function ProgramDetailRegistration({ program, labels = {} }) {
  const links = program.registrationLinks ?? []
  const emptyMessage =
    program.registrationEmptyMessage ||
    labels.registrationEmpty ||
    'Registration or interest forms for this program will be shared when available.'

  return (
    <section className="surface-cream py-14 sm:py-16">
      <div className="container-ecaa">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-ecaa-xl border border-ecaa-border/80 bg-linear-to-br from-ecaa-green-50/80 to-ecaa-white p-8 shadow-ecaa-sm sm:p-10">
            <h2 className="heading-section text-2xl normal-case sm:text-3xl">
              {labels.registrationInterest || 'Registration & Interest'}
            </h2>

            {links.length > 0 ? (
              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                {links.map((link) => (
                  <RegistrationLinkCard key={link.id} link={link} />
                ))}
              </div>
            ) : (
              <p className="mt-5 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">{emptyMessage}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
