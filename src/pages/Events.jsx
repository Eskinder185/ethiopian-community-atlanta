import { useMemo } from "react";
import PageHeroWithStats from "../components/layout/PageHeroWithStats";
import EventsQuickActionsBar from "../components/sections/EventsQuickActionsBar";
import EventsClosingCta from "../components/sections/EventsClosingCta";
import EventHallRentalSection from "../components/sections/EventHallRentalSection";
import EventSection from "../components/events/EventSection";
import EventCard from "../components/events/EventCard";
import ErrorBoundary from "../components/ErrorBoundary";
import { useEventsPage } from "../hooks/useEventsPage";
import { useHallBookings } from "../hooks/useHallBookings";
import { getEventsHighlightCards } from "../data/eventsPageContent";
import { getHeroBackground, getPageHero } from "../utils/pageHeroes";

export default function Events() {
  const { content, groups } = useEventsPage();
  const { bookings } = useHallBookings();
  const pageHeroConfig = useMemo(() => getPageHero("events"), []);
  const background = useMemo(() => getHeroBackground(pageHeroConfig, "events"), [pageHeroConfig]);
  const highlightCards = useMemo(() => getEventsHighlightCards(content), [content]);

  const { upcoming, announcements, communityNews, past } = groups;

  return (
    <>
      <PageHeroWithStats
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        backgroundImage={background}
        backgroundAlt={pageHeroConfig?.backgroundAlt}
        buttons={content.hero.buttons}
        stats={highlightCards}
        variant={pageHeroConfig?.variant || "page"}
        overlayStrength={pageHeroConfig?.overlayStrength || "default"}
      />

      <EventsQuickActionsBar actions={content.quickActions} />

      <ErrorBoundary compact>
        <EventSection
          id={content.sections.upcoming.id}
          title={content.sections.upcoming.title}
          emptyState={content.emptyStates.upcoming}
          hasItems={upcoming.length > 0}
        >
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} badgeLabels={content.badgeLabels} />
          ))}
        </EventSection>

        <EventSection
          id={content.sections.announcements.id}
          title={content.sections.announcements.title}
          emptyState={content.emptyStates.announcements}
          muted
          hasItems={announcements.length > 0}
        >
          {announcements.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="announcement"
              badgeLabels={content.badgeLabels}
              buttonLabels={content.buttonLabels}
            />
          ))}
        </EventSection>

        <EventSection
          id={content.sections.communityNews.id}
          title={content.sections.communityNews.title}
          emptyState={content.emptyStates.communityNews}
          hasItems={communityNews.length > 0}
        >
          {communityNews.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="news"
              badgeLabels={content.badgeLabels}
            />
          ))}
        </EventSection>

        <EventHallRentalSection section={content.bookHall} bookings={bookings} />
      </ErrorBoundary>

      <ErrorBoundary compact>
        <EventSection
          id={content.sections.past.id}
          title={content.sections.past.title}
          emptyState={content.emptyStates.past}
          muted
          hasItems={past.length > 0}
        >
          {past.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="past"
              badgeLabels={content.badgeLabels}
            />
          ))}
        </EventSection>
      </ErrorBoundary>

      <EventsClosingCta section={content.closingCta} />
    </>
  );
}
