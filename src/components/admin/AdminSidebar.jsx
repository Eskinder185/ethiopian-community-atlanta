import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { ADMIN_LOGIN_PATH } from '../../utils/admin'
import { useAdminLanguage } from '../../context/AdminLanguageContext'
import Logo from '../Logo'

const navItems = [
  { labelKey: 'sidebar.dashboard', to: '/admin/dashboard' },
  { labelKey: 'sidebar.homePage', to: '/admin/home' },
  { labelKey: 'sidebar.events', to: '/admin/events' },
  { labelKey: 'sidebar.media', to: '/admin/media' },
  { labelKey: 'sidebar.hallBookings', to: '/admin/hall-bookings' },
  { labelKey: 'sidebar.leadership', to: '/admin/leadership' },
  { labelKey: 'sidebar.programs', to: '/admin/programs' },
]

const linkClass = ({ isActive }) =>
  [
    'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-ecaa-green-800 text-ecaa-white'
      : 'text-ecaa-cream/85 hover:bg-ecaa-green-800/60 hover:text-ecaa-white',
  ].join(' ')

export default function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate()
  const { adminT } = useAdminLanguage()
  const websiteUrl = import.meta.env.BASE_URL || '/'

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate(ADMIN_LOGIN_PATH, { replace: true })
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-ecaa-green-950 text-ecaa-white shadow-ecaa-lg transition-transform duration-200 lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-label={adminT('sidebar.navAria')}
    >
      <div className="border-b border-ecaa-green-800/80 px-5 py-5">
        <Logo variant="admin" size="xs" showText="short" className="flex-col items-start gap-2 sm:flex-row sm:items-center" />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass} onClick={onClose}>
            {adminT(item.labelKey)}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-ecaa-green-800/80 px-3 py-4">
        <a
          href={websiteUrl}
          className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-ecaa-cream/85 transition-colors hover:bg-ecaa-green-800/60 hover:text-ecaa-white"
        >
          {adminT('sidebar.viewWebsite')}
        </a>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ecaa-cream/85 transition-colors hover:bg-ecaa-green-800/60 hover:text-ecaa-white"
        >
          {adminT('sidebar.logout')}
        </button>
      </div>
    </aside>
  )
}
