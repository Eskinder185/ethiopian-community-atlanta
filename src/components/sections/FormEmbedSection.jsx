import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import FormCard from "../cards/FormCard";
import formsData from "../../content/forms.json";

export default function FormEmbedSection({
  formId = "membership-registration",
  showEmbed = true,
  title,
  description,
}) {
  const form = formsData.forms.find((item) => item.id === formId);

  if (!form) return null;

  return (
    <section className="surface-muted" id="registration-form">
      <Container className="section-spacing-sm">
        {(title || description) && (
          <SectionHeader
            title={title || form.title}
            description={description || form.description}
            className="mb-10"
          />
        )}

        <FormCard form={form} showEmbed={showEmbed} />
      </Container>
    </section>
  );
}
