import Container from "../ui/Container";

export default function PageSection({ children, className = "", muted = false }) {
  return (
    <section className={`${muted ? "surface-muted" : ""} ${className}`.trim()}>
      <Container className="section-spacing-sm">{children}</Container>
    </section>
  );
}
