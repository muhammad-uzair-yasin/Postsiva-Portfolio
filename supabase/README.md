# Supabase setup

## 1. Env

Copy `.env.local.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase Dashboard → Project Settings → API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — same place

## 2. Run migrations

In Supabase Dashboard → SQL Editor, run in order:

- `migrations/001_create_projects.sql`
- `migrations/002_allow_projects_write.sql`
- `migrations/003_profiles_and_project_ownership.sql` (profiles table, project owner_id, RLS by role)
- `migrations/004_allow_public_read_profiles.sql` (public read of profiles for team pages)

## 3. Seed data

**Projects:** In SQL Editor, run `seed.sql`.

**Users (1 admin + 6 team members):** From repo root, with `SUPABASE_SERVICE_ROLE_KEY` in `.env`:

```bash
npm run seed:users
```

This creates 7 Auth users and their profile rows. Default password for all: **ChangeMe123!**

**Team profile data (name, role, bio, skills, certificates, key highlights, etc.):** After seeding users, run:

```bash
npm run seed:team
```

This updates each profile’s `profile_data` from the hardcoded team data in `src/lib/team-data.ts`, so `/team/[slug]` pages show the full content from the DB.

| Role        | Email              |
|------------|--------------------|
| Admin      | admin@postsiva.com |
| Team       | uzair@postsiva.com, fahad@postsiva.com, maryam@postsiva.com, hannan@postsiva.com, alisha@postsiva.com, esha@postsiva.com |

Change passwords in Supabase Dashboard → Authentication → Users after first login if you want.

## 4. Login (dashboard)

- **Admin:** Can see and edit **all** projects. No “My profile” (admin has no team profile).
- **Team member:** Sees only **their own** projects; can add projects (owned by them), edit/delete own, and edit **My profile** at `/dashboard/profile`.

Use the seeded emails and password above at **/postsiva/login**.

## 5. App

- **Home** and **/portfolio/[slug]** read from the `projects` table (all projects).
- **Dashboard** requires login; behavior depends on role (see above).
