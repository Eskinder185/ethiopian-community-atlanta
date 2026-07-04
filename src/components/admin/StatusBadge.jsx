const variants = {
  draft: "bg-ecaa-cream-dark text-ecaa-ink-muted border-ecaa-border",
  live: "bg-ecaa-green-100 text-ecaa-green-900 border-ecaa-green-200",
  soon: "bg-ecaa-gold-100 text-ecaa-green-950 border-ecaa-gold-200",
};

export default function StatusBadge({ label, variant = "soon" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${variants[variant] || variants.soon}`}
    >
      {label}
    </span>
  );
}
