import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Container from '../ui/Container'
import CTAButton from '../ui/CTAButton'
import HeaderBrand from './HeaderBrand'
import MobileMenu from './MobileMenu'
import NavMoreDropdown from './NavMoreDropdown'
import navigation from '../../data/navigation.json'

const navLinkClass = ({ isActive }) =>
  ['nav-link whitespace-nowrap', isActive ? 'nav-link-active' : ''].filter(Boolean).join(' ')

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { primary, cta } = navigation.header

  return (
    <header className="sticky top-0 z-50 border-b border-ecaa-border/60 bg-ecaa-white/85 shadow-ecaa-sm backdrop-blur-xl">
      <Container>
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <HeaderBrand />

          {/* Desktop navigation */}
          <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 lg:flex">
            <nav
              className="flex items-center gap-1"
              aria-label="Main navigation"
            >
              {primary.map((item) => (
                <NavLink key={item.path} to={item.path} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ))}
              <NavMoreDropdown />
            </nav>

            <CTAButton
              to={cta.path}
              variant="primary"
              size="sm"
              className="ml-2 shrink-0"
            >
              {cta.label}
            </CTAButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="btn btn-secondary btn-sm shrink-0 lg:hidden"
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
