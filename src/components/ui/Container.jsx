export default function Container({ children, className = "", wide = false }) {
  const base = wide ? "ecaa-container-wide" : "ecaa-container";
  return <div className={`${base} ${className}`.trim()}>{children}</div>;
}
