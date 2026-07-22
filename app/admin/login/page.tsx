import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { getSupabaseConfig } from "@/lib/config";

async function login(formData: FormData) {
  "use server";

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  const store = await cookies();
  const secureCookie = process.env.NODE_ENV === "production";

  const config = getSupabaseConfig();

  if (!config) {
    return redirect("/admin/login?error=Invalid%20username%20or%20password");
  }

  const response = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: username, password }),
    cache: "no-store",
  });

  if (!response.ok) {
    redirect("/admin/login?error=Invalid%20email%20or%20password");
  }

  const session = (await response.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
  store.set("san-admin-access-token", session.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie,
    maxAge: session.expires_in,
    path: "/",
  });
  store.set("san-admin-refresh-token", session.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="login-shell">
      <div className="login-aura login-aura-one" />
      <div className="login-aura login-aura-two" />
      <section className="login-stage" aria-label="San admin sign in">
        <div className="login-copy">
          <div className="brand login-brand">
            <span className="brand-mark">S</span>
            <span>San Portfolio</span>
          </div>
          <p className="eyebrow">Private workspace</p>
          <h1>Manage every project from one calm control room.</h1>
          <p className="lead">
            Add websites, publish featured work, refresh screenshots, and tune the
            public portfolio without touching code.
          </p>
          <div className="login-metrics" aria-label="Admin features">
            <span>Projects</span>
            <span>Settings</span>
            <span>Publishing</span>
          </div>
          <div className="login-preview" aria-hidden="true">
            <div className="login-preview-top">
              <span />
              <span />
              <span />
            </div>
            <div className="login-preview-body">
              <div>
                <small>Featured project</small>
                <strong>Modern Website</strong>
              </div>
              <div className="login-preview-graph">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        <div className="login-card-wrap">
          <section className="form-panel login-card">
            <div className="login-card-head">
              <div>
                <p className="muted">Welcome back</p>
                <h2>Sign in</h2>
              </div>
              <span className="login-lock">Secure</span>
            </div>
            <p className="muted">Use your Supabase admin email and password.</p>
            {params.error ? (
              <p className="notice login-notice">{decodeURIComponent(params.error)}</p>
            ) : null}
            <form action={login} className="login-form">
              <input type="hidden" name="next" value={params.next ?? "/admin"} />
              <div className="field">
                <label htmlFor="username">Email</label>
                <input
                  className="input"
                  id="username"
                  name="username"
                  type="email"
                  autoComplete="username"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  className="input"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button className="button primary login-submit" type="submit">
                Sign in to dashboard
              </button>
            </form>
            <div className="login-footnote">
              <span>Protected admin area</span>
              <Link href="/">Back to portfolio</Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
