import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import EventCard from "../cards/EventCard";
import EmptyState from "../ui/EmptyState";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import eventsData from "../../content/events.json";
import homeData from "../../content/homepage.json";
import { filterPublished } from "../../utils/data";

function parseEventDate(value) {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const parsed = Date.parse(trimmed);
  return Number.isNaN(parsed) ? null : parsed;
}

function sortBySoonestDate(events) {
  return [...events].sort((a, b) => {
    const dateA = parseEventDate(a.date);
    const dateB = parseEventDate(b.date);

    if (dateA === null && dateB === null) return 0;
    if (dateA === null) return 1;
    if (dateB === null) return -1;
    return dateA - dateB;
  });
}

function getFeaturedUpcomingEvents(events, limit = 3) {
  const upcoming = filterPublished(events).filter(
    (event) => !event.status || event.status === "upcoming"
  );

  const featured = sortBySoonestDate(upcoming.filter((event) => event.featured === true));
  const remainder = sortBySoonestDate(upcoming.filter((event) => event.featured !== true));

  return [...featured, ...remainder].slice(0, limit);
}

export default function EventsPreview({ limit = 3 }) {
  const events = getFeaturedUpcomingEvents(eventsData.upcoming, limit);
  const { eventsPreview } = homeData;

  return (
    <section className="surface-white">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={eventsPreview.eyebrow}
            title={eventsPreview.title}
            description={eventsPreview.description}
            action={{ label: "View Upcoming Events", to: "/events", variant: "secondary" }}
          />

          {events.length > 0 ? (
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {events.map((event, index) => (
                <AnimateIn key={event.id} delay={index * 60}>
                  <EventCard event={event} />
                </AnimateIn>
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-14"
              title="Upcoming events will be posted soon."
              description={eventsPreview.emptyDescription}
              action={
                <CTAButton to="/events" variant="secondary">
                  View Upcoming Events
                </CTAButton>
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  );
}
