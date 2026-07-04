import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import HomeSectionHeader from "../ui/HomeSectionHeader";
import CTAButton from "../ui/CTAButton";
import EmptyState from "../ui/EmptyState";
import AnimateIn from "../ui/AnimateIn";
import { useLanguage } from "../../context/LanguageContext";
import {
  getHomepageFeaturedMedia,
  getLinkProps,
  getMediaAlt,
  getMediaCaption,
  getPublicText,
  isSectionVisible,
} from "../../utils/homepage";
import { applyMediaItemsLocale } from "../../utils/mediaLocale";
import { resolvePublicImageUrl } from "../../lib/uploadMedia";
import { getDirectImageUrl } from "../../utils/mediaUrl";

function MediaPreviewCard({ item }) {
  const { t } = useLanguage();
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = getDirectImageUrl(
    resolvePublicImageUrl(item.src || item.imageUrl || item.image_url || "") ||
      item.src ||
      item.imageUrl ||
      item.image_url ||
      ""
  );
  const title = getPublicText(item.title);
  const caption = getMediaCaption(item);

  if (!imageSrc || imageFailed) return null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white shadow-ecaa-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-ecaa-cream">
        <img
          src={imageSrc}
          alt={getMediaAlt(item)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {title && <h3 className="line-clamp-2 text-lg font-semibold text-ecaa-ink">{title}</h3>}
        {caption && caption !== title && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ecaa-ink-muted">{caption}</p>
        )}
        <Link
          to="/media"
          className="mt-4 min-h-[44px] text-sm font-semibold leading-[44px] text-ecaa-green-800 hover:underline"
        >
          {t("common.viewInGallery")}
        </Link>
      </div>
    </article>
  );
}

export default function HomeMediaPreview({ section, mediaItems = [] }) {
  const { language } = useLanguage();

  if (!isSectionVisible(section)) return null;

  const maxItems = section.maxItems ?? 6;
  const localizedItems = applyMediaItemsLocale(mediaItems, language);
  const items = getHomepageFeaturedMedia(localizedItems, maxItems);
  const sectionCta = getLinkProps(section.sectionCta);
  const emptyState = section.emptyState ?? {};
  const emptyPrimaryCta = getLinkProps(emptyState.primaryCta);
  const hasItems = items.length > 0;

  return (
    <section className="home-section surface-muted" aria-labelledby="home-media-heading">
      <Container className="home-section-inner">
        <AnimateIn>
          <HomeSectionHeader
            id="home-media-heading"
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            action={
              hasItems && sectionCta
                ? { label: section.sectionCta.label, ...sectionCta, variant: "secondary" }
                : undefined
            }
            className="home-section-header-row"
          />

          {hasItems ? (
            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {items.map((item, index) => (
                <AnimateIn
                  key={item.id}
                  delay={index * 50}
                  className={index >= 3 ? "hidden sm:block" : ""}
                >
                  <MediaPreviewCard item={item} />
                </AnimateIn>
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-10 rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white/80 p-8 text-center shadow-ecaa-sm sm:p-10"
              headingLevel="h3"
              title={emptyState.title || "Community photos and highlights will be added soon."}
              description={emptyState.description || ""}
              action={
                emptyPrimaryCta ? (
                  <CTAButton
                    {...emptyPrimaryCta}
                    variant="primary"
                    size="lg"
                    className="min-h-[44px]"
                  >
                    {emptyState.primaryCta?.label || "View Media"}
                  </CTAButton>
                ) : sectionCta ? (
                  <CTAButton
                    {...sectionCta}
                    variant="primary"
                    size="lg"
                    className="min-h-[44px]"
                  >
                    {section.sectionCta.label}
                  </CTAButton>
                ) : null
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  );
}
