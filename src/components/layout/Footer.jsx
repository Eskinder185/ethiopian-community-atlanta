import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import AnimateIn from '../ui/AnimateIn'
import siteInfo from '../../data/siteInfo.json'
import navigation from '../../data/navigation.json'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const midpoint = Math.ceil(navigation.main.length / 2)
  const firstColumn = navigation.main.slice(0, midpoint)
  const secondColumn = navigation.main.slice(midpoint)

  return (
    <footer className="relative mt-auto border-t border-ecaa-border/60 bg-ecaa-green-950 text-ecaa-white">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div>
              <p className="text-xl font-semibold tracking-tight text-ecaa-white">
                {siteInfo.name}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ecaa-green-200/90">
                {siteInfo.tagline}
              </p>
            </div>

            <nav className="lg:col-span-2" aria-label="Footer navigation">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ecaa-gold-400">
                Explore
              </p>
              <div className="mt-5 grid gap-x-12 gap-y-3 sm:grid-cols-2">
                {[firstColumn, secondColumn].map((column, index) => (
                  <ul key={index} className="space-y-3">
                    {column.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className="text-base text-ecaa-green-100/90 transition-colors duration-300 hover:text-ecaa-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-400"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </nav>
          </div>

          <p className="mt-14 text-sm text-ecaa-green-200/70">
            © {currentYear} {siteInfo.shortName}. All rights reserved.
          </p>
        </AnimateIn>
      </Container>
    </footer>
  )
}
