import Container from "../ui/Container";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import { siteAssets } from "../../config/assets";
import { getPatternImage, getResolvedImageSrc, hasImageAsset } from "../../utils/images";
import { getLinkProps, getPublicText } from "../../utils/homepage";

export default function HomeHeroSection({ data }) {
  const backgroundImage = { src: siteAssets.heroes.home, alt: data.imageAlt };
  const pattern = getPatternImage();
  const hasPhoto = Boolean(siteAssets.heroes.home);
  const imageAlt =
    getPublicText(data.imageAlt) ||
    "Community members gathered at the Ethiopian Community Association in Atlanta.";

  return (
    <header className="home-hero relative isolate overflow-hidden bg-ecaa-green-950">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ecaa-green-950 via-ecaa-green-900 to-ecaa-green-950"
        aria-hidden="true"
      />

      {hasImageAsset(pattern) && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${getResolvedImageSrc(pattern)})`,
            backgroundRepeat: "repeat",
            backgroundSize: "280px auto",
          }}
        />
      )}

      <div
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-ecaa-gold-500/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <AnimateIn>
            <div className="max-w-xl">
              {data.eyebrow && (
                <>
                  <p className="hero-home-eyebrow">{data.eyebrow}</p>
                  <span
                    className="mt-4 mb-1 block h-1 w-14 rounded-full bg-gradient-to-r from-ecaa-gold-400 to-ecaa-gold-600"
                    aria-hidden="true"
                  />
                </>
              )}
              <h1 className="hero-home-title mt-3">{data.title}</h1>
              {data.description && (
                <p className="hero-home-lead mt-5 max-w-lg">{data.description}</p>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {getLinkProps(data.primaryCta) && (
                  <CTAButton {...getLinkProps(data.primaryCta)} variant="primary" size="lg">
                    {data.primaryCta.label}
                  </CTAButton>
                )}
                {getLinkProps(data.secondaryCta) && (
                  <CTAButton
                    {...getLinkProps(data.secondaryCta)}
                    variant="secondary"
                    size="lg"
                    className="btn-hero-outline"
                  >
                    {data.secondaryCta.label}
                  </CTAButton>
                )}
                {getLinkProps(data.supportCta) && (
                  <CTAButton
                    {...getLinkProps(data.supportCta)}
                    variant="ghost"
                    size="lg"
                    className="btn-hero-ghost"
                  >
                    {data.supportCta.label}
                  </CTAButton>
                )}
              </div>

              {getPublicText(data.trustCue) && (
                <p className="hero-home-trust mt-5 max-w-md">{getPublicText(data.trustCue)}</p>
              )}
            </div>
          </AnimateIn>

          <AnimateIn delay={80}>
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div
                className="absolute -inset-3 rounded-ecaa-2xl bg-gradient-to-br from-ecaa-gold-400/30 to-ecaa-green-400/20 blur-sm"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-ecaa-2xl border border-ecaa-white/15 shadow-ecaa-lg">
                {hasPhoto ? (
                  <img
                    src={getResolvedImageSrc(backgroundImage)}
                    alt={imageAlt}
                    className="aspect-[4/3] w-full object-cover object-center lg:aspect-[5/4]"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                ) : (
                  <div
                    className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-ecaa-green-800 to-ecaa-green-950 lg:aspect-[5/4]"
                    role="img"
                    aria-label="Community gathering image placeholder"
                  >
                    <p className="px-6 text-center text-sm text-ecaa-cream/70">
                      Community photo coming soon
                    </p>
                  </div>
                )}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ecaa-green-950/50 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </AnimateIn>
        </div>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ecaa-cream/90 to-transparent"
        aria-hidden="true"
      />
    </header>
  );
}
