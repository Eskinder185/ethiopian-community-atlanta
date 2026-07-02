import PageHero from '../components/layout/PageHero'
import DocumentsQuickLinks from '../components/sections/DocumentsQuickLinks'
import DocumentsFeaturedSection from '../components/sections/DocumentsFeaturedSection'
import DocumentsCategorySection from '../components/sections/DocumentsCategorySection'
import DocumentsClosingCta from '../components/sections/DocumentsClosingCta'
import CTAButton from '../components/ui/CTAButton'
import documentsData from '../content/documents.json'
import pages from '../data/pages.json'

export default function Documents() {
  const page = pages.documents
  const { quickLinks, featuredSection, categories, documents, emptyStates, closingCta } =
    documentsData

  return (
    <>
      <PageHero
        size="page"
        eyebrow="Public Resources"
        title={page.title}
        description={page.description}
        badge={{ label: 'Document library', variant: 'gold' }}
        patternOnly
        patternImageId="global-ethiopian-pattern-divider"
        overlayStrength="strong"
      >
        <CTAButton href="#bylaws" variant="primary" size="lg">
          Bylaws
        </CTAButton>
        <CTAButton to="/membership" variant="secondary" size="lg" className="btn-hero-outline">
          Membership Forms
        </CTAButton>
      </PageHero>

      <DocumentsQuickLinks section={quickLinks} />
      <DocumentsFeaturedSection section={featuredSection} documents={documents} />

      {categories.map((category, index) => (
        <DocumentsCategorySection
          key={category.id}
          category={category}
          documents={documents}
          emptyState={emptyStates?.[category.id]}
          compactEmpty={category.id === 'meeting-notices'}
          muted={index % 2 === 1}
        />
      ))}

      <DocumentsClosingCta section={closingCta} />
    </>
  )
}
