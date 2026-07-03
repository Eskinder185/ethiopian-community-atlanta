import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { getSupportPageContent } from '../data/supportPageContent'
import { fetchSupportPageContentRow } from '../utils/pageContent'

export function useSupportPage() {
  const { language } = useLanguage()
  const [pageContentRow, setPageContentRow] = useState(null)

  useEffect(() => {
    let active = true
    fetchSupportPageContentRow().then((row) => {
      if (!active) return
      setPageContentRow(row)
    })
    return () => {
      active = false
    }
  }, [])

  const content = useMemo(
    () => getSupportPageContent(language, pageContentRow),
    [language, pageContentRow],
  )

  return { content, language }
}
