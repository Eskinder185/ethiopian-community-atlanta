import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import DocumentCard from '../cards/DocumentCard'
import EmptyState from '../ui/EmptyState'
import CTAButton from '../ui/CTAButton'
import AnimateIn from '../ui/AnimateIn'
import { getDocumentsByCategory } from '../../utils/documents'
import { hasUsableText } from '../../utils/data'

export default function DocumentsCategorySection({
  category,
  documents = [],
  emptyState,
  compactEmpty = false,
  muted = false,
}) {
  const items = getDocumentsByCategory(documents, category.id)
  const spacingClass = compactEmpty ? 'py-12 sm:py-14 lg:py-16' : 'section-spacing-sm'

  return (
    <section id={category.id} className={muted ? 'surface-muted' : 'surface-white'}>
      <Container className={spacingClass}>
        <AnimateIn>
          <SectionHeader
            eyebrow={category.label}
            title={category.title}
            description={category.description}
          />

          {hasUsableText(category.notice) && (
            <div
              className="mt-8 max-w-3xl rounded-ecaa-lg border border-ecaa-gold-200/70 bg-ecaa-gold-50/50 px-5 py-4"
              role="note"
            >
              <p className="text-base leading-relaxed text-ecaa-ink-muted">
                <span className="font-semibold text-ecaa-ink">Note:</span> {category.notice}
              </p>
            </div>
          )}

          {items.length > 0 ? (
            <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${category.notice ? 'mt-8' : 'mt-10'}`}>
              {items.map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </div>
          ) : (
            <EmptyState
              className={compactEmpty ? 'mt-8 max-w-2xl' : 'mt-10'}
              title={emptyState?.title ?? 'No documents published'}
              description={
                emptyState?.description ?? 'Documents will be added here when available.'
              }
              compact={compactEmpty}
              action={
                compactEmpty ? (
                  <CTAButton to="/contact" variant="secondary" size="md">
                    Contact ECAA
                  </CTAButton>
                ) : undefined
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
