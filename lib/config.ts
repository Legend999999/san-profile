export const fallbackSettings = {
  id: "local-default",
  site_title: "کورد وێبسایت",
  owner_name: "کورد وێبسایت",
  introduction:
    "وێبسایت، بۆتی تێلەگرام و سیستەمی دیجیتاڵی خێرا و ئامادەی گەشە بۆ کاروبارەکەت دروست دەکەین.",
  about_text:
    "چارەسەری دیجیتاڵی ڕوون، خێرا و پیشەیی بۆ براند و کاروبارەکەت دەسازێنین.",
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
