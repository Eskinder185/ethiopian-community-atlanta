import Container from "../ui/Container";
import DocumentCard from "../cards/DocumentCard";
import AnimateIn from "../ui/AnimateIn";
import { getFeaturedDocuments } from "../../utils/documents";

export default function DocumentsFeaturedSection({ section, documents = [] }) {
  const featured = getFeaturedDocuments(documents);

  if (!section || featured.length === 0) return null;

  return (
    <section className="border-b border-ecaa-border/60 bg-ecaa-cream/40 py-12 sm:py-14">
      <Container>
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-ecaa-green-950 sm:text-3xl">
              {section.title}
            </h2>
            {section.description && (
              <p className="mt-3 text-base text-ecaa-ink-muted">{section.description}</p>
            )}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((document, index) => (
              <AnimateIn key={document.id} delay={index * 50}>
                <DocumentCard document={document} compact />
              </AnimateIn>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
