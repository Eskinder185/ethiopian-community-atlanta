import { isTodoValue } from "../../utils/data";

const headingClasses = {
  h2: "heading-section text-2xl",
  h3: "text-xl font-semibold text-ecaa-ink",
};

export default function EmptyState({
  title = "Nothing to show yet",
  description = "Content will appear here when it becomes available.",
  action,
  className = "",
  headingLevel = "h3",
  showEyebrow = false,
  eyebrow = "Coming soon",
  compact = false,
}) {
  const HeadingTag = headingLevel;
  const safeDescription =
    typeof description === "string" &&
    !isTodoValue(description) &&
    !description.includes("homepage.json")
      ? description
      : "Content will appear here when it becomes available.";

  return (
    <div
      className={`empty-state ${compact ? "empty-state-compact" : ""} ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      {showEyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-ecaa-gold-600">
          {eyebrow}
        </p>
      )}
      <HeadingTag className={`${showEyebrow ? "mt-3" : ""} ${headingClasses[headingLevel]}`}>
        {title}
      </HeadingTag>
      <p className="mt-3 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
        {safeDescription}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
