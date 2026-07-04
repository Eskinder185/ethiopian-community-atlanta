import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import LanguageToggle from "../LanguageToggle";
import Logo from "../Logo";
import { useLanguage } from "../../context/LanguageContext";

const MOBILE_NAV_LINKS = [
  { labelKey: "nav.home", path: "/" },
  { labelKey: "nav.about", path: "/about" },
  { labelKey: "nav.programs", path: "/programs" },
  { labelKey: "nav.events", path: "/events" },
  { labelKey: "nav.media", path: "/media" },
  { labelKey: "nav.membership", path: "/membership" },
  { labelKey: "nav.support", path: "/support" },
  { labelKey: "nav.leadership", path: "/leadership" },
  { labelKey: "nav.documents", path: "/documents" },
  { labelKey: "nav.contact", path: "/contact" },
];

const navLinkClass = ({ isActive }) =>
  [
    "flex min-h-[44px] items-center rounded-xl px-4 text-base font-semibold transition-colors duration-200",
    "text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2",
    isActive
      ? "bg-[#EEF7F2] text-[#0B3D2E]"
      : "hover:bg-[#EEF7F2] hover:text-[#0B3D2E]",
  ].join(" ");

export default function MobileMenu({ isOpen, onClose, returnFocusRef }) {
  const { t } = useLanguage();
  const menuRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const focusTimer = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusTimer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <nav
      ref={menuRef}
      id="mobile-menu"
      className="mobile-menu-panel fixed inset-x-0 top-[var(--header-height)] z-[55] max-h-[calc(100dvh-var(--header-height))] overflow-y-auto overscroll-contain border-t border-emerald-100 bg-[#FAF7EF] px-4 py-4 shadow-2xl lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-between gap-3 border-b border-ecaa-border/80 pb-3">
        <NavLink
          to="/"
          onClick={onClose}
          className="min-w-0 flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
        >
          <Logo variant="header" size="sm" showText="responsive" />
        </NavLink>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={t("common.closeMenu")}
          className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-ecaa-border bg-ecaa-white text-2xl leading-none text-emerald-950 transition-colors hover:bg-ecaa-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <LanguageToggle variant="mobile" />

      <ul className="mt-4 flex flex-col gap-1">
        {MOBILE_NAV_LINKS.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={navLinkClass}
              end={item.path === "/"}
              onClick={onClose}
            >
              {t(item.labelKey)}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2 border-t border-ecaa-border/80 pt-4">
        <NavLink
          to="/membership"
          onClick={onClose}
          className="flex min-h-[44px] items-center justify-center rounded-xl bg-[#0B3D2E] px-4 text-base font-semibold text-white transition-colors hover:bg-ecaa-green-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
        >
          {t("common.becomeMember")}
        </NavLink>
        <NavLink
          to="/support"
          onClick={onClose}
          className="flex min-h-[44px] items-center justify-center rounded-xl border border-ecaa-border bg-ecaa-white px-4 text-base font-semibold text-emerald-950 transition-colors hover:bg-ecaa-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
        >
          {t("common.donate")}
        </NavLink>
      </div>

      <div className="mt-4 border-t border-emerald-100 pt-4">
        <NavLink
          to="/admin/login"
          onClick={onClose}
          aria-label={t("common.adminLogin")}
          className="flex min-h-[44px] items-center rounded-xl px-4 text-sm font-medium text-emerald-800/80 transition-colors hover:bg-[#EEF7F2] hover:text-[#0B3D2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
        >
          {t("common.adminLogin")}
        </NavLink>
      </div>
    </nav>
  );
}
