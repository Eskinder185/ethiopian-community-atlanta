const BADGE_INITIALS = {
  Mission: "M",
  Vision: "V",
  ተልዕኮ: "ተ",
  ራዕይ: "ራ",
};

export default function AboutMissionVision({ section }) {
  return (
    <div className="max-w-5xl">
      {section.intro && <p className="text-lead max-w-3xl leading-relaxed">{section.intro}</p>}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {section.cards.map((card) => (
          <article
            key={card.title}
            className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-7 shadow-ecaa-sm sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ecaa-gold-100 to-ecaa-gold-200 text-sm font-bold text-ecaa-gold-700 shadow-ecaa-sm"
                aria-hidden="true"
              >
                {BADGE_INITIALS[card.title] || card.title.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-semibold normal-case tracking-tight text-ecaa-green-900 sm:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                  {card.body}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
