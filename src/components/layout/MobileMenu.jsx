import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import navigation from "../../data/navigation.json";
import CTAButton from "../ui/CTAButton";
import LanguageToggle from "../LanguageToggle";
import { useLanguage } from "../../context/LanguageContext";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { translateNavLabel } from "../../utils/navigationLabels";
import { ADMIN_LOGIN_PATH } from "../../utils/admin";
import { getNavHref, isExternalNavLink } from "../../utils/navigation";

const MOBILE_PRIMARY_LINKS = [
  { labelKey: "nav.home", path: "/" },
  { labelKey: "nav.about", path: "/about" },
  { labelKey: "nav.programs", path: "/programs" },
  { labelKey: "nav.events", path: "/events" },
  { labelKey: "nav.media", path: "/media" },
  { labelKey: "nav.membership", path: "/membership" },
  { labelKey: "nav.support", path: "/support" },
  { labelKey: "nav.leadership", path: "/leadership" },
  { labelKey: "nav.governance", path: "/documents" },
  { labelKey: "nav.contact", path: "/contact" },
];

const navLinkClass = ({ isActive }) =>
  [
    "nav-link nav-link-mobile flex min-h-[44px] items-center rounded-lg px-3 text-base",
    isActive ? "nav-link-active" : "",
  ]
    .filter(Boolean)
    .join(" ");

const subLinkClass = ({ isActive }) =>
  [
    "nav-mobile-sub-link flex min-h-[44px] items-center rounded-lg py-2.5 pl-4 pr-3 text-base font-medium text-ecaa-ink-muted transition-colors duration-200",
    isActive
      ? "bg-ecaa-green-50 text-ecaa-green-900"
      : "hover:bg-ecaa-cream/80 hover:text-ecaa-ink",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500",
  ]
    .filter(Boolean)
    .join(" ");

function MobileNavChild({ child, onClose, t }) {
  const href = getNavHref(child);
  const external = isExternalNavLink(child);
  const label = translateNavLabel(child.label, t);

  if (external) {
    return (
      <a
        href={href}
        className="nav-mobile-sub-link flex min-h-[44px] items-center rounded-lg py-2.5 pl-4 pr-3 text-base font-medium text-ecaa-ink-muted transition-colors duration-200 hover:bg-ecaa-cream/80 hover:text-ecaa-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
      >
        {label}
      </a>
    );
  }

  return (
    <NavLink to={href} className={subLinkClass} onClick={onClose}>
      {label}
    </NavLink>
  );
}

export default function MobileMenu({ isOpen, onClose, returnFocusRef }) {
  const { items, primaryCta, adminCta } = navigation.header;
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState({});
  const menuRef = useRef(null);

  useFocusTrap(menuRef, isOpen, {
    returnFocusRef,
    onEscape: onClose,
  });

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setExpanded({});
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleGroup = (label) => {
    setExpanded((current) => ({ ...current, [label]: !current[label] }));
  };

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 top-16 z-40 bg-ecaa-green-950/40 backdrop-blur-[1px] xl:hidden"
        aria-label={t("common.closeMenu")}
        onClick={onClose}
      />

      <nav
        ref={menuRef}
        id="mobile-nav"
        className="mobile-menu-panel fixed left-0 right-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-ecaa-border/60 bg-ecaa-white/98 py-4 shadow-ecaa-lg backdrop-blur-md xl:hidden"
        aria-label="Mobile navigation"
      >
        <div className="px-4">
          <div className="mb-4">
            <LanguageToggle variant="mobile" />
          </div>

          <p className="mb-2 px-3 text-sm font-semibold uppercase tracking-[0.14em] text-ecaa-gold-700">
            {t("nav.quickLinks")}
          </p>
          <ul className="mb-4 grid grid-cols-2 gap-1">
            {MOBILE_PRIMARY_LINKS.map((item) => (
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

          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-ecaa-ink-faint">
            Browse
          </p>
          <ul className="flex flex-col gap-0.5">
            {items.map((item) =>
              item.type === "dropdown" ? (
                <li key={item.label}>
                  <button
                    type="button"
                    className="nav-link nav-link-mobile flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 text-base"
                    aria-expanded={Boolean(expanded[item.label])}
                    aria-controls={`mobile-group-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => toggleGroup(item.label)}
                  >
                    <span>{translateNavLabel(item.label, t)}</span>
                    <span className="text-xs opacity-70" aria-hidden="true">
                      {expanded[item.label] ? "▴" : "▾"}
                    </span>
                  </button>
                  {expanded[item.label] && (
                    <ul
                      id={`mobile-group-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                      className="mt-0.5 space-y-0.5 border-l-2 border-ecaa-green-100 pl-3"
                    >
                      {item.children.map((child) => (
                        <li key={`${getNavHref(child)}-${child.label}`}>
                          <MobileNavChild child={child} onClose={onClose} t={t} />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={navLinkClass}
                    end={item.path === "/"}
                    onClick={onClose}
                  >
                    {translateNavLabel(item.label, t)}
                  </NavLink>
                </li>
              )
            )}
            {(adminCta?.published || primaryCta?.path) && (
              <li className="mt-4 space-y-3 border-t border-ecaa-border/60 pt-4">
                {adminCta?.published && (
                  <CTAButton
                    to={ADMIN_LOGIN_PATH}
                    variant="primary"
                    size="md"
                    className="min-h-[44px] w-full"
                    onClick={onClose}
                  >
                    {translateNavLabel(adminCta.label, t)}
                  </CTAButton>
                )}
                {primaryCta?.path && (
                  <CTAButton
                    to={primaryCta.path}
                    variant="secondary"
                    size="md"
                    className="min-h-[44px] w-full"
                    onClick={onClose}
                  >
                    {translateNavLabel(primaryCta.label, t)}
                  </CTAButton>
                )}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
