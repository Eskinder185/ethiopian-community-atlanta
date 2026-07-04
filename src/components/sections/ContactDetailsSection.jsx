import { useState } from "react";
import Container from "../ui/Container";
import CTAButton from "../ui/CTAButton";
import ContactCard from "../cards/ContactCard";
import { siteAssets } from "../../config/assets";
import { resolvePublicAssetPath } from "../../utils/images";
import { filterPublished, hasUsableText } from "../../utils/data";

function ContactDetail({ label, value, href, multiline = false }) {
  if (!hasUsableText(value)) return null;

  return (
    <div className="ecaa-card">
      <p className="text-sm font-semibold normal-case tracking-wide text-ecaa-gold-600">{label}</p>
      {href ? (
        <a
          href={href}
          className="mt-3 block text-lg font-medium leading-relaxed text-ecaa-green-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500"
        >
          {value}
        </a>
      ) : (
        <p
          className={`mt-3 text-lg leading-relaxed text-ecaa-ink ${multiline ? "whitespace-pre-line" : ""}`}
        >
          {value}
        </p>
      )}
    </div>
  );
}

function VisitEcaaImage({ alt }) {
  const [failed, setFailed] = useState(false);
  const src = resolvePublicAssetPath(siteAssets.homeHero);

  if (failed || !src) {
    return (
      <div
        className="flex min-h-[220px] w-full items-center justify-center rounded-ecaa-xl bg-gradient-to-br from-ecaa-green-950 via-ecaa-green-900 to-ecaa-cream-dark sm:min-h-[280px] lg:min-h-full"
        role="img"
        aria-label={alt || siteAssets.homeHeroAlt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt || siteAssets.homeHeroAlt}
      className="h-full min-h-[220px] w-full rounded-ecaa-xl object-cover object-center shadow-ecaa-sm sm:min-h-[280px] lg:min-h-[280px] lg:max-h-96"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export default function ContactDetailsSection({ content }) {
  if (!content) return null;

  const { contactInfo, visit, departmentContacts, finalCta } = content;
  const publishedDepartments = filterPublished(departmentContacts ?? []);
  const phoneHref = (value) => `tel:${value.replace(/\D/g, "")}`;

  return (
    <>
      <section className="surface-white">
        <Container className="section-spacing-sm">
          <h2 className="heading-section normal-case">{contactInfo.title}</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="grid gap-6 sm:grid-cols-2">
              <ContactDetail
                label={contactInfo.email.label}
                value={contactInfo.email.value}
                href={`mailto:${contactInfo.email.value}`}
              />
              <ContactDetail
                label={contactInfo.phone.label}
                value={contactInfo.phone.value}
                href={phoneHref(contactInfo.phone.value)}
              />
              <ContactDetail
                label={contactInfo.secondaryPhone.label}
                value={contactInfo.secondaryPhone.value}
                href={phoneHref(contactInfo.secondaryPhone.value)}
              />
              <ContactDetail
                label={contactInfo.hours.label}
                value={contactInfo.hours.value}
                multiline
              />
            </div>

            <div className="grid gap-6">
              <div className="ecaa-card">
                <p className="text-sm font-semibold normal-case tracking-wide text-ecaa-gold-600">
                  {contactInfo.address.label}
                </p>
                <address className="mt-3 not-italic text-lg leading-relaxed text-ecaa-ink">
                  {contactInfo.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              {hasUsableText(contactInfo.mailingAddress?.value) && (
                <div className="ecaa-card">
                  <p className="text-sm font-semibold normal-case tracking-wide text-ecaa-gold-600">
                    {contactInfo.mailingAddress.label}
                  </p>
                  <address className="mt-3 not-italic text-lg leading-relaxed text-ecaa-ink">
                    {contactInfo.mailingAddress.value}
                  </address>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="surface-muted" id={visit.id || "visit-ecaa"}>
        <Container className="section-spacing-sm">
          <div className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm lg:grid lg:grid-cols-2 lg:items-stretch">
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <h2 className="heading-section normal-case">{visit.title}</h2>
              <p className="text-body mt-3 max-w-xl leading-relaxed">{visit.text}</p>
            </div>

            <div className="overflow-hidden border-t border-ecaa-border/60 p-4 sm:p-6 lg:border-l lg:border-t-0">
              <VisitEcaaImage alt={visit.imageAlt} />
            </div>
          </div>
        </Container>
      </section>

      {publishedDepartments.length > 0 && (
        <section className="surface-white">
          <Container className="section-spacing-sm">
            <h2 className="heading-section normal-case">
              {content.departmentsTitle || "Department contacts"}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {publishedDepartments.map((dept) => (
                <ContactCard key={dept.id} contact={dept} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {finalCta && (
        <section className="surface-muted">
          <Container className="section-spacing-sm">
            <div className="ecaa-card mx-auto max-w-3xl text-center">
              <h2 className="heading-section text-2xl normal-case">{finalCta.title}</h2>
              <p className="text-body mx-auto mt-4 max-w-xl leading-relaxed">
                {finalCta.description}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {finalCta.buttons?.map((button, index) => (
                  <CTAButton
                    key={button.href}
                    to={button.href}
                    variant={index === 0 ? "primary" : "secondary"}
                    size="lg"
                  >
                    {button.label}
                  </CTAButton>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
