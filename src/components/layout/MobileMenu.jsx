import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import CTAButton from '../ui/CTAButton'
import navigation from '../../data/navigation.json'

const navLinkClass = ({ isActive }) =>
  ['nav-link text-base', isActive ? 'nav-link-active' : ''].filter(Boolean).join(' ')

export default function MobileMenu({ isOpen, onClose }) {
  const { cta, mobileSecondaryCta } = navigation.header

  useEffect(() => {
    if (!isOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <nav
      id="mobile-nav"
      className="mobile-menu-panel border-t border-ecaa-border/60 py-6 lg:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex max-h-[calc(100vh-8rem)] flex-col gap-1 overflow-y-auto">
        {navigation.main.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={navLinkClass}
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3 border-t border-ecaa-border/60 pt-6">
        <CTAButton
          to={cta.path}
          variant="primary"
          size="lg"
          className="w-full justify-center"
          onClick={onClose}
        >
          {cta.label}
        </CTAButton>
        <CTAButton
          to={mobileSecondaryCta.path}
          variant="secondary"
          size="lg"
          className="w-full justify-center"
          onClick={onClose}
        >
          {mobileSecondaryCta.label}
        </CTAButton>
      </div>
    </nav>
  )
}
