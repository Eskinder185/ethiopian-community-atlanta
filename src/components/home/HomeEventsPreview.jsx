import Container from "../ui/Container";
import HomeSectionHeader from "../ui/HomeSectionHeader";
import FeaturedEventCard from "../cards/FeaturedEventCard";
import CTAButton from "../ui/CTAButton";
import EmptyState from "../ui/EmptyState";
import AnimateIn from "../ui/AnimateIn";
import { useLanguage } from "../../context/LanguageContext";
import { getLinkProps, getHomepageFeaturedEvents, isSectionVisible } from "../../utils/homepage";
import { applyEventItemsLocale } from "../../utils/eventsLocale";

export default function HomeEventsPreview({ section, events = [] }) {
  const { language } = useLanguage();

  if (!isSectionVisible(section)) return null;

  const maxItems = section.maxItems ?? 3;
  const localizedEvents = applyEventItemsLocale(events, language);
  const items = getHomepageFeaturedEvents(localizedEvents, maxItems, language);
  const sectionCta = getLinkProps(section.sectionCta);
  const emptyState = section.emptyState ?? {};
  const emptyPrimaryCta = getLinkProps(emptyState.primaryCta);
  const hasItems = items.length > 0;

  return (
    <section className="ecaa-section surface-white" aria-labelledby="home-events-heading">
      <Container>
        <AnimateIn>
          <HomeSectionHeader
            id="home-events-heading"
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            action={
              hasItems && sectionCta
                ? { label: section.sectionCta.label, ...sectionCta, variant: "secondary" }
                : undefined
            }
            className="home-section-header-row"
          />

          {hasItems ? (
            <div className="mt-8 grid gap-4 md:mt-10 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <AnimateIn
                  key={item.id}
                  delay={index * 60}
                  className={index >= 2 ? "hidden md:block" : ""}
                >
                  <FeaturedEventCard item={item} />
                </AnimateIn>
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-8 rounded-3xl border border-emerald-100 bg-white/80 px-5 py-10 text-center shadow-ecaa-sm sm:mt-10 sm:px-8 md:py-14"
              headingLevel="h3"
              title={emptyState.title || "Upcoming events will be posted soon."}
              description={emptyState.description || ""}
              action={
                emptyPrimaryCta ? (
                  <CTAButton
                    {...emptyPrimaryCta}
                    variant="primary"
                    size="lg"
                    className="min-h-[44px]"
                  >
                    {emptyState.primaryCta?.label || "View Events"}
                  </CTAButton>
                ) : null
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  );
}
