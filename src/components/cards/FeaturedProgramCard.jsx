import CTAButton from "../ui/CTAButton";
import { useLanguage } from "../../context/LanguageContext";
import { getLinkProps, getPublicText, isUsableHomeText } from "../../utils/homepage";

const ICON_GRADIENTS = {
  hands: "from-ecaa-green-800 via-ecaa-green-700 to-ecaa-green-900",
  culture: "from-ecaa-gold-700 via-ecaa-gold-600 to-ecaa-green-800",
  education: "from-ecaa-green-700 via-ecaa-green-600 to-ecaa-gold-700",
  community: "from-ecaa-green-900 via-ecaa-green-800 to-ecaa-gold-800",
};

export default function FeaturedProgramCard({ item }) {
  const { t } = useLanguage();
  const cta = getLinkProps({ href: item.href });
  const hasImage = isUsableHomeText(item.image) && !item.image.startsWith("TODO");
  const imageAlt = getPublicText(item.imageAlt, item.title);
  const iconGradient = ICON_GRADIENTS[item.icon] || ICON_GRADIENTS.hands;

  return (
    <article className="group relative min-h-[260px] overflow-hidden rounded-ecaa-xl border border-ecaa-border/70 shadow-ecaa-sm sm:min-h-[280px]">
      {hasImage ? (
        <img
          src={item.image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${iconGradient}`} aria-hidden="true" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ecaa-green-950/95 via-ecaa-green-950/55 to-ecaa-green-950/20 transition-colors duration-300 group-hover:from-ecaa-green-950/98" />

      <div className="relative flex h-full min-h-[260px] flex-col justify-end p-5 sm:min-h-[280px] sm:p-6">
        <h3 className="text-xl font-semibold tracking-tight text-ecaa-white">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ecaa-cream/85">
          {item.shortDescription}
        </p>

        {cta && (
          <CTAButton
            {...cta}
            variant="ghost"
            size="sm"
            className="mt-4 self-start !px-0 !text-ecaa-gold-300 hover:!bg-transparent hover:!text-ecaa-white"
          >
            {t("common.learnMore")}
          </CTAButton>
        )}
      </div>
    </article>
  );
}
