import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client with service role for uploads and admin actions.
 * Use only in API routes or server code. Never expose this client to the browser.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey);
}
