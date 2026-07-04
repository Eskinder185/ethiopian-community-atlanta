import CTAButton from "../ui/CTAButton";

export default function ProgramDetailContactCta() {
  return (
    <section className="surface-cream border-t border-ecaa-border/60 py-14 sm:py-16">
      <div className="container-ecaa">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="heading-section text-2xl sm:text-3xl">Questions about this program?</h2>
          <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
            Contact ECAA to learn more about participation, volunteer opportunities, and upcoming
            announcements.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTAButton to="/contact" variant="primary">
              Contact ECAA
            </CTAButton>
            <CTAButton to="/programs" variant="secondary">
              View All Programs
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
