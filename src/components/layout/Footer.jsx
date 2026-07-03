import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Logo from '../Logo'
import contactData from '../../content/contact.json'
import navigation from '../../data/navigation.json'
import { useLanguage } from '../../context/LanguageContext'
import { translateNavLabel } from '../../utils/navigationLabels'
import { hasUsableText } from '../../utils/data'

const linkClass =
  'text-sm text-ecaa-green-100/90 transition-colors duration-200 hover:text-ecaa-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecaa-gold-400'

const socialLabelKeys = {
  facebook: 'footer.facebook',
  instagram: 'footer.instagram',
  youtube: 'footer.youtube',
  tiktok: 'footer.tiktok',
}

function translateLegalLabel(label, t) {
  if (label === 'Privacy Policy') return t('footer.privacy')
  if (label === 'Terms & Conditions' || label === 'Terms of Use') return t('footer.terms')
  return label
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()
  const { general, social, footer: contactFooter } = contactData
  const { footer: navFooter } = navigation
  const legalLinks = contactFooter.legalLinks ?? []
  const quickLinks = navFooter.quickLinks ?? []
  const mission = t('footer.mission')

  const addressLine = hasUsableText(general.address?.street)
    ? `${general.address.street}, ${general.address.city}, ${general.address.state} ${general.address.zip}`
    : null

  const socialLinks = Object.entries(social ?? {}).filter(([, url]) => hasUsableText(url))

  return (
    <footer className="mt-auto border-t border-ecaa-green-800/40 bg-ecaa-green-950 text-ecaa-white">
      <Container className="px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Logo variant="footer" size="sm" />
              <p className="text-sm font-semibold tracking-tight text-ecaa-white sm:text-base">
                {t('brand.orgName')}
              </p>
            </div>
            {hasUsableText(mission) && (
              <p className="max-w-sm text-sm leading-snug text-ecaa-green-100/85">{mission}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ecaa-gold-400">
              {t('footer.contact')}
            </h2>
            <div className="space-y-1 text-sm text-ecaa-green-100/90">
              {addressLine && <p>{addressLine}</p>}
              {hasUsableText(general.phone) && (
                <p>
                  <a href={`tel:${general.phone.replace(/\s/g, '')}`} className={linkClass}>
                    {general.phone}
                  </a>
                </p>
              )}
              {hasUsableText(general.email) && (
                <p>
                  <a href={`mailto:${general.email}`} className={linkClass}>
                    {general.email}
                  </a>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ecaa-gold-400">
              {t('footer.quickLinks')}
            </h2>
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={linkClass}>
                    {translateNavLabel(item.label, t)}
                  </Link>
                </li>
              ))}
            </ul>

            {socialLinks.length > 0 && (
              <div className="pt-1">
                <h3 className="sr-only">{t('footer.socialMedia')}</h3>
                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {socialLinks.map(([network, url]) => (
                    <li key={network}>
                      <a
                        href={url}
                        className={linkClass}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t(socialLabelKeys[network] || network)} (opens in a new tab)`}
                      >
                        {t(socialLabelKeys[network] || network)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-ecaa-green-800/40 pt-4 text-center text-xs text-ecaa-green-200/70 sm:flex-row sm:text-left">
          <p>{t('footer.copyright').replace('{year}', String(currentYear))}</p>
          {legalLinks.length > 0 && (
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-end">
              {legalLinks.map((item) => (
                <Link key={item.path} to={item.path} className={linkClass}>
                  {translateLegalLabel(item.label, t)}
                </Link>
              ))}
            </p>
          )}
        </div>
      </Container>
    </footer>
  )
}
