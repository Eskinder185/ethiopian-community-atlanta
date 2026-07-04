import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import EditorContentTabs from "../../components/admin/EditorContentTabs";
import FormInput from "../../components/admin/FormInput";
import FormSelect from "../../components/admin/FormSelect";
import FormTextarea from "../../components/admin/FormTextarea";
import ImageUpload from "../../components/admin/ImageUpload";
import SaveButton from "../../components/admin/SaveButton";
import StatusBadge from "../../components/admin/StatusBadge";
import FormPreviewPanel from "../../components/forms/FormPreviewPanel";
import { FORM_TEMPLATES, createBlankForm, createFormFromTemplate, slugifyFieldKey } from "../../data/formTemplates";
import { useAdminLanguage } from "../../context/AdminLanguageContext";
import {
  ACCENT_THEMES,
  BACKGROUND_THEMES,
  LAYOUT_STYLES,
} from "../../utils/formThemes";
import {
  FIELD_TYPES,
  FORM_STATUS,
  FORM_TYPES,
  FormsTableMissingError,
  fetchFormWithFieldsForAdmin,
  getFormPublicPath,
  saveFormWithFields,
  slugifyFormTitle,
} from "../../utils/forms";
import { useRequireAdminSession } from "../../hooks/useRequireAdminSession";
import {
  AdminNotAuthorizedError,
  AdminSessionRequiredError,
} from "../../utils/adminAuth";

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

const WORKFLOW_STEPS = [
  { id: "basic", labelKey: "workflowBasic" },
  { id: "appearance", labelKey: "workflowAppearance" },
  { id: "fields", labelKey: "workflowFields" },
  { id: "confirmation", labelKey: "workflowConfirmation" },
  { id: "preview", labelKey: "workflowPreview" },
  { id: "publish", labelKey: "workflowPublish" },
];

