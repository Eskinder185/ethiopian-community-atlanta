import { useEffect, useState } from "react";
import { hasUsableText } from "../../utils/data";
import CTAButton from "../ui/CTAButton";
import { resolveFormHref } from "../../utils/formLinks";

function RegistrationLinkCard({ link }) {
  const isInternal = link.url?.startsWith("/") && !link.url?.startsWith("//");
  const buttonLabel = link.buttonLabel || link.title || "Open Form";

  return (
    <article className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm">
      <h3 className="text-lg font-semibold normal-case text-ecaa-green-950">{link.title}</h3>
      {link.description && (
        <p className="mt-3 text-sm leading-relaxed text-ecaa-ink-muted sm:text-base">
          {link.description}
        </p>
      )}
      {hasUsableText(link.note) && (
        <p className="mt-4 rounded-lg border border-ecaa-gold-200/80 bg-ecaa-gold-50/60 px-4 py-3 text-sm leading-relaxed text-ecaa-green-950">
          {link.note}
        </p>
      )}
      <div className="mt-6">
        {isInternal ? (
          <CTAButton to={link.url} variant="accent">
            {buttonLabel}
          </CTAButton>
        ) : (
          <CTAButton
            href={link.url}
            variant="accent"
            target={link.external !== false ? "_blank" : undefined}
            rel={link.external !== false ? "noopener noreferrer" : undefined}
          >
            {buttonLabel}
          </CTAButton>
        )}
      </div>
    </article>
  );
}

function useResolvedRegistrationLinks(program) {
  const [links, setLinks] = useState(program?.registrationLinks ?? []);

  useEffect(() => {
    let active = true;

    async function resolveLinks() {
      const baseLinks = program?.registrationLinks ?? [];
      if (!program?.interestFormSlug) {
        if (active) setLinks(baseLinks);
        return;
      }

      const fallbackUrl = baseLinks[0]?.url || program.interestFormLink || "";
      const resolvedUrl = await resolveFormHref({
        internalSlug: program.interestFormSlug,
        fallbackUrl,
      });

      if (!active || !resolvedUrl) {
        if (active) setLinks(baseLinks);
        return;
      }

      const isInternal = resolvedUrl.startsWith("/forms/");
      const nextLinks = baseLinks.length
        ? baseLinks.map((link, index) =>
            index === 0
              ? {
                  ...link,
                  url: resolvedUrl,
                  external: !isInternal,
                }
              : link
          )
        : [
            {
              id: "internal-interest-form",
              title: program.interestFormLabel || "Program Interest Form",
              url: resolvedUrl,
              external: !isInternal,
              buttonLabel: program.interestFormLabel || "Open Form",
            },
          ];

      setLinks(nextLinks);
    }

    resolveLinks();
    return () => {
      active = false;
    };
  }, [program]);

  return links;
}

export default function ProgramDetailRegistration({ program, labels = {} }) {
  const links = useResolvedRegistrationLinks(program);
  const emptyMessage =
    program.registrationEmptyMessage ||
    labels.registrationEmpty ||
    "Registration or interest forms for this program will be shared when available.";

  return (
    <section className="surface-cream py-14 sm:py-16">
      <div className="container-ecaa">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-ecaa-xl border border-ecaa-border/80 bg-linear-to-br from-ecaa-green-50/80 to-ecaa-white p-8 shadow-ecaa-sm sm:p-10">
            <h2 className="heading-section text-2xl normal-case sm:text-3xl">
              {labels.registrationInterest || "Registration & Interest"}
            </h2>

            {links.length > 0 ? (
              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                {links.map((link) => (
                  <RegistrationLinkCard key={link.id} link={link} />
                ))}
              </div>
            ) : (
              <p className="mt-5 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                {emptyMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
