import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import DocumentCard from "../cards/DocumentCard";
import EmptyState from "../ui/EmptyState";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import MobileCollapsibleSection from "../ui/MobileCollapsibleSection";
import { useIsMobile } from "../../hooks/useIsMobile";
import { getDocumentsByCategory } from "../../utils/documents";
import { hasUsableText } from "../../utils/data";

export default function DocumentsCategorySection({
  category,
  documents = [],
  emptyState,
  compactEmpty = false,
  muted = false,
  defaultOpen = false,
}) {
  const isMobile = useIsMobile();
  const items = getDocumentsByCategory(documents, category.id);
  const spacingClass = compactEmpty ? "py-10 sm:py-14 lg:py-16" : "section-spacing-sm";

  const content = (
    <>
      {hasUsableText(category.notice) && (
        <div
          className="mt-4 max-w-3xl rounded-ecaa-lg border border-ecaa-gold-200/70 bg-ecaa-gold-50/50 px-5 py-4 md:mt-8"
          role="note"
        >
          <p className="text-base leading-relaxed text-ecaa-ink-muted">
            <span className="font-semibold text-ecaa-ink">Note:</span> {category.notice}
          </p>
        </div>
      )}

      {items.length > 0 ? (
        <div
          className={`grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 ${category.notice ? "mt-4 md:mt-8" : "mt-4 md:mt-10"}`}
        >
          {items.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      ) : (
        <EmptyState
          className={compactEmpty ? "mt-4 max-w-2xl md:mt-8" : "mt-4 md:mt-10"}
          title={emptyState?.title ?? "No documents published"}
          description={emptyState?.description ?? "Documents will be added here when available."}
          compact={compactEmpty}
          action={
            compactEmpty ? (
              <CTAButton to="/contact" variant="secondary" size="md" className="min-h-[44px]">
                Contact ECAA
              </CTAButton>
            ) : undefined
          }
        />
      )}
    </>
  );

  return (
    <section id={category.id} className={muted ? "surface-muted" : "surface-white"}>
      <Container className={spacingClass}>
        <AnimateIn>
          {isMobile ? (
            <MobileCollapsibleSection
              eyebrow={category.label}
              title={category.title}
              description={category.description}
              defaultOpen={defaultOpen}
              contentClassName="pt-0"
            >
              {content}
            </MobileCollapsibleSection>
          ) : (
            <>
              <SectionHeader
                eyebrow={category.label}
                title={category.title}
                description={category.description}
              />
              {content}
            </>
          )}
        </AnimateIn>
      </Container>
    </section>
  );
}
