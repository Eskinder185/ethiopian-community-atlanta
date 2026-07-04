import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

const missingEnvMessage =
  "Supabase environment variables are missing. Create .env.local at the project root (same level as package.json) with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.";

if (!hasSupabaseConfig()) {
  if (import.meta.env.DEV) {
    console.error(missingEnvMessage);
  } else {
    console.warn(missingEnvMessage);
  }
}

/** Placeholder values prevent createClient from throwing when env is missing; hasSupabaseConfig() gates real usage. */
const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_KEY = "placeholder-anon-key";

export const supabase = createClient(
  supabaseUrl || PLACEHOLDER_URL,
  supabaseAnonKey || PLACEHOLDER_KEY
);
