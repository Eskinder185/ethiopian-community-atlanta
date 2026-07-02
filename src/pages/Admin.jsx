import { useEffect } from 'react'

const CMS_URL = '/admin/index.html'

export default function Admin() {
  useEffect(() => {
    document.title = 'Content Manager | ECAA'
    window.location.replace(CMS_URL)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-ecaa-cream px-5">
      <p className="text-body text-center">
        Redirecting to the content editor…{' '}
        <a href={CMS_URL} className="font-medium text-ecaa-green-800 hover:underline">
          Open manually
        </a>
      </p>
    </div>
  )
}
