import Container from "../ui/Container";
import HomeSectionHeader from "../ui/HomeSectionHeader";
import FeaturedEventCard from "../cards/FeaturedEventCard";
import EventCard from "../cards/EventCard";
import CTAButton from "../ui/CTAButton";
import EmptyState from "../ui/EmptyState";
import AnimateIn from "../ui/AnimateIn";
import eventsData from "../../content/events.json";
import { getVerifiedUpcomingEvents } from "../../utils/events";
import {
  getLinkProps,
  getVisibleItems,
  isFeaturedEventItem,
  isSectionVisible,
} from "../../utils/homepage";

function mapLiveEventToFeatured(event) {
  return {
    id: event.id,
    title: event.title,
    category: event.category || "Event",
    date: event.date,
    excerpt: event.summary || event.description,
    image: event.image?.src || "",
    imageAlt: event.image?.alt || event.title,
    href: event.registrationUrl || event.link || "/events",
    ctaLabel: event.ctaLabel || (event.registrationUrl ? "Register" : "Learn more"),
  };
}

export default function FeaturedEventsSection({ data }) {
  if (!isSectionVisible(data)) return null;

  const homepageItems = getVisibleItems(data.items, isFeaturedEventItem, 3);
  const liveEvents = getVerifiedUpcomingEvents(eventsData.upcoming).slice(0, 3);
  const useHomepageItems = homepageItems.length > 0;
  const featuredItems = useHomepageItems ? homepageItems : liveEvents.map(mapLiveEventToFeatured);
  const sectionCta = getLinkProps(data.sectionCta);
  const emptyState = data.emptyState ?? {};
  const hasItems = featuredItems.length > 0;
  const emptyPrimaryCta = getLinkProps(emptyState.primaryCta);

  return (
    <section className="home-section surface-white" aria-labelledby="featured-events-heading">
      <Container>
        <AnimateIn>
          <HomeSectionHeader
            id="featured-events-heading"
            eyebrow={data.eyebrow}
            title={hasItems ? data.title : emptyState.title || data.title}
            description={hasItems ? data.description : emptyState.description || data.description}
            action={
              hasItems && sectionCta
                ? { label: data.sectionCta.label, ...sectionCta, variant: "secondary" }
                : undefined
            }
            className="home-section-header-row"
          />

          {hasItems ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {useHomepageItems
                ? featuredItems.map((item, index) => (
                    <AnimateIn key={item.id} delay={index * 60}>
                      <FeaturedEventCard item={item} />
                    </AnimateIn>
                  ))
                : liveEvents.map((event, index) => (
                    <AnimateIn key={event.id} delay={index * 60}>
                      <EventCard event={event} />
                    </AnimateIn>
                  ))}
            </div>
          ) : (
            <EmptyState
              className="mt-10 rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-cream/40 p-8 text-center shadow-ecaa-sm sm:p-10"
              headingLevel="h3"
              title={emptyState.title || "Upcoming events will be shared soon"}
              description={
                emptyState.description ||
                "ECAA events and community updates will appear here as they become available."
              }
              action={
                emptyPrimaryCta ? (
                  <CTAButton {...emptyPrimaryCta} variant="primary" size="lg">
                    {emptyState.primaryCta.label}
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
