import { useEffect, useState } from 'react'
import { fetchMediaItems, getFallbackMediaItems } from '../utils/mediaItems'
import { getFallbackEvents } from '../utils/events'

export function useMediaItems(events = null) {
  const [mediaItems, setMediaItems] = useState(() => getFallbackMediaItems(events ?? getFallbackEvents()))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const eventList = events ?? getFallbackEvents()

    fetchMediaItems(eventList)
      .then((items) => {
        if (!mounted) return
        setMediaItems(items)
        setLoading(false)
      })
      .catch((error) => {
        console.warn('Using fallback media items because Supabase failed', error)
        if (!mounted) return
        setMediaItems(getFallbackMediaItems(eventList))
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [events])

  return { mediaItems, loading }
}
