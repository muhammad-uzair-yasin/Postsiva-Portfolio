/**
 * Seed 7 users in Supabase Auth + profiles table:
 * 1 admin + 6 team members.
 * Requires: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in env.
 * Run from repo root: node scripts/seed-users.mjs
 * Default password for all: ChangeMe123!
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

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
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });

const DEFAULT_PASSWORD = "ChangeMe123!";

const ADMIN = {
  email: "admin@postsiva.com",
  role: "admin",
  team_slug: null,
  profile_data: {},
};

const TEAM_MEMBERS = [
  { email: "uzair@postsiva.com", team_slug: "uzair-yasin", profile_data: { name: "Engr. Uzair Yasin", role: "Agentic AI & Backend Developer", description: "Developing Agentic AI systems and optimized backend APIs", fullDescription: "Engr. Uzair Yasin is a Generative AI Engineer and Full-Stack Developer with expertise in Python, FastAPI, and Next.js.", image: "/uzair.png", skills: ["Python", "JavaScript", "TypeScript", "Next.js", "FastAPI", "LangChain"], bulletPoints: [], certificates: [], cvLink: "", socials: {} } },
  { email: "fahad@postsiva.com", team_slug: "fahad-jabbar", profile_data: { name: "Engr. Fahad Jabbar", role: "Senior Frontend Engineer", description: "Crafting user-friendly designs that deliver smooth experiences", fullDescription: "Engr. Fahad Jabbar is a dedicated Senior Frontend Engineer with expertise in Next.js and Framer Motion.", image: "/fahad.jpg", skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"], bulletPoints: [], certificates: [], cvLink: "", socials: {} } },
  { email: "maryam@postsiva.com", team_slug: "maryam-riaz", profile_data: { name: "Maryam Riaz", role: "Frontend Engineer", description: "Crafting user-friendly designs that deliver smooth experiences", fullDescription: "Maryam Riaz is a dedicated Frontend Engineer with a passion for crafting intelligent and visually engaging web applications.", image: "/maryam-detail/maryam.png", skills: ["Python", "TypeScript", "Next.js", "Tailwind CSS", "FastAPI"], bulletPoints: [], certificates: [], cvLink: "", socials: {} } },
  { email: "hannan@postsiva.com", team_slug: "abdul-hannan", profile_data: { name: "Abdul Hannan", role: "Full Stack Engineer", description: "MERN stack developer creating responsive and immersive web experiences", fullDescription: "Abdul Hannan specializes in React/Next + FastAPI/Node/Express with expertise in PostgreSQL, MongoDB, Docker.", image: "/hannan-detail/abdulhannan.jpg", skills: ["React.js", "Node.js", "MongoDB", "PostgreSQL", "Docker"], bulletPoints: [], certificates: [], cvLink: "", socials: {} } },
  { email: "alisha@postsiva.com", team_slug: "alisha-kayani", profile_data: { name: "Alisha Kayani", role: "Backend Software Engineer", description: "Building scalable backend infrastructure with Python and FastAPI", fullDescription: "Alisha Kayani is a Software Engineer specializing in Backend Development and AI Automation.", image: "/alisha-detail/alisha-image.jpeg", skills: ["Python", "FastAPI", "Django", "LLM Integration", "n8n"], bulletPoints: [], certificates: [], cvLink: "", socials: {} } },
  { email: "esha@postsiva.com", team_slug: "esha-amjad", profile_data: { name: "Esha Amjad", role: "Backend Software Engineer", description: "Professional AI Engineer specializing in Agentic systems and Python.", fullDescription: "Esha Amjad is a professional Computer Science graduate with expertise in AI, Agentic AI systems, and Python development.", image: "/esha-amjad/esha-amjad.jpeg", skills: ["Python", "AI / Agentic AI", "Prompt Engineering", "LangChain", "FastAPI"], bulletPoints: [], certificates: [], cvLink: "", socials: {} } },
];

async function main() {
  const toCreate = [ADMIN, ...TEAM_MEMBERS];
  const created = [];

  for (const u of toCreate) {
    const email = u.email;
    const { data: existing } = await supabase.auth.admin.listUsers();
    const found = existing?.users?.find((x) => x.email === email);
    if (found) {
      console.log("User already exists:", email);
      created.push({ email, id: found.id, role: u.role ?? "team_member", team_slug: u.team_slug ?? null, profile_data: u.profile_data ?? {} });
      continue;
    }
    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email,
      password: DEFAULT_PASSWORD,
      email_confirm: true,
    });
    if (userError) {
      console.error("Create user failed:", email, userError.message);
      continue;
    }
    const uid = user?.user?.id;
    console.log("Created user:", email, uid ?? "(ok)");
    created.push({ email, id: uid, role: u.role ?? "team_member", team_slug: u.team_slug ?? null, profile_data: u.profile_data ?? {} });
  }

  for (const p of created) {
    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        user_id: p.id,
        role: p.role,
        team_slug: p.team_slug,
        profile_data: p.profile_data,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
    if (profileError) console.error("Profile upsert failed:", p.email, profileError.message);
    else console.log("Profile upserted:", p.email, p.role);
  }

  console.log("\nDone. All users have password:", DEFAULT_PASSWORD);
  console.log("Admin:", ADMIN.email);
  console.log("Team:", TEAM_MEMBERS.map((t) => t.email).join(", "));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
