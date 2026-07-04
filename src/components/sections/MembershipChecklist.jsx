import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import navigation from "../../data/navigation.json";

const defaultSteps = navigation.sections.membership
  .filter((item) => item.id !== "registration-form")
  .map((item, index) => ({
    step: index + 1,
    title: item.label,
    description: "TODO: Add verified step description.",
  }));

export default function MembershipChecklist({ steps = defaultSteps }) {
  return (
    <section className="surface-white" id="become-a-member">
      <Container className="section-spacing-sm">
        <SectionHeader
          eyebrow="Membership"
          title="How to become a member"
          description="TODO: Add verified membership process overview."
        />

        <ol className="mt-10 space-y-4">
          {steps.map((step) => (
            <li key={step.step} className="ecaa-card flex gap-5">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ecaa-green-900 text-base font-bold text-ecaa-white"
                aria-hidden="true"
              >
                {step.step}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ecaa-ink">{step.title}</h3>
                <p className="text-body mt-2">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
