import { supabase, hasSupabaseConfig } from "../lib/supabaseClient";
import { hasUsableText } from "./data";
import { slugifyTitle } from "./programs";

export const FORM_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

export const FORM_TYPES = [
  "general",
  "event_registration",
  "program_interest",
  "volunteer",
  "membership",
  "hall_booking",
  "feedback",
  "application",
];

export const FIELD_TYPES = [
  "text",
  "textarea",
  "email",
  "phone",
  "number",
  "date",
  "time",
  "datetime",
  "select",
  "radio",
  "checkbox",
  "file",
  "consent",
];

export const RESPONSE_STATUS = [
  "new",
  "reviewed",
  "contacted",
  "approved",
  "declined",
  "archived",
];

export class FormsTableMissingError extends Error {
  constructor() {
    super("Forms table is not set up yet. Run the form-builder SQL in Supabase.");
    this.name = "FormsTableMissingError";
  }
}

function isMissingTableError(error) {
  if (!error) return false;
  const message = String(error.message || "");
  return (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    error.status === 404 ||
    message.includes("does not exist") ||
    message.includes("Could not find the table") ||
    message.includes("relation") && message.includes("forms")
  );
}

function warnSupabaseFallback(context, error) {
  console.warn(`Form builder Supabase fallback (${context})`, error);
}

function parseOptions(value) {
  if (Array.isArray(value)) {
    return value.map((opt, index) => ({
      value: opt?.value ?? `option_${index}`,
      label: opt?.label || "",
      labelAm: opt?.labelAm || opt?.label_am || "",
    }));
  }
  return [];
}

export function normalizeFormField(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    formId: raw.form_id || raw.formId,
    fieldKey: raw.field_key || raw.fieldKey || "",
    label: raw.label || "",
    labelAm: raw.label_am || raw.labelAm || "",
    helpText: raw.help_text || raw.helpText || "",
    helpTextAm: raw.help_text_am || raw.helpTextAm || "",
    fieldType: raw.field_type || raw.fieldType || "text",
    required: raw.required === true,
    placeholder: raw.placeholder || "",
    placeholderAm: raw.placeholder_am || raw.placeholderAm || "",
    options: parseOptions(raw.options),
    validation: raw.validation && typeof raw.validation === "object" ? raw.validation : {},
    displayOrder:
      typeof raw.display_order === "number"
        ? raw.display_order
        : typeof raw.displayOrder === "number"
          ? raw.displayOrder
          : 999,
    visible: raw.visible !== false,
  };
}

export function normalizeForm(raw) {
  if (!raw) return null;

  const contentAm = raw.content_am || raw.contentAm || {};

  return {
    id: raw.id,
    slug: raw.slug || "",
    title: raw.title || "",
    description: raw.description || "",
    titleAm: contentAm.title || "",
    descriptionAm: contentAm.description || "",
    contentAm,
    status: raw.status || FORM_STATUS.DRAFT,
    formType: raw.form_type || raw.formType || "general",
    confirmationMessage: raw.confirmation_message || raw.confirmationMessage || "",
    confirmationMessageAm: raw.confirmation_message_am || raw.confirmationMessageAm || "",
    submitButtonLabel: raw.submit_button_label || raw.submitButtonLabel || "Submit",
    submitButtonLabelAm: raw.submit_button_label_am || raw.submitButtonLabelAm || "አስገባ",
    allowMultipleSubmissions: raw.allow_multiple_submissions !== false,
    requireLogin: raw.require_login === true,
    collectEmail: raw.collect_email === true,
    notificationEmail: raw.notification_email || raw.notificationEmail || "",
    visiblePublic: raw.visible_public === true || raw.visiblePublic === true,
    coverImageUrl: raw.cover_image_url || raw.coverImageUrl || "",
    coverImageAlt: raw.cover_image_alt || raw.coverImageAlt || "",
    backgroundTheme: raw.background_theme || raw.backgroundTheme || "warm",
    accentTheme: raw.accent_theme || raw.accentTheme || "green",
    layoutStyle: raw.layout_style || raw.layoutStyle || "standard",
    displayOrder:
      typeof raw.display_order === "number"
        ? raw.display_order
        : typeof raw.displayOrder === "number"
          ? raw.displayOrder
          : 999,
    createdAt: raw.created_at || raw.createdAt || null,
    updatedAt: raw.updated_at || raw.updatedAt || null,
  };
}

