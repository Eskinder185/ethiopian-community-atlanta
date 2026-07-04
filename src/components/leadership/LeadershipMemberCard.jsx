import { useState } from "react";
import {
  getMemberImageAlt,
  getMemberImageSrc,
  getMemberInitials,
  memberHasDisplayableImage,
} from "../../utils/leadership";

export default function LeadershipMemberCard({ member, viewProfileLabel, onViewProfile, style }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasPhoto = memberHasDisplayableImage(member) && !imageFailed;
  const imageSrc = getMemberImageSrc(member);
  const initials = getMemberInitials(member.name);

  return (
    <article
      className="leadership-member-card group flex h-full flex-col rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-safe:animate-fade-up"
      style={style}
    >
      <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-ecaa-gold-200/80 bg-gradient-to-br from-ecaa-green-100 via-ecaa-cream to-ecaa-gold-100 shadow-ecaa-sm transition-transform duration-300 group-hover:scale-[1.03] sm:h-28 sm:w-28">
        {hasPhoto ? (
          <img
            src={imageSrc}
            alt={getMemberImageAlt(member)}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-ecaa-green-800">
            {initials}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col text-center">
        <h3 className="text-base font-semibold tracking-tight text-ecaa-ink sm:text-lg">
          {member.name}
        </h3>
        {member.role && (
          <p className="mt-1 text-sm font-medium text-ecaa-gold-700">{member.role}</p>
        )}
        {member.committee && (
          <span className="leadership-committee-badge mx-auto mt-3 inline-flex rounded-full border border-ecaa-green-200 bg-ecaa-green-50 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-ecaa-green-800">
            {member.committee}
          </span>
        )}
        <button
          type="button"
          onClick={() => onViewProfile?.(member)}
          className="mt-5 w-full rounded-lg border border-ecaa-green-200 bg-ecaa-green-50 px-4 py-2.5 text-sm font-semibold text-ecaa-green-900 transition-colors hover:bg-ecaa-green-100"
        >
          {viewProfileLabel}
        </button>
      </div>
    </article>
  );
}
