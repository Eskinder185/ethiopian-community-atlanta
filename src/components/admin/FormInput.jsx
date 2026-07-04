export default function FormInput({
  id,
  label,
  hint,
  error,
  required = false,
  className = "",
  describedBy,
  ...props
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const ariaDescribedBy =
    describedBy || [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ecaa-ink">
          {label}
          {required ? (
            <>
              <span aria-hidden="true"> *</span>
              <span className="sr-only"> required</span>
            </>
          ) : null}
        </label>
      )}
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={ariaDescribedBy}
        aria-required={required || undefined}
        className="w-full min-h-[44px] rounded-lg border border-ecaa-border bg-ecaa-white px-3 py-2.5 text-base text-ecaa-ink shadow-ecaa-sm outline-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ecaa-green-700 focus:border-ecaa-green-700"
        {...props}
      />
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-ecaa-ink-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-ecaa-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
