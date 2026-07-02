export default function AboutHowItWorks({ section }) {
  const items = section.items || []

  return (
    <div className="max-w-5xl">
      {section.intro && (
        <p className="text-lead mb-10 max-w-3xl leading-relaxed">{section.intro}</p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
        {items.map((item, index) => {
          const text = typeof item === 'string' ? item : item.question
          return (
            <li
              key={text}
              className="flex gap-4 rounded-ecaa-xl border border-ecaa-border/70 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ecaa-green-50 text-sm font-bold text-ecaa-green-800"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <p className="text-base leading-relaxed text-ecaa-ink sm:text-lg">{text}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
