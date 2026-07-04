import { useEffect, useRef, useState } from "react";
import FormInput from "../../components/admin/FormInput";
import FormTextarea from "../../components/admin/FormTextarea";
import FormSelect from "../../components/admin/FormSelect";
import SaveButton from "../../components/admin/SaveButton";
import StatusBadge from "../../components/admin/StatusBadge";
import { useAdminLanguage } from "../../context/AdminLanguageContext";
import {
  uploadToSupabaseStorage,
  verifyUploadedImageUrl,
} from "../../utils/uploadToSupabaseStorage";
import {
  assertPublishableImageUrl,
  isBadPublishedImageUrl,
} from "../../utils/imageUploadValidation";
import { ALT_TEXT_HINT } from "../../utils/altText";
import { getDirectImageUrl } from "../../utils/mediaUrl";
import { sanitizeStoredImageUrl, resolvePublicImageUrl } from "../../lib/uploadMedia";
import {
  EVENT_STATUS,
  fetchEventsForAdmin,
  normalizeEvent,
  saveEvent,
  deleteEvent,
} from "../../utils/events";
import { slugifyTitle } from "../../utils/programs";

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

export default function AdminEvents() {
  const { adminT } = useAdminLanguage();
  const [events, setEvents] = useState([]);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedPosterFile, setSelectedPosterFile] = useState(null);
  const [posterPreviewUrl, setPosterPreviewUrl] = useState("");
  const posterFileInputRef = useRef(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState("");
  const coverFileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const statusOptions = [
    { value: EVENT_STATUS.UPCOMING, label: adminT("events.statusUpcoming") },
    { value: EVENT_STATUS.ANNOUNCEMENT, label: adminT("events.statusAnnouncement") },
    { value: EVENT_STATUS.COMMUNITY_NEWS, label: adminT("events.statusCommunityNews") },
    { value: EVENT_STATUS.PAST, label: adminT("events.statusPast") },
  ];

  useEffect(() => {
    fetchEventsForAdmin().then((items) => {
      setEvents(items);
      setLoading(false);
    });
  }, []);

  const startNew = () => {
    setDraft(
      normalizeEvent({
        slug: "",
        title: "",
        status: EVENT_STATUS.UPCOMING,
        visible: true,
        featured: false,
        display_order: 999,
      })
    );
    setUploadError("");
    setMessage("");
    setError("");
    setSelectedPosterFile(null);
    revokeBlobUrl(posterPreviewUrl);
    setPosterPreviewUrl("");
    setSelectedCoverFile(null);
    revokeBlobUrl(coverPreviewUrl);
    setCoverPreviewUrl("");
  };

  const startEdit = (event) => {
    setDraft({ ...event });
    setUploadError("");
    setMessage("");
    setError("");
    setSelectedPosterFile(null);
    revokeBlobUrl(posterPreviewUrl);
    setPosterPreviewUrl("");
    setSelectedCoverFile(null);
    revokeBlobUrl(coverPreviewUrl);
    setCoverPreviewUrl("");
  };

  const updateDraft = (field, value) => setDraft((current) => ({ ...current, [field]: value }));

  const handlePosterFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedPosterFile(file);
    setUploadError("");

    revokeBlobUrl(posterPreviewUrl);

    if (file) {
      setPosterPreviewUrl(URL.createObjectURL(file));
    } else {
      setPosterPreviewUrl("");
    }
  };

  const handleCoverFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedCoverFile(file);
    setUploadError("");

    revokeBlobUrl(coverPreviewUrl);

    if (file) {
      setCoverPreviewUrl(URL.createObjectURL(file));
    } else {
      setCoverPreviewUrl("");
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!draft) return;
    setSaving(true);
    setUploadError("");
    setMessage("");
    setError("");

    const slug = draft.slug?.trim() || slugifyTitle(draft.title);

    try {
      const draftImageUrl = (draft.imageUrl || "").trim();
      const draftCoverImageUrl = (draft.coverImageUrl || "").trim();

      if (isBadPublishedImageUrl(draftImageUrl)) {
        throw new Error(adminT("media.invalidLocalImageError"));
      }

      if (isBadPublishedImageUrl(draftCoverImageUrl)) {
        throw new Error(adminT("media.invalidLocalImageError"));
      }

      let finalImageUrl = sanitizeStoredImageUrl(draft.imageUrl) || "";

      if (selectedPosterFile) {
        finalImageUrl = await uploadToSupabaseStorage(selectedPosterFile, "events/event-images");
        await verifyUploadedImageUrl(finalImageUrl);
      }

      assertPublishableImageUrl(finalImageUrl, Boolean(selectedPosterFile));

      let finalCoverImageUrl = sanitizeStoredImageUrl(draft.coverImageUrl) || "";

      if (selectedCoverFile) {
        finalCoverImageUrl = await uploadToSupabaseStorage(selectedCoverFile, "events/cover-images");
        await verifyUploadedImageUrl(finalCoverImageUrl);
      }

      if (selectedCoverFile) {
        assertPublishableImageUrl(finalCoverImageUrl, true);
      }

      const payload = {
        ...draft,
        slug,
        imageUrl: finalImageUrl || "",
        imageAlt: draft.imageAlt || draft.title || "ECAA event image",
        coverImageUrl: finalCoverImageUrl || "",
        coverImageAlt:
          draft.coverImageAlt || draft.imageAlt || draft.title || "ECAA event cover image",
      };

      const saved = await saveEvent(payload);
      const refreshed = await fetchEventsForAdmin();
      setEvents(refreshed);
      setDraft(saved);
      setSelectedPosterFile(null);
      revokeBlobUrl(posterPreviewUrl);
      setPosterPreviewUrl("");
      if (posterFileInputRef.current) {
        posterFileInputRef.current.value = "";
      }
      setSelectedCoverFile(null);
      revokeBlobUrl(coverPreviewUrl);
      setCoverPreviewUrl("");
      if (coverFileInputRef.current) {
        coverFileInputRef.current.value = "";
      }
      setMessage(adminT("messages.eventSaved"));
    } catch (saveError) {
      console.error("Event save failed:", saveError);
      const errorMessage = saveError?.message || adminT("messages.eventSaveError");
      setUploadError(errorMessage);
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!draft?.slug || !window.confirm(adminT("events.deleteConfirm"))) return;
    try {
      await deleteEvent(draft.slug);
      const refreshed = await fetchEventsForAdmin();
      setEvents(refreshed);
      setDraft(null);
      setMessage(adminT("messages.eventDeleted"));
    } catch (deleteError) {
      setError(deleteError?.message || adminT("messages.eventDeleteError"));
    }
  };

  if (loading) return <p className="text-ecaa-ink-muted">{adminT("events.loading")}</p>;

  if (draft) {
    return (
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => setDraft(null)}
          className="text-sm font-medium text-ecaa-green-800"
        >
          {adminT("events.backToList")}
        </button>
        <h1 className="mt-2 text-2xl font-semibold text-ecaa-ink">{adminT("events.editEvent")}</h1>
        <p className="mt-2 text-sm text-ecaa-ink-muted">{adminT("events.homepageHelper")}</p>

        {message && (
          <p className="mt-4 rounded-lg border border-ecaa-green-200 bg-ecaa-green-50 px-4 py-3 text-sm">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}

        <form onSubmit={handleSave} className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              id="event-title"
              label={adminT("forms.title")}
              value={draft.title}
              onChange={(e) => updateDraft("title", e.target.value)}
              required
            />
            <FormInput
              id="event-slug"
              label={adminT("forms.slug")}
              value={draft.slug}
              onChange={(e) => updateDraft("slug", e.target.value)}
            />
            <FormSelect
              id="event-status"
              label={adminT("forms.status")}
              value={draft.status}
              onChange={(e) => updateDraft("status", e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormSelect>
            <FormInput
              id="event-category"
              label={adminT("forms.category")}
              value={draft.category}
              onChange={(e) => updateDraft("category", e.target.value)}
            />
            <FormInput
              id="event-date"
              label={adminT("events.eventDate")}
              value={draft.eventDate}
              onChange={(e) => updateDraft("eventDate", e.target.value)}
            />
            <FormInput
              id="event-time"
              label={adminT("events.eventTime")}
              value={draft.eventTime}
              onChange={(e) => updateDraft("eventTime", e.target.value)}
            />
            <FormInput
              id="event-location"
              label={adminT("events.location")}
              value={draft.location}
              onChange={(e) => updateDraft("location", e.target.value)}
              className="sm:col-span-2"
            />
          </div>

          <FormTextarea
            id="event-excerpt"
            label={adminT("events.excerpt")}
            rows={3}
            value={draft.excerpt}
            onChange={(e) => updateDraft("excerpt", e.target.value)}
          />
          <FormTextarea
            id="event-description"
            label={adminT("forms.fullDescription")}
            rows={4}
            value={draft.description}
            onChange={(e) => updateDraft("description", e.target.value)}
          />

          <section className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6">
            <h2 className="text-lg font-semibold text-ecaa-green-950">
              {adminT("events.mainImageSection")}
            </h2>
            <p className="mt-1 text-sm text-ecaa-ink-muted">{adminT("events.mainImageSectionHint")}</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FormInput
                id="event-image"
                label={adminT("events.eventPosterUrl")}
                value={draft.imageUrl}
                onChange={(e) => updateDraft("imageUrl", e.target.value)}
                hint={adminT("events.eventPosterHint")}
              />
              <FormInput
                id="event-image-alt"
                label={adminT("forms.imageAlt")}
                hint={ALT_TEXT_HINT}
                value={draft.imageAlt}
                onChange={(e) => updateDraft("imageAlt", e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="event-image-upload"
                className="mb-1.5 block text-sm font-medium text-ecaa-ink"
              >
                {adminT("events.uploadEventPoster")}
              </label>
              <input
                ref={posterFileInputRef}
                id="event-image-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handlePosterFileChange}
                className="block w-full text-sm text-ecaa-ink-muted file:mr-3 file:rounded-lg file:border-0 file:bg-ecaa-green-900 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-ecaa-white hover:file:bg-ecaa-green-800"
              />
              <p className="mt-1.5 text-xs text-ecaa-ink-subtle">
                {adminT("events.uploadPosterHint")}
              </p>
            </div>

            {selectedPosterFile && (
              <p className="mt-3 text-sm text-ecaa-ink-muted">
                Selected poster: {selectedPosterFile.name} (will upload to Supabase when you save)
              </p>
            )}

            {(posterPreviewUrl || draft.imageUrl) && (
              <img
                src={
                  posterPreviewUrl ||
                  getDirectImageUrl(resolvePublicImageUrl(draft.imageUrl) || draft.imageUrl)
                }
                alt={draft.imageAlt || draft.title || "Event poster preview"}
                className="mt-4 max-h-56 rounded-ecaa-lg border border-ecaa-border/70 object-contain"
              />
            )}
          </section>

          <section className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-cream/30 p-5 shadow-ecaa-sm sm:p-6">
            <h2 className="text-lg font-semibold text-ecaa-green-950">
              {adminT("events.coverImageSection")}
            </h2>
            <p className="mt-1 text-sm text-ecaa-ink-muted">{adminT("events.coverImageSectionHint")}</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FormInput
                id="event-cover-image"
                label={adminT("events.coverImageUrl")}
                value={draft.coverImageUrl || ""}
                onChange={(e) => updateDraft("coverImageUrl", e.target.value)}
                hint={adminT("events.coverImageUrlHint")}
              />
              <FormInput
                id="event-cover-image-alt"
                label={adminT("events.coverImageAlt")}
                hint={ALT_TEXT_HINT}
                value={draft.coverImageAlt || ""}
                onChange={(e) => updateDraft("coverImageAlt", e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="event-cover-image-upload"
                className="mb-1.5 block text-sm font-medium text-ecaa-ink"
              >
                {adminT("events.uploadCoverImage")}
              </label>
              <input
                ref={coverFileInputRef}
                id="event-cover-image-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleCoverFileChange}
                className="block w-full text-sm text-ecaa-ink-muted file:mr-3 file:rounded-lg file:border-0 file:bg-ecaa-green-900 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-ecaa-white hover:file:bg-ecaa-green-800"
              />
            </div>

            {selectedCoverFile && (
              <p className="mt-3 text-sm text-ecaa-ink-muted">
                Selected cover: {selectedCoverFile.name} (will upload to Supabase when you save)
              </p>
            )}

            {(coverPreviewUrl || draft.coverImageUrl) && (
              <img
                src={
                  coverPreviewUrl ||
                  getDirectImageUrl(resolvePublicImageUrl(draft.coverImageUrl) || draft.coverImageUrl)
                }
                alt={draft.coverImageAlt || draft.title || "Event cover preview"}
                className="mt-4 max-h-56 rounded-ecaa-lg border border-ecaa-border/70 object-contain"
              />
            )}
          </section>

          {draft.eventbriteLink &&
            !draft.imageUrl &&
            !draft.coverImageUrl &&
            !selectedPosterFile &&
            !selectedCoverFile && (
            <p className="rounded-lg border border-ecaa-gold-200 bg-ecaa-gold-50 px-4 py-3 text-sm text-ecaa-ink-muted">
              {adminT("events.eventbriteCoverWarning")}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              id="event-eventbrite"
              label={adminT("events.eventbriteLink")}
              value={draft.eventbriteLink}
              onChange={(e) => updateDraft("eventbriteLink", e.target.value)}
            />
            <FormInput
              id="event-google-form"
              label={adminT("events.googleFormLink")}
              value={draft.googleFormLink}
              onChange={(e) => updateDraft("googleFormLink", e.target.value)}
            />
            <FormInput
              id="event-registration-form-slug"
              label={adminT("events.registrationFormSlug")}
              value={draft.registrationFormSlug || ""}
              onChange={(e) => updateDraft("registrationFormSlug", e.target.value)}
              hint={adminT("events.registrationFormSlugHint")}
            />
            <FormInput
              id="event-partiful"
              label={adminT("events.partifulLink")}
              value={draft.partifulLink}
              onChange={(e) => updateDraft("partifulLink", e.target.value)}
            />
            <FormInput
              id="event-youtube"
              label={adminT("events.youtubeLink")}
              value={draft.youtubeLink}
              onChange={(e) => updateDraft("youtubeLink", e.target.value)}
            />
            <FormInput
              id="event-link"
              label={adminT("events.generalLink")}
              value={draft.link}
              onChange={(e) => updateDraft("link", e.target.value)}
            />
            <FormInput
              id="event-order"
              label={adminT("forms.displayOrder")}
              type="number"
              value={draft.displayOrder}
              onChange={(e) => updateDraft("displayOrder", Number(e.target.value))}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ToggleField
              id="event-visible"
              label={adminT("forms.visibleOnWebsite")}
              checked={draft.visible !== false}
              onChange={(v) => updateDraft("visible", v)}
            />
            <ToggleField
              id="event-featured"
              label={adminT("forms.featuredOnHomepage")}
              checked={draft.featured === true}
              onChange={(v) => updateDraft("featured", v)}
            />
          </div>

          {uploadError && (
            <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
              {uploadError}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <SaveButton loading={saving} savingText={adminT("common.saving")}>
              {adminT("events.saveEvent")}
            </SaveButton>
            {draft.slug && (
              <button type="button" onClick={handleDelete} className="btn btn-secondary btn-sm">
                {adminT("events.deleteEvent")}
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
          <h1 className="text-2xl font-semibold text-ecaa-ink">{adminT("events.title")}</h1>
          <p className="mt-1 text-sm text-ecaa-ink-muted">{adminT("events.description")}</p>
          <p className="mt-2 text-sm text-ecaa-ink-muted">{adminT("events.homepageHelper")}</p>
        </div>
        <button type="button" onClick={startNew} className="btn btn-primary btn-sm">
          {adminT("events.addEvent")}
        </button>
      </div>

      <div className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-ecaa-cream/60 text-xs uppercase tracking-wide text-ecaa-ink-subtle">
            <tr>
              <th className="px-4 py-3">{adminT("forms.title")}</th>
              <th className="px-4 py-3">{adminT("forms.status")}</th>
              <th className="px-4 py-3">{adminT("common.visible")}</th>
              <th className="px-4 py-3">{adminT("common.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ecaa-border/60">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-4 py-3 font-medium text-ecaa-green-950">{event.title}</td>
                <td className="px-4 py-3 capitalize">{event.status}</td>
                <td className="px-4 py-3">
                  <StatusBadge
                    label={
                      event.visible !== false ? adminT("common.visible") : adminT("common.hidden")
                    }
                    variant={event.visible !== false ? "live" : "soon"}
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => startEdit(event)}
                    className="font-semibold text-ecaa-green-800"
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
