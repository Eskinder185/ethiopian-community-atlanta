import { Link } from "react-router-dom";
import { useState } from "react";
import siteInfo from "../content/siteInfo.json";
import { siteAssets } from "../config/assets";
import { useLanguage } from "../context/LanguageContext";
import { resolvePublicAssetPath } from "../utils/images";

export const LOGO_PATH = siteAssets.logo;
export const LOGO_ALT = siteAssets.logoAlt;

export const ORG_DISPLAY_NAME = siteInfo.name.replace(/, Inc\.$/, "");

const IMAGE_SIZE = {
  xs: "h-8",
  sm: "h-10",
  md: "h-12",
  lg: "h-14",
};

function LogoFallback({ sizeClass, className = "" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-lg bg-ecaa-green-900 px-2.5 text-sm font-bold tracking-tight text-ecaa-white ${sizeClass} min-w-10 ${className}`}
      aria-hidden="true"
    >
      {siteInfo.shortName}
    </span>
  );
}

export default function Logo({
  size = "md",
  showText = false,
  variant = "default",
  linkToHome = false,
  className = "",
  imageClassName = "",
  textClassName = "",
  ariaLabel,
}) {
  const { t, language } = useLanguage();
  const [failed, setFailed] = useState(false);
  const src = resolvePublicAssetPath(LOGO_PATH);
  const sizeClass = IMAGE_SIZE[size] || size;
  const logoAlt = language === "am" ? t("brand.logoAlt") : LOGO_ALT;
  const displayName = language === "am" ? t("brand.orgName") : ORG_DISPLAY_NAME;

  const image =
    failed || !src ? (
      <LogoFallback sizeClass={sizeClass} className={imageClassName} />
    ) : (
      <img
        src={src}
        alt={logoAlt}
        className={`w-auto shrink-0 object-contain ${sizeClass} ${imageClassName}`.trim()}
        onError={() => setFailed(true)}
      />
    );

  let textContent = null;

  if (showText === "responsive") {
    textContent = (
      <>
        <span className="shrink-0 whitespace-nowrap text-lg font-bold tracking-tight text-ecaa-green-900 transition-colors duration-300 group-hover:text-ecaa-green-800 xl:hidden xl:text-xl">
          {siteInfo.shortName}
        </span>
        <span className="hidden h-5 w-px shrink-0 bg-ecaa-border xl:block" aria-hidden="true" />
        <span className="hidden max-w-[14rem] truncate text-sm text-ecaa-ink-subtle xl:inline 2xl:max-w-[17rem]">
          {displayName}
        </span>
      </>
    );
  } else if (showText === "short") {
    const shortLabel = variant === "admin" ? "ECAA Admin" : siteInfo.shortName;
    const shortClass =
      variant === "admin"
        ? "text-sm font-bold tracking-tight text-ecaa-white"
        : "text-lg font-bold tracking-tight text-ecaa-green-900";

    textContent = (
      <span className={`shrink-0 whitespace-nowrap ${shortClass} ${textClassName}`.trim()}>
        {shortLabel}
      </span>
    );
  } else if (showText === "full") {
    textContent = (
      <span
        className={`text-lg font-semibold tracking-tight ${variant === "footer" ? "text-ecaa-white" : "text-ecaa-ink"} ${textClassName}`.trim()}
      >
        {ORG_DISPLAY_NAME}
      </span>
    );
  }

  const content = (
    <span className={`flex min-w-0 items-center gap-2.5 sm:gap-3 ${className}`.trim()}>
      {image}
      {textContent}
    </span>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="group flex min-w-0 shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500"
        aria-label={ariaLabel || `${siteInfo.name} home`}
      >
        {content}
      </Link>
    );
  }

  return (
    <span className="inline-flex min-w-0 items-center" aria-label={ariaLabel}>
      {content}
    </span>
  );
}
