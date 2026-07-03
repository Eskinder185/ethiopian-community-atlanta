import { formatBookingDateTime } from '../../utils/hallBookings'

export default function HallAvailabilityCalendar({ bookings = [], labels = {} }) {
  const title = labels.title || 'Hall availability'
  const description =
    labels.description ||
    'Approved public reservations are shown below. Final availability must still be confirmed by ECAA before any booking is guaranteed.'
  const emptyDescription =
    labels.emptyDescription ||
    'No approved public reservations are listed at this time. Submit a request below and ECAA will review availability with you.'
  const reservedLabel = labels.reservedLabel || 'Reserved'

  return (
    <div className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm">
      <h3 className="text-lg font-semibold text-ecaa-green-950">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ecaa-ink-muted">{description}</p>

      {bookings.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="rounded-ecaa-lg border border-ecaa-border/70 bg-ecaa-cream/40 px-4 py-3 text-sm text-ecaa-ink-muted"
            >
              <p className="font-semibold text-ecaa-green-950">{booking.publicTitle || reservedLabel}</p>
              <p className="mt-1">
                {formatBookingDateTime(booking.startTime)}
                {booking.endTime ? ` – ${formatBookingDateTime(booking.endTime)}` : ''}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm leading-relaxed text-ecaa-ink-muted">{emptyDescription}</p>
      )}
    </div>
  )
}
