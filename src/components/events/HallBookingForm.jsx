import { useState } from 'react'
import FormInput from '../admin/FormInput'
import FormTextarea from '../admin/FormTextarea'
import { submitHallBooking } from '../../utils/hallBookings'

const initialForm = {
  requesterName: '',
  requesterEmail: '',
  requesterPhone: '',
  eventTitle: '',
  eventType: '',
  startTime: '',
  endTime: '',
  expectedGuests: '',
  notes: '',
}

export default function HallBookingForm({ labels = {} }) {
  const fields = labels.fields || {}
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      await submitHallBooking(form)
      setSuccess(true)
      setForm(initialForm)
    } catch (submitError) {
      setError(
        submitError?.message ||
          labels.errorMessage ||
          'Your request could not be submitted right now. Please contact ECAA directly for hall rental information.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-ecaa-xl border border-ecaa-green-200 bg-ecaa-green-50 p-6 text-sm leading-relaxed text-ecaa-green-950">
        {labels.successMessage ||
          'Thank you. Your hall request has been submitted. ECAA will review availability, requirements, pricing, and approval before confirming the booking.'}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm">
      <h3 className="text-lg font-semibold text-ecaa-green-950">
        {labels.title || 'Booking request form'}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          id="requester-name"
          label={fields.name || 'Your name'}
          value={form.requesterName}
          onChange={(e) => updateField('requesterName', e.target.value)}
          required
        />
        <FormInput
          id="requester-email"
          label={fields.email || 'Email'}
          type="email"
          value={form.requesterEmail}
          onChange={(e) => updateField('requesterEmail', e.target.value)}
          required
        />
        <FormInput
          id="requester-phone"
          label={fields.phone || 'Phone'}
          type="tel"
          value={form.requesterPhone}
          onChange={(e) => updateField('requesterPhone', e.target.value)}
        />
        <FormInput
          id="event-title"
          label={fields.eventTitle || 'Event title'}
          value={form.eventTitle}
          onChange={(e) => updateField('eventTitle', e.target.value)}
          required
        />
        <FormInput
          id="event-type"
          label={fields.eventType || 'Event type'}
          value={form.eventType}
          onChange={(e) => updateField('eventType', e.target.value)}
          required
        />
        <FormInput
          id="expected-guests"
          label={fields.expectedGuests || 'Expected guests'}
          type="number"
          min="1"
          value={form.expectedGuests}
          onChange={(e) => updateField('expectedGuests', e.target.value)}
        />
        <FormInput
          id="start-time"
          label={fields.startTime || 'Start date & time'}
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => updateField('startTime', e.target.value)}
          required
          className="sm:col-span-2"
        />
        <FormInput
          id="end-time"
          label={fields.endTime || 'End date & time'}
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => updateField('endTime', e.target.value)}
          required
          className="sm:col-span-2"
        />
      </div>
      <FormTextarea
        id="booking-notes"
        label={fields.notes || 'Notes'}
        rows={4}
        value={form.notes}
        onChange={(e) => updateField('notes', e.target.value)}
      />

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? labels.submittingLabel || 'Submitting…' : labels.submitLabel || 'Submit Hall Request'}
      </button>
    </form>
  )
}
