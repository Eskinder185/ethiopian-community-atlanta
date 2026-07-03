import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { getEventsPageContent } from '../data/eventsPageContent'
import { useEvents } from './useEvents'
import { fetchEventsPageContentRow } from '../utils/pageContent'
import { applyEventGroupsLocale } from '../utils/eventsLocale'

export function useEventsPage() {
  const { language } = useLanguage()
  const { groups, loading: eventsLoading } = useEvents()
  const [pageContentRow, setPageContentRow] = useState(null)

  useEffect(() => {
    let active = true
    fetchEventsPageContentRow().then((row) => {
      if (!active) return
      setPageContentRow(row)
    })
    return () => {
      active = false
    }
  }, [])

  const content = useMemo(
    () => getEventsPageContent(language, pageContentRow),
    [language, pageContentRow],
  )

  const localizedGroups = useMemo(
    () => applyEventGroupsLocale(groups, language),
    [groups, language],
  )

  return {
    content,
    groups: localizedGroups,
    language,
    loading: eventsLoading,
  }
}
