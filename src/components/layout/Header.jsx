import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Container from "../ui/Container";
import HeaderBrand from "./HeaderBrand";
import MobileMenu from "./MobileMenu";
import NavDropdown from "./NavDropdown";
import CTAButton from "../ui/CTAButton";
import LanguageToggle from "../LanguageToggle";
import navigation from "../../data/navigation.json";
import { useLanguage } from "../../context/LanguageContext";
import { translateNavLabel } from "../../utils/navigationLabels";

const navLinkClass = ({ isActive }) =>
  ["nav-link nav-link-header whitespace-nowrap", isActive ? "nav-link-active" : ""]
    .filter(Boolean)
    .join(" ");

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const menuButtonRef = useRef(null);
  const location = useLocation();
  const { t } = useLanguage();
  const { items, primaryCta } = navigation.header;

  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-ecaa-border bg-[#FAF7EF]/95 shadow-ecaa-sm backdrop-blur-md">
      <Container wide className="overflow-visible">
        <div
          className="flex items-center justify-between gap-3 sm:gap-4"
          style={{ minHeight: "var(--header-height)" }}
        >
          <HeaderBrand />

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 lg:flex lg:gap-3">
            <nav
              className="flex min-w-0 items-center gap-0 overflow-visible"
              aria-label="Main navigation"
            >
              {items.map((item) =>
                item.type === "dropdown" ? (
                  <NavDropdown
                    key={item.label}
                    item={item}
                    isOpen={openDropdown === item.label}
                    onToggle={() =>
                      setOpenDropdown((current) => (current === item.label ? null : item.label))
                    }
                    onClose={() => setOpenDropdown(null)}
                  />
                ) : (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={navLinkClass}
                    end={item.path === "/"}
                  >
                    {translateNavLabel(item.label, t)}
                  </NavLink>
                )
              )}
            </nav>

            <LanguageToggle />

            {primaryCta?.path && (
              <CTAButton to={primaryCta.path} variant="secondary" size="sm" className="shrink-0">
                {translateNavLabel(primaryCta.label, t)}
              </CTAButton>
            )}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="btn btn-secondary btn-sm min-h-[44px] shrink-0 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true">{menuOpen ? t("common.close") : t("common.menu")}</span>
          </button>
        </div>
      </Container>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        returnFocusRef={menuButtonRef}
      />
    </header>
  );
}
