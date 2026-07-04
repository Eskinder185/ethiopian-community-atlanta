import { useEffect, useId, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { translateNavLabel } from "../../utils/navigationLabels";
import { getFocusableElements } from "../../hooks/useFocusTrap";
import { getNavHref, getNavPathname, isExternalNavLink } from "../../utils/navigation";

function isItemActive(location, item) {
  return item.children?.some((child) => {
    const href = getNavHref(child);
    const childPath = getNavPathname(href);
    if (childPath !== location.pathname) return false;
    if (!href.includes("#")) return !location.hash;
    const childHash = href.split("#")[1];
    return location.hash === `#${childHash}`;
  });
}

export default function NavDropdown({ item, isOpen, onToggle, onClose }) {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const menuId = useId();
  const location = useLocation();
  const { t } = useLanguage();
  const isActive = isItemActive(location, item);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    window.requestAnimationFrame(() => {
      const focusable = getFocusableElements(menuRef.current);
      focusable[0]?.focus();
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  function handleButtonKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      if (!isOpen) {
        event.preventDefault();
        onToggle();
      }
    }
  }

  function handleMenuKeyDown(event) {
    const focusable = getFocusableElements(menuRef.current);
    if (focusable.length === 0) return;

    const currentIndex = focusable.indexOf(document.activeElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = focusable[(currentIndex + 1) % focusable.length];
      next.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = focusable[(currentIndex - 1 + focusable.length) % focusable.length];
      prev.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      focusable[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      focusable[focusable.length - 1].focus();
    }
  }

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        className={[
          "nav-link nav-link-header inline-flex items-center gap-1 whitespace-nowrap",
          isActive ? "nav-link-active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={onToggle}
        onKeyDown={handleButtonKeyDown}
      >
        {translateNavLabel(item.label, t)}
        <span className="text-[0.65rem] opacity-70" aria-hidden="true">
          {isOpen ? "▴" : "▾"}
        </span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          className="nav-dropdown-panel"
          onKeyDown={handleMenuKeyDown}
        >
          {item.children.map((child) => {
            const href = getNavHref(child);
            const external = isExternalNavLink(child);
            const label = translateNavLabel(child.label, t);

            if (external) {
              return (
                <a
                  key={`${href}-${child.label}`}
                  href={href}
                  role="menuitem"
                  className="nav-dropdown-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  onClick={onClose}
                >
                  {label}
                </a>
              );
            }

            return (
              <Link
                key={`${href}-${child.label}`}
                to={href}
                role="menuitem"
                className="nav-dropdown-item"
                onClick={onClose}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
