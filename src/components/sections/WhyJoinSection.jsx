import Container from "../ui/Container";
import HomeSectionHeader from "../ui/HomeSectionHeader";
import HomeInfoCard from "../cards/HomeInfoCard";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import {
  getLinkProps,
  getVisibleItems,
  isSectionVisible,
  isUsableHomeText,
} from "../../utils/homepage";

function isBenefitItem(item) {
  return isUsableHomeText(item?.title) && isUsableHomeText(item?.description);
}

export default function WhyJoinSection({ data }) {
  if (!isSectionVisible(data)) return null;

  const items = getVisibleItems(data.items, isBenefitItem);
  const cta = getLinkProps(data.sectionCta);

  return (
    <section className="home-section surface-cream" aria-labelledby="why-join-heading">
      <Container>
        <AnimateIn>
          <HomeSectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
            className="home-section-header-row"
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {items.map((item, index) => (
              <AnimateIn key={item.id || item.title} delay={index * 40}>
                <HomeInfoCard title={item.title} description={item.description} icon={item.icon} />
              </AnimateIn>
            ))}
          </div>

          {cta && (
            <div className="mt-10 flex justify-center">
              <CTAButton {...cta} variant="primary" size="lg">
                {data.sectionCta.label}
              </CTAButton>
            </div>
          )}
        </AnimateIn>
      </Container>
    </section>
  );
}
