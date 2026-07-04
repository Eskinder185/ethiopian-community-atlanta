import { useEffect, useState } from "react";
import Badge from "../ui/Badge";
import CTAButton from "../ui/CTAButton";
import { useLanguage } from "../../context/LanguageContext";
import { hasUsableText, hasUsableUrl } from "../../utils/data";
import { formatEventDateLabel, getResolvedEventImageUrl } from "../../utils/events";
import { resolveFormHref } from "../../utils/formLinks";
import { getEventDisplayAlt } from "../../utils/altText";

function getPrimaryAction(event, resolvedFormUrl) {
  const candidates = [
    { url: event.eventbriteLink || event.eventbrite_link, label: event.ctaLabel || "Register" },
    { url: resolvedFormUrl || event.googleFormLink || event.google_form_link, label: "Open Form" },
    { url: event.partifulLink || event.partiful_link, label: "Open on Partiful" },
    { url: event.link || event.general_link, label: event.ctaLabel || "Learn more" },
    { url: "/events", label: event.ctaLabel || "View Events" },
  ];

  return candidates.find((item) => hasUsableUrl(item.url)) || null;
}

export default function EventCard({
  event,
  variant = "upcoming",
  badgeLabels = {},
  buttonLabels = {},
  imageContext = "listing",
}) {
  const { language } = useLanguage();
  const [resolvedFormUrl, setResolvedFormUrl] = useState("");

  useEffect(() => {
    let active = true;
    resolveFormHref({
      internalSlug: event.registrationFormSlug,
      fallbackUrl: event.googleFormLink || event.google_form_link,
    }).then((url) => {
      if (active) setResolvedFormUrl(url || "");
    });
    return () => {
      active = false;
    };
  }, [event.registrationFormSlug, event.googleFormLink, event.google_form_link]);

  const dateLabel = formatEventDateLabel(event.eventDate || event.date);
  const showLocation = hasUsableText(event.location);
  const showCategory = hasUsableText(event.category);
  const excerpt = hasUsableText(event.excerpt)
    ? event.excerpt
    : hasUsableText(event.summary)
      ? event.summary
      : hasUsableText(event.description)
        ? event.description
        : null;

  const preferCover = imageContext === "homepage";
  const imageUrl = getResolvedEventImageUrl(event, { preferCover });

  if (import.meta.env.DEV) {
    console.log("Rendering event image:", {
      title: event.title,
      image_url: event.image_url || event.imageUrl,
      eventbrite_link: event.eventbrite_link || event.eventbriteLink,
      resolved: imageUrl,
    });
  }

  const action = getPrimaryAction(event, resolvedFormUrl);
  const hasPoster = Boolean(imageUrl);
  const placeholderText = language === "am" ? "የዝግጅት ምስል በቅርቡ ይታከላል" : "Event image coming soon";
  const badgeLabel =
    variant === "past"
      ? badgeLabels.past || "Past"
      : event.status === "announcement"
        ? badgeLabels.announcement || "Announcement"
        : event.status === "community-news"
          ? badgeLabels.news || "News"
          : badgeLabels.upcoming || "Upcoming";

  const defaultCtaLabel = buttonLabels.readMore || buttonLabels.learnMore || "Learn more";
  const isInternalCta = action?.url?.startsWith("/");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ecaa-green-200/70 hover:shadow-ecaa-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-ecaa-cream/50 sm:aspect-[16/10]">
        {hasPoster ? (
          <img
            src={imageUrl}
            alt={getEventDisplayAlt(event, { preferCover, language })}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(loadError) => {
              if (import.meta.env.DEV) {
                console.error("Event image failed to load:", imageUrl, loadError);
              }
            }}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-ecaa-green-900/10 via-ecaa-cream to-ecaa-gold-100/40 px-4 text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-ecaa-gold-300/60 bg-ecaa-white/80 text-sm font-bold text-ecaa-green-900">
              ECAA
            </div>
            <p className="text-xs text-ecaa-ink-muted sm:text-sm">{placeholderText}</p>
          </div>
        )}

        {dateLabel && (
          <span className="absolute left-3 top-3 rounded-full bg-ecaa-green-950/85 px-3 py-1 text-xs font-semibold text-ecaa-white">
            {dateLabel}
          </span>
        )}

        {hasUsableUrl(event.eventbriteLink || event.eventbrite_link) && (
          <span className="absolute right-3 top-3 rounded-full border border-ecaa-gold-300/70 bg-ecaa-gold-100/95 px-3 py-1 text-xs font-semibold text-ecaa-green-950">
            Eventbrite
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={variant === "past" ? "neutral" : "green"}>{badgeLabel}</Badge>
          {showCategory && <Badge variant="gold">{event.category}</Badge>}
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-ecaa-ink sm:text-xl">
          {event.title}
        </h3>

        {excerpt && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ecaa-ink-muted line-clamp-3 sm:mt-3 sm:text-base">
            {excerpt}
          </p>
        )}

        {showLocation && <p className="mt-3 text-sm text-ecaa-ink-subtle">{event.location}</p>}

        {action && (
          <CTAButton
            {...(isInternalCta ? { to: action.url } : { href: action.url })}
            variant="secondary"
            size="sm"
            className="mt-4 min-h-[44px] self-stretch sm:mt-6 sm:self-start"
            {...(isInternalCta ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          >
            {action.label || defaultCtaLabel}
          </CTAButton>
        )}
      </div>
    </article>
  );
}
