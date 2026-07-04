import Container from "../ui/Container";
import HomeInfoCard from "../cards/HomeInfoCard";
import AnimateIn from "../ui/AnimateIn";
import { getVisibleItems, isSectionVisible, isUsableHomeText } from "../../utils/homepage";

function isPillarItem(item) {
  return isUsableHomeText(item?.title) && isUsableHomeText(item?.description);
}

export default function HomeCommunityPillarsSection({ data }) {
  if (!isSectionVisible(data)) return null;

  const items = getVisibleItems(data.items, isPillarItem);

  return (
    <section className="home-section surface-cream" aria-labelledby="community-pillars-heading">
      <Container className="home-section-inner">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            {data.eyebrow && <p className="text-eyebrow">{data.eyebrow}</p>}
            <h2
              id="community-pillars-heading"
              className="heading-section mt-2 text-3xl sm:text-4xl"
            >
              {data.title}
            </h2>
            {data.description && (
              <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                {data.description}
              </p>
            )}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {items.map((item, index) => (
              <AnimateIn key={item.id || item.title} delay={index * 50}>
                <HomeInfoCard title={item.title} description={item.description} icon={item.icon} />
              </AnimateIn>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
