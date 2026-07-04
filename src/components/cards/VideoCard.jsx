import ResponsiveEmbed from "../ui/ResponsiveEmbed";
import CTAButton from "../ui/CTAButton";
import { hasUsableText, hasUsableUrl, toEmbedUrl } from "../../utils/data";

export default function VideoCard({ video }) {
  const embedSrc = toEmbedUrl(video.embedUrl);
  const canEmbed = Boolean(embedSrc);

  return (
    <article className="ecaa-card-hover flex h-full flex-col overflow-hidden p-0">
      {canEmbed ? (
        <ResponsiveEmbed
          src={embedSrc}
          title={video.title}
          className="rounded-none border-0 shadow-none"
        />
      ) : (
        <div
          className="flex aspect-video items-center justify-center bg-ecaa-cream-dark px-6 text-center"
          role="img"
          aria-label="Video preview not yet available"
        >
          <p className="text-base text-ecaa-ink-subtle">Video preview not yet available</p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="heading-section text-xl">{video.title}</h3>

        {hasUsableText(video.description) && (
          <p className="text-body mt-3 flex-1">{video.description}</p>
        )}

        {hasUsableUrl(video.embedUrl) && (
          <CTAButton href={video.embedUrl} variant="ghost" size="sm" className="mt-6 self-start">
            Open video
          </CTAButton>
        )}
      </div>
    </article>
  );
}
