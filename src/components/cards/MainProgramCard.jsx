import CTAButton from "../ui/CTAButton";

export default function MainProgramCard({ program }) {
  const initials = program.initials || program.title?.slice(0, 2)?.toUpperCase() || "EC";
  const details = program.placeholderDetails ?? [];
  const detailPath = program.buttonLink?.startsWith("/")
    ? program.buttonLink
    : `/programs/${program.slug || program.id}`;

  return (
    <article
      id={program.id}
      className="flex h-full scroll-mt-24 flex-col rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm transition-shadow hover:shadow-ecaa-md sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-ecaa-green-800 to-ecaa-green-950 text-xs font-bold tracking-wide text-ecaa-white shadow-ecaa-sm"
          aria-hidden="true"
        >
          {initials}
        </div>
        <span className="shrink-0 rounded-full border border-ecaa-gold-300/80 bg-ecaa-gold-50 px-2.5 py-1 text-[0.65rem] font-semibold normal-case tracking-wide text-ecaa-green-900">
          {program.statusLabel || "Details Coming Soon"}
        </span>
      </div>

      <p className="mt-4 text-xs font-semibold normal-case tracking-wide text-ecaa-gold-600">
        {program.category}
      </p>
      <h3 className="mt-2 text-xl font-semibold normal-case tracking-tight text-ecaa-green-950">
        {program.title}
      </h3>
      {program.subtitle && (
        <p className="mt-1 text-sm font-medium text-ecaa-green-800">{program.subtitle}</p>
      )}
      <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted">{program.description}</p>

      {details.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-ecaa-border/60 pt-5">
          {details.slice(0, 3).map((line) => (
            <li
              key={line}
              className="flex items-start gap-2 text-sm leading-relaxed text-ecaa-ink-subtle"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ecaa-red-500/80"
                aria-hidden="true"
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-6">
        <CTAButton to={detailPath} variant="primary" size="sm" className="w-full sm:w-auto">
          {program.buttonLabel || "View Program Details"}
        </CTAButton>
      </div>
    </article>
  );
}
