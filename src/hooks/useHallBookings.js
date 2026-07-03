import { useEffect, useState } from 'react'
import { fetchPublicHallBookings, getFallbackPublicHallBookings } from '../utils/hallBookings'

export function useHallBookings() {
  const [bookings, setBookings] = useState(getFallbackPublicHallBookings)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    fetchPublicHallBookings()
      .then((items) => {
        if (!mounted) return
        setBookings(items)
        setLoading(false)
      })
      .catch((error) => {
        console.warn('Using fallback hall bookings because Supabase failed', error)
        if (!mounted) return
        setBookings(getFallbackPublicHallBookings())
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return { bookings, loading }
}
