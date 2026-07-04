import CTAButton from "./CTAButton";

export default function HomeSectionHeader({
  id,
  eyebrow,
  title,
  description,
  action,
  className = "",
}) {
  return (
    <div className={`ecaa-section-header home-section-header ${className}`.trim()}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="ecaa-section-eyebrow text-sm font-bold uppercase tracking-[0.18em] text-ecaa-gold-700">
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className="mt-2 text-3xl font-bold tracking-tight text-ecaa-green-950 sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
            {description}
          </p>
        )}
      </div>
      {action?.label && (action.to || action.href) && (
        <CTAButton
          to={action.to}
          href={action.href}
          variant={action.variant || "secondary"}
          size="md"
          className="shrink-0"
        >
          {action.label}
        </CTAButton>
      )}
    </div>
  );
}
