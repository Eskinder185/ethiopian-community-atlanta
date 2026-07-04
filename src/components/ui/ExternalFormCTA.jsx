import Badge from "./Badge";
import CTAButton from "./CTAButton";

function ExternalLinkIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M11 3a1 1 0 1 0 0 2h2.586L8.293 10.293a1 1 0 1 0 1.414 1.414L15 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5Z" />
      <path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5Z" />
    </svg>
  );
}

export default function ExternalFormCTA({
  title,
  description,
  buttonLabel,
  formUrl,
  badges = ["Jotform", "Secure online form"],
}) {
  return (
    <article className="ecaa-card-premium mx-auto max-w-3xl border-ecaa-green-200/40 text-center">
      <div className="flex flex-wrap justify-center gap-2">
        {badges.map((label) => (
          <Badge key={label} variant={label === "Jotform" ? "green" : "neutral"}>
            {label}
          </Badge>
        ))}
      </div>
      <h3 className="heading-section mt-6 text-2xl">{title}</h3>
      <p className="text-body mx-auto mt-4 max-w-xl">{description}</p>
      <CTAButton
        href={formUrl}
        variant="primary"
        size="lg"
        className="mt-10"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${buttonLabel} (opens in a new tab)`}
      >
        {buttonLabel}
        <ExternalLinkIcon />
      </CTAButton>
    </article>
  );
}
