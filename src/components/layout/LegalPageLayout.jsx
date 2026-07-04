import { Link } from "react-router-dom";
import PageHeroFromConfig from "./PageHeroFromConfig";
import Container from "../ui/Container";
import AnimateIn from "../ui/AnimateIn";
import CTAButton from "../ui/CTAButton";

export function LegalSection({ title, children }) {
  return (
    <section className="scroll-mt-28">
      <h2 className="text-xl font-semibold tracking-tight text-ecaa-ink sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
        {children}
      </div>
    </section>
  );
}

export function LegalSubsection({ label, children }) {
  return (
    <div>
      <p className="font-medium text-ecaa-ink">{label}</p>
      <p className="mt-2">{children}</p>
    </div>
  );
}

export default function LegalPageLayout({
  title,
  subtitle,
  effectiveDate,
  breadcrumbLabel,
  heroPage,
  children,
}) {
  return (
    <>
      {heroPage ? <PageHeroFromConfig page={heroPage} /> : null}

      <section className="section-spacing-sm bg-ecaa-cream">
        <Container>
          <AnimateIn>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ecaa-ink-muted">
                <li>
                  <Link
                    to="/"
                    className="font-medium text-ecaa-green-800 transition-colors hover:text-ecaa-green-950 hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ecaa-ink-faint">
                  /
                </li>
                <li className="font-medium text-ecaa-ink" aria-current="page">
                  {breadcrumbLabel}
                </li>
              </ol>
            </nav>

            <article className="surface-panel overflow-hidden">
              <div className="border-b border-ecaa-border/80 bg-ecaa-cream-dark/40 px-6 py-5 sm:px-8 sm:py-6">
                {effectiveDate && (
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ecaa-gold-700">
                    Effective Date: {effectiveDate}
                  </p>
                )}
                <p
                  className={`text-base leading-relaxed text-ecaa-ink-muted sm:text-lg ${effectiveDate ? "mt-3" : ""}`}
                >
                  {subtitle}
                </p>
              </div>

              <div className="space-y-10 px-6 py-8 sm:space-y-12 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                {children}
              </div>
            </article>

            <div className="mt-10 flex justify-center sm:justify-start">
              <CTAButton to="/" variant="secondary" size="lg">
                Back to Home
              </CTAButton>
            </div>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}
