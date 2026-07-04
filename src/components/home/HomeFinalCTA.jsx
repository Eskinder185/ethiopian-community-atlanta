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
    <section className="ecaa-section surface-deep" aria-labelledby="home-final-cta-heading">
      <Container>
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="home-final-cta-heading"
              className="text-[1.75rem] font-semibold tracking-tight text-ecaa-white sm:text-3xl lg:text-4xl"
            >
              {data.title}
            </h2>
            {data.description && (
              <p className="mx-auto mt-4 max-w-[680px] text-base leading-[1.65] text-ecaa-green-100/92 sm:text-lg">
                {data.description}
              </p>
            )}
            {buttons.length > 0 && (
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                {buttons.map((button, index) => (
                  <CTAButton
                    key={`${button.label}-${button.to || button.href}`}
                    {...(button.to ? { to: button.to } : { href: button.href })}
                    variant={index === 0 ? "accent" : "secondary"}
                    size="lg"
                    className={
                      index !== 0
                        ? "!border-ecaa-white/40 !bg-transparent !text-ecaa-white hover:!bg-ecaa-white/10"
                        : ""
                    }
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
