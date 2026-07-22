create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text not null,
  full_description text,
  website_url text not null,
  screenshot_url text,
  technologies text[] not null default '{}',
  category text not null default 'Websites',
  featured boolean not null default false,
  published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.website_settings (
  id uuid primary key default gen_random_uuid(),
  site_title text not null default 'San Portfolio',
  owner_name text not null default 'San',
  introduction text not null default 'I build modern websites, useful tools, and digital experiences.',
  about_text text not null default 'A focused portfolio for websites, tools, and digital experiences created with clean design and reliable engineering.',
  github_url text,
  telegram_url text,
  email text,
  footer_text text not null default '© San. Built for modern web projects.',
  updated_at timestamptz not null default now()
);

insert into public.website_settings (
  site_title,
  owner_name,
  introduction,
  about_text,
  github_url,
  telegram_url,
  email,
  footer_text
)
select
  'San Portfolio',
  'San',
  'I build modern websites, useful tools, and digital experiences.',
  'A focused portfolio for websites, tools, and digital experiences created with clean design and reliable engineering.',
  'https://github.com/Legend999999',
  'https://t.me/',
  'san@example.com',
  '© San. Built for modern web projects.'
where not exists (select 1 from public.website_settings);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists set_website_settings_updated_at on public.website_settings;
create trigger set_website_settings_updated_at
before update on public.website_settings
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;
alter table public.website_settings enable row level security;

drop policy if exists "Admins can read admin allowlist" on public.admin_users;
create policy "Admins can read admin allowlist"
on public.admin_users for select
to authenticated
using (public.is_admin());

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
on public.projects for select
using (published = true);

drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects"
on public.projects for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read website settings" on public.website_settings;
create policy "Public can read website settings"
on public.website_settings for select
using (true);

drop policy if exists "Admins can manage website settings" on public.website_settings;
create policy "Admins can manage website settings"
on public.website_settings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read project images" on storage.objects;
create policy "Public can read project images"
on storage.objects for select
using (bucket_id = 'project-images');

drop policy if exists "Admins can upload project images" on storage.objects;
create policy "Admins can upload project images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Admins can update project images" on storage.objects;
create policy "Admins can update project images"
on storage.objects for update
to authenticated
using (bucket_id = 'project-images' and public.is_admin())
with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Admins can delete project images" on storage.objects;
create policy "Admins can delete project images"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-images' and public.is_admin());
