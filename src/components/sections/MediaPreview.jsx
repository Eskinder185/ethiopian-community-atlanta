import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import MasonryGallery from "../ui/MasonryGallery";
import VideoCard from "../cards/VideoCard";
import EmptyState from "../ui/EmptyState";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import imagesData from "../../content/images.json";
import videosData from "../../content/videos.json";
import homeData from "../../content/homepage.json";
import { filterPublished, hasUsableText, toEmbedUrl } from "../../utils/data";

function getFeaturedImages(images, limit = 5) {
  const eligible = filterPublished(images).filter(
    (image) =>
      image.category !== "decorative" &&
      image.category !== "hero" &&
      hasUsableText(image.src) &&
      !image.src.startsWith("TODO")
  );

  const featured = eligible.filter((image) => image.featured === true);
  const source = featured.length > 0 ? featured : eligible;

  return source.slice(0, limit);
}

function getFeaturedVideo(videos) {
  const published = filterPublished(videos);
  const featured = published.filter((video) => video.featured === true);
  const candidates = featured.length > 0 ? featured : published;

  return (
    candidates.find((video) => toEmbedUrl(video.embedUrl)) ??
    candidates.find((video) => hasUsableText(video.embedUrl)) ??
    null
  );
}

export default function MediaPreview() {
  const { mediaPreview } = homeData;
  const images = getFeaturedImages(imagesData.images);
  const video = getFeaturedVideo(videosData.videos);
  const hasContent = images.length > 0 || Boolean(video);

  return (
    <section className="surface-muted">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={mediaPreview.eyebrow}
            title={mediaPreview.title}
            description={mediaPreview.description}
            action={{ label: "View Media Gallery", to: "/media", variant: "secondary" }}
          />

          {hasContent ? (
            <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              {images.length > 0 && <MasonryGallery images={images} />}
              {video ? (
                <div className={images.length > 0 ? "" : "lg:col-span-2"}>
                  <VideoCard video={video} />
                </div>
              ) : (
                images.length === 0 && null
              )}
            </div>
          ) : (
            <EmptyState
              className="mt-14"
              title="Photos and videos will be added soon."
              description="Featured photos and videos from ECAA events and programs will appear here."
              action={
                <CTAButton to="/media" variant="secondary">
                  View Media Gallery
                </CTAButton>
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  );
}
