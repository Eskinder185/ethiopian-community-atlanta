import EmptyState from "../ui/EmptyState";
import CTAButton from "../ui/CTAButton";

export default function ProgramDetailResources({ program, labels = {} }) {
  const links = program.resourceLinks ?? [];

  return (
    <section className="surface-white py-14 sm:py-16">
      <div className="container-ecaa">
        <div className="mx-auto max-w-4xl">
          <h2 className="heading-section text-2xl normal-case sm:text-3xl">
            {labels.linksResources || "Links & Resources"}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ecaa-ink-muted">
            {labels.linksResourcesIntro ||
              "Helpful links, forms, documents, and community resources can be added here by ECAA editors."}
          </p>

          {links.length > 0 ? (
            <ul className="mt-8 space-y-4">
              {links.map((link) => {
                const isInternal = link.url?.startsWith("/") && !link.url.startsWith("//");
                const buttonLabel =
                  link.buttonLabel || (isInternal ? "Open Resource" : "Open Link");

                return (
                  <li key={link.id}>
                    <article className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold normal-case text-ecaa-green-950">
                            {link.label}
                          </h3>
                          {link.description && (
                            <p className="mt-2 text-sm leading-relaxed text-ecaa-ink-muted sm:text-base">
                              {link.description}
                            </p>
                          )}
                        </div>
                        {isInternal ? (
                          <CTAButton
                            to={link.url}
                            variant="secondary"
                            size="sm"
                            className="shrink-0"
                          >
                            {buttonLabel}
                          </CTAButton>
                        ) : (
                          <CTAButton
                            href={link.url}
                            variant="secondary"
                            size="sm"
                            className="shrink-0"
                            target={link.external !== false ? "_blank" : undefined}
                            rel={link.external !== false ? "noopener noreferrer" : undefined}
                          >
                            {buttonLabel}
                          </CTAButton>
                        )}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-8">
              <EmptyState
                compact
                title={labels.resourcesComingSoon || "Resources coming soon"}
                description={
                  labels.resourcesEmpty || "Helpful links and resources will be added soon."
                }
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
