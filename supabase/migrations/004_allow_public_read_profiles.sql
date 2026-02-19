-- Allow public read of profiles so team pages (e.g. /team/uzair-yasin) can load profile_data by team_slug.
-- Source of truth: 003_profiles_and_project_ownership.sql (profiles table and RLS).

create policy "Allow public read on profiles"
  on public.profiles for select
  using (true);
