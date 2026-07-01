export default function TodoNotice({ items = [] }) {
  if (!items.length) return null

  return (
    <aside className="notice-todo" aria-label="Content to be added">
      <p className="text-base font-semibold text-ecaa-gold-700">
        TODO — content needed
      </p>
      <ul className="mt-3 space-y-2 text-base text-ecaa-ink-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-ecaa-gold-500" aria-hidden="true">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
