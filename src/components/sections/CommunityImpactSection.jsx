import Container from "../ui/Container";
import HomeSectionHeader from "../ui/HomeSectionHeader";
import HomeInfoCard from "../cards/HomeInfoCard";
import AnimateIn from "../ui/AnimateIn";
import { getVisibleItems, isSectionVisible, isUsableHomeText } from "../../utils/homepage";

function isImpactItem(item) {
  return isUsableHomeText(item?.title) && isUsableHomeText(item?.description);
}

export default function CommunityImpactSection({ data }) {
  if (!isSectionVisible(data)) return null;

  const items = getVisibleItems(data.items, isImpactItem);

  return (
    <section className="home-section surface-white" aria-labelledby="community-impact-heading">
      <Container className="home-section-inner">
        <AnimateIn>
          <HomeSectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {items.map((item, index) => (
              <AnimateIn key={item.id || item.title} delay={index * 40}>
                <HomeInfoCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  className="bg-ecaa-cream/30"
                />
              </AnimateIn>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
