export default function ResponsiveEmbed({
  src,
  title,
  aspectRatio = '16/9',
  className = '',
  allowFullScreen = true,
}) {
  if (!src) return null

  return (
    <div
      className={`overflow-hidden rounded-ecaa-lg border border-ecaa-border bg-ecaa-white shadow-ecaa ${className}`.trim()}
      style={{ aspectRatio }}
    >
      <iframe
        src={src}
        title={title}
        className="h-full w-full"
        loading="lazy"
        allowFullScreen={allowFullScreen}
      />
    </div>
  )
}
