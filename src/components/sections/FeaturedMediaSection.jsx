import Container from "../ui/Container";
import HomeSectionHeader from "../ui/HomeSectionHeader";
import FeaturedMediaCollage from "../ui/FeaturedMediaCollage";
import CTAButton from "../ui/CTAButton";
import EmptyState from "../ui/EmptyState";
import AnimateIn from "../ui/AnimateIn";
import {
  getLinkProps,
  getVisibleItems,
  isFeaturedMediaItem,
  isSectionVisible,
} from "../../utils/homepage";

export default function FeaturedMediaSection({ data }) {
  if (!isSectionVisible(data)) return null;

  const items = getVisibleItems(data.items, isFeaturedMediaItem, 6);
  const sectionCta = getLinkProps(data.sectionCta);
  const emptyState = data.emptyState ?? {};
  const hasItems = items.length > 0;
  const sectionHref = sectionCta?.to || sectionCta?.href || "/media";
  const emptyPrimaryCta = getLinkProps(emptyState.primaryCta);

  return (
    <section className="home-section surface-muted" aria-labelledby="featured-media-heading">
      <Container className="home-section-inner">
        <AnimateIn>
          <HomeSectionHeader
            id="featured-media-heading"
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
            action={
              hasItems && sectionCta
                ? { label: data.sectionCta.label, ...sectionCta, variant: "secondary" }
                : undefined
            }
            className="home-section-header-row"
          />

          {hasItems ? (
            <FeaturedMediaCollage
              items={items}
              sectionHref={sectionHref}
              className="home-section-grid mt-10"
            />
          ) : (
            <EmptyState
              className="mt-10 rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white/80 p-8 text-center shadow-ecaa-sm sm:p-10"
              headingLevel="h3"
              title={emptyState.title || "Community photos and videos coming soon"}
              description={
                emptyState.description ||
                "Photos and videos from ECAA community moments will be added here."
              }
              action={
                emptyPrimaryCta ? (
                  <CTAButton {...emptyPrimaryCta} variant="primary" size="lg">
                    {emptyState.primaryCta.label}
                  </CTAButton>
                ) : sectionCta ? (
                  <CTAButton {...sectionCta} variant="primary" size="lg">
                    {data.sectionCta.label}
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
