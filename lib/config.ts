export const fallbackSettings = {
  id: "local-default",
  site_title: "San Portfolio",
  owner_name: "San",
  introduction: "I build modern websites, useful tools, and digital experiences.",
  about_text:
    "A focused portfolio for websites, tools, and digital experiences created with clean design and reliable engineering.",
  github_url: "https://github.com/",
  telegram_url: "https://t.me/",
  email: "san@example.com",
  footer_text: "© San. Built for modern web projects.",
  updated_at: new Date(0).toISOString(),
};

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    anonKey,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}
