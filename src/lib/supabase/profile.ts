import { supabase } from "./client";

export type AppRole = "admin" | "team_member";

export type Profile = {
  user_id: string;
  role: AppRole;
  team_slug: string | null;
  profile_data: Record<string, unknown>;
};

export async function getCurrentProfile(): Promise<Profile | null> {
  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user?.id) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("user_id, role, team_slug, profile_data")
    .eq("user_id", session.user.id)
    .maybeSingle();
  if (error || !data) return null;
  return data as Profile;
}

export async function updateMyProfile(profileData: Record<string, unknown>): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured");
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user?.id) throw new Error("Not logged in");
  const { error } = await supabase
    .from("profiles")
    .update({ profile_data: profileData, updated_at: new Date().toISOString() })
    .eq("user_id", session.user.id);
  if (error) throw error;
}

/** Fetch a profile by team_slug for public team pages. Returns null if not found or Supabase not configured. */
export async function getProfileByTeamSlug(slug: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("user_id, role, team_slug, profile_data")
    .eq("team_slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return data as Profile;
}
