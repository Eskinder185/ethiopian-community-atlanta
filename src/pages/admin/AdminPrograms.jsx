import { useEffect, useState } from "react";
import FormInput from "../../components/admin/FormInput";
import FormTextarea from "../../components/admin/FormTextarea";
import FormSelect from "../../components/admin/FormSelect";
import SaveButton from "../../components/admin/SaveButton";
import ImageUpload from "../../components/admin/ImageUpload";
import StatusBadge from "../../components/admin/StatusBadge";
import EditorContentTabs from "../../components/admin/EditorContentTabs";
import { useAdminLanguage } from "../../context/AdminLanguageContext";
import { uploadFolders } from "../../config/assets";
import {
  createEmptyProgram,
  fetchProgramsForAdmin,
  saveProgram,
  slugifyTitle,
} from "../../utils/programs";
import { buildContentAmFromDraft } from "../../utils/programsLocale";
import { programsAmharicFallbackBySlug } from "../../data/programsAmharicFallback";
import { normalizeWebsiteRoute } from "../../utils/adminRoutes";

const MEDIA_TYPES = [
  { value: "image", label: "Image" },
  { value: "gif", label: "GIF" },
  { value: "youtube", label: "YouTube" },
  { value: "video_link", label: "Video link" },
  { value: "document", label: "Document" },
];

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
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded border-ecaa-border text-ecaa-green-800 focus:ring-ecaa-green-700"
      />
      <span>
        <span className="block text-sm font-medium text-ecaa-ink">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-ecaa-ink-subtle">{hint}</span>}
      </span>
    </label>
  );
}

