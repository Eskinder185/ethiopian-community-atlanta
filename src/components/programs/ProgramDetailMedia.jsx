import { useState } from "react";
import { toEmbedUrl, hasUsableUrl } from "../../utils/data";
import { resolvePublicAssetPath } from "../../utils/images";
import EmptyState from "../ui/EmptyState";
import CTAButton from "../ui/CTAButton";

const FLYER_PLACEHOLDER_TEXT = "Program flyer will appear here once uploaded by an ECAA editor.";

function MediaImagePlaceholder({ item, message = FLYER_PLACEHOLDER_TEXT }) {
  return (
    <figure className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
      <div className="flex min-h-[14rem] flex-col items-center justify-center bg-linear-to-br from-ecaa-cream/80 to-ecaa-white px-6 py-10 text-center sm:min-h-[18rem]">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-ecaa-gold-200 bg-ecaa-gold-50 text-ecaa-gold-700"
          aria-hidden="true"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
            />
          </svg>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-ecaa-ink-muted">{message}</p>
      </div>
      {(item.title || item.caption) && (
        <figcaption className="border-t border-ecaa-border/60 px-4 py-3">
          {item.title && (
            <p className="font-semibold normal-case text-ecaa-green-950">{item.title}</p>
          )}
          {item.caption && (
            <p className="mt-1 text-sm leading-relaxed text-ecaa-ink-muted">{item.caption}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function MediaImage({ item }) {
  const [failed, setFailed] = useState(false);
  const src = resolvePublicAssetPath(item.imageUrl || item.url);

  if (!src || failed) {
    return <MediaImagePlaceholder item={item} />;
  }

  return (
    <figure className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
      <div className="flex items-center justify-center bg-ecaa-cream/40 p-4 sm:p-6">
        <img
          src={src}
          alt={item.altText || item.title || "Program media"}
          className="max-h-[28rem] w-full object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </div>
      {(item.title || item.caption) && (
        <figcaption className="border-t border-ecaa-border/60 px-4 py-3">
          {item.title && (
            <p className="font-semibold normal-case text-ecaa-green-950">{item.title}</p>
          )}
          {item.caption && (
            <p className="mt-1 text-sm leading-relaxed text-ecaa-ink-muted">{item.caption}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function MediaYoutube({ item }) {
  const embedUrl = toEmbedUrl(item.url);
  if (!embedUrl) return null;

  return (
    <figure className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          title={item.title || "Program video"}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {(item.title || item.caption) && (
        <figcaption className="border-t border-ecaa-border/60 px-4 py-3">
          {item.title && (
            <p className="font-semibold normal-case text-ecaa-green-950">{item.title}</p>
          )}
          {item.caption && (
            <p className="mt-1 text-sm leading-relaxed text-ecaa-ink-muted">{item.caption}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function MediaLinkCard({ item, label = "Open" }) {
  if (!hasUsableUrl(item.url)) return null;

  return (
    <article className="flex h-full flex-col rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm">
      {item.title && (
        <h3 className="text-lg font-semibold normal-case text-ecaa-green-950">{item.title}</h3>
      )}
      {item.caption && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ecaa-ink-muted">{item.caption}</p>
      )}
      <div className="mt-5">
        <CTAButton href={item.url} variant="secondary" size="sm">
          {label}
        </CTAButton>
      </div>
    </article>
  );
}

function renderMediaItem(item) {
  switch (item.type) {
    case "youtube":
      return <MediaYoutube item={item} />;
    case "image":
    case "gif":
      return <MediaImage item={item} />;
    case "document":
      return <MediaLinkCard item={item} label="View Document" />;
    case "video_link":
      return <MediaLinkCard item={item} label="Watch Video" />;
    default:
      return <MediaImage item={item} />;
  }
}

export default function ProgramDetailMedia({ program, labels = {} }) {
  const items = program.mediaItems ?? [];
  const emptyDescription =
    program.mediaEmptyMessage || labels.mediaEmpty || "Media for this program will be added soon.";

  return (
    <section className="surface-white py-14 sm:py-16">
      <div className="container-ecaa">
        <div className="mx-auto max-w-5xl">
          <h2 className="heading-section text-2xl normal-case sm:text-3xl">
            {labels.programMedia || "Program Media"}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ecaa-ink-muted">
            {labels.programMediaIntro ||
              "Photos, videos, flyers, and community moments related to this program can be added here by ECAA editors."}
          </p>

          {items.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {items.map((item) => (
                <div key={item.id}>{renderMediaItem(item)}</div>
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                compact
                title={labels.mediaComingSoon || "Media coming soon"}
                description={emptyDescription}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
