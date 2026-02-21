-- Add GitHub link to projects. Schema source: project-data.ts (Project.githubLink)
alter table public.projects
  add column if not exists github_link text;

comment on column public.projects.github_link is 'URL to project repository (e.g. GitHub).';
