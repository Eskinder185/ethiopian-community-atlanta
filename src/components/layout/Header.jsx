import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Container from '../ui/Container'
import HeaderBrand from './HeaderBrand'
import MobileMenu from './MobileMenu'
import NavDropdown from './NavDropdown'
import CTAButton from '../ui/CTAButton'
import navigation from '../../data/navigation.json'

const navLinkClass = ({ isActive }) =>
  ['nav-link nav-link-header whitespace-nowrap', isActive ? 'nav-link-active' : '']
    .filter(Boolean)
    .join(' ')

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()
  const { items, adminCta } = navigation.header

  useEffect(() => {
    setOpenDropdown(null)
  }, [location.pathname, location.hash])

  return (
    <header className="sticky top-0 z-50 w-full overflow-visible border-b border-ecaa-border/60 bg-ecaa-white/95 shadow-ecaa-sm backdrop-blur-xl">
      <Container wide className="overflow-visible">
        <div className="flex h-16 items-center justify-between gap-3 sm:gap-4">
          <HeaderBrand />

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 xl:flex xl:gap-3">
            <nav
              className="flex min-w-0 items-center gap-0 overflow-visible"
              aria-label="Main navigation"
            >
              {items.map((item) =>
                item.type === 'dropdown' ? (
                  <NavDropdown
                    key={item.label}
                    item={item}
                    isOpen={openDropdown === item.label}
                    onToggle={() =>
                      setOpenDropdown((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                    onClose={() => setOpenDropdown(null)}
                  />
                ) : (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={navLinkClass}
                    end={item.path === '/'}
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>

            {adminCta?.published && adminCta.path && (
              <CTAButton
                to={adminCta.path}
                variant="primary"
                size="sm"
                className="ml-1 shrink-0 xl:ml-2"
              >
                {adminCta.label}
              </CTAButton>
            )}
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm shrink-0 xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true">{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>

        <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </Container>
    </header>
  )
}
