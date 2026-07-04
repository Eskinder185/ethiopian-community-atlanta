import { getAccentTheme, getBackgroundTheme, getFormCardClass } from "../../utils/formThemes";
import { hasUsableImageUrl } from "../../utils/publicAsset";

function CoverImage({ src, alt, layoutStyle }) {
  if (!hasUsableImageUrl(src)) return null;

  const imageClass =
    layoutStyle === "split_hero"
      ? "h-full min-h-[220px] w-full object-cover sm:min-h-[320px] lg:min-h-full"
      : layoutStyle === "simple"
        ? "h-40 w-full object-cover sm:h-48"
        : "h-48 w-full object-cover sm:h-56 md:h-64";

  return (
    <img
      src={src}
      alt={alt || ""}
      className={`${imageClass} rounded-ecaa-xl`}
      loading="eager"
      decoding="async"
    />
  );
}

function FormHeader({ title, description, language, isDeepGreen }) {
  return (
    <header className="mb-6">
      <h1
        className={`text-2xl font-semibold tracking-tight sm:text-3xl ${
          isDeepGreen ? "text-ecaa-cream" : "text-ecaa-green-950"
        }`}
        lang={language === "am" ? "am" : undefined}
      >
        {title}
      </h1>
      {description && (
        <p
          className={`mt-3 text-base leading-relaxed sm:text-lg ${
            isDeepGreen ? "text-ecaa-cream/85" : "text-ecaa-ink-muted"
          }`}
          lang={language === "am" ? "am" : undefined}
        >
          {description}
        </p>
      )}
    </header>
  );
}

export default function FormPageLayout({
  form,
  localized,
  language,
  children,
  footer,
  preview = false,
}) {
  const background = getBackgroundTheme(form.backgroundTheme);
  const accent = getAccentTheme(form.accentTheme);
  const layoutStyle = form.layoutStyle || "standard";
  const isDeepGreen = form.backgroundTheme === "deep_green";
  const cardClass = getFormCardClass(form.backgroundTheme);
  const hasCover = hasUsableImageUrl(form.coverImageUrl);

  const shellClass = [
    "min-h-[50vh] py-10 sm:py-14",
    background.className,
    preview ? "rounded-ecaa-xl border border-ecaa-border/70" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const formCard = (
    <div
      className={[
        layoutStyle === "simple"
          ? "p-0"
          : `rounded-ecaa-xl border p-6 shadow-ecaa-sm sm:p-8 ${cardClass}`,
        layoutStyle === "card" ? "shadow-ecaa-md" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-accent-theme={accent.value}
    >
      {typeof children === "function" ? children({ accentButtonClass: accent.buttonClass }) : children}
    </div>
  );

  return (
    <div className={shellClass}>
      {preview && (
        <p className="container-ecaa mb-4 rounded-lg border border-ecaa-gold-300 bg-ecaa-gold-50 px-4 py-2 text-sm font-medium text-ecaa-green-900">
          {language === "am" ? "ቅድመ እይታ — እንደሚታይበት ሁኔታ" : "Preview — this is how the public form will look"}
        </p>
      )}

      <div className="container-ecaa">
        {layoutStyle === "split_hero" && hasCover ? (
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-stretch">
            <CoverImage src={form.coverImageUrl} alt={form.coverImageAlt} layoutStyle={layoutStyle} />
            <div>
              <FormHeader
                title={localized.title}
                description={localized.description}
                language={language}
                isDeepGreen={isDeepGreen}
              />
              {formCard}
              {footer}
            </div>
          </div>
        ) : (
          <div className={`mx-auto ${layoutStyle === "simple" ? "max-w-xl" : "max-w-2xl"}`}>
            {hasCover && layoutStyle !== "simple" && (
              <div className="mb-6">
                <CoverImage src={form.coverImageUrl} alt={form.coverImageAlt} layoutStyle={layoutStyle} />
              </div>
            )}

            <FormHeader
              title={localized.title}
              description={localized.description}
              language={language}
              isDeepGreen={isDeepGreen}
            />

            {formCard}
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
