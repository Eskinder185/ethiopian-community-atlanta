import { useEffect, useRef, useState } from "react";
import FormInput from "../../components/admin/FormInput";
import FormTextarea from "../../components/admin/FormTextarea";
import FormSelect from "../../components/admin/FormSelect";
import SaveButton from "../../components/admin/SaveButton";
import StatusBadge from "../../components/admin/StatusBadge";
import {
  uploadToSupabaseStorage,
  verifyUploadedImageUrl,
} from "../../utils/uploadToSupabaseStorage";
import {
  assertPublishableImageUrl,
  isBadPublishedImageUrl,
} from "../../utils/imageUploadValidation";
import { getDirectImageUrl, getYouTubeId } from "../../utils/mediaUrl";
import { ALT_TEXT_HINT } from "../../utils/altText";
import EditorContentTabs from "../../components/admin/EditorContentTabs";
import AdminSetupNotice from "../../components/admin/AdminSetupNotice";
import { useAdminLanguage } from "../../context/AdminLanguageContext";
import {
  MEDIA_TYPES,
  deleteMediaItem,
  fetchMediaItemsAdminState,
  normalizeMediaItem,
} from "../../utils/mediaItems";
import { buildMediaContentAmFromDraft, mediaItemToDraft } from "../../utils/mediaLocale";
import { supabase, hasSupabaseConfig } from "../../lib/supabaseClient";
import { isValidUuid, cleanUuid } from "../../utils/uuid";
import { sanitizeStoredImageUrl, resolvePublicImageUrl } from "../../lib/uploadMedia";

const TYPE_OPTIONS = [
  { value: MEDIA_TYPES.IMAGE, labelKey: "media.typeImage" },
  { value: MEDIA_TYPES.GIF, labelKey: "media.typeGif" },
  { value: MEDIA_TYPES.YOUTUBE, labelKey: "media.typeYoutube" },
  { value: MEDIA_TYPES.VIDEO_LINK, labelKey: "media.typeVideoLink" },
  { value: MEDIA_TYPES.EVENTBRITE, labelKey: "media.typeEventbrite" },
  { value: MEDIA_TYPES.GOOGLE_FORM, labelKey: "media.typeGoogleForm" },
  { value: MEDIA_TYPES.PARTIFUL, labelKey: "media.typePartiful" },
  { value: MEDIA_TYPES.DOCUMENT, labelKey: "media.typeDocument" },
  { value: MEDIA_TYPES.EXTERNAL_LINK, labelKey: "media.typeExternalLink" },
];

function ToggleField({ id, label, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 rounded-lg border border-ecaa-border/80 bg-ecaa-cream/40 px-4 py-3"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4"
      />
      <span className="text-sm font-medium text-ecaa-ink">{label}</span>
    </label>
  );
}

