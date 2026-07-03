import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import { useLanguage } from '../../context/LanguageContext'
import { filterPublished, hasUsableUrl, isTodoValue } from '../../utils/data'

export default function ProgramsFormsSection({ section, labels = {} }) {
  const { t } = useLanguage()
  if (!section) return null

  const forms = filterPublished(section.forms ?? []).filter(
    (form) => form?.title && !isTodoValue(form.title),
  )

  return (
    <section id="program-interest-forms" className="surface-white py-16 sm:py-20">
      <Container>
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold normal-case tracking-tight text-ecaa-green-950">
              {section.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted">{section.description}</p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2">
            {forms.map((form) => {
              const isLiveForm = hasUsableUrl(form.url) && !isTodoValue(form.url)

              return (
                <article
                  key={form.id || form.title}
                  className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-cream/50 p-6 text-left shadow-ecaa-sm"
                >
                  <p className="text-xs font-semibold normal-case tracking-wide text-ecaa-gold-600">
                    {form.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold normal-case tracking-tight text-ecaa-ink">{form.title}</h3>
                  {form.description && (
                    <p className="mt-3 text-base leading-relaxed text-ecaa-ink-muted">{form.description}</p>
                  )}
                  {!isLiveForm && (
                    <p className="mt-4 text-sm font-medium text-ecaa-ink-subtle">
                      {labels.interestFormComingSoon || 'Interest form coming soon.'}
                    </p>
                  )}
                  <div className="mt-5">
                    {isLiveForm ? (
                      <CTAButton
                        href={form.url}
                        variant="secondary"
                        size="md"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {form.ctaLabel || 'Open form'}
                      </CTAButton>
                    ) : (
                      <CTAButton to={section.contactPath || '/contact'} variant="secondary" size="md">
                        {t('common.contactEcaa')}
                      </CTAButton>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          {forms.length === 0 && (
            <div className="mx-auto mt-8 max-w-3xl rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-cream/40 p-6 text-center">
              <p className="text-sm text-ecaa-ink-subtle">
                {labels.formsEmpty || 'Program interest forms will be shared as they become available.'}
              </p>
              <div className="mt-4">
                <CTAButton to={section.contactPath || '/contact'} variant="primary" size="md">
                  {t('common.contactEcaa')}
                </CTAButton>
              </div>
            </div>
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
