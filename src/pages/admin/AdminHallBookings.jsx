import { useEffect, useState } from 'react'
import FormInput from '../../components/admin/FormInput'
import FormTextarea from '../../components/admin/FormTextarea'
import FormSelect from '../../components/admin/FormSelect'
import SaveButton from '../../components/admin/SaveButton'
import StatusBadge from '../../components/admin/StatusBadge'
import AdminSetupNotice from '../../components/admin/AdminSetupNotice'
import { useAdminLanguage } from '../../context/AdminLanguageContext'
import {
  deleteHallBooking,
  fetchHallBookingsAdminState,
  formatBookingDateTime,
  updateHallBooking,
} from '../../utils/hallBookings'
import { hasSupabaseConfig } from '../../lib/supabaseClient'

const STATUS_OPTIONS = ['pending', 'approved', 'declined', 'cancelled']

function ToggleField({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-ecaa-border/80 bg-ecaa-cream/40 px-4 py-3">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
      <span className="text-sm font-medium text-ecaa-ink">{label}</span>
    </label>
  )
}

export default function AdminHallBookings() {
  const { adminT } = useAdminLanguage()
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('all')
  const [draft, setDraft] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [setupMessage, setSetupMessage] = useState('')

  useEffect(() => {
    fetchHallBookingsAdminState().then((result) => {
      setBookings(result.items)
      setSetupMessage(result.setupMessage || '')
      setLoading(false)
    })
  }, [])

  const filtered = bookings.filter((booking) => filter === 'all' || booking.status === filter)

  const startEdit = (booking) => {
    setDraft({ ...booking })
    setMessage('')
    setError('')
  }

  const updateDraft = (field, value) => setDraft((current) => ({ ...current, [field]: value }))

  const handleSave = async (event) => {
    event.preventDefault()
    if (!draft?.id) return
    setSaving(true)
    setMessage('')
    setError('')

    try {
      if (!hasSupabaseConfig()) {
        throw new Error('Supabase is not configured. Hall bookings cannot be updated online yet.')
      }
      const saved = await updateHallBooking(draft.id, draft)
      const refreshed = await fetchHallBookingsAdminState()
      setBookings(refreshed.items)
      setSetupMessage(refreshed.setupMessage || '')
      setDraft(saved)
      setMessage(adminT('messages.bookingUpdated'))
    } catch (saveError) {
      setError(saveError?.message || 'Could not update booking.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!draft?.id || !window.confirm(adminT('hallBookings.deleteConfirm'))) return
    try {
      if (!hasSupabaseConfig()) {
        throw new Error('Supabase is not configured. Hall bookings cannot be deleted online yet.')
      }
      await deleteHallBooking(draft.id)
      const refreshed = await fetchHallBookingsAdminState()
      setBookings(refreshed.items)
      setSetupMessage(refreshed.setupMessage || '')
      setDraft(null)
      setMessage(adminT('messages.bookingDeleted'))
    } catch (deleteError) {
      setError(deleteError?.message || 'Could not delete booking.')
    }
  }

  if (loading) return <p className="text-ecaa-ink-muted">{adminT('hallBookings.loading')}</p>

  if (draft) {
    return (
      <div className="mx-auto max-w-4xl">
        <button type="button" onClick={() => setDraft(null)} className="text-sm font-medium text-ecaa-green-800">
          {adminT('hallBookings.backToList')}
        </button>
        <h1 className="mt-2 text-2xl font-semibold text-ecaa-ink">{adminT('hallBookings.requestTitle')}</h1>

        {message && <p className="mt-4 rounded-lg border border-ecaa-green-200 bg-ecaa-green-50 px-4 py-3 text-sm">{message}</p>}
        {error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

        <div className="mt-6 rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-cream/30 p-5 text-sm">
          <p><strong>{adminT('hallBookings.requester')}:</strong> {draft.requesterName}</p>
          <p className="mt-1"><strong>{adminT('hallBookings.email')}:</strong> {draft.requesterEmail}</p>
          <p className="mt-1"><strong>{adminT('hallBookings.phone')}:</strong> {draft.requesterPhone || '—'}</p>
          <p className="mt-1"><strong>{adminT('hallBookings.event')}:</strong> {draft.eventTitle}</p>
          <p className="mt-1"><strong>{adminT('hallBookings.eventType')}:</strong> {draft.eventType}</p>
          <p className="mt-1"><strong>{adminT('hallBookings.table.start')}:</strong> {formatBookingDateTime(draft.startTime)}</p>
          <p className="mt-1"><strong>End:</strong> {formatBookingDateTime(draft.endTime)}</p>
          <p className="mt-1"><strong>{adminT('hallBookings.guests')}:</strong> {draft.expectedGuests || '—'}</p>
          {draft.notes && <p className="mt-3 whitespace-pre-wrap"><strong>{adminT('hallBookings.notes')}:</strong> {draft.notes}</p>}
        </div>

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <FormSelect id="booking-status" label={adminT('forms.status')} value={draft.status} onChange={(e) => updateDraft('status', e.target.value)}>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </FormSelect>
          <FormInput id="public-title" label={adminT('hallBookings.publicTitle')} value={draft.publicTitle} onChange={(e) => updateDraft('publicTitle', e.target.value)} hint={adminT('hallBookings.publicTitleHint')} />
          <ToggleField id="visible-public" label={adminT('hallBookings.showOnCalendar')} checked={draft.visiblePublic === true} onChange={(v) => updateDraft('visiblePublic', v)} />
          <FormTextarea id="admin-notes" label={adminT('hallBookings.adminNotes')} rows={4} value={draft.adminNotes} onChange={(e) => updateDraft('adminNotes', e.target.value)} />

          <div className="flex flex-wrap gap-3">
            <SaveButton loading={saving} savingText={adminT('common.saving')}>{adminT('hallBookings.saveBooking')}</SaveButton>
            <button type="button" onClick={handleDelete} className="btn btn-secondary btn-sm">{adminT('hallBookings.deleteBooking')}</button>
            <button type="button" onClick={() => setDraft(null)} className="btn btn-ghost btn-sm">{adminT('common.cancel')}</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ecaa-ink">{adminT('hallBookings.title')}</h1>
        <p className="mt-1 text-sm text-ecaa-ink-muted">{adminT('hallBookings.description')}</p>
      </div>

      <AdminSetupNotice message={setupMessage} />

      <div className="mb-4 flex flex-wrap gap-2">
        {['all', ...STATUS_OPTIONS].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === status ? 'bg-ecaa-green-900 text-white' : 'border border-ecaa-border bg-ecaa-white text-ecaa-green-900'}`}
          >
            {adminT(`hallBookings.filters.${status}`)}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-ecaa-cream/60 text-xs uppercase tracking-wide text-ecaa-ink-subtle">
            <tr>
              <th className="px-4 py-3">{adminT('hallBookings.table.event')}</th>
              <th className="px-4 py-3">{adminT('hallBookings.table.requester')}</th>
              <th className="px-4 py-3">{adminT('hallBookings.table.start')}</th>
              <th className="px-4 py-3">{adminT('hallBookings.table.status')}</th>
              <th className="px-4 py-3">{adminT('hallBookings.table.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ecaa-border/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-ecaa-ink-muted">
                  {adminT('hallBookings.emptyList')}
                </td>
              </tr>
            ) : (
              filtered.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 py-3 font-medium text-ecaa-green-950">{booking.eventTitle}</td>
                  <td className="px-4 py-3">{booking.requesterName}</td>
                  <td className="px-4 py-3">{formatBookingDateTime(booking.startTime)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge label={booking.status} variant={booking.status === 'approved' ? 'live' : 'soon'} />
                  </td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => startEdit(booking)} className="font-semibold text-ecaa-green-800">{adminT('common.review')}</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
