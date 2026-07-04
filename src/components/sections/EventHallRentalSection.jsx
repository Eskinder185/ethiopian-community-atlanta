import Container from "../ui/Container";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import { siteAssets } from "../../config/assets";
import { resolvePublicAssetPath } from "../../utils/images";
import HallAvailabilityCalendar from "../events/HallAvailabilityCalendar";
import HallBookingForm from "../events/HallBookingForm";

export default function EventHallRentalSection({ section, bookings = [] }) {
  if (!section) return null;

  const contactPath = section.contactPath || "/contact";
  const hallImageSrc = resolvePublicAssetPath(siteAssets.bookHall);
  const hallImageAlt = section.hallImageAlt || siteAssets.bookHallAlt;

  return (
    <section
      id={section.id || "book-hall"}
      className="border-y border-ecaa-gold-200/50 bg-gradient-to-br from-ecaa-gold-50 via-ecaa-cream to-ecaa-gold-100/30 py-12 sm:py-16"
    >
      <Container>
        <AnimateIn>
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
            <div className="max-w-3xl">
              <h2 className="heading-section text-ecaa-green-950">{section.title}</h2>
              <p className="text-lead mt-4 text-ecaa-ink-muted">{section.description}</p>

              {section.importantNote && (
                <div
                  className="mt-5 rounded-ecaa-lg border border-ecaa-gold-200/70 bg-ecaa-gold-50/60 px-5 py-4"
                  role="note"
                >
                  <p className="text-sm leading-relaxed text-ecaa-ink-muted sm:text-base">
                    <span className="font-semibold text-ecaa-ink">
                      {section.importantLabel || "Important:"}
                    </span>{" "}
                    {section.importantNote}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 overflow-hidden rounded-ecaa-xl border border-ecaa-gold-200/60 shadow-ecaa-md lg:mt-0">
              <img
                src={hallImageSrc}
                alt={hallImageAlt}
                className="aspect-[4/3] w-full object-cover lg:aspect-[3/2]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <HallAvailabilityCalendar bookings={bookings} labels={section.availability} />
            <HallBookingForm labels={section.form} />
          </div>

          <div className="mt-8 overflow-hidden rounded-ecaa-2xl border border-ecaa-gold-200/60 bg-ecaa-white/95 p-6 shadow-ecaa-md sm:p-8">
            <h3 className="text-lg font-semibold text-ecaa-green-950">
              {section.goodForTitle || "Good for"}
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {section.goodFor?.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-ecaa-lg border border-ecaa-border/60 bg-ecaa-cream/40 px-4 py-2.5 text-sm text-ecaa-ink-muted sm:text-base"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ecaa-gold-500"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <CTAButton to={contactPath} variant="secondary" size="lg">
                {section.contactButton || "Contact ECAA"}
              </CTAButton>
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
