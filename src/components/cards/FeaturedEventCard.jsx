import Badge from "../ui/Badge";
import CTAButton from "../ui/CTAButton";
import { useLanguage } from "../../context/LanguageContext";
import { getLinkProps, getPublicText, isUsableHomeText } from "../../utils/homepage";
import { getEventDisplayAlt } from "../../utils/altText";
import { resolvePublicImageUrl } from "../../lib/uploadMedia";
import { getDirectImageUrl } from "../../utils/mediaUrl";

export default function FeaturedEventCard({ item, size = "default" }) {
  const { language } = useLanguage();
  const cta = getLinkProps({ href: item.href });
  const rawImage = item.image || item.coverImageUrl || item.cover_image_url || item.imageUrl || item.image_url || "";
  const imageSrc = getDirectImageUrl(resolvePublicImageUrl(rawImage) || rawImage);
  const hasImage = isUsableHomeText(imageSrc);
  const imageAlt = getEventDisplayAlt(
    {
      title: item.title,
      coverImageAlt: getPublicText(item.coverImageAlt),
      imageAlt: getPublicText(item.imageAlt),
      content_am: item.content_am,
    },
    { preferCover: true, language }
  );
  const isExternal = item.external || cta?.href?.startsWith("http");
  const isLarge = size === "large";
  const placeholderText = language === "am" ? "የዝግጅት ምስል በቅርቡ ይታከላል" : "Event image coming soon";

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white shadow-ecaa-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isLarge ? "min-h-[420px]" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-ecaa-cream/50 ${isLarge ? "aspect-[16/10]" : "aspect-[4/3]"}`}
      >
        {hasImage ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-ecaa-green-900/10 via-ecaa-cream to-ecaa-gold-100/40 px-6 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-ecaa-gold-300/60 bg-ecaa-white/80 text-lg font-bold text-ecaa-green-900">
              ECAA
            </div>
            <p className="text-sm text-ecaa-ink-muted">{placeholderText}</p>
          </div>
        )}

        {isUsableHomeText(item.date) && !String(item.date).startsWith("TODO") && (
          <span className="absolute left-3 top-3 rounded-full bg-ecaa-green-950/85 px-3 py-1 text-xs font-semibold text-ecaa-white shadow-ecaa-sm">
            {item.date}
          </span>
        )}

        {item.isEventbrite && (
          <span className="absolute right-3 top-3 rounded-full border border-ecaa-gold-300/70 bg-ecaa-gold-100/95 px-3 py-1 text-xs font-semibold text-ecaa-green-950">
            Eventbrite
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {isUsableHomeText(item.category) && !item.category.startsWith("TODO") && (
            <Badge variant="green">{item.category}</Badge>
          )}
        </div>

        <h3
          className={`mt-3 font-semibold tracking-tight text-ecaa-ink ${isLarge ? "text-2xl" : "text-lg"}`}
        >
          {item.title}
        </h3>

        {isUsableHomeText(item.excerpt) && (
          <p
            className={`mt-2 line-clamp-3 text-ecaa-ink-muted ${isLarge ? "text-base" : "text-sm"}`}
          >
            {item.excerpt}
          </p>
        )}

        {(isUsableHomeText(item.location) || isUsableHomeText(item.eventTime)) && (
          <p className="mt-3 text-sm text-ecaa-ink-subtle">
            {[item.eventTime, item.location].filter((value) => isUsableHomeText(value)).join(" · ")}
          </p>
        )}

        {cta && (
          <CTAButton
            {...cta}
            variant="primary"
            size="sm"
            className="mt-4 min-h-[44px] self-stretch sm:mt-5 sm:self-start"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {item.ctaLabel || (language === "am" ? "ተጨማሪ ያንብቡ" : "Learn more")}
          </CTAButton>
        )}
      </div>
    </article>
  );
}
