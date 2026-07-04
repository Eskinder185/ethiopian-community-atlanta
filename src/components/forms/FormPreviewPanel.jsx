import DynamicFormRenderer from "./DynamicFormRenderer";
import FormPageLayout from "./FormPageLayout";
import { getLocalizedFormText } from "../../utils/forms";

export default function FormPreviewPanel({ form, fields, language = "en" }) {
  const localized = getLocalizedFormText(form, language);

  return (
    <FormPageLayout form={form} localized={localized} language={language} preview>
      {({ accentButtonClass }) => (
        <DynamicFormRenderer
          form={form}
          fields={fields}
          language={language}
          submitLabel={localized.submitButtonLabel}
          onSubmit={() => Promise.resolve()}
          preview
          accentButtonClass={accentButtonClass}
        />
      )}
    </FormPageLayout>
  );
}
