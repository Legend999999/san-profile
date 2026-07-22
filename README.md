# San Portfolio

A Next.js personal portfolio for San with a public project gallery and a Supabase-protected admin dashboard.

## Stack

- Next.js 16, React, TypeScript
- Plain CSS in `app/globals.css`
- Supabase Auth for admin login
- Supabase Postgres for editable settings and projects
- Supabase Storage for project images
- Vercel deployment from GitHub

## How Data Works

The public website reads from Supabase:

- `public.website_settings` for the site title, owner text, links, and footer.
- `public.projects` for project cards and project pages.
- `storage.objects` in the `project-images` bucket for uploaded project images.

Visitors use the Supabase anon key and can only read:

- published projects where `published = true`
- website settings
- public files in the `project-images` bucket

Admin editing uses the Supabase Auth access token stored in an httpOnly cookie after login. The browser never stores admin passwords, GitHub tokens, service-role keys, or database secrets.

## Supabase Tables

### `public.admin_users`

Allowlist for accounts that can edit the site.

- `user_id uuid primary key`: the Supabase Auth user id for your admin account.
- `created_at timestamptz`: when the admin was added.

Only users listed here pass the `public.is_admin()` RLS check.

### `public.website_settings`

Stores one row of editable website settings.

- `id uuid primary key`
- `site_title text`
- `owner_name text`
- `introduction text`
- `about_text text`
- `github_url text`
- `telegram_url text`
- `email text`
- `footer_text text`
- `updated_at timestamptz`

Visitors can read settings. Only allowlisted admins can insert, update, or delete settings.

### `public.projects`

Stores portfolio projects.

- `id uuid primary key`
- `title text`
- `slug text unique`
- `short_description text`
- `full_description text`
- `website_url text`
- `screenshot_url text`: public Supabase Storage URL or generated screenshot URL.
- `technologies text[]`
- `category text`
- `featured boolean`
- `published boolean`
- `display_order integer`
- `created_at timestamptz`
- `updated_at timestamptz`

Visitors can read only rows where `published = true`. Only allowlisted admins can create, edit, or delete projects.

## Supabase Storage

Bucket:

- `project-images`

Policies:

- Public users can read images.
- Allowlisted authenticated admins can upload, update, and delete images.

Uploaded files are stored in Supabase Storage. The public URL is saved in `projects.screenshot_url`.

## Environment Variables

Set these in Vercel Production and in `.env.local` for local development:

```bash
NEXT_PUBLIC_SITE_URL=https://san-profile.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Optional screenshot provider:

```bash
SCREENSHOT_API_ENDPOINT=https://api.example.com/capture
SCREENSHOT_API_KEY=your-provider-key
```

Do not put a Supabase service-role key in frontend code. This app does not require `SUPABASE_SERVICE_ROLE_KEY`.

## Setup Steps

1. Create a Supabase project.
2. In Supabase SQL Editor, run `supabase/migrations/001_initial_schema.sql`.
3. In Supabase Auth, create your admin user with email and password.
4. Copy that user's Auth `id`.
5. In Supabase SQL Editor, run:

```sql
insert into public.admin_users (user_id)
values ('PASTE-YOUR-SUPABASE-AUTH-USER-ID-HERE')
on conflict (user_id) do nothing;
```

6. Add the environment variables above to Vercel Project Settings.
7. Redeploy Vercel.
8. Visit `/admin/login` and sign in with the Supabase admin email and password.

## Admin Flow

1. Visit `/admin/login`.
2. Sign in with your Supabase admin email and password.
3. Edit website settings in `/admin/settings`.
4. Add or edit projects in `/admin/projects`.
5. Upload a project image, or generate a screenshot if a screenshot provider is configured.
6. Save the project.
7. If `published` is checked, visitors see it immediately on the public site.

## Important Files

- `app/page.tsx`: public homepage.
- `app/projects/[slug]/page.tsx`: public project detail page.
- `app/admin/login/page.tsx`: Supabase Auth login page.
- `app/admin/(private)/page.tsx`: admin dashboard.
- `app/admin/(private)/projects`: project management pages.
- `app/admin/(private)/settings/page.tsx`: settings management page.
- `app/admin/api/projects`: project create/update/delete API routes.
- `app/admin/api/settings/route.ts`: website settings update route.
- `app/admin/api/uploads/route.ts`: Supabase Storage image upload route.
- `app/admin/api/screenshots/route.ts`: screenshot generation route.
- `lib/data.ts`: public and admin Supabase reads.
- `lib/supabase-rest.ts`: Supabase REST helper using anon or authenticated user tokens.
- `lib/screenshot-service.ts`: screenshot provider and authenticated Storage upload.
- `supabase/migrations/001_initial_schema.sql`: database, RLS, and storage setup.
