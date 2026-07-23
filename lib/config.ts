export const fallbackSettings = {
  id: "local-default",
  site_title: "کورد وێب",
  owner_name: "کورد وێب",
  introduction:
    "وێبسایت، بۆتی تێلەگرام و سیستەمی دیجیتاڵی خێرا و ئامادەی گەشە بۆ کاروبارەکەت دروست دەکەین.",
  about_text:
    "چارەسەری دیجیتاڵی ڕوون، خێرا و پیشەیی بۆ براند و کاروبارەکەت دەسازێنین.",
  github_url: "https://github.com/",
  telegram_url: "https://t.me/",
  email: "hello@kurdweb.example",
  footer_text: "© ٢٠٢٦ کورد وێب. سەرجەم مافەکان پارێزراون.",
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
