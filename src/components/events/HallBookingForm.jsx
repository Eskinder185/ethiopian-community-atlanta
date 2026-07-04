import { useState } from "react";
import FormInput from "../admin/FormInput";
import FormTextarea from "../admin/FormTextarea";
import { submitHallBooking } from "../../utils/hallBookings";

const initialForm = {
  requesterName: "",
  requesterEmail: "",
  requesterPhone: "",
  eventTitle: "",
  eventType: "",
  startTime: "",
  endTime: "",
  expectedGuests: "",
  notes: "",
};

function validateForm(form) {
  const errors = {};

  if (!form.requesterName.trim()) errors.requesterName = "Name is required.";
  if (!form.requesterEmail.trim()) errors.requesterEmail = "Email is required.";
  if (!form.eventTitle.trim()) errors.eventTitle = "Event title is required.";
  if (!form.eventType.trim()) errors.eventType = "Event type is required.";
  if (!form.startTime) errors.startTime = "Start date and time are required.";
  if (!form.endTime) errors.endTime = "End date and time are required.";

  return errors;
}

export default function HallBookingForm({ labels = {} }) {
  const fields = labels.fields || {};
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setFieldErrors(validationErrors);
    setError("");

    if (Object.keys(validationErrors).length > 0) {
      const firstInvalidId = {
        requesterName: "requester-name",
        requesterEmail: "requester-email",
        eventTitle: "event-title",
        eventType: "event-type",
        startTime: "start-time",
        endTime: "end-time",
      }[Object.keys(validationErrors)[0]];
      document.getElementById(firstInvalidId)?.focus();
      return;
    }

    setSubmitting(true);
    setSuccess(false);

    try {
      await submitHallBooking(form);
      setSuccess(true);
      setForm(initialForm);
      setFieldErrors({});
    } catch (submitError) {
      setError(
        submitError?.message ||
          labels.errorMessage ||
          "Your request could not be submitted right now. Please contact ECAA directly for hall rental information."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        className="rounded-ecaa-xl border border-ecaa-green-200 bg-ecaa-green-50 p-6 text-sm leading-relaxed text-ecaa-green-950"
        role="status"
        aria-live="polite"
      >
        {labels.successMessage ||
          "Thank you. Your hall request has been submitted. ECAA will review availability, requirements, pricing, and approval before confirming the booking."}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-6 shadow-ecaa-sm"
      aria-labelledby="hall-booking-form-title"
      noValidate
    >
      <h2 id="hall-booking-form-title" className="text-lg font-semibold text-ecaa-green-950">
        {labels.title || "Booking request form"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          id="requester-name"
          label={fields.name || "Your name"}
          value={form.requesterName}
          onChange={(e) => updateField("requesterName", e.target.value)}
          required
          error={fieldErrors.requesterName}
        />
        <FormInput
          id="requester-email"
          label={fields.email || "Email"}
          type="email"
          value={form.requesterEmail}
          onChange={(e) => updateField("requesterEmail", e.target.value)}
          required
          error={fieldErrors.requesterEmail}
        />
        <FormInput
          id="requester-phone"
          label={fields.phone || "Phone"}
          type="tel"
          value={form.requesterPhone}
          onChange={(e) => updateField("requesterPhone", e.target.value)}
        />
        <FormInput
          id="event-title"
          label={fields.eventTitle || "Event title"}
          value={form.eventTitle}
          onChange={(e) => updateField("eventTitle", e.target.value)}
          required
          error={fieldErrors.eventTitle}
        />
        <FormInput
          id="event-type"
          label={fields.eventType || "Event type"}
          value={form.eventType}
          onChange={(e) => updateField("eventType", e.target.value)}
          required
          error={fieldErrors.eventType}
        />
        <FormInput
          id="expected-guests"
          label={fields.expectedGuests || "Expected guests"}
          type="number"
          min="1"
          value={form.expectedGuests}
          onChange={(e) => updateField("expectedGuests", e.target.value)}
        />
        <FormInput
          id="start-time"
          label={fields.startTime || "Start date & time"}
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => updateField("startTime", e.target.value)}
          required
          error={fieldErrors.startTime}
          className="sm:col-span-2"
        />
        <FormInput
          id="end-time"
          label={fields.endTime || "End date & time"}
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => updateField("endTime", e.target.value)}
          required
          error={fieldErrors.endTime}
          className="sm:col-span-2"
        />
      </div>
      <FormTextarea
        id="booking-notes"
        label={fields.notes || "Notes"}
        rows={4}
        value={form.notes}
        onChange={(e) => updateField("notes", e.target.value)}
      />

      {error && (
        <p
          id="hall-booking-form-error"
          className="rounded-lg border border-ecaa-red-200 bg-ecaa-red-50 px-3 py-2 text-sm text-ecaa-red-700"
          role="alert"
        >
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary min-h-[44px]" disabled={submitting}>
        {submitting
          ? labels.submittingLabel || "Submitting…"
          : labels.submitLabel || "Submit Hall Request"}
      </button>
    </form>
  );
}
