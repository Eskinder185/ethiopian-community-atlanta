import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { ADMIN_DASHBOARD_PATH } from '../../utils/admin'
import Logo, { ORG_DISPLAY_NAME } from '../../components/Logo'
import FormInput from '../../components/admin/FormInput'
import AdminLanguageToggle from '../../components/admin/AdminLanguageToggle'
import { useAdminLanguage } from '../../context/AdminLanguageContext'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { adminT } = useAdminLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      if (data.session) {
        navigate(ADMIN_DASHBOARD_PATH, { replace: true })
      } else {
        setCheckingSession(false)
      }
    })

    return () => {
      mounted = false
    }
  }, [navigate])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setLoading(false)

    if (signInError) {
      setError(signInError.message || 'Unable to sign in. Please check your email and password.')
      return
    }

    navigate(ADMIN_DASHBOARD_PATH, { replace: true })
  }

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ecaa-cream">
        <p className="text-base text-ecaa-ink-muted">{adminT('login.loading')}</p>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-ecaa-green-950 via-ecaa-green-900 to-ecaa-green-950 px-4 py-10">
      <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
        <AdminLanguageToggle />
      </div>
      <div className="w-full max-w-md rounded-ecaa-2xl border border-ecaa-border/80 bg-ecaa-white p-8 shadow-ecaa-lg sm:p-10">
        <div className="flex flex-col items-center text-center">
          <Logo variant="login" size="lg" className="justify-center" />
          <h1 className="mt-5 text-xl font-semibold text-ecaa-ink">{adminT('login.title')}</h1>
          <p className="mt-1 text-sm text-ecaa-ink-muted">{ORG_DISPLAY_NAME}</p>
          <p className="mt-6 text-base font-medium text-ecaa-green-950">{adminT('login.signInHeading')}</p>
          <p className="mt-2 text-sm text-ecaa-ink-muted">{adminT('login.signInDescription')}</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <FormInput
            id="admin-email"
            label={adminT('login.email')}
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={loading}
          />
          <FormInput
            id="admin-password"
            label={adminT('login.password')}
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
          />

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? adminT('login.signingIn') : adminT('login.signIn')}
          </button>
        </form>
      </div>
    </div>
  )
}
