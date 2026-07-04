import { useEffect } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true"
  );
}

export function useFocusTrap(containerRef, active, options = {}) {
  const { initialFocusRef, returnFocusRef, onEscape } = options;

  useEffect(() => {
    if (!active || !containerRef.current) return undefined;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement;
    const returnTarget = returnFocusRef?.current;

    const focusInitial = () => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
        return;
      }
      const focusable = getFocusableElements(container);
      focusable[0]?.focus();
    };

    window.requestAnimationFrame(focusInitial);

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onEscape?.(event);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(container);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      const target = returnTarget || previouslyFocused;
      if (target && typeof target.focus === "function") {
        target.focus();
      }
    };
  }, [active, containerRef, initialFocusRef, returnFocusRef, onEscape]);
}
