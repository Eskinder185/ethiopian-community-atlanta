import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const CTA_ITEMS = [
  { key: "join", path: "/membership", labelKey: "mobile.stickyJoin" },
  { key: "events", path: "/events", labelKey: "mobile.stickyEvents" },
  { key: "donate", path: "/support", labelKey: "mobile.stickyDonate" },
];

export default function MobileStickyCTA() {
  const location = useLocation();
  const { t } = useLanguage();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      aria-label={t("mobile.stickyNavLabel")}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-ecaa-green-800/40 bg-ecaa-green-950/96 shadow-[0_-4px_20px_rgba(6,49,37,0.28)] backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto flex min-h-[64px] max-w-lg items-stretch gap-2 px-3 py-2">
        {CTA_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.key}
              to={item.path}
              className={[
                "flex min-h-[44px] flex-1 items-center justify-center rounded-xl px-2 text-base font-semibold transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-400",
                isActive
                  ? "bg-ecaa-gold-500 text-ecaa-green-950"
                  : "bg-ecaa-green-800 text-ecaa-white hover:bg-ecaa-green-700",
              ].join(" ")}
            >
              {t(item.labelKey)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
