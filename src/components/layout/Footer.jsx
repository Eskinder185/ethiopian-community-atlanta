import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import siteInfo from '../../content/siteInfo.json'
import contactData from '../../content/contact.json'
import { hasUsableText } from '../../utils/data'

const linkClass =
  'text-sm text-ecaa-green-100/90 transition-colors duration-200 hover:text-ecaa-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-400'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { general, footer } = contactData
  const legalLinks = footer.legalLinks ?? []

  const addressLine = hasUsableText(general.address?.street)
    ? `${general.address.street}, ${general.address.city}, ${general.address.state} ${general.address.zip}`
    : null

  return (
    <footer className="mt-auto border-t border-ecaa-green-800/40 bg-ecaa-green-950 text-ecaa-white">
      <Container className="px-5 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:gap-8 md:text-left">
          <div className="space-y-2">
            <p className="text-base font-semibold tracking-tight text-ecaa-white sm:text-lg">
              {siteInfo.name}
            </p>
            <p className="text-xs text-ecaa-green-200/70 md:max-w-xs">
              © {currentYear} {siteInfo.name} All rights reserved.
            </p>
          </div>

          <div className="space-y-1.5 text-sm text-ecaa-green-100/90">
            {addressLine && <p>{addressLine}</p>}
            {hasUsableText(general.email) && (
              <p>
                <a href={`mailto:${general.email}`} className={linkClass}>
                  {general.email}
                </a>
              </p>
            )}
            {hasUsableText(general.phone) && (
              <p>
                <a href={`tel:${general.phone.replace(/\s/g, '')}`} className={linkClass}>
                  {general.phone}
                </a>
              </p>
            )}
            {legalLinks.length > 0 && (
              <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-1 md:justify-start">
                {legalLinks.map((item, index) => (
                  <span key={item.path} className="inline-flex items-center gap-2">
                    {index > 0 && (
                      <span className="text-ecaa-green-600" aria-hidden="true">
                        |
                      </span>
                    )}
                    <Link to={item.path} className={linkClass}>
                      {item.label}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </Container>
    </footer>
  )
}
