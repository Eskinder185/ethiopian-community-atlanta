import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Logo from "../Logo";
import contactData from "../../content/contact.json";
import navigation from "../../data/navigation.json";
import { useLanguage } from "../../context/LanguageContext";
import { translateNavLabel } from "../../utils/navigationLabels";
import { hasUsableText } from "../../utils/data";

const linkClass =
  "inline-flex min-h-[44px] items-center text-sm text-ecaa-green-100/90 transition-colors duration-200 hover:text-ecaa-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-400";

const socialLabelKeys = {
  facebook: "footer.facebook",
  instagram: "footer.instagram",
  youtube: "footer.youtube",
  tiktok: "footer.tiktok",
};

function translateLegalLabel(label, t) {
  if (label === "Privacy Policy") return t("footer.privacy");
  if (label === "Terms & Conditions" || label === "Terms of Use") return t("footer.terms");
  return label;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const [linksOpen, setLinksOpen] = useState(false);
  const { general, social, footer: contactFooter } = contactData;
  const { footer: navFooter } = navigation;
  const legalLinks = contactFooter.legalLinks ?? [];
  const quickLinks = navFooter.quickLinks ?? [];
  const mission = t("footer.mission");

  const addressLine = hasUsableText(general.address?.street)
    ? `${general.address.street}, ${general.address.city}, ${general.address.state} ${general.address.zip}`
    : null;

  const socialLinks = Object.entries(social ?? {}).filter(([, url]) => hasUsableText(url));

  return (
    <footer className="mt-auto border-t border-ecaa-green-800/40 bg-ecaa-green-950 text-ecaa-white pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <Container className="px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Logo variant="footer" size="sm" />
              <p className="text-sm font-semibold tracking-tight text-ecaa-white sm:text-base">
                {t("brand.orgName")}
              </p>
            </div>
            {hasUsableText(mission) && (
              <p className="max-w-sm text-sm leading-snug text-ecaa-green-100/85 line-clamp-3 md:line-clamp-none">
                {mission}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-ecaa-gold-200">
              {t("footer.contact")}
            </h2>
            <div className="space-y-0.5 text-sm text-ecaa-green-100/90">
              {addressLine && <p className="py-1">{addressLine}</p>}
              {hasUsableText(general.phone) && (
                <p>
                  <a href={`tel:${general.phone.replace(/\s/g, "")}`} className={linkClass}>
                    {general.phone}
                  </a>
                </p>
              )}
              {hasUsableText(general.email) && (
                <p>
                  <a href={`mailto:${general.email}`} className={linkClass}>
                    {general.email}
                  </a>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              className="flex min-h-[44px] w-full items-center justify-between gap-2 text-left md:pointer-events-none md:cursor-default"
              aria-expanded={linksOpen}
              onClick={() => setLinksOpen((open) => !open)}
            >
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-ecaa-gold-200">
                {t("footer.quickLinks")}
              </h2>
              <span className="text-sm text-ecaa-green-200 md:hidden" aria-hidden="true">
                {linksOpen ? "▴" : "▾"}
              </span>
            </button>
            <ul
              className={`flex flex-col gap-0.5 md:flex md:flex-row md:flex-wrap md:gap-x-3 md:gap-y-1.5 ${linksOpen ? "block" : "hidden md:flex"}`}
            >
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={linkClass}>
                    {translateNavLabel(item.label, t)}
                  </Link>
                </li>
              ))}
            </ul>

            {socialLinks.length > 0 && (
              <div className="pt-1">
                <h3 className="sr-only">{t("footer.socialMedia")}</h3>
                <ul className="flex flex-wrap gap-x-1 gap-y-0">
                  {socialLinks.map(([network, url]) => (
                    <li key={network}>
                      <a
                        href={url}
                        className={linkClass}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t(socialLabelKeys[network] || network)} (opens in a new tab)`}
                      >
                        {t(socialLabelKeys[network] || network)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-ecaa-green-800/40 pt-5 text-center text-sm text-ecaa-green-100/85 sm:flex-row sm:text-left">
          <p>{t("footer.copyright").replace("{year}", String(currentYear))}</p>
          {legalLinks.length > 0 && (
            <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0 sm:justify-end">
              {legalLinks.map((item) => (
                <Link key={item.path} to={item.path} className={linkClass}>
                  {translateLegalLabel(item.label, t)}
                </Link>
              ))}
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
