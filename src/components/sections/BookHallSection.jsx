import Container from "../ui/Container";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import { buildMailtoUrl } from "../../utils/mailto";

export default function BookHallSection({ section, muted = false }) {
  const mailtoUrl = buildMailtoUrl({
    to: section.email,
    subject: section.subject,
    body: section.bodyTemplate,
  });

  return (
    <section id={section.id} className={muted ? "surface-muted" : "surface-white"}>
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="text-eyebrow">Event hall rental</p>
            <h2 className="heading-section mt-3 text-3xl">{section.title}</h2>
            <p className="text-body mt-4">{section.description}</p>
            {section.importantNote && (
              <p className="text-body mt-4 text-ecaa-ink-muted">
                <strong className="text-ecaa-ink">Important:</strong> {section.importantNote}
              </p>
            )}
          </div>

          <div className="mt-10 max-w-3xl">
            <h3 className="heading-section text-xl">Good for</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {section.goodFor.map((item) => (
                <li
                  key={item}
                  className="rounded-ecaa-lg border border-ecaa-border/60 bg-ecaa-cream/50 px-5 py-3 text-base text-ecaa-ink-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <CTAButton
              type="button"
              onClick={() => {
                window.location.href = mailtoUrl;
              }}
              variant="primary"
              size="lg"
            >
              Request Hall Availability
            </CTAButton>
            <CTAButton to="/contact" variant="secondary" size="lg">
              Contact ECAA
            </CTAButton>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
