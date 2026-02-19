-- Allow insert/update/delete on projects (e.g. for dashboard).
-- Restrict with auth later (e.g. only authenticated admin can write).

create policy "Allow anon insert on projects"
  on public.projects for insert
  with check (true);

create policy "Allow anon update on projects"
  on public.projects for update
  using (true)
  with check (true);

create policy "Allow anon delete on projects"
  on public.projects for delete
  using (true);
