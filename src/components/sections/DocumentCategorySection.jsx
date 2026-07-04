import DocumentCard from "../cards/DocumentCard";
import EmptyState from "../ui/EmptyState";
import ContentSection from "./ContentSection";
import documentsData from "../../content/documents.json";
import { filterVerifiedContent } from "../../utils/data";

export default function DocumentCategorySection({ category, muted = false }) {
  const documents = filterVerifiedContent(
    documentsData.documents.filter((doc) => doc.categoryId === category.id),
    ["title"]
  );

  return (
    <ContentSection
      id={category.id}
      eyebrow="Documents"
      title={category.title}
      description={category.description}
      muted={muted}
    >
      {documents.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Documents coming soon"
          description={`TODO: Add verified ${category.title} documents to documents.json with published set to true.`}
        />
      )}
    </ContentSection>
  );
}
