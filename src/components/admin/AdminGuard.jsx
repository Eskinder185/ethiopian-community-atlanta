import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { ADMIN_LOGIN_PATH } from '../../utils/admin'

export default function AdminGuard() {
  const location = useLocation()
  const [checking, setChecking] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setAuthenticated(Boolean(data.session))
      setChecking(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(Boolean(session))
      setChecking(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ecaa-cream">
        <p className="text-base text-ecaa-ink-muted">Checking sign-in status…</p>
      </div>
    )
  }

  if (!authenticated) {
    return <Navigate to={ADMIN_LOGIN_PATH} state={{ from: location }} replace />
  }

  return <Outlet />
}
