import { useEffect, useState } from "react";
import FormInput from "../../components/admin/FormInput";
import FormTextarea from "../../components/admin/FormTextarea";
import SaveButton from "../../components/admin/SaveButton";
import ImageUpload from "../../components/admin/ImageUpload";
import AdminSetupNotice from "../../components/admin/AdminSetupNotice";
import EditorContentTabs from "../../components/admin/EditorContentTabs";
import { siteAssets } from "../../config/assets";
import { useAdminLanguage } from "../../context/AdminLanguageContext";
import { hasSupabaseConfig } from "../../lib/supabaseClient";
import { getFallbackHomepage } from "../../data/homepage";
import { getFallbackHomepageAmharic } from "../../data/homepageAmharic";
import { normalizeWebsiteRoute, normalizeHomepageSectionRoutes } from "../../utils/adminRoutes";
import { fetchHomepageForAdmin, saveAllHomepageSections } from "../../utils/homepageSections";

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
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-ecaa-border text-ecaa-green-800"
      />
      <span className="text-sm font-medium text-ecaa-ink">{label}</span>
    </label>
  );
}

function SectionCard({ title, description, helper, children }) {
  return (
    <section className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-ecaa-green-950">{title}</h2>
        {description && <p className="mt-1 text-sm text-ecaa-ink-muted">{description}</p>}
        {helper && (
          <p className="mt-3 rounded-lg border border-ecaa-green-200 bg-ecaa-green-50 px-4 py-3 text-sm text-ecaa-ink-muted">
            {helper}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function CtaLabelField({ prefix, label, data, onChange }) {
  return (
    <FormInput
      id={`${prefix}-label`}
      label={label}
      value={data?.label || ""}
      onChange={(event) => onChange("label", event.target.value)}
    />
  );
}

function CtaFields({ prefix, data, onChange, adminT }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormInput
        id={`${prefix}-label`}
        label={adminT("forms.buttonLabel")}
        value={data?.label || ""}
        onChange={(event) => onChange("label", event.target.value)}
      />
      <FormInput
        id={`${prefix}-href`}
        label={adminT("forms.buttonLink")}
        value={data?.href || ""}
        onChange={(event) => onChange("href", normalizeWebsiteRoute(event.target.value))}
        hint={adminT("forms.linkExample")}
      />
    </div>
  );
}

export default function AdminHome() {
  const { adminT } = useAdminLanguage();
  const [sections, setSections] = useState(getFallbackHomepage);
  const [sectionsAm, setSectionsAm] = useState(getFallbackHomepageAmharic);
  const [editorLang, setEditorLang] = useState("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHomepageForAdmin().then((data) => {
      setSections(normalizeHomepageSectionRoutes(data.sections));
      setSectionsAm(data.sectionsAm);
      setLoading(false);
    });
  }, []);

  const isAmEditor = editorLang === "am";

  const updateSectionAm = (key, updater) => {
    setSectionsAm((current) => ({
      ...current,
      [key]: typeof updater === "function" ? updater(current[key] || {}) : updater,
    }));
  };

  const updateNestedAm = (key, field, value) => {
    updateSectionAm(key, (section) => ({ ...section, [field]: value }));
  };

  const updateCtaAm = (sectionKey, ctaKey, field, value) => {
    updateSectionAm(sectionKey, (section) => ({
      ...section,
      [ctaKey]: { ...(section[ctaKey] || {}), [field]: value },
    }));
  };

  const updateEmptyStateAm = (sectionKey, field, value) => {
    updateSectionAm(sectionKey, (section) => ({
      ...section,
      emptyState: { ...(section.emptyState || {}), [field]: value },
    }));
  };

  const updateEmptyCtaAm = (sectionKey, field, value) => {
    updateSectionAm(sectionKey, (section) => ({
      ...section,
      emptyState: {
        ...(section.emptyState || {}),
        primaryCta: { ...(section.emptyState?.primaryCta || {}), [field]: value },
      },
    }));
  };

  const updateUseCaseAm = (index, value) => {
    updateSectionAm("bookHall", (section) => {
      const useCases = [...(section.useCases || [])];
      useCases[index] = value;
      return { ...section, useCases };
    });
  };

  const updateSection = (key, updater) => {
    setSections((current) => ({
      ...current,
      [key]: typeof updater === "function" ? updater(current[key]) : updater,
    }));
  };

  const updateNested = (key, field, value) => {
    updateSection(key, (section) => ({ ...section, [field]: value }));
  };

  const updateCta = (sectionKey, ctaKey, field, value) => {
    updateSection(sectionKey, (section) => ({
      ...section,
      [ctaKey]: { ...(section[ctaKey] || {}), [field]: value },
    }));
  };

  const updateEmptyState = (sectionKey, field, value) => {
    updateSection(sectionKey, (section) => ({
      ...section,
      emptyState: { ...(section.emptyState || {}), [field]: value },
    }));
  };

  const updateEmptyCta = (sectionKey, field, value) => {
    updateSection(sectionKey, (section) => ({
      ...section,
      emptyState: {
        ...(section.emptyState || {}),
        primaryCta: { ...(section.emptyState?.primaryCta || {}), [field]: value },
      },
    }));
  };

  const updateUseCase = (index, value) => {
    updateSection("bookHall", (section) => {
      const useCases = [...(section.useCases || [])];
      useCases[index] = value;
      return { ...section, useCases };
    });
  };

  const addUseCase = () => {
    updateSection("bookHall", (section) => ({
      ...section,
      useCases: [...(section.useCases || []), ""],
    }));
  };

  const removeUseCase = (index) => {
    updateSection("bookHall", (section) => ({
      ...section,
      useCases: (section.useCases || []).filter((_, i) => i !== index),
    }));
  };

  const updateFinalButton = (index, field, value) => {
    updateSection("finalCta", (section) => {
      const buttons = [...(section.buttons || [])];
      buttons[index] = { ...(buttons[index] || {}), [field]: value };
      return { ...section, buttons };
    });
  };

  const updateFinalButtonAm = (index, field, value) => {
    updateSectionAm("finalCta", (section) => {
      const buttons = [...(section.buttons || [])];
      buttons[index] = { ...(buttons[index] || {}), [field]: value };
      return { ...section, buttons };
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const normalizedSections = normalizeHomepageSectionRoutes(sections);
      await saveAllHomepageSections(normalizedSections, sectionsAm);
      const refreshed = await fetchHomepageForAdmin();
      setSections(normalizeHomepageSectionRoutes(refreshed.sections));
      setSectionsAm(refreshed.sectionsAm);
      setMessage(adminT("messages.homepageSaved"));
    } catch (saveError) {
      setError(saveError?.message || adminT("messages.homepageSaveError"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-ecaa-ink-muted">{adminT("home.loading")}</p>;
  }

  const sectionData = (key) => (isAmEditor ? sectionsAm : sections)[key] || {};
  const setField = (key, field, value) => {
    if (isAmEditor) updateNestedAm(key, field, value);
    else updateNested(key, field, value);
  };
  const setCtaField = (sectionKey, ctaKey, field, value) => {
    if (isAmEditor) updateCtaAm(sectionKey, ctaKey, field, value);
    else updateCta(sectionKey, ctaKey, field, value);
  };
  const setEmptyField = (sectionKey, field, value) => {
    if (isAmEditor) updateEmptyStateAm(sectionKey, field, value);
    else updateEmptyState(sectionKey, field, value);
  };
  const setEmptyCtaField = (sectionKey, field, value) => {
    if (isAmEditor) updateEmptyCtaAm(sectionKey, field, value);
    else updateEmptyCta(sectionKey, field, value);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ecaa-ink">
          {adminT("home.title")}
        </h1>
        <p className="mt-1 text-sm text-ecaa-ink-muted">{adminT("home.description")}</p>
      </div>

      <AdminSetupNotice message={hasSupabaseConfig() ? "" : adminT("home.supabaseNotice")} />

      {message && (
        <p className="mb-4 rounded-lg border border-ecaa-green-200 bg-ecaa-green-50 px-4 py-3 text-sm text-ecaa-green-900">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <EditorContentTabs value={editorLang} onChange={setEditorLang} />
        {isAmEditor && (
          <p className="-mt-2 rounded-lg border border-ecaa-gold-200 bg-ecaa-gold-50 px-4 py-3 text-sm text-ecaa-ink-muted">
            {adminT("home.amEditorNote")}
          </p>
        )}

        <SectionCard title={adminT("home.hero")} description={adminT("home.heroDescription")}>
          <div className="space-y-4">
            {!isAmEditor && (
              <ToggleField
                id="hero-visible"
                label={adminT("home.showHero")}
                checked={sections.hero?.visible !== false}
                onChange={(value) => updateNested("hero", "visible", value)}
              />
            )}
            <FormInput
              id="hero-eyebrow"
              label={isAmEditor ? adminT("home.amharicEyebrow") : adminT("forms.eyebrow")}
              value={(isAmEditor ? sectionsAm.hero : sections.hero)?.eyebrow || ""}
              onChange={(event) =>
                isAmEditor
                  ? updateNestedAm("hero", "eyebrow", event.target.value)
                  : updateNested("hero", "eyebrow", event.target.value)
              }
            />
            <FormTextarea
              id="hero-title"
              label={isAmEditor ? adminT("home.amharicTitle") : adminT("forms.title")}
              rows={2}
              value={(isAmEditor ? sectionsAm.hero : sections.hero)?.title || ""}
              onChange={(event) =>
                isAmEditor
                  ? updateNestedAm("hero", "title", event.target.value)
                  : updateNested("hero", "title", event.target.value)
              }
            />
                <FormTextarea
                  id="hero-description"
                  label={isAmEditor ? adminT("home.amharicDescription") : adminT("forms.description")}
                  rows={3}
                  value={(isAmEditor ? sectionsAm.hero : sections.hero)?.description || ""}
                  onChange={(event) =>
                    isAmEditor
                      ? updateNestedAm("hero", "description", event.target.value)
                      : updateNested("hero", "description", event.target.value)
                  }
                />
                {!isAmEditor && (
                  <FormInput
                    id="hero-trust"
                    label={adminT("home.trustCue")}
                    value={sections.hero?.trustCue || ""}
                    onChange={(event) => updateNested("hero", "trustCue", event.target.value)}
                  />
                )}
                {!isAmEditor ? (
              <>
                <CtaFields
                  prefix="hero-primary"
                  adminT={adminT}
                  data={sections.hero?.primaryCta}
                  onChange={(field, value) => updateCta("hero", "primaryCta", field, value)}
                />
                <CtaFields
                  prefix="hero-secondary"
                  adminT={adminT}
                  data={sections.hero?.secondaryCta}
                  onChange={(field, value) => updateCta("hero", "secondaryCta", field, value)}
                />
                <CtaFields
                  prefix="hero-third"
                  adminT={adminT}
                  data={sections.hero?.supportCta}
                  onChange={(field, value) => updateCta("hero", "supportCta", field, value)}
                />
                <CtaFields
                  prefix="hero-fourth"
                  adminT={adminT}
                  data={sections.hero?.donateCta}
                  onChange={(field, value) => updateCta("hero", "donateCta", field, value)}
                />
                <p className="text-xs text-ecaa-ink-subtle">{adminT("home.routePathsEnglishHint")}</p>
                <FormInput
                  id="hero-image"
                  label={adminT("home.backgroundImageUrl")}
                  value={sections.hero?.image || siteAssets.heroes.home}
                  onChange={(event) => updateNested("hero", "image", event.target.value)}
                />
                <ImageUpload
                  id="hero-image-upload"
                  label={adminT("home.uploadHeroImage")}
                  uploadFolder="website/heroes"
                  hint={adminT("home.heroUploadHint")}
                  onUploaded={(url) => updateNested("hero", "image", url)}
                />
                <FormInput
                  id="hero-image-alt"
                  label={adminT("forms.imageAlt")}
                  value={sections.hero?.imageAlt || ""}
                  onChange={(event) => updateNested("hero", "imageAlt", event.target.value)}
                />
              </>
            ) : (
              <>
                <FormInput
                  id="hero-trust-am"
                  label={adminT("home.amharicSupportingText")}
                  value={sectionsAm.hero?.trustCue || ""}
                  onChange={(event) => updateNestedAm("hero", "trustCue", event.target.value)}
                />
                <CtaLabelField
                  prefix="hero-primary-am"
                  label={adminT("home.amharicPrimaryButton")}
                  data={sectionsAm.hero?.primaryCta}
                  onChange={(field, value) => updateCtaAm("hero", "primaryCta", field, value)}
                />
                <CtaLabelField
                  prefix="hero-secondary-am"
                  label={adminT("home.amharicSecondaryButton")}
                  data={sectionsAm.hero?.secondaryCta}
                  onChange={(field, value) => updateCtaAm("hero", "secondaryCta", field, value)}
                />
                <CtaLabelField
                  prefix="hero-third-am"
                  label={adminT("home.amharicThirdButton")}
                  data={sectionsAm.hero?.supportCta}
                  onChange={(field, value) => updateCtaAm("hero", "supportCta", field, value)}
                />
                <CtaLabelField
                  prefix="hero-fourth-am"
                  label={adminT("home.amharicFourthButton")}
                  data={sectionsAm.hero?.donateCta}
                  onChange={(field, value) => updateCtaAm("hero", "donateCta", field, value)}
                />
              </>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title={adminT("home.missionSection")}
          description={adminT("home.missionSectionDescription")}
        >
          <div className="space-y-4">
            {!isAmEditor && (
              <ToggleField
                id="mission-visible"
                label={adminT("home.showMissionSection")}
                checked={sections.missionSection?.visible !== false}
                onChange={(value) => updateNested("missionSection", "visible", value)}
              />
            )}
            <FormInput
              id="mission-title"
              label={isAmEditor ? adminT("home.amharicTitle") : adminT("forms.title")}
              value={sectionData("missionSection").title || ""}
              onChange={(event) => setField("missionSection", "title", event.target.value)}
            />
            <FormTextarea
              id="mission-description"
              label={isAmEditor ? adminT("home.amharicDescription") : adminT("forms.description")}
              rows={3}
              value={sectionData("missionSection").description || ""}
              onChange={(event) => setField("missionSection", "description", event.target.value)}
            />
            {isAmEditor ? (
              <>
                <CtaLabelField
                  prefix="mission-primary-am"
                  label={adminT("home.amharicPrimaryButton")}
                  data={sectionsAm.missionSection?.primaryCta}
                  onChange={(field, value) => updateCtaAm("missionSection", "primaryCta", field, value)}
                />
                <CtaLabelField
                  prefix="mission-secondary-am"
                  label={adminT("home.amharicSecondaryButton")}
                  data={sectionsAm.missionSection?.secondaryCta}
                  onChange={(field, value) => updateCtaAm("missionSection", "secondaryCta", field, value)}
                />
              </>
            ) : (
              <>
                <CtaFields
                  prefix="mission-primary"
                  adminT={adminT}
                  data={sections.missionSection?.primaryCta}
                  onChange={(field, value) => updateCta("missionSection", "primaryCta", field, value)}
                />
                <CtaFields
                  prefix="mission-secondary"
                  adminT={adminT}
                  data={sections.missionSection?.secondaryCta}
                  onChange={(field, value) => updateCta("missionSection", "secondaryCta", field, value)}
                />
                <p className="text-xs text-ecaa-ink-subtle">{adminT("home.routePathsEnglishHint")}</p>
              </>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title={adminT("home.eventsCommunity")}
          description={adminT("home.eventsCommunityDescription")}
          helper={adminT("home.eventsCommunityHelper")}
        >
          <div className="space-y-4">
            {!isAmEditor && (
              <ToggleField
                id="events-visible"
                label={adminT("home.showEventsCommunity")}
                checked={sections.eventsCommunity?.visible !== false}
                onChange={(value) => updateNested("eventsCommunity", "visible", value)}
              />
            )}
            <FormInput
              id="events-eyebrow"
              label={isAmEditor ? adminT("home.amharicSectionLabel") : adminT("forms.sectionLabel")}
              value={sectionData("eventsCommunity").eyebrow || ""}
              onChange={(event) => setField("eventsCommunity", "eyebrow", event.target.value)}
            />
            <FormInput
              id="events-title"
              label={isAmEditor ? adminT("home.amharicTitle") : adminT("forms.title")}
              value={sectionData("eventsCommunity").title || ""}
              onChange={(event) => setField("eventsCommunity", "title", event.target.value)}
            />
            <FormTextarea
              id="events-description"
              label={isAmEditor ? adminT("home.amharicDescription") : adminT("forms.description")}
              rows={3}
              value={sectionData("eventsCommunity").description || ""}
              onChange={(event) => setField("eventsCommunity", "description", event.target.value)}
            />
            {!isAmEditor && (
              <FormInput
                id="events-max"
                label={adminT("home.maxEvents")}
                type="number"
                value={sections.eventsCommunity?.maxItems ?? 3}
                onChange={(event) =>
                  updateNested("eventsCommunity", "maxItems", Number(event.target.value))
                }
              />
            )}
            {isAmEditor ? (
              <CtaLabelField
                prefix="events-section-am"
                label={adminT("home.amharicSectionButton")}
                data={sectionsAm.eventsCommunity?.sectionCta}
                onChange={(field, value) =>
                  setCtaField("eventsCommunity", "sectionCta", field, value)
                }
              />
            ) : (
              <CtaFields
                prefix="events-section"
                adminT={adminT}
                data={sections.eventsCommunity?.sectionCta}
                onChange={(field, value) =>
                  updateCta("eventsCommunity", "sectionCta", field, value)
                }
              />
            )}
            <FormInput
              id="events-empty-title"
              label={isAmEditor ? adminT("home.amharicEmptyTitle") : adminT("home.emptyStateTitle")}
              value={sectionData("eventsCommunity").emptyState?.title || ""}
              onChange={(event) => setEmptyField("eventsCommunity", "title", event.target.value)}
            />
            <FormTextarea
              id="events-empty-description"
              label={isAmEditor ? adminT("home.amharicEmptyText") : adminT("home.emptyStateText")}
              rows={2}
              value={sectionData("eventsCommunity").emptyState?.description || ""}
              onChange={(event) =>
                setEmptyField("eventsCommunity", "description", event.target.value)
              }
            />
            {isAmEditor ? (
              <CtaLabelField
                prefix="events-empty-am"
                label={adminT("home.amharicEmptyButton")}
                data={sectionsAm.eventsCommunity?.emptyState?.primaryCta}
                onChange={(field, value) => setEmptyCtaField("eventsCommunity", field, value)}
              />
            ) : (
              <CtaFields
                prefix="events-empty"
                adminT={adminT}
                data={sections.eventsCommunity?.emptyState?.primaryCta}
                onChange={(field, value) => updateEmptyCta("eventsCommunity", field, value)}
              />
            )}
          </div>
        </SectionCard>

        <SectionCard
          title={adminT("home.communityMoments")}
          description={adminT("home.communityMomentsDescription")}
          helper={adminT("home.communityMomentsHelper")}
        >
          <div className="space-y-4">
            {!isAmEditor && (
              <ToggleField
                id="media-visible"
                label={adminT("home.showCommunityMoments")}
                checked={sections.communityMoments?.visible !== false}
                onChange={(value) => updateNested("communityMoments", "visible", value)}
              />
            )}
            <FormInput
              id="media-eyebrow"
              label={isAmEditor ? adminT("home.amharicSectionLabel") : adminT("forms.sectionLabel")}
              value={sectionData("communityMoments").eyebrow || ""}
              onChange={(event) => setField("communityMoments", "eyebrow", event.target.value)}
            />
            <FormInput
              id="media-title"
              label={isAmEditor ? adminT("home.amharicTitle") : adminT("forms.title")}
              value={sectionData("communityMoments").title || ""}
              onChange={(event) => setField("communityMoments", "title", event.target.value)}
            />
            <FormTextarea
              id="media-description"
              label={isAmEditor ? adminT("home.amharicDescription") : adminT("forms.description")}
              rows={3}
              value={sectionData("communityMoments").description || ""}
              onChange={(event) => setField("communityMoments", "description", event.target.value)}
            />
            {!isAmEditor && (
              <FormInput
                id="media-max"
                label={adminT("home.maxMedia")}
                type="number"
                value={sections.communityMoments?.maxItems ?? 6}
                onChange={(event) =>
                  updateNested("communityMoments", "maxItems", Number(event.target.value))
                }
              />
            )}
            {isAmEditor ? (
              <CtaLabelField
                prefix="media-section-am"
                label={adminT("home.amharicSectionButton")}
                data={sectionsAm.communityMoments?.sectionCta}
                onChange={(field, value) =>
                  setCtaField("communityMoments", "sectionCta", field, value)
                }
              />
            ) : (
              <CtaFields
                prefix="media-section"
                adminT={adminT}
                data={sections.communityMoments?.sectionCta}
                onChange={(field, value) =>
                  updateCta("communityMoments", "sectionCta", field, value)
                }
              />
            )}
            <FormInput
              id="media-empty-title"
              label={isAmEditor ? adminT("home.amharicEmptyTitle") : adminT("home.emptyStateTitle")}
              value={sectionData("communityMoments").emptyState?.title || ""}
              onChange={(event) => setEmptyField("communityMoments", "title", event.target.value)}
            />
            <FormTextarea
              id="media-empty-description"
              label={isAmEditor ? adminT("home.amharicEmptyText") : adminT("home.emptyStateText")}
              rows={2}
              value={sectionData("communityMoments").emptyState?.description || ""}
              onChange={(event) =>
                setEmptyField("communityMoments", "description", event.target.value)
              }
            />
            {isAmEditor ? (
              <CtaLabelField
                prefix="media-empty-am"
                label={adminT("home.amharicEmptyButton")}
                data={sectionsAm.communityMoments?.emptyState?.primaryCta}
                onChange={(field, value) => setEmptyCtaField("communityMoments", field, value)}
              />
            ) : (
              <CtaFields
                prefix="media-empty"
                adminT={adminT}
                data={sections.communityMoments?.emptyState?.primaryCta}
                onChange={(field, value) => updateEmptyCta("communityMoments", field, value)}
              />
            )}
          </div>
        </SectionCard>

        <SectionCard
          title={adminT("home.bookHall")}
          description={adminT("home.bookHallDescription")}
        >
          <div className="space-y-4">
            {!isAmEditor && (
              <ToggleField
                id="book-visible"
                label={adminT("home.showBookHall")}
                checked={sections.bookHall?.visible !== false}
                onChange={(value) => updateNested("bookHall", "visible", value)}
              />
            )}
            <FormInput
              id="book-eyebrow"
              label={isAmEditor ? adminT("home.amharicSectionLabel") : adminT("forms.sectionLabel")}
              value={sectionData("bookHall").eyebrow || ""}
              onChange={(event) => setField("bookHall", "eyebrow", event.target.value)}
            />
            <FormInput
              id="book-title"
              label={isAmEditor ? adminT("home.amharicTitle") : adminT("forms.title")}
              value={sectionData("bookHall").title || ""}
              onChange={(event) => setField("bookHall", "title", event.target.value)}
            />
            <FormTextarea
              id="book-description"
              label={isAmEditor ? adminT("home.amharicDescription") : adminT("forms.description")}
              rows={3}
              value={sectionData("bookHall").description || ""}
              onChange={(event) => setField("bookHall", "description", event.target.value)}
            />
            <FormTextarea
              id="book-notice"
              label={adminT("home.notice")}
              rows={2}
              value={sectionData("bookHall").importantNote || ""}
              onChange={(event) => setField("bookHall", "importantNote", event.target.value)}
            />
            {isAmEditor ? (
              <>
                <CtaLabelField
                  prefix="book-primary-am"
                  label={adminT("home.amharicPrimaryButton")}
                  data={sectionsAm.bookHall?.primaryCta}
                  onChange={(field, value) => setCtaField("bookHall", "primaryCta", field, value)}
                />
                <CtaLabelField
                  prefix="book-secondary-am"
                  label={adminT("home.amharicSecondaryButton")}
                  data={sectionsAm.bookHall?.secondaryCta}
                  onChange={(field, value) => setCtaField("bookHall", "secondaryCta", field, value)}
                />
                <FormInput
                  id="book-good-for-am"
                  label={adminT("home.amharicGoodForHeading")}
                  value={sectionsAm.bookHall?.goodForLabel || ""}
                  onChange={(event) =>
                    updateNestedAm("bookHall", "goodForLabel", event.target.value)
                  }
                />
                <FormInput
                  id="book-image-alt-am"
                  label={adminT("home.amharicImageAlt")}
                  value={sectionsAm.bookHall?.imageAlt || ""}
                  onChange={(event) => updateNestedAm("bookHall", "imageAlt", event.target.value)}
                />
              </>
            ) : (
              <>
                <CtaFields
                  prefix="book-primary"
                  adminT={adminT}
                  data={sections.bookHall?.primaryCta}
                  onChange={(field, value) => updateCta("bookHall", "primaryCta", field, value)}
                />
                <CtaFields
                  prefix="book-secondary"
                  adminT={adminT}
                  data={sections.bookHall?.secondaryCta}
                  onChange={(field, value) => updateCta("bookHall", "secondaryCta", field, value)}
                />
              </>
            )}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-ecaa-ink">
                  {isAmEditor ? adminT("home.amharicGoodForList") : adminT("home.goodForList")}
                </p>
                {!isAmEditor && (
                  <button
                    type="button"
                    onClick={addUseCase}
                    className="text-sm font-semibold text-ecaa-green-800"
                  >
                    {adminT("common.addItem")}
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {(isAmEditor
                  ? (sectionsAm.bookHall?.useCases ?? [])
                  : (sections.bookHall?.useCases ?? [])
                ).map((item, index) => (
                  <div key={`use-case-${index}`} className="flex gap-2">
                    <FormInput
                      id={`use-case-${index}`}
                      label=""
                      value={item}
                      onChange={(event) =>
                        isAmEditor
                          ? updateUseCaseAm(index, event.target.value)
                          : updateUseCase(index, event.target.value)
                      }
                      className="flex-1"
                    />
                    {!isAmEditor && (
                      <button
                        type="button"
                        onClick={() => removeUseCase(index)}
                        className="mt-1 rounded-lg border border-ecaa-border px-3 py-2 text-sm text-ecaa-ink-muted"
                      >
                        {adminT("common.remove")}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title={adminT("home.featuredPrograms")}
          description={adminT("home.featuredProgramsDescription")}
          helper={adminT("home.featuredProgramsHelper")}
        >
          <div className="space-y-4">
            {!isAmEditor && (
              <ToggleField
                id="programs-visible"
                label={adminT("home.showFeaturedPrograms")}
                checked={sections.featuredPrograms?.visible !== false}
                onChange={(value) => updateNested("featuredPrograms", "visible", value)}
              />
            )}
            <FormInput
              id="programs-eyebrow"
              label={isAmEditor ? adminT("home.amharicSectionLabel") : adminT("forms.sectionLabel")}
              value={sectionData("featuredPrograms").eyebrow || ""}
              onChange={(event) => setField("featuredPrograms", "eyebrow", event.target.value)}
            />
            <FormInput
              id="programs-title"
              label={isAmEditor ? adminT("home.amharicTitle") : adminT("forms.title")}
              value={sectionData("featuredPrograms").title || ""}
              onChange={(event) => setField("featuredPrograms", "title", event.target.value)}
            />
            <FormTextarea
              id="programs-description"
              label={isAmEditor ? adminT("home.amharicDescription") : adminT("forms.description")}
              rows={3}
              value={sectionData("featuredPrograms").description || ""}
              onChange={(event) => setField("featuredPrograms", "description", event.target.value)}
            />
            {!isAmEditor && (
              <FormInput
                id="programs-max"
                label={adminT("home.maxPrograms")}
                type="number"
                value={sections.featuredPrograms?.maxItems ?? 4}
                onChange={(event) =>
                  updateNested("featuredPrograms", "maxItems", Number(event.target.value))
                }
              />
            )}
            {isAmEditor ? (
              <CtaLabelField
                prefix="programs-section-am"
                label={adminT("home.amharicSectionButton")}
                data={sectionsAm.featuredPrograms?.sectionCta}
                onChange={(field, value) =>
                  setCtaField("featuredPrograms", "sectionCta", field, value)
                }
              />
            ) : (
              <CtaFields
                prefix="programs-section"
                adminT={adminT}
                data={sections.featuredPrograms?.sectionCta}
                onChange={(field, value) =>
                  updateCta("featuredPrograms", "sectionCta", field, value)
                }
              />
            )}
          </div>
        </SectionCard>

        <SectionCard
          title={adminT("home.finalCta")}
          description={adminT("home.finalCtaDescription")}
        >
          <div className="space-y-4">
            {!isAmEditor && (
              <ToggleField
                id="final-visible"
                label={adminT("home.showFinalCta")}
                checked={sections.finalCta?.visible !== false}
                onChange={(value) => updateNested("finalCta", "visible", value)}
              />
            )}
            <FormInput
              id="final-title"
              label={isAmEditor ? adminT("home.amharicTitle") : adminT("forms.title")}
              value={sectionData("finalCta").title || ""}
              onChange={(event) => setField("finalCta", "title", event.target.value)}
            />
            <FormTextarea
              id="final-description"
              label={isAmEditor ? adminT("home.amharicDescription") : adminT("forms.description")}
              rows={3}
              value={sectionData("finalCta").description || ""}
              onChange={(event) => setField("finalCta", "description", event.target.value)}
            />
            {(isAmEditor
              ? (sectionsAm.finalCta?.buttons ?? [])
              : (sections.finalCta?.buttons ?? [])
            ).map((button, index) =>
              isAmEditor ? (
                <CtaLabelField
                  key={`final-button-am-${index}`}
                  prefix={`final-am-${index}`}
                  label={adminT("home.amharicButtonLabel").replace("{n}", index + 1)}
                  data={button}
                  onChange={(field, value) => updateFinalButtonAm(index, field, value)}
                />
              ) : (
                <CtaFields
                  key={`final-button-${index}`}
                  prefix={`final-${index}`}
                  adminT={adminT}
                  data={button}
                  onChange={(field, value) => updateFinalButton(index, field, value)}
                />
              )
            )}
          </div>
        </SectionCard>

        <SaveButton saving={saving} savingText={adminT("common.saving")}>
          {adminT("home.saveHomepage")}
        </SaveButton>
      </form>
    </div>
  );
}
