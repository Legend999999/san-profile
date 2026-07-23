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
    return redirect("/admin/login?error=%D8%A6%DB%8C%D9%85%DB%95%DB%8C%DA%B5%20%DB%8C%D8%A7%D9%86%20%D9%88%D8%B4%DB%95%DB%8C%20%D9%86%D9%87%DB%8E%D9%86%DB%8C%20%D9%87%DB%95%DA%B5%DB%95%DB%8C%DB%95");
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
    redirect("/admin/login?error=%D8%A6%DB%8C%D9%85%DB%95%DB%8C%DA%B5%20%DB%8C%D8%A7%D9%86%20%D9%88%D8%B4%DB%95%DB%8C%20%D9%86%D9%87%DB%8E%D9%86%DB%8C%20%D9%87%DB%95%DA%B5%DB%95%DB%8C%DB%95");
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
      <section className="login-stage" aria-label="چوونەژوورەوەی بەڕێوەبەری کورد وێب">
        <div className="login-copy">
          <div className="brand login-brand">
            <span className="brand-mark">ک</span>
            <span>کورد وێب</span>
          </div>
          <p className="eyebrow">شوێنی تایبەتی بەڕێوەبردن</p>
          <h1>هەموو پڕۆژە و ناوەڕۆکەکان لە داشبۆردێکی ڕێکوپێک بەڕێوەببە.</h1>
          <p className="lead">
            پڕۆژە زیاد بکە، وێنە بار بکە، Published دابنێ و
            گۆڕانکارییەکانی ماڵپەڕەکەت پاشەکەوت بکە.
          </p>
          <div className="login-metrics" aria-label="تایبەتمەندییەکانی داشبۆرد">
            <span>پڕۆژەکان</span>
            <span>ڕێکخستنەکان</span>
            <span>بڵاوکردنەوە</span>
          </div>
          <div className="login-preview" aria-hidden="true">
            <div className="login-preview-top">
              <span />
              <span />
              <span />
            </div>
            <div className="login-preview-body">
              <div>
                <small>پڕۆژەی تایبەت</small>
                <strong>وێبسایتی مۆدێرن</strong>
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
                <p className="muted">بەخێربێیتەوە</p>
                <h2>چوونەژوورەوە</h2>
              </div>
              <span className="login-lock">پارێزراو</span>
            </div>
            <p className="muted">بە Email و وشەی نهێنی Supabase بچۆ ژوورەوە.</p>
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
                <label htmlFor="password">وشەی نهێنی</label>
                <input
                  className="input"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="وشەی نهێنی بنووسە"
                  required
                />
              </div>
              <button className="button primary login-submit" type="submit">
                چوونەژوورەوە بۆ داشبۆرد
              </button>
            </form>
            <div className="login-footnote">
              <span>ناوچەی پارێزراوی بەڕێوەبەر</span>
              <Link href="/">گەڕانەوە بۆ ماڵپەڕ</Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
