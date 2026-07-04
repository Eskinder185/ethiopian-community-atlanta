import PageHeroFromConfig from "../components/layout/PageHeroFromConfig";
import DocumentsQuickLinks from "../components/sections/DocumentsQuickLinks";
import DocumentsFeaturedSection from "../components/sections/DocumentsFeaturedSection";
import DocumentsCategorySection from "../components/sections/DocumentsCategorySection";
import DocumentsClosingCta from "../components/sections/DocumentsClosingCta";
import documentsData from "../content/documents.json";

export default function Documents() {
  const { quickLinks, featuredSection, categories, documents, emptyStates, closingCta } =
    documentsData;

  return (
    <>
      <PageHeroFromConfig page="documents" />

      <DocumentsQuickLinks section={quickLinks} />
      <DocumentsFeaturedSection section={featuredSection} documents={documents} />

      {categories.map((category, index) => (
        <DocumentsCategorySection
          key={category.id}
          category={category}
          documents={documents}
          emptyState={emptyStates?.[category.id]}
          compactEmpty={category.id === "meeting-notices"}
          muted={index % 2 === 1}
          defaultOpen={index === 0}
        />
      ))}

      <DocumentsClosingCta section={closingCta} />
    </>
  );
}
