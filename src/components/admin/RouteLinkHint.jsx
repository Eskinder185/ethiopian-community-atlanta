import { useAdminLanguage } from '../../context/AdminLanguageContext'

export default function RouteLinkHint() {
  const { adminT } = useAdminLanguage()

  return <p className="mt-1.5 text-xs text-ecaa-ink-subtle">{adminT('forms.routeLinkHelper')}</p>
}
