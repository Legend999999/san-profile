# San Portfolio

A premium dark personal portfolio for San, with a public projects site and a protected admin dashboard for managing projects without editing code.

## What Is Included

- Public homepage with editable intro, projects, contact links, SEO metadata, sitemap, and robots file.
- Project preview pages at `/projects/[slug]` with iframe fallback messaging.
- Admin login at `/admin/login` using either a simple server-side admin credential or Supabase email/password authentication.
- Protected admin dashboard, projects CRUD, publish/draft, featured status, ordering, and settings editor.
- GitHub-backed editable content storage for Vercel when Supabase is not configured.
- Server-side screenshot generation route with URL validation and SSRF protection.
- Supabase SQL migration with tables, storage bucket, triggers, and row-level security policies.
- Deployment-ready environment variables for GitHub, Vercel, and Cloudflare-managed domains.

## Local Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Fill in GitHub storage values, or Supabase and screenshot provider values.
4. For GitHub storage, create a fine-grained GitHub token with Contents read/write access to this repository and add it as `GITHUB_TOKEN`.
5. For Supabase storage, run the SQL in `supabase/migrations/001_initial_schema.sql` inside the Supabase SQL editor.
6. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD`, or create one administrator in Supabase Auth with email and password.
7. Start the app with `npm run dev`.

## Editable Content Without Supabase

On Vercel, the admin dashboard can save projects and website settings to `content/site-data.json` in the GitHub repository.

Set these Vercel Production environment variables:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `GITHUB_REPO`
- `GITHUB_BRANCH`
- `CONTENT_FILE_PATH`
- `GITHUB_TOKEN`

`GITHUB_TOKEN` must be a fine-grained GitHub token for `Legend999999/san-profile` with Contents read/write permission. The app also accepts `github_token`, `GITHUB_PAT`, or `GH_TOKEN` if the token was added under one of those names. Keep it secret. Do not commit it to the repo.

## Supabase Configuration

Create a Supabase project, then add these values to your environment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

The anon key is safe for browser use. The service role key is server-only and is used only for uploading screenshots to Supabase Storage.

The included RLS policies allow:

- Public users to read only published projects.
- Public users to read website settings.
- Authenticated administrators to create, update, and delete projects and settings.
- Public users to read stored screenshots.

For a single-admin setup, either set one server-side admin username/password or create only San's admin user in Supabase Auth.

## Screenshot Provider

The app uses a reusable screenshot service at `lib/screenshot-service.ts`.

Set:

- `SCREENSHOT_API_ENDPOINT`
- `SCREENSHOT_API_KEY`

The provider endpoint should accept the target URL as a `url` query parameter and return a PNG image. The service validates the submitted URL and blocks localhost, private networks, metadata addresses, credentials in URLs, and unsafe protocols before any provider request is made.

The provider can later be swapped for ScreenshotOne, Cloudflare Browser Rendering, Playwright on a server, or another secure server-side capture service.

## Vercel Deployment

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add all variables from `.env.example` in Vercel Project Settings.
4. Set `NEXT_PUBLIC_SITE_URL` to your final domain, such as `https://san.com`.
5. Make sure the Vercel Build Command is `npm run build` and the Output Directory is `.next`.
6. Deploy.

## Cloudflare DNS

1. Add the domain to Cloudflare.
2. Point the root or subdomain to Vercel using Vercel's DNS instructions.
3. Keep SSL/TLS mode on Full or Full Strict.
4. After DNS is live, update `NEXT_PUBLIC_SITE_URL`.

## Admin Flow

1. Visit `/admin/login`.
2. Sign in with the Supabase administrator account.
3. Add a project with title, URL, descriptions, technologies, category, order, featured, and published status.
4. Click Generate Screenshot.
5. Save and publish the project.
6. View it on the homepage and open its preview page.
