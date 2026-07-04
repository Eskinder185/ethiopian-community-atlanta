import {
  FaYoutube,
  FaTiktok,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";
import { useLanguage } from "../../context/LanguageContext";
import { hasUsableText } from "../../utils/data";

const SOCIAL_ITEMS = [
  { key: "youtube", labelKey: "social.visitYoutube", icon: FaYoutube },
  { key: "tiktok", labelKey: "social.visitTiktok", icon: FaTiktok },
  { key: "facebook", labelKey: "social.visitFacebook", icon: FaFacebookF },
  { key: "instagram", labelKey: "social.visitInstagram", icon: FaInstagram },
];

const VARIANT_STYLES = {
  dark:
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white hover:text-[#0B3D2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B3D2E]",
  light:
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-100 bg-white text-[#0B3D2E] transition-colors hover:bg-[#0B3D2E] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-ecaa-cream",
};

export default function SocialLinks({
  socialLinks = {},
  variant = "dark",
  className = "",
  listClassName = "flex flex-wrap items-center gap-2",
}) {
  const { t } = useLanguage();
  const linkClass = VARIANT_STYLES[variant] ?? VARIANT_STYLES.dark;

  const visibleItems = SOCIAL_ITEMS.filter((item) => hasUsableText(socialLinks[item.key]));

  if (visibleItems.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="sr-only">{t("footer.socialMedia")}</h3>
      <ul className={listClassName} role="list">
        {visibleItems.map(({ key, labelKey, icon: Icon }) => (
          <li key={key}>
            <a
              href={socialLinks[key].trim()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(labelKey)}
              className={linkClass}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
