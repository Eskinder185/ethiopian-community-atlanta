import { supabase } from "../lib/supabaseClient";
import { getLeadershipPageContent } from "../data/leadershipPageContent";
import { getMediaPageContent } from "../data/mediaPageContent";
import { getMembershipPageContent } from "../data/membershipPageContent";
import { getSupportPageContent } from "../data/supportPageContent";
import { getEventsPageContent } from "../data/eventsPageContent";
import { mergeLocalizedContent } from "./homepageLocale";

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

function warnPageContentFallback(pageKey, context, error) {
  console.warn(
    `Using fallback ${pageKey} page content because Supabase failed (${context})`,
    error
  );
}

export async function fetchPageContentRow(pageKey) {
  if (!hasSupabaseConfig() || !pageKey) return null;

  try {
    const { data, error } = await supabase
      .from("page_content")
      .select("page_key, content, content_am")
      .eq("page_key", pageKey)
      .maybeSingle();

    if (error) {
      warnPageContentFallback(pageKey, `fetchPageContentRow:${pageKey}`, error);
      return null;
    }

    return data || null;
  } catch (error) {
    warnPageContentFallback(pageKey, `fetchPageContentRow:${pageKey}`, error);
    return null;
  }
}

export async function fetchLeadershipPageContentRow() {
  return fetchPageContentRow("leadership");
}

export async function fetchMediaPageContentRow() {
  return fetchPageContentRow("media");
}

export async function fetchMembershipPageContentRow() {
  return fetchPageContentRow("membership");
}

export async function fetchSupportPageContentRow() {
  return fetchPageContentRow("support");
}

export async function fetchEventsPageContentRow() {
  return fetchPageContentRow("events");
}

export function resolveLeadershipPageContent(language = "en", remoteRow = null) {
  return getLeadershipPageContent(language, remoteRow);
}

export function resolveMediaPageContent(language = "en", remoteRow = null) {
  return getMediaPageContent(language, remoteRow);
}

export function resolveMembershipPageContent(language = "en", remoteRow = null) {
  return getMembershipPageContent(language, remoteRow);
}

export function resolveSupportPageContent(language = "en", remoteRow = null) {
  return getSupportPageContent(language, remoteRow);
}

export function resolveEventsPageContent(language = "en", remoteRow = null) {
  return getEventsPageContent(language, remoteRow);
}

export async function saveLeadershipPageContent({ content, contentAm }) {
  if (!hasSupabaseConfig()) {
    throw new Error(
      "Supabase is not configured. Leadership page content cannot be saved online yet."
    );
  }

  const payload = {
    page_key: "leadership",
    content,
    content_am: contentAm,
  };

  const { data, error } = await supabase
    .from("page_content")
    .upsert(payload, { onConflict: "page_key" })
    .select("page_key, content, content_am")
    .single();

  if (error) throw error;
  return data;
}

export function mergeLeadershipPageContentRow(existing = null, updates = {}) {
  return {
    page_key: "leadership",
    content: mergeLocalizedContent(existing?.content || {}, updates.content || {}),
    content_am: mergeLocalizedContent(existing?.content_am || {}, updates.content_am || {}),
  };
}
