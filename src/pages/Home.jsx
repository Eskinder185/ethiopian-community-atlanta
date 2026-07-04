import HomeHero from "../components/home/HomeHero";
import HomeEventsPreview from "../components/home/HomeEventsPreview";
import HomeMediaPreview from "../components/home/HomeMediaPreview";
import HomeBookHall from "../components/home/HomeBookHall";
import HomeFeaturedPrograms from "../components/home/HomeFeaturedPrograms";
import HomeFinalCTA from "../components/home/HomeFinalCTA";
import ErrorBoundary from "../components/ErrorBoundary";
import { useHomepage } from "../hooks/useHomepageContent";
import { useHomepageEvents } from "../hooks/useHomepageEvents";
import { useHomepageMedia } from "../hooks/useHomepageMedia";
import { usePrograms } from "../hooks/usePrograms";

export default function Home() {
  const { homepage } = useHomepage();
  const { events } = useHomepageEvents();
  const { mediaItems } = useHomepageMedia();
  const { programs } = usePrograms();

  return (
    <>
      <HomeHero data={homepage.hero} />
      <ErrorBoundary compact>
        <HomeEventsPreview section={homepage.eventsCommunity} events={events} />
      </ErrorBoundary>
      <ErrorBoundary compact>
        <HomeMediaPreview section={homepage.communityMoments} mediaItems={mediaItems} />
      </ErrorBoundary>
      <div className="hidden md:block">
        <HomeBookHall data={homepage.bookHall} />
      </div>
      <ErrorBoundary compact>
        <HomeFeaturedPrograms section={homepage.featuredPrograms} programs={programs} />
      </ErrorBoundary>
      <HomeFinalCTA data={homepage.finalCta} />
    </>
  );
}
