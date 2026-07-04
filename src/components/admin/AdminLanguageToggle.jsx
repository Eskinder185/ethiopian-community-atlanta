import { useAdminLanguage } from "../../context/AdminLanguageContext";

const buttonBase =
  "px-2.5 py-1 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500";

export default function AdminLanguageToggle() {
  const { language, setLanguage, adminT } = useAdminLanguage();

  return (
    <div
      className="inline-flex shrink-0 overflow-hidden rounded-full border border-ecaa-green-800/20 bg-ecaa-cream/80 p-0.5"
      role="group"
      aria-label={adminT("common.language")}
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
