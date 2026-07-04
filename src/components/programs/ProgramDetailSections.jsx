import { useId } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { getDefaultDetailSections } from "../../utils/programs";

function ProgramSectionCard({ section }) {
  return (
    <article className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6">
      <h3 className="text-lg font-semibold normal-case text-ecaa-green-950">{section.heading}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ecaa-ink-muted sm:text-base">{section.body}</p>
    </article>
  );
}

export default function ProgramDetailSections({ program, labels = {} }) {
  const baseId = useId();
  const isMobile = useIsMobile();
  const sections = getDefaultDetailSections(program);

  return (
    <section className="surface-cream py-10 sm:py-14 md:py-16">
      <div className="container-ecaa">
        <div className="mx-auto max-w-4xl">
          <h2 className="heading-section text-2xl normal-case sm:text-3xl">
            {labels.programDetails || "Program Details"}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ecaa-ink-muted">
            {labels.programDetailsIntro ||
              "Additional information about this program will be expanded as ECAA finalizes schedules, resources, and community offerings."}
          </p>

          {isMobile ? (
            <div className="mt-6 space-y-3">
              {sections.map((section, index) => {
                const panelId = `${baseId}-${index}`;
                return (
                  <details
                    key={section.heading}
                    open={index === 0}
                    className="group overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm"
                  >
                    <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base font-semibold text-ecaa-green-950">{section.heading}</h3>
                      <span
                        className="shrink-0 text-sm font-semibold text-ecaa-green-800 transition-transform duration-200 group-open:rotate-180"
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </summary>
                    <div
                      id={panelId}
                      className="border-t border-ecaa-border/60 px-4 py-4 text-sm leading-relaxed text-ecaa-ink-muted"
                    >
                      {section.body}
                    </div>
                  </details>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => (
                <ProgramSectionCard key={section.heading} section={section} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
