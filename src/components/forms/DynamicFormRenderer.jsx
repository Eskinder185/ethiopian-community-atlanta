import { useEffect, useId, useRef, useState } from "react";
import { getLocalizedFieldText } from "../../utils/forms";

const PHONE_PATTERN = /^[+]?[\d\s().-]{7,}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SUBMIT_MS = 2000;

function RequiredMark() {
  return (
    <span className="text-ecaa-red-600" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-ecaa-red-700">
      {message}
    </p>
  );
}

function inputClass(hasError) {
  return [
    "mt-2 w-full min-h-[44px] rounded-lg border bg-ecaa-white px-4 py-2.5 text-base text-ecaa-ink shadow-ecaa-sm transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ecaa-green-700 focus-visible:ring-offset-2",
    hasError ? "border-ecaa-red-400" : "border-ecaa-border/80",
  ].join(" ");
}

function validateField(field, value, localized) {
  const isEmpty = (val) =>
    val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0);

  if (field.required && isEmpty(value)) {
    return `${localized.label} is required.`;
  }

  if (field.fieldType === "email" && hasUsableText(value) && !EMAIL_PATTERN.test(String(value))) {
    return "Please enter a valid email address.";
  }

  if (field.fieldType === "phone" && hasUsableText(value) && !PHONE_PATTERN.test(String(value))) {
    return "Please enter a valid phone number.";
  }

  if (field.fieldType === "consent" && field.required && value !== true) {
    return "You must agree to continue.";
  }

  return "";
}

function hasUsableText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function renderFieldControl({
  field,
  localized,
  value,
  onChange,
  hasError,
  describedBy,
  language,
}) {
  const id = field.fieldKey;

  switch (field.fieldType) {
    case "textarea":
      return (
        <textarea
          id={id}
          name={id}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={localized.placeholder}
          rows={4}
          aria-invalid={hasError}
          aria-describedby={describedBy || undefined}
          className={`${inputClass(hasError)} min-h-[120px] resize-y`}
        />
      );

    case "select":
      return (
        <select
          id={id}
          name={id}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={describedBy || undefined}
          className={inputClass(hasError)}
        >
          <option value="">{language === "am" ? "ይምረጡ" : "Select an option"}</option>
          {localized.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "radio":
      return (
        <fieldset className="mt-2 space-y-2" aria-describedby={describedBy || undefined}>
          <legend className="sr-only">{localized.label}</legend>
          {localized.options.map((opt) => (
            <label
              key={opt.value}
              className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-ecaa-border/70 bg-ecaa-white px-4 py-2.5"
            >
              <input
                type="radio"
                name={id}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                aria-invalid={hasError}
                className="h-4 w-4 text-ecaa-green-800"
              />
              <span className="text-base text-ecaa-ink">{opt.label}</span>
            </label>
          ))}
        </fieldset>
      );

    case "checkbox": {
      const options = localized.options;
      if (options.length > 0) {
        const selected = Array.isArray(value) ? value : [];
        return (
          <fieldset className="mt-2 space-y-2" aria-describedby={describedBy || undefined}>
            <legend className="sr-only">{localized.label}</legend>
            {options.map((opt) => (
              <label
                key={opt.value}
                className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-ecaa-border/70 bg-ecaa-white px-4 py-2.5"
              >
                <input
                  type="checkbox"
                  name={`${id}_${opt.value}`}
                  checked={selected.includes(opt.value)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...selected, opt.value]
                      : selected.filter((item) => item !== opt.value);
                    onChange(next);
                  }}
                  aria-invalid={hasError}
                  className="h-4 w-4 rounded text-ecaa-green-800"
                />
                <span className="text-base text-ecaa-ink">{opt.label}</span>
              </label>
            ))}
          </fieldset>
        );
      }

      return (
        <label className="mt-2 flex min-h-[44px] cursor-pointer items-start gap-3 rounded-lg border border-ecaa-border/70 bg-ecaa-white px-4 py-3">
          <input
            type="checkbox"
            id={id}
            name={id}
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={hasError}
            aria-describedby={describedBy || undefined}
            className="mt-1 h-4 w-4 rounded text-ecaa-green-800"
          />
          <span className="text-base text-ecaa-ink">{localized.label}</span>
        </label>
      );
    }

    case "consent":
      return (
        <label className="mt-2 flex min-h-[44px] cursor-pointer items-start gap-3 rounded-lg border border-ecaa-border/70 bg-ecaa-white px-4 py-3">
          <input
            type="checkbox"
            id={id}
            name={id}
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={hasError}
            aria-describedby={describedBy || undefined}
            className="mt-1 h-4 w-4 rounded text-ecaa-green-800"
          />
          <span className="text-base text-ecaa-ink">{localized.label}</span>
        </label>
      );

    case "file":
      return (
        <p className="mt-2 text-sm text-ecaa-ink-muted">
          {language === "am"
            ? "የፋይል ማስገባት በቅርቡ ይገኛል።"
            : "File uploads are not available on this form yet."}
        </p>
      );

    default: {
      const inputType =
        field.fieldType === "email"
          ? "email"
          : field.fieldType === "phone"
            ? "tel"
            : field.fieldType === "number"
              ? "number"
              : field.fieldType === "date"
                ? "date"
                : field.fieldType === "time"
                  ? "time"
                  : field.fieldType === "datetime"
                    ? "datetime-local"
                    : "text";

      return (
        <input
          id={id}
          name={id}
          type={inputType}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={localized.placeholder}
          aria-invalid={hasError}
          aria-describedby={describedBy || undefined}
          className={inputClass(hasError)}
          autoComplete={field.fieldType === "email" ? "email" : undefined}
        />
      );
    }
  }
}

