import CTAButton from '../ui/CTAButton'
import { useLanguage } from '../../context/LanguageContext'

export default function ProgramDetailHero({ program }) {
  const { t } = useLanguage()
  return (
    <section className="surface-cream border-b border-ecaa-border/60">
      <div className="container-ecaa py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold normal-case tracking-wide text-ecaa-gold-600">{program.category}</p>
          <div className="mt-4 flex flex-wrap items-start gap-3">
            <h1 className="text-3xl font-semibold normal-case tracking-tight text-ecaa-green-950 sm:text-4xl lg:text-5xl">
              {program.title}
            </h1>
            <span className="mt-1 shrink-0 rounded-full border border-ecaa-gold-300/80 bg-ecaa-gold-50 px-3 py-1 text-[0.7rem] font-semibold normal-case tracking-wide text-ecaa-green-900">
              {program.statusLabel || 'Details Coming Soon'}
            </span>
          </div>
          {program.subtitle && (
            <p className="mt-3 text-lg font-medium normal-case text-ecaa-green-800 sm:text-xl">{program.subtitle}</p>
          )}
          <p className="mt-5 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
            {program.shortDescription || program.description}
          </p>

          {program.slug === 'legal-education' && (
            <div
              className="mt-6 rounded-ecaa-lg border border-ecaa-red-200/80 bg-ecaa-red-50/60 px-4 py-3 text-sm leading-relaxed text-ecaa-green-950"
              role="note"
            >
              {program.legalNotice ||
                'This page is for community education and awareness only. It does not provide legal advice.'}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton to="/contact" variant="primary">
              {t('common.contactEcaa')}
            </CTAButton>
            <CTAButton to="/programs" variant="secondary">
              {t('common.backToPrograms')}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}
