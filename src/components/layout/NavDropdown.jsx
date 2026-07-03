import { useEffect, useId, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { translateNavLabel } from '../../utils/navigationLabels'
import { getNavHref, getNavPathname, isExternalNavLink } from '../../utils/navigation'

function isItemActive(location, item) {
  return item.children?.some((child) => {
    const href = getNavHref(child)
    const childPath = getNavPathname(href)
    if (childPath !== location.pathname) return false
    if (!href.includes('#')) return !location.hash
    const childHash = href.split('#')[1]
    return location.hash === `#${childHash}`
  })
}

export default function NavDropdown({ item, isOpen, onToggle, onClose }) {
  const containerRef = useRef(null)
  const menuId = useId()
  const location = useLocation()
  const { t } = useLanguage()
  const isActive = isItemActive(location, item)

  useEffect(() => {
    if (!isOpen) return undefined

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose()
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        className={[
          'nav-link nav-link-header inline-flex items-center gap-1 whitespace-nowrap',
          isActive ? 'nav-link-active' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={onToggle}
      >
        {translateNavLabel(item.label, t)}
        <span className="text-[0.65rem] opacity-70" aria-hidden="true">
          {isOpen ? '▴' : '▾'}
        </span>
      </button>

      {isOpen && (
        <div id={menuId} role="menu" className="nav-dropdown-panel">
          {item.children.map((child) => {
            const href = getNavHref(child)
            const external = isExternalNavLink(child)

            if (external) {
              return (
                <a
                  key={`${href}-${child.label}`}
                  href={href}
                  role="menuitem"
                  className="nav-dropdown-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  {translateNavLabel(child.label, t)}
                </a>
              )
            }

            return (
              <Link
                key={`${href}-${child.label}`}
                to={href}
                role="menuitem"
                className="nav-dropdown-item"
                onClick={onClose}
              >
                {child.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
