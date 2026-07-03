import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { useLanguage } from '../../context/LanguageContext'

import { getChatHelpContent } from '../../data/chatHelpContent'

import ChatLauncher from './ChatLauncher'

import ChatMessage from './ChatMessage'

import QuickActionButton from './QuickActionButton'

import { searchChatHelp } from '../../utils/chatHelp'



function createMessage(type, payload = {}) {

  return { id: `${type}-${Date.now()}-${Math.random()}`, type, ...payload }

}



export default function ChatWidget() {

  const location = useLocation()

  const { language } = useLanguage()

  const content = getChatHelpContent(language)

  const panelId = useId()

  const inputRef = useRef(null)

  const panelRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  const [query, setQuery] = useState('')

  const [messages, setMessages] = useState([])



  const isAdminRoute = location.pathname.startsWith('/admin')



  const closeChat = useCallback(() => {

    setIsOpen(false)

  }, [])



  const resetChat = useCallback(() => {

    setQuery('')

    setMessages([createMessage('assistant', { text: content.intro })])

    window.setTimeout(() => inputRef.current?.focus(), 100)

  }, [content.intro])



  const openChat = useCallback(() => {

    setIsOpen(true)

    setMessages((current) =>

      current.length === 0 ? [createMessage('assistant', { text: content.intro })] : current,

    )

  }, [content.intro])



  const toggleChat = useCallback(() => {

    if (isOpen) closeChat()

    else openChat()

  }, [isOpen, closeChat, openChat])



  const runSearch = useCallback(

    (searchQuery) => {

      const trimmed = searchQuery.trim()

      if (!trimmed) return



      const results = searchChatHelp(trimmed, 2, language)

      const nextMessages = [

        createMessage('user', { text: trimmed }),

        results.length > 0

          ? createMessage('results', { results })

          : createMessage('no-match'),

      ]



      setMessages((current) => [...current, ...nextMessages])

      setQuery('')

    },

    [language],

  )



  const handleSubmit = (event) => {

    event.preventDefault()

    runSearch(query)

  }



  const handleNavigate = () => {

    closeChat()

  }



  useEffect(() => {

    closeChat()

  }, [location.pathname, closeChat])



  useEffect(() => {

    if (!isOpen) return undefined



    const handleEscape = (event) => {

      if (event.key === 'Escape') closeChat()

    }



    document.addEventListener('keydown', handleEscape)

    window.setTimeout(() => inputRef.current?.focus(), 100)



    return () => document.removeEventListener('keydown', handleEscape)

  }, [isOpen, closeChat])



  useEffect(() => {

    if (!isOpen) return

    setMessages((current) => {

      if (current.length === 1 && current[0].type === 'assistant') {

        return [createMessage('assistant', { text: content.intro })]

      }

      return current

    })

  }, [language, content.intro, isOpen])



  if (isAdminRoute) return null



  return (

    <>

      <ChatLauncher isOpen={isOpen} onClick={toggleChat} />



      {isOpen && (

        <div

          ref={panelRef}

          id="ecaa-chat-panel"

          role="dialog"

          aria-modal="true"

          aria-labelledby={`${panelId}-title`}

          className="chat-panel fixed bottom-[4.75rem] left-4 right-4 z-40 flex max-h-[min(32rem,calc(100vh-6rem))] flex-col overflow-hidden rounded-2xl border border-ecaa-gold-200/50 bg-ecaa-white shadow-ecaa-lg sm:bottom-24 sm:left-auto sm:right-6 sm:w-[22.5rem]"

        >

          <header className="chat-panel-header flex items-start justify-between gap-3 border-b border-ecaa-green-800/30 px-4 py-3.5 text-ecaa-white">

            <div className="min-w-0">

              <h2 id={`${panelId}-title`} className="text-base font-semibold normal-case leading-snug">

                {content.title}

              </h2>

              <p className="mt-1 text-xs leading-relaxed text-ecaa-green-100/90">{content.subtitle}</p>

            </div>

            <div className="flex shrink-0 items-center gap-1">

              <button

                type="button"

                className="rounded-lg px-2 py-1 text-xs font-medium normal-case text-ecaa-green-100 transition-colors hover:bg-ecaa-green-800/80 hover:text-ecaa-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-400"

                onClick={resetChat}

              >

                {content.startOver}

              </button>

              <button

                type="button"

                className="rounded-lg px-2 py-1 text-sm font-medium normal-case text-ecaa-green-100 transition-colors hover:bg-ecaa-green-800/80 hover:text-ecaa-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-400"

                aria-label={content.closeAria}

                onClick={closeChat}

              >

                {content.close}

              </button>

            </div>

          </header>



          <div className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-ecaa-cream/70 to-ecaa-cream/30 px-4 py-4">

            {messages.map((message) => (

              <ChatMessage key={message.id} message={message} onNavigate={handleNavigate} />

            ))}

          </div>



          <div className="border-t border-ecaa-border/60 bg-ecaa-white px-4 py-3">

            <p className="mb-2.5 text-xs font-medium normal-case text-ecaa-ink-subtle">

              {content.quickLinksLabel}

            </p>

            <div className="mb-3 flex flex-wrap gap-2">

              {content.quickActions.map((action) => (

                <QuickActionButton

                  key={action.href}

                  label={action.label}

                  href={action.href}

                  onNavigate={handleNavigate}

                />

              ))}

            </div>



            <form onSubmit={handleSubmit} className="flex gap-2">

              <label htmlFor={`${panelId}-search`} className="sr-only">

                {content.searchLabel}

              </label>

              <input

                ref={inputRef}

                id={`${panelId}-search`}

                type="search"

                value={query}

                placeholder={content.placeholder}

                className="min-w-0 flex-1 rounded-lg border border-ecaa-border/80 bg-ecaa-cream/30 px-3 py-2.5 text-sm normal-case text-ecaa-ink placeholder:text-ecaa-ink-faint focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ecaa-gold-500"

                onChange={(event) => setQuery(event.target.value)}

              />

              <button

                type="submit"

                className="shrink-0 rounded-lg bg-ecaa-gold-500 px-4 py-2.5 text-sm font-semibold normal-case text-ecaa-green-950 transition-colors hover:bg-ecaa-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-600"

              >

                {content.submit}

              </button>

            </form>

          </div>

        </div>

      )}

    </>

  )

}