export function normalizeFormResponse(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    formId: raw.form_id || raw.formId,
    submitterEmail: raw.submitter_email || raw.submitterEmail || "",
    submitterName: raw.submitter_name || raw.submitterName || "",
    responseData: raw.response_data || raw.responseData || {},
    language: raw.language || "en",
    status: raw.status || "new",
    adminNotes: raw.admin_notes || raw.adminNotes || "",
    createdAt: raw.created_at || raw.createdAt || null,
    updatedAt: raw.updated_at || raw.updatedAt || null,
  };
}

export function formToDbRow(form) {
  return {
    id: form.id || undefined,
    slug: form.slug,
    title: form.title,
    description: form.description || "",
    content_am: {
      title: form.titleAm || form.contentAm?.title || "",
      description: form.descriptionAm || form.contentAm?.description || "",
    },
    status: form.status || FORM_STATUS.DRAFT,
    form_type: form.formType || "general",
    confirmation_message: form.confirmationMessage || "",
    confirmation_message_am: form.confirmationMessageAm || "",
    submit_button_label: form.submitButtonLabel || "Submit",
    submit_button_label_am: form.submitButtonLabelAm || "አስገባ",
    allow_multiple_submissions: form.allowMultipleSubmissions !== false,
    require_login: form.requireLogin === true,
    collect_email: form.collectEmail === true,
    notification_email: form.notificationEmail || "",
    visible_public: form.visiblePublic === true,
    cover_image_url: form.coverImageUrl || "",
    cover_image_alt: form.coverImageAlt || "",
    background_theme: form.backgroundTheme || "warm",
    accent_theme: form.accentTheme || "green",
    layout_style: form.layoutStyle || "standard",
    display_order: form.displayOrder ?? 999,
  };
}

export function formFieldToDbRow(field, formId) {
  return {
    id: field.id?.startsWith("temp-") ? undefined : field.id,
    form_id: formId,
    field_key: field.fieldKey,
    label: field.label,
    label_am: field.labelAm || "",
    help_text: field.helpText || "",
    help_text_am: field.helpTextAm || "",
    field_type: field.fieldType,
    required: field.required === true,
    placeholder: field.placeholder || "",
    placeholder_am: field.placeholderAm || "",
    options: field.options || [],
    validation: field.validation || {},
    display_order: field.displayOrder ?? 999,
    visible: field.visible !== false,
  };
}

export function getFormPublicPath(slug) {
  return `/forms/${slug}`;
}

export function getLocalizedFormText(form, language) {
  const isAm = language === "am";
  return {
    title: (isAm && hasUsableText(form.titleAm) ? form.titleAm : form.title) || "",
    description:
      (isAm && hasUsableText(form.descriptionAm) ? form.descriptionAm : form.description) || "",
    confirmationMessage:
      (isAm && hasUsableText(form.confirmationMessageAm)
        ? form.confirmationMessageAm
        : form.confirmationMessage) || "",
    submitButtonLabel:
      (isAm && hasUsableText(form.submitButtonLabelAm)
        ? form.submitButtonLabelAm
        : form.submitButtonLabel) || "Submit",
  };
}

export function getLocalizedFieldText(field, language) {
  const isAm = language === "am";
  return {
    label: (isAm && hasUsableText(field.labelAm) ? field.labelAm : field.label) || "",
    helpText: (isAm && hasUsableText(field.helpTextAm) ? field.helpTextAm : field.helpText) || "",
    placeholder:
      (isAm && hasUsableText(field.placeholderAm) ? field.placeholderAm : field.placeholder) || "",
    options: (field.options || []).map((opt) => ({
      ...opt,
      label: (isAm && hasUsableText(opt.labelAm) ? opt.labelAm : opt.label) || opt.value,
    })),
  };
}

export async function fetchPublishedFormBySlug(slug) {
  if (!hasSupabaseConfig() || !hasUsableText(slug)) return null;

  try {
    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .eq("slug", slug)
      .eq("status", FORM_STATUS.PUBLISHED)
      .eq("visible_public", true)
      .maybeSingle();

    if (error) {
      warnSupabaseFallback(`fetchPublishedFormBySlug:${slug}`, error);
      return null;
    }

    return data ? normalizeForm(data) : null;
  } catch (error) {
    warnSupabaseFallback(`fetchPublishedFormBySlug:${slug}`, error);
    return null;
  }
}