function WorkflowSidebar({ steps, activeId, onSelect, completion, adminT }) {
  return (
    <nav
      aria-label={adminT("formsBuilder.formSettings")}
      className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-cream/40 p-4 lg:sticky lg:top-24"
    >
      <ol className="space-y-1">
        {steps.map((step, index) => {
          const isActive = activeId === step.id;
          const isDone = completion[step.id];
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onSelect(step.id)}
                className={[
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                  isActive
                    ? "bg-ecaa-green-900 text-ecaa-white"
                    : "text-ecaa-green-950 hover:bg-ecaa-white/80",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    isDone
                      ? isActive
                        ? "bg-ecaa-white text-ecaa-green-900"
                        : "bg-ecaa-green-700 text-ecaa-white"
                      : isActive
                        ? "bg-ecaa-green-700 text-ecaa-white"
                        : "border border-ecaa-border bg-ecaa-white text-ecaa-ink-muted",
                  ].join(" ")}
                >
                  {isDone ? "✓" : index + 1}
                </span>
                <span className="font-medium">{adminT(`formsBuilder.${step.labelKey}`)}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function AdminFormEditor() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { adminT } = useAdminLanguage();
  const sessionReady = useRequireAdminSession();
  const isNew = !id || id === "new";

  const [form, setForm] = useState(null);
  const [fields, setFields] = useState([]);
  const [editorLang, setEditorLang] = useState("en");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showTemplates, setShowTemplates] = useState(isNew);
  const [activeSection, setActiveSection] = useState("basic");
  const [showPreview, setShowPreview] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const sectionRefs = useRef({});

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!sessionReady) return;

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
        if (loadError instanceof AdminNotAuthorizedError) {
          setError(adminT("common.notAuthorized"));
        } else if (!(loadError instanceof AdminSessionRequiredError)) {
          setError(adminT("formsBuilder.loadError"));
        }
      })
      .finally(() => setLoading(false));
  }, [id, isNew, searchParams, adminT, sessionReady]);

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
      if (saveError instanceof AdminNotAuthorizedError) {
        setError(adminT("common.notAuthorized"));
      } else {
        setError(adminT("formsBuilder.saveError"));
      }
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

  async function copyPublicLink() {
    if (!form.slug) return;
    const path = getFormPublicPath(form.slug);
    const fullUrl = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopyMessage(adminT("formsBuilder.linkCopied"));
    } catch {
      setCopyMessage(path);
    }
    setTimeout(() => setCopyMessage(""), 3000);
  }

  function openLivePreview() {
    if (form.status === FORM_STATUS.PUBLISHED && form.slug && form.visiblePublic) {
      window.open(getFormPublicPath(form.slug), "_blank", "noopener,noreferrer");
      return;
    }
    setShowPreview(true);
    scrollToSection("preview");
  }

  if (!sessionReady || loading || !form) {
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

  const themeLabel = (item) => (isAm ? item.labelAm : item.labelEn);
  const backgroundOptions = BACKGROUND_THEMES.map((item) => ({
    value: item.value,
    label: themeLabel(item),
  }));
  const accentOptions = ACCENT_THEMES.map((item) => ({
    value: item.value,
    label: themeLabel(item),
  }));
  const layoutOptions = LAYOUT_STYLES.map((item) => ({
    value: item.value,
    label: themeLabel(item),
  }));

  const workflowCompletion = {
    basic: Boolean(form.title?.trim() && form.slug?.trim()),
    appearance: Boolean(form.backgroundTheme && form.accentTheme),
    fields: fields.length > 0,
    confirmation: Boolean(form.confirmationMessage?.trim() || form.confirmationMessageAm?.trim()),
    preview: showPreview,
    publish: form.status === FORM_STATUS.PUBLISHED && form.visiblePublic,
  };

  const isDraftPreview = form.status !== FORM_STATUS.PUBLISHED || !form.visiblePublic;

  return (
    <div className="mx-auto max-w-6xl">
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

      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <WorkflowSidebar
          steps={WORKFLOW_STEPS}
          activeId={activeSection}
          onSelect={scrollToSection}
          completion={workflowCompletion}
          adminT={adminT}
        />

        <div className="space-y-6">
          <section
            id="section-basic"
            ref={(el) => {
              sectionRefs.current.basic = el;
            }}
            className="scroll-mt-24 rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-ecaa-green-950">{adminT("formsBuilder.workflowBasic")}</h2>
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

          <section
            id="section-appearance"
            ref={(el) => {
              sectionRefs.current.appearance = el;
            }}
            className="scroll-mt-24 rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6"
          >
            <h2 className="mb-1 text-lg font-semibold text-ecaa-green-950">{adminT("formsBuilder.formAppearance")}</h2>
            <p className="mb-4 text-sm text-ecaa-ink-muted" lang={isAm ? "am" : undefined}>
              {adminT("formsBuilder.coverImageHint")}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <ImageUpload
                  id="cover-image-upload"
                  label={adminT("formsBuilder.coverImage")}
                  uploadFolder="forms/cover-images"
                  onUploaded={(url) => updateForm({ coverImageUrl: url })}
                />
              </div>
              <FormInput
                label={adminT("formsBuilder.coverImageUrl")}
                value={form.coverImageUrl || ""}
                onChange={(e) => updateForm({ coverImageUrl: e.target.value })}
              />
              <FormInput
                label={adminT("formsBuilder.coverImageAlt")}
                value={form.coverImageAlt || ""}
                onChange={(e) => updateForm({ coverImageAlt: e.target.value })}
              />
              <FormSelect
                label={adminT("formsBuilder.backgroundTheme")}
                value={form.backgroundTheme || "warm"}
                onChange={(e) => updateForm({ backgroundTheme: e.target.value })}
                options={backgroundOptions}
              />
              <FormSelect
                label={adminT("formsBuilder.accentTheme")}
                value={form.accentTheme || "green"}
                onChange={(e) => updateForm({ accentTheme: e.target.value })}
                options={accentOptions}
              />
              <FormSelect
                label={adminT("formsBuilder.layoutStyle")}
                value={form.layoutStyle || "standard"}
                onChange={(e) => updateForm({ layoutStyle: e.target.value })}
                options={layoutOptions}
              />
            </div>
          </section>

          <section
            id="section-fields"
            ref={(el) => {
              sectionRefs.current.fields = el;
            }}
            className="scroll-mt-24 space-y-4"
          >
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

          <section
            id="section-confirmation"
            ref={(el) => {
              sectionRefs.current.confirmation = el;
            }}
            className="scroll-mt-24 rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-ecaa-green-950">{adminT("formsBuilder.workflowConfirmation")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>
          </section>

          <section
            id="section-preview"
            ref={(el) => {
              sectionRefs.current.preview = el;
            }}
            className="scroll-mt-24 rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-ecaa-green-950">{adminT("formsBuilder.workflowPreview")}</h2>
              <button
                type="button"
                onClick={openLivePreview}
                className="min-h-[44px] rounded-lg bg-ecaa-green-800 px-4 py-2 text-sm font-semibold text-ecaa-white hover:bg-ecaa-green-900"
              >
                {adminT("formsBuilder.previewForm")}
              </button>
            </div>
            <p className="mb-4 rounded-lg border border-ecaa-gold-200 bg-ecaa-gold-50 px-4 py-3 text-sm text-ecaa-green-900" lang={isAm ? "am" : undefined}>
              {adminT("formsBuilder.previewHint")}
            </p>
            {isDraftPreview && (
              <p className="mb-4 text-sm text-ecaa-ink-muted">{adminT("formsBuilder.previewDraftNote")}</p>
            )}
            {!isDraftPreview && form.slug && (
              <p className="mb-4">
                <a
                  href={getFormPublicPath(form.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-ecaa-green-800 hover:underline"
                >
                  {adminT("formsBuilder.openPublicForm")} →
                </a>
              </p>
            )}
            {showPreview && (
              <div className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/60">
                <FormPreviewPanel form={form} fields={fields} language={editorLang} />
              </div>
            )}
          </section>

          <section
            id="section-publish"
            ref={(el) => {
              sectionRefs.current.publish = el;
            }}
            className="scroll-mt-24 rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-cream/50 p-5 sm:p-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-ecaa-green-950">{adminT("formsBuilder.workflowPublish")}</h2>
            <p className="mb-4 text-sm text-ecaa-ink-muted">
              {form.status === FORM_STATUS.PUBLISHED
                ? adminT("formsBuilder.statusPublished")
                : adminT("formsBuilder.statusDraft")}
              {form.visiblePublic ? ` · ${adminT("formsBuilder.visiblePublic")}` : ""}
            </p>
            {form.slug && (
              <div className="flex flex-wrap items-center gap-3">
                <code className="rounded-lg border border-ecaa-border bg-ecaa-white px-3 py-2 text-sm text-ecaa-green-900">
                  {getFormPublicPath(form.slug)}
                </code>
                <button
                  type="button"
                  onClick={copyPublicLink}
                  className="min-h-[44px] rounded-lg border border-ecaa-border px-4 py-2 text-sm font-semibold text-ecaa-green-900 hover:bg-ecaa-white"
                >
                  {adminT("formsBuilder.copyLink")}
                </button>
              </div>
            )}
            {copyMessage && (
              <p className="mt-3 text-sm font-medium text-ecaa-green-800">{copyMessage}</p>
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
    </div>
  );
}
