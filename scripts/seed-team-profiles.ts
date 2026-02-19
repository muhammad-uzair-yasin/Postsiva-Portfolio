/**
 * Seed profile_data in the DB from hardcoded team data (src/lib/team-data).
 * Updates existing profiles by team_slug so /team/[slug] shows full data.
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in .env
 * Run after seed-users.mjs. From repo root: npx tsx scripts/seed-team-profiles.ts
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { allTeamMembers } from "../src/lib/team-data";

function loadEnv() {
  const envPath = join(process.cwd(), ".env");
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const m = line.match(/^\s*([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function teamMemberToProfileData(member: (typeof allTeamMembers)[number]) {
  return {
    name: member.name,
    role: member.role,
    description: member.description,
    fullDescription: member.fullDescription,
    image: member.image,
    skills: member.skills,
    bulletPoints: member.bulletPoints,
    certificates: member.certificates,
    cvLink: member.cvLink,
    socials: member.socials,
  };
}

async function main() {
  console.log(
    "Seeding profile_data from team-data for",
    allTeamMembers.length,
    "members...\n",
  );

  for (const member of allTeamMembers) {
    const profile_data = teamMemberToProfileData(member);
    const { data, error } = await supabase
      .from("profiles")
      .update({
        profile_data,
        updated_at: new Date().toISOString(),
      })
      .eq("team_slug", member.slug)
      .select("user_id, team_slug")
      .maybeSingle();

    if (error) {
      console.error("Failed:", member.slug, error.message);
      continue;
    }
    if (!data) {
      console.warn(
        "No profile with team_slug:",
        member.slug,
        "- run seed-users.mjs first.",
      );
      continue;
    }
    console.log("Updated:", member.slug, "->", member.name);
  }

  console.log(
    "\nDone. Team profile pages will now show this data from the DB.",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
