import { useLanguage } from '../../context/LanguageContext'

import { getChatHelpContent } from '../../data/chatHelpContent'



export default function ChatLauncher({ isOpen, onClick }) {

  const { language, t } = useLanguage()

  const content = getChatHelpContent(language)



  return (

    <button

      type="button"

      className="chat-launcher fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-ecaa-gold-400/30 bg-ecaa-green-900 px-4 py-3 text-sm font-semibold text-ecaa-white shadow-ecaa-lg transition-all duration-200 hover:border-ecaa-gold-400/50 hover:bg-ecaa-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500 sm:bottom-6 sm:right-6 sm:px-5"

      aria-expanded={isOpen}

      aria-controls="ecaa-chat-panel"

      aria-label={

        isOpen

          ? content.closeAria

          : `${content.title} — ${t('chat.launcherDesktop')}`

      }

      onClick={onClick}

    >

      <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-ecaa-gold-500/20 text-sm">

        ?

      </span>

      <span className="hidden sm:inline">{t('chat.launcherDesktop')}</span>

      <span className="sm:hidden">{t('chat.launcherMobile')}</span>

    </button>

  )

}


