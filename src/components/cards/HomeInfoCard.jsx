const ICON_STYLES = {
  community: "from-ecaa-green-100 to-ecaa-green-50 text-ecaa-green-900",
  culture: "from-ecaa-gold-100 to-ecaa-gold-50 text-ecaa-gold-800",
  heart: "from-ecaa-red-100 to-ecaa-red-50 text-ecaa-red-700",
  calendar: "from-ecaa-gold-100 to-ecaa-cream text-ecaa-gold-800",
  hands: "from-ecaa-green-100 to-ecaa-gold-50 text-ecaa-green-900",
  users: "from-ecaa-green-100 to-ecaa-green-50 text-ecaa-green-900",
  youth: "from-ecaa-gold-100 to-ecaa-gold-50 text-ecaa-gold-800",
  family: "from-ecaa-green-100 to-ecaa-cream text-ecaa-green-900",
  elders: "from-ecaa-gold-100 to-ecaa-green-50 text-ecaa-gold-800",
  professional: "from-ecaa-green-100 to-ecaa-green-50 text-ecaa-green-900",
  supporter: "from-ecaa-red-100 to-ecaa-gold-50 text-ecaa-red-700",
  years: "from-ecaa-gold-100 to-ecaa-gold-50 text-ecaa-gold-800",
  events: "from-ecaa-green-100 to-ecaa-green-50 text-ecaa-green-900",
  volunteer: "from-ecaa-green-100 to-ecaa-gold-50 text-ecaa-green-900",
  home: "from-ecaa-gold-100 to-ecaa-green-50 text-ecaa-green-900",
  edir: "from-ecaa-green-100 to-ecaa-green-50 text-ecaa-green-900",
  education: "from-ecaa-gold-100 to-ecaa-gold-50 text-ecaa-gold-800",
  wellness: "from-ecaa-green-100 to-ecaa-cream text-ecaa-green-900",
  civic: "from-ecaa-green-100 to-ecaa-green-50 text-ecaa-green-900",
};

const ICON_SYMBOLS = {
  community: "◉",
  culture: "✦",
  heart: "♥",
  calendar: "◷",
  hands: "◎",
  users: "◈",
  youth: "★",
  family: "⌂",
  elders: "◐",
  professional: "◆",
  supporter: "✧",
  years: "40+",
  events: "◷",
  volunteer: "◎",
  home: "⌂",
  edir: "◉",
  education: "★",
  wellness: "+",
  civic: "◈",
};

export default function HomeInfoCard({ title, description, icon = "community", className = "" }) {
  const iconStyle = ICON_STYLES[icon] || ICON_STYLES.community;
  const symbol = ICON_SYMBOLS[icon] || "◉";

  return (
    <article
      className={`flex h-full flex-col rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white p-6 shadow-ecaa-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ecaa-green-200/60 hover:shadow-ecaa-md sm:p-7 ${className}`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold shadow-ecaa-sm ${iconStyle}`}
        aria-hidden="true"
      >
        {symbol}
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-ecaa-ink sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-base leading-relaxed text-ecaa-ink-muted">{description}</p>
    </article>
  );
}
