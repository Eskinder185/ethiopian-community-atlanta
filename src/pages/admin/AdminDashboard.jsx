import { Link } from "react-router-dom";
import StatusBadge from "../../components/admin/StatusBadge";
import { useAdminLanguage } from "../../context/AdminLanguageContext";

const sectionKeys = [
  { key: "home", to: "/admin/home" },
  { key: "events", to: "/admin/events" },
  { key: "media", to: "/admin/media" },
  { key: "hallBookings", to: "/admin/hall-bookings" },
  { key: "leadership", to: "/admin/leadership" },
  { key: "programs", to: "/admin/programs" },
  { key: "forms", to: "/admin/forms" },
];

export default function AdminDashboard() {
  const { adminT } = useAdminLanguage();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-ecaa-ink-muted">{adminT("dashboard.pageHeading")}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ecaa-ink sm:text-3xl">
          {adminT("dashboard.title")}
        </h1>
        <p className="mt-2 max-w-2xl text-base text-ecaa-ink-muted">
          {adminT("dashboard.description")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sectionKeys.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="group rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm transition-all hover:-translate-y-0.5 hover:border-ecaa-green-200 hover:shadow-ecaa-md"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-ecaa-green-950 group-hover:text-ecaa-green-800">
                {adminT(`dashboard.cards.${section.key}.title`)}
              </h2>
              <StatusBadge label={adminT("dashboard.editorBadge")} variant="live" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ecaa-ink-muted">
              {adminT(`dashboard.cards.${section.key}.description`)}
            </p>
            <p className="mt-4 text-sm font-semibold text-ecaa-green-800">
              {adminT("dashboard.openSection")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