export default function DynamicFormRenderer({
  form,
  fields,
  language = "en",
  submitLabel = "Submit",
  onSubmit,
  submitting = false,
  accentButtonClass,
  preview = false,
}) {
  const formInstanceId = useId();
  const mountedAt = useRef(Date.now());
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState("");
  const [rateLimitMessage, setRateLimitMessage] = useState("");

  useEffect(() => {
    mountedAt.current = Date.now();
  }, [form?.id]);

  const visibleFields = fields.filter((field) => field.visible !== false);

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function validateAll() {
    const nextErrors = {};
    visibleFields.forEach((field) => {
      const localized = getLocalizedFieldText(field, language);
      const message = validateField(field, values[field.fieldKey], localized);
      if (message) nextErrors[field.fieldKey] = message;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setRateLimitMessage("");

    if (honeypot) {
      await onSubmit({ responseData: {}, spoofed: true });
      return;
    }

    const elapsed = Date.now() - mountedAt.current;
    if (elapsed < MIN_SUBMIT_MS) {
      setRateLimitMessage(
        language === "am"
          ? "እባክዎን ቅጹን ለማስገባት ትንሽ ይጠብቁ።"
          : "Please wait a moment before submitting."
      );
      return;
    }

    if (!validateAll()) return;

    const responseData = {};
    visibleFields.forEach((field) => {
      if (field.fieldType === "file") return;
      const value = values[field.fieldKey];
      if (value !== undefined && value !== "") {
        responseData[field.fieldKey] = value;
      }
    });

    await onSubmit({ responseData, spoofed: false });
  }

  return (
    <form onSubmit={preview ? (e) => e.preventDefault() : handleSubmit} noValidate>
      <fieldset disabled={preview} className="space-y-6 border-0 p-0 m-0">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formInstanceId}-company_website`}>Company website</label>
        <input
          id={`${formInstanceId}-company_website`}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {visibleFields.map((field) => {
        const localized = getLocalizedFieldText(field, language);
        const error = errors[field.fieldKey];
        const errorId = `${formInstanceId}-${field.fieldKey}-error`;
        const helpId = `${formInstanceId}-${field.fieldKey}-help`;
        const describedBy = [error ? errorId : null, localized.helpText ? helpId : null]
          .filter(Boolean)
          .join(" ");

        const showLabel = !["consent", "checkbox"].includes(field.fieldType) || field.options?.length > 0;

        return (
          <div key={field.id || field.fieldKey}>
            {showLabel && (
              <label
                htmlFor={field.fieldType === "radio" ? undefined : field.fieldKey}
                className="block text-base font-semibold text-ecaa-green-950"
                lang={language === "am" ? "am" : undefined}
              >
                {localized.label}
                {field.required && (
                  <>
                    <RequiredMark />
                    <span className="sr-only"> (required)</span>
                  </>
                )}
              </label>
            )}

            {localized.helpText && (
              <p id={helpId} className="mt-1 text-sm text-ecaa-ink-muted" lang={language === "am" ? "am" : undefined}>
                {localized.helpText}
              </p>
            )}

            {renderFieldControl({
              field,
              localized,
              value: values[field.fieldKey],
              onChange: preview ? () => {} : (val) => updateValue(field.fieldKey, val),
              hasError: Boolean(error),
              describedBy,
              language,
            })}

            <FieldError id={errorId} message={error} />
          </div>
        );
      })}

      {rateLimitMessage && (
        <p role="alert" className="text-sm text-ecaa-red-700">
          {rateLimitMessage}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting || preview}
          className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${
            accentButtonClass || "bg-ecaa-green-800 hover:bg-ecaa-green-900 text-ecaa-white focus-visible:ring-ecaa-green-700"
          }`}
        >
          {preview
            ? submitLabel
            : submitting
              ? language === "am"
                ? "በመላክ ላይ…"
                : "Submitting…"
              : submitLabel}
        </button>
      </div>
      </fieldset>
    </form>
  );
}
