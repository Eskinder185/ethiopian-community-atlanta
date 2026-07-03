import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { getFallbackHomepage } from '../data/homepage'
import { getFallbackHomepageAmharic } from '../data/homepageAmharic'
import { mergeHomepageForLanguage } from '../utils/homepageLocale'
import { fetchHomepageBilingual } from '../utils/homepageSections'

export function useHomepageContent() {
  const { language } = useLanguage()
  const [bilingual, setBilingual] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetchHomepageBilingual().then((data) => {
      if (!active) return
      setBilingual(data)
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [])

  const homepage = useMemo(() => {
    const english = bilingual?.en || getFallbackHomepage()
    const amharicOverlay = bilingual?.am || getFallbackHomepageAmharic()

    if (language === 'am') {
      return mergeHomepageForLanguage(english, amharicOverlay)
    }

    return english
  }, [bilingual, language])

  return { homepage, loading, bilingual, setBilingual }
}

/** Backward-compatible alias */
export function useHomepage() {
  return useHomepageContent()
}
