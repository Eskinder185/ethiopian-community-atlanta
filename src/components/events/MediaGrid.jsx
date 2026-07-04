import MediaCard from "./MediaCard";

export default function MediaGrid({ items = [], className = "" }) {
  if (!items.length) return null;

  return (
    <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`.trim()}>
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
}
