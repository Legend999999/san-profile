import type { Project } from "./types";

export const fallbackSettings = {
  id: "local-default",
  site_title: "کورد وێبسایت",
  owner_name: "San",
  introduction:
    "وێبسایت، بۆتی تێلەگرام و سیستەمی دیجیتاڵی بۆ کاروبارە کوردییەکان.",
  about_text:
    "کورد وێبسایت ستۆدیۆیەکی سەربەخۆیە کە لەلایەن San بەڕێوە دەبرێت.",
  github_url: "https://github.com/",
  telegram_url: "https://t.me/dark721_1",
  email: null,
  footer_text: "© 2026 Kurd Website — کورد وێبسایت",
  updated_at: new Date(0).toISOString(),
};

export const fallbackProjects: Project[] = [
  {
    id: "obera-iraq",
    title: "Obera Iraq",
    slug: "obera-iraq",
    short_description: "ماڵپەڕێکی پیشەیی بۆ ناساندنی براند و ئاسانکردنی پەیوەندی لەگەڵ سەردانکەران.",
    full_description: "ماڵپەڕێکی ڕێکخراو بۆ Obera Iraq کە زانیارییە سەرەکییەکان بە ڕوونی پیشان دەدات و پەیوەندی لەگەڵ براندەکە ئاسان دەکات.",
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
    short_description: "ئەزموونێکی دیجیتاڵی بۆ پرسیار، وەڵام و پیشاندانی ئەنجام بە شێوەیەکی ڕوون.",
    full_description: "وێبسایتێکی ئەزموونی دیجیتاڵی بۆ MBTI 313 کە بەکارهێنەر دەتوانێت بە ئاسانی بەشداربێت و ئەنجامەکان بە شێوەیەکی ڕێکخراو ببینێت.",
    website_url: "",
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
    id: "cafe",
    title: "Cafe",
    slug: "cafe",
    short_description: "ماڵپەڕێکی خاوێن بۆ ناساندنی Cafe و پیشاندانی زانیارییە گرنگەکان.",
    full_description: "ماڵپەڕێکی خاوێن و گونجاو بۆ مۆبایل بۆ Cafe، بە ڕووکارێکی ڕوون بۆ ناساندنی براند و زانیارییە پێویستەکان.",
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
    id: "rozhi-la-daikbun",
    title: "ڕۆژی لە دایکبوون",
    slug: "rozhi-la-daikbun",
    short_description: "ماڵپەڕێکی تایبەت بۆ پێشکەشکردنی پیرۆزبایی و ناوەڕۆکی ڕۆژی لە دایکبوون.",
    full_description: "ماڵپەڕێکی ڕێکخراو بۆ ڕۆژی لە دایکبوون، دروستکراو بۆ پیشاندانی ناوەڕۆک و پیرۆزبایی بە شێوەیەکی جوان و گونجاو بۆ مۆبایل.",
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
