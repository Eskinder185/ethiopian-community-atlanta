export default function AdminSetupNotice({ message }) {
  if (!message) return null;

  return (
    <div
      className="mb-6 rounded-ecaa-lg border border-ecaa-gold-200 bg-ecaa-gold-50 px-4 py-3 text-sm leading-relaxed text-ecaa-ink-muted"
      role="status"
    >
      {message}
    </div>
  );
}
