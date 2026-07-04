import fallbackHallBookings from "../data/hallBookings.js";
import { supabase } from "../lib/supabaseClient";
import { hasUsableText } from "./data";
import {
  assertAdminSession,
  ensureDeletableUuid,
  logAdminDeleteInDev,
  mapAdminDeleteError,
} from "./adminAuth";

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

function warnSupabaseFallback(context, error) {
  console.warn(`Using fallback hall bookings because Supabase failed (${context})`, error);
}

export function normalizeHallBooking(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    requesterName: raw.requester_name || raw.requesterName || "",
    requesterEmail: raw.requester_email || raw.requesterEmail || "",
    requesterPhone: raw.requester_phone || raw.requesterPhone || "",
    eventTitle: raw.event_title || raw.eventTitle || "",
    eventType: raw.event_type || raw.eventType || "",
    startTime: raw.start_time || raw.startTime || "",
    endTime: raw.end_time || raw.endTime || "",
    expectedGuests: raw.expected_guests ?? raw.expectedGuests ?? "",
    notes: raw.notes || "",
    status: raw.status || "pending",
    publicTitle: raw.public_title || raw.publicTitle || "Reserved",
    visiblePublic: raw.visible_public === true || raw.visiblePublic === true,
    adminNotes: raw.admin_notes || raw.adminNotes || "",
  };
}

export function getFallbackPublicHallBookings() {
  return fallbackHallBookings
    .map(normalizeHallBooking)
    .filter((booking) => booking.status === "approved" && booking.visiblePublic);
}

export async function fetchPublicHallBookings() {
  if (!hasSupabaseConfig()) return getFallbackPublicHallBookings();

  try {
    const { data, error } = await supabase
      .from("hall_bookings")
      .select("id, start_time, end_time, public_title, status, visible_public")
      .eq("status", "approved")
      .eq("visible_public", true)
      .order("start_time", { ascending: true });

    if (error) {
      warnSupabaseFallback("fetchPublicHallBookings", error);
      return getFallbackPublicHallBookings();
    }

    return (data ?? []).map(normalizeHallBooking);
  } catch (error) {
    warnSupabaseFallback("fetchPublicHallBookings", error);
    return getFallbackPublicHallBookings();
  }
}

export async function fetchHallBookingsForAdmin() {
  const result = await fetchHallBookingsAdminState();
  return result.items;
}

export async function fetchHallBookingsAdminState() {
  if (!hasSupabaseConfig()) {
    return {
      items: fallbackHallBookings.map(normalizeHallBooking),
      source: "fallback",
      setupMessage:
        "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to manage hall bookings online.",
    };
  }

  try {
    const { data, error } = await supabase
      .from("hall_bookings")
      .select("*")
      .order("start_time", { ascending: false });

    if (error) {
      warnSupabaseFallback("fetchHallBookingsForAdmin", error);
      return {
        items: fallbackHallBookings.map(normalizeHallBooking),
        source: "fallback",
        setupMessage:
          "Hall bookings could not be loaded from Supabase. Check that the hall_bookings table exists and your admin permissions are configured.",
      };
    }

    return {
      items: (data ?? []).map(normalizeHallBooking),
      source: "supabase",
      setupMessage: "",
    };
  } catch (error) {
    warnSupabaseFallback("fetchHallBookingsForAdmin", error);
    return {
      items: fallbackHallBookings.map(normalizeHallBooking),
      source: "fallback",
      setupMessage:
        "Hall bookings could not be loaded from Supabase. Check that the hall_bookings table exists and your admin permissions are configured.",
    };
  }
}

export async function submitHallBooking(form) {
  if (!hasSupabaseConfig()) {
    throw new Error("Hall booking is not available yet. Please contact ECAA directly.");
  }

  const row = {
    requester_name: form.requesterName?.trim(),
    requester_email: form.requesterEmail?.trim(),
    requester_phone: form.requesterPhone?.trim(),
    event_title: form.eventTitle?.trim(),
    event_type: form.eventType?.trim(),
    start_time: form.startTime,
    end_time: form.endTime,
    expected_guests: form.expectedGuests || null,
    notes: form.notes?.trim() || "",
    status: "pending",
    visible_public: false,
    public_title: "Reserved",
  };

  const { error } = await supabase.from("hall_bookings").insert(row);
  if (error) throw error;
}

export async function updateHallBooking(id, updates) {
  const row = {
    status: updates.status,
    visible_public: updates.visiblePublic === true,
    public_title: updates.publicTitle || "Reserved",
    admin_notes: updates.adminNotes || "",
  };

  const { data, error } = await supabase
    .from("hall_bookings")
    .update(row)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return normalizeHallBooking(data);
}

export async function deleteHallBooking(id) {
  await assertAdminSession();
  ensureDeletableUuid(id, "hall booking");
  await logAdminDeleteInDev();

  const { error } = await supabase.from("hall_bookings").delete().eq("id", id);
  if (error) throw mapAdminDeleteError(error);
}

export function formatBookingDateTime(value) {
  if (!hasUsableText(value)) return "";
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}
