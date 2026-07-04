import { hasUsableText } from "../../utils/data";

export default function ContactCard({ contact }) {
  const emailLabel = contact.emailLabel || "Email:";
  const phoneLabel = contact.phoneLabel || "Phone:";

  return (
    <article className="ecaa-card flex h-full flex-col">
      <h3 className="heading-section text-xl normal-case">{contact.title}</h3>

      {hasUsableText(contact.description) && (
        <p className="text-body mt-3 flex-1 leading-relaxed">{contact.description}</p>
      )}

      <ul className="mt-6 space-y-3 text-base">
        {hasUsableText(contact.email) && (
          <li className="leading-relaxed">
            <span className="font-medium text-ecaa-ink">{emailLabel} </span>
            <a
              href={`mailto:${contact.email}`}
              className="link-subtle text-ecaa-green-900 underline-offset-4 hover:underline"
            >
              {contact.email}
            </a>
          </li>
        )}
        {hasUsableText(contact.phone) && (
          <li className="leading-relaxed">
            <span className="font-medium text-ecaa-ink">{phoneLabel} </span>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="link-subtle text-ecaa-green-900 underline-offset-4 hover:underline"
            >
              {contact.phone}
            </a>
          </li>
        )}
      </ul>
    </article>
  );
}
