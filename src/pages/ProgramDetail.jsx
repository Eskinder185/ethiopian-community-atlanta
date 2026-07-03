import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useProgram } from '../hooks/useProgram'
import ProgramDetailHero from '../components/programs/ProgramDetailHero'
import ProgramDetailOverview from '../components/programs/ProgramDetailOverview'
import ProgramDetailSections from '../components/programs/ProgramDetailSections'
import ProgramDetailMedia from '../components/programs/ProgramDetailMedia'
import ProgramDetailResources from '../components/programs/ProgramDetailResources'
import ProgramDetailRegistration from '../components/programs/ProgramDetailRegistration'
import ProgramDetailContactCta from '../components/programs/ProgramDetailContactCta'
import CTAButton from '../components/ui/CTAButton'
import { useLanguage } from '../context/LanguageContext'
import { getProgramDetailLabels } from '../data/programsPageContent'
import { applyProgramLocale } from '../utils/programsLocale'

function ProgramNotFound({ labels }) {
  const { t } = useLanguage()

  return (
    <div className="surface-cream py-20 sm:py-28">
      <div className="container-ecaa">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-semibold normal-case tracking-wide text-ecaa-gold-600">
            {labels.programNotFoundEyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold normal-case tracking-tight text-ecaa-green-950">
            {labels.programNotFoundTitle}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted">
            {labels.programNotFoundDescription}
          </p>
          <div className="mt-8">
            <CTAButton to="/programs" variant="primary">
              {t('common.backToPrograms')}
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProgramDetail() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const labels = getProgramDetailLabels(language)
  const { program, loading, notFound } = useProgram(slug)
  const localizedProgram = useMemo(
    () => (program ? applyProgramLocale(program, language) : null),
    [program, language],
  )

  if (loading && !program) {
    return (
      <div className="surface-cream py-20 text-center text-ecaa-ink-muted" role="status" aria-live="polite">
        {labels.loading}
      </div>
    )
  }

  if (notFound || !localizedProgram) {
    return <ProgramNotFound labels={labels} />
  }

  return (
    <>
      <ProgramDetailHero program={localizedProgram} />
      <ProgramDetailOverview program={localizedProgram} labels={labels} />
      <ProgramDetailSections program={localizedProgram} labels={labels} />
      <ProgramDetailMedia program={localizedProgram} labels={labels} />
      <ProgramDetailRegistration program={localizedProgram} labels={labels} />
      <ProgramDetailResources program={localizedProgram} labels={labels} />
      <ProgramDetailContactCta />
    </>
  )
}
