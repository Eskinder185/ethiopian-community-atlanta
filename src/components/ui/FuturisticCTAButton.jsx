import { Link } from "react-router-dom";

export default function FuturisticCTAButton({ to, icon, label, className = "", onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={[
        "group relative inline-flex min-w-[170px] items-center justify-center gap-3 overflow-hidden rounded-xl",
        "border border-cyan-500/70 bg-white/80 px-6 py-3 text-sm font-bold tracking-wide text-slate-950",
        "shadow-[0_0_0_rgba(6,182,212,0)] backdrop-blur-md transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50/80",
        "hover:shadow-[0_0_24px_rgba(6,182,212,0.35)]",
        "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2",
        "active:scale-[0.98]",
        "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-cyan-200/40 before:to-transparent",
        "before:transition-transform before:duration-700 hover:before:translate-x-full",
        className,
      ].join(" ")}
    >
      <span className="relative z-10 flex size-7 items-center justify-center rounded-full bg-cyan-50 text-cyan-700 transition group-hover:bg-cyan-100 group-hover:text-cyan-800">
        {icon}
      </span>

      <span className="relative z-10">{label}</span>
    </Link>
  );
}
