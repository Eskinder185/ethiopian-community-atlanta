import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DynamicFormRenderer from "../components/forms/DynamicFormRenderer";
import { useLanguage } from "../context/LanguageContext";
import {
  fetchPublishedFormWithFields,
  getLocalizedFormText,
  submitFormResponse,
} from "../utils/forms";

const PRIVACY_NOTE = {
  en: "Please do not submit sensitive medical, legal, immigration, financial, or emergency information through this form. For urgent matters, contact ECAA directly.",
  am: "እባክዎን በዚህ ቅጽ ላይ ሚስጥራዊ የሕክምና፣ የህግ፣ የኢሚግሬሽን፣ የፋይናንስ ወይም የአደጋ ጊዜ መረጃ አያስገቡ። ለአስቸኳይ ጉዳዮች ECAAን በቀጥታ ያነጋግሩ።",
};

const NOT_FOUND = {
  en: {
    title: "This form is not available.",
    home: "Return Home",
    contact: "Contact ECAA",
  },
  am: {
    title: "ይህ ቅጽ በአሁኑ ጊዜ አይገኝም።",
    home: "ወደ መነሻ ተመለስ",
    contact: "ECAAን ያነጋግሩ",
  },
};

export default function FormPublic() {
  const { slug = "" } = useParams();
  const { language } = useLanguage();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchPublishedFormWithFields(slug).then((result) => {
      if (!result?.form) {
        setNotFound(true);
        setFormData(null);
      } else {
        setNotFound(false);
        setFormData(result);
      }
      setLoading(false);
    });
  }, [slug]);

  const labels = language === "am" ? NOT_FOUND.am : NOT_FOUND.en;
  const privacyText = language === "am" ? PRIVACY_NOTE.am : PRIVACY_NOTE.en;

  async function handleSubmit({ responseData, spoofed }) {
    setSubmitError("");
    setSubmitting(true);

    try {
      if (spoofed) {
        setSubmitted(true);
        return;
      }

      await submitFormResponse({
        formId: formData.form.id,
        responseData,
        language,
        fields: formData.fields,
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitError(
        language === "am"
          ? "ቅጹን ማስገባት አልተሳካም። እባክዎን እንደገና ይሞክሩ ወይም ECAAን ያነጋግሩ።"
          : "We could not submit your response. Please try again or contact ECAA."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="container-ecaa py-16">
        <p className="text-base text-ecaa-ink-muted">
          {language === "am" ? "በመጫን ላይ…" : "Loading…"}
        </p>
      </div>
    );
  }

  if (notFound || !formData) {
    return (
      <div className="container-ecaa py-16 sm:py-20">
        <div className="mx-auto max-w-xl rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-8 text-center shadow-ecaa-sm sm:p-10">
          <h1 className="text-2xl font-semibold text-ecaa-green-950" lang={language === "am" ? "am" : undefined}>
            {labels.title}
          </h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-ecaa-green-800 px-6 py-3 text-base font-semibold text-ecaa-white hover:bg-ecaa-green-900"
            >
              {labels.home}
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-ecaa-border px-6 py-3 text-base font-semibold text-ecaa-green-900 hover:bg-ecaa-cream"
            >
              {labels.contact}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const localized = getLocalizedFormText(formData.form, language);

  if (submitted) {
    return (
      <div className="container-ecaa py-16 sm:py-20">
        <div
          className="mx-auto max-w-xl rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-8 shadow-ecaa-sm sm:p-10"
          aria-live="polite"
        >
          <h1 className="text-2xl font-semibold text-ecaa-green-950">
            {language === "am" ? "እናመሰግናለን" : "Thank you"}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted" lang={language === "am" ? "am" : undefined}>
            {localized.confirmationMessage ||
              (language === "am" ? "ስለላኩት መረጃ እናመሰግናለን።" : "Thank you for your submission.")}
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-ecaa-green-800 px-6 py-3 text-base font-semibold text-ecaa-white hover:bg-ecaa-green-900"
            >
              {language === "am" ? "ወደ መነሻ ተመለስ" : "Return Home"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-ecaa py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1
            className="text-2xl font-semibold tracking-tight text-ecaa-green-950 sm:text-3xl"
            lang={language === "am" ? "am" : undefined}
          >
            {localized.title}
          </h1>
          {localized.description && (
            <p
              className="mt-3 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg"
              lang={language === "am" ? "am" : undefined}
            >
              {localized.description}
            </p>
          )}
        </header>

        <div className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm sm:p-8">
          <DynamicFormRenderer
            form={formData.form}
            fields={formData.fields}
            language={language}
            submitLabel={localized.submitButtonLabel}
            onSubmit={handleSubmit}
            submitting={submitting}
          />

          {submitError && (
            <p role="alert" className="mt-4 text-sm text-ecaa-red-700">
              {submitError}
            </p>
          )}
        </div>

        <p
          className="mt-6 text-sm leading-relaxed text-ecaa-ink-muted"
          lang={language === "am" ? "am" : undefined}
        >
          {privacyText}
        </p>
      </div>
    </div>
  );
}
