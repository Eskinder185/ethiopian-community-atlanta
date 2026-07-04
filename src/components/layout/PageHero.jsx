import Container from "../ui/Container";
import Badge from "../ui/Badge";
import AnimateIn from "../ui/AnimateIn";
import {
  getImageById,
  getPatternImage,
  getResolvedImageSrc,
  hasImageAsset,
} from "../../utils/images";

const overlayPresets = {
  welcoming: {
    main: "from-ecaa-green-950/72 via-ecaa-green-900/48 to-ecaa-gold-900/20",
    vertical: "from-ecaa-green-950/45 via-transparent to-ecaa-green-950/18",
    mobile: "bg-ecaa-green-950/12",
  },
  subtle: {
    main: "from-ecaa-green-950/88 via-ecaa-green-950/65 to-ecaa-green-950/30",
    vertical: "from-ecaa-green-950/60 via-ecaa-green-950/15 to-ecaa-green-950/25",
    mobile: "bg-ecaa-green-950/20",
  },
  default: {
    main: "from-ecaa-green-950/95 via-ecaa-green-950/78 to-ecaa-green-950/40",
    vertical: "from-ecaa-green-950/70 via-ecaa-green-950/20 to-ecaa-green-950/30",
    mobile: "bg-ecaa-green-950/30",
  },
  strong: {
    main: "from-ecaa-green-950/97 via-ecaa-green-950/88 to-ecaa-green-950/55",
    vertical: "from-ecaa-green-950/80 via-ecaa-green-950/35 to-ecaa-green-950/40",
    mobile: "bg-ecaa-green-950/40",
  },
};

const positionClasses = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
};

const sizeClasses = {
  home: "min-h-[480px] py-14 sm:min-h-[520px] sm:py-16 lg:min-h-[580px] lg:py-20",
  page: "min-h-[560px] py-16 sm:min-h-[580px] sm:py-20 lg:min-h-[640px] lg:py-24",
};

/** Legacy hero for pages not yet on pageHeroes.json (e.g. NotFound). */
export default function PageHero({
  eyebrow,
  title,
  description,
  badge,
  imageId,
  patternImageId,
  patternOnly = false,
  backgroundPosition = "center",
  overlayStrength = "default",
  showPatternOverlay = true,
  showBottomFade = true,
  size = "page",
  priority = false,
  children,
  footer,
}) {
  const backgroundImage = imageId ? getImageById(imageId) : null;
  const patternFromId = patternImageId ? getImageById(patternImageId) : null;
  const defaultPattern = getPatternImage();
  const pattern = patternFromId || defaultPattern;
  const hasPhoto = !patternOnly && hasImageAsset(backgroundImage);
  const overlay = overlayPresets[overlayStrength] || overlayPresets.default;
  const objectPosition = positionClasses[backgroundPosition] || positionClasses.center;
  const isHome = size === "home";
  const titleLines = typeof title === "string" ? title.split("\n").filter(Boolean) : [title];

  return (
    <header className="hero-bg relative isolate overflow-hidden">
      {hasPhoto ? (
        <img
          src={getResolvedImageSrc(backgroundImage)}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover ${objectPosition}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
      ) : (
        <div className="absolute inset-0 bg-ecaa-green-950" aria-hidden="true" />
      )}

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${overlay.main}`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${overlay.vertical}`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute inset-0 md:hidden ${overlay.mobile}`}
        aria-hidden="true"
      />

      {showPatternOverlay && hasImageAsset(pattern) && (
        <div
          className={`pointer-events-none absolute inset-0 mix-blend-soft-light ${
            patternOnly ? "opacity-[0.14]" : "opacity-[0.06]"
          }`}
          aria-hidden="true"
          style={{
            backgroundImage: `url(${getResolvedImageSrc(pattern)})`,
            backgroundRepeat: "repeat",
            backgroundSize: "280px auto",
          }}
        />
      )}

      {showBottomFade && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ecaa-cream/80 to-transparent"
          aria-hidden="true"
        />
      )}

      <Container
        className={`relative flex flex-col justify-center ${sizeClasses[size] || sizeClasses.page}`}
      >
        <AnimateIn>
          <div className={isHome ? "max-w-[34rem]" : "max-w-[640px]"}>
            {badge && (
              <div className="mb-5">
                <Badge variant={badge.variant || "gold"} className="hero-bg-badge">
                  {badge.label}
                </Badge>
              </div>
            )}
            {eyebrow && (
              <>
                <p className={isHome ? "hero-home-eyebrow" : "hero-page-eyebrow"}>{eyebrow}</p>
                {isHome && (
                  <span
                    className="mt-4 mb-1 block h-1 w-14 rounded-full bg-gradient-to-r from-ecaa-gold-400 to-ecaa-gold-600"
                    aria-hidden="true"
                  />
                )}
              </>
            )}
            <h1
              className={`${isHome ? "hero-home-title" : "hero-page-title"} ${eyebrow || badge ? (isHome ? "mt-3" : "mt-4") : ""}`}
            >
              {titleLines.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            {description && (
              <p
                className={`${isHome ? "hero-home-lead" : "hero-page-lead"} ${isHome ? "mt-5" : "mt-6"}`}
              >
                {description}
              </p>
            )}
            {children && (
              <div className={isHome ? "mt-8" : "mt-10"}>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  {children}
                </div>
              </div>
            )}
            {footer && <p className="hero-home-trust mt-5 max-w-md">{footer}</p>}
          </div>
        </AnimateIn>
      </Container>
    </header>
  );
}
