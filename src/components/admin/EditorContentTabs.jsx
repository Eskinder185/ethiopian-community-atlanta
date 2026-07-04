import { useAdminLanguage } from "../../context/AdminLanguageContext";

export default function EditorContentTabs({ value, onChange }) {
  const { adminT } = useAdminLanguage();

  return (
    <div className="mb-6 inline-flex overflow-hidden rounded-full border border-ecaa-green-800/20 bg-ecaa-cream/80 p-0.5">
      {[
        { id: "en", label: adminT("common.english") },
        { id: "am", label: adminT("common.amharic") },
      ].map((option) => (
        <button
          key={option.id}
          type="button"
          className={[
            "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            value === option.id
              ? "bg-ecaa-green-900 text-ecaa-white"
              : "text-ecaa-green-900 hover:bg-ecaa-gold-50",
          ].join(" ")}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