export async function fetchPublishedFormWithFields(slug) {
  if (!hasSupabaseConfig() || !hasUsableText(slug)) return null;

  try {
    const form = await fetchPublishedFormBySlug(slug);
    if (!form) return null;

    const { data: fields, error } = await supabase
      .from("form_fields")
      .select("*")
      .eq("form_id", form.id)
      .eq("visible", true)
      .order("display_order", { ascending: true });

    if (error) {
      warnSupabaseFallback(`fetchPublishedFormWithFields:${slug}`, error);
      return { form, fields: [] };
    }

    return {
      form,
      fields: (fields ?? []).map(normalizeFormField).filter(Boolean),
    };
  } catch (error) {
    warnSupabaseFallback(`fetchPublishedFormWithFields:${slug}`, error);
    return null;
  }
}

export async function isPublishedFormSlug(slug) {
  const form = await fetchPublishedFormBySlug(slug);
  return Boolean(form);
}

export async function fetchFormsForAdmin() {
  if (!hasSupabaseConfig()) return [];

  try {
    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .order("display_order", { ascending: true })
      .order("updated_at", { ascending: false });

    if (error) {
      if (isMissingTableError(error)) {
        throw new FormsTableMissingError();
      }
      warnSupabaseFallback("fetchFormsForAdmin", error);
      throw error;
    }

    return (data ?? []).map(normalizeForm).filter(Boolean);
  } catch (error) {
    if (error instanceof FormsTableMissingError || isMissingTableError(error)) {
      throw new FormsTableMissingError();
    }
    warnSupabaseFallback("fetchFormsForAdmin", error);
    throw error;
  }
}

export async function fetchFormWithFieldsForAdmin(formId) {
  if (!hasSupabaseConfig() || !formId) return null;

  try {
    const { data: formData, error: formError } = await supabase
      .from("forms")
      .select("*")
      .eq("id", formId)
      .maybeSingle();

    if (formError) throw formError;
    if (!formData) return null;

    const { data: fields, error: fieldsError } = await supabase
      .from("form_fields")
      .select("*")
      .eq("form_id", formId)
      .order("display_order", { ascending: true });

    if (fieldsError) throw fieldsError;

    return {
      form: normalizeForm(formData),
      fields: (fields ?? []).map(normalizeFormField).filter(Boolean),
    };
  } catch (error) {
    warnSupabaseFallback(`fetchFormWithFieldsForAdmin:${formId}`, error);
    throw error;
  }
}

export async function saveFormWithFields(form, fields = []) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured.");
  }

  const row = formToDbRow(form);
  let savedForm;

  if (form.id) {
    const { data, error } = await supabase.from("forms").upsert(row, { onConflict: "id" }).select().single();
    if (error) throw error;
    savedForm = data;
  } else {
    const { data, error } = await supabase.from("forms").insert(row).select().single();
    if (error) throw error;
    savedForm = data;
  }

  const normalizedForm = normalizeForm(savedForm);
  const formId = normalizedForm.id;

  const { data: existingFields } = await supabase
    .from("form_fields")
    .select("id")
    .eq("form_id", formId);

  const keepIds = new Set(
    fields
      .map((field) => field.id)
      .filter((fieldId) => fieldId && !String(fieldId).startsWith("temp-"))
  );

  const deleteIds = (existingFields ?? [])
    .map((field) => field.id)
    .filter((fieldId) => !keepIds.has(fieldId));

  if (deleteIds.length > 0) {
    const { error: deleteError } = await supabase.from("form_fields").delete().in("id", deleteIds);
    if (deleteError) throw deleteError;
  }

  const orderedFields = fields.map((field, index) => ({
    ...field,
    displayOrder: index + 1,
    fieldKey: field.fieldKey || slugifyFieldKey(field.label),
  }));

  for (const field of orderedFields) {
    const fieldRow = formFieldToDbRow(field, formId);
    const isNew = !field.id || String(field.id).startsWith("temp-");

    if (isNew) {
      const { error } = await supabase.from("form_fields").insert(fieldRow);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("form_fields").update(fieldRow).eq("id", field.id);
      if (error) throw error;
    }
  }

  const { data: allFields, error: reloadError } = await supabase
    .from("form_fields")
    .select("*")
    .eq("form_id", formId)
    .order("display_order", { ascending: true });

  if (reloadError) throw reloadError;

  return {
    form: normalizedForm,
    fields: (allFields ?? []).map(normalizeFormField).filter(Boolean),
  };
}

export async function archiveForm(formId) {
  if (!hasSupabaseConfig()) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("forms")
    .update({ status: FORM_STATUS.ARCHIVED, visible_public: false })
    .eq("id", formId)
    .select()
    .single();

  if (error) throw error;
  return normalizeForm(data);
}

