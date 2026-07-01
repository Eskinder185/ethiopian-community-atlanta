import { useId, useState } from 'react'
import { isTodoValue } from '../../utils/data'

export default function Accordion({ items = [], className = '' }) {
  const baseId = useId()
  const [openId, setOpenId] = useState(null)

  if (!items.length) return null

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {items.map((item) => {
        const isOpen = openId === item.id
        const panelId = `${baseId}-${item.id}`
        const answerIsTodo =
          typeof item.answer === 'string' && isTodoValue(item.answer)

        return (
          <div key={item.id} className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm transition-shadow duration-300 hover:shadow-ecaa">
            <h3 className="m-0">
              <button
                type="button"
                id={`${panelId}-button`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold text-ecaa-ink transition-colors hover:bg-ecaa-green-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ecaa-gold-500"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                <span className="text-ecaa-gold-600" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-button`}
              hidden={!isOpen}
              className="border-t border-ecaa-border px-6 py-5"
            >
              <p
                className={`text-body ${answerIsTodo ? 'editorial-todo' : ''}`}
              >
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
