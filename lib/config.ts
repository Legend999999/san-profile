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
  {
    id: "obera-iraq",
    title: "Obera Iraq",
    slug: "obera-iraq",
    short_description: "ماڵپەڕێکی پیشەیی بۆ ناساندنی براند، خزمەتگوزاری و پەیوەندی کردن بە شێوەیەکی ڕوون.",
    full_description: "ماڵپەڕێکی پیشەیی و گونجاو بۆ موبایل بۆ ناساندنی Obera Iraq، پیشاندانی زانیارییە سەرەکییەکان و ئاسانکردنی پەیوەندی لەگەڵ سەردانکەران.",
    website_url: "https://www.obera-iraq.com",
    screenshot_url: null,
    technologies: ["Next.js", "Vercel"],
    category: "وێبسایت",
    featured: true,
    published: true,
    display_order: 1,
    created_at: "2026-07-28T00:00:00.000Z",
    updated_at: "2026-07-28T00:00:00.000Z",
  },
  {
    id: "mbti313",
    title: "MBTI 313",
    slug: "mbti313",
    short_description: "وێبسایتێکی تاقیکردنەوە و ئەزموونی دیجیتاڵی بۆ پیشاندانی ئەنجام بە شێوەیەکی ئاسان.",
    full_description: "وێبسایتێکی ئەزموونی دیجیتاڵی بۆ MBTI 313 کە بەکارهێنەر دەتوانێت بە ئاسانی بەشداربێت و ئەنجامەکان بە شێوەیەکی ڕوون ببینێت.",
    website_url: "https://mbti313.vercel.app",
    screenshot_url: null,
    technologies: ["Next.js", "Vercel"],
    category: "وێبسایت",
    featured: true,
    published: true,
    display_order: 2,
    created_at: "2026-07-28T00:00:00.000Z",
    updated_at: "2026-07-28T00:00:00.000Z",
  },
  {
    id: "caffee",
    title: "Caffee",
    slug: "caffee",
    short_description: "ماڵپەڕێکی خاوێن و مۆدێرن بۆ ناساندنی کافێ و پیشاندانی زانیارییە گرنگەکان.",
    full_description: "ماڵپەڕێکی خاوێن، خێرا و گونجاو بۆ موبایل بۆ کافێ، بە ڕووکارێکی ڕوون بۆ پیشاندانی براند و زانیارییە پێویستەکان.",
    website_url: "https://caffee-wwwsansalar1-6201s-projects.vercel.app",
    screenshot_url: null,
    technologies: ["Next.js", "Vercel"],
    category: "وێبسایت",
    featured: true,
    published: true,
    display_order: 3,
    created_at: "2026-07-28T00:00:00.000Z",
    updated_at: "2026-07-28T00:00:00.000Z",
  },
  {
    id: "venos",
    title: "Venos",
    slug: "venos",
    short_description: "ماڵپەڕێکی مۆدێرن بۆ ناساندنی براند و پیشاندانی ناوەڕۆک بە شێوەیەکی جوان.",
    full_description: "ماڵپەڕێکی مۆدێرن و ڕێکخراو بۆ Venos، دروستکراو بۆ پیشاندانی زانیاری و ناساندنی براند بە شێوەیەکی پیشەیی.",
    website_url: "https://venos-silk.vercel.app",
    screenshot_url: null,
    technologies: ["Next.js", "Vercel"],
    category: "وێبسایت",
    featured: false,
    published: true,
    display_order: 4,
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
