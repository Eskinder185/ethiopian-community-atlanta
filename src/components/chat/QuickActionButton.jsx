import { Link } from "react-router-dom";

export default function QuickActionButton({ label, href, external = false, onNavigate }) {
  const className =
    "inline-flex min-h-[44px] items-center justify-center rounded-full border border-ecaa-gold-200/80 bg-ecaa-cream/80 px-3 py-2 text-xs font-semibold text-ecaa-green-900 transition-colors duration-200 hover:border-ecaa-gold-300 hover:bg-ecaa-gold-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500 sm:text-sm";

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={href} className={className} onClick={onNavigate}>
      {label}
    </Link>
  );
}
