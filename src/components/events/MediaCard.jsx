import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { hasUsableUrl } from "../../utils/data";
import { resolvePublicImageUrl } from "../../lib/uploadMedia";
import { getDirectImageUrl, getYouTubeEmbedUrl } from "../../utils/mediaUrl";
import { getMediaButtonLabel, LINK_MEDIA_TYPES, MEDIA_TYPES } from "../../utils/mediaItems";
import CTAButton from "../ui/CTAButton";

const IMAGE_PLACEHOLDER = "Image will appear here once published.";

function getResolvedMediaImageUrl(item) {
  const rawImageUrl = item.image_url || item.imageUrl || "";
  const storageResolved = resolvePublicImageUrl(rawImageUrl);
  return getDirectImageUrl(storageResolved || rawImageUrl);
}

function ImagePlaceholder({ message = IMAGE_PLACEHOLDER }) {
  return (
    <div className="flex h-full min-h-56 w-full items-center justify-center bg-ecaa-cream/60 px-6 py-10 text-center text-sm text-ecaa-ink-muted">
      {message}
    </div>
  );
}

function MediaImage({ item, language = "en" }) {
  const [failed, setFailed] = useState(false);
  const rawImageUrl = item.image_url || item.imageUrl || "";
  const imageUrl = getResolvedMediaImageUrl(item);
  const displayAlt =
    language === "am"
      ? item.content_am?.alt_text ||
        item.content_am?.altText ||
        item.altText ||
        item.title ||
        "ECAA media"
      : item.altText || item.alt_text || item.title || "ECAA media";

  if (import.meta.env.DEV) {
    console.log("Rendering media item image:", {
      title: item.title,
      type: item.type,
      rawImageUrl,
      finalImageUrl: imageUrl,
      url: item.url,
    });
  }

  if (!imageUrl || failed) {
    return <ImagePlaceholder />;
  }

  return (
    <img
      src={imageUrl}
      alt={displayAlt}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
      onError={(event) => {
        console.error("Image failed to load:", {
          title: item.title,
          rawImageUrl,
          finalImageUrl: imageUrl,
        });
        setFailed(true);
        event.currentTarget.style.display = "none";
      }}
    />
  );
}

function MediaYoutube({ item, buttonLabels, language }) {
  const embedUrl = getYouTubeEmbedUrl(item.url || "");
  const linkUrl = hasUsableUrl(item.url) ? item.url : null;
  const buttonLabel = getMediaButtonLabel(item.type, language, item.buttonLabel, buttonLabels);
  const displayTitle = item.title || "ECAA video";

  if (embedUrl) {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          title={displayTitle}
          className="h-full w-full rounded-t-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-[12rem] flex-col items-center justify-center gap-4 bg-ecaa-cream/60 px-6 py-10 text-center">
      <p className="text-sm text-ecaa-ink-muted">
        {linkUrl
          ? "Paste a valid YouTube video link to embed it here."
          : "YouTube video link will appear here once published."}
      </p>
      {linkUrl && (
        <CTAButton
          href={linkUrl}
          variant="secondary"
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonLabel}
        </CTAButton>
      )}
    </div>
  );
}

function MediaLinkCard({ item, buttonLabels, language }) {
  const linkUrl = hasUsableUrl(item.url) ? item.url : null;
  const buttonLabel = getMediaButtonLabel(item.type, language, item.buttonLabel, buttonLabels);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-ecaa-green-950">{item.title}</h3>
        {item.caption && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ecaa-ink-muted">{item.caption}</p>
        )}
        {linkUrl ? (
          <div className="mt-5">
            <CTAButton
              href={linkUrl}
              variant="secondary"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {buttonLabel}
            </CTAButton>
          </div>
        ) : (
          <p className="mt-5 text-sm text-ecaa-ink-muted">Link will appear here once published.</p>
        )}
      </div>
    </article>
  );
}

function MediaFigure({ item, children }) {
  return (
    <figure className="group overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
      <div className="flex min-h-[12rem] items-center justify-center overflow-hidden bg-ecaa-cream/40">
        {children}
      </div>
      {(item.title || item.caption) && (
        <figcaption className="border-t border-ecaa-border/60 px-4 py-3">
          {item.title && <p className="font-semibold text-ecaa-green-950">{item.title}</p>}
          {item.caption && <p className="mt-1 text-sm text-ecaa-ink-muted">{item.caption}</p>}
        </figcaption>
      )}
    </figure>
  );
}

const IMAGE_DISPLAY_TYPES = [MEDIA_TYPES.IMAGE, MEDIA_TYPES.GIF, MEDIA_TYPES.DOCUMENT];

export default function MediaCard({ item, buttonLabels = {} }) {
  const { language } = useLanguage();
  const type = item.type || MEDIA_TYPES.IMAGE;
  const imageUrl = getResolvedMediaImageUrl(item);

  if (LINK_MEDIA_TYPES.includes(type)) {
    return <MediaLinkCard item={item} buttonLabels={buttonLabels} language={language} />;
  }

  if (type === MEDIA_TYPES.YOUTUBE) {
    return (
      <MediaFigure item={item}>
        <MediaYoutube item={item} buttonLabels={buttonLabels} language={language} />
      </MediaFigure>
    );
  }

  if (IMAGE_DISPLAY_TYPES.includes(type)) {
    const category = (item.category || "").toLowerCase();
    const isFlyer = category.includes("flyer");
    const needsImage = type !== MEDIA_TYPES.DOCUMENT || isFlyer || Boolean(imageUrl);

    if (needsImage) {
      return (
        <MediaFigure item={item}>
          <MediaImage item={item} language={language} />
        </MediaFigure>
      );
    }
  }

  const linkUrl = hasUsableUrl(item.url) ? item.url : null;
  if (linkUrl) {
    return <MediaLinkCard item={item} buttonLabels={buttonLabels} language={language} />;
  }

  return (
    <article className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm">
      {item.title && <h3 className="text-lg font-semibold text-ecaa-green-950">{item.title}</h3>}
      {item.caption && (
        <p className="mt-2 text-sm leading-relaxed text-ecaa-ink-muted">{item.caption}</p>
      )}
      {!imageUrl && IMAGE_DISPLAY_TYPES.includes(type) && <ImagePlaceholder />}
    </article>
  );
}
