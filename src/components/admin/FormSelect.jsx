export default function FormSelect({ id, label, hint, className = '', children, ...props }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ecaa-ink">
          {label}
        </label>
      )}
      <select
        id={id}
        className="w-full rounded-lg border border-ecaa-border bg-ecaa-white px-3 py-2.5 text-base text-ecaa-ink shadow-ecaa-sm outline-none transition-colors focus:border-ecaa-green-700 focus:ring-2 focus:ring-ecaa-green-700/20"
        {...props}
      >
        {children}
      </select>
      {hint && <p className="mt-1.5 text-xs text-ecaa-ink-subtle">{hint}</p>}
    </div>
  )
}
