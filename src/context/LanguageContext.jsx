import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../data/translations'

const STORAGE_KEY = 'ecaa-language'

const LanguageContext = createContext(null)

function getNestedValue(source, keyPath) {
  return keyPath.split('.').reduce((current, part) => current?.[part], source)
}

function getStoredLanguage() {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'am' ? 'am' : 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getStoredLanguage)

  const setLanguage = useCallback((nextLanguage) => {
    const normalized = nextLanguage === 'am' ? 'am' : 'en'
    setLanguageState(normalized)
    window.localStorage.setItem(STORAGE_KEY, normalized)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'am' ? 'am' : 'en'
  }, [language])

  const t = useCallback(
    (key) => {
      const amValue = getNestedValue(translations.am, key)
      const enValue = getNestedValue(translations.en, key)

      if (language === 'am' && amValue) return amValue
      if (enValue) return enValue
      return key
    },
    [language],
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
