import Logo from '../Logo'
import AdminLanguageToggle from './AdminLanguageToggle'
import { useAdminLanguage } from '../../context/AdminLanguageContext'

export default function AdminHeader({ onMenuClick }) {
  const { adminT } = useAdminLanguage()

  return (
    <header className="sticky top-0 z-30 border-b border-ecaa-border/70 bg-ecaa-white/95 backdrop-blur-sm">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            className="btn btn-secondary btn-sm shrink-0 lg:hidden"
            onClick={onMenuClick}
            aria-label={adminT('header.openMenu')}
          >
            {adminT('header.menu')}
          </button>
          <Logo variant="default" size="xs" showText="short" className="lg:hidden" />
          <p className="hidden truncate text-sm font-medium text-ecaa-ink-muted lg:block lg:text-base">
            {adminT('header.title')}
          </p>
        </div>
        <AdminLanguageToggle />
      </div>
    </header>
  )
}
