import Container from "../ui/Container";
import HomeSectionHeader from "../ui/HomeSectionHeader";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import { useLanguage } from "../../context/LanguageContext";
import {
  applyFeaturedProgramLocale,
  getFeaturedProgramButtonLabel,
  getHomepageFeaturedPrograms,
  getLinkProps,
  getPublicText,
  isSectionVisible,
} from "../../utils/homepage";

function ProgramPreviewCard({ program }) {
  const { language } = useLanguage();
  const localized = applyFeaturedProgramLocale(program, language);
  const cta = getLinkProps({ href: localized.href });

  return (
    <article className="flex h-full flex-col rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ecaa-green-800 to-ecaa-green-950 text-sm font-bold text-ecaa-white">
          {program.initials}
        </span>
        <div className="min-w-0">
          {getPublicText(localized.category) && (
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ecaa-gold-700">
              {localized.category}
            </p>
          )}
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-ecaa-ink">
            {localized.title}
          </h3>
          {getPublicText(localized.subtitle) && (
            <p className="mt-1 text-sm font-medium text-ecaa-green-800">{localized.subtitle}</p>
          )}
        </div>
      </div>

      {getPublicText(localized.shortDescription) && (
        <p className="mt-4 flex-1 text-sm leading-relaxed text-ecaa-ink-muted">
          {localized.shortDescription}
        </p>
      )}

      {cta && (
        <CTAButton {...cta} variant="secondary" size="sm" className="mt-5 self-start">
          {getFeaturedProgramButtonLabel(localized, language)}
        </CTAButton>
      )}
    </article>
  );
}

export default function HomeFeaturedPrograms({ section, programs = [] }) {
  if (!isSectionVisible(section)) return null;

  const maxItems = section.maxItems ?? 4;
  const items = getHomepageFeaturedPrograms(programs, maxItems);
  const sectionCta = getLinkProps(section.sectionCta);
  const hasItems = items.length > 0;

  return (
    <section className="ecaa-section surface-white" aria-labelledby="home-programs-heading">
      <Container>
        <AnimateIn>
          <HomeSectionHeader
            id="home-programs-heading"
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            action={
              sectionCta
                ? { label: section.sectionCta.label, ...sectionCta, variant: "secondary" }
                : undefined
            }
            className="home-section-header-row"
          />

          {hasItems && (
            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
              {items.map((item, index) => (
                <AnimateIn
                  key={item.id}
                  delay={index * 50}
                  className={index >= 2 ? "hidden sm:block" : ""}
                >
                  <ProgramPreviewCard program={item} />
                </AnimateIn>
              ))}
            </div>
          )}
        </AnimateIn>
      </Container>
    </section>
  );
}
