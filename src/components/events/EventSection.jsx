import Container from "../ui/Container";
import EmptyState from "../ui/EmptyState";
import AnimateIn from "../ui/AnimateIn";

export default function EventSection({
  id,
  title,
  description,
  emptyState,
  muted = false,
  children,
  hasItems = false,
}) {
  return (
    <section id={id} className={muted ? "surface-muted" : "surface-white"}>
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="max-w-3xl">
            <h2 className="heading-section text-2xl sm:text-3xl">{title}</h2>
            {description && (
              <p className="mt-3 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                {description}
              </p>
            )}
          </div>

          {hasItems ? (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {children}
            </div>
          ) : (
            <EmptyState
              className="mt-8 max-w-2xl sm:mt-10"
              title={emptyState?.title ?? "Nothing to show yet"}
              description={
                emptyState?.description ?? "Check back soon or contact ECAA for current updates."
              }
              headingLevel="h3"
              compact
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  );
}
