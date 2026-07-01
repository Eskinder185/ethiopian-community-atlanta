import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import navigation from '../../data/navigation.json'

const morePaths = navigation.header.more.map((item) => item.path)

export default function NavMoreDropdown() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const location = useLocation()
  const isMoreActive = morePaths.includes(location.pathname)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className={[
          'nav-link inline-flex items-center gap-1.5 whitespace-nowrap',
          isMoreActive ? 'nav-link-active' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="nav-more-menu"
        onClick={() => setOpen((value) => !value)}
      >
        More
        <span className="text-xs opacity-70" aria-hidden="true">
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open && (
        <div
          id="nav-more-menu"
          role="menu"
          className="nav-dropdown-panel"
        >
          {navigation.header.more.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              role="menuitem"
              className="nav-dropdown-item"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
