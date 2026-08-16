import type { Project } from "./types";

export type ProjectDetail = {
  overview: string;
  purpose: string;
  built: string;
  features: string[];
  preview: "obera" | "mbti" | "cafe" | "birthday";
  live: boolean;
};

export const projectDetails: Record<string, ProjectDetail> = {
  "obera-iraq": {
    overview:
      "ماڵپەڕێکی پیشەیی بۆ ناساندنی Obera Iraq و ڕێکخستنی زانیارییە سەرەکییەکان لە یەک شوێن.",
    purpose:
      "ئامانج ئەوە بوو سەردانکەر زوو بزانێت براندەکە چی پێشکەش دەکات و بە ئاسانی ڕێگەی پەیوەندی بدۆزێتەوە.",
    built:
      "پەڕەی ناساندن، بەشی زانیاری، ڕێکخستنی ناوەڕۆک و ڕووکارێکی گونجاو بۆ مۆبایل دروست کرا.",
    features: [
      "پێشکەشکردنی براند بە شێوەیەکی ڕوون",
      "بەشی پەیوەندی و بانگەواز",
      "ڕووکارێکی خێرا و گونجاو بۆ مۆبایل",
      "پێکهاتەی سادە بۆ گۆڕینی ناوەڕۆک",
    ],
    preview: "obera",
    live: true,
  },
  mbti313: {
    overview:
      "ئەزموونێکی دیجیتاڵی بۆ MBTI 313 کە پرسیار و ئەنجام بە شێوەیەکی ڕێکخراو پێشکەش دەکات.",
    purpose:
      "ئامانج ئاسانکردنی بەشداری و پیشاندانی ئەنجام بوو، بەبێ ئەوەی بەکارهێنەر لە ناو پەڕە زۆر و ئاڵۆزدا ون ببێت.",
    built:
      "فلووی پرسیار، پەڕەی ئەنجام، ناوەڕۆکی ڕوون و ڕووکارێکی تاریک بۆ خوێندنەوەی ئاسان دروست کرا.",
    features: [
      "فلووی پرسیار و وەڵام",
      "پیشاندانی ئەنجام بە شێوەی ڕوون",
      "دیزاینی RTL بۆ کوردی",
      "ڕووکارێکی گونجاو بۆ مۆبایل",
    ],
    preview: "mbti",
    live: false,
  },
  cafe: {
    overview:
      "ماڵپەڕێکی خاوێن بۆ Cafe کە ناسنامە، زانیاری و بانگەوازی پەیوەندی بە شێوەیەکی گەرم پێشکەش دەکات.",
    purpose:
      "پێویست بوو سەردانکەر لە چەند چرکەدا هەستی شوێنەکە، زانیارییە گرنگەکان و ڕێگەی پەیوەندی ببینێت.",
    built:
      "بەشی هێرۆ، بەشی ناساندن، بەشی خزمەتگوزاری/مێنووی سەرەکی و بانگەوازی پەیوەندی دروست کرا.",
    features: [
      "ڕووکارێکی گەرم و خوێندراو",
      "پیشاندانی زانیارییە گرنگەکان",
      "بانگەوازی پەیوەندی",
      "دیزاینی گونجاو بۆ مۆبایل",
    ],
    preview: "cafe",
    live: true,
  },
  "rozhi-la-daikbun": {
    overview:
      "ماڵپەڕێکی ڕێکخراو بۆ ڕۆژی لە دایکبوون کە ناوەڕۆک و یادەوەرییەکان بە شێوەیەکی جوان پێشکەش دەکات.",
    purpose:
      "ئامانج ئەوە بوو پەڕەیەکی تایبەت و ئاسان بۆ پێشکەشکردنی پیرۆزبایی و ناوەڕۆکی ڕۆژی لە دایکبوون دروست بکرێت.",
    built:
      "پەڕەی پیشاندانی ناوەڕۆک، بەشی پیرۆزبایی، ڕووکارێکی هاوسەنگ و گونجاویی بۆ مۆبایل دروست کرا.",
    features: [
      "پێشکەشکردنی پیرۆزبایی بە شێوەی جوان",
      "ناوەڕۆکی ڕێکخراو و خوێندراو",
      "ڕووکارێکی تایبەت بۆ یادەوەری",
      "کارایی و گونجاویی بۆ ئامێرە جیاوازەکان",
    ],
    preview: "birthday",
    live: true,
  },
};

export function normalizeProjectSlug(slug: string) {
  if (slug === "caffee") return "cafe";
  if (slug === "venos" || slug === "vinos") return "rozhi-la-daikbun";
  return slug;
}

export function getProjectDetail(project: Project): ProjectDetail {
  return projectDetails[normalizeProjectSlug(project.slug)] ?? {
    overview: project.full_description ?? project.short_description,
    purpose: "پڕۆژەکە بۆ ناساندنی کاروبار و ئاسانکردنی پەیوەندی لەگەڵ سەردانکەران دروست کرا.",
    built: "ڕووکار، ناوەڕۆک و پەڕەی پەیوەندی بە شێوەیەکی گونجاو بۆ مۆبایل دروست کرا.",
    features: ["دیزاینی RTL", "پێشکەشکردنی ناوەڕۆک", "بانگەوازی پەیوەندی", "ڕووکارێکی گونجاو بۆ مۆبایل"],
    preview: "birthday",
    live: Boolean(project.website_url),
  };
}
