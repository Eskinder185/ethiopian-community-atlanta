import Container from "../ui/Container";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import homeData from "../../content/homepage.json";

export default function ClosingCtaSection() {
  const { closingCta } = homeData;

  return (
    <section className="surface-cream">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="ecaa-card-premium mx-auto max-w-3xl text-center">
            <h2 className="heading-section text-2xl sm:text-3xl">{closingCta.title}</h2>
            <CTAButton to={closingCta.ctaPath} variant="primary" size="lg" className="mt-10">
              {closingCta.ctaLabel}
            </CTAButton>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