function revokeBlobUrl(url) {
  if (url?.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

function buildMediaPayload(draft, finalImageUrl) {
  return {
    title: draft.title || "",
    caption: draft.caption || null,
    type: draft.type || MEDIA_TYPES.IMAGE,
    url: draft.url || null,
    image_url: finalImageUrl || null,
    alt_text: draft.altText || draft.title || "ECAA media image",
    related_event_id: cleanUuid(draft.relatedEventId),
    category: draft.category || "community",
    content_am: buildMediaContentAmFromDraft(draft),
    featured: draft.featured === true,
    visible: draft.visible !== false,
    display_order: Number(draft.displayOrder) || 999,
  };
}

export default function AdminMedia() {
  const { adminT } = useAdminLanguage();
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState(null);
  const [editorLang, setEditorLang] = useState("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const imageFileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState("");
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");
  const [setupMessage, setSetupMessage] = useState("");

  useEffect(() => {
    fetchMediaItemsAdminState().then((result) => {
      setItems(result.items);
      setSetupMessage(result.setupMessage || "");
      setLoading(false);
    });
  }, []);

  const startNew = () => {
    setDraft({
      ...normalizeMediaItem({
        id: `local-media-${Date.now()}`,
        localOnly: true,
        title: "",
        type: MEDIA_TYPES.IMAGE,
        visible: true,
        featured: false,
        display_order: 999,
        related_event_id: null,
      }),
      content_am: {
        title: "",
        caption: "",
        alt_text: "",
        category: "",
        button_label: "",
      },
    });
    setEditorLang("en");
    setSelectedImageFile(null);
    revokeBlobUrl(imagePreviewUrl);
    setImagePreviewUrl("");
    setUploadError("");
    setMessage("");
    setWarning("");
    setError("");
  };

  const startEdit = (item) => {
    setDraft(mediaItemToDraft(item));
    setEditorLang("en");
    setSelectedImageFile(null);
    revokeBlobUrl(imagePreviewUrl);
    setImagePreviewUrl("");
    setUploadError("");
    setMessage("");
    setWarning("");
    setError("");
  };

  const updateDraft = (field, value) => setDraft((current) => ({ ...current, [field]: value }));

  const updateContentAm = (field, value) => {
    setDraft((current) => ({
      ...current,
      content_am: { ...(current.content_am || {}), [field]: value },
    }));
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedImageFile(file);
    setUploadError("");

    revokeBlobUrl(imagePreviewUrl);

    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setImagePreviewUrl("");
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!draft) return;
    setSaving(true);
    setUploadError("");
    setMessage("");
    setWarning("");
    setError("");

    try {
      if (!hasSupabaseConfig()) {
        throw new Error(
          "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to save media online."
        );
      }

      const draftImageUrl = (draft.imageUrl || "").trim();

      if (isBadPublishedImageUrl(draftImageUrl)) {
        throw new Error(adminT("media.invalidLocalImageError"));
      }

      if (draft.type === MEDIA_TYPES.YOUTUBE && !getYouTubeId(draft.url || "")) {
        throw new Error(adminT("media.invalidYoutubeError"));
      }

      let saveWarning = "";
      if (
        [MEDIA_TYPES.IMAGE, MEDIA_TYPES.GIF].includes(draft.type) &&
        !selectedImageFile &&
        !draftImageUrl
      ) {
        saveWarning = adminT("media.missingImageWarning");
      }

      let finalImageUrl = sanitizeStoredImageUrl(draft.imageUrl) || "";

      if (selectedImageFile) {
        finalImageUrl = await uploadToSupabaseStorage(
          selectedImageFile,
          draft.category?.toLowerCase().includes("flyer")
            ? "media-gallery/flyers"
            : "media-gallery/photos"
        );
        await verifyUploadedImageUrl(finalImageUrl);
      }

      assertPublishableImageUrl(finalImageUrl, Boolean(selectedImageFile));

      const payload = buildMediaPayload(draft, finalImageUrl);

      console.log("Saving media payload:", payload);

      const result =
        draft.id && isValidUuid(draft.id)
          ? await supabase.from("media_items").update(payload).eq("id", draft.id).select().single()
          : await supabase.from("media_items").insert(payload).select().single();

      if (result.error) {
        throw result.error;
      }

      console.log("Saved media row:", result.data);

      const refreshed = await fetchMediaItemsAdminState();
      setItems(refreshed.items);
      setSetupMessage(refreshed.setupMessage || "");
      setDraft(normalizeMediaItem(result.data));
      setSelectedImageFile(null);
      revokeBlobUrl(imagePreviewUrl);
      setImagePreviewUrl("");
      if (imageFileInputRef.current) {
        imageFileInputRef.current.value = "";
      }
      setWarning(saveWarning);
      setMessage(adminT("messages.mediaSaved"));
    } catch (saveError) {
      console.error("Media save failed:", saveError);
      const errorMessage = saveError?.message || "Could not save media item to Supabase.";
      setUploadError(errorMessage);
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!draft?.id || !window.confirm(adminT("media.deleteConfirm"))) return;
    try {
      if (!hasSupabaseConfig()) {
        throw new Error(
          "Supabase is not configured. Media cannot be deleted online until Supabase is connected."
        );
      }
      if (!isValidUuid(draft.id)) {
        setError("This item is local-only and cannot be deleted from Supabase.");
        return;
      }
      await deleteMediaItem(draft.id);
      const refreshed = await fetchMediaItemsAdminState();
      setItems(refreshed.items);
      setSetupMessage(refreshed.setupMessage || "");
      setDraft(null);
      setMessage(adminT("messages.mediaDeleted"));
    } catch (deleteError) {
      setError(deleteError?.message || "Could not delete media item.");
    }
  };

  if (loading) return <p className="text-ecaa-ink-muted">{adminT("media.loading")}</p>;

  if (draft) {
    return (
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => setDraft(null)}
          className="text-sm font-medium text-ecaa-green-800"
        >
          {adminT("media.backToList")}
        </button>
        <h1 className="mt-2 text-2xl font-semibold text-ecaa-ink">{adminT("media.editItem")}</h1>
        <p className="mt-2 text-sm text-ecaa-ink-muted">{adminT("media.homepageHelper")}</p>

        <AdminSetupNotice message={setupMessage} />

        {message && (
          <p className="mt-4 rounded-lg border border-ecaa-green-200 bg-ecaa-green-50 px-4 py-3 text-sm">
            {message}
          </p>
        )}
        {warning && (
          <p className="mt-4 rounded-lg border border-ecaa-gold-200 bg-ecaa-gold-50 px-4 py-3 text-sm text-ecaa-ink-muted">
            {warning}
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}

        <form onSubmit={handleSave} className="mt-6 space-y-6">
          <EditorContentTabs value={editorLang} onChange={setEditorLang} />

          {editorLang === "en" ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  id="media-title"
                  label={adminT("forms.title")}
                  value={draft.title}
                  onChange={(e) => updateDraft("title", e.target.value)}
                  required
                />
                <FormSelect
                  id="media-type"
                  label={adminT("common.type")}
                  value={draft.type}
                  onChange={(e) => updateDraft("type", e.target.value)}
                >
                  {TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {adminT(option.labelKey)}
                    </option>
                  ))}
                </FormSelect>
                <FormInput
                  id="media-url"
                  label={adminT("forms.url")}
                  value={draft.url}
                  onChange={(e) => updateDraft("url", e.target.value)}
                  className="sm:col-span-2"
                  hint={
                    draft.type === MEDIA_TYPES.YOUTUBE ? adminT("media.youtubeUrlHint") : undefined
                  }
                />
                <FormInput
                  id="media-image-url"
                  label={adminT("forms.imageUrl")}
                  value={draft.imageUrl}
                  onChange={(e) => updateDraft("imageUrl", e.target.value)}
                  hint={adminT("media.imageUrlHint")}
                />
                <FormInput
                  id="media-alt"
                  label={adminT("forms.altText")}
                  hint={ALT_TEXT_HINT}
                  value={draft.altText}
                  onChange={(e) => updateDraft("altText", e.target.value)}
                />
                <FormInput
                  id="media-related-event"
                  label={adminT("media.relatedEventId")}
                  value={draft.relatedEventId || ""}
                  onChange={(e) => updateDraft("relatedEventId", e.target.value)}
                  placeholder="Leave blank unless you have a real event UUID"
                />
                <FormInput
                  id="media-category"
                  label={adminT("forms.category")}
                  value={draft.category}
                  onChange={(e) => updateDraft("category", e.target.value)}
                />
                <FormInput
                  id="media-order"
                  label={adminT("forms.displayOrder")}
                  type="number"
                  value={draft.displayOrder}
                  onChange={(e) => updateDraft("displayOrder", Number(e.target.value))}
                />
              </div>

              <FormTextarea
                id="media-caption"
                label={adminT("forms.caption")}
                rows={3}
                value={draft.caption}
                onChange={(e) => updateDraft("caption", e.target.value)}
              />

              <div>
                <label
                  htmlFor="media-upload"
                  className="mb-1.5 block text-sm font-medium text-ecaa-ink"
                >
                  {adminT("media.uploadImageFile")}
                </label>
                <input
                  ref={imageFileInputRef}
                  id="media-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageFileChange}
                  className="block w-full text-sm text-ecaa-ink-muted file:mr-3 file:rounded-lg file:border-0 file:bg-ecaa-green-900 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-ecaa-white hover:file:bg-ecaa-green-800"
                />
                <p className="mt-1.5 text-xs text-ecaa-ink-subtle">
                  {adminT("media.uploadHintImage")}
                </p>
              </div>
              {selectedImageFile && (
                <p className="text-sm text-ecaa-ink-muted">
                  Selected file: {selectedImageFile.name} (will upload to Supabase when you save)
                </p>
              )}
              {(imagePreviewUrl || draft.imageUrl) && (
                <img
                  src={
                    imagePreviewUrl ||
                    getDirectImageUrl(resolvePublicImageUrl(draft.imageUrl) || draft.imageUrl)
                  }
                  alt={draft.altText || draft.title || "Media preview"}
                  className="mt-3 max-h-48 rounded-ecaa-lg border border-ecaa-border/70 object-contain"
                />
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <ToggleField
                  id="media-visible"
                  label={adminT("forms.visibleOnWebsite")}
                  checked={draft.visible !== false}
                  onChange={(v) => updateDraft("visible", v)}
                />
                <ToggleField
                  id="media-featured"
                  label={adminT("forms.featuredOnHomepage")}
                  checked={draft.featured === true}
                  onChange={(v) => updateDraft("featured", v)}
                />
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-ecaa-ink-muted">{adminT("media.amharicHelper")}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  id="media-am-title"
                  label={adminT("media.amharicTitle")}
                  value={draft.content_am?.title || ""}
                  onChange={(e) => updateContentAm("title", e.target.value)}
                />
                <FormInput
                  id="media-am-category"
                  label={adminT("media.amharicCategory")}
                  value={draft.content_am?.category || ""}
                  onChange={(e) => updateContentAm("category", e.target.value)}
                />
                <FormInput
                  id="media-am-alt"
                  label={adminT("media.amharicAltText")}
                  value={draft.content_am?.alt_text || ""}
                  onChange={(e) => updateContentAm("alt_text", e.target.value)}
                  className="sm:col-span-2"
                />
                <FormInput
                  id="media-am-button"
                  label={adminT("media.amharicButtonLabel")}
                  value={draft.content_am?.button_label || ""}
                  onChange={(e) => updateContentAm("button_label", e.target.value)}
                  className="sm:col-span-2"
                />
              </div>
              <FormTextarea
                id="media-am-caption"
                label={adminT("media.amharicCaption")}
                rows={3}
                value={draft.content_am?.caption || ""}
                onChange={(e) => updateContentAm("caption", e.target.value)}
              />
            </>
          )}

          {uploadError && (
            <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
              {uploadError}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <SaveButton loading={saving} savingText={adminT("common.saving")}>
              {adminT("media.saveItem")}
            </SaveButton>
            {draft.id && isValidUuid(draft.id) && (
              <button type="button" onClick={handleDelete} className="btn btn-secondary btn-sm">
                {adminT("media.deleteItem")}
              </button>
            )}
            <button type="button" onClick={() => setDraft(null)} className="btn btn-ghost btn-sm">
              {adminT("common.cancel")}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ecaa-ink">{adminT("media.title")}</h1>
          <p className="mt-1 text-sm text-ecaa-ink-muted">{adminT("media.description")}</p>
          <p className="mt-2 text-sm text-ecaa-ink-muted">{adminT("media.homepageHelper")}</p>
        </div>
        <button type="button" onClick={startNew} className="btn btn-primary btn-sm">
          {adminT("media.addItem")}
        </button>
      </div>

      <AdminSetupNotice message={setupMessage} />

      <div className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-ecaa-cream/60 text-xs uppercase tracking-wide text-ecaa-ink-subtle">
            <tr>
              <th className="px-4 py-3">{adminT("forms.title")}</th>
              <th className="px-4 py-3">{adminT("common.type")}</th>
              <th className="px-4 py-3">{adminT("common.visible")}</th>
              <th className="px-4 py-3">{adminT("common.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ecaa-border/60">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-ecaa-ink-muted">
                  {adminT("media.emptyList")}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 font-medium text-ecaa-green-950">{item.title}</td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={
                        item.visible !== false ? adminT("common.visible") : adminT("common.hidden")
                      }
                      variant={item.visible !== false ? "live" : "soon"}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="font-semibold text-ecaa-green-800"
                    >
                      {adminT("common.edit")}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
