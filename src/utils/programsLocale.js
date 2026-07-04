import { mergeLocalizedContent } from "./homepageLocale";
import { programsAmharicFallbackBySlug } from "../data/programsAmharicFallback";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function parseContentAm(raw) {
  if (!raw) return null;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return isPlainObject(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  return isPlainObject(raw) ? raw : null;
}

/** Map content_am JSON (snake or camel) into camelCase overlay fields. */
export function normalizeContentAmOverlay(raw) {
  const source = parseContentAm(raw);
  if (!source) return null;

  return {
    initials: source.initials,
    category: source.category,
    title: source.title,
    subtitle: source.subtitle,
    shortDescription: source.short_description ?? source.shortDescription,
    description: source.short_description ?? source.shortDescription ?? source.description,
    fullDescription: source.full_description ?? source.fullDescription,
    pageIntro: source.page_intro ?? source.pageIntro,
    statusLabel: source.status_label ?? source.statusLabel,
    placeholderDetails: source.placeholder_details ?? source.placeholderDetails,
    detailSections: source.detail_sections ?? source.detailSections,
    buttonLabel: source.button_label ?? source.buttonLabel,
    legalNotice: source.legal_notice ?? source.legalNotice,
    registrationEmptyMessage: source.registration_empty_message ?? source.registrationEmptyMessage,
    mediaEmptyMessage: source.media_empty_message ?? source.mediaEmptyMessage,
    resourceLinks: source.resource_links ?? source.resourceLinks,
    registrationLinks: source.registration_links ?? source.registrationLinks,
    mediaItems: source.media_items ?? source.mediaItems,
  };
}

function mergeLocalizedArray(base = [], overlay = [], mergeItem) {
  if (!overlay?.length) return base;
  return base.map((item, index) => {
    const overlayItem = overlay[index];
    if (!overlayItem) return item;
    return mergeItem(item, overlayItem);
  });
}

function mergeLocalizedLinks(base = [], overlay = []) {
  if (!overlay?.length) return base;
  return base.map((item, index) => mergeLocalizedContent(item, overlay[index] || {}));
}

export function getProgramContentAmSource(program) {
  if (!program) return null;
  return (
    program.content_am ?? program.contentAm ?? programsAmharicFallbackBySlug[program.slug] ?? null
  );
}

export function applyProgramLocale(program, language = "en") {
  if (!program || language !== "am") return program;

  const overlay = normalizeContentAmOverlay(getProgramContentAmSource(program));
  if (!overlay) return program;

  const mergedScalars = mergeLocalizedContent(
    {
      initials: program.initials,
      category: program.category,
      title: program.title,
      subtitle: program.subtitle,
      shortDescription: program.shortDescription,
      description: program.description,
      fullDescription: program.fullDescription,
      pageIntro: program.pageIntro,
      statusLabel: program.statusLabel,
      buttonLabel: program.buttonLabel,
      legalNotice: program.legalNotice,
      registrationEmptyMessage: program.registrationEmptyMessage,
      mediaEmptyMessage: program.mediaEmptyMessage,
    },
    overlay
  );

  const placeholderDetails = overlay.placeholderDetails?.length
    ? overlay.placeholderDetails.filter(Boolean)
    : program.placeholderDetails;

  const detailSections = overlay.detailSections?.length
    ? mergeLocalizedArray(program.detailSections, overlay.detailSections, (base, item) =>
        typeof item === "string"
          ? { ...base, body: item }
          : mergeLocalizedContent(base, {
              heading: item.heading ?? item.title,
              body: item.body ?? item.description,
            })
      )
    : program.detailSections;

  return {
    ...program,
    ...mergedScalars,
    placeholderDetails,
    detailSections,
    resourceLinks: mergeLocalizedLinks(program.resourceLinks, overlay.resourceLinks),
    registrationLinks: mergeLocalizedLinks(program.registrationLinks, overlay.registrationLinks),
    mediaItems: mergeLocalizedArray(program.mediaItems, overlay.mediaItems, (base, item) =>
      mergeLocalizedContent(base, item)
    ),
    content_am: program.content_am ?? program.contentAm ?? null,
  };
}

export function applyProgramsLocale(programs = [], language = "en") {
  if (language !== "am") return programs;
  return programs.map((program) => applyProgramLocale(program, language));
}

export function buildContentAmFromDraft(draft = {}) {
  const existing = normalizeContentAmOverlay(draft.content_am) || {};
  const source = draft.content_am || {};

  const payload = {
    initials: source.initials ?? existing.initials ?? "",
    category: source.category ?? existing.category ?? "",
    title: source.title ?? existing.title ?? "",
    subtitle: source.subtitle ?? existing.subtitle ?? "",
    short_description:
      source.short_description ?? source.shortDescription ?? existing.shortDescription ?? "",
    full_description:
      source.full_description ?? source.fullDescription ?? existing.fullDescription ?? "",
    page_intro: source.page_intro ?? source.pageIntro ?? existing.pageIntro ?? "",
    status_label: source.status_label ?? source.statusLabel ?? existing.statusLabel ?? "",
    placeholder_details:
      source.placeholder_details ?? source.placeholderDetails ?? existing.placeholderDetails ?? [],
    detail_sections:
      source.detail_sections ?? source.detailSections ?? existing.detailSections ?? [],
    button_label: source.button_label ?? source.buttonLabel ?? existing.buttonLabel ?? "",
    legal_notice: source.legal_notice ?? source.legalNotice ?? existing.legalNotice ?? "",
    registration_empty_message:
      source.registration_empty_message ??
      source.registrationEmptyMessage ??
      existing.registrationEmptyMessage ??
      "",
    media_empty_message:
      source.media_empty_message ?? source.mediaEmptyMessage ?? existing.mediaEmptyMessage ?? "",
    resource_links: source.resource_links ?? source.resourceLinks ?? existing.resourceLinks ?? [],
    registration_links:
      source.registration_links ?? source.registrationLinks ?? existing.registrationLinks ?? [],
    media_items: source.media_items ?? source.mediaItems ?? existing.mediaItems ?? [],
  };

  return payload;
}
