import type { Project } from "./types";

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

export const fallbackProjects: Project[] = [
  {
    id: "kurd-website-vercel",
    title: "کورد وێبسایت",
    slug: "kurd-website",
    short_description: "ماڵپەڕی رسمی کورد وێبسایت بۆ ناساندنی خزمەتگوزارییەکان و پڕۆژەکان.",
    full_description: "ماڵپەڕی رسمی کورد وێبسایت بۆ ناساندنی خزمەتگوزارییەکان، پڕۆژەکان و ڕێگای پەیوەندی کردن.",
    website_url: "https://san-profile.vercel.app/#projects",
    screenshot_url: null,
    technologies: ["Next.js", "Vercel"],
    category: "وێبسایت",
    featured: true,
    published: true,
    display_order: 0,
    created_at: "2026-07-28T00:00:00.000Z",
    updated_at: "2026-07-28T00:00:00.000Z",
  },
];

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
