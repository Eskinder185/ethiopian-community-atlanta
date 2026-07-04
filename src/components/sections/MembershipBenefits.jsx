import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import AnimateIn from "../ui/AnimateIn";

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-ecaa-gold-600"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 0 1.42l-7.25 7.25a1 1 0 0 1-1.42 0l-3.25-3.25a1 1 0 1 1 1.42-1.42l2.54 2.54 6.54-6.54a1 1 0 0 1 1.42 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function MembershipBenefits({ section }) {
  if (!section?.items?.length) return null;

  return (
    <section className="surface-white" id="membership-benefits">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={section.label}
            title={section.title}
            description={section.description}
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {section.items.map((item, index) => (
              <AnimateIn key={item} delay={index * 40} as="li">
                <div className="flex items-start gap-3 rounded-ecaa-lg border border-ecaa-border/60 bg-ecaa-cream/40 px-5 py-4">
                  <CheckIcon />
                  <span className="text-base leading-relaxed text-ecaa-ink">{item}</span>
                </div>
              </AnimateIn>
            ))}
          </ul>
        </AnimateIn>
      </Container>
    </section>
  );
}
