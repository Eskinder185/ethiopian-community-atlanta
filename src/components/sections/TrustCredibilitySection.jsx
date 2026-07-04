import Container from "../ui/Container";
import HomeSectionHeader from "../ui/HomeSectionHeader";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import contactData from "../../content/contact.json";
import {
  getLinkProps,
  getPublicText,
  isSectionVisible,
  isUsableHomeText,
} from "../../utils/homepage";
import { hasUsableText } from "../../utils/data";

function TrustPoint({ children }) {
  return (
    <li className="flex items-start gap-3 text-base leading-relaxed text-ecaa-ink-muted">
      <span
        className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-ecaa-gold-500"
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  );
}

export default function TrustCredibilitySection({ data }) {
  if (!isSectionVisible(data)) return null;

  const { general } = contactData;
  const addressLine = hasUsableText(general.address?.street)
    ? `${general.address.street}, ${general.address.city}, ${general.address.state} ${general.address.zip}`
    : null;
  const trustPoints = (data.trustPoints ?? []).filter((point) => isUsableHomeText(point));
  const actions = (data.actions ?? [])
    .map((action) => ({
      ...action,
      linkProps: getLinkProps(action),
    }))
    .filter((action) => action.linkProps && isUsableHomeText(action.label));

  return (
    <section className="home-section surface-cream" aria-labelledby="trust-heading">
      <Container>
        <AnimateIn>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div>
              <HomeSectionHeader
                eyebrow={data.eyebrow}
                title={data.title}
                description={data.description}
              />

              {trustPoints.length > 0 && (
                <ul className="mt-8 space-y-4">
                  {trustPoints.map((point) => (
                    <TrustPoint key={point}>{point}</TrustPoint>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white p-6 shadow-ecaa-sm sm:p-8">
              <h3 className="text-lg font-semibold text-ecaa-ink">Contact &amp; location</h3>
              <dl className="mt-5 space-y-4 text-base">
                {addressLine && (
                  <div>
                    <dt className="font-medium text-ecaa-ink">Address</dt>
                    <dd className="mt-1 text-ecaa-ink-muted">{addressLine}</dd>
                  </div>
                )}
                {hasUsableText(general.phone) && (
                  <div>
                    <dt className="font-medium text-ecaa-ink">Phone</dt>
                    <dd className="mt-1">
                      <a
                        href={`tel:${general.phone.replace(/\s/g, "")}`}
                        className="text-ecaa-green-900 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500"
                      >
                        {general.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {hasUsableText(general.email) && (
                  <div>
                    <dt className="font-medium text-ecaa-ink">Email</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${general.email}`}
                        className="text-ecaa-green-900 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500"
                      >
                        {general.email}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              {getPublicText(data.nonprofitNote) && (
                <p className="mt-6 border-t border-ecaa-border/60 pt-5 text-sm leading-relaxed text-ecaa-ink-subtle">
                  {getPublicText(data.nonprofitNote)}
                </p>
              )}

              {actions.length > 0 && (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {actions.map((action) => (
                    <CTAButton
                      key={action.label}
                      {...action.linkProps}
                      variant={action.variant || "secondary"}
                      size="md"
                    >
                      {action.label}
                    </CTAButton>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
