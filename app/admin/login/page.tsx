import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "@/lib/config";
import { simpleAdminToken, verifySimpleAdminLogin } from "@/lib/simple-admin-auth";

async function login(formData: FormData) {
  "use server";

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  const store = await cookies();
  const secureCookie = process.env.NODE_ENV === "production";

  if (verifySimpleAdminLogin(username, password)) {
    store.set("san-admin-access-token", simpleAdminToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureCookie,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    redirect(next.startsWith("/admin") ? next : "/admin");
  }

  const config = getSupabaseConfig();

  if (!config) {
    redirect("/admin/login?error=Invalid%20username%20or%20password");
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
      <section className="form-panel login-card">
        <div className="brand">
          <span className="brand-mark">S</span>
          <span>San Admin</span>
        </div>
        <h1>Sign in</h1>
        <p className="muted">Use the admin username and password.</p>
        {params.error ? <p className="notice">{decodeURIComponent(params.error)}</p> : null}
        <form action={login} className="form-grid" style={{ gridTemplateColumns: "1fr" }}>
          <input type="hidden" name="next" value={params.next ?? "/admin"} />
          <div className="field">
            <label htmlFor="username">Username</label>
            <input className="input" id="username" name="username" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input className="input" id="password" name="password" type="password" required />
          </div>
          <button className="button primary" type="submit">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
