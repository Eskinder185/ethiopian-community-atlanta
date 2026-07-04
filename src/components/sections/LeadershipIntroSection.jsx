import Container from "../ui/Container";
import AnimateIn from "../ui/AnimateIn";

export default function LeadershipIntroSection({ intro }) {
  if (!intro) return null;

  return (
    <section className="surface-white">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <p className="text-lead mx-auto max-w-4xl text-center">{intro}</p>
        </AnimateIn>
      </Container>
    </section>
  );
}
