import Badge from "../ui/Badge";
import { getPublicText, isUsableHomeText } from "../../utils/homepage";

const PLACEHOLDER_GRADIENTS = [
  "from-ecaa-green-900/80 via-ecaa-green-800/40 to-ecaa-gold-600/30",
  "from-ecaa-green-950/75 via-ecaa-green-700/35 to-ecaa-cream/20",
  "from-ecaa-gold-700/50 via-ecaa-green-900/60 to-ecaa-green-950/70",
];

export default function EventPreviewCard({ item, size = "default", index = 0 }) {
  const hasImage = isUsableHomeText(item.image) && !item.image.startsWith("TODO");
  const imageAlt = getPublicText(item.imageAlt, item.title);
  const isLarge = size === "large";
  const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];

  return (
    <article
      className={`group relative overflow-hidden rounded-ecaa-xl border border-ecaa-border/70 shadow-ecaa-sm ${
        isLarge ? "min-h-[320px] sm:min-h-[380px]" : "min-h-[220px] sm:min-h-[260px]"
      }`}
    >
      {hasImage ? (
        <img
          src={item.image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} aria-hidden="true" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ecaa-green-950/90 via-ecaa-green-950/35 to-ecaa-green-950/10" />

      <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
        {isUsableHomeText(item.category) && (
          <Badge variant="gold" className="mb-3 w-fit">
            {item.category}
          </Badge>
        )}
        <h3
          className={`font-semibold tracking-tight text-ecaa-white ${isLarge ? "text-2xl" : "text-lg"}`}
        >
          {item.title}
        </h3>
        {isUsableHomeText(item.excerpt) && (
          <p className={`mt-2 text-ecaa-cream/85 ${isLarge ? "text-base" : "text-sm"}`}>
            {item.excerpt}
          </p>
        )}
      </div>
    </article>
  );
}