export async function fetchResponseCountsByFormIds(formIds = []) {
  if (!hasSupabaseConfig() || formIds.length === 0) return {};

  try {
    const { data, error } = await supabase
      .from("form_responses")
      .select("form_id")
      .in("form_id", formIds);

    if (error) {
      warnSupabaseFallback("fetchResponseCountsByFormIds", error);
      return {};
    }

    return (data ?? []).reduce((counts, row) => {
      const id = row.form_id;
      counts[id] = (counts[id] || 0) + 1;
      return counts;
    }, {});
  } catch (error) {
    warnSupabaseFallback("fetchResponseCountsByFormIds", error);
    return {};
  }
}

function extractSubmitterInfo(responseData = {}, fields = []) {
  const emailKeys = ["email", "contact_email"];
  const nameKeys = ["full_name", "name", "parent_name", "student_name"];

  let submitterEmail = "";
  let submitterName = "";

  for (const key of emailKeys) {
    if (hasUsableText(responseData[key])) {
      submitterEmail = responseData[key].trim();
      break;
    }
  }

  for (const key of nameKeys) {
    if (hasUsableText(responseData[key])) {
      submitterName = responseData[key].trim();
      break;
    }
  }

  const emailField = fields.find((f) => f.fieldType === "email");
  if (!submitterEmail && emailField && hasUsableText(responseData[emailField.fieldKey])) {
    submitterEmail = responseData[emailField.fieldKey].trim();
  }

  const nameField = fields.find((f) =>
    ["full_name", "name", "parent_name"].includes(f.fieldKey)
  );
  if (!submitterName && nameField && hasUsableText(responseData[nameField.fieldKey])) {
    submitterName = responseData[nameField.fieldKey].trim();
  }

  return { submitterEmail, submitterName };
}

export async function submitFormResponse({ formId, responseData, language, fields = [] }) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured.");
  }

  const { submitterEmail, submitterName } = extractSubmitterInfo(responseData, fields);

  const { data, error } = await supabase
    .from("form_responses")
    .insert({
      form_id: formId,
      submitter_email: submitterEmail || null,
      submitter_name: submitterName || null,
      response_data: responseData,
      language: language || "en",
      status: "new",
    })
    .select()
    .single();

  if (error) throw error;
  return normalizeFormResponse(data);
}

export async function fetchResponsesForAdmin(formId) {
  if (!hasSupabaseConfig() || !formId) return [];

  try {
    const { data, error } = await supabase
      .from("form_responses")
      .select("*")
      .eq("form_id", formId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []).map(normalizeFormResponse).filter(Boolean);
  } catch (error) {
    warnSupabaseFallback(`fetchResponsesForAdmin:${formId}`, error);
    throw error;
  }
}

export async function updateFormResponse(responseId, updates) {
  if (!hasSupabaseConfig()) throw new Error("Supabase is not configured.");

  const row = {
    status: updates.status,
    admin_notes: updates.adminNotes ?? updates.admin_notes,
  };

  const { data, error } = await supabase
    .from("form_responses")
    .update(row)
    .eq("id", responseId)
    .select()
    .single();

  if (error) throw error;
  return normalizeFormResponse(data);
}

export async function deleteFormResponse(responseId) {
  if (!hasSupabaseConfig()) throw new Error("Supabase is not configured.");

  const { error } = await supabase.from("form_responses").delete().eq("id", responseId);
  if (error) throw error;
}

export function exportResponsesToCsv({ form, fields, responses }) {
  const visibleFields = [...fields].sort((a, b) => a.displayOrder - b.displayOrder);
  const headers = [
    "Submitted At",
    "Submitter Name",
    "Submitter Email",
    "Status",
    "Language",
    ...visibleFields.map((f) => f.label),
    "Admin Notes",
  ];

  const rows = responses.map((response) => {
    const data = response.responseData || {};
    return [
      response.createdAt || "",
      response.submitterName || "",
      response.submitterEmail || "",
      response.status || "",
      response.language || "",
      ...visibleFields.map((field) => formatCsvCell(data[field.fieldKey])),
      response.adminNotes || "",
    ];
  });

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");

  return csvContent;
}

function formatCsvCell(value) {
  if (Array.isArray(value)) return value.join("; ");
  if (value && typeof value === "object") return JSON.stringify(value);
  return value ?? "";
}

export function downloadCsv(csvContent, filename) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function slugifyFormTitle(value = "") {
  return slugifyTitle(value);
}

function slugifyFieldKey(label = "") {
  return slugifyFormTitle(label).replace(/-/g, "_") || `field_${Date.now()}`;
}
