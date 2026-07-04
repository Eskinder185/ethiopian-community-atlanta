import Container from "../ui/Container";
import AnimateIn from "../ui/AnimateIn";

export default function ProgramsOverviewSection({ section }) {
  if (!section) return null;

  return (
    <section className="border-b border-ecaa-border/60 bg-ecaa-cream/40 py-12 sm:py-14">
      <Container>
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold normal-case tracking-tight text-ecaa-green-950 sm:text-3xl">
              {section.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
              {section.description}
            </p>
            {section.subtext && (
              <p className="mt-4 rounded-ecaa-lg border border-ecaa-gold-200/60 bg-ecaa-gold-50/50 px-4 py-3 text-sm leading-relaxed text-ecaa-ink-muted sm:text-base">
                {section.subtext}
              </p>
            )}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
