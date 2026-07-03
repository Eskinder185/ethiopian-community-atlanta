import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import ChatWidget from '../chat/ChatWidget'
import { useLanguage } from '../../context/LanguageContext'

export default function Layout() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        {t('common.skipToMain')}
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
