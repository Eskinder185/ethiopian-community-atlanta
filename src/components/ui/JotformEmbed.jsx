import CTAButton from "./CTAButton";

export default function JotformEmbed({
  title,
  description,
  formUrl,
  height = 2400,
  fallbackLabel = "Open form in a new tab",
}) {
  return (
    <section className="w-full">
      <div className="ecaa-card-premium overflow-hidden p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="heading-section text-2xl sm:text-3xl">{title}</h2>
          {description ? <p className="text-body mt-3 max-w-3xl">{description}</p> : null}
        </div>

        <div className="overflow-hidden rounded-ecaa-xl border border-ecaa-border bg-ecaa-cream/50">
          <iframe
            src={formUrl}
            title={title}
            loading="lazy"
            className="block w-full max-w-full bg-ecaa-white"
            style={{ height: `${height}px`, border: 0 }}
            allow="payment *; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className="mt-5 flex flex-col gap-4 text-sm text-ecaa-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>If the form does not load, you can open it in a new tab.</p>
          <CTAButton
            href={formUrl}
            variant="secondary"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${fallbackLabel} (opens in a new tab)`}
            className="shrink-0"
          >
            {fallbackLabel}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
