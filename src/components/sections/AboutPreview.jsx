import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import homeData from "../../content/homepage.json";
import { isSectionVisible } from "../../utils/homepage";

export default function AboutPreview() {
  const { aboutPreview } = homeData;
  if (!isSectionVisible(aboutPreview)) return null;

  return (
    <section className="surface-muted" aria-labelledby="about-preview-heading">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeader
              eyebrow={aboutPreview.eyebrow}
              title={aboutPreview.title}
              description={aboutPreview.summary}
              align="center"
              className="mx-auto"
            />
            <CTAButton to={aboutPreview.ctaPath} variant="primary" size="lg" className="mt-10">
              {aboutPreview.ctaLabel}
            </CTAButton>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
