import { useEffect, useMemo, useState } from "react";
import FormInput from "../../components/admin/FormInput";
import FormTextarea from "../../components/admin/FormTextarea";
import FormSelect from "../../components/admin/FormSelect";
import SaveButton from "../../components/admin/SaveButton";
import ImageUpload from "../../components/admin/ImageUpload";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminSetupNotice from "../../components/admin/AdminSetupNotice";
import LeadershipBubble from "../../components/leadership/LeadershipBubble";
import EditorContentTabs from "../../components/admin/EditorContentTabs";
import { useAdminLanguage } from "../../context/AdminLanguageContext";
import { leadershipAmharicFallbackByName } from "../../data/leadershipAmharicFallback";
import { LEADERSHIP_COMMITTEE_OPTIONS } from "../../data/leadership";
import { uploadFolders } from "../../config/assets";
import { hasSupabaseConfig } from "../../lib/supabaseClient";
import { ALT_TEXT_HINT } from "../../utils/altText";
import { isValidUuid } from "../../utils/uuid";
import { slugifyTitle } from "../../utils/programs";
import { InvalidUuidForDeleteError } from "../../utils/adminAuth";
import {
  createEmptyLeadershipMember,
  fetchLeadershipForAdmin,
  hideLeadershipMember,
  normalizeLeadershipMember,
  saveLeadershipMember,
} from "../../utils/leadership";
import {
  applyLeadershipMemberLocale,
  buildLeadershipContentAmFromDraft,
} from "../../utils/leadershipLocale";

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

