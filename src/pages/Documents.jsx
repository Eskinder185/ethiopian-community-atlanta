import PageHero from '../components/layout/PageHero'
import DocumentCategorySection from '../components/sections/DocumentCategorySection'
import CTAButton from '../components/ui/CTAButton'
import documentsData from '../data/documents.json'
import pages from '../data/pages.json'

export default function Documents() {
  const page = pages.documents

  return (
    <>
      <PageHero
        eyebrow="Documents"
        title={page.title}
        description={page.description}
        badge={{ label: 'Public resources', variant: 'neutral' }}
      >
        <CTAButton href="#bylaws" variant="primary" size="lg">
          Bylaws
        </CTAButton>
        <CTAButton to="/membership" variant="secondary" size="lg">
          Membership Forms
        </CTAButton>
      </PageHero>

      {documentsData.categories.map((category, index) => (
        <DocumentCategorySection
          key={category.id}
          category={category}
          muted={index % 2 === 1}
        />
      ))}
    </>
  )
}
