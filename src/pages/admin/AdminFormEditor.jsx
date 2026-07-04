import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import EditorContentTabs from "../../components/admin/EditorContentTabs";
import FormInput from "../../components/admin/FormInput";
import FormSelect from "../../components/admin/FormSelect";
import FormTextarea from "../../components/admin/FormTextarea";
import SaveButton from "../../components/admin/SaveButton";
import StatusBadge from "../../components/admin/StatusBadge";
import { FORM_TEMPLATES, createBlankForm, createFormFromTemplate, slugifyFieldKey } from "../../data/formTemplates";
import { useAdminLanguage } from "../../context/AdminLanguageContext";
import {
  FIELD_TYPES,
  FORM_STATUS,
  FORM_TYPES,
  fetchFormWithFieldsForAdmin,
  getFormPublicPath,
  saveFormWithFields,
  slugifyFormTitle,
} from "../../utils/forms";

function ToggleField({ id, label, checked, onChange, hint }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-lg border border-ecaa-border/80 bg-ecaa-cream/40 px-4 py-3"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4"
      />
      <span>
        <span className="block text-sm font-medium text-ecaa-ink">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-ecaa-ink-subtle">{hint}</span>}
      </span>
    </label>
  );
}

function FieldEditor({ field, editorLang, onChange, onDelete, onMoveUp, onMoveDown, isFirst, isLast, adminT }) {
  const isAm = editorLang === "am";

  function update(patch) {
    onChange({ ...field, ...patch });
  }

  function updateOption(index, patch) {
    const options = [...(field.options || [])];
    options[index] = { ...options[index], ...patch };
    update({ options });
  }

  function addOption() {
    const options = [...(field.options || [])];
    const value = `option_${options.length + 1}`;
    options.push({ value, label: "New option", labelAm: "" });
    update({ options });
  }

  function removeOption(index) {
    const options = (field.options || []).filter((_, i) => i !== index);
    update({ options });
  }

  const hasOptions = ["select", "radio", "checkbox"].includes(field.fieldType);

  return (
    <div className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-4 shadow-ecaa-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-ecaa-green-950">
            {isAm && field.labelAm ? field.labelAm : field.label || adminT("formsBuilder.newField")}
          </span>
          <StatusBadge label={field.fieldType} variant="draft" />
          {field.required && <StatusBadge label={adminT("formsBuilder.required")} variant="live" />}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={isFirst}
            onClick={onMoveUp}
            className="min-h-[36px] rounded border border-ecaa-border px-3 text-xs font-medium disabled:opacity-40"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={onMoveDown}
            className="min-h-[36px] rounded border border-ecaa-border px-3 text-xs font-medium disabled:opacity-40"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="min-h-[36px] rounded border border-ecaa-red-200 px-3 text-xs font-medium text-ecaa-red-700"
          >
            {adminT("common.delete")}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label={adminT("formsBuilder.fieldLabel")}
          value={isAm ? field.labelAm || "" : field.label}
          onChange={(e) =>
            isAm
              ? update({ labelAm: e.target.value })
              : update({ label: e.target.value, fieldKey: field.fieldKey || slugifyFieldKey(e.target.value) })
          }
        />
        <FormSelect
          label={adminT("formsBuilder.fieldType")}
          value={field.fieldType}
          onChange={(e) => update({ fieldType: e.target.value })}
          options={FIELD_TYPES.map((type) => ({ value: type, label: type }))}
        />
        <FormInput
          label={adminT("formsBuilder.fieldKey")}
          value={field.fieldKey}
          onChange={(e) => update({ fieldKey: e.target.value })}
          hint={adminT("formsBuilder.fieldKeyHint")}
        />
        <FormInput
          label={adminT("formsBuilder.placeholder")}
          value={isAm ? field.placeholderAm || "" : field.placeholder || ""}
          onChange={(e) =>
            isAm ? update({ placeholderAm: e.target.value }) : update({ placeholder: e.target.value })
          }
        />
        <div className="sm:col-span-2">
          <FormTextarea
            label={adminT("formsBuilder.helpText")}
            value={isAm ? field.helpTextAm || "" : field.helpText || ""}
            onChange={(e) =>
              isAm ? update({ helpTextAm: e.target.value }) : update({ helpText: e.target.value })
            }
            rows={2}
          />
        </div>
        <ToggleField
          id={`required-${field.id || field.fieldKey}`}
          label={adminT("formsBuilder.required")}
          checked={field.required}
          onChange={(checked) => update({ required: checked })}
        />
        <ToggleField
          id={`visible-${field.id || field.fieldKey}`}
          label={adminT("common.visible")}
          checked={field.visible !== false}
          onChange={(checked) => update({ visible: checked })}
        />
      </div>

      {hasOptions && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-ecaa-green-950">{adminT("formsBuilder.options")}</h4>
            <button
              type="button"
              onClick={addOption}
              className="text-sm font-medium text-ecaa-green-800 hover:underline"
            >
              {adminT("formsBuilder.addOption")}
            </button>
          </div>
          {(field.options || []).map((option, index) => (
            <div key={`${option.value}-${index}`} className="grid gap-3 rounded-lg border border-ecaa-border/60 p-3 sm:grid-cols-3">
              <FormInput
                label={adminT("formsBuilder.optionValue")}
                value={option.value}
                onChange={(e) => updateOption(index, { value: e.target.value })}
              />
              <FormInput
                label={adminT("formsBuilder.optionLabelEn")}
                value={option.label}
                onChange={(e) => updateOption(index, { label: e.target.value })}
              />
              <FormInput
                label={adminT("formsBuilder.optionLabelAm")}
                value={option.labelAm || ""}
                onChange={(e) => updateOption(index, { labelAm: e.target.value })}
              />
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="text-sm text-ecaa-red-700 sm:col-span-3"
              >
                {adminT("common.remove")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminFormEditor() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { adminT } = useAdminLanguage();
  const isNew = !id || id === "new";

  const [form, setForm] = useState(null);
  const [fields, setFields] = useState([]);
  const [editorLang, setEditorLang] = useState("en");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showTemplates, setShowTemplates] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      const templateId = searchParams.get("template");
      if (templateId) {
        const fromTemplate = createFormFromTemplate(templateId);
        if (fromTemplate) {
          setForm(fromTemplate);
          setFields(fromTemplate.fields);
          setShowTemplates(false);
          return;
        }
      }
      setForm(createBlankForm());
      setFields([]);
      return;
    }

    setLoading(true);
    fetchFormWithFieldsForAdmin(id)
      .then((result) => {
        if (!result) {
          setError(adminT("formsBuilder.notFound"));
          return;
        }
        setForm(result.form);
        setFields(result.fields);
      })
      .catch((loadError) => {
        console.error(loadError);
        setError(adminT("formsBuilder.loadError"));
      })
      .finally(() => setLoading(false));
  }, [id, isNew, searchParams, adminT]);

  function updateForm(patch) {
    setForm((current) => ({ ...current, ...patch }));
  }

  function addField() {
    const nextOrder = fields.length + 1;
    setFields((current) => [
      ...current,
      {
        id: `temp-${Date.now()}`,
        fieldKey: `field_${nextOrder}`,
        label: "New field",
        labelAm: "",
        fieldType: "text",
        required: false,
        displayOrder: nextOrder,
        visible: true,
        options: [],
      },
    ]);
  }

  function updateField(index, nextField) {
    setFields((current) => current.map((item, i) => (i === index ? nextField : item)));
  }

  function deleteField(index) {
    setFields((current) => current.filter((_, i) => i !== index));
  }

  function moveField(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= fields.length) return;
    setFields((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((item, i) => ({ ...item, displayOrder: i + 1 }));
    });
  }

  async function handleSave() {
    if (!form.title?.trim()) {
      setError(adminT("formsBuilder.titleRequired"));
      return;
    }

    const slug = form.slug?.trim() || slugifyFormTitle(form.title);
    if (!slug) {
      setError(adminT("formsBuilder.slugRequired"));
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        ...form,
        slug,
        contentAm: {
          title: form.titleAm || form.contentAm?.title || "",
          description: form.descriptionAm || form.contentAm?.description || "",
        },
      };

      const orderedFields = fields.map((field, index) => ({
        ...field,
        displayOrder: index + 1,
        fieldKey: field.fieldKey || slugifyFieldKey(field.label),
      }));

      const saved = await saveFormWithFields(payload, orderedFields);
      setForm(saved.form);
      setFields(saved.fields);
      setMessage(adminT("formsBuilder.saved"));

      if (isNew && saved.form.id) {
        navigate(`/admin/forms/${saved.form.id}`, { replace: true });
      }
    } catch (saveError) {
      console.error(saveError);
      setError(adminT("formsBuilder.saveError"));
    } finally {
      setSaving(false);
    }
  }

  function applyTemplate(templateId) {
    const fromTemplate = createFormFromTemplate(templateId);
    if (!fromTemplate) return;
    setForm(fromTemplate);
    setFields(fromTemplate.fields);
    setShowTemplates(false);
  }

  if (loading || !form) {
    return <p className="text-ecaa-ink-muted">{adminT("common.loading")}</p>;
  }

  const isAm = editorLang === "am";
  const statusOptions = [
    { value: FORM_STATUS.DRAFT, label: adminT("formsBuilder.statusDraft") },
    { value: FORM_STATUS.PUBLISHED, label: adminT("formsBuilder.statusPublished") },
    { value: FORM_STATUS.ARCHIVED, label: adminT("formsBuilder.statusArchived") },
  ];
  const typeOptions = FORM_TYPES.map((type) => ({
    value: type,
    label: adminT(`formsBuilder.types.${type}`) || type,
  }));

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/admin/forms" className="text-sm font-medium text-ecaa-green-800 hover:underline">
            ← {adminT("formsBuilder.backToList")}
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-ecaa-ink">
            {isNew ? adminT("formsBuilder.createTitle") : adminT("formsBuilder.editTitle")}
          </h1>
        </div>
        {!isNew && (
          <Link
            to={`/admin/forms/${form.id}/responses`}
            className="inline-flex min-h-[44px] items-center rounded-lg border border-ecaa-border px-4 py-2 text-sm font-medium text-ecaa-green-900"
          >
            {adminT("formsBuilder.viewResponses")}
          </Link>
        )}
      </div>

      {message && (
        <p className="mb-4 rounded-lg border border-ecaa-green-200 bg-ecaa-green-50 px-4 py-3 text-sm text-ecaa-green-900">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-lg border border-ecaa-red-200 bg-ecaa-red-50 px-4 py-3 text-sm text-ecaa-red-800">
          {error}
        </p>
      )}

      {showTemplates && isNew && (
        <section className="mb-6 rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-cream/50 p-5">
          <h2 className="text-lg font-semibold text-ecaa-green-950">{adminT("formsBuilder.chooseTemplate")}</h2>
          <p className="mt-1 text-sm text-ecaa-ink-muted">{adminT("formsBuilder.templateHint")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setShowTemplates(false)}
              className="rounded-lg border border-ecaa-border bg-ecaa-white p-4 text-left hover:border-ecaa-green-300"
            >
              <span className="font-semibold text-ecaa-green-950">{adminT("formsBuilder.blankForm")}</span>
            </button>
            {FORM_TEMPLATES.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => applyTemplate(template.id)}
                className="rounded-lg border border-ecaa-border bg-ecaa-white p-4 text-left hover:border-ecaa-green-300"
              >
                <span className="font-semibold text-ecaa-green-950">{template.name}</span>
                <span className="mt-1 block text-sm text-ecaa-ink-muted" lang="am">
                  {template.nameAm}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <EditorContentTabs value={editorLang} onChange={setEditorLang} />

      <div className="space-y-6">
        <section className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-ecaa-green-950">{adminT("formsBuilder.formSettings")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              label={adminT("forms.title")}
              value={isAm ? form.titleAm || "" : form.title}
              onChange={(e) =>
                isAm
                  ? updateForm({ titleAm: e.target.value })
                  : updateForm({
                      title: e.target.value,
                      slug: form.slug || slugifyFormTitle(e.target.value),
                    })
              }
              required
            />
            <FormInput
              label={adminT("forms.slug")}
              value={form.slug}
              onChange={(e) => updateForm({ slug: e.target.value })}
              hint={form.slug ? getFormPublicPath(form.slug) : ""}
            />
            <div className="sm:col-span-2">
              <FormTextarea
                label={adminT("forms.description")}
                value={isAm ? form.descriptionAm || "" : form.description || ""}
                onChange={(e) =>
                  isAm
                    ? updateForm({ descriptionAm: e.target.value })
                    : updateForm({ description: e.target.value })
                }
                rows={3}
              />
            </div>
            <FormSelect
              label={adminT("forms.status")}
              value={form.status}
              onChange={(e) => updateForm({ status: e.target.value })}
              options={statusOptions}
            />
            <FormSelect
              label={adminT("common.type")}
              value={form.formType}
              onChange={(e) => updateForm({ formType: e.target.value })}
              options={typeOptions}
            />
            <FormTextarea
              label={adminT("formsBuilder.confirmationMessage")}
              value={isAm ? form.confirmationMessageAm || "" : form.confirmationMessage || ""}
              onChange={(e) =>
                isAm
                  ? updateForm({ confirmationMessageAm: e.target.value })
                  : updateForm({ confirmationMessage: e.target.value })
              }
              rows={2}
            />
            <FormInput
              label={adminT("formsBuilder.submitButtonLabel")}
              value={isAm ? form.submitButtonLabelAm || "" : form.submitButtonLabel || ""}
              onChange={(e) =>
                isAm
                  ? updateForm({ submitButtonLabelAm: e.target.value })
                  : updateForm({ submitButtonLabel: e.target.value })
              }
            />
            <FormInput
              label={adminT("formsBuilder.notificationEmail")}
              type="email"
              value={form.notificationEmail || ""}
              onChange={(e) => updateForm({ notificationEmail: e.target.value })}
              hint={adminT("formsBuilder.notificationEmailHint")}
            />
            <ToggleField
              id="visible-public"
              label={adminT("formsBuilder.visiblePublic")}
              checked={form.visiblePublic}
              onChange={(checked) => updateForm({ visiblePublic: checked })}
            />
            <ToggleField
              id="allow-multiple"
              label={adminT("formsBuilder.allowMultiple")}
              checked={form.allowMultipleSubmissions}
              onChange={(checked) => updateForm({ allowMultipleSubmissions: checked })}
            />
            <ToggleField
              id="collect-email"
              label={adminT("formsBuilder.collectEmail")}
              checked={form.collectEmail}
              onChange={(checked) => updateForm({ collectEmail: checked })}
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-ecaa-green-950">{adminT("formsBuilder.fieldBuilder")}</h2>
            <button
              type="button"
              onClick={addField}
              className="min-h-[44px] rounded-lg border border-ecaa-border px-4 py-2 text-sm font-semibold text-ecaa-green-900 hover:bg-ecaa-cream"
            >
              {adminT("formsBuilder.addField")}
            </button>
          </div>

          {fields.length === 0 ? (
            <p className="rounded-lg border border-dashed border-ecaa-border px-4 py-8 text-center text-sm text-ecaa-ink-muted">
              {adminT("formsBuilder.noFields")}
            </p>
          ) : (
            fields.map((field, index) => (
              <FieldEditor
                key={field.id || field.fieldKey}
                field={field}
                editorLang={editorLang}
                onChange={(next) => updateField(index, next)}
                onDelete={() => deleteField(index)}
                onMoveUp={() => moveField(index, -1)}
                onMoveDown={() => moveField(index, 1)}
                isFirst={index === 0}
                isLast={index === fields.length - 1}
                adminT={adminT}
              />
            ))
          )}
        </section>

        <div className="flex flex-wrap gap-3">
          <SaveButton onClick={handleSave} saving={saving} />
          <Link
            to="/admin/forms"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-ecaa-border px-5 py-2.5 text-sm font-medium text-ecaa-ink"
          >
            {adminT("common.cancel")}
          </Link>
        </div>
      </div>
    </div>
  );
}
