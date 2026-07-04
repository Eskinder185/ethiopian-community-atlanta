export default function Container({ children, className = "", wide = false }) {
  const base = wide ? "page-container-wide" : "page-container";
  return <div className={`${base} ${className}`.trim()}>{children}</div>;
}
