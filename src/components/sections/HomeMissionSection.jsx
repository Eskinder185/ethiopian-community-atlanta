import Container from "../ui/Container";
import AnimateIn from "../ui/AnimateIn";
import CTAButton from "../ui/CTAButton";
import { getLinkProps, getPublicText, isSectionVisible } from "../../utils/homepage";

export default function HomeMissionSection({ data }) {
  if (!isSectionVisible(data)) return null;

  const primaryCta = getLinkProps(data.primaryCta);
  const secondaryCta = getLinkProps(data.secondaryCta);
  const badges = (data.badges ?? []).filter((badge) => getPublicText(badge?.label));

  return (
    <section className="home-section border-b border-ecaa-border/60 bg-ecaa-cream/35 py-10 sm:py-12" aria-labelledby="home-mission-heading">
      <Container className="home-section-inner">
        <AnimateIn>
          <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
            <div className="text-center lg:text-left">
              {data.eyebrow && <p className="text-eyebrow">{data.eyebrow}</p>}
              <h2 id="home-mission-heading" className="heading-section mt-2 text-2xl sm:text-3xl">
                {data.title}
              </h2>
              {getPublicText(data.description) && (
                <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                  {getPublicText(data.description)}
                </p>
              )}

              {(primaryCta || secondaryCta) && (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                  {primaryCta && (
                    <CTAButton {...primaryCta} variant="primary" size="md" className="min-h-[44px] w-full sm:w-auto">
                      {data.primaryCta?.label}
                    </CTAButton>
                  )}
                  {secondaryCta && (
                    <CTAButton {...secondaryCta} variant="secondary" size="md" className="min-h-[44px] w-full sm:w-auto">
                      {data.secondaryCta?.label}
                    </CTAButton>
                  )}
                </div>
              )}
            </div>

            {badges.length > 0 && (
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-0">
                {badges.map((badge) => (
                  <li
                    key={badge.id || badge.label}
                    className="rounded-ecaa-lg border border-ecaa-border/70 bg-ecaa-white px-4 py-3 text-center text-sm font-semibold text-ecaa-green-950 shadow-ecaa-sm sm:py-4 sm:text-base"
                  >
                    {badge.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
