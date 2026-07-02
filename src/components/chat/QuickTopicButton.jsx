export default function QuickTopicButton({ label, onClick }) {
  return (
    <button
      type="button"
      className="rounded-full border border-ecaa-gold-200/80 bg-ecaa-cream/80 px-3 py-1.5 text-xs font-semibold text-ecaa-green-900 transition-colors duration-200 hover:border-ecaa-gold-300 hover:bg-ecaa-gold-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500 sm:text-sm"
      onClick={onClick}
    >
      {label}
    </button>
  )
}
