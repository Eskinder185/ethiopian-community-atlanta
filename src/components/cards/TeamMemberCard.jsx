import { hasUsableText } from '../../utils/data'

export default function TeamMemberCard({ member }) {
  const hasPhoto = member.photo?.src && !member.photo.src.startsWith('TODO')

  return (
    <article className="ecaa-card flex h-full flex-col items-center text-center">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-ecaa-green-100">
        {hasPhoto ? (
          <img
            src={member.photo.src}
            alt={member.photo.alt || member.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-2xl font-semibold text-ecaa-green-800" aria-hidden="true">
            {member.name?.charAt(0) || '?'}
          </span>
        )}
      </div>

      <h3 className="heading-section mt-5 text-xl">{member.name}</h3>

      {hasUsableText(member.title) && (
        <p className="mt-2 text-base font-medium text-ecaa-gold-700">{member.title}</p>
      )}

      {hasUsableText(member.bio) && (
        <p className="text-body mt-4">{member.bio}</p>
      )}
    </article>
  )
}
