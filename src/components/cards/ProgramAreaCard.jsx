import CTAButton from "../ui/CTAButton";
import { hasUsableText, hasUsableUrl, isTodoValue } from "../../utils/data";

const ICON_LABELS = {
  community: "CS",
  culture: "CP",
  education: "YE",
  wellness: "HW",
  edir: "ED",
  volunteer: "VC",
};

function isUsableForm(form) {
  return (
    form?.published !== false &&
    hasUsableUrl(form?.url) &&
    !isTodoValue(form?.url) &&
    hasUsableText(form?.title)
  );
}

export default function ProgramAreaCard({ program }) {
  const iconLabel =
    program.initials ||
    ICON_LABELS[program.icon] ||
    program.title?.slice(0, 2)?.toUpperCase() ||
    "EC";
  const form = program.form;
  const showForm = isUsableForm(form);
  const showImage = hasUsableUrl(program.image);
  const formCtaLabel = showForm ? form.ctaLabel || "Open form" : "Contact ECAA";
  const formHref = showForm ? form.url : "/contact";
  const isInternalFormCta = formHref.startsWith("/");

  return (
    <article
      id={program.id}
      className="flex h-full scroll-mt-24 flex-col rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm sm:p-7"
    >
      <div className="flex items-start gap-4">
        {showImage ? (
          <img
            src={program.image}
            alt={
              hasUsableText(program.imageAlt)
                ? program.imageAlt
                : `${program.title} placeholder image`
            }
            className="h-11 w-11 shrink-0 rounded-xl object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-ecaa-green-100 to-ecaa-green-50 text-xs font-bold tracking-wide text-ecaa-green-900"
            aria-hidden="true"
          >
            {iconLabel}
          </div>
        )}
        <div className="min-w-0 flex-1">
          {(program.category || program.categoryLabel) && (
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ecaa-gold-600">
              {program.category || program.categoryLabel}
            </p>
          )}
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-ecaa-ink">
            {program.title}
          </h3>
        </div>
      </div>

      <p className="mt-4 flex-1 text-base leading-relaxed text-ecaa-ink-muted">
        {program.description}
      </p>

      {form && form.title && (
        <div className="mt-6 rounded-ecaa-lg border border-ecaa-border/60 bg-ecaa-cream/50 p-4">
          <p className="text-sm font-semibold text-ecaa-green-900">{form.title}</p>
          {hasUsableText(form.description) && (
            <p className="mt-1 text-sm leading-relaxed text-ecaa-ink-muted">{form.description}</p>
          )}
          {!showForm && (
            <p className="mt-2 text-xs font-medium text-ecaa-ink-subtle">Form coming soon</p>
          )}
          <CTAButton
            href={isInternalFormCta ? undefined : formHref}
            to={isInternalFormCta ? formHref : undefined}
            variant="secondary"
            size="sm"
            className="mt-3"
          >
            {formCtaLabel}
          </CTAButton>
        </div>
      )}
    </article>
  );
}
