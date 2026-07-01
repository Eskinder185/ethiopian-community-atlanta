import { hasUsableText } from '../../utils/data'

export default function ContactCard({ contact }) {
  return (
    <article className="ecaa-card flex h-full flex-col">
      <h3 className="heading-section text-xl">{contact.title}</h3>

      {hasUsableText(contact.description) && (
        <p className="text-body mt-3 flex-1">{contact.description}</p>
      )}

      <ul className="mt-6 space-y-3 text-base">
        {hasUsableText(contact.email) && (
          <li>
            <span className="font-medium text-ecaa-ink">Email: </span>
            <a
              href={`mailto:${contact.email}`}
              className="link-subtle text-ecaa-green-900 underline-offset-4 hover:underline"
            >
              {contact.email}
            </a>
          </li>
        )}
        {hasUsableText(contact.phone) && (
          <li>
            <span className="font-medium text-ecaa-ink">Phone: </span>
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="link-subtle text-ecaa-green-900 underline-offset-4 hover:underline"
            >
              {contact.phone}
            </a>
          </li>
        )}
      </ul>
    </article>
  )
}
