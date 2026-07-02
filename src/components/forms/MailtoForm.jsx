import { useState } from 'react'
import CTAButton from '../ui/CTAButton'
import { buildMailtoUrl } from '../../utils/mailto'

const inputClass =
  'w-full rounded-xl border border-ecaa-border bg-ecaa-white px-4 py-3 text-base text-ecaa-ink outline-none transition focus:border-ecaa-green-700 focus:ring-2 focus:ring-ecaa-green-200'

export default function MailtoForm({
  email,
  subject,
  fields,
  submitLabel,
  note,
  areaOptions = [],
}) {
  const initialValues = fields.reduce((acc, field) => {
    acc[field.id] = ''
    return acc
  }, {})

  const [values, setValues] = useState(initialValues)

  function handleChange(id, value) {
    setValues((current) => ({ ...current, [id]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const body = fields
      .map((field) => `${field.label}: ${values[field.id] || ''}`)
      .join('\n')
    const url = buildMailtoUrl({ to: email, subject, body })
    window.location.href = url
  }

  return (
    <form onSubmit={handleSubmit} className="ecaa-card-premium mx-auto max-w-2xl">
      <div className="grid gap-5">
        {fields.map((field) => {
          if (field.type === 'select') {
            return (
              <label key={field.id} className="block text-left">
                <span className="mb-2 block text-sm font-semibold text-ecaa-ink">{field.label}</span>
                <select
                  id={field.id}
                  name={field.id}
                  required={field.required}
                  value={values[field.id]}
                  onChange={(event) => handleChange(field.id, event.target.value)}
                  className={inputClass}
                >
                  <option value="">Select an option</option>
                  {(field.options || areaOptions).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            )
          }

          if (field.type === 'textarea') {
            return (
              <label key={field.id} className="block text-left">
                <span className="mb-2 block text-sm font-semibold text-ecaa-ink">{field.label}</span>
                <textarea
                  id={field.id}
                  name={field.id}
                  rows={field.rows || 4}
                  required={field.required}
                  value={values[field.id]}
                  onChange={(event) => handleChange(field.id, event.target.value)}
                  className={inputClass}
                />
              </label>
            )
          }

          return (
            <label key={field.id} className="block text-left">
              <span className="mb-2 block text-sm font-semibold text-ecaa-ink">{field.label}</span>
              <input
                id={field.id}
                name={field.id}
                type={field.type || 'text'}
                required={field.required}
                value={values[field.id]}
                onChange={(event) => handleChange(field.id, event.target.value)}
                className={inputClass}
              />
            </label>
          )
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <CTAButton type="submit" variant="primary" size="lg" className="w-full justify-center sm:w-auto">
          {submitLabel}
        </CTAButton>
        {note && <p className="text-sm leading-relaxed text-ecaa-ink-muted">{note}</p>}
      </div>
    </form>
  )
}