function SectionCard({ title, description, children }) {
  return (
    <section className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-ecaa-green-950">{title}</h2>
        {description && <p className="mt-1 text-sm text-ecaa-ink-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function leadershipMemberToDraft(member) {
  const fallback = leadershipAmharicFallbackByName[member.name?.trim()] || {};
  const stored = member.content_am || {};

  return {
    ...member,
    content_am: {
      name: stored.name || fallback.name || "",
      role: stored.role || fallback.role || "",
      committee: stored.committee || fallback.committee || "",
      bio: stored.bio || fallback.bio || "",
      image_alt: stored.imageAlt || stored.image_alt || fallback.image_alt || "",
    },
  };
}

export default function AdminLeadership() {
  const { adminT } = useAdminLanguage();
  const [members, setMembers] = useState([]);
  const [draft, setDraft] = useState(null);
  const [editorLang, setEditorLang] = useState("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const setupMessage = hasSupabaseConfig() ? "" : adminT("leadership.supabaseNotice");

  useEffect(() => {
    fetchLeadershipForAdmin().then((items) => {
      setMembers(items);
      setLoading(false);
    });
  }, []);

  const previewMember = useMemo(() => {
    if (!draft) return null;
    const normalized = normalizeLeadershipMember({
      ...draft,
      content_am: buildLeadershipContentAmFromDraft(draft),
    });
    return editorLang === "am" ? applyLeadershipMemberLocale(normalized, "am") : normalized;
  }, [draft, editorLang]);

  const startNew = () => {
    setDraft({
      ...createEmptyLeadershipMember(),
      content_am: {
        name: "",
        role: "",
        committee: "",
        bio: "",
        image_alt: "",
      },
    });
    setEditorLang("en");
    setMessage("");
    setError("");
  };

  const startEdit = (member) => {
    setDraft(leadershipMemberToDraft(member));
    setEditorLang("en");
    setMessage("");
    setError("");
  };

  const updateDraft = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleImageUpload = (url) => {
    if (url) updateDraft("imageUrl", url);
    setMessage(adminT("messages.photoUpdated"));
  };

  const updateContentAm = (field, value) => {
    setDraft((current) => ({
      ...current,
      content_am: { ...(current.content_am || {}), [field]: value },
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!draft) return;

    setSaving(true);
    setMessage("");
    setError("");

    const slug = draft.slug?.trim() || slugifyTitle(draft.name);
    const payload = {
      ...draft,
      slug,
      content_am: buildLeadershipContentAmFromDraft(draft),
    };

    try {
      if (!hasSupabaseConfig()) {
        throw new Error(
          "Supabase is not configured. Leadership members cannot be saved online yet."
        );
      }
      const isNew = !isValidUuid(draft.id);
      await saveLeadershipMember(payload);
      const refreshed = await fetchLeadershipForAdmin();
      setMembers(refreshed);
      if (isNew) {
        setDraft(null);
      } else {
        const saved = refreshed.find((member) => member.id === draft.id);
        if (saved) setDraft(leadershipMemberToDraft(saved));
      }
      setMessage(adminT("messages.leadershipSaved"));
    } catch (saveError) {
      setError(saveError?.message || "Could not save leadership member to Supabase.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveFromSite = async () => {
    if (!draft?.id || !window.confirm(adminT("leadership.removeFromSiteConfirm"))) return;

    if (!isValidUuid(draft.id)) {
      setError(adminT("common.invalidUuidDelete"));
      return;
    }

    setDeleting(true);
    setError("");
    setMessage("");

    try {
      if (!hasSupabaseConfig()) {
        throw new Error(
          "Supabase is not configured. Leadership members cannot be removed online yet."
        );
      }

      await hideLeadershipMember(draft.id);
      const refreshed = await fetchLeadershipForAdmin();
      setMembers(refreshed.filter((member) => member.visible !== false && member.active !== false));
      setDraft(null);
      setMessage(adminT("messages.leadershipDeleted"));
    } catch (removeError) {
      console.error("Remove leadership member failed:", removeError);
      if (removeError instanceof InvalidUuidForDeleteError) {
        setError(adminT("common.invalidUuidDelete"));
      } else {
        setError(removeError?.message || adminT("common.deleteError"));
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="text-ecaa-ink-muted">{adminT("leadership.loading")}</p>;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ecaa-ink">
            {adminT("leadership.title")}
          </h1>
          <p className="mt-1 text-sm text-ecaa-ink-muted">{adminT("leadership.description")}</p>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="rounded-lg bg-ecaa-green-900 px-4 py-2.5 text-sm font-semibold text-ecaa-white transition-colors hover:bg-ecaa-green-800"
        >
          {adminT("common.addMember")}
        </button>
      </div>

      <AdminSetupNotice message={setupMessage} />

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-4 shadow-ecaa-sm">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-ecaa-ink-subtle">
            {adminT("common.members")}
          </h2>
          <ul className="space-y-2">
            {members.map((member) => (
              <li key={member.id}>
                <button
                  type="button"
                  onClick={() => startEdit(member)}
                  className={`w-full rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                    draft?.id === member.id
                      ? "border-ecaa-green-700 bg-ecaa-green-50"
                      : "border-ecaa-border bg-ecaa-cream/40 hover:bg-ecaa-cream"
                  }`}
                >
                  <span className="block font-medium text-ecaa-ink">{member.name}</span>
                  <span className="mt-0.5 block text-xs text-ecaa-ink-subtle">{member.role}</span>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {!member.visible && (
                      <StatusBadge label={adminT("common.hidden")} variant="draft" />
                    )}
                    {member.featured && (
                      <StatusBadge label={adminT("common.featured")} variant="live" />
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-6">
          {!draft ? (
            <div className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-8 text-center shadow-ecaa-sm">
              <p className="text-ecaa-ink-muted">{adminT("leadership.selectMember")}</p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              <EditorContentTabs value={editorLang} onChange={setEditorLang} />

              <SectionCard
                title={adminT("leadership.livePreview")}
                description={adminT("leadership.previewHelper")}
              >
                <div className="mx-auto max-w-xs">
                  {previewMember && (
                    <LeadershipBubble
                      member={previewMember}
                      committee={previewMember.committee}
                      preview
                    />
                  )}
                </div>
              </SectionCard>

              <SectionCard title={adminT("leadership.profileDetails")}>
                {editorLang === "en" ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormInput
                        id="leadership-name"
                        label={adminT("leadership.name")}
                        value={draft.name}
                        onChange={(event) => updateDraft("name", event.target.value)}
                        required
                      />
                      <FormInput
                        id="leadership-role"
                        label={adminT("leadership.role")}
                        value={draft.role}
                        onChange={(event) => updateDraft("role", event.target.value)}
                      />
                      <FormSelect
                        id="leadership-committee"
                        label={adminT("leadership.committee")}
                        value={draft.committee}
                        onChange={(event) => updateDraft("committee", event.target.value)}
                      >
                        {LEADERSHIP_COMMITTEE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </FormSelect>
                      <FormInput
                        id="leadership-display-order"
                        label={adminT("forms.displayOrder")}
                        type="number"
                        value={draft.displayOrder}
                        onChange={(event) =>
                          updateDraft("displayOrder", Number(event.target.value))
                        }
                      />
                    </div>

                    <div className="mt-4">
                      <FormTextarea
                        id="leadership-bio"
                        label={adminT("leadership.bio")}
                        rows={4}
                        value={draft.bio}
                        onChange={(event) => updateDraft("bio", event.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-4 text-sm text-ecaa-ink-muted">
                      {adminT("leadership.amharicHelper")}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormInput
                        id="leadership-am-name"
                        label={adminT("leadership.amharicName")}
                        value={draft.content_am?.name || ""}
                        onChange={(event) => updateContentAm("name", event.target.value)}
                      />
                      <FormInput
                        id="leadership-am-role"
                        label={adminT("leadership.amharicRole")}
                        value={draft.content_am?.role || ""}
                        onChange={(event) => updateContentAm("role", event.target.value)}
                      />
                      <FormInput
                        id="leadership-am-committee"
                        label={adminT("leadership.amharicCommittee")}
                        value={draft.content_am?.committee || ""}
                        onChange={(event) => updateContentAm("committee", event.target.value)}
                      />
                      <FormInput
                        id="leadership-am-image-alt"
                        label={adminT("leadership.amharicImageAlt")}
                        value={draft.content_am?.image_alt || ""}
                        onChange={(event) => updateContentAm("image_alt", event.target.value)}
                      />
                    </div>

                    <div className="mt-4">
                      <FormTextarea
                        id="leadership-am-bio"
                        label={adminT("leadership.amharicBio")}
                        rows={4}
                        value={draft.content_am?.bio || ""}
                        onChange={(event) => updateContentAm("bio", event.target.value)}
                      />
                    </div>
                  </>
                )}
              </SectionCard>

              {editorLang === "en" && (
                <>
                  <SectionCard
                    title={adminT("leadership.photo")}
                    description={adminT("leadership.photoDescription")}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormInput
                        id="leadership-image-url"
                        label={adminT("forms.imageUrl")}
                        value={draft.imageUrl}
                        onChange={(event) => updateDraft("imageUrl", event.target.value)}
                        hint={adminT("leadership.imageUrlHint")}
                      />
                      <FormInput
                        id="leadership-image-alt"
                        label={adminT("forms.imageAlt")}
                        hint={ALT_TEXT_HINT}
                        value={draft.imageAlt}
                        onChange={(event) => updateDraft("imageAlt", event.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <ImageUpload
                        id="leadership-image-upload"
                        label={adminT("leadership.uploadProfilePhoto")}
                        uploadFolder={uploadFolders.leadershipProfiles}
                        hint={adminT("leadership.uploadHint")}
                        onUploaded={handleImageUpload}
                      />
                    </div>
                  </SectionCard>

                  <SectionCard title={adminT("leadership.contactInfo")}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormInput
                        id="leadership-email"
                        label={adminT("leadership.email")}
                        type="email"
                        value={draft.email}
                        onChange={(event) => updateDraft("email", event.target.value)}
                      />
                      <FormInput
                        id="leadership-phone"
                        label={adminT("leadership.phone")}
                        type="tel"
                        value={draft.phone}
                        onChange={(event) => updateDraft("phone", event.target.value)}
                      />
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <ToggleField
                        id="show-email"
                        label={adminT("leadership.showEmail")}
                        checked={draft.showEmail}
                        onChange={(value) => updateDraft("showEmail", value)}
                      />
                      <ToggleField
                        id="show-phone"
                        label={adminT("leadership.showPhone")}
                        checked={draft.showPhone}
                        onChange={(value) => updateDraft("showPhone", value)}
                      />
                    </div>
                  </SectionCard>

                  <SectionCard title={adminT("leadership.socialLinks")}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormInput
                        id="leadership-facebook"
                        label={adminT("leadership.facebookUrl")}
                        value={draft.facebookUrl}
                        onChange={(event) => updateDraft("facebookUrl", event.target.value)}
                      />
                      <FormInput
                        id="leadership-instagram"
                        label={adminT("leadership.instagramUrl")}
                        value={draft.instagramUrl}
                        onChange={(event) => updateDraft("instagramUrl", event.target.value)}
                      />
                      <FormInput
                        id="leadership-linkedin"
                        label={adminT("leadership.linkedinUrl")}
                        value={draft.linkedinUrl}
                        onChange={(event) => updateDraft("linkedinUrl", event.target.value)}
                      />
                      <FormInput
                        id="leadership-website"
                        label={adminT("leadership.websiteUrl")}
                        value={draft.websiteUrl}
                        onChange={(event) => updateDraft("websiteUrl", event.target.value)}
                      />
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <ToggleField
                        id="show-facebook"
                        label={adminT("leadership.showFacebook")}
                        checked={draft.showFacebook}
                        onChange={(value) => updateDraft("showFacebook", value)}
                      />
                      <ToggleField
                        id="show-instagram"
                        label={adminT("leadership.showInstagram")}
                        checked={draft.showInstagram}
                        onChange={(value) => updateDraft("showInstagram", value)}
                      />
                      <ToggleField
                        id="show-linkedin"
                        label={adminT("leadership.showLinkedin")}
                        checked={draft.showLinkedin}
                        onChange={(value) => updateDraft("showLinkedin", value)}
                      />
                      <ToggleField
                        id="show-website"
                        label={adminT("leadership.showWebsite")}
                        checked={draft.showWebsite}
                        onChange={(value) => updateDraft("showWebsite", value)}
                      />
                    </div>
                  </SectionCard>

                  <SectionCard title={adminT("leadership.visibility")}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <ToggleField
                        id="leadership-visible"
                        label={adminT("leadership.visibleOnPage")}
                        checked={draft.visible}
                        onChange={(value) => updateDraft("visible", value)}
                      />
                      <ToggleField
                        id="leadership-active"
                        label={adminT("leadership.activeMember")}
                        checked={draft.active}
                        onChange={(value) => updateDraft("active", value)}
                      />
                      <ToggleField
                        id="leadership-featured"
                        label={adminT("leadership.featuredPreview")}
                        checked={draft.featured}
                        onChange={(value) => updateDraft("featured", value)}
                      />
                    </div>
                  </SectionCard>
                </>
              )}

              <p className="rounded-lg border border-ecaa-red-200 bg-ecaa-red-50 px-4 py-3 text-sm text-ecaa-ink-muted">
                {adminT("leadership.privacyWarning")}
              </p>

              {message && <p className="text-sm font-medium text-ecaa-green-800">{message}</p>}
              {error && <p className="text-sm font-medium text-ecaa-red-700">{error}</p>}

              <div className="flex flex-wrap gap-3">
                <SaveButton saving={saving} savingText={adminT("common.saving")}>
                  {adminT("leadership.saveChanges")}
                </SaveButton>
                {isValidUuid(draft.id) && (
                  <button
                    type="button"
                    onClick={handleRemoveFromSite}
                    disabled={deleting}
                    aria-label={adminT("leadership.deleteMember")}
                    className="rounded-lg border border-ecaa-red-200 bg-ecaa-red-50 px-4 py-2.5 text-sm font-semibold text-ecaa-red-700 transition-colors hover:bg-ecaa-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deleting ? adminT("common.deleting") : adminT("leadership.deleteMember")}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
