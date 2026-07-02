import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import navigation from '../../data/navigation.json'
import CTAButton from '../ui/CTAButton'
import { getNavHref, isExternalNavLink } from '../../utils/navigation'

const navLinkClass = ({ isActive }) =>
  ['nav-link text-base', isActive ? 'nav-link-active' : ''].filter(Boolean).join(' ')

const subLinkClass = ({ isActive }) =>
  [
    'nav-mobile-sub-link block rounded-lg py-2.5 pl-4 text-base font-medium text-ecaa-ink-muted transition-colors duration-200',
    isActive ? 'bg-ecaa-green-50 text-ecaa-green-900' : 'hover:bg-ecaa-cream/80 hover:text-ecaa-ink',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500',
  ]
    .filter(Boolean)
    .join(' ')

function MobileNavChild({ child, onClose }) {
  const href = getNavHref(child)
  const external = isExternalNavLink(child)

  if (external) {
    return (
      <a
        href={href}
        className="nav-mobile-sub-link block rounded-lg py-2.5 pl-4 text-base font-medium text-ecaa-ink-muted transition-colors duration-200 hover:bg-ecaa-cream/80 hover:text-ecaa-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-500"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
      >
        {child.label}
      </a>
    )
  }

  return (
    <NavLink to={href} className={subLinkClass} onClick={onClose}>
      {child.label}
    </NavLink>
  )
}

export default function MobileMenu({ isOpen, onClose }) {
  const { items, adminCta } = navigation.header
  const [expanded, setExpanded] = useState({})

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

  useEffect(() => {
    if (!isOpen) setExpanded({})
  }, [isOpen])

  if (!isOpen) return null

  const toggleGroup = (label) => {
    setExpanded((current) => ({ ...current, [label]: !current[label] }))
  }

  return (
    <nav
      id="mobile-nav"
      className="mobile-menu-panel border-t border-ecaa-border/60 py-4 xl:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex max-h-[calc(100vh-8rem)] flex-col gap-0.5 overflow-y-auto overflow-x-hidden">
        {items.map((item) =>
          item.type === 'dropdown' ? (
            <li key={item.label}>
              <button
                type="button"
                className="nav-link flex w-full items-center justify-between text-base"
                aria-expanded={Boolean(expanded[item.label])}
                aria-controls={`mobile-group-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => toggleGroup(item.label)}
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-70" aria-hidden="true">
                  {expanded[item.label] ? '▴' : '▾'}
                </span>
              </button>
              {expanded[item.label] && (
                <ul
                  id={`mobile-group-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                  className="mt-0.5 space-y-0.5 border-l-2 border-ecaa-green-100 pl-3"
                >
                  {item.children.map((child) => (
                    <li key={`${getNavHref(child)}-${child.label}`}>
                      <MobileNavChild child={child} onClose={onClose} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={item.path}>
              <NavLink to={item.path} className={navLinkClass} end={item.path === '/'} onClick={onClose}>
                {item.label}
              </NavLink>
            </li>
          ),
        )}
        {adminCta?.published && adminCta.path && (
          <li className="mt-4 border-t border-ecaa-border/60 pt-4">
            <CTAButton
              to={adminCta.path}
              variant="primary"
              size="md"
              className="w-full"
              onClick={onClose}
            >
              {adminCta.label}
            </CTAButton>
          </li>
        )}
      </ul>
    </nav>
  )
}
