import { Link } from 'react-router-dom'

import { useLanguage } from '../../context/LanguageContext'

import { getChatHelpContent, localizeIntent } from '../../data/chatHelpContent'



function ActionLink({ button, onNavigate }) {

  const isExternal = button.external || button.href.startsWith('http')

  const linkClass =

    'inline-flex items-center justify-center rounded-lg bg-ecaa-green-900 px-3 py-2 text-sm font-medium normal-case text-ecaa-white transition-colors duration-200 hover:bg-ecaa-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500'



  if (isExternal) {

    return (

      <a

        href={button.href}

        target="_blank"

        rel="noopener noreferrer"

        className={linkClass}

        onClick={onNavigate}

        aria-label={`${button.label} (opens in a new tab)`}

      >

        {button.label}

      </a>

    )

  }



  return (

    <Link to={button.href} className={linkClass} onClick={onNavigate}>

      {button.label}

    </Link>

  )

}



export default function ChatMessage({ message, onNavigate }) {

  const { language, t } = useLanguage()

  const content = getChatHelpContent(language)



  if (message.type === 'assistant') {

    return (

      <div className="flex justify-start">

        <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-ecaa-green-100 bg-ecaa-green-50/90 px-4 py-3 text-sm leading-relaxed text-ecaa-ink shadow-ecaa-sm">

          {message.text}

        </div>

      </div>

    )

  }



  if (message.type === 'user') {

    return (

      <div className="flex justify-end">

        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-ecaa-green-900 px-4 py-3 text-sm leading-relaxed text-ecaa-white shadow-ecaa-sm">

          {message.text}

        </div>

      </div>

    )

  }



  if (message.type === 'no-match') {

    return (

      <div className="flex justify-start">

        <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-ecaa-gold-200/70 bg-ecaa-cream px-4 py-3 text-sm leading-relaxed text-ecaa-ink-muted">

          <p>{content.noMatch}</p>

          <div className="mt-3 flex flex-wrap gap-2">

            {content.fallbackButtons.map((button) => (

              <ActionLink key={button.href} button={button} onNavigate={onNavigate} />

            ))}

          </div>

        </div>

      </div>

    )

  }



  if (message.type === 'results') {

    return (

      <div className="space-y-2.5">

        {message.results.map((intent) => {

          const localized = localizeIntent(intent, language)



          return (

            <article

              key={localized.id}

              className="rounded-xl border border-ecaa-border/70 bg-ecaa-white p-3.5 shadow-ecaa-sm transition-shadow hover:shadow-ecaa-md"

            >

              <h3 className="text-sm font-semibold normal-case text-ecaa-green-900">{localized.title}</h3>

              <p className="mt-1 text-sm leading-snug text-ecaa-ink-muted">

                {localized.answerKey ? t(localized.answerKey) : localized.answer}

              </p>

              <div className="mt-2.5 flex flex-wrap gap-2">

                {localized.buttons.map((button) => (

                  <ActionLink

                    key={`${localized.id}-${button.label}`}

                    button={button}

                    onNavigate={onNavigate}

                  />

                ))}

              </div>

            </article>

          )

        })}

      </div>

    )

  }



  return null

}


