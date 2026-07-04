import Container from "../ui/Container";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import { getLinkProps, isSectionVisible } from "../../utils/homepage";

export default function HomeFinalCTA({ data }) {
  if (!isSectionVisible(data)) return null;

  const buttons = (data.buttons ?? [])
    .map((button) => {
      const link = getLinkProps(button);
      if (!link || !button?.label) return null;
      return { ...link, label: button.label };
    })
    .filter(Boolean);

  return (
    <section className="home-section surface-muted" aria-labelledby="home-final-cta-heading">
      <Container className="home-section-inner">
        <AnimateIn>
          <div className="ecaa-card-premium mx-auto max-w-3xl text-center">
            <h2 id="home-final-cta-heading" className="heading-section text-2xl sm:text-3xl">
              {data.title}
            </h2>
            {data.description && (
              <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                {data.description}
              </p>
            )}
            {buttons.length > 0 && (
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                {buttons.map((button, index) => (
                  <CTAButton
                    key={`${button.label}-${button.to || button.href}`}
                    {...(button.to ? { to: button.to } : { href: button.href })}
                    variant={index === 0 ? "primary" : "secondary"}
                    size="lg"
                  >
                    {button.label}
                  </CTAButton>
                ))}
              </div>
            )}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
