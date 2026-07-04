import PageHero from "../components/layout/PageHero";
import CTAButton from "../components/ui/CTAButton";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  en: {
    eyebrow: "Page not found",
    title: "Page not found",
    description: "The page you are looking for may have moved or is no longer available.",
    home: "Return Home",
    membership: "Become a Member",
    contact: "Contact ECAA",
  },
  am: {
    eyebrow: "ገጹ አልተገኘም",
    title: "ገጹ አልተገኘም",
    description: "የሚፈልጉት ገጽ ተወግዷል ወይም አሁን የለም።",
    home: "ወደ መነሻ ይመለሱ",
    membership: "አባል ይሁኑ",
    contact: "ECAAን ያግኙ",
  },
};

export default function NotFound() {
  const { language } = useLanguage();
  const text = copy[language] || copy.en;

  return (
    <>
      <SEO title="Page not found" description={text.description} canonicalPath="/404" noIndex />
      <PageHero
        eyebrow={text.eyebrow}
        title={text.title}
        description={text.description}
        patternOnly
        overlayStrength="strong"
      >
        <CTAButton to="/" variant="primary" size="lg">
          {text.home}
        </CTAButton>
        <CTAButton to="/membership" variant="secondary" size="lg" className="btn-hero-outline">
          {text.membership}
        </CTAButton>
        <CTAButton to="/contact" variant="secondary" size="lg" className="btn-hero-outline">
          {text.contact}
        </CTAButton>
      </PageHero>
    </>
  );
}
