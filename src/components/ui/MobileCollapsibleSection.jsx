import { useId } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function MobileCollapsibleSection({
  title,
  description,
  eyebrow,
  children,
  defaultOpen = false,
  className = "",
  contentClassName = "",
}) {
  const baseId = useId();
  const isMobile = useIsMobile();
  const panelId = `${baseId}-panel`;

  if (!isMobile) {
    return (
      <div className={className}>
        {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
        {title && <h2 className="heading-section mt-2 text-2xl sm:text-3xl">{title}</h2>}
        {description && (
          <p className="mt-3 text-base leading-relaxed text-ecaa-ink-muted md:text-lg">
            {description}
          </p>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    );
  }

  return (
    <details
      open={defaultOpen}
      className={`group overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm ${className}`.trim()}
    >
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 text-left">
          {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ecaa-gold-600">{eyebrow}</p>}
          {title && <h2 className="text-lg font-semibold text-ecaa-green-950">{title}</h2>}
          {description && !defaultOpen && (
            <p className="mt-1 line-clamp-2 text-sm text-ecaa-ink-muted">{description}</p>
          )}
        </div>
        <span
          className="shrink-0 text-sm font-semibold text-ecaa-green-800 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        >
          ▾
        </span>
      </summary>
      <div id={panelId} className={`border-t border-ecaa-border/60 px-4 py-4 ${contentClassName}`.trim()}>
        {description && defaultOpen && (
          <p className="mb-4 text-sm leading-relaxed text-ecaa-ink-muted">{description}</p>
        )}
        {children}
      </div>
    </details>
  );
}