function SectionCard({ title, description, children, action }) {
  return (
    <section className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ecaa-green-950">{title}</h2>
          {description && <p className="mt-1 text-sm text-ecaa-ink-muted">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function AdminPrograms() {
  const { adminT } = useAdminLanguage();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editorLang, setEditorLang] = useState("en");

  useEffect(() => {
    fetchProgramsForAdmin().then((items) => {
      setPrograms(items);
      setLoading(false);
    });
  }, []);

  const startNewProgram = () => {
    setSelectedSlug("__new__");
    setDraft(createEmptyProgram());
    setEditorLang("en");
    setStatusMessage("");
    setErrorMessage("");
  };

  const startEditProgram = (program) => {
    const fallbackAm = programsAmharicFallbackBySlug[program.slug] || {};
    setSelectedSlug(program.slug);
    setDraft({
      ...program,
      content_am: { ...fallbackAm, ...(program.content_am || {}) },
      placeholderDetails: [...(program.placeholderDetails ?? [])],
      detailSections: (program.detailSections ?? []).map((section) => ({ ...section })),
      mediaItems: (program.mediaItems ?? []).map((item) => ({ ...item })),
      resourceLinks: (program.resourceLinks ?? []).map((link) => ({ ...link })),
      registrationLinks: (program.registrationLinks ?? []).map((link) => ({ ...link })),
    });
    setEditorLang("en");
    setStatusMessage("");
    setErrorMessage("");
  };

  const updateDraft = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const updateContentAm = (field, value) => {
    setDraft((current) => ({
      ...current,
      content_am: { ...(current.content_am || {}), [field]: value },
    }));
  };

  const getContentAmList = (field) => draft?.content_am?.[field] ?? [];

  const updateContentAmLine = (field, index, value) => {
    setDraft((current) => {
      const lines = [...(current.content_am?.[field] ?? [])];
      lines[index] = value;
      return { ...current, content_am: { ...(current.content_am || {}), [field]: lines } };
    });
  };

  const addContentAmLine = (field) => {
    setDraft((current) => ({
      ...current,
      content_am: {
        ...(current.content_am || {}),
        [field]: [...(current.content_am?.[field] ?? []), ""],
      },
    }));
  };

  const removeContentAmLine = (field, index) => {
    setDraft((current) => ({
      ...current,
      content_am: {
        ...(current.content_am || {}),
        [field]: (current.content_am?.[field] ?? []).filter((_, i) => i !== index),
      },
    }));
  };

  const updateContentAmSection = (index, key, value) => {
    setDraft((current) => {
      const sections = [...(current.content_am?.detail_sections ?? [])];
      sections[index] = { ...(sections[index] || {}), [key]: value };
      return {
        ...current,
        content_am: { ...(current.content_am || {}), detail_sections: sections },
      };
    });
  };

  const addContentAmSection = () => {
    setDraft((current) => ({
      ...current,
      content_am: {
        ...(current.content_am || {}),
        detail_sections: [
          ...(current.content_am?.detail_sections ?? []),
          { heading: "", body: "" },
        ],
      },
    }));
  };

  const removeContentAmSection = (index) => {
    setDraft((current) => ({
      ...current,
      content_am: {
        ...(current.content_am || {}),
        detail_sections: (current.content_am?.detail_sections ?? []).filter((_, i) => i !== index),
      },
    }));
  };

  const updatePlaceholderLine = (index, value) => {
    setDraft((current) => {
      const lines = [...(current.placeholderDetails ?? [])];
      lines[index] = value;
      return { ...current, placeholderDetails: lines };
    });
  };

  const addPlaceholderLine = () => {
    setDraft((current) => ({
      ...current,
      placeholderDetails: [...(current.placeholderDetails ?? []), ""],
    }));
  };

  const removePlaceholderLine = (index) => {
    setDraft((current) => ({
      ...current,
      placeholderDetails: (current.placeholderDetails ?? []).filter((_, i) => i !== index),
    }));
  };

  const updateDetailSection = (index, field, value) => {
    setDraft((current) => {
      const sections = [...(current.detailSections ?? [])];
      sections[index] = { ...sections[index], [field]: value };
      return { ...current, detailSections: sections };
    });
  };

  const addDetailSection = () => {
    setDraft((current) => ({
      ...current,
      detailSections: [...(current.detailSections ?? []), { heading: "", body: "" }],
    }));
  };

  const removeDetailSection = (index) => {
    setDraft((current) => ({
      ...current,
      detailSections: (current.detailSections ?? []).filter((_, i) => i !== index),
    }));
  };

  const updateMediaItem = (index, field, value) => {
    setDraft((current) => {
      const items = [...(current.mediaItems ?? [])];
      items[index] = { ...items[index], [field]: value };
      return { ...current, mediaItems: items };
    });
  };

  const addMediaItem = () => {
    setDraft((current) => ({
      ...current,
      mediaItems: [
        ...(current.mediaItems ?? []),
        {
          id: `media-${Date.now()}`,
          type: "image",
          title: "",
          caption: "",
          url: "",
          imageUrl: "",
          altText: "",
        },
      ],
    }));
  };

  const removeMediaItem = (index) => {
    setDraft((current) => ({
      ...current,
      mediaItems: (current.mediaItems ?? []).filter((_, i) => i !== index),
    }));
  };

  const updateResourceLink = (index, field, value) => {
    setDraft((current) => {
      const links = [...(current.resourceLinks ?? [])];
      links[index] = { ...links[index], [field]: value };
      return { ...current, resourceLinks: links };
    });
  };

  const addResourceLink = () => {
    setDraft((current) => ({
      ...current,
      resourceLinks: [
        ...(current.resourceLinks ?? []),
        {
          id: `resource-${Date.now()}`,
          label: "",
          url: "",
          description: "",
          buttonLabel: "",
          external: true,
        },
      ],
    }));
  };

  const removeResourceLink = (index) => {
    setDraft((current) => ({
      ...current,
      resourceLinks: (current.resourceLinks ?? []).filter((_, i) => i !== index),
    }));
  };

  const updateRegistrationLink = (index, field, value) => {
    setDraft((current) => {
      const links = [...(current.registrationLinks ?? [])];
      links[index] = { ...links[index], [field]: value };
      return { ...current, registrationLinks: links };
    });
  };

  const addRegistrationLink = () => {
    setDraft((current) => ({
      ...current,
      registrationLinks: [
        ...(current.registrationLinks ?? []),
        {
          id: `registration-${Date.now()}`,
          title: "",
          description: "",
          buttonLabel: "Open Form",
          url: "",
          external: true,
          note: "",
        },
      ],
    }));
  };

  const removeRegistrationLink = (index) => {
    setDraft((current) => ({
      ...current,
      registrationLinks: (current.registrationLinks ?? []).filter((_, i) => i !== index),
    }));
  };

  const handleMediaFile = (index, file, url) => {
    if (!file && !url) return;
    const imageUrl = url || `/uploads/${file.name}`;
    updateMediaItem(index, "imageUrl", imageUrl);
    if (file) {
      updateMediaItem(index, "type", file.type === "image/gif" ? "gif" : "image");
      if (!draft?.mediaItems?.[index]?.title) {
        updateMediaItem(index, "title", file.name.replace(/\.[^.]+$/, ""));
      }
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!draft) return;

    setSaving(true);
    setStatusMessage("");
    setErrorMessage("");

    const slug = draft.slug?.trim() || slugifyTitle(draft.title);
    const payload = {
      ...draft,
      slug,
      id: draft.id || slug,
      shortDescription: draft.shortDescription || draft.description,
      buttonLink: normalizeWebsiteRoute(draft.buttonLink || `/programs/${slug}`),
      placeholderDetails: (draft.placeholderDetails ?? []).filter((line) => line.trim()),
      detailSections: (draft.detailSections ?? []).filter(
        (section) => section.heading?.trim() && section.body?.trim()
      ),
      registrationLinks: (draft.registrationLinks ?? []).filter(
        (link) => link.title?.trim() && link.url?.trim()
      ),
      resourceLinks: (draft.resourceLinks ?? []).filter(
        (link) => link.label?.trim() && link.url?.trim()
      ),
      content_am: buildContentAmFromDraft(draft),
    };

    try {
      const saved = await saveProgram(payload);
      const refreshed = await fetchProgramsForAdmin();
      setPrograms(refreshed);
      setSelectedSlug(saved.slug);
      setDraft(saved);
      setStatusMessage(adminT("messages.programSaved"));
    } catch (error) {
      setErrorMessage(
        error?.message ||
          "Could not save to Supabase. Ensure the programs table exists and you are signed in with editor access."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-ecaa-ink-muted">{adminT("programs.loading")}</p>;
  }

  if (draft) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
              type="button"
              onClick={() => {
                setDraft(null);
                setSelectedSlug(null);
              }}
              className="text-sm font-medium text-ecaa-green-800 hover:text-ecaa-green-950"
            >
              {adminT("programs.backToList")}
            </button>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ecaa-ink">
              {selectedSlug === "__new__"
                ? adminT("programs.addProgram")
                : adminT("programs.editProgram")}
            </h1>
          </div>
          {draft.slug && (
            <StatusBadge
              label={draft.visible !== false ? adminT("common.visible") : adminT("common.hidden")}
              variant={draft.visible !== false ? "live" : "soon"}
            />
          )}
        </div>

        {statusMessage && (
          <p className="mb-4 rounded-lg border border-ecaa-green-200 bg-ecaa-green-50 px-4 py-3 text-sm text-ecaa-green-900">
            {statusMessage}
          </p>
        )}
        {errorMessage && (
          <p className="mb-4 rounded-lg border border-ecaa-red-200 bg-ecaa-red-50 px-4 py-3 text-sm text-ecaa-red-900">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <EditorContentTabs value={editorLang} onChange={setEditorLang} />

          {editorLang === "en" ? (
            <>
              <SectionCard
                title={adminT("programs.basics")}
                description={adminT("programs.basicsHelper")}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormInput
                    id="program-title"
                    label={adminT("forms.title")}
                    value={draft.title}
                    onChange={(event) => {
                      const title = event.target.value;
                      updateDraft("title", title);
                      if (selectedSlug === "__new__" && !draft.slug) {
                        updateDraft("slug", slugifyTitle(title));
                      }
                    }}
                    required
                  />
                  <FormInput
                    id="program-slug"
                    label={adminT("forms.slug")}
                    value={draft.slug}
                    onChange={(event) => updateDraft("slug", event.target.value)}
                    hint={adminT("programs.slugHelper")}
                    required
                  />
                  <FormInput
                    id="program-initials"
                    label={adminT("programs.initialsBadge")}
                    value={draft.initials}
                    onChange={(event) => updateDraft("initials", event.target.value)}
                    maxLength={3}
                  />
                  <FormInput
                    id="program-category"
                    label={adminT("forms.category")}
                    value={draft.category}
                    onChange={(event) => updateDraft("category", event.target.value)}
                  />
                  <FormInput
                    id="program-subtitle"
                    label={adminT("programs.subtitle")}
                    value={draft.subtitle}
                    onChange={(event) => updateDraft("subtitle", event.target.value)}
                  />
                  <FormInput
                    id="program-status"
                    label={adminT("programs.statusLabel")}
                    value={draft.statusLabel}
                    onChange={(event) => updateDraft("statusLabel", event.target.value)}
                  />
                  <FormInput
                    id="program-order"
                    label={adminT("forms.displayOrder")}
                    type="number"
                    value={draft.displayOrder}
                    onChange={(event) => updateDraft("displayOrder", Number(event.target.value))}
                  />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <ToggleField
                    id="program-visible"
                    label={adminT("forms.visibleOnWebsite")}
                    checked={draft.visible !== false}
                    onChange={(value) => updateDraft("visible", value)}
                  />
                  <ToggleField
                    id="program-featured"
                    label={adminT("programs.featuredProgram")}
                    checked={draft.featured !== false}
                    onChange={(value) => updateDraft("featured", value)}
                  />
                </div>
              </SectionCard>

              <SectionCard title={adminT("programs.descriptions")}>
                <div className="space-y-4">
                  <FormTextarea
                    id="program-short-description"
                    label={adminT("forms.shortDescription")}
                    rows={3}
                    value={draft.shortDescription || draft.description}
                    onChange={(event) => {
                      updateDraft("shortDescription", event.target.value);
                      updateDraft("description", event.target.value);
                    }}
                  />
                  <FormTextarea
                    id="program-page-intro"
                    label={adminT("programs.pageIntro")}
                    rows={3}
                    value={draft.pageIntro}
                    onChange={(event) => updateDraft("pageIntro", event.target.value)}
                  />
                  <FormTextarea
                    id="program-full-description"
                    label={adminT("programs.fullDescriptionOverview")}
                    rows={4}
                    value={draft.fullDescription}
                    onChange={(event) => updateDraft("fullDescription", event.target.value)}
                  />
                </div>
              </SectionCard>

              <SectionCard
                title={adminT("programs.cardPlaceholderBullets")}
                description={adminT("programs.cardPlaceholderHelper")}
                action={
                  <button
                    type="button"
                    onClick={addPlaceholderLine}
                    className="btn btn-secondary btn-sm"
                  >
                    {adminT("programs.addBullet")}
                  </button>
                }
              >
                <div className="space-y-3">
                  {(draft.placeholderDetails ?? []).map((line, index) => (
                    <div key={`placeholder-${index}`} className="flex gap-2">
                      <FormInput
                        id={`placeholder-${index}`}
                        value={line}
                        onChange={(event) => updatePlaceholderLine(index, event.target.value)}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removePlaceholderLine(index)}
                        className="btn btn-ghost btn-sm shrink-0"
                      >
                        {adminT("common.remove")}
                      </button>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                title={adminT("programs.detailSections")}
                description={adminT("programs.detailSectionsHelper")}
                action={
                  <button
                    type="button"
                    onClick={addDetailSection}
                    className="btn btn-secondary btn-sm"
                  >
                    {adminT("programs.addDetailSection")}
                  </button>
                }
              >
                <div className="space-y-4">
                  {(draft.detailSections ?? []).map((section, index) => (
                    <div
                      key={`section-${index}`}
                      className="rounded-lg border border-ecaa-border/70 bg-ecaa-cream/30 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-ecaa-green-950">
                          {adminT("programs.sectionN").replace("{n}", index + 1)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeDetailSection(index)}
                          className="btn btn-ghost btn-sm"
                        >
                          {adminT("programs.removeDetailSection")}
                        </button>
                      </div>
                      <div className="space-y-3">
                        <FormInput
                          id={`section-heading-${index}`}
                          label={adminT("forms.heading")}
                          value={section.heading}
                          onChange={(event) =>
                            updateDetailSection(index, "heading", event.target.value)
                          }
                        />
                        <FormTextarea
                          id={`section-body-${index}`}
                          label={adminT("forms.body")}
                          rows={3}
                          value={section.body}
                          onChange={(event) =>
                            updateDetailSection(index, "body", event.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                title={adminT("programs.programMedia")}
                description={adminT("programs.programMediaHelper")}
                action={
                  <button type="button" onClick={addMediaItem} className="btn btn-secondary btn-sm">
                    {adminT("programs.addMediaItem")}
                  </button>
                }
              >
                <div className="space-y-5">
                  {(draft.mediaItems ?? []).map((item, index) => (
                    <div
                      key={item.id || `media-${index}`}
                      className="rounded-lg border border-ecaa-border/70 bg-ecaa-cream/30 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-ecaa-green-950">
                          {adminT("programs.mediaItemN").replace("{n}", index + 1)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeMediaItem(index)}
                          className="btn btn-ghost btn-sm"
                        >
                          {adminT("programs.removeMediaItem")}
                        </button>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormSelect
                          id={`media-type-${index}`}
                          label={adminT("common.type")}
                          value={item.type}
                          onChange={(event) => updateMediaItem(index, "type", event.target.value)}
                        >
                          {MEDIA_TYPES.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </FormSelect>
                        <FormInput
                          id={`media-title-${index}`}
                          label={adminT("forms.title")}
                          value={item.title}
                          onChange={(event) => updateMediaItem(index, "title", event.target.value)}
                        />
                        <FormInput
                          id={`media-url-${index}`}
                          label={adminT("forms.url")}
                          value={item.url}
                          onChange={(event) => updateMediaItem(index, "url", event.target.value)}
                          hint={adminT("programs.mediaUrlHint")}
                        />
                        <FormInput
                          id={`media-image-url-${index}`}
                          label={adminT("forms.imageUrl")}
                          value={item.imageUrl}
                          onChange={(event) =>
                            updateMediaItem(index, "imageUrl", event.target.value)
                          }
                          hint={adminT("programs.mediaImageHint")}
                        />
                        <FormInput
                          id={`media-alt-${index}`}
                          label={adminT("forms.altText")}
                          value={item.altText}
                          onChange={(event) =>
                            updateMediaItem(index, "altText", event.target.value)
                          }
                        />
                        <FormTextarea
                          id={`media-caption-${index}`}
                          label={adminT("forms.caption")}
                          rows={2}
                          value={item.caption}
                          onChange={(event) =>
                            updateMediaItem(index, "caption", event.target.value)
                          }
                        />
                      </div>
                      <div className="mt-4">
                        <ImageUpload
                          id={`media-upload-${index}`}
                          label={adminT("media.uploadImageFile")}
                          uploadFolder={uploadFolders.programMedia}
                          hint={adminT("programs.mediaUploadHint")}
                          onUploaded={(url) => handleMediaFile(index, null, url)}
                          onChange={(event) => handleMediaFile(index, event.target.files?.[0])}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                title={adminT("programs.linksResources")}
                action={
                  <button
                    type="button"
                    onClick={addResourceLink}
                    className="btn btn-secondary btn-sm"
                  >
                    {adminT("programs.addResourceLink")}
                  </button>
                }
              >
                <div className="space-y-5">
                  {(draft.resourceLinks ?? []).map((link, index) => (
                    <div
                      key={link.id || `resource-${index}`}
                      className="rounded-lg border border-ecaa-border/70 bg-ecaa-cream/30 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-ecaa-green-950">
                          {adminT("programs.resourceN").replace("{n}", index + 1)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeResourceLink(index)}
                          className="btn btn-ghost btn-sm"
                        >
                          {adminT("programs.removeResourceLink")}
                        </button>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput
                          id={`resource-label-${index}`}
                          label={adminT("forms.label")}
                          value={link.label}
                          onChange={(event) =>
                            updateResourceLink(index, "label", event.target.value)
                          }
                        />
                        <FormInput
                          id={`resource-url-${index}`}
                          label={adminT("forms.url")}
                          value={link.url}
                          onChange={(event) => updateResourceLink(index, "url", event.target.value)}
                        />
                        <FormInput
                          id={`resource-button-${index}`}
                          label={adminT("forms.buttonLabel")}
                          value={link.buttonLabel || ""}
                          onChange={(event) =>
                            updateResourceLink(index, "buttonLabel", event.target.value)
                          }
                          hint={adminT("programs.resourceButtonHint")}
                        />
                        <FormTextarea
                          id={`resource-description-${index}`}
                          label={adminT("forms.description")}
                          rows={2}
                          value={link.description}
                          onChange={(event) =>
                            updateResourceLink(index, "description", event.target.value)
                          }
                          className="sm:col-span-2"
                        />
                        <ToggleField
                          id={`resource-external-${index}`}
                          label={adminT("programs.openExternal")}
                          checked={link.external !== false}
                          onChange={(value) => updateResourceLink(index, "external", value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                title={adminT("programs.registrationInterest")}
                description={adminT("programs.registrationHelper")}
                action={
                  <button
                    type="button"
                    onClick={addRegistrationLink}
                    className="btn btn-secondary btn-sm"
                  >
                    {adminT("programs.addRegistrationLink")}
                  </button>
                }
              >
                <div className="mb-4 space-y-4">
                  <FormInput
                    id="interest-form-slug"
                    label={adminT("programs.interestFormSlug")}
                    value={draft.interestFormSlug || ""}
                    onChange={(event) => updateDraft("interestFormSlug", event.target.value)}
                    hint={adminT("programs.interestFormSlugHint")}
                  />
                  <FormTextarea
                    id="registration-empty-message"
                    label={adminT("programs.registrationEmptyMessage")}
                    rows={2}
                    value={draft.registrationEmptyMessage || ""}
                    onChange={(event) =>
                      updateDraft("registrationEmptyMessage", event.target.value)
                    }
                    hint={adminT("programs.registrationEmptyHint")}
                  />
                  <FormTextarea
                    id="media-empty-message"
                    label={adminT("programs.mediaEmptyMessage")}
                    rows={2}
                    value={draft.mediaEmptyMessage || ""}
                    onChange={(event) => updateDraft("mediaEmptyMessage", event.target.value)}
                    hint={adminT("programs.mediaEmptyHint")}
                  />
                </div>

                <div className="space-y-5">
                  {(draft.registrationLinks ?? []).map((link, index) => (
                    <div
                      key={link.id || `registration-${index}`}
                      className="rounded-lg border border-ecaa-border/70 bg-ecaa-cream/30 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-ecaa-green-950">
                          {adminT("programs.registrationN").replace("{n}", index + 1)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeRegistrationLink(index)}
                          className="btn btn-ghost btn-sm"
                        >
                          {adminT("programs.removeRegistrationLink")}
                        </button>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput
                          id={`registration-title-${index}`}
                          label={adminT("forms.title")}
                          value={link.title}
                          onChange={(event) =>
                            updateRegistrationLink(index, "title", event.target.value)
                          }
                        />
                        <FormInput
                          id={`registration-button-${index}`}
                          label={adminT("forms.buttonLabel")}
                          value={link.buttonLabel}
                          onChange={(event) =>
                            updateRegistrationLink(index, "buttonLabel", event.target.value)
                          }
                        />
                        <FormInput
                          id={`registration-url-${index}`}
                          label={adminT("forms.url")}
                          value={link.url}
                          onChange={(event) =>
                            updateRegistrationLink(index, "url", event.target.value)
                          }
                          className="sm:col-span-2"
                        />
                        <FormTextarea
                          id={`registration-description-${index}`}
                          label={adminT("forms.description")}
                          rows={3}
                          value={link.description}
                          onChange={(event) =>
                            updateRegistrationLink(index, "description", event.target.value)
                          }
                          className="sm:col-span-2"
                        />
                        <FormTextarea
                          id={`registration-note-${index}`}
                          label={adminT("forms.noteOptional")}
                          rows={2}
                          value={link.note}
                          onChange={(event) =>
                            updateRegistrationLink(index, "note", event.target.value)
                          }
                          hint={adminT("programs.registrationNoteHint")}
                          className="sm:col-span-2"
                        />
                        <ToggleField
                          id={`registration-external-${index}`}
                          label={adminT("programs.openExternal")}
                          checked={link.external !== false}
                          onChange={(value) => updateRegistrationLink(index, "external", value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title={adminT("programs.programsPageCard")}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormInput
                    id="button-label"
                    label={adminT("programs.cardButtonLabel")}
                    value={draft.buttonLabel}
                    onChange={(event) => updateDraft("buttonLabel", event.target.value)}
                  />
                  <FormInput
                    id="button-link"
                    label={adminT("programs.cardButtonLink")}
                    value={draft.buttonLink}
                    onChange={(event) =>
                      updateDraft("buttonLink", normalizeWebsiteRoute(event.target.value))
                    }
                    hint={adminT("forms.linkExample")}
                  />
                </div>
                {draft.slug === "legal-education" && (
                  <FormTextarea
                    id="legal-notice"
                    label={adminT("programs.legalNotice")}
                    rows={2}
                    className="mt-4"
                    value={draft.legalNotice}
                    onChange={(event) => updateDraft("legalNotice", event.target.value)}
                  />
                )}
              </SectionCard>
            </>
          ) : (
            <>
              <SectionCard
                title={adminT("programs.amharicBasics")}
                description={adminT("programs.amharicBasicsHelper")}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormInput
                    id="am-program-initials"
                    label={adminT("programs.amharicInitials")}
                    value={draft.content_am?.initials || ""}
                    onChange={(event) => updateContentAm("initials", event.target.value)}
                    maxLength={3}
                  />
                  <FormInput
                    id="am-program-status"
                    label={adminT("programs.amharicStatus")}
                    value={draft.content_am?.status_label || ""}
                    onChange={(event) => updateContentAm("status_label", event.target.value)}
                  />
                  <FormInput
                    id="am-program-category"
                    label={adminT("programs.amharicCategory")}
                    value={draft.content_am?.category || ""}
                    onChange={(event) => updateContentAm("category", event.target.value)}
                  />
                  <FormInput
                    id="am-program-title"
                    label={adminT("programs.amharicTitle")}
                    value={draft.content_am?.title || ""}
                    onChange={(event) => updateContentAm("title", event.target.value)}
                  />
                  <FormInput
                    id="am-program-subtitle"
                    label={adminT("programs.amharicSubtitle")}
                    value={draft.content_am?.subtitle || ""}
                    onChange={(event) => updateContentAm("subtitle", event.target.value)}
                    className="sm:col-span-2"
                  />
                </div>
              </SectionCard>

              <SectionCard title={adminT("programs.amharicDescriptions")}>
                <div className="space-y-4">
                  <FormTextarea
                    id="am-program-short-description"
                    label={adminT("programs.amharicShortDescription")}
                    rows={3}
                    value={draft.content_am?.short_description || ""}
                    onChange={(event) => updateContentAm("short_description", event.target.value)}
                  />
                  <FormTextarea
                    id="am-program-page-intro"
                    label={adminT("programs.amharicPageIntro")}
                    rows={3}
                    value={draft.content_am?.page_intro || ""}
                    onChange={(event) => updateContentAm("page_intro", event.target.value)}
                  />
                  <FormTextarea
                    id="am-program-full-description"
                    label={adminT("programs.amharicFullDescription")}
                    rows={4}
                    value={draft.content_am?.full_description || ""}
                    onChange={(event) => updateContentAm("full_description", event.target.value)}
                  />
                </div>
              </SectionCard>

              <SectionCard
                title={adminT("programs.amharicCardBullets")}
                action={
                  <button
                    type="button"
                    onClick={() => addContentAmLine("placeholder_details")}
                    className="btn btn-secondary btn-sm"
                  >
                    {adminT("programs.addBullet")}
                  </button>
                }
              >
                <div className="space-y-3">
                  {getContentAmList("placeholder_details").map((line, index) => (
                    <div key={`am-placeholder-${index}`} className="flex gap-2">
                      <FormInput
                        id={`am-placeholder-${index}`}
                        value={line}
                        onChange={(event) =>
                          updateContentAmLine("placeholder_details", index, event.target.value)
                        }
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeContentAmLine("placeholder_details", index)}
                        className="btn btn-ghost btn-sm shrink-0"
                      >
                        {adminT("common.remove")}
                      </button>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                title={adminT("programs.amharicDetailSections")}
                action={
                  <button
                    type="button"
                    onClick={addContentAmSection}
                    className="btn btn-secondary btn-sm"
                  >
                    {adminT("programs.addDetailSection")}
                  </button>
                }
              >
                <div className="space-y-4">
                  {getContentAmList("detail_sections").map((section, index) => (
                    <div
                      key={`am-section-${index}`}
                      className="rounded-lg border border-ecaa-border/70 bg-ecaa-cream/30 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-ecaa-green-950">
                          {adminT("programs.sectionN").replace("{n}", index + 1)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeContentAmSection(index)}
                          className="btn btn-ghost btn-sm"
                        >
                          {adminT("programs.removeDetailSection")}
                        </button>
                      </div>
                      <div className="space-y-3">
                        <FormInput
                          id={`am-section-heading-${index}`}
                          label={adminT("forms.heading")}
                          value={section.heading || ""}
                          onChange={(event) =>
                            updateContentAmSection(index, "heading", event.target.value)
                          }
                        />
                        <FormTextarea
                          id={`am-section-body-${index}`}
                          label={adminT("forms.body")}
                          rows={3}
                          value={section.body || ""}
                          onChange={(event) =>
                            updateContentAmSection(index, "body", event.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title={adminT("programs.amharicEmptyStates")}>
                <div className="space-y-4">
                  <FormTextarea
                    id="am-registration-empty-message"
                    label={adminT("programs.amharicRegistrationEmpty")}
                    rows={2}
                    value={draft.content_am?.registration_empty_message || ""}
                    onChange={(event) =>
                      updateContentAm("registration_empty_message", event.target.value)
                    }
                  />
                  <FormTextarea
                    id="am-media-empty-message"
                    label={adminT("programs.amharicMediaEmpty")}
                    rows={2}
                    value={draft.content_am?.media_empty_message || ""}
                    onChange={(event) => updateContentAm("media_empty_message", event.target.value)}
                  />
                  <FormInput
                    id="am-button-label"
                    label={adminT("programs.amharicCardButton")}
                    value={draft.content_am?.button_label || ""}
                    onChange={(event) => updateContentAm("button_label", event.target.value)}
                  />
                  {draft.slug === "legal-education" && (
                    <FormTextarea
                      id="am-legal-notice"
                      label={adminT("programs.amharicLegalNotice")}
                      rows={2}
                      value={draft.content_am?.legal_notice || ""}
                      onChange={(event) => updateContentAm("legal_notice", event.target.value)}
                    />
                  )}
                </div>
              </SectionCard>
            </>
          )}

          <div className="flex flex-wrap gap-3">
            <SaveButton loading={saving} savingText={adminT("common.saving")}>
              {adminT("programs.saveProgram")}
            </SaveButton>
            <button
              type="button"
              onClick={() => {
                setDraft(null);
                setSelectedSlug(null);
              }}
              className="btn btn-secondary btn-sm"
            >
              {adminT("common.cancel")}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ecaa-ink">
            {adminT("programs.title")}
          </h1>
          <p className="mt-1 text-sm text-ecaa-ink-muted">{adminT("programs.description")}</p>
        </div>
        <button type="button" onClick={startNewProgram} className="btn btn-primary btn-sm">
          {adminT("programs.addProgram")}
        </button>
      </div>

      <div className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
        <table className="min-w-full divide-y divide-ecaa-border/80 text-left text-sm">
          <thead className="bg-ecaa-cream/60 text-xs uppercase tracking-wide text-ecaa-ink-subtle">
            <tr>
              <th className="px-4 py-3 font-semibold">{adminT("common.order")}</th>
              <th className="px-4 py-3 font-semibold">{adminT("common.program")}</th>
              <th className="px-4 py-3 font-semibold">{adminT("forms.slug")}</th>
              <th className="px-4 py-3 font-semibold">{adminT("common.status")}</th>
              <th className="px-4 py-3 font-semibold">{adminT("common.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ecaa-border/60">
            {programs.map((program) => (
              <tr key={program.slug} className="hover:bg-ecaa-cream/30">
                <td className="px-4 py-3 text-ecaa-ink-muted">{program.displayOrder}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-ecaa-green-950">{program.title}</p>
                  <p className="text-xs text-ecaa-ink-muted">{program.category}</p>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-ecaa-ink-muted">{program.slug}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge
                      label={
                        program.visible !== false
                          ? adminT("common.visible")
                          : adminT("common.hidden")
                      }
                      variant={program.visible !== false ? "live" : "soon"}
                    />
                    {program.featured && (
                      <StatusBadge label={adminT("common.featured")} variant="live" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => startEditProgram(program)}
                    className="text-sm font-semibold text-ecaa-green-800 hover:text-ecaa-green-950"
                  >
                    {adminT("common.edit")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
