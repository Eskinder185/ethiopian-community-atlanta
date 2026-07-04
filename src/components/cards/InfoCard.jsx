export default function InfoCard({ title, children, className = "", hover = false, id }) {
  const cardClass = hover ? "ecaa-card-hover" : "ecaa-card";

  return (
    <article id={id} className={`${cardClass} ${className}`.trim()}>
      {title && <h2 className="heading-section text-2xl">{title}</h2>}
      <div className={title ? "text-body mt-4" : "text-body"}>{children}</div>
    </article>
  );
}
