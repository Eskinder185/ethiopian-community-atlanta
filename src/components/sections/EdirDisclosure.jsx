import Container from "../ui/Container";
import AnimateIn from "../ui/AnimateIn";

export default function EdirDisclosure({ section }) {
  if (!section?.text) return null;

  return (
    <section className="surface-white py-12 sm:py-14" id="edir-disclosure">
      <Container>
        <AnimateIn>
          <aside
            className="mx-auto flex max-w-3xl gap-4 rounded-ecaa-xl border border-ecaa-gold-200/70 bg-gradient-to-br from-ecaa-gold-50/80 to-ecaa-cream/60 px-6 py-5 shadow-ecaa-sm sm:items-start sm:px-8 sm:py-6"
            role="note"
            aria-label="EDIR disclosure reminder"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ecaa-gold-200/80 text-lg font-bold text-ecaa-gold-700"
              aria-hidden="true"
            >
              !
            </span>
            <div>
              <p className="text-sm font-semibold normal-case tracking-wide text-ecaa-gold-700">
                {section.title}
              </p>
              <p className="mt-2 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                {section.text}
              </p>
            </div>
          </aside>
        </AnimateIn>
      </Container>
    </section>
  );
}
