import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import {
  getMemberImageAlt,
  getMemberImageSrc,
  getMemberInitials,
  memberHasDisplayableImage,
} from "../../utils/leadership";
import SocialContactButtons from "./SocialContactButtons";

export default function LeadershipPreviewModal({
  member,
  committee,
  onClose,
  closeLabel = "Close",
  contactLabels,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useFocusTrap(dialogRef, Boolean(member), {
    initialFocusRef: closeButtonRef,
    onEscape: onClose,
  });

  useEffect(() => {
    setImageFailed(false);
  }, [member?.id]);

  useEffect(() => {
    if (!member) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [member]);

  if (!member) return null;

  const hasPhoto = memberHasDisplayableImage(member) && !imageFailed;
  const imageSrc = getMemberImageSrc(member);
  const initials = getMemberInitials(member.name);
  const committeeLabel = committee || member.committee;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-ecaa-green-950/55"
        aria-label={closeLabel}
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-ecaa-2xl border border-ecaa-border bg-ecaa-white p-6 shadow-ecaa-lg sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leadership-preview-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-ecaa-border bg-ecaa-cream text-ecaa-ink-muted transition-colors hover:bg-ecaa-cream-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ecaa-green-700"
          aria-label={closeLabel}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-5 h-32 w-32 overflow-hidden rounded-full border-2 border-ecaa-gold-300/80 bg-gradient-to-br from-ecaa-green-100 via-ecaa-cream to-ecaa-gold-100 shadow-ecaa-md">
            {hasPhoto ? (
              <img
                src={imageSrc}
                alt={getMemberImageAlt(member)}
                className="h-full w-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-3xl font-semibold text-ecaa-green-800">
                {initials}
              </span>
            )}
          </div>

          <h2
            id="leadership-preview-title"
            className="text-2xl font-semibold tracking-tight text-ecaa-ink"
          >
            {member.name}
          </h2>

          {member.role && (
            <p className="mt-2 text-base font-medium text-ecaa-green-800">{member.role}</p>
          )}

          {committeeLabel && (
            <p className="leadership-committee-badge mt-3 text-xs font-semibold tracking-[0.14em] text-ecaa-ink-subtle">
              {committeeLabel}
            </p>
          )}

          {member.bio && (
            <p className="mt-5 text-left text-sm leading-relaxed text-ecaa-ink-muted sm:text-base">
              {member.bio}
            </p>
          )}

          <SocialContactButtons
            member={member}
            labels={contactLabels}
            className="mt-6 justify-center"
          />
        </div>
      </div>
    </div>
  );
}
