import { supabase } from "../lib/supabaseClient";
import { isValidUuid } from "./uuid";

export const ADMIN_NOT_AUTHORIZED_MESSAGE =
  "You are logged in, but your account is not authorized as an ECAA admin. Check the admin_users table and RLS policies.";

export const MEDIA_RLS_BLOCKED_MESSAGE =
  "Media could not be saved because Supabase permissions blocked this action.";

export const ADMIN_DELETE_RLS_BLOCKED_MESSAGE =
  "You are logged in, but Supabase permissions blocked this delete. Check admin_users and RLS policies.";

export const ADMIN_INVALID_UUID_DELETE_MESSAGE =
  "This item cannot be deleted because it is not saved in the database yet.";

export class AdminNotAuthorizedError extends Error {
  constructor(message = ADMIN_NOT_AUTHORIZED_MESSAGE) {
    super(message);
    this.name = "AdminNotAuthorizedError";
  }
}

export class AdminSessionRequiredError extends Error {
  constructor() {
    super("Admin session required.");
    this.name = "AdminSessionRequiredError";
  }
}

export class InvalidUuidForDeleteError extends Error {
  constructor(message = ADMIN_INVALID_UUID_DELETE_MESSAGE) {
    super(message);
    this.name = "InvalidUuidForDeleteError";
  }
}

export function isForbiddenError(error) {
  if (!error) return false;
  const message = String(error.message || "");
  return (
    error.status === 403 ||
    error.code === "42501" ||
    message.includes("row-level security") ||
    message.includes("permission denied")
  );
}

export function isRlsViolationError(error) {
  return isForbiddenError(error);
}

export function ensureDeletableUuid(id, context = "item") {
  if (!isValidUuid(id)) {
    console.warn(`Skipping delete because ${context} id is not a valid UUID:`, id);
    throw new InvalidUuidForDeleteError();
  }
  return id;
}

export function mapAdminSupabaseError(error, context = "admin") {
  if (!error) return null;
  if (isForbiddenError(error)) {
    if (context === "media") {
      return new Error(MEDIA_RLS_BLOCKED_MESSAGE);
    }
    return new AdminNotAuthorizedError();
  }
  return error;
}

export function mapAdminDeleteError(error) {
  if (
    error instanceof InvalidUuidForDeleteError ||
    error instanceof AdminNotAuthorizedError ||
    error instanceof AdminSessionRequiredError
  ) {
    return error;
  }
  if (isForbiddenError(error)) {
    return new Error(ADMIN_DELETE_RLS_BLOCKED_MESSAGE);
  }
  return error;
}

/** Returns session or null. Does not throw. */
export async function getAdminSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session ?? null;
}

/** Ensures an authenticated Supabase session exists before admin queries. */
export async function assertAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw new AdminSessionRequiredError();
  }
  return session;
}

export async function logAdminActionInDev(action) {
  if (!import.meta.env.DEV) return;
  const { data } = await supabase.auth.getUser();
  console.log(`${action}:`, data?.user?.email || "(no user)");
}

export async function logAdminDeleteInDev() {
  await logAdminActionInDev("Deleting as admin user");
}
