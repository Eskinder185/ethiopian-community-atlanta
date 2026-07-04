import Container from "../ui/Container";
import HomeSectionHeader from "../ui/HomeSectionHeader";
import FeaturedProgramCard from "../cards/FeaturedProgramCard";
import AnimateIn from "../ui/AnimateIn";
import {
  getLinkProps,
  getVisibleItems,
  isFeaturedProgramItem,
  isSectionVisible,
} from "../../utils/homepage";

const FEATURED_PROGRAM_LIMIT = 4;

export default function FeaturedProgramsSection({ data }) {
  if (!isSectionVisible(data)) return null;

  const items = getVisibleItems(data.items, isFeaturedProgramItem, FEATURED_PROGRAM_LIMIT);
  const sectionCta = getLinkProps(data.sectionCta);
  const hasItems = items.length > 0;

  return (
    <section className="home-section surface-white" aria-labelledby="featured-programs-heading">
      <Container>
        <AnimateIn>
          <HomeSectionHeader
            id="featured-programs-heading"
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
            action={
              sectionCta
                ? { label: data.sectionCta.label, ...sectionCta, variant: "secondary" }
                : undefined
            }
            className="home-section-header-row"
          />

          {hasItems && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {items.map((item, index) => (
                <AnimateIn key={item.id} delay={index * 50}>
                  <FeaturedProgramCard item={item} />
                </AnimateIn>
              ))}
            </div>
          )}
        </AnimateIn>
      </Container>
    </section>
  );
}
