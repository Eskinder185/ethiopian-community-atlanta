import { useLanguage } from "../context/LanguageContext";

const buttonBase =
  "px-2.5 py-1 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500";

export default function LanguageToggle({ variant = "desktop" }) {
  const { language, setLanguage, t } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="px-1 py-2" role="group" aria-label={t("common.language")}>
        <p className="text-sm font-medium text-ecaa-ink">
          {t("common.language")}:{" "}
          <button
            type="button"
            className={`font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ecaa-green-700 ${language === "en" ? "text-ecaa-green-900" : "text-ecaa-ink-muted hover:text-ecaa-green-800"}`}
            aria-pressed={language === "en"}
            onClick={() => setLanguage("en")}
          >
            {t("common.english")}
          </button>
          <span className="mx-2 text-ecaa-ink-subtle" aria-hidden="true">
            |
          </span>
          <button
            type="button"
            className={`font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ecaa-green-700 ${language === "am" ? "text-ecaa-green-900" : "text-ecaa-ink-muted hover:text-ecaa-green-800"}`}
            aria-pressed={language === "am"}
            onClick={() => setLanguage("am")}
          >
            {t("common.amharic")}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div
      className="inline-flex shrink-0 overflow-hidden rounded-full border border-ecaa-green-800/20 bg-ecaa-cream/80 p-0.5"
      role="group"
      aria-label={t("common.language")}
    >
      <button
        type="button"
        className={[
          buttonBase,
          "rounded-full",
          language === "en"
            ? "bg-ecaa-green-900 text-ecaa-white"
            : "text-ecaa-green-900 hover:bg-ecaa-gold-50",
        ].join(" ")}
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={[
          buttonBase,
          "rounded-full",
          language === "am"
            ? "bg-ecaa-green-900 text-ecaa-white"
            : "text-ecaa-green-900 hover:bg-ecaa-gold-50",
        ].join(" ")}
        aria-pressed={language === "am"}
        onClick={() => setLanguage("am")}
      >
        አማ
      </button>
    </div>
  );
}
