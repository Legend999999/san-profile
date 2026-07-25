export const fallbackSettings = {
  id: "local-default",
  site_title: "کورد وێبسایت",
  owner_name: "کورد وێبسایت",
  introduction:
    "دیزاین و بەرنامەڕێژکردنی وێبسایتەکان، بۆتی تێلەگرام و سیستەمی دیجیتاڵیی پیشەیی.",
  about_text:
    "چارەسەری دیجیتاڵیی پێشکەوتوو بۆ گەشەی بڕاندەکەت.",
  github_url: "https://github.com/",
  telegram_url: "https://t.me/dark721_1",
  email: null,
  footer_text: "© 2026 Kurd Website — کورد وێبسایت",
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
  };
}
