import Container from "../ui/Container";
import HomeSectionHeader from "../ui/HomeSectionHeader";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import {
  getLinkProps,
  getVisibleItems,
  isSectionVisible,
  isUsableHomeText,
} from "../../utils/homepage";

function isInvolvementItem(item) {
  return (
    isUsableHomeText(item?.title) && isUsableHomeText(item?.description) && getLinkProps(item.cta)
  );
}

export default function WaysToGetInvolvedSection({ data }) {
  if (!isSectionVisible(data)) return null;

  const items = getVisibleItems(data.items, isInvolvementItem);

  return (
    <section className="home-section surface-white" aria-labelledby="get-involved-heading">
      <Container className="home-section-inner">
        <AnimateIn>
          <HomeSectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => {
              const cta = getLinkProps(item.cta);
              const isFeatured = item.featured === true;

              return (
                <AnimateIn key={item.id || item.title} delay={index * 50}>
                  <article
                    className={`flex h-full flex-col rounded-ecaa-xl border p-6 shadow-ecaa-sm sm:p-7 ${
                      isFeatured
                        ? "border-ecaa-green-700/30 bg-gradient-to-br from-ecaa-green-900 to-ecaa-green-950 text-ecaa-white"
                        : "border-ecaa-border/70 bg-ecaa-white"
                    }`}
                  >
                    <h3
                      className={`text-xl font-semibold tracking-tight ${
                        isFeatured ? "text-ecaa-white" : "text-ecaa-ink"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`mt-3 flex-1 text-base leading-relaxed ${
                        isFeatured ? "text-ecaa-cream/85" : "text-ecaa-ink-muted"
                      }`}
                    >
                      {item.description}
                    </p>
                    <CTAButton
                      {...cta}
                      variant={isFeatured ? "primary" : "secondary"}
                      size="md"
                      className={`mt-6 self-start ${isFeatured ? "" : ""}`}
                    >
                      {item.cta.label}
                    </CTAButton>
                  </article>
                </AnimateIn>
              );
            })}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
