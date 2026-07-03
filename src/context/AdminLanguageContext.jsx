import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { adminTranslations, getAdminTranslation } from '../data/adminTranslations'

const STORAGE_KEY = 'ecaa-admin-language'

const AdminLanguageContext = createContext(null)

function getStoredAdminLanguage() {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'am' ? 'am' : 'en'
}

export function AdminLanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getStoredAdminLanguage)

  const setLanguage = useCallback((nextLanguage) => {
    const normalized = nextLanguage === 'am' ? 'am' : 'en'
    setLanguageState(normalized)
    window.localStorage.setItem(STORAGE_KEY, normalized)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.adminLang = language
  }, [language])

  const adminT = useCallback((key) => getAdminTranslation(language, key), [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      adminT,
    }),
    [language, setLanguage, adminT],
  )

  return <AdminLanguageContext.Provider value={value}>{children}</AdminLanguageContext.Provider>
}

export function useAdminLanguage() {
  const context = useContext(AdminLanguageContext)
  if (!context) {
    throw new Error('useAdminLanguage must be used within an AdminLanguageProvider')
  }
  return context
}

export { adminTranslations, STORAGE_KEY as ADMIN_LANGUAGE_STORAGE_KEY }
